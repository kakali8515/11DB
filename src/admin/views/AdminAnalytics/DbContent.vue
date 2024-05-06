<template>
    <div class="admin-otr">
        <Sidebar />
        <div class="admin-right">
            <h2 class="heading">
                <span><img src="@/assets/icons/db-content.svg" alt="" /></span>{{ $t("sideBar.subMenu.DB Content") }}
            </h2>
            <div class="cm-bck">
                <h3>{{ $t("analytics.DBsearch") }}</h3>
                <div class="frm-innr w-100">
                    <div class="row-3">
                        <div class="form-group">
                            <label>{{ $t("filterCard.category") }}</label>
                            <Dropdown @dropdownValue="getCategoryData" :search_type="category"
                                :searchTitleListItem="categoryList" searchtitle="value" searchvalue="key" />
                        </div>
                        <div class="form-group">
                            <label>{{ $t("userManagement.Datetype") }}</label>
                            <Dropdown @dropdownValue="getDateType" :search_type="search_date_type" :searchTitleListItem="[
                                { name: $t('dictionary.select'), value: '' },
                                { name: $t('analytics.daily'), value: 'daily' },
                                { name: $t('analytics.monthly'), value: 'monthly' },
                                { name: $t('analytics.yearly'), value: 'yearly' },
                            ]" searchtitle="name" searchvalue="value" />
                        </div>
                        <div class="form-group">
                            <div class="dubble-date-btn">
                                <div class="form-group">
                                    <label>{{ $t("edit.list.startDate") }}</label>
                                    <div class="input-date">
                                        <Calender @date="getSearchStartDate" :input_date="searchStartDate"
                                            :datePlaceholder="datePlaceholder" :min_date="startMinDate"
                                            :max_date="searchEndDate ? new Date(searchEndDate) : ''" />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>{{ $t("edit.list.endDate") }}</label>
                                    <div class="input-date">
                                        <Calender @date="getSearchEndDate" :input_date="searchEndDate"
                                            :datePlaceholder="datePlaceholder" :min_date="searchStartDate
                                                ? new Date(new Date(searchStartDate).getTime() + 1000)
                                                : ''" :max_date="maxDate" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="btn-group">
                    <input type="submit" class="btn org-btn" :value="$t('button.search')" @click="getDbContentList();
                    " />
                    <button type="button" class="btn outline blk-btn" @click="resetList">
                        {{ $t("button.reset") }}
                    </button>
                </div>
            </div>
            <div class="cm-bck mt-30">
                <div class="material-filter-list material-sort">
                    <h3>{{ $t("analytics.summary") }}</h3>
                    <button type="button" class="btn outline blk-btn" @click="downloadDbConten">
                        <span><img src="@/assets/icons/download-icon.svg" alt="" /> </span> {{ $t("bulk.export.download") }}
                    </button>
                </div>
                <div class="table-inner-scroll">
                    <table class="table-otr table-innr last-col">
                        <thead>
                            <tr>
                                <th>{{ $t("dictionary.agentList.no") }}</th>
                                <th>
                                    <div class="data-hdr">
                                        {{ $t("filterCard.category") }}
                                    </div>
                                </th>
                                <th>
                                    <div class="data-hdr">
                                        {{ $t("analytics.TotalCount") }}
                                    </div>
                                </th>
                                <th>
                                    <div class="data-hdr">
                                        {{ $t("analytics.TotalActive") }}
                                    </div>
                                </th>
                                <th>
                                    <div class="data-hdr">
                                        {{ $t("analytics.TotalInactive") }}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="dbContentList.length > 0">
                                <tr v-for="(list, index) in dbContentList" :key="index">
                                    <td style="text-align: center">
                                        {{ index + 1 }}
                                    </td>
                                    <td>{{ list.display_category }}</td>
                                    <td>{{ list.total_count.toLocaleString("en-US") }}</td>
                                    <td>{{ list.total_active_count.toLocaleString("en-US") }} </td>
                                    <td>{{ list.total_inactive_count.toLocaleString("en-US") }} </td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="12" class="center">
                                        <p>{{ $t("dictionary.noData") }}</p>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- show popup when choose date -->
        <div class="new-cast-modal center-popup-modal" v-show="isDateSelected">
            <PopUpModal :isModal="isDateSelected">
                <template v-slot:header>
                    <h1 class="text-center">{{ $t("userManagement.chooseDateType") }}</h1>
                </template>
                <template v-slot:footer>
                    <div class="button-group">
                        <button class="red-fill-btn" @click="isDateSelected = false">
                            {{ $t("button.ok") }}
                        </button>
                        <!-- <button class="black-outline-btn" @click="isDateSelected = false">
              {{ $t("button.cancel") }}
            </button> -->
                    </div>
                </template>
            </PopUpModal>
        </div>
    </div>
