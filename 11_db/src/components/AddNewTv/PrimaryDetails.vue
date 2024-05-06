<template>
  <div>
    <div class="primary-details-from">
      <div class="page-heading-area page-main-heading">
        <h2>{{ $t("addNewPeople.primaryDetails.header") }}</h2>
        <div class="divRows">
          <a @click="isEdit == true ? isEditBtn() : isSaveBtn()" class="saveBtn">{{ isEdit ? $t("button.edit") :
            $t("button.save") }}</a>
        </div>
      </div>

      <div class="login-wrap">
        <div class="box">
          <form @submit.prevent="">
            <div class="divRows">
              <div class="heads-area">
                <h3>{{ $t("addNewMoviesForm.extenalData") }}</h3>
                <span @mouseover="hover = true" @mouseleave="hover = false"><img src="@/assets/icons/question.svg"
                    alt="question" /></span>
              </div>
              <div class="div3colmns">
                <div class="form-group">
                  <label>{{ $t("addNewMoviesForm.IMDBID") }}</label>
                  <input type="text" v-model="imdb_id" class="form-control" placeholder="" maxlength="255"
                    @keypress="isNumChar($event)" :class="error.imdb_id ? 'error-border' : ''" :disabled="isEdit" />
                  <span class="error-txt" v-if="error.imdb_id">{{
                    error.imdb_id
                  }}</span>
                </div>
                <div class="form-group">
                  <label>{{ $t("addNewMoviesForm.TIVINGID") }}</label>
                  <input type="text" v-model="tiving_id" class="form-control" placeholder="" maxlength="255"
                    @keypress="isNumChar($event)" :class="error.tiving_id ? 'error-border' : ''" :disabled="isEdit" />
                  <span class="error-txt" v-if="error.tiving_id">{{
                    error.tiving_id
                  }}</span>
                </div>
                <div class="form-group">
                  <label>{{ $t("addNewMoviesForm.ODKID") }}</label>
                  <input type="text" v-model="odk_id" class="form-control" placeholder="" @keypress="isNumChar($event)"
                    maxlength="255" :class="error.odk_id ? 'error-border' : ''" :disabled="isEdit" />
                  <span class="error-txt" v-if="error.odk_id">{{
                    error.odk_id
                  }}</span>
                </div>
                <div class="form-group">
                  <label>{{ $t("addNewMoviesForm.TMDBID") }}</label>
                  <input type="text" v-model="tmdb_id" class="form-control" placeholder=""
                    @keypress="isIntegerNumber($event)" :class="error.tmdb_id ? 'error-border' : ''" :disabled="isEdit" />
                  <span class="refreshBtn" :class="isEdit ? 'pointer-events-none' : ''" @click="tmdbRefreshClick"><svg
                      width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 1V6H1.58152M16.9381 8C16.446 4.05369 13.0796 1 9 1C5.64262 1 2.76829 3.06817 1.58152 6M1.58152 6H6M17 17V12H16.4185M16.4185 12C15.2317 14.9318 12.3574 17 9 17C4.92038 17 1.55399 13.9463 1.06189 10M16.4185 12H12"
                        stroke="white" />
                    </svg>
                  </span>
                  <span class="error-txt" v-if="error.tmdb_id">{{
                    error.tmdb_id
                  }}</span>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>
                {{ $t("addNewMoviesForm.title") }}
                <span>*</span>
              </h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input v-model="title_name" type="text" class="form-control"
                    :placeholder="$t('primaryDetails.typeTvShowTitle')" @keyup="error.title_name = ref('')"
                    @keypress="requiredField" maxlength="150" :class="error.title_name ? 'error-border' : ''"
                    :disabled="isEdit" />
                  <span v-if="error.title_name" class="error-txt">{{
                    error.title_name
                  }}</span>
                </div>
                <div class="text-hint">
                  <p v-if="route.params.type == 'tmdb' || istmDBIdClick">
                    {{ $t("primaryDetails.TMDB") }} : {{ tmdb_title }}
                  </p>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewMoviesForm.summary") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <textarea v-model="summary" rows="5" class="form-control"
                    :placeholder="$t('primaryDetails.typeTvShowSummary')" :class="error.summary ? 'error-border' : ''"
                    :disabled="isEdit"></textarea>
                  <span v-if="error.summary" class="error-txt">{{
                    error.summary
                  }}</span>
                  <!-- <span class="numbers">{{ remainingCount }}/230</span> -->
                </div>
                <div class="text-hint">
                  <p v-if="route.params.type == 'tmdb' || istmDBIdClick">
                    {{ $t("primaryDetails.TMDB") }} : {{ tmdb_summery }}
                  </p>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewMoviesForm.officialSite") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input type="text" v-model="official_site" class="form-control" placeholder="http//" @keyup="checkURL"
                    :class="error.official_site ? 'error-border' : ''" :disabled="isEdit" />
                  <span v-if="error.official_site" class="error-txt">{{
                    error.official_site
                  }}</span>
                </div>
                <div class="text-hint">
                  <p v-if="route.params.type == 'tmdb' || istmDBIdClick">
                    {{ $t("primaryDetails.TMDB") }} : {{ tmdb_official_site }}
                  </p>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewMoviesForm.searchKeyword") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input v-model="search_keyword" type="text" class="form-control" :placeholder="$t('addNewMoviesForm.enterKeywordAndSeparateWithComma')
                    " maxlength="100" :disabled="isEdit" />
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <div class="divRows">
              <h3>
                {{ $t("addNewMoviesForm.status") }}
                <span>*</span>
              </h3>
              <div class="div1colmns">
                <div class="form-group">
                  <SearchDropdown @dropdownValue="getDropdownStatus" :search_type="title_status"
                    :searchTitleListItem="statusListItem" searchtitle="searchtitle" searchvalue="searchvalue"
                    :disabled="isEdit" :isError="error.title_status ? true : false"
                    :labelItem="$t('addNewMoviesForm.selectStatus')" />
                  <span v-if="error.title_status" class="error-txt">{{
                    error.title_status
                  }}</span>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewMoviesForm.releaseDate") }}</h3>
              <div class="div1colmns two-calender">
                <Calender @date="getRealeaseDate" :input_date="release_date" :datePlaceholder="datePlaceholder"
                  :disabled="isEdit" />
                <span>-</span>
                <Calender @date="getRealeaseDateTo" :input_date="release_date_to"
                  :disabled="!release_date || isEdit ? true : false" :min_date="release_date
                    ? new Date(new Date(release_date).getTime() + 86400000)
                    : ''
                    " :datePlaceholder="datePlaceholder" />
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("primaryDetails.rating") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input v-model="rating" type="text" class="form-control" :placeholder="$t('primaryDetails.typeRating')"
                    @keypress="isNumberDecimal($event)" maxlength="6" :class="error.rating ? 'error-border' : ''"
                    :disabled="isEdit" />
                  <span class="error-txt" v-if="error.rating">{{
                    error.rating
                  }}</span>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewMoviesForm.runtime") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input v-model="runtime" type="text" class="form-control"
                    :placeholder="$t('addNewMoviesForm.typeRuntime')" @keypress="isIntegerNumber($event)"
                    @change="changeRuntime" @input="onInputRuntime" maxlength="4"
                    :class="error.runtime ? 'error-border' : ''" :disabled="isEdit" />
                  <span class="runtime-min">{{
                    $t("addNewMoviesForm.min")
                  }}</span>
                  <span class="error-txt" v-if="error.runtime">{{
                    error.runtime
                  }}</span>
                </div>
              </div>
            </div>

            <div class="divRows">
              <h3>{{ $t("addNewMoviesForm.certification") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <SearchDropdown @dropdownValue="getCertification" :search_type="certification"
                    :searchTitleListItem="certificationListItem" searchtitle="searchtitle" searchvalue="searchvalue"
                    :disabled="isEdit" :labelItem="$t('addNewMoviesForm.chooseCertification')" />
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewMoviesForm.language") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input v-model="language" type="text" class="form-control"
                    :placeholder="$t('addNewMoviesForm.typeLanguage')" maxlength="100" :disabled="isEdit" />
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewMoviesForm.country") }}</h3>
              <div class="div1colmns nomar">
                <div class="form-group">
                  <SearchDropdown @dropdownValue="
                    chooseCountry(
                      $event,
                      countryList,
                      countryBelowList,
                      country,
                      country_id,
                      route
                    )
                    " :search_type="country_id[0]" :searchTitleListItem="countryList" searchtitle="country_name"
                    searchvalue="id" :disabled="countryBelowList.length > 5 || isEdit"
                    :labelItem="$t('filterCard.selectCountry')" :class="isEdit ? 'pointer-events-none' : ''" />
                </div>
                <div class="country-list" v-if="countryBelowList.length > 0">
                  <div class="count-list-tag" :class="isEdit ? 'isDisabled' : ''" v-for="(item, i) in countryBelowList"
                    :key="i">
                    {{ item.country_name }}
                    <span class="corss" @click="
                      removeCountry(item, countryBelowList, country, route);
                    country_id = [];
                    " :class="isEdit ? 'pointer-events-none' : ''"><img src="@/assets/icons/close.svg" /></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="divRows">
              <OriginalWork :isEdit="isEdit" :site_language="site_language" :originalWorkListData="originalInputData"
                @newData="(data) => {
                  originalInputData = data;
                }
                  " :error="error" :key="resetComponents" />
            </div>
            <div class="divider"></div>
            <div class="divRows">
              <h3>{{ $t("addNewMoviesForm.connections") }}</h3>
              <div class="div1colmns nogap">
                <SearchVideo @searchInput="getConnectionSearch" :list="connectionSearchList"
                  :isConnectionData="isConnectionData" @connectionInput="getConnectionInput"
                  :connectionBelowList="connectionBelowList" :connectionValue="connection" type="connection"
                  title_type="tv" :isEdit="isEdit" @scrolling="onConnectionScroll" :page="page" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- submit modal -->
    <div class="new-cast-modal center-popup-modal">
      <PopUpModal :isModal="isSubmit">
        <template v-slot:header>
          <h1 class="text-center" v-html="$t('addNewMoviesForm.youShouldSubmitToSendTheAdd')"></h1>
        </template>
        <template v-slot:body> </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="black-outline-btn" @click="savePrimaryDetails" :disabled="isOnceClickSaveBtn">
              {{ $t("button.ok") }}
            </button>
            <button class="red-fill-btn" @click="isSubmit = false">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>
  </div>
</template>

<script setup>
import Calender from "@/components/Calender.vue";
import SearchVideo from "@/components/SearchVideo.vue";
import AddNewMovieService from "@/services/AddNewMovieService";
import AddNewTVService from "@/services/AddNewTVService";
import EditMovieService from "@/services/EditMovieService";
import { computed, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import OriginalWork from "@/components/AddNewmovie/OriginalWork.vue";
import { useRoute, useRouter } from "vue-router";
import Toast from "@/alert/alert.js";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import { requiredField, isNumChar, isIntegerNumber, isValidUrl, isNumberDecimal } from "@/mixins/CommonValidation.js";
import { removeCountry, chooseCountry } from "@/mixins/CountryFunctions.js";
import EditTVService from "@/services/EditTVService";

const props = defineProps({
  site_language: String
})
const emit = defineEmits(['selectedId', 'isEditOn'])

const hover = ref(false);
const route = useRoute();
const router = useRouter();
const search_type = ref("tv");
const statusList = ref([]);
const title_status = ref(null);
const certificationList = ref([]);
const certification = ref(null);
const routeId = route.params.id;
const tmdb_id = ref(
  route.params.type == "tmdb" ? route.params.external_id : route.params.type == "internal" ? localStorage.getItem("tmdb_id") ? localStorage.getItem("tmdb_id") : "" : ""
);
const tiving_id = ref("");
const imdb_id = ref("");
const title_name = ref("");
const summary = ref("");
const official_site = ref("");
const search_keyword = ref("");
const release_date = ref("");
const release_date_to = ref("");
const runtime = ref("");
const rating = ref("");
const language = ref("");
const originalWorkList = ref([]);
const originalInputData = ref([]);
const country = ref([]);
const countryList = ref([]);
const countryBelowList = ref([]);
const error = ref({});
const addNewMovieService = new AddNewMovieService();
const addNewTVService = new AddNewTVService();
const editTVService = new EditTVService();
const editMovieService = new EditMovieService();
const draft_request_id = ref(routeId);
const tmdb_title = ref("");
const tmdb_summery = ref("");
const draft_status = ref("");
const relation_id = ref("");
const tmdb_official_site = ref("");
const isSubmit = ref(false);
const connectionSearchInput = ref("");
const connectionSearchList = ref([]);
const connection = ref([]);
const watch_on_stream = ref([]);
const watch_on_rent = ref([]);
const watch_on_buy = ref([]);
const connectionBelowList = ref([]);
const datePlaceholder = ref("YYYY.MM.DD");
const isOnceClickSaveBtn = ref(false);
const istmDBIdClick = ref(false);
const title_id = ref(
  route.params.type == "internal" ? route.params.external_id : ""
);
const isEdit = ref(false);
const country_id = ref([]);
const statusListItem = ref([]);
const certificationListItem = ref([]);
const odk_id = ref("");
const resetComponents = ref(0);
const page = ref(1);
const limit = ref(10);
const totalRecords = ref(0);
const isConnectionData = ref(false);

// on language change
watch(
  () => props.site_language,
  function (n, o) {
    if (n && n != o) {
      const draft_ids = JSON.parse(
        localStorage.getItem("draft_ids") || "[]"
      );
      resetComponents.value++;
      if (draft_ids[0]) {
        draft_request_id.value =
          draft_ids[0]?.primaryDetails[search_type.value] &&
            draft_ids[0]?.primaryDetails[search_type.value][
              props.site_language
            ]?.draft_request_id
            ? draft_ids[0]?.primaryDetails[search_type.value][
              props.site_language
            ]?.draft_request_id
            : "";
      } else {
        draft_request_id.value = draft_request_id.value;
      }
      title_name.value = "";
      official_site.value = "";
      summary.value = "";
      tiving_id.value = "";
      imdb_id.value = "";
      setTimeout(() => {
        titleStatusDropdown();
        crtificationDropdown();
        getOriginalWorkList();
        getCountryList();
        getPrimaryDetails();
      }, 500);
    }
  }
);

onMounted(() => {
  if (route.params.type == "internal") {
    isEdit.value = true;
  }
  const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
  if (draft_ids[0]) {
    if (!draft_ids[0]?.primaryDetails[search_type.value]) {
      localStorage.removeItem("site_language");
      localStorage.removeItem("draft_ids");
      localStorage.removeItem("saveIdList");
    }
    draft_request_id.value =
      draft_ids[0]?.primaryDetails[search_type.value] &&
        draft_ids[0]?.primaryDetails[search_type.value][props.site_language]
          ?.draft_request_id
        ? draft_ids[0]?.primaryDetails[search_type.value][
          props.site_language
        ]?.draft_request_id
        : "";
  } else {
    draft_request_id.value = draft_request_id.value;
  }
  titleStatusDropdown();
  crtificationDropdown();
  getOriginalWorkList();
  getCountryList();
  getPrimaryDetails();
});

// title status dropdown
const titleStatusDropdown = () => {
  statusListItem.value = [];
  addNewMovieService
    .getStatusList(search_type.value)
    .then((res) => {
      if (res.status == 200) {
        statusList.value = res.data.status_list;
        Object.entries(statusList.value).forEach(([key, value]) => {
          statusListItem.value.push({
            searchvalue: `${key}`,
            searchtitle: `${value}`,
          });
        });
      }
    })
    .catch((err) => {
      return;
    });
};

const onInputRuntime = (event) => {
  runtime.value = event.target.value.replaceAll(",", "");
};

const changeRuntime = (event) => {
  runtime.value = Number(
    event.target.value.replaceAll(",", "")
  ).toLocaleString("en-US");
};

const getDropdownStatus = (val) => {
  title_status.value = val;
  error.value.title_status = ref("");
};

const isEditBtn = () => {
  isEdit.value = false;
  emit("isEditOn", false);
};

const isSaveBtn = () => {

  if (title_name.value == "") {
    error.value.title_name = computed(() => t("Error.requiredInput"));
  } else {
    error.value.title_name = ref("");
  }
  if (title_status.value == null) {
    error.value.title_status = computed(() => t("Error.requiredInput"));
  } else {
    error.value.title_status = ref("");
  }

  if (imdb_id.value) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
    if (specialChars.test(imdb_id.value)) {
      error.value.imdb_id = computed(() => t("Error.specialCharacter"));
    } else {
      error.value.imdb_id = ref("");
    }
  }
  if (tiving_id.value) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
    if (specialChars.test(tiving_id.value)) {
      error.value.tiving_id = computed(() => t("Error.specialCharacter"));
    } else {
      error.value.tiving_id = ref("");
    }
  }
  if (tmdb_id.value) {
    if (isNaN(tmdb_id.value)) {
      error.value.tmdb_id = computed(() => t("Error.onlyNumber"));
    } else {
      error.value.tmdb_id = ref("");
    }
  }
  if (odk_id.value) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
    if (specialChars.test(odk_id.value)) {
      error.value.odk_id = computed(() => t("Error.specialCharacter"));
    } else {
      error.value.odk_id = ref("");
    }
  }
  if (rating.value) {
    if (/^[0-9]+\.?[0-9]*$/.test(rating.value)) {
      error.value.rating = ref("");
    } else {
      error.value.rating = computed(() => t("Error.onlyNumber"));
    }
  }
  if (rating.value != "" && (rating.value < 0.1 || rating.value > 100)) {
    error.value.rating = computed(() => t("Error.rating"));
  }
  if (runtime.value) {
    runtime.value = runtime.value.replace(",", "");
    if (isNaN(runtime.value)) {
      error.value.runtime = computed(() => t("Error.onlyNumber"));
    } else {
      error.value.runtime = ref("");
    }
  }
  error.value.originalWorkType = ref([]);
  originalInputData.value.forEach((item, index) => {
    if (item.type == undefined) {
      item.type = 'Choose';
    }
    if (
      !(
        (item.title && item.type != "Choose" && item.original_artist) ||
        (!item.title && item.type == "Choose" && !item.original_artist)
      )
    ) {
      error.value.originalWorkType[index] = computed(() =>
        t("Error.allRequiredFields")
      );
    } else {
      delete error.value.originalWorkType[index];
    }
  });

  if (
    Object.values(error.value).filter((x) => {
      return x.length > 0;
    }).length != 0
  ) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    return false;
  }
  isSubmit.value = true;
};

