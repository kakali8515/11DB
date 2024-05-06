<template>
    <div class="admin-otr">
        <Sidebar />
        <div class="admin-right">
            <h2 class="heading">
                <span><img src="@/assets/icons/community-report.svg" alt="" /></span>
                {{ $t("sideBar.subMenu.Community Report") }}
            </h2>
            <div class="cm-bck">
                <h3>{{ $t("button.search") }}</h3>
                <div class="frm-innr w-100">
                    <div class="row-3">
                        <div class="form-group">
                            <label>{{ $t("filterCard.category") }}</label>
                            <Dropdown @dropdownValue="getCategoryData" :search_type="category" :searchTitleListItem="[...Object.keys(categoryList).map((key) => {
                                return { key: key, value: categoryList[key] };
                            }),
                            ]" searchtitle="value" searchvalue="key" />
                        </div>
                        <div class="form-group">
                            <div class="dubble-date-btn">
                                <div class="form-group">
                                    <label>{{ $t("edit.list.startDate") }}</label>
                                    <div class="input-date">
                                        <Calender @date="getSearchStartDate" :input_date="searchStartDate"
                                            :datePlaceholder="datePlaceholder"
                                            :max_date="searchEndDate ? new Date(searchEndDate) : ''" />
                                    </div>
                                    <div class="check-innr check-row">
                                        <div class="radioBtn-admin">
                                            <input type="radio" id="no" :checked="isAllperiod" @click="getAllData" />
                                            <label for="no">{{ $t("analytics.allPeriod") }}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>{{ $t("edit.list.endDate") }}</label>
                                    <div class="input-date">
                                        <Calender @date="getSearchEndDate" :input_date="searchEndDate"
                                            :datePlaceholder="datePlaceholder" :min_date="searchStartDate
                                                ? new Date(new Date(searchStartDate).getTime() + 1000)
                                                : ''
                                                " />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-group">
                    <input type="submit" class="btn org-btn" :value="$t('button.search')" @click="page = 1; getCommunityReport();
                    " />
                    <button type="button" class="btn outline blk-btn" @click="resetList">
                        {{ $t("button.reset") }}
                    </button>
                </div>
            </div>
            <div class="cm-bck mt-30">
                <div class="material-filter-list material-sort">
                    <h3>{{ $t("analytics.Totallist") }}</h3>
                    <button type="button" class="btn outline blk-btn" @click="downloadCommunityReport">
                        <span><img src="@/assets/icons/download-icon.svg" alt="" /> </span> {{ $t("bulk.export.download") }}
                    </button>
                </div>

                <div class="tab-outr admin-tab">
                    <TabWrapper v-if="titleList?.length > 0" @selectedTab="onChangeTab" priorityLoopTab="true">
                        <Tabs v-for="title in titleList" :title="title.title" :key="title.value">
                            <div class="table-inner-scroll">
                                <table class="table-otr table-innr">
                                    <thead>
                                        <tr>
                                            <th>{{ $t("dictionary.agentList.no") }}</th>
                                            <th>{{ $t("bulk.worklist.title") }}</th>
                                            <th>{{ $t("analytics.mainComment") }}</th>
                                            <th>{{ $t("analytics.subComment") }}</th>
                                            <th>{{ $t("analytics.LikeCount") }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-if="communityList?.length > 0">
                                            <tr v-for="(list, index) in communityList" :key="list.id">
                                                <td> {{ list.no }} </td>
                                                <td @click="redirect(list)" class="cursor-pointer"> {{ list.title }} </td>
                                                <td> {{ list.main_comment_count.toLocaleString("en-US") }}</td>
                                                <td>{{ list.sub_comment_count.toLocaleString("en-US") }}</td>
                                                <td>{{ list.like_count.toLocaleString("en-US") }}</td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr>
                                                <td colspan="8" class="center">
                                                    <p>{{ $t("dictionary.noData") }}</p>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </Tabs>
                    </TabWrapper>
                    <template v-if="communityList?.length > 0">
                        <pagination v-model="page" :records="total_records" :per-page="limit" :options="chunkPage"
                            @paginate="clickInternalPage" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import Calender from "@/components/Calender.vue";
import AnalyticService from "@/admin/services/AnalyticService.js";

const datePlaceholder = ref("YYYY-MM-DD");
const router = useRouter();
const route = useRoute();
const total_records = ref(0);
const page = route.params.page ? ref(parseInt(route.params.page)) : ref(1);
const limit = ref(10);
const chunkPage = ref({ chunk: 5 });
const communityList = ref([]);
const categoryList = ref([]);
const section = ref("community_report");
const category = ref("");

const searchStartDate = ref("");
const searchEndDate = ref("");
const isAllperiod = ref(true);
const selectTab = ref("comment");

const common = inject("common");
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const titleList = ref([
    {
        title: "communityCard.comments",
        value: "comment",
    },
    { title: "communityCard.trivia", value: "trivia" },
    { title: "communityCard.famousLines", value: "famous_line" },
    {
        title: "communityCard.goofs",
        value: "goofs",
    },
]);

onMounted(() => {
    getCategoryList();
});

// on language change
watch(
    () => common.state.SelectedLang,
    function (newVal, oldVal) {
        if (newVal && oldVal && newVal != oldVal) {
            getCategoryList();
        }
    }
);

const getCategoryList = () => {
    AnalyticService.categoryList(section.value)
        .then((res) => {
            if (res.status == 200) {
                categoryList.value = res.data.result;
                category.value = Object.keys(categoryList.value)[0];
                getCommunityReport();
            }
        })
        .catch((err) => {
            return;
        });
};


const getCategoryData = (value) => {
    category.value = value;
};


const resetList = () => {
    page.value = 1;
    searchStartDate.value = "";
    searchEndDate.value = "";
    isAllperiod.value = true;
    getCategoryList();
};

const getAllData = () => {
    searchStartDate.value = "";
    searchEndDate.value = "";
    isAllperiod.value = true;
};

const getSearchStartDate = (date) => {
    isAllperiod.value = false;
    searchStartDate.value = date;
};
const getSearchEndDate = (date) => {
    isAllperiod.value = false;
    searchEndDate.value = date;
};

const clickInternalPage = (click) => {
    page.value = click;
    getCommunityReport();
};

const onChangeTab = (tab) => {
    page.value = 1;
    let selectedTab = titleList.value.find((tabs) => {
        return tab == tabs.title;
    });
    selectTab.value = selectedTab.value;
    getCommunityReport();
};

const getCommunityReport = () => {
    let data = {
        page: page.value,
        limit: limit.value,
        list_type: selectTab.value,
        search_params: {
            category: category.value,
            start_date: searchStartDate.value,
            end_date: searchEndDate.value,
        }
    };

    AnalyticService.communityList(data)
        .then((res) => {
            if (res.status == 200) {
                communityList.value = res.data.result;
                total_records.value = res.data.total_records;
                for (let i = 0; i < communityList.value.length; i++) {
                    communityList.value[i]["no"] = (page.value - 1) * limit.value + i + 1;
                }
            }
        })
        .catch((err) => {
            console.log(err);
            return;
        });
};
const downloadCommunityReport = () => {
    let data = {
        list_type: selectTab.value,
        search_params: {
            category: category.value,
            start_date: searchStartDate.value,
            end_date: searchEndDate.value,
        }
    };

    AnalyticService.downloadCommunityReport(data)
        .then((res) => {
            if (res.status == 200) {
                const url = `${baseUrl}/download/file?url=${res.data.path}&ul=false`;
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "CommunityReport");
                document.body.appendChild(link);
                link.click();
            }
        })
        .catch((err) => {
            return;
        });
};

const redirect = (list) => {
    let url;
    if (list.type == "people") {
        url = `/people/details/${list.id}`;
        window.open(url, "_blank");
    } else if (list.type == "movie") {
        url = `/movies/details/${list.id}`;
        window.open(url, "_blank");
    } else if (list.type == "webtoons") {
        url = `/webtoons/detail/${list.id}`;
        window.open(url, "_blank");
    } else if (list.type == "tv") {
        url = `/tvshows/details/${list.id}`;
        window.open(url, "_blank");
    }
};
</script>
<style scoped>
.center {
    text-align: center !important;
}
</style>
  