</template>
<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import AnalyticService from "@/admin/services/AnalyticService.js";
import i18n from "@/config/i18n";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { inject } from "vue";
import Calender from "@/components/Calender.vue";
import Toast from "@/alert/alert.js";
import PopUpModal from "@/components/Modals/PopUpModal.vue";

const datePlaceholder = ref("YYYY.MM.DD");
const dbContentList = ref([]);
const categoryList = ref([]);
const section = ref("db_content_report");
const category = ref("");

const searchStartDate = ref("");
const searchEndDate = ref("");
const search_date_type = ref("");
const maxDate = ref("");
const startMinDate = ref("");
const isDateSelected = ref(false);

const { t } = i18n.global;
const common = inject("common");
const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
                categoryList.value = Object.keys(res.data.result).map((key) => {
                    return { key: key, value: res.data.result[key] };
                });
                category.value = Object.keys(res.data.result)[0];
                getDbContentList();
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
    searchStartDate.value = "";
    searchEndDate.value = "";
    search_date_type.value = "";
    isDateSelected.value = false;
    getCategoryList();
};

const getSearchStartDate = (date) => {
    searchStartDate.value = date;
    maxDate.value = search_date_type.value == 'daily' && searchStartDate.value
        ? new Date(new Date(searchStartDate.value).setDate(new Date(searchStartDate.value).getDate() + 30)) : search_date_type.value == 'monthly' && searchStartDate.value
            ? new Date(new Date(searchStartDate.value).setFullYear(new Date(searchStartDate.value).getFullYear() + 1)) : '';

};
const getSearchEndDate = (date) => {
    searchEndDate.value = date;
    startMinDate.value = search_date_type.value == 'daily' && searchEndDate.value ? new Date(new Date(searchEndDate.value).setDate(new Date(searchEndDate.value).getDate() - 30)) : search_date_type.value == 'monthly' && searchEndDate.value
        ? new Date(new Date(searchEndDate.value).setFullYear(new Date(searchEndDate.value).getFullYear() - 1)) : '';
};

const getDateType = (value) => {
    search_date_type.value = value;
    category.value = category.value == 'all' ? categoryList.value[1].key : category.value;
    categoryList.value[0]['props'] = search_date_type.value ? { disabled: true } : { disabled: false };
    maxDate.value = search_date_type.value == 'daily' && searchStartDate.value
        ? new Date(new Date(searchStartDate.value).setDate(new Date(searchStartDate.value).getDate() + 30)) : search_date_type.value == 'monthly' && searchStartDate.value
            ? new Date(new Date(searchStartDate.value).setFullYear(new Date(searchStartDate.value).getFullYear() + 1)) : '';
    startMinDate.value = search_date_type.value == 'daily' && searchEndDate.value ? new Date(new Date(searchEndDate.value).setDate(new Date(searchEndDate.value).getDate() - 30)) : search_date_type.value == 'monthly' && searchEndDate.value
        ? new Date(new Date(searchEndDate.value).setFullYear(new Date(searchEndDate.value).getFullYear() - 1)) : '';
};

const getDbContentList = () => {
    if (category.value != 'all') {
        if (search_date_type.value == "") {
            isDateSelected.value = true;
            return;
        }
    }

    let data = {
        category: category.value,
        start_date: searchStartDate.value,
        end_date: searchEndDate.value,
        date_type: search_date_type.value
    };

    AnalyticService.dbContentList(data)
        .then((res) => {
            if (res.status == 200) {
                dbContentList.value = res.data.results;
            } else {
                Toast.fire({ title: res.response.data.error });
            }
        })
        .catch((err) => {
            return;
        });
};

const downloadDbConten = () => {

    if (category.value != 'all') {
        if (search_date_type.value == "") {
            isDateSelected.value = true;
            return;
        }
    }
    let data = {
        category: category.value,
        start_date: searchStartDate.value,
        end_date: searchEndDate.value,
        date_type: search_date_type.value
    };

    AnalyticService.downloadDBContent(data)
        .then((res) => {
            if (res.status == 200) {
                const url = `${baseUrl}/download/file?url=${res.data.path}&ul=false`;
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "DBContent");
                document.body.appendChild(link);
                link.click();
            } else {
                Toast.fire({ title: res.response.data.error });
            }
        })
        .catch((err) => {
            return;
        });
};
</script>
<style scoped>
.center {
    text-align: center !important;
}
</style>
  