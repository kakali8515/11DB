<template>
  <div>
    <div class="primary-details-from">
      <div class="page-heading-area page-main-heading">
        <h2>{{ $t("addNewPeople.primaryDetails.header") }}</h2>
        <div class="divRows" @click="isEdit == true ? isEditBtn() : isSaveBtn()">
          <a class="saveBtn">{{
            isEdit ? $t("button.edit") : $t("button.save")
          }}</a>
        </div>
      </div>
      <div class="login-wrap">
        <div class="box">
          <form @submit.prevent="">
            <div class="people-top-area">
              <div class="people-pic">
                <img v-if="profile_image_url" :src="profile_image_url" alt="people" />
                <img v-else src="@/assets/images/no-data-image.jpg" alt="people" />

                <div class="camera-btn">
                  <a href="javascript:void(0);" :class="isEdit ? 'isDisabled' : ''">
                    <input type="file" v-on:change="selectPosterImage" class="file-btn" id="poster-pick"
                      :class="isEdit ? 'pointer-events-none' : ''" />
                    <img src="/src/assets/icons/camera.svg" alt="camera" />
                  </a>
                </div>
              </div>
              <div class="people-form-area">
                <div class="divRows">
                  <div class="div3colmns gap32res">
                    <div class="select-item">
                      <h3>{{ $t("addNewPeople.primaryDetails.gender") }}</h3>
                      <div class="form-group">
                        <Dropdown :search_type="gender" @dropdownValue="(value) => {
                          gender = value;
                        }
                          " item-disabled="disabled" :disabled="isEdit" :searchTitleListItem="[
    {
      key: '',
      value: $t(
        'addNewPeople.primaryDetails.genderDefault'
      ),
      disabled: true,
    },
    ...Object.keys(genderPeopleList).map((key) => {
      return { key: key, value: genderPeopleList[key] };
    }),
  ]" searchtitle="value" searchvalue="key" />
                      </div>
                    </div>
                    <div class="select-item">
                      <h3>{{ $t("addNewPeople.primaryDetails.birthdate") }}</h3>
                      <div class="date-picker">
                        <Calender @date="getBirthDate" :input_date="new Date(birth_date)" :max_date="beforeOneYear"
                          :datePlaceholder="datePlaceholder" :disabled="isEdit" />
                        <div class="text-hint">
                          <p v-if="route.params.type == 'tmdb' ||
                            istmDBIdClick
                            " class="tmdb-details-class">
                            {{ $t("addNewPeople.primaryDetails.tmdb") }} :
                            {{ tmdb_birth_date }}
                          </p>
                          <p v-if="route.params.type == 'kobis' ||
                            iskobisIdClick
                            " class="kobis-details-class">
                            {{ $t("addNewPeople.primaryDetails.kobis") }} :
                            {{ kobis_birth_date }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="select-item">
                      <h3>{{ $t("addNewPeople.primaryDetails.deathdate") }}</h3>
                      <div class="form-group">
                        <Calender @date="getDeathDate" :input_date="new Date(death_date)" :min_date="afterOneYear"
                          :datePlaceholder="datePlaceholder" :disabled="isEdit" />
                        <div class="text-hint">
                          <p v-if="route.params.type == 'tmdb' ||
                            istmDBIdClick
                            " class="tmdb-details-class">
                            {{ $t("addNewPeople.primaryDetails.tmdb") }} :
                            {{ tmdb_death_date }}
                          </p>
                          <p v-if="route.params.type == 'kobis' ||
                            iskobisIdClick
                            " class="kobis-details-class">
                            {{ $t("addNewPeople.primaryDetails.kobis") }} :
                            {{ kobis_death_date }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="divRows">
                  <h3>{{ $t("addNewPeople.primaryDetails.job") }}</h3>
                  <div class="div2colmns smgap">
                    <div class="select-item">
                      <div class="form-group">
                        <SearchDropdown @dropdownValue="chooseJob" :search_type="department"
                          :searchTitleListItem="jobTitleList" searchtitle="department_name" searchvalue="department_id"
                          :disabled="isEdit" :labelItem="$t('addNewPeople.primaryDetails.jobDefault')
                            " />
                      </div>
                      <div class="country-list" v-if="jobBelowList.length > 0">
                        <div class="count-list-tag" v-for="(item, i) in jobBelowList" :key="i">
                          {{ item.department_name }}
                          <span class="corss" :class="isEdit ? 'isDisabled' : ''"><img src="@/assets/icons/close.svg"
                              @click="removeJob(item)" :class="isEdit ? 'pointer-events-none' : ''" /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="divRows">
                  <h3>
                    {{ $t("addNewPeople.primaryDetails.country") }}
                  </h3>
                  <div class="form-group">
                    <input v-model="country" type="text" class="form-control"
                      :placeholder="$t('addNewPeople.primaryDetails.country')" maxlength="150" :disabled="isEdit" />
                  </div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="divRows">
              <div class="heads-area">
                <h3>{{ $t("addNewPeople.primaryDetails.extenalData") }}</h3>
                <span @mouseover="hover = true" @mouseleave="hover = false"><img src="@/assets/icons/question.svg"
                    alt="question" /></span>
              </div>
              <div class="div3colmns">
                <div class="form-group">
                  <label>{{
                    $t("addNewPeople.primaryDetails.tivingId")
                  }}</label>
                  <input type="text" class="form-control" placeholder="" v-model="imdb_id" @keypress="isNumChar($event)"
                    maxlength="255" :class="error.imdb_id ? 'error-border' : ''" :disabled="isEdit" />
                  <span v-if="error.imdb_id" class="error-txt">{{
                    error.imdb_id
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
                  <label>{{ $t("addNewPeople.primaryDetails.tmdbId") }}</label>
                  <input type="text" v-model="tmdb_id" class="form-control" placeholder=""
                    @keypress="isIntegerNumber($event)" :class="error.tmdb_id ? 'error-border' : ''" :disabled="isEdit" />
                  <span v-if="error.tmdb_id" class="error-txt">{{
                    error.tmdb_id
                  }}</span>
                  <span class="refreshBtn" :class="isEdit ? 'pointer-events-none' : ''" @click="tmdbRefreshClick"><svg
                      width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 1V6H1.58152M16.9381 8C16.446 4.05369 13.0796 1 9 1C5.64262 1 2.76829 3.06817 1.58152 6M1.58152 6H6M17 17V12H16.4185M16.4185 12C15.2317 14.9318 12.3574 17 9 17C4.92038 17 1.55399 13.9463 1.06189 10M16.4185 12H12"
                        stroke="white" />
                    </svg>
                  </span>
                </div>
                <div class="form-group">
                  <label>{{ $t("addNewPeople.primaryDetails.kobisId") }}</label>
                  <input type="text" v-model="kobis_id" class="form-control" placeholder="" @keypress="isNumChar($event)"
                    maxlength="255" :class="error.kobis_id ? 'error-border' : ''" :disabled="isEdit" />
                  <span v-if="error.kobis_id" class="error-txt">{{
                    error.kobis_id
                  }}</span>
                  <span class="refreshBtn" :class="isEdit ? 'pointer-events-none' : ''"
                    @click="getPrimaryDetails(), (iskobisIdClick = true)"><svg width="18" height="18" viewBox="0 0 18 18"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 1V6H1.58152M16.9381 8C16.446 4.05369 13.0796 1 9 1C5.64262 1 2.76829 3.06817 1.58152 6M1.58152 6H6M17 17V12H16.4185M16.4185 12C15.2317 14.9318 12.3574 17 9 17C4.92038 17 1.55399 13.9463 1.06189 10M16.4185 12H12"
                        stroke="white" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>
                {{ $t("addNewPeople.primaryDetails.name") }} <span>*</span>
              </h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input v-model="people_name" type="text" class="form-control"
                    :placeholder="$t('addNewPeople.primaryDetails.typeName')" maxlength="150"
                    @keyup="error.people_name = ref('')" @keypress="requiredField"
                    :class="error.people_name ? 'error-border' : ''" :disabled="isEdit" />
                  <span v-if="error.people_name" class="error-txt">{{
                    error.people_name
                  }}</span>
                </div>
                <div class="text-hint">
                  <p v-if="route.params.type == 'tmdb' ||
                      istmDBIdClick
                      ">
                    {{ $t("addNewPeople.primaryDetails.tmdb") }} :
                    {{ tmdb_people_name }}
                  </p>
                  <p v-if="route.params.type == 'kobis' ||
                    iskobisIdClick
                    ">
                    {{ $t("addNewPeople.primaryDetails.kobis") }} :
                    {{ kobis_people_name }}
                  </p>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewPeople.primaryDetails.aka") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input v-model="aka" type="text" class="form-control"
                    :placeholder="$t('addNewPeople.primaryDetails.typeAKA')" maxlength="150" :disabled="isEdit" />
                </div>
                <div class="text-hint">
                  <p v-if="route.params.type == 'tmdb' ||
                    istmDBIdClick
                    ">
                    {{ $t("addNewPeople.primaryDetails.tmdb") }} :
                    {{ tmdb_aka.toString() }}
                  </p>
                  <p v-if="route.params.type == 'kobis' ||
                    iskobisIdClick
                    ">
                    {{ $t("addNewPeople.primaryDetails.kobis") }} :
                    {{ kobis_aka.toString() }}
                  </p>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewPeople.primaryDetails.biography") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <textarea v-model="biography" rows="5" class="form-control" :placeholder="$t('addNewPeople.primaryDetails.typeBiography')
                    " :class="error.biography ? 'error-border' : ''" :disabled="isEdit"></textarea>
                  <span v-if="error.biography" class="error-txt">{{
                    error.biography
                  }}</span>
                  <!-- <span class="numbers">{{ remainingCount }}/230</span> -->
                </div>
                <div class="text-hint">
                  <p v-if="route.params.type == 'tmdb' ||
                      istmDBIdClick
                      ">
                    {{ $t("addNewPeople.primaryDetails.tmdb") }} :
                    {{ tmdb_biography }}
                  </p>
                  <p v-if="route.params.type == 'kobis' ||
                    iskobisIdClick
                    ">
                    {{ $t("addNewPeople.primaryDetails.kobis") }} :
                    {{ kobis_biography }}
                  </p>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewPeople.primaryDetails.officialSite") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input type="text" v-model="official_site" class="form-control" placeholder="http//"
                    @keyup="checkURL(official_site, 'official_site')" :class="error.official_site ? 'error-border' : ''"
                    :disabled="isEdit" />
                  <span v-if="error.official_site" class="error-txt">{{
                    error.official_site
                  }}</span>
                </div>
                <div class="text-hint">
                  <p v-if="route.params.type == 'tmdb' ||
                      istmDBIdClick
                      ">
                    {{ $t("addNewPeople.primaryDetails.tmdb") }}:
                    {{ tmdb_official_site }}
                  </p>
                  <p v-if="route.params.type == 'kobis' ||
                    iskobisIdClick
                    ">
                    {{ $t("addNewPeople.primaryDetails.kobis") }} :
                    {{ kobis_official_site }}
                  </p>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewPeople.primaryDetails.mediaLinks") }}</h3>
              <div class="div1colmns mar32">
                <label>{{ $t("addNewPeople.primaryDetails.facebook") }}</label>
                <div class="form-group">
                  <input type="text" v-model="facebook" class="form-control" placeholder="http//"
                    @keyup="checkURL(facebook, 'facebook')" :class="error.facebook ? 'error-border' : ''"
                    :disabled="isEdit" />
                  <span v-if="error.facebook" class="error-txt">{{
                    error.facebook
                  }}</span>
                </div>
              </div>
              <div class="div1colmns mar32">
                <label>{{ $t("addNewPeople.primaryDetails.instagram") }}</label>
                <div class="form-group">
                  <input type="text" v-model="instagram" class="form-control" placeholder="http//"
                    @keyup="checkURL(instagram, 'instagram')" :class="error.instagram ? 'error-border' : ''"
                    :disabled="isEdit" />
                  <span v-if="error.instagram" class="error-txt">{{
                    error.instagram
                  }}</span>
                </div>
              </div>
              <div class="div1colmns">
                <label> {{ $t("addNewPeople.primaryDetails.twitter") }}</label>
                <div class="form-group">
                  <input type="text" v-model="twitter" class="form-control" placeholder="http//"
                    @keyup="checkURL(twitter, 'twitter')" :class="error.twitter ? 'error-border' : ''"
                    :disabled="isEdit" />
                  <span v-if="error.twitter" class="error-txt">{{
                    error.twitter
                  }}</span>
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewPeople.primaryDetails.newKeyword") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input type="text" v-model="news_keyword" class="form-control" :placeholder="$t('addNewPeople.primaryDetails.newKeywordPlacholder')
                    " maxlength="100" :disabled="isEdit" />
                </div>
              </div>
            </div>
            <div class="divRows">
              <h3>{{ $t("addNewPeople.primaryDetails.searchKeyword") }}</h3>
              <div class="div1colmns">
                <div class="form-group">
                  <input type="text" v-model="search_keyword" class="form-control" :placeholder="$t('addNewPeople.primaryDetails.newKeywordPlacholder')
                    " maxlength="100" :disabled="isEdit" />
                </div>
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
            <button class="black-outline-btn" :disabled="isOkClicked"
              @click="(isOkClicked = true), submitPrimaryDetails()">
              {{ $t("button.ok") }}
            </button>
            <button class="red-fill-btn" @click="isSubmit = false, isOkClicked = false">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Calender from "@/components/Calender.vue";
import AddNewMovieService from "@/services/AddNewMovieService";
import AddNewPeopleService from "@/services/AddNewPeopleService";
import EditPeopleService from "@/services/EditPeopleService";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Toast from "@/alert/alert.js";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import i18n from "@/config/i18n";
import { computed } from "@vue/reactivity";
const { t } = i18n.global;
import {
  requiredField,
  isIntegerNumber,
  isCharWithComma,
  isValidUrl,
  isCharWithSpeailChar,
  isNumChar,
} from "@/mixins/CommonValidation.js";
import { removeCountry, chooseCountry } from "@/mixins/CountryFunctions.js";

export default {
  name: "PeoplePrimaryDetails",
  components: {
    Calender,
    PopUpModal,
  },
  mixins: [
    requiredField,
    isIntegerNumber,
    isCharWithComma,
    isValidUrl,
    isCharWithSpeailChar,
    isNumChar,
  ],
  props: {
    site_language: {
      type: String,
    },
  },
  emits: ["selectedId", "isEditOn"],
  setup(props, { emit }) {
    const isEdit = ref(false);
    const route = useRoute();
    const router = useRouter();
    const search_type = ref("people");
    const addNewMovieService = new AddNewMovieService();
    const addNewPeopleService = new AddNewPeopleService();
    const editPeopleService = new EditPeopleService();
    const profile_image = ref("");
    const profile_image_url = ref("");
    const gender = ref("");
    const genderPeopleList = ref([]);
    const birth_date = ref("");
    const tmdb_birth_date = ref("");
    const kobis_birth_date = ref("");

    const death_date = ref("");
    const tmdb_death_date = ref("");
    const kobis_death_date = ref("");

    const routeId =
      route.params.type == "internal" ? ref(route.params.external_id) : ref("");
    const internalDraftId = ref(route.params.id)
      ? ref(route.params.id)
      : ref("");

    const tmdb_id = ref(
      route.params.type == "tmdb" ? route.params.external_id : route.params.type == "internal" ? localStorage.getItem("tmdb_id") ? localStorage.getItem("tmdb_id") : "" : ""
    );
    const imdb_id = ref("");
    const tiving_id = ref("");
    const kobis_id =
      route.params.type == "kobis" ? ref(route.params.external_id) : ref("");
    const draft_request_id = ref(internalDraftId.value);
    const jobTitleList = ref([]);
    const job = ref([]);
    const jobBelowList = ref([]);
    const countryList = ref([]);
    const country = ref("");
    const countryBelowList = ref([]);
    const people_name = ref("");
    const tmdb_people_name = ref("");
    const kobis_people_name = ref("");
    const aka = ref("");
    const tmdb_aka = ref("");
    const kobis_aka = ref("");
    const biography = ref("");
    const tmdb_biography = ref("");
    const kobis_biography = ref("");
    const official_site = ref("");
    const tmdb_official_site = ref("");
    const kobis_official_site = ref("");
    const facebook = ref("");
    const instagram = ref("");
    const twitter = ref("");
    const news_keyword = ref([]);
    const search_keyword = ref([]);
    const relation_id = ref("");
    const error = ref({});
    const isSubmit = ref(false);
    // const remainingCount = ref(0);
    const istmDBIdClick = ref(false);
    const iskobisIdClick = ref(false);
    const datePlaceholder = ref("MM.DD.YYYY");
    const isOkClicked = ref(false);
    const specialChars = ref(/[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/);
    const country_id = ref([]);
    const department = ref(null);
    const odk_id = ref("");

    onMounted(() => {
      if (route.params.type == "internal") {
        isEdit.value = true;
      }
      const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
      if (draft_ids[0]) {
        draft_request_id.value =
          draft_ids[0]?.primaryDetails[search_type.value] &&
            draft_ids[0]?.primaryDetails[search_type.value][props.site_language]
              ?.draft_request_id
            ? draft_ids[0]?.primaryDetails[search_type.value][
              props.site_language
            ]?.draft_request_id
            : "";

        relation_id.value =
          draft_ids[0]?.primaryDetails[search_type.value] &&
            draft_ids[0]?.primaryDetails[search_type.value][props.site_language]
              ?.draft_relation_id
            ? draft_ids[0]?.primaryDetails[search_type.value][
              props.site_language
            ]?.draft_relation_id
            : draft_ids[0]?.primaryDetails[search_type.value].draft_relation_id
              ? draft_ids[0]?.primaryDetails[search_type.value].draft_relation_id
              : "";
      } else {
        draft_request_id.value = draft_request_id.value;
        relation_id.value = relation_id.value;
      }
      creditJobTitleList();
      getGenderList();
      getPrimaryDetails();
    });

    // on language change
    watch(
      () => props.site_language,
      function (n, o) {
        if (n && n != o) {
          const draft_ids = JSON.parse(
            localStorage.getItem("draft_ids") || "[]"
          );
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

            relation_id.value =
              draft_ids[0]?.primaryDetails[search_type.value] &&
                draft_ids[0]?.primaryDetails[search_type.value][
                  props.site_language
                ]?.draft_relation_id
                ? draft_ids[0]?.primaryDetails[search_type.value][
                  props.site_language
                ]?.draft_relation_id
                : draft_ids[0]?.primaryDetails[search_type.value]
                  .draft_relation_id
                  ? draft_ids[0]?.primaryDetails[search_type.value]
                    .draft_relation_id
                  : "";
          } else {
            draft_request_id.value = draft_request_id.value;
            relation_id.value = relation_id.value;
          }
          jobBelowList.value = [];
          countryBelowList.value = [];
          people_name.value = "";
          aka.value = "";
          biography.value = "";
          official_site.value = "";
          setTimeout(() => {
            getPrimaryDetails();
            creditJobTitleList();
            // getCountryList();
            getGenderList();
          }, 500);
        }
      }
    );

    // job title list
    const creditJobTitleList = () => {
      if (props.site_language != "") {
        addNewMovieService
          .creditJobTitleList(props.site_language)
          .then((res) => {
            if (res.status == 200) {
              jobTitleList.value = res.data.results;
            }
          })
          .catch((err) => {
            return;
          });
      }
    };

    const chooseJob = (event) => {
      department.value = event;
      let data = jobBelowList?.value?.find((f) => {
        return f.id == event;
      });
      let department_name = jobTitleList.value.find((item) => {
        return item.department_id == event;
      });
      if (!data && job.value.indexOf(event) === -1 && event != null) {
        job.value.push(event);
        jobBelowList.value.push({
          department_id: event,
          department_name: department_name.department_name,
        });
      }
    };

    const removeJob = (item) => {
      let data = jobBelowList.value.find((f) => {
        return f.id == item.id;
      });
      if (data) {
        jobBelowList.value.splice(jobBelowList.value.indexOf(item), 1);
        job.value.splice(job.value.indexOf(item.id), 1);
      }
      if (jobBelowList.value.length == 0) {
        department.value = null;
      }
    };

    // gender dropdown
    const getGenderList = () => {
      addNewPeopleService
        .getGenderList()
        .then((res) => {
          if (res.status == 200) {
            genderPeopleList.value = res.data.gender_list;
          }
        })
        .catch((err) => {
          return;
        });
    };

    // select poster image
    const selectPosterImage = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      profile_image.value = files[0];
      let fileSize = e.target.files[0].size;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(profile_image.value.name)) {
        Toast.fire({ title: t("Error.onlyJpg") });
        document.querySelector("#poster-pick").value = "";
        profile_image_url.value = "";
        return false;
      } else if (fileSize > 1024 * 1024 * 25) {
        Toast.fire({ title: t("Error.uploadFileSize") });
        document.querySelector("#poster-pick").value = "";
        profile_image_url.value = "";
        return false;
      } else if (allowedExtensions.exec(profile_image.value.name)) {
        profile_image_url.value = URL.createObjectURL(e.target.files[0]);
      }
    };

    const getBirthDate = (date) => {
      birth_date.value = date;
    };
    const getDeathDate = (date) => {
      death_date.value = date;
    };

    const submitPrimaryDetails = () => {
      savePrimaryPeopleDetails();
    };

    const afterOneYear = computed(() => {
      return new Date(
        new Date(birth_date.value).setFullYear(
          new Date(birth_date.value).getFullYear() + 1
        )
      );
    });
    const beforeOneYear = computed(() => {
      if (death_date.value) {
        return new Date(
          new Date(death_date.value).setFullYear(
            new Date(death_date.value).getFullYear() - 1
          )
        );
      }
    });
    const isSaveBtn = () => {
      if (imdb_id.value) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
        if (specialChars.test(imdb_id.value)) {
          error.value.imdb_id = computed(() => t("Error.specialCharacter"));
        } else {
          error.value.imdb_id = ref("");
        }
      } else {
        error.value.tiving_id = ref("");
      }
      if (tmdb_id.value) {
        if (isNaN(tmdb_id.value)) {
          error.value.tmdb_id = computed(() => t("Error.onlyNumber"));
        } else {
          error.value.tmdb_id = ref("");
        }
      } else {
        error.value.tmdb_id = ref("");
      }
      if (kobis_id.value) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
        if (specialChars.test(kobis_id.value)) {
          error.value.kobis_id = computed(() => t("Error.specialCharacter"));
        } else {
          error.value.kobis_id = ref("");
        }
      } else {
        error.value.kobis_id = ref("");
      }
      if (odk_id.value) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
        if (specialChars.test(odk_id.value)) {
          error.value.odk_id = computed(() => t("Error.specialCharacter"));
        } else {
          error.value.odk_id = ref("");
        }
      } else {
        error.value.odk_id = ref("");
      }
      if (people_name.value == "") {
        error.value.people_name = computed(() => t("Error.requiredInput"));
      }
      // else {
      //   if (/[0-9]+/.test(people_name.value)) {
      //     error.value.people_name = computed(() => t("Error.numberNotAll"));
      //   }
      else {
        error.value.people_name = ref("");
      }

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
    const isEditBtn = () => {
      isEdit.value = false;
      emit("isEditOn", false);
    };

    const savePrimaryPeopleDetails = () => {
      const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
      let savePrimaryDetails;
      let formData = new FormData();
      let rel = relation_id.value
        ? relation_id.value
        : draft_ids[0]?.primaryDetails[search_type.value]?.draft_relation_id
          ? draft_ids[0]?.primaryDetails[search_type.value]?.draft_relation_id
          : "";
      formData.append("relation_id", rel);
      formData.append("name", people_name.value);
      formData.append("site_language", props.site_language);
      formData.append("aka", aka.value);
      formData.append("biography", biography.value);
      formData.append("gender", gender.value);
      formData.append("birth_date", birth_date.value);
      formData.append("kobis_id", kobis_id.value);
      formData.append("tmdb_id", tmdb_id.value);
      formData.append("imdb_id", imdb_id.value);
      formData.append("odk_id", odk_id.value);
      formData.append("tiving_id", tiving_id.value);
      formData.append("official_site", official_site.value);
      formData.append("facebook", facebook.value);
      formData.append("instagram", instagram.value);
      formData.append("twitter", twitter.value);
      formData.append("death_date", death_date.value);
      formData.append("country", country.value);
      // formData.delete("country[]");
      // country.value.forEach((item, i) => formData.append("country[]", item));
      job.value.forEach((item, i) => formData.append("job[]", item));
      formData.append("search_keyword", search_keyword.value);
      formData.append("news_keyword", news_keyword.value);
      if (route.params.type == "internal") {
        formData.append("people_id", routeId.value);
      }

      if (profile_image.value != "") {
        formData.append("image", profile_image.value);
      }
      if (istmDBIdClick.value) {
        formData.append("image_action", "tmdb");
      }
      if (isOkClicked.value == true && route.params.type == "internal") {
        // formData.append("people_id", routeId.value);
        savePrimaryDetails = editPeopleService.editPrimaryDetails(formData,routeId.value);
      } else if (isOkClicked.value == true) {
        savePrimaryDetails = addNewPeopleService.addPrimaryDetails(formData);
      }
      savePrimaryDetails
        .then((res) => {
          if (res.status == 200) {
            Toast.fire({ title: t("Error.success") });
            if (res.data.data && res.data.data.length == 1) {
              router.push(
                "/AddNewPeopleForm/" +
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
                  "/AddNewPeopleForm/" +
                  route.params.external_id +
                  "/" +
                  route.params.type +
                  "/" +
                  res.data.data[0].draft_request_id
                );
              }
              if (props.site_language == res.data.data[1].draft_site_language) {
                router.push(
                  "/AddNewPeopleForm/" +
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

            // Saving
            localStorage.setItem("draft_ids", JSON.stringify(draft_ids));
            localStorage.setItem("tmdb_id", tmdb_id.value);
            isSubmit.value = false;
            isOkClicked.value = false;
            if (route.params.type == "internal") {
              istmDBIdClick.value = false;
              isEdit.value = true;
              emit("isEditOn", true);
            }
            getPrimaryDetails();
          } else if (res.response.data.statusCode == 400) {
            if (res?.response?.data?.validation?.body?.keys == "kobis_id") {
              Toast.fire({ title: t("Error.kobisValid") });
              isOkClicked.value = false;
              isSubmit.value = false;
            } else if (
              res?.response?.data?.validation?.body?.keys == "tmdb_id"
            ) {
              Toast.fire({ title: t("Error.tmdbValid") });
              isOkClicked.value = false;
              isSubmit.value = false;
            }
          } else {
            isSubmit.value = false;
            isOkClicked.value = false;
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

    //get primary people  details
    const getPrimaryDetails = () => {
      error.value = {};
      document.querySelector("#poster-pick").value = "";
      // countryBelowList.value = [];
      // country_id.value = [];
      // country.value = [];
      let getPeopleDetails;
      if (
        (tmdb_id.value ||
          kobis_id.value ||
          internalDraftId.value ||
          route.params.type == "new") &&
        route.params.type != "internal"
      ) {
        getPeopleDetails = addNewPeopleService.getPrimaryDetails(
          relation_id.value,
          props.site_language,
          tmdb_id.value,
          kobis_id.value
        );
      } else if (route.params.type == "internal") {
        if (istmDBIdClick.value) {
          getPeopleDetails = editPeopleService.getEditTmdbPeoplePrimaryDetails(
            routeId.value,
            props.site_language,
            tmdb_id.value
          );
        } else {
          getPeopleDetails = editPeopleService.getPrimaryDetails(
            relation_id.value,
            props.site_language,
            routeId.value
          );
        }
      }
      getPeopleDetails
        .then((res) => {
          if (res.status == 200) {
            emit("selectedId", {
              request_id: res.data.request_id,
              media_request_id: res.data.media_request_id,
            });
            tmdb_people_name.value = res.data.tmdb_name;
            kobis_people_name.value = res.data.kobis_name;
            people_name.value = res.data?.name;

            tmdb_aka.value = res.data?.tmdb_aka || "";
            kobis_aka.value = res.data?.kobis_aka || "";
            aka.value = res.data?.aka;

            tmdb_biography.value = res.data?.tmdb_biography || "";
            kobis_biography.value = res.data?.kobis_biography || "";
            biography.value = res.data?.biography;
            // remainingCount.value = biography.value.length;

            profile_image_url.value = res.data?.poster;
            relation_id.value = res.data.relation_id
              ? res.data.relation_id
              : "";

            imdb_id.value = res.data.imdb_id;
            tiving_id.value = res.data?.tiving_id || tiving_id.value;
            kobis_id.value = res.data.kobis_id || kobis_id.value;
            tmdb_id.value = res.data?.tmdb_id || tmdb_id.value;
            odk_id.value = res.data.odk_id;

            official_site.value = res.data?.official_site;
            tmdb_official_site.value = res.data?.tmdb_official_site;
            kobis_official_site.value = res.data?.kobis_official_site;

            birth_date.value = res.data.birth_date;
            tmdb_birth_date.value = res.data.tmdb_birth_date;
            kobis_birth_date.value = res.data.kobis_birth_date;

            death_date.value = res.data?.death_date;
            tmdb_death_date.value = res.data?.tmdb_death_date || "";
            kobis_death_date.value = res.data?.kobis_death_date || "";

            gender.value = res.data.gender ? res.data.gender : gender.value;
            country.value = res.data.countrylist
              ? res.data.countrylist
              : "";

            // if (res.data?.countrylist.length) {
            //   countryBelowList.value = [];
            //   country.value = [];
            //   Array.from(res.data.countrylist).forEach((item) => {
            //     country.value.push(item.id);
            //     countryBelowList.value.push(item);
            //   });
            // }
            if (res.data?.job.length) {
              jobBelowList.value = [];
              job.value = [];
              Array.from(res.data.job).forEach((item) => {
                job.value.push(item.id);
                jobBelowList.value.push({
                  id: item.id,
                  department_name: item.job,
                });
              });
            }
            facebook.value = res.data?.facebook || "";
            instagram.value = res.data?.instagram || "";
            twitter.value = res.data?.twitter || "";
            search_keyword.value = res.data?.search_keyword_details
              .map((x) => x.search_keyword)
              .join(",");
            news_keyword.value = res.data?.news_keyword_details
              .map((x) => x.news_keyword)
              .join(",");
          }
        })
        .catch((err) => {
          return;
        });
    };

    // url check
    const checkURL = (url, location) => {
      if (url == "") {
        error.value[location] = ref("");
        return true;
      }
      if (!isValidUrl(url)) {
        error.value[location] = computed(() => t("Error.validUrl"));
        return false;
      } else {
        error.value[location] = ref("");
      }
    };

    return {
      profile_image,
      profile_image_url,
      gender,
      genderPeopleList,
      birth_date,
      tmdb_birth_date,
      kobis_birth_date,
      death_date,
      tmdb_death_date,
      kobis_death_date,
      getDeathDate,
      getBirthDate,
      routeId,
      kobis_id,
      imdb_id,
      tiving_id,
      tmdb_id,
      draft_request_id,
      creditJobTitleList,
      jobTitleList,
      job,
      jobBelowList,
      chooseJob,
      removeJob,
      countryList,
      country,
      countryBelowList,
      chooseCountry,
      removeCountry,
      people_name,
      tmdb_people_name,
      kobis_people_name,
      biography,
      tmdb_biography,
      kobis_biography,
      aka,
      tmdb_aka,
      kobis_aka,
      official_site,
      tmdb_official_site,
      kobis_official_site,
      facebook,
      instagram,
      twitter,
      news_keyword,
      search_keyword,
      savePrimaryPeopleDetails,
      selectPosterImage,
      error,
      checkURL,
      isSaveBtn,
      isSubmit,
      submitPrimaryDetails,
      // countdown,
      // remainingCount,
      istmDBIdClick,
      iskobisIdClick,
      route,
      getPrimaryDetails,
      requiredField,
      isNumChar,
      isIntegerNumber,
      isCharWithComma,
      isCharWithSpeailChar,
      datePlaceholder,
      isOkClicked,
      specialChars,
      ref,
      isEdit,
      isEditBtn,
      afterOneYear,
      beforeOneYear,
      country_id,
      department,
      odk_id,
      tmdbRefreshClick
    };
  },
};
</script>

<style>
.kobis-details-class,
.tmdb-details-class {
  text-align: left;
  margin-bottom: 0px !important;
}

@media screen and (max-width: 990px) {
  .gap32res {
    gap: 32px !important;
  }
}
</style>
