<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/award-icon.svg" alt="" /></span
        >{{ $t("header.mainMenu.Awards") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("button.search") }}</h3>

        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("input_label.type") }}</label>
              <Dropdown
                @dropdownValue="getWorkData"
                :search_type="searchType"
                :searchTitleListItem="[
                  {
                    key: '',
                    value: $t('dictionary.select'),
                    disabled: true,
                  },
                  ...Object.keys(searchTypeList).map((key) => {
                    return { key: key, value: searchTypeList[key] };
                  }),
                ]"
                searchtitle="value"
                searchvalue="key"
              />
            </div>

            <div class="form-group">
              <label>{{ $t("adminAward.awardNameKo") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="search_award_name_ko"
                :placeholder="$t('adminAward.searchKoreanByName')"
              />
            </div>

            <div class="form-group">
              <label>{{ $t("adminAward.awardNameEn") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="search_award_name_en"
                :placeholder="$t('adminAward.searchEnglishName')"
              />
            </div>
          </div>
          <div class="row-3">
            <div class="form-group countrys">
              <label>{{ $t("addNewPeople.primaryDetails.country") }}</label>
              <SearchDropdown
                @dropdownValue="chooseCountry($event, countryList, countryId)"
                :search_type="countryId"
                :searchTitleListItem="countryList"
                searchtitle="country_name"
                searchvalue="id"
                :labelItem="$t('filterCard.selectCountry')"
              />
            </div>

            <div class="form-group">
              <label>{{ $t("adminAward.monthOfEvent") }}</label>
              <select class="form-control" v-model="month">
                <option value="" selected>{{ $t("dictionary.select") }}</option>
                <option v-for="i in 12" :key="i" :value="i">
                  {{ i }}
                </option>
              </select>
            </div>
            <div class="form-group">&nbsp;</div>
          </div>
        </div>
        <div class="btn-group">
          <input
            type="submit"
            class="btn org-btn"
            :value="$t('button.search')"
            @click="getAwardSearchList"
          />
          <button type="button" class="btn outline blk-btn" @click="resetList">
            {{ $t("button.reset") }}
          </button>
        </div>
      </div>

      <div class="cm-bck mt-30">
        <h3>{{ $t("adminAward.awardsList") }}</h3>

        <div class="material-sort">
          <div class="sort-innr">
            <p>{{ $t("bulk.worklist.total") }} {{ totalRecords }}</p>
            <div class="frm-innr">
              <div class="form-group">
                <select
                  class="form-control"
                  @change="getWorkListByValue($event)"
                >
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                </select>
              </div>
            </div>
          </div>
          <div class="frm-innr">
            <button
              @click="$router.push('/admin/AwardEdit')"
              type="button"
              class="btn or-btn"
            >
              <span> + </span>{{ $t("dictionary.agentList.addNew") }}
            </button>
          </div>
        </div>
        <div class="table-inner-scroll">
          <table class="table-otr table-innr last-col col3center">
            <thead>
              <tr>
                <th>{{ $t("dictionary.agentList.no") }}</th>
                <th>{{ $t("addNewMoviesForm.poster") }}</th>
                <th>
                  <div class="data-hdr">
                    {{ $t("input_label.type")
                    }}<span @click="sorting('type')"
                      ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                    /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("adminAward.awardNameKo")
                    }}<span @click="sorting('award_name_ko')"
                      ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                    /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("adminAward.awardNameEn")
                    }}<span @click="sorting('award_name_en')"
                      ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                    /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("addNewPeople.primaryDetails.country")
                    }}<span @click="sorting('country_name')"
                      ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                    /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("adminAward.city")
                    }}<span @click="sorting('city_name')"
                      ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                    /></span>
                  </div>
                </th>
                <th>
                  <div class="data-hdr">
                    {{ $t("adminAward.monthOfEvent")
                    }}<span @click="sorting('event_month')"
                      ><img src="@/assets/icons/ud-arrow-icon.svg" alt=""
                    /></span>
                  </div>
                </th>
                <th>{{ $t("dictionary.tagSearch.action") }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="awardList.length">
                <tr v-for="(item, index) in awardList" :key="item.id">
                  <td>{{ item.no }}</td>
                  <td>
                    <div v-if="item.award_poster" class="posterImg">
                      <img :src="item.award_poster" />
                    </div>
                    <div v-else class="posterImg">
                      <img src="@/assets/images/no-image-view.png" />
                    </div>
                  </td>
                  <td>
                    {{
                      item.type == "movie"
                        ? $t("header.mainMenu.Movies")
                        : item.type == "tv"
                        ? $t("header.mainMenu.TVShows")
                        : item.type == "webtoons"
                        ? $t("header.mainMenu.Webtoons")
                        : item.type == "people"
                        ? $t("header.mainMenu.People")
                        : "-"
                    }}
                  </td>
                  <td>{{ item.award_name_ko }}</td>
                  <td>{{ item.award_name_en }}</td>
                  <td>{{ item.country_name }}</td>
                  <td>{{ item.city_name }}</td>
                  <td>{{ item.event_month }}</td>
                  <td>
                    <div class="action">
                      <a @click="viewAward(item)"
                        ><img src="@/assets/icons/eye.svg"
                      /></a>
                      <a
                        ><img
                          @click="editAward(item)"
                          src="/src/assets/icons/edit-icon.svg"
                          alt=""
                      /></a>
                      <a
                        ><img
                          @click="openDeletePopup(item.id)"
                          src="/src/assets/icons/delete-icon.svg"
                          alt=""
                      /></a>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="9" class="center">
                    <span>{{ $t("dictionary.noData") }}</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <pagination
          v-model="page"
          :records="totalRecords"
          :per-page="limit"
          :options="chunkPage"
          @paginate="clickInternalPage"
        />
      </div>
    </div>
    <!-- delete award -->
    <div class="new-cast-modal center-popup-modal" v-show="isDelete">
      <PopUpModal :isModal="isDelete">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("dictionary.tagSearch.delete") }}</h1>
        </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="red-fill-btn" @click="deleteAward">
              {{ $t("button.delete") }}
            </button>
            <button class="black-outline-btn" @click="isDelete = false">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import AdminAwardService from "@/admin/services/AdminAwardService";