// cirtification dropdown
const crtificationDropdown = () => {
  certificationListItem.value = [];
  addNewMovieService
    .getCertificationList(search_type.value)
    .then((res) => {
      if (res.status == 200) {
        certificationList.value = res.data.certification_list;
        Object.entries(certificationList.value).forEach(([key, value]) => {
          certificationListItem.value.push({
            searchvalue: `${key}`,
            searchtitle: `${value}`,
          });
        });
      }
    })
    .catch((err) => {
      return;
    });
};

const getCertification = (val) => {
  certification.value = val;
};

// original work dropdown
const getOriginalWorkList = () => {
  addNewMovieService
    .getOriginalWorkList()
    .then((res) => {
      if (res.status == 200) {
        originalWorkList.value = res.data.original_work_type_list;
      }
    })
    .catch((err) => {
      return;
    });
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

// get release date
const getRealeaseDate = (date) => {
  release_date.value = date;
};

// get release date
const getRealeaseDateTo = (date) => {
  release_date_to.value = date;
};

//connection input
const getConnectionInput = (id) => {
  connection.value = id;
};

const onConnectionScroll = (newPage) => {
  page.value = newPage;
  if (totalRecords.value > connectionSearchList.value.length) connectionSearch();;
};

// connection search
const connectionSearch = () => {
  addNewMovieService
    .getConnectionList(connectionSearchInput.value, '', page.value, limit.value)
    .then((res) => {
      if (res.status == 200) {
        isConnectionData.value = true;
        totalRecords.value = res.data.total_records;
        res.data.results.forEach((item) => {
          if (!connectionSearchList.value.some((existingItem) => existingItem.title_id === item.title_id)) {
            connectionSearchList.value = [...connectionSearchList.value, item];
          }
        });
      }
    })
    .catch((err) => {
      return;
    });
};

// connection search input
const getConnectionSearch = (input) => {
  isConnectionData.value = false;
  connectionSearchInput.value = input;
  if (connectionSearchInput.value == "") {
    connectionSearchList.value = [];
  } else {
    setTimeout(() => {
      page.value = 1;
      connectionSearchList.value = [];
      connectionSearch();
    }, 500);
  }
};

// save primary details
const savePrimaryDetails = () => {
  const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
  originalInputData.value = originalInputData.value.filter(
    (item) => {
      return item.type != "Choose" && item.original_artist && item.title;
    }
  );
  isOnceClickSaveBtn.value = true;
  let credentails = {
    name: title_name.value,
    relation_id:
      relation_id.value ||
      draft_ids[0]?.primaryDetails[search_type.value]?.draft_relation_id,
    site_language: props.site_language,
    title_status: title_status.value,
    tmdb_id: tmdb_id.value,
    imdb_id: imdb_id.value,
    tiving_id: tiving_id.value,
    summary: summary.value,
    official_site: official_site.value,
    search_keyword: search_keyword.value,
    release_date: release_date.value,
    release_date_to: release_date_to.value,
    runtime: runtime.value,
    certification: certification.value,
    language: language.value,
    rating: rating.value,
    country: country.value,
    original_work: originalInputData.value,
    connections: connection.value,
    odk_id: odk_id.value,
  };
  if (route.params.type == "internal") {
    credentails["title_id"] = title_id.value;
  }
  error.value.title_name = "";
  let saveTVPrimaryDetails;

  if (route.params.type == "internal") {
    saveTVPrimaryDetails = editTVService.editTVPrimaryDetails(credentails);
  } else {
    saveTVPrimaryDetails = addNewTVService.addPrimaryDetails(credentails);
  }

  saveTVPrimaryDetails
    .then((res) => {
      if (res.status == 200) {
        isOnceClickSaveBtn.value = false;
        Toast.fire({ title: t("Error.success") });
        if (res.data.data && res.data.data.length == 1) {
          router.push(
            "/add-tv-details/" +
            route.params.external_id +
            "/" +
            route.params.type +
            "/" +
            res.data.data[0].draft_request_id
          );
        }
        if (res.data.data && res.data.data.length == 2) {
          if (props.site_language == res.data.data[0].draft_site_language) {
            router.push(
              "/add-tv-details/" +
              route.params.external_id +
              "/" +
              route.params.type +
              "/" +
              res.data.data[0].draft_request_id
            );
          }
          if (props.site_language == res.data.data[1].draft_site_language) {
            router.push(
              "/add-tv-details/" +
              route.params.external_id +
              "/" +
              route.params.type +
              "/" +
              res.data.data[1].draft_request_id
            );
          }
        }

        // if (draft_ids[0]) {
        //   const res_option_type =
        //     draft_ids[0].primaryDetails[search_type.value][
        //       props.site_language
        //     ];

        //   if (!res_option_type) {
        //     draft_ids[0].primaryDetails[search_type.value][
        //       props.site_language
        //     ] = res.data.data[0];
        //   }
        // } else {
        //   const put_primary_details = {
        //     primaryDetails: {
        //       [search_type.value]: {
        //         [props.site_language]: res.data.data[0],
        //         draft_relation_id: res.data.data[0].draft_relation_id,
        //       },
        //     },
        //   };
        //   draft_ids.push(put_primary_details);
        // }

        if (res.data.data && res.data.data.length == 1) {
          if (draft_ids[0]) {
            const res_option_type =
              draft_ids[0].primaryDetails[search_type.value][
              props.site_language
              ];

            if (!res_option_type) {
              draft_ids[0].primaryDetails[search_type.value][
                props.site_language
              ] = res.data.data[0];
            }
          } else {
            const put_primary_details = {
              primaryDetails: {
                [search_type.value]: {
                  [props.site_language]: res.data.data[0],
                  draft_relation_id: res.data.data[0].draft_relation_id,
                },
              },
            };
            draft_ids.push(put_primary_details);
          }
        }
        if (res.data.data && res.data.data.length == 2) {
          if (draft_ids[0]) {
            // if (props.site_language == res.data.data[0].draft_site_language) {
            const res_option_type =
              draft_ids[0].primaryDetails[search_type.value][
              res.data.data[0].draft_site_language
              ];

            if (!res_option_type) {
              draft_ids[0].primaryDetails[search_type.value][
                res.data.data[0].draft_site_language
              ] = res.data.data[0];
            }
            // }
          } else {
            const put_primary_details = {
              primaryDetails: {
                [search_type.value]: {
                  [res.data.data[0].draft_site_language]: res.data.data[0],
                  draft_relation_id: res.data.data[0].draft_relation_id,
                },
              },
            };
            draft_ids.push(put_primary_details);
          }
          if (draft_ids[0]) {
            // if (props.site_language == res.data.data[1].draft_site_language) {
            const res_option_type =
              draft_ids[0].primaryDetails[search_type.value][
              res.data.data[1].draft_site_language
              ];

            if (!res_option_type) {
              draft_ids[0].primaryDetails[search_type.value][
                res.data.data[1].draft_site_language
              ] = res.data.data[1];
            }
            // }
          } else {
            const put_primary_details = {
              primaryDetails: {
                [search_type.value]: {
                  [res.data.data[1].draft_site_language]: res.data.data[1],
                  draft_relation_id: res.data.data[1].draft_relation_id,
                },
              },
            };
            draft_ids.push(put_primary_details);
          }
          if (
            draft_ids[0].primaryDetails[search_type.value] &&
            !draft_ids[0].primaryDetails[search_type.value][
            "draft_relation_id"
            ]
          ) {
            draft_ids[0].primaryDetails[search_type.value][
              "draft_relation_id"
            ] = res.data.data[0].draft_relation_id;
          }
        }

        if (route.params.type == "internal") {
          istmDBIdClick.value = false;
          isEdit.value = true;
          emit("isEditOn", true);
        }

        // Saving
        localStorage.setItem("draft_ids", JSON.stringify(draft_ids));
        localStorage.setItem("tmdb_id", tmdb_id.value);
        country.value = [];
        originalInputData.value = [];
        connection.value = [];
        watch_on_stream.value = [];
        watch_on_rent.value = [];
        watch_on_buy.value = [];
        getPrimaryDetails();
        error.value.title_name = "";
        error.value.title_status = "";
        isSubmit.value = false;
      } else if (res.response.data.statusCode == 400) {
        if (res?.response?.data?.validation?.body?.keys == "tmdb_id") {
          Toast.fire({ title: t("Error.tmdbValid") });
          isOnceClickSaveBtn.value = false;
          isSubmit.value = false;
        }
      } else {
        isSubmit.value = false;
        isOnceClickSaveBtn.value = false;
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};

const tmdbRefreshClick = () => {
  istmDBIdClick.value = true;
  getPrimaryDetails();
}

//get primary details
const getPrimaryDetails = () => {
  error.value = {};
  country.value = [];
  originalInputData.value = [];
  connection.value = [];

  let getTVPrimaryDetails;

  if (route.params.type == "internal") {
    if (istmDBIdClick.value) {
      getTVPrimaryDetails = editMovieService.getEditTmdbMoviePrimaryDetails(
        title_id.value,
        props.site_language,
        tmdb_id.value,
        search_type.value
      );
    } else {
      getTVPrimaryDetails = editTVService.getEditTVPrimaryDetails(
        title_id.value,
        draft_request_id.value,
        props.site_language,
        tmdb_id.value
      );
    }
  } else {
    getTVPrimaryDetails = addNewTVService.getPrimaryDetails(
      draft_request_id.value,
      props.site_language,
      tmdb_id.value
    );
  }

  if (tmdb_id.value || draft_request_id.value || title_id.value) {
    getTVPrimaryDetails
      .then((res) => {
        if (res.status == 200) {
          emit("selectedId", {
            request_id: res.data.request_id,
            season_id: res.data.season_request_id,
            credit_request_id: res.data.credit_request_id,
            media_request_id: res.data.media_request_id,
            tag_request_id: res.data.tag_request_id,
            episode_request_id: res.data.episode_request_id,
          });

          imdb_id.value = res.data.imdb_id || imdb_id.value;
          release_date.value = res.data.release_date;
          release_date_to.value = res.data.release_date_to;
          tmdb_title.value = res.data.tmdb_title;
          tmdb_summery.value = res.data.tmdb_summery;
          tmdb_official_site.value = res.data.tmdb_official_site;
          title_status.value = res.data.title_status
            ? res.data.title_status
            : null;
          relation_id.value = res.data.relation_id;
          title_name.value = res.data?.title;
          tmdb_id.value = res.data.tmdb_id || tmdb_id.value;
          tiving_id.value = res.data.tiving_id || tiving_id.value;
          odk_id.value = res.data.odk_id;

          summary.value = res.data.summery;
          official_site.value = res.data.official_site;
          runtime.value = res.data.runtime.toLocaleString("en-US");
          language.value = res.data.language;
          certification.value = res.data.certification
            ? res.data.certification
            : null;
          draft_status.value = res.data.status;
          search_keyword.value = res.data.search_keyword_details.join();

          countryBelowList.value = res.data.countrylist;
          Array.from(res.data.countrylist).forEach((item) => {
            if (route.params.type == "internal") {
              country.value.push({
                country_id: item.country_id,
                id: item.id,
              });
            } else {
              country.value.push(item.id);
            }
          });
          Array.from(res.data.getoriginalWork_list).forEach((item) => {
            if (route.params.type == "internal") {
              originalInputData.value.push({
                type: item.type,
                title: item.title,
                original_artist: item.artis,
                id: item.id,
              });
            } else {
              originalInputData.value.push({
                type: item.type,
                title: item.title,
                original_artist: item.artis,
              });
            }
          });
          connectionBelowList.value = res.data.getconnection_list;
          Array.from(connectionBelowList.value).forEach((item) => {
            if (route.params.type == "internal") {
              connection.value.push({
                related_title_id: item.title_id,
                id: item.id,
              });
            } else {
              connection.value.push(item.title_id);
            }
          });
          rating.value = res.data.rating;
        }
      })
      .catch((err) => {
        return;
      });
  }
};

// ** validation **
const checkURL = () => {
  if (official_site.value == "") {
    error.value.official_site = ref("");
    return true;
  }
  if (!isValidUrl(official_site.value)) {
    error.value.official_site = computed(() => t("Error.validUrl"));
    return false;
  } else {
    error.value.official_site = ref("");
  }
};
</script>
