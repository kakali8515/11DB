<template>
    <div class="admin-otr">
        <Sidebar />
        <div class="admin-right">
            <h2 class="heading">
                <span><img src="@/assets/icons/statistic.svg" alt="" /></span>
                {{ $t("adminStatistics.Statistics / User behaviour Log") }}
            </h2>
            <div class="cm-bck mt-30">

                <div class="tab-outr admin-tab">
                    <TabWrapper @selectedTab="onChangeTab" :activeTab="selectTab">
                        <Tabs title="adminStatistics.pageView">

                            <div class="cm-bck">
                                <h3>{{ $t("button.search") }}</h3>
                                <div class="frm-innr w-100">
                                    <div class="row-3">
                                        <div class="form-group">
                                            <label>{{ $t("adminStatistics.platform") }}</label>
                                            <input type="text" :placeholder="$t('adminStatistics.placeholder.platform')"
                                                class="form-control" v-model="platform" />
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $t("adminStatistics.pageType") }}</label>
                                            <Dropdown @dropdownValue="getpageType" :search_type="pageType"
                                                :searchTitleListItem="pageTypeList" searchtitle="name"
                                                searchvalue="value" />
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $t("adminStatistics.pagetitle") }}</label>
                                            <input type="text" :placeholder="$t('adminStatistics.placeholder.pagetitle')"
                                                class="form-control" v-model="pagetitle" />
                                        </div>
                                    </div>
                                    <div class="row-3">
                                        <div class="form-group">
                                            <label>{{ $t("adminStatistics.UTM_Source") }}</label>
                                            <input type="text" :placeholder="$t('adminStatistics.placeholder.UTM_Source')"
                                                class="form-control" v-model="utm_source" />
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
                                        <div class="form-group"></div>
                                    </div>
                                </div>
                                <div class="btn-group">
                                    <input type="submit" class="btn org-btn" :value="$t('button.search')" @click="page = 1; getAllData();
                                    " />
                                    <button type="button" class="btn outline blk-btn" @click="resetList">
                                        {{ $t("button.reset") }}
                                    </button>
                                </div>
                            </div>
                            <div class="cm-bck mt-30">
                                <h3>{{ $t("adminStatistics.pageViewList") }}</h3>
                                <div class="material-filter-list material-sort">
                                    <div class="sort-innr">
                                        <p>{{ $t("dictionary.agentList.total") }} {{ total_records }}</p>
                                        <div class="frm-innr">
                                            <div class="form-group">
                                                <select class="form-control" v-model="limit"
                                                    @change="page = 1; getAllData();">
                                                    <option :value="10">10</option>
                                                    <option :value="20">20</option>
                                                    <option :value="50">50</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn outline blk-btn" @click="downloadUserStatisticReport">
                                        <span><img src="@/assets/icons/download-icon.svg" alt="" /> </span> {{
                                            $t("bulk.export.download") }}
                                    </button>
                                </div>

                                <div class="table-inner-scroll">
                                    <table class="table-otr table-innr">
                                        <thead>
                                            <tr>
                                                <th>{{ $t("dictionary.agentList.no") }}</th>
                                                <th>{{ $t("adminStatistics.userId") }}</th>
                                                <th>{{ $t("adminStatistics.platform") }}</th>
                                                <th>{{ $t("adminStatistics.pageType") }}</th>
                                                <th>{{ $t("adminStatistics.pagetitle") }}</th>
                                                <th>{{ $t("adminStatistics.typeId") }}</th>
                                                <th>{{ $t("adminStatistics.UTM_Source") }}</th>
                                                <th>{{ $t("adminStatistics.UTM_Medium") }}</th>
                                                <th>{{ $t("adminStatistics.UTM_Content") }}</th>
                                                <th>{{ $t("adminStatistics.UTM_Term") }}</th>
                                                <th>{{ $t("adminStatistics.Referrer") }}</th>
                                                <th>{{ $t("adminStatistics.pageViewTime") }}</th>
                                                <th>{{ $t("adminStatistics.Session_id") }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-if="pageView?.length > 0">
                                                <tr v-for="(list, index) in pageView" :key="list.id">
                                                    <td> {{ list.no }} </td>
                                                    <td> {{ list.user_email ? list.user_email : '-' }} </td>
                                                    <td> {{ list.access_platform ? list.access_platform : '-' }} </td>
                                                    <td> {{ list.page_type ?
                                                        $t(`adminStatistics.pageTypeList.${list.page_type}`) : '-' }} </td>
                                                    <td> {{ list.page_title }} </td>
                                                    <td> {{ list.type_id }} </td>
                                                    <td> {{ list.utm_source ? list.utm_source : '-' }} </td>
                                                    <td> {{ list.utm_medium ? list.utm_medium : '-' }} </td>
                                                    <td> {{ list.utm_content ? list.utm_content : '-' }} </td>
                                                    <td> {{ list.utm_term ? list.utm_term : '-' }} </td>
                                                    <td> {{ list.referrer ? list.referrer : '-' }} </td>
                                                    <td> {{ moment.utc(list.view_at).local().format("YYYY-MM-DD hh:mm:ss")
                                                    }}
                                                    </td>
                                                    <td> {{ list.session_id ? list.session_id : '-' }} </td>
                                                </tr>
                                            </template>
                                            <template v-else>
                                                <tr>
                                                    <td colspan="13" class="center">
                                                        <p>{{ $t("dictionary.noData") }}</p>
                                                    </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                                <template v-if="pageView?.length > 0">
                                    <pagination v-model="page" :records="total_records" :per-page="limit"
                                        :options="chunkPage" @paginate="clickInternalPage" />
                                </template>
                            </div>
                        </Tabs>
                        <Tabs title="adminStatistics.search">
                            <div class="cm-bck">
                                <h3>{{ $t("button.search") }}</h3>
                                <div class="frm-innr w-100">
                                    <div class="row-3" v-if="selectTab == 'adminStatistics.search'">
                                        <div class="form-group">
                                            <label>{{ $t("adminStatistics.searchKeyword") }}</label>
                                            <input type="text"
                                                :placeholder="$t('adminStatistics.placeholder.searchKeyword')"
                                                class="form-control" v-model="search_keyword" />
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $t("adminStatistics.landingKeyword") }}</label>
                                            <input type="text"
                                                :placeholder="$t('adminStatistics.placeholder.searchKeyword')"
                                                class="form-control" v-model="landing_keyword" />
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
                                    <input type="submit" class="btn org-btn" :value="$t('button.search')" @click="page = 1; getAllData();
                                    " />
                                    <button type="button" class="btn outline blk-btn" @click="resetList">
                                        {{ $t("button.reset") }}
                                    </button>
                                </div>
                            </div>
                            <div class="cm-bck mt-30">
                                <h3>{{ $t("adminStatistics.searchList") }}</h3>
                                <div class="material-filter-list material-sort">
                                    <div class="sort-innr">
                                        <p>{{ $t("dictionary.agentList.total") }} {{ total_search_records }}</p>
                                        <div class="frm-innr">
                                            <div class="form-group">
                                                <select class="form-control" v-model="limit"
                                                    @change="page = 1; getAllData();">
                                                    <option :value="10">10</option>
                                                    <option :value="20">20</option>
                                                    <option :value="50">50</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn outline blk-btn" @click="downloadUserStatisticReport">
                                        <span><img src="@/assets/icons/download-icon.svg" alt="" /> </span> {{
                                            $t("bulk.export.download") }}
                                    </button>
                                </div>

                                <div class="table-inner-scroll">
                                    <table class="table-otr table-innr">
                                        <thead>
                                            <tr>
                                                <th>{{ $t("dictionary.agentList.no") }}</th>
                                                <th>{{ $t("adminStatistics.searchKeyword") }}</th>
                                                <th>{{ $t("adminStatistics.landingKeyword") }}</th>
                                                <th>{{ $t("adminStatistics.sort") }}</th>
                                                <th>{{ $t("adminStatistics.release_date") }}</th>
                                                <th>{{ $t("adminStatistics.created_at") }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-if="searchData?.length > 0">
                                                <tr v-for="(list, index) in searchData" :key="list.id">
                                                    <td> {{ list.no }} </td>
                                                    <td> {{ list.search_keyword }} </td>
                                                    <td> {{ list.landing_keyword }} </td>
                                                    <td> {{ list.sort ? list.sort : '-' }} </td>
                                                    <td> {{ list.release_date ?
                                                        moment(list.release_date).format("YYYY-MM-DD") : '-' }} </td>
                                                    <td> {{ moment(list.created_at).format("YYYY-MM-DD") }}
                                                    </td>
                                                </tr>
                                            </template>
                                            <template v-else>
                                                <tr>
                                                    <td colspan="13" class="center">
                                                        <p>{{ $t("dictionary.noData") }}</p>
                                                    </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                                <template v-if="searchData?.length > 0">
                                    <pagination v-model="page" :records="total_search_records" :per-page="limit"
                                        :options="chunkPage" @paginate="clickSearchData" />
                                </template>
                            </div>
                        </Tabs>
                        <Tabs title="adminStatistics.timeSpent">

                            <div class="cm-bck">
                                <h3>{{ $t("button.search") }}</h3>
                                <div class="frm-innr w-100">
                                    <div class="row-3">
                                        <div class="form-group" v-if="selectTab == 'adminStatistics.timeSpent'">
                                            <label>{{ $t("adminStatistics.pageType") }}</label>
                                            <Dropdown @dropdownValue="getpageType" :search_type="pageType"
                                                :searchTitleListItem="pageTypeList" searchtitle="name"
                                                searchvalue="value" />
                                        </div>
                                        <div class="form-group">
                                            <label>{{ $t("edit.list.startDate") }}</label>
                                            <div class="input-date">
                                                <Calender @date="getSearchStartDate" :input_date="searchStartDate"
                                                    :datePlaceholder="datePlaceholder"
                                                    :max_date="searchEndDate ? new Date(searchEndDate) : ''" />
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
                                <div class="btn-group">
                                    <input type="submit" class="btn org-btn" :value="$t('button.search')" @click="page = 1; getAllData();
                                    " />
                                    <button type="button" class="btn outline blk-btn" @click="resetList">
                                        {{ $t("button.reset") }}
                                    </button>
                                </div>
                            </div>

                            <div class="cm-bck mt-30">
                                <h3>{{ $t("adminStatistics.timeSpentList") }}</h3>
                                <div class="material-filter-list material-sort">
                                    <div class="sort-innr">
                                        <p>{{ $t("dictionary.agentList.total") }} {{ total_time_records }}</p>
                                        <div class="frm-innr">
                                            <div class="form-group">
                                                <select class="form-control" v-model="limit"
                                                    @change="page = 1; getAllData();">
                                                    <option :value="10">10</option>
                                                    <option :value="20">20</option>
                                                    <option :value="50">50</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn outline blk-btn" @click="downloadUserStatisticReport">
                                        <span><img src="@/assets/icons/download-icon.svg" alt="" /> </span> {{
                                            $t("bulk.export.download") }}
                                    </button>
                                </div>

                                <div class="table-inner-scroll">
                                    <table class="table-otr table-innr">
                                        <thead>
                                            <tr>
                                                <th>{{ $t("dictionary.agentList.no") }}</th>
                                                <th>{{ $t("adminStatistics.userId") }}</th>
                                                <th>{{ $t("adminStatistics.Session_id") }}</th>
                                                <th>{{ $t("adminStatistics.pageType") }}</th>
                                                <th>{{ $t("adminStatistics.pagetitle") }}</th>
                                                <th>{{ $t("adminStatistics.typeId") }}</th>
                                                <th>{{ $t("adminStatistics.totalTime") }}</th>
                                                <th>{{ $t("adminStatistics.entryTime") }}</th>
                                                <th>{{ $t("adminStatistics.BreakawayTime") }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-if="timeSpentByPage?.length > 0">
                                                <tr v-for="(list, index) in timeSpentByPage" :key="list.id">
                                                    <td> {{ list.no }} </td>
                                                    <td> {{ list.user_email ? list.user_email : '-' }} </td>
                                                    <td> {{ list.session_id ? list.session_id : '-' }} </td>
                                                    <td> {{ list.page_type ?
                                                        $t(`adminStatistics.pageTypeList.${list.page_type}`) : '-' }} </td>
                                                    <td> {{ list.page_title }} </td>
                                                    <td> {{ list.type_id }} </td>
                                                    <td> {{ list.time_duration ? secondsToHms(list.time_duration) : '-' }}
                                                    </td>
                                                    <td> {{ moment.utc(list.entry_time).local().format("YYYY-MM-DD hh:mm:ss") }}
                                                    </td>
                                                    <td> {{ list.exit_time ?
                                                            moment.utc(list.exit_time).local().format("YYYY-MM-DD hh:mm:ss") :
                                                            "- -" }}
                                                    </td>
                                                </tr>
                                            </template>
                                            <template v-else>
                                                <tr>
                                                    <td colspan="9" class="center">
                                                        <p>{{ $t("dictionary.noData") }}</p>
                                                    </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                                <template v-if="timeSpentByPage?.length > 0">
                                    <pagination v-model="page" :records="total_time_records" :per-page="limit"
                                        :options="chunkPage" @paginate="clickTimeSpentData" />
                                </template>
                            </div>
                        </Tabs>
                    </TabWrapper>
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
import { secondsToHms } from "@/mixins/CommonFunctions.js";
import { onMounted, watch, computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import Calender from "@/components/Calender.vue";
import UserStatistics from "@/services/UserStatistics.js";
import moment from "moment";
import i18n from "@/config/i18n";
const { t } = i18n.global;

const datePlaceholder = ref("YYYY-MM-DD");
const router = useRouter();
const route = useRoute();
const total_records = ref(0);
const total_search_records = ref(0);
const total_time_records = ref(0);
const page = ref(1);
const limit = ref(10);
const chunkPage = ref({ chunk: 5 });

const pageView = ref([]);
const timeSpentByPage = ref([]);
const searchData = ref([]);
const platform = ref("");
const pageType = ref("");
const pagetitle = ref("");
const utm_source = ref("");
const search_keyword = ref("");
const landing_keyword = ref("");

const searchStartDate = ref("");
const searchEndDate = ref("");
const selectTab = ref("adminStatistics.pageView");

const common = inject("common");
const baseUrl = import.meta.env.VITE_SITE_BASE_URL;
const ApibaseUrl = import.meta.env.VITE_API_BASE_URL;

const pageTypeList = computed(() => [
    { name: t('dictionary.select'), value: '' },
    { name: t('adminStatistics.pageTypeList.movie'), value: 'movie' },
    { name: t('adminStatistics.pageTypeList.tv'), value: 'tv' },
    { name: t('adminStatistics.pageTypeList.webtoons'), value: 'webtoons' },
    { name: t('adminStatistics.pageTypeList.people'), value: 'people' },
    { name: t('adminStatistics.pageTypeList.video'), value: 'video' },
    { name: t('adminStatistics.pageTypeList.award'), value: 'award' },
    { name: t('adminStatistics.pageTypeList.tag'), value: 'tag' },
    { name: t('adminStatistics.pageTypeList.company'), value: 'company' },
]);

onMounted(() => {
    getPageView();
});

const getpageType = (value) => {
    pageType.value = value;
};


const resetList = () => {
    page.value = 1;
    searchStartDate.value = "";
    searchEndDate.value = "";
    platform.value = "";
    pageType.value = "";
    pagetitle.value = "";
    utm_source.value = "";
    search_keyword.value = "";
    landing_keyword.value = "";
    if (selectTab.value == "adminStatistics.pageView") {
        getPageView();
    } else if (selectTab.value == "adminStatistics.timeSpent") {
        getTimeSpentonPage();
    } else if (selectTab.value == "adminStatistics.search") {
        getsearchData()
    }
};

const getAllData = () => {
    if (selectTab.value == "adminStatistics.pageView") {
        getPageView();
    } else if (selectTab.value == "adminStatistics.timeSpent") {
        getTimeSpentonPage();
    } else if (selectTab.value == "adminStatistics.search") {
        getsearchData()
    }
};

const getSearchStartDate = (date) => {
    searchStartDate.value = date;
};
const getSearchEndDate = (date) => {
    searchEndDate.value = date;
};
const clickInternalPage = (click) => {
    page.value = click;
    getPageView();
};

const clickSearchData = (click) => {
    page.value = click;
    getsearchData();
};

const clickTimeSpentData = (click) => {
    page.value = click;
    getTimeSpentonPage();
};

const onChangeTab = (tab) => {
    selectTab.value = tab;
    page.value = 1;
    searchStartDate.value = "";
    searchEndDate.value = "";
    platform.value = "";
    pageType.value = "";
    pagetitle.value = "";
    utm_source.value = "";
    search_keyword.value = "";
    landing_keyword.value = "";
    if (selectTab.value == "adminStatistics.pageView") {
        getPageView();
    } else if (selectTab.value == "adminStatistics.timeSpent") {
        getTimeSpentonPage();
    } else if (selectTab.value == "adminStatistics.search") {
        getsearchData()
    }
};


// get page view
const getPageView = () => {
    let data = {
        page: page.value,
        limit: limit.value,
        search_params: {
            access_platform: platform.value,
            page_type: pageType.value,
            page_title: pagetitle.value,
            utm_source: utm_source.value,
            start_date: searchStartDate.value,
            end_date: searchEndDate.value,
        }
    };

    UserStatistics.pageView(data)
        .then((res) => {
            if (res.status == 200) {
                pageView.value = res.data.results;
                total_records.value = res.data.total_records;
                for (let i = 0; i < pageView.value.length; i++) {
                    pageView.value[i]["no"] = (page.value - 1) * limit.value + i + 1;
                }
            }
        })
        .catch((err) => {
            console.log(err);
            return;
        });
};

// get search data
const getsearchData = () => {
    let data = {
        page: page.value,
        limit: limit.value,
        search_params: {
            search_keyword: search_keyword.value,
            landing_keyword: landing_keyword.value,
            start_date: searchStartDate.value,
            end_date: searchEndDate.value,
        }
    };

    UserStatistics.searchView(data)
        .then((res) => {
            if (res.status == 200) {
                searchData.value = res.data.results;
                total_search_records.value = res.data.total_records;
                for (let i = 0; i < searchData.value.length; i++) {
                    searchData.value[i]["no"] = (page.value - 1) * limit.value + i + 1;
                }
            }
        })
        .catch((err) => {
            console.log(err);
            return;
        });
};

const getTimeSpentonPage = () => {
    let data = {
        page: page.value,
        limit: limit.value,
        search_params: {
            page_type: pageType.value,
            start_date: searchStartDate.value,
            end_date: searchEndDate.value,
        }
    };

    UserStatistics.timeSpentByPage(data)
        .then((res) => {
            if (res.status == 200) {
                timeSpentByPage.value = res.data.results;
                total_time_records.value = res.data.total_records;
                for (let i = 0; i < timeSpentByPage.value.length; i++) {
                    timeSpentByPage.value[i]["no"] = (page.value - 1) * limit.value + i + 1;
                }
            }
        })
        .catch((err) => {
            console.log(err);
            return;
        });
};

const downloadUserStatisticReport = () => {
    if (selectTab.value == "adminStatistics.pageView") {
        downloadPageViewReport();
    } else if (selectTab.value == "adminStatistics.timeSpent") {
        downloadTimeSpentReport();
    } else if (selectTab.value == "adminStatistics.search") {
        downloadSearchDataReport();
    }
}


const downloadPageViewReport = () => {
    let data = {
        search_params: {
            access_platform: platform.value,
            page_type: pageType.value,
            page_title: pagetitle.value,
            utm_source: utm_source.value,
            start_date: searchStartDate.value,
            end_date: searchEndDate.value,
        }
    };

    UserStatistics.downloadPageViewReport(data)
        .then((res) => {
            if (res.status == 200) {
                const url = `${ApibaseUrl}/download/file?url=${res.data.path}&ul=false`;
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Pageview");
                document.body.appendChild(link);
                link.click();
            }
        })
        .catch((err) => {
            return;
        });
};

const downloadSearchDataReport = () => {
    let data = {
        search_params: {
            search_keyword: search_keyword.value,
            landing_keyword: landing_keyword.value,
            start_date: searchStartDate.value,
            end_date: searchEndDate.value,
        }
    };

    UserStatistics.downloadSearchDataReport(data)
        .then((res) => {
            if (res.status == 200) {
                const url = `${ApibaseUrl}/download/file?url=${res.data.path}&ul=false`;
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "SearchData");
                document.body.appendChild(link);
                link.click();
            }
        })
        .catch((err) => {
            return;
        });
};

const downloadTimeSpentReport = () => {
    let data = {
        search_params: {
            page_type: pageType.value,
            start_date: searchStartDate.value,
            end_date: searchEndDate.value,
        }
    };

    UserStatistics.downloadTimeSpentReport(data)
        .then((res) => {
            if (res.status == 200) {
                const url = `${ApibaseUrl}/download/file?url=${res.data.path}&ul=false`;
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "TimeSpent");
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
  