import AddNewMovieService from "@/services/AddNewMovieService";
import BulkWorkingExportService from "@/admin/services/BulkExportAndWorkListService";
import { onMounted, ref, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";

const searchType = ref("");
const searchTypeList = ref([]);
const search_award_name_ko = ref("");
const search_award_name_en = ref("");
const limit = ref(10);
const totalRecords = ref(0);
const sortBy = ref("id");
const sortOrder = ref("desc");
const countryList = ref([]);
const awardList = ref([]);
const countryId = ref(null);
const month = ref("");
const isDelete = ref(false);
const chunkPage = ref({ chunk: 5 });
const award_id = ref(0);
const { t } = i18n.global;
const addNewMovieService = new AddNewMovieService();
const router = useRouter();
const route = useRoute();
const page = route.params?.page ? ref(parseInt(route.params.page)) : ref(1);
const common = inject("common");

onMounted(() => {
  getAwardSearchList();
  getCountryList();
  getSearchTypeList();
});

// on language change
watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      getAwardSearchList();
      getCountryList();
      getSearchTypeList();
    }
  }
);

const getSearchTypeList = () => {
  BulkWorkingExportService.getSearchTypeList()
    .then((res) => {
      if (res.status == 200) {
        searchTypeList.value = res.data.result;
      }
    })
    .catch((err) => {
      return;
    });
};

const sorting = (sort_by) => {
  sortBy.value = sort_by;
  sortOrder.value = sortOrder.value == "desc" ? "asc" : "desc";
  getAwardSearchList();
};
const getWorkData = (value) => {
  searchType.value = value;
};
// country dropdown
const getCountryList = () => {
  addNewMovieService
    .getCountryList()
    .then((res) => {
      if (res.status == 200) {
        countryList.value = res.data.results;
      }
    })
    .catch((err) => {
      return;
    });
};
const chooseCountry = (event, list) => {
  countryId.value = event;
};

// delete award
const deleteAward = () => {
  AdminAwardService.adminAwardDelete(award_id.value)
    .then((res) => {
      if (res.status == 200) {
        Toast.fire({ title: t("Error.success") });
        isDelete.value = false;
        getAwardSearchList();
      }
    })
    .catch((err) => {
      return;
    });
};
const openDeletePopup = (id) => {
  award_id.value = id;
  isDelete.value = true;
};

const viewAward = (item) => {
  router.push({
    name: "AwardEditBasicInfo",
    params: {
      page: page.value,
      id: item.id,
      pageTitle: item.award_name_en
    },
  });
};

const editAward = (item) => {
  router.push({
    name: "AwardEdit",
    params: {
      page: page.value,
      id: item.id,
    },
  });
};

const clickInternalPage = (click) => {
  page.value = click;
  getAwardSearchList();
};

const getWorkListByValue = (event) => {
  page.value = 1;
  limit.value = event.target.value;
  getAwardSearchList();
};

const resetList = () => {
  searchType.value = "";
  search_award_name_en.value = "";
  search_award_name_ko.value = "";
  countryId.value = null;
  month.value = "";
  getAwardSearchList();
};
const getAwardSearchList = () => {
  let data = {
    page: page.value,
    limit: limit.value,
    search_params: {
      search_type: searchType.value,
      search_award_name_ko: search_award_name_ko.value,
      search_award_name_en: search_award_name_en.value,
      search_country_id: countryId.value,
      event_month: month.value,
    },
    sort_order: sortOrder.value,
    sort_by: sortBy.value,
  };
  AdminAwardService.adminAwardList(data)
    .then((res) => {
      if (res.status == 200) {
        awardList.value = res.data.result;
        for (let i = 0; i < awardList.value.length; i++) {
          awardList.value[i]["no"] = (page.value - 1) * limit.value + i + 1;
        }
        totalRecords.value = res.data.total_records;
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
