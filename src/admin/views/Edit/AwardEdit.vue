<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/award-icon.svg" alt="" /></span
        >{{ $t("header.mainMenu.Awards") }}
      </h2>
      <div class="cm-bck">
        <h3 v-if="!route.params.id">{{ $t("adminAward.addAward") }}</h3>
        <h3 v-else>{{ $t("adminAward.editAward") }}</h3>

        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("input_label.type") }}</label>
              <Dropdown
                @dropdownValue="getWorkData"
                :search_type="search_type"
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
                :isError="error.search_type ? true : false"
              />
              <span v-if="error.search_type" class="error-txt"
                >{{ error.search_type }}
              </span>
            </div>
            <div class="form-group">
              <label>{{ $t("adminAward.awardNameKo") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="award_name_ko"
                maxlength="150"
                :placeholder="$t('adminAward.divPlaceKo')"
              />
            </div>

            <div class="form-group">
              <label>{{ $t("adminAward.awardNameEn") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="award_name_en"
                :class="error.award_name_en ? 'error-border' : ''"
                maxlength="150"
                :placeholder="$t('adminAward.divPlaceEn')"
              />
              <span v-if="error.award_name_en" class="error-txt"
                >{{ error.award_name_en }}
              </span>
            </div>
          </div>

          <div class="row-3">
            <div class="form-group countrys">
              <label>{{ $t("addNewPeople.primaryDetails.country") }}</label>
              <SearchDropdown
                @dropdownValue="chooseCountry($event, countryList, country_id)"
                :search_type="country_id"
                :searchTitleListItem="countryList"
                searchtitle="country_name"
                searchvalue="id"
                :labelItem="$t('filterCard.selectCountry')"
                :isError="error.country ? true : false"
              />
              <span v-if="error.country" class="error-txt">{{
                error.country
              }}</span>
            </div>
            <div class="form-group">
              <label>{{ $t("adminAward.city") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="city_name"
                maxlength="150"
                :placeholder="$t('adminAward.enterCityName')"
              />
            </div>
            <div class="form-group">
              <label>{{ $t("adminAward.place") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="place"
                maxlength="150"
                :placeholder="$t('adminAward.enterPlace')"
              />
            </div>
          </div>

          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("adminAward.monthOfEvent") }}</label>
              <select
                class="form-control"
                v-model="month"
                :class="error.month ? 'error-border' : ''"
              >
                <option value="" selected>{{ $t("dictionary.select") }}</option>
                <option v-for="i in 12" :key="i" :value="i">
                  {{ i }}
                </option>
              </select>
              <span v-if="error.month" class="error-txt">{{
                error.month
              }}</span>
            </div>
            <div class="form-group">
              <label>{{ $t("adminAward.webUrl") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="website_url"
                @keyup="checkURL(website_url, 'website_url')"
                :class="error.website_url ? 'error-border' : ''"
                placeholder="https://"
              />
              <span v-if="error.website_url" class="error-txt">{{
                error.website_url
              }}</span>
            </div>
            <div class="form-group">
              <label>{{ $t("season.newsSearchKeyword") }}</label>
              <input
                type="text"
                maxlength="100"
                class="form-control"
                v-model="news_search_keyword"
                :placeholder="$t('adminAward.newKeywordPlacholder')"
              />
            </div>
          </div>

          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("adminAward.uploadProfilePicture") }}</label>
              <div class="input-upload-otr">
                <div class="input-upload">
                  <input
                    type="text"
                    class="form-control"
                    :value="fileName"
                    :class="fileError ? 'error-border' : ''"
                    readonly
                    :placeholder="$t('adminAward.imageFileExtension')"
                  />
                  <span v-if="fileError" class="error-txt"
                    >{{ fileError }}
                  </span>
                </div>
                <div class="upload-btn">
                  <input
                    id="file"
                    @change="chooseFile"
                    type="file"
                    ref="uploadFile"
                  />
                  <label for="file" class="btn org-btn">{{
                    $t("addNewMoviesForm.choose")
                  }}</label>
                </div>
              </div>

              <div class="uploadview-pic" v-if="fileURL">
                <span class="clsBtn"
                  ><img
                    src="@/assets/icons/close-wht.svg"
                    @click="deleteProfilePic"
                /></span>
                <img v-if="fileURL" :src="fileURL" />
              </div>
            </div>
            <div class="form-group"></div>
            <div class="form-group"></div>
          </div>

          <div class="row">
            <div class="form-group">
              <label>{{ $t("adminAward.expKo") }}</label>
              <textarea
                class="form-control customtxt"
                rows="5"
                v-model="explanation_ko"
                :placeholder="$t('adminAward.enterDescription')"
              ></textarea>
            </div>
          </div>

          <div class="row">
            <div class="form-group">
              <label>{{ $t("adminAward.expEn") }}</label>
              <textarea
                class="form-control customtxt"
                rows="5"
                v-model="explanation_en"
                :placeholder="$t('adminAward.enterDescription')"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="btn-group justify-btwn">
          <div class="twoBtn">
            <input
              type="submit"
              class="btn org-btn"
              :value="$t('button.save')"
              @click="adminAwardAdd"
            />
            <button
              v-if="route.params.id"
              type="button"
              class="btn outline blk-btn"
              @click="
                $router.push(`/admin/AwardEditBasicInfo/${route.params.id}`)
              "
            >
              {{ $t("button.close") }}
            </button>
          </div>
          <button
            type="button"
            class="btn outline blk-btn"
            @click="backListPage"
          >
            {{ $t("button.back") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/admin/components/Sidebar.vue";
import AdminAwardService from "@/admin/services/AdminAwardService";
import BulkWorkingExportService from "@/admin/services/BulkExportAndWorkListService";
import AddNewMovieService from "@/services/AddNewMovieService";
import { isValidUrl } from "@/mixins/CommonValidation.js";
import { onMounted, ref, watch } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { inject } from "vue";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";

const search_type = ref("");
const searchTypeList = ref([]);
const award_name_ko = ref("");
const award_name_en = ref("");
const month = ref("");
const country_id = ref();
const countryList = ref([]);
const city_name = ref("");
const place = ref("");
const file = ref("");
const fileURL = ref("");
const fileName = ref("");
const fileType = ref("");
const fileError = ref("");
const is_poster_deleted = ref("n");
const error = ref({});

const news_search_keyword = ref("");
const website_url = ref("");
const explanation_en = ref("");
const explanation_ko = ref("");
const addNewMovieService = new AddNewMovieService();
const router = useRouter();
const route = useRoute();
const uploadFile = ref(null);
const { t } = i18n.global;
const common = inject("common");

onMounted(() => {
  getSearchTypeList();
  getCountryList();
  if (route.params.id) {
    document.title=t("pageTitle.admin.editAward")+ ' - 11DB';
    adminAwardInfo();
  }
});

// on language change
watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      getSearchTypeList();
      getCountryList();
      if (route.params.id) {
        document.title=t("pageTitle.admin.editAward")+ ' - 11DB';
        adminAwardInfo();
      }
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
const getWorkData = (value) => {
  search_type.value = value;
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
  country_id.value = event;
};

// check agency official site
const checkURL = (url, errorLocation) => {
  if (url == "") {
    delete error.value[errorLocation];
    return true;
  }
  if (!isValidUrl(url)) {
    error.value[errorLocation] = t("Error.validUrl");
    return false;
  } else {
    delete error.value[errorLocation];
  }
};

// choose file
const chooseFile = (e) => {
  fileError.value = "";
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  file.value = files[0];
  let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  if (!allowedExtensions.exec(file.value.name)) {
    fileError.value = t("Error.onlyJpg");
    file.value = "";
    fileURL.value = "";
    fileName.value = "";
    return false;
  } else if (allowedExtensions.exec(file.value.name)) {
    fileURL.value = URL.createObjectURL(e.target.files[0]);
    fileType.value = file.value.type;
    fileName.value = file.value.name;
    is_poster_deleted.value = "n";
    uploadFile.value = "";
  }
};

const deleteProfilePic = () => {
  file.value = "";
  fileName.value = "";
  fileURL.value = "";
  fileError.value = "";
  is_poster_deleted.value = "y";
};

const backListPage = () => {
  router.push({
      name: "AwardList",
      params: {
        page: route.params?.page,
      },
    });
}

const adminAwardInfo = () => {
  AdminAwardService.adminAwardInfo(route.params.id)
    .then((res) => {
      if (res.status == 200) {
        search_type.value = res.data.type;
        award_name_en.value = res.data.award_name_en;
        award_name_ko.value = res.data.award_name_ko;
        country_id.value = res.data.country_id;
        city_name.value = res.data.city_name;
        place.value = res.data.place;
        month.value = res.data.event_month;
        website_url.value = res.data.website_url;
        news_search_keyword.value = res.data.news_search_keyword;
        fileURL.value = res.data.award_poster;
        explanation_en.value = res.data.explanation_en;
        explanation_ko.value = res.data.explanation_ko;
      }
    })
    .catch((err) => {
      return;
    });
};
const adminAwardAdd = () => {
  if (search_type.value == "") {
    error.value.search_type = t("Error.requiredInput");
    return;
  } else {
    error.value.search_type = "";
  }
  if (award_name_en.value == "") {
    error.value.award_name_en = t("Error.requiredInput");
    return;
  } else {
    error.value.award_name_en = "";
  }
  if (!country_id.value) {
    error.value.country = t("Error.requiredInput");
    return;
  } else {
    error.value.country = "";
  }
  if (!month.value) {
    error.value.month = t("Error.requiredInput");
    return;
  } else {
    error.value.month = "";
  }

  let formData = new FormData();
  formData.append("type", search_type.value);
  formData.append("award_name_ko", award_name_ko.value);
  formData.append("award_name_en", award_name_en.value);
  formData.append("country", country_id.value);
  formData.append("city_name", city_name.value);
  formData.append("place", place.value);
  formData.append("news_search_keyword", news_search_keyword.value);
  formData.append("website_url", website_url.value);
  formData.append("explanation_en", explanation_en.value);
  formData.append("explanation_ko", explanation_ko.value);
  if (month.value) {
    formData.append("event_month", month.value);
  }
  if (route.params.id) {
    if (is_poster_deleted.value == "n" && file.value != "") {
      formData.append("poster_image", file.value);
      formData.append("is_poster_deleted", "n");
    } else if (is_poster_deleted.value == "n" && file.value == "") {
      formData.append("is_poster_deleted", "n");
    } else {
      formData.append("is_poster_deleted", "y");
    }
    formData.append("id", route.params.id);
    AdminAwardService.adminAwardEdit(formData)
      .then((res) => {
        if (res.status == 200) {
          Toast.fire({ title: res.data.message });
          router.push("/admin/AwardList");
        } else if (res.response.status == 400) {
          Toast.fire({ title: res.response.data.error });
        }
      })
      .catch((err) => {
        return;
      });
  } else {
    formData.append("poster_image", file.value);
    AdminAwardService.adminAwardAdd(formData)
      .then((res) => {
        if (res.status == 200) {
          Toast.fire({ title: res.data.message });
          router.push("/admin/AwardList");
        } else if (res.response.status == 400) {
          Toast.fire({ title: res.response.data.error });
        }
      })
      .catch((err) => {
        return;
      });
  }
};
</script>
<style scoped>
.center {
  text-align: center !important;
}

.error-txt {
  color: #db5857;
  padding-left: 0;
  font-weight: 600;
  font-size: 14px;
  display: block;
  text-align: left;
}
</style>
