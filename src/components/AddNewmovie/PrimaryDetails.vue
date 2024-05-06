<template>
  <div class="primary-details-from">
    <div class="page-heading-area page-main-heading">
      <h2>{{ $t("addNewMoviesForm.primaryDetails") }}</h2>
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
              <!-- <div class="hoverTxt" v-if="hover">hello</div> -->
            </div>
            <div class="div3colmns">
              <div class="form-group">
                <label>{{ $t("addNewMoviesForm.IMDBID") }}</label>
                <input type="text" v-model="imdb_id" class="form-control" placeholder="" @keypress="isNumChar($event)"
                  maxlength="255" :class="error.imdb_id ? 'error-border' : ''" :disabled="isEdit" />
                <span class="error-txt" v-if="error.imdb_id">{{
                  error.imdb_id
                }}</span>
              </div>
              <div class="form-group">
                <label>{{ $t("addNewMoviesForm.TIVINGID") }}</label>
                <input type="text" v-model="tiving_id" class="form-control" placeholder="" @keypress="isNumChar($event)"
                  maxlength="255" :class="error.tiving_id ? 'error-border' : ''" :disabled="isEdit" />
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
              <div class="form-group number-id">
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
              <div class="form-group number-id">
                <label>{{ $t("addNewMoviesForm.KOBISID") }}</label>
                <input type="text" v-model="kobis_id" class="form-control" placeholder="" @keypress="isNumChar($event)"
                  maxlength="255" :class="error.kobis_id ? 'error-border' : ''" :disabled="isEdit" />
                <span class="refreshBtn" :class="isEdit ? 'pointer-events-none' : ''"
                  @click="getPrimaryDetails(), (iskobisIdClick = true)"><svg width="18" height="18" viewBox="0 0 18 18"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 1V6H1.58152M16.9381 8C16.446 4.05369 13.0796 1 9 1C5.64262 1 2.76829 3.06817 1.58152 6M1.58152 6H6M17 17V12H16.4185M16.4185 12C15.2317 14.9318 12.3574 17 9 17C4.92038 17 1.55399 13.9463 1.06189 10M16.4185 12H12"
                      stroke="white" />
                  </svg>
                </span>
                <span class="error-txt" v-if="error.kobis_id">{{
                  error.kobis_id
                }}</span>
              </div>
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("addNewMoviesForm.title") }} <span>*</span></h3>
            <div class="div1colmns">
              <div class="form-group">
                <input v-model="title_name" type="text" class="form-control"
                  :placeholder="$t('addNewMoviesForm.typeMovieTitle')" @keyup="error.title_name = ref('')" maxlength="150"
                  @keypress="requiredField" :class="error.title_name ? 'error-border' : ''" :disabled="isEdit" />
                <span v-if="error.title_name" class="error-txt">{{
                  error.title_name
                }}</span>
              </div>
              <div class="text-hint">
                <p v-if="route.params.type == 'tmdb' || istmDBIdClick">
                  {{ $t("primaryDetails.TMDB") }} : {{ tmdb_title }}
                </p>
                <p v-if="route.params.type == 'kobis' || iskobisIdClick">
                  {{ $t("credit.KOBIS") }} : {{ kobis_title }}
                </p>
              </div>
            </div>
          </div>
          <div class="divRows">
            <div class="heads-area">
              <h3>{{ $t("addNewMoviesForm.AKA") }}</h3>
              <span @mouseover="hover2 = true" @mouseleave="hover2 = false"><img src="@/assets/icons/question.svg"
                  alt="question" /></span>
              <!-- <div class="hoverTxt" v-if="hover2">hello</div> -->
            </div>
            <div class="div1colmns">
              <div class="form-group">
                <input v-model="aka" type="text" class="form-control" :placeholder="$t('addNewMoviesForm.typeMovieAKA')"
                  maxlength="150" :disabled="isEdit" />
              </div>
              <div class="text-hint">
                <p v-if="route.params.type == 'tmdb' || istmDBIdClick">
                  {{ $t("primaryDetails.TMDB") }} : {{ tmdb_aka.toString() }}
                </p>
                <p v-if="route.params.type == 'kobis' || iskobisIdClick">
                  {{ $t("credit.KOBIS") }} : {{ kobis_aka.toString() }}
                </p>
              </div>
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("addNewMoviesForm.summary") }}</h3>
            <div class="div1colmns">
              <div class="form-group">
                <textarea v-model="summary" rows="5" class="form-control"
                  :placeholder="$t('addNewMoviesForm.typeMovieSummary')" :class="error.summary ? 'error-border' : ''"
                  :disabled="isEdit"></textarea>
                <span class="error-txt" v-if="error.summary">{{
                  error.summary
                }}</span>
                <!-- <span class="numbers">{{ remainingCount }}/230</span> -->
              </div>
              <div class="text-hint">
                <p v-if="route.params.type == 'tmdb' || istmDBIdClick">
                  {{ $t("primaryDetails.TMDB") }} : {{ tmdb_summery }}
                </p>
                <p v-if="route.params.type == 'kobis' || iskobisIdClick">
                  {{ $t("credit.KOBIS") }} : {{ kobis_summery }}
                </p>
              </div>
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("addNewMoviesForm.plot") }}</h3>
            <div class="div1colmns">
              <div class="form-group">
                <textarea v-model="plot" rows="5" class="form-control"
                  :placeholder="$t('addNewMoviesForm.typePlotSummary')" :class="error.plot ? 'error-border' : ''"
                  :disabled="isEdit"></textarea>
                <span class="error-txt" v-if="error.plot">{{
                  error.plot
                }}</span>
                <!-- <span class="numbers">{{ remainingCount2 }}/230</span> -->
              </div>
              <div class="text-hint">
                <p v-if="route.params.type == 'tmdb' || istmDBIdClick">
                  {{ $t("primaryDetails.TMDB") }} : {{ tmdb_plot_summery }}
                </p>
                <p v-if="route.params.type == 'kobis' || iskobisIdClick">
                  {{ $t("credit.KOBIS") }} : {{ kobis_plot_summery }}
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
                <p v-if="route.params.type == 'kobis' || iskobisIdClick">
                  {{ $t("credit.KOBIS") }} : {{ kobis_official_site }}
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
          <div class="divRows">
            <h3>{{ $t("addNewMoviesForm.newSearchKeyword") }}</h3>
            <div class="div1colmns">
              <div class="form-group">
                <input v-model="news_search_keyword" type="text" class="form-control" :placeholder="$t('addNewMoviesForm.enterKeywordAndSeparateWithComma')
                  " maxlength="100" :disabled="isEdit" />
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="divRows">
            <h3>{{ $t("addNewMoviesForm.status") }} <span>*</span></h3>
            <div class="div1colmns">
              <div class="form-group">
                <SearchDropdown @dropdownValue="getDropdownStatus" :search_type="title_status"
                  :searchTitleListItem="statusListItem" searchtitle="searchtitle" searchvalue="serchvalue"
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
            <div class="div1colmns">
              <Calender @date="getRealeaseDate" :input_date="release_date" :datePlaceholder="datePlaceholder"
                :disabled="isEdit" />
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("addNewMoviesForm.reRelease") }}</h3>
            <div class="div2colmns gaps">
              <div class="radioBtn">
                <input type="radio" v-model="is_rerelease" id="yes" value="1" name="radio-group"
                  :disabled="isEdit || !release_date" />
                <label for="yes" :class="isEdit || !release_date ? 'isDisabled' : ''">{{ $t("addNewMoviesForm.yes")
                }}</label>
              </div>
              <div class="radioBtn">
                <input type="radio" v-model="is_rerelease" id="no" value="0" name="radio-group" :disabled="isEdit" />
                <label for="no" :class="isEdit ? 'isDisabled' : ''">{{
                  $t("addNewMoviesForm.no")
                }}</label>
              </div>
            </div>
            <template v-if="is_rerelease == 1">
              <div class="div2colmns smgap mar18">
                <Calender @date="getreRealeaseDate($event, 0)" :input_date="firstInputRerelease" :min_date="release_date
                  ? new Date(new Date(release_date).getTime() + 86400000)
                  : ''
                  " :datePlaceholder="datePlaceholder" :disabled="isEdit" />
                <button @click="addreReleaseDate()" class="addBtn" :disabled="input_re_release.length > 8 || isEdit"
                  :class="input_re_release.length > 8 || isEdit ? 'isDisabled' : ''
                    ">
                  +
                </button>
              </div>
              <div class="div2colmns smgap m-t-12" v-for="(input, k) in input_re_release" :key="k">
                <Calender @date="getreRealeaseDate($event, k + 1)" :input_date="input.date" :min_date="release_date
                  ? new Date(new Date(release_date).getTime() + 86400000)
                  : ''
                  " :datePlaceholder="datePlaceholder" :disabled="isEdit" />
                <button @click="removereReleaseDate(k)" class="minusBtn">
                  -
                </button>
              </div>
            </template>
          </div>
          <div class="divRows">
            <h3>{{ $t("addNewMoviesForm.footfalls") }}</h3>
            <div class="div1colmns">
              <div class="form-group">
                <input v-model="footfalls" type="text" class="form-control"
                  :placeholder="$t('addNewMoviesForm.typeFootfallNo')" @keypress="isIntegerNumber($event)"
                  @change="changeFootfalls" @input="onInputFootfalls" maxlength="9"
                  :class="error.footfalls ? 'error-border' : ''" :disabled="isEdit" />
                <span class="error-txt" v-if="error.footfalls">{{
                  error.footfalls
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
                  :searchTitleListItem="certificationListItem" searchtitle="searchtitle" searchvalue="serchvalue"
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
                  :labelItem="$t('filterCard.selectCountry')" />
              </div>
              <div class="country-list" v-if="countryBelowList.length > 0">
                <div class="count-list-tag" :class="isEdit ? 'isDisabled' : ''" v-for="(item, i) in countryBelowList"
                  :key="i">
                  {{ item.country_name }}
                  <span class="corss" :class="isEdit ? 'pointer-events-none' : ''"><img src="@/assets/icons/close.svg"
                      @click="
                        removeCountry(item, countryBelowList, country, route);
                      country_id = [];
                      " /></span>
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
            <h3>{{ $t("addNewMoviesForm.watch") }}</h3>
            <div class="div1colmns">
              <div class="togglewatch-area">
                <label>{{ $t("addNewMoviesForm.stream") }}</label>
                <WatchStream :ottList="ottList" @watchInput="getWatchStreamList"
                  :selectText="$t('addNewMoviesForm.selectStream')" :belowList="getstream_list"
                  :watchstream="watch_on_stream" :isEdit="isEdit" />
              </div>
            </div>
          </div>
          <div class="divRows">
            <div class="div1colmns">
              <div class="togglewatch-area">
                <label>{{ $t("addNewMoviesForm.rent") }}</label>
                <WatchStream :ottList="ottRentList" @watchInput="getWatchRentList"
                  :selectText="$t('addNewMoviesForm.selectRent')" :belowList="getrent_list" :watchstream="watch_on_rent"
                  :isEdit="isEdit" />
              </div>
            </div>
          </div>
          <div class="divRows">
            <div class="div1colmns">
              <div class="togglewatch-area">
                <label>{{ $t("addNewMoviesForm.buy") }}</label>
                <WatchStream :ottList="ottBuyList" @watchInput="getWatchBuyList"
                  :selectText="$t('addNewMoviesForm.selectOTTProvider')" :belowList="getbuy_list"
                  :watchstream="watch_on_buy" :isEdit="isEdit" />
              </div>
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("addNewMoviesForm.connections") }}</h3>
            <div class="div1colmns nogap">
              <SearchVideo @searchInput="getConnectionSearch" :list="connectionSearchList"
                :isConnectionData="isConnectionData" @connectionInput="getConnectionInput"
                :connectionBelowList="connectionBelowList" :connectionValue="connection" type="connection"
                :isEdit="isEdit" @scrolling="onConnectionScroll" :page="page" />
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("addNewMoviesForm.series") }}</h3>
            <div class="div1colmns nogap">
              <SearchVideo @searchInput="getSeriesSearch" :list="seriesSearchList" :isConnectionData=isSeriesData
                @connectionInput="getSeriesInput" :connectionBelowList="seriesBelowList" :connectionValue="series"
                type="series" :isEdit="isEdit" @scrolling="onSeriesScroll" :page="page" />
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
          <button class="black-outline-btn" @click="submitPrimaryDetails" :disabled="isOnceClickSaveBtn">
            {{ $t("button.ok") }}
          </button>
          <button class="red-fill-btn" @click="isSubmit = false">
            {{ $t("addNewMoviesForm.cancel") }}
          </button>
        </div>
      </template>
    </PopUpModal>
  </div>
</template>

<script setup>
import Calender from "@/components/Calender.vue";
import SearchVideo from "@/components/SearchVideo.vue";
import AddNewMovieService from "@/services/AddNewMovieService";
import { computed, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import WatchStream from "@/components/AddNewmovie/WatchStream.vue";
import OriginalWork from "@/components/AddNewmovie/OriginalWork.vue";
import { useRoute, useRouter } from "vue-router";
import Toast from "@/alert/alert.js";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import { requiredField, isNumChar, isIntegerNumber, isValidUrl } from "@/mixins/CommonValidation.js";
import { chooseCountry, removeCountry } from "@/mixins/CountryFunctions.js";
import EditMovieService from "@/services/EditMovieService";
import i18n from "@/config/i18n";
const { t } = i18n.global;

const props = defineProps({
  site_language: String
})
const emit = defineEmits(['selectedId', 'isEditOn'])

const isEdit = ref(false);
const hover = ref(false);
const hover2 = ref(false);
const route = useRoute();
const router = useRouter();
const search_type = ref("movie");
const statusList = ref([]);
const title_status = ref(null);
const certificationList = ref([]);
const certification = ref(null);
const routeId = route.params.id;
const tmdb_id = ref(
  route.params.type == "tmdb" ? route.params.external_id : route.params.type == "internal" ? localStorage.getItem("tmdb_id") ? localStorage.getItem("tmdb_id") : "" : ""
);
const kobis_id = ref(
  route.params.type == "kobis" ? route.params.external_id : ""
);
const imdb_id = ref("");
const title_name = ref("");
const aka = ref("");
const summary = ref("");
const plot = ref("");
const official_site = ref("");
const search_keyword = ref("");
const news_search_keyword = ref("");
const release_date = ref("");
const is_rerelease = ref("0");
const re_release = ref([]);
const footfalls = ref("");
const runtime = ref("");
const language = ref("");
const input_re_release = ref([]);
const connectionSearchInput = ref("");
const connectionSearchList = ref([]);
const connection = ref([]);
const ottList = ref([]);
const ottRentList = ref([]);
const ottBuyList = ref([]);
const seriesSearchInput = ref("");
const series = ref([]);
const seriesSearchList = ref([]);
const watch_on_stream = ref([]);
const watch_on_rent = ref([]);
const watch_on_buy = ref([]);
const originalInputData = ref([]);
const countryList = ref([]);
const country = ref([]);
const countryBelowList = ref([]);
const error = ref({});
const addNewMovieService = new AddNewMovieService();
const draft_request_id = ref(routeId);
const tmdb_title = ref("");
const kobis_title = ref("");
const tmdb_aka = ref("");
const kobis_aka = ref("");
const tmdb_summery = ref("");
const kobis_summery = ref("");
const tmdb_plot_summery = ref("");
const kobis_plot_summery = ref("");
const firstInputRerelease = ref("");
const connectionBelowList = ref([]);
const seriesBelowList = ref([]);
const draft_status = ref("");
const getstream_list = ref([]);
const getrent_list = ref([]);
const getbuy_list = ref([]);
const relation_id = ref("");
const tmdb_official_site = ref("");
const kobis_official_site = ref("");
const isSubmit = ref(false);
const istmDBIdClick = ref(false);
const iskobisIdClick = ref(false);
const tiving_id = ref("");
const datePlaceholder = ref("YYYY.MM.DD");
const isOnceClickSaveBtn = ref(false);
const specialChars = ref(/[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/);
const title_id = ref(
  route.params.type == "internal" ? route.params.external_id : ""
);
const editMovieService = new EditMovieService();
const statusListItem = ref([]);
const country_id = ref([]);
const certificationListItem = ref([]);
const odk_id = ref("");
const resetComponents = ref(0);
const page = ref(1);
const limit = ref(10);
const totalConnectionRecords = ref(0);
const totalSeriesRecords = ref(0);
const isConnectionData = ref(false);
const isSeriesData = ref(false);

// on language change
watch(
  () => props.site_language,
  function (n, o) {
    if (n && n != o) {
      const draft_ids = JSON.parse(
        localStorage.getItem("draft_ids") || "[]"
      );

      if (draft_ids[0]) {
        draft_request_id.value = draft_ids[0]?.primaryDetails[
          search_type.value
        ][props.site_language]?.draft_request_id
          ? draft_ids[0]?.primaryDetails[search_type.value][
            props.site_language
          ]?.draft_request_id
          : "";
      } else {
        draft_request_id.value = draft_request_id.value;
      }
      title_name.value = "";
      aka.value = "";
      summary.value = "";
      plot.value = "";
      official_site.value = "";
      imdb_id.value = "";
      resetComponents.value++;
      setTimeout(() => {
        titleStatusDropdown();
        crtificationDropdown();
        getStreamList();
        getCountryList();
        getPrimaryDetails();
        getRentStreamList();
        getBuyStreamList();
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
    draft_request_id.value = draft_ids[0]?.primaryDetails[
      search_type.value
    ][props.site_language]?.draft_request_id
      ? draft_ids[0]?.primaryDetails[search_type.value][props.site_language]
        ?.draft_request_id
      : "";
  } else {
    draft_request_id.value = draft_request_id.value;
  }

  titleStatusDropdown();
  crtificationDropdown();
  getStreamList();
  getCountryList();
  getPrimaryDetails();
  getRentStreamList();
  getBuyStreamList();
});

// title status dropdown
const titleStatusDropdown = () => {
  statusListItem.value = [];
  addNewMovieService
    .getStatusList(search_type.value)
    .then((res) => {
      if (res.status == 200) {
        statusList.value = res.data.status_list;
        // title_status.value = Object.keys(statusList.value)[0];
        Object.entries(statusList.value).forEach(([key, value]) => {
          statusListItem.value.push({
            serchvalue: `${key}`,
            searchtitle: `${value}`,
          });
        });
      }
    })
    .catch((err) => {
      return;
    });
};
const onInputFootfalls = (event) => {
  footfalls.value = event.target.value.replaceAll(",", "");
};
const onInputRuntime = (event) => {
  runtime.value = event.target.value.replaceAll(",", "");
};

const changeFootfalls = (event) => {
  if (!isNaN(event.target.value)) {
    footfalls.value = Number(
      event.target.value.replaceAll(",", "")
    ).toLocaleString("en-US");
  }
};

const changeRuntime = (event) => {
  if (!isNaN(event.target.value)) {
    runtime.value = Number(
      event.target.value.replaceAll(",", "")
    ).toLocaleString("en-US");
  }
};

const getDropdownStatus = (val) => {
  title_status.value = val;
  error.value.title_status = ref("");
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
            serchvalue: `${key}`,
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

const onConnectionScroll = (newPage) => {
  page.value = newPage;
  if (totalConnectionRecords.value > connectionSearchList.value.length) connectionSearch();;
};

// connection search
const connectionSearch = () => {
  addNewMovieService
    .getConnectionList(connectionSearchInput.value, '', page.value, limit.value)
    .then((res) => {
      if (res.status == 200) {
        isConnectionData.value = true;
        totalConnectionRecords.value = res.data.total_records;
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

// series search input
const getSeriesSearch = (input) => {
  isSeriesData.value = false;
  seriesSearchInput.value = input;
  if (seriesSearchInput.value == "") {
    seriesSearchList.value = [];
  } else {
    setTimeout(() => {
      page.value = 1;
      seriesSearchList.value = [];
      seriesSearch();
    }, 500);
  }
};

const onSeriesScroll = (newPage) => {
  page.value = newPage;
  if (totalSeriesRecords.value > seriesSearchList.value.length)
    seriesSearch();
};

// series search
const seriesSearch = () => {
  addNewMovieService
    .getConnectionList(seriesSearchInput.value, search_type.value, page.value, limit.value)
    .then((res) => {
      if (res.status == 200) {
        isSeriesData.value = true;
        totalSeriesRecords.value = res.data.total_records;
        res.data.results.forEach((item) => {
          if (!seriesSearchList.value.some((existingItem) => existingItem.title_id === item.title_id)) {
            seriesSearchList.value = [...seriesSearchList.value, item];
          }
        });
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

// get re release date
const getreRealeaseDate = (getdate, k) => {
  re_release.value.splice(k, 1);
  if (route.params.type == "internal") {
    re_release.value.push({ re_release_date: getdate, id: "" });
  } else {
    re_release.value.push(getdate);
  }
  let data = input_re_release.value.find((item) => {
    return item.id == k;
  });
  if (data) {
    data.date = getdate;
  }
  if (k == 0) {
    firstInputRerelease.value = getdate;
  }
};

// multiple add re release data
const addreReleaseDate = () => {
  let index;
  if (input_re_release.value.length > 0) {
    index = input_re_release.value.length + 1;
  } else {
    index = 1;
  }
  input_re_release.value.push({ date: "", id: index });
};

// remove re release data
const removereReleaseDate = (index) => {
  input_re_release.value.splice(index, 1);
  re_release.value.splice(index + 1, 1);
};

//connection input
const getConnectionInput = (id) => {
  connection.value = id;
};

//series input
const getSeriesInput = (id) => {
  series.value = id;
};

// ott service provider list
const getStreamList = () => {
  addNewMovieService
    .getServiceProviderList(props.site_language, search_type.value)
    .then((res) => {
      if (res.status == 200) {
        ottList.value = res.data.results;
        ottRentList.value = res.data.results;
      }
    })
    .catch((err) => {
      return;
    });
};

// ott service provider list
const getRentStreamList = () => {
  addNewMovieService
    .getServiceProviderList(props.site_language, search_type.value)
    .then((res) => {
      if (res.status == 200) {
        ottRentList.value = res.data.results;
      }
    })
    .catch((err) => {
      return;
    });
};

// ott service provider list
const getBuyStreamList = () => {
  addNewMovieService
    .getServiceProviderList(props.site_language, search_type.value)
    .then((res) => {
      if (res.status == 200) {
        ottBuyList.value = res.data.results;
      }
    })
    .catch((err) => {
      return;
    });
};

//watch stream input
const getWatchStreamList = (val) => {
  watch_on_stream.value = val;
};

//watch rent input
const getWatchRentList = (val) => {
  watch_on_rent.value = val;
};

//watch buy input
const getWatchBuyList = (val) => {
  watch_on_buy.value = val;
};

const isEditBtn = () => {
  isEdit.value = false;
  emit("isEditOn", false);
};

//validation check
const isSaveBtn = () => {
  if (title_name.value == "") {
    error.value.title_name = computed(() => t("Error.requiredInput"));
  } else {
    error.value.title_name = ref("");
  }
  if (!title_status.value) {
    error.value.title_status = computed(() => t("Error.requiredInput"));
  } else {
    error.value.title_status = ref("");
  }
  if (imdb_id.value) {
    if (specialChars.value.test(imdb_id.value)) {
      error.value.imdb_id = computed(() => t("Error.specialCharacter"));
    } else {
      error.value.imdb_id = ref("");
    }
  }
  if (tiving_id.value) {
    if (specialChars.value.test(tiving_id.value)) {
      error.value.tiving_id = computed(() => t("Error.specialCharacter"));
    } else {
      error.value.tiving_id = ref("");
    }
  }
  if (odk_id.value) {
    if (specialChars.value.test(odk_id.value)) {
      error.value.odk_id = computed(() => t("Error.specialCharacter"));
    } else {
      error.value.odk_id = ref("");
    }
  }

  if (tmdb_id.value) {
    if (isNaN(tmdb_id.value)) {
      error.value.tmdb_id = computed(() => t("Error.onlyNumber"));
    } else {
      error.value.tmdb_id = ref("");
    }
  }

  if (kobis_id.value) {
    if (specialChars.value.test(kobis_id.value)) {
      error.value.kobis_id = computed(() => t("Error.specialCharacter"));
    } else {
      error.value.kobis_id = ref("");
    }
  }

  if (footfalls.value) {
    footfalls.value = footfalls.value.replaceAll(",", "");
    if (isNaN(footfalls.value)) {
      error.value.footfalls = computed(() => t("Error.onlyNumberReq"));
    } else {
      error.value.footfalls = ref("");
    }
  } else {
    error.value.footfalls = ref("");
  }

  if (runtime.value) {
    runtime.value = runtime.value.replace(",", "");
    if (isNaN(runtime.value)) {
      error.value.runtime = computed(() => t("Error.onlyNumberReq"));
    } else {
      error.value.runtime = ref("");
    }
  } else {
    error.value.runtime = ref("");
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

const submitPrimaryDetails = () => {
  isOnceClickSaveBtn.value = true;
  savePrimaryDetails();
};

// save primary details
const savePrimaryDetails = () => {
  const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
  originalInputData.value = originalInputData.value.filter(
    (item) => {
      return item.type != "Choose" && item.original_artist && item.title;
    }
  );
  let credentails = {
    relation_id:
      relation_id.value ||
      draft_ids[0]?.primaryDetails[search_type.value]?.draft_relation_id,
    site_language: props.site_language,
    tmdb_id: tmdb_id.value,
    kobis_id: kobis_id.value.toString(),
    imdb_id: imdb_id.value,
    tiving_id: tiving_id.value,
    name: title_name.value,
    aka: aka.value,
    summary: summary.value,
    plot: plot.value,
    official_site: official_site.value,
    search_keyword: search_keyword.value,
    news_search_keyword: news_search_keyword.value,
    title_status: title_status.value,
    release_date: release_date.value,
    is_rerelease: is_rerelease.value,
    re_release: is_rerelease.value == 1 ? re_release.value : [],
    footfalls: footfalls.value,
    runtime: runtime.value,
    certification: certification.value,
    language: language.value,
    country: country.value,
    original_work: originalInputData.value,
    watch_on_stream: watch_on_stream.value,
    watch_on_rent: watch_on_rent.value,
    watch_on_buy: watch_on_buy.value,
    connections: connection.value,
    series: series.value,
    odk_id: odk_id.value,
  };
  if (route.params.type == "internal") {
    credentails["title_id"] = title_id.value;
  }

  let saveMoviePrimaryDetails;

  if (route.params.type == "internal") {
    saveMoviePrimaryDetails =
      editMovieService.editMoviePrimaryDetails(credentails);
  } else {
    saveMoviePrimaryDetails =
      addNewMovieService.addPrimaryDetails(credentails);
  }

  saveMoviePrimaryDetails
    .then((res) => {
      if (res.status == 200) {
        // emit("movieMenudata", "media");
        isOnceClickSaveBtn.value = false;
        Toast.fire({ title: t("Error.success") });
        if (res.data.data && res.data.data.length == 1) {
          router.push(
            "/AddNewMovieForm/" +
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
              "/AddNewMovieForm/" +
              route.params.external_id +
              "/" +
              route.params.type +
              "/" +
              res.data.data[0].draft_request_id
            );
          }
          if (props.site_language == res.data.data[1].draft_site_language) {
            router.push(
              "/AddNewMovieForm/" +
              route.params.external_id +
              "/" +
              route.params.type +
              "/" +
              res.data.data[1].draft_request_id
            );
          }
        }

        const draft_ids = JSON.parse(
          localStorage.getItem("draft_ids") || "[]"
        );
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
          // const put_primary_details = {
          //   primaryDetails: {
          //     [search_type.value]: {
          //       [props.site_language]: res.data.data[0],
          //       draft_relation_id: res.data.data[0].draft_relation_id,
          //     },
          //   },
          // };
          // draft_ids.push(put_primary_details);
        }

        if (route.params.type == "internal") {
          istmDBIdClick.value = false;
          isEdit.value = true;
          emit("isEditOn", true);
        }

        // Saving
        localStorage.setItem("draft_ids", JSON.stringify(draft_ids));
        localStorage.setItem("tmdb_id", tmdb_id.value);
        re_release.value = [];
        input_re_release.value = [];
        country.value = [];
        originalInputData.value = [];
        connection.value = [];
        series.value = [];
        watch_on_stream.value = [];
        watch_on_rent.value = [];
        watch_on_buy.value = [];
        isSubmit.value = false;
        error.value.title_name = "";
        error.value.title_status = "";
        getPrimaryDetails();
      } else if (res.response.status == 400) {
        isOnceClickSaveBtn.value = false;
        isSubmit.value = false;
        if (res?.response?.data?.validation?.body?.keys == "kobis_id") {
          Toast.fire({ title: t("Error.kobisValid") });
        } else if (
          res?.response?.data?.validation?.body?.keys == "tmdb_id"
        ) {
          Toast.fire({ title: t("Error.tmdbValid") });
        } else {
          Toast.fire({ title: res.response.data.error });
        }
      } else {
        isOnceClickSaveBtn.value = false;
        isSubmit.value = false;
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      isOnceClickSaveBtn.value = false;
      isSubmit.value = false;
      Toast.fire({ title: err.response.data.error });
      console.log(err);
    });
};

const tmdbRefreshClick = () => {
  istmDBIdClick.value = true;
  getPrimaryDetails();
}

//get primary details
const getPrimaryDetails = () => {
  error.value = {};
  re_release.value = [];
  input_re_release.value = [];
  country.value = [];
  originalInputData.value = [];
  connection.value = [];
  series.value = [];
  watch_on_stream.value = [];
  watch_on_rent.value = [];
  watch_on_buy.value = [];

  let getMoviePrimaryDetails;

  if (route.params.type == "internal") {
    if (istmDBIdClick.value) {
      getMoviePrimaryDetails = editMovieService.getEditTmdbMoviePrimaryDetails(
        title_id.value,
        props.site_language,
        tmdb_id.value,
        search_type.value
      );
    } else {
      getMoviePrimaryDetails = editMovieService.getEditMoviePrimaryDetails(
        title_id.value,
        draft_request_id.value,
        props.site_language,
        tmdb_id.value,
        kobis_id.value
      );
    }
  } else {
    getMoviePrimaryDetails = addNewMovieService.getPrimaryDetails(
      draft_request_id.value,
      props.site_language,
      tmdb_id.value,
      kobis_id.value
    );
  }

  if (
    tmdb_id.value ||
    kobis_id.value ||
    draft_request_id.value ||
    title_id.value
  ) {
    getMoviePrimaryDetails
      .then((res) => {
        if (res.status == 200) {
          emit("selectedId", {
            request_id: res.data.request_id,
            credit_request_id: res.data.credit_request_id,
            media_request_id: res.data.media_request_id,
            tag_request_id: res.data.tag_request_id,
          });

          tmdb_title.value = res.data.tmdb_title;
          kobis_title.value = res.data.kobis_title;
          tmdb_aka.value = res.data.tmdb_aka;
          kobis_aka.value = res.data.kobis_aka;
          tmdb_summery.value = res.data.tmdb_summery;
          kobis_summery.value = res.data.kobis_summery;
          tmdb_plot_summery.value = res.data.tmdb_plot_summery;
          kobis_plot_summery.value = res.data.kobis_plot_summery;
          tmdb_official_site.value = res.data.tmdb_official_site;
          kobis_official_site.value = res.data.kobis_official_site;

          relation_id.value = res.data.relation_id;
          tiving_id.value = res.data.tiving_id || tiving_id.value;
          title_name.value = res.data.title;
          tmdb_id.value = res.data.tmdb_id || tmdb_id.value;
          kobis_id.value = res.data.kobis_id || kobis_id.value;
          imdb_id.value = res.data.imdb_id || imdb_id.value;
          odk_id.value = res.data.odk_id;
          aka.value = res.data.aka;
          summary.value = res.data.summery;
          plot.value = res.data.plot_summery;
          official_site.value = res.data.official_site;
          release_date.value = res.data.release_date;
          footfalls.value = res.data.footfalls.toLocaleString("en-US");
          runtime.value = res.data.runtime.toLocaleString("en-US");
          language.value = res.data.language;
          certification.value = res.data.certification
            ? res.data.certification
            : null;
          draft_status.value = res.data.status;
          title_status.value = res.data.title_status;
          is_rerelease.value = res.data.is_rerelease
            ? res.data.is_rerelease
            : 0;
          search_keyword.value = res.data.search_keyword_details.join();
          news_search_keyword.value = res.data.news_keyword_details.join();
          Array.from(res.data.re_releasedate).forEach((item) => {
            if (route.params.type == "internal") {
              re_release.value.push({
                re_release_date: item.date,
                id: item.id,
              });
            } else {
              re_release.value.push(item.date);
            }
          });
          firstInputRerelease.value = res.data.re_releasedate[0]?.date;
          Array.from(res.data.re_releasedate)
            .slice(1)
            .forEach((item, i) => {
              input_re_release.value.push({
                date: item.date,
                id: i + 1,
              });
            });
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
          if (route.params.type == "internal") {
            Array.from(res.data.getoriginalWork_list).forEach((item, i) => {
              originalInputData.value.push({
                type: item.type,
                title: item.title,
                original_artist: item.artis,
                id: item.id,
              });
            });
          } else {
            Array.from(res.data.getoriginalWork_list).forEach((item, i) => {
              originalInputData.value.push({
                type: item.type,
                title: item.title,
                original_artist: item.artis,
              });
            });
          }
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
          seriesBelowList.value = res.data.getseries_list;
          Array.from(seriesBelowList.value).forEach((item) => {
            if (route.params.type == "internal") {
              series.value.push({
                related_series_title_id: item.title_id,
                id: item.id,
                tmdb_id: item.tmdb_id,
              });
            } else {
              // series.value.push(item.title_id);
              series.value.push({
                title_id: item.title_id,
                tmdb_id: item.tmdb_id,
              });
            }
          });
          getstream_list.value = res.data.getstream_list;
          Array.from(getstream_list.value).forEach((item) => {
            if (route.params.type == "internal") {
              watch_on_stream.value.push({
                ott_provider_id: item.provider_id,
                ott_provider_provided_id: item.movie_id,
                id: item.id,
              });
            } else {
              watch_on_stream.value.push({
                ott_provider_id: item.provider_id,
                ott_provider_provided_id: item.movie_id,
              });
            }
          });
          getrent_list.value = res.data.getrent_list;
          Array.from(getrent_list.value).forEach((item) => {
            if (route.params.type == "internal") {
              watch_on_rent.value.push({
                ott_provider_id: item.provider_id,
                ott_provider_provided_id: item.movie_id,
                id: item.id,
              });
            } else {
              watch_on_rent.value.push({
                ott_provider_id: item.provider_id,
                ott_provider_provided_id: item.movie_id,
              });
            }
          });
          getbuy_list.value = res.data.getbuy_list;
          Array.from(getbuy_list.value).forEach((item) => {
            if (route.params.type == "internal") {
              watch_on_buy.value.push({
                ott_provider_id: item.provider_id,
                ott_provider_provided_id: item.movie_id,
                id: item.id,
              });
            } else {
              watch_on_buy.value.push({
                ott_provider_id: item.provider_id,
                ott_provider_provided_id: item.movie_id,
              });
            }
          });
        }
      })
      .catch((err) => {
        return;
      });
  }
};

// url check
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

<style></style>
