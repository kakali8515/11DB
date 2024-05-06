<template>
  <div>
    <div class="add-new-movie-form">
      <div class="new-container">
        <div class="page-heads-area">
          <h1 class="heading" v-if="$route.params.type !== 'internal'" v-html="$t('addNewWebtoonForm.addNewWebtoon')">
          </h1>
          <h1 class="heading" v-else v-html="$t('addNewWebtoonForm.editWebtoon')"></h1>
          <div class="filter-section">
            <div class="select-option">
              <Dropdown @dropdownValue="getSelctedLang" :search_type="language" :searchTitleListItem="languageList"
                searchtitle="language_name" searchvalue="language_code" />
            </div>
          </div>
        </div>
        <div class="mypage-wrapper">
          <LeftMenuPanel @movieMenudata="getMenudata" :saveIdList="saveIdList" :selectedMenu="menu" :menuType="type"
            @submitData="submitData" @tabChanged="isEdittable = false" :isEdittable="isEdittable"
            :activeIndex="activeIndex" />
          <div class="mypage-rght">
            <PrimaryDetails :site_language="language" @selectedId="getId"
              v-if="languageList.length > 0 && menu == 'primary'" @isEditOn="getEdit" />
            <MediaDetails :site_language="language" v-if="languageList.length > 0 && menu == 'media'" :itemType="type"
              :saveIdList="saveIdList" @selectedId="getId" @isEditOn="getEdit" />
            <Season :site_language="language" :saveIdList="saveIdList" @selectedId="getId"
              v-if="languageList.length > 0 && menu == 'season'" @isEditOn="getEdit" />
            <Episode :site_language="language" :requiredId="requiredId" :saveIdList="saveIdList" @selectedId="getId"
              v-if="languageList.length > 0 && menu == 'episode'" @isEditOn="getEdit" />
            <CreditDetails :site_language="language" :saveIdList="saveIdList" :itemType="type" @selectedId="getId"
              v-if="languageList.length > 0 && menu == 'credit'" @isEditOn="getEdit" />
            <TagsDetails :site_language="language" :saveIdList="saveIdList" :itemType="type" @selectedId="getId"
              v-if="languageList.length > 0 && menu == 'tag'" @isEditOn="getEdit" />
          </div>
        </div>
      </div>
    </div>
    <!-- submit modal -->
    <div class="new-cast-modal center-popup-modal" v-show="isSubmit">
      <PopUpModal :isModal="isSubmit">
        <template v-slot:header>
          <h1>{{ $t("addNewMoviesForm.confirmationOfSubmit") }}</h1>
        </template>
        <template v-slot:body>
          <div class="cast-details">
            <p>
              {{ $t("addNewMoviesForm.submitEditing") }}
            </p>
          </div>
        </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="black-outline-btn" @click="submitAllData" :disabled="issubmitAllData"
              :class="issubmitAllData ? 'isDisabled' : ''">
              {{ $t("button.ok") }}
            </button>
            <button class="red-fill-btn" @click="closeModal">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>

    <!-- success modal -->
    <div class="new-cast-modal center-popup-modal" v-show="isSuccess">
      <PopUpModal :isModal="isSuccess">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("addNewPeople.submitSuccess") }}</h1>
        </template>
        <template v-slot:body> </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="black-outline-btn" @click="goPageBack">
              {{ $t("button.ok") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>
  </div>
</template>

<script setup>
import LeftMenuPanel from "@/components/LeftMenuPanel.vue";
import PrimaryDetails from "@/components/AddNewWebtoon/PrimaryDetails.vue";
import MediaDetails from "@/components/AddNewWebtoon/MediaDetails.vue";
import CreditDetails from "@/components/AddNewWebtoon/CreditDetails.vue";
import TagsDetails from "@/components/AddNewmovie/TagsDetails.vue";
import Episode from "@/components/AddNewWebtoon/Episode.vue";
import Season from "@/components/AddNewWebtoon/Season.vue";
import CommonService from "@/services/CommonService";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import AddNewMovieService from "@/services/AddNewMovieService";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import EditMovieService from "@/services/EditMovieService";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;
const emit = defineEmits(["on-current-theme-change"])
const route = useRoute();
const router = useRouter();
const isEdittable = ref(false);
const languageList = ref([]);
const language = ref("");
const commonService = new CommonService();
const addNewMovieService = new AddNewMovieService();
const editMovieService = new EditMovieService();
const menu = route.params.itemActive
  ? ref(route.params.itemActive)
  : ref("primary");
const activeIndex = route.params.activeIndex
  ? parseInt(route.params.activeIndex)
  : 0;
const type = ref("webtoons");
const saveIdList = ref({});
const requiredId = ref({});
const isSuccess = ref(false);
const isSubmit = ref(false);
const routeId = ref(route.params.id);
const issubmitAllData = ref(false);

watch(
  () => route.fullPath,
  (to, from) => {
    if (to.includes("add-webtoon-details") == false) {
      localStorage.removeItem("site_language");
      localStorage.removeItem("draft_ids");
      localStorage.removeItem("saveIdList");
    }
  }
);

document.title = t("pageTitle.editWebtoon") + ' - 11DB';

//language dropdown
const languageDropdown = () => {
  commonService
    .languageDropdown()
    .then((res) => {
      if (res.status == 200) {
        languageList.value = res.data.results;
        language.value = localStorage.getItem("site_language")
          ? localStorage.getItem("site_language")
          : languageList.value[0].language_code;
        languageList.value.forEach((item) => {
          item.language_name =
            item.language_name.charAt(0).toUpperCase() +
            item.language_name.slice(1);
        });
        localStorage.setItem("site_language", language.value);
      }
    })
    .catch((err) => {
      return;
    });
};

const getSelctedLang = (value) => {
  language.value = value;
  localStorage.setItem("site_language", language.value);
};

languageDropdown();

const getMenudata = (val) => {
  menu.value = val;
};

const getId = (val) => {
  saveIdList.value = val;
  requiredId.value = {
    request_id: val.request_id,
    season_request_id: val.season_id,
    episode_request_id: val.episode_request_id,
  };
};

const getEdit = (val) => {
  isEdittable.value = !val;
};

const submitAllData = () => {
  let submitData;
  issubmitAllData.value = true;

  const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
  if (draft_ids[0]) {
    routeId.value = draft_ids[0]?.primaryDetails["webtoons"]?.draft_relation_id
      ? draft_ids[0]?.primaryDetails["webtoons"]?.draft_relation_id
      : "";
  } else {
    routeId.value = routeId.value;
  }

  if (route.params.type == "internal") {
    submitData = editMovieService.submitData(
      routeId.value,
      route.params.external_id,
      "webtoons"
    );
  } else {
    submitData = addNewMovieService.submitData(routeId.value);
  }
  submitData
    .then((res) => {
      if (res.status == 200) {
        isSubmit.value = false;
        isSuccess.value = true;
        issubmitAllData.value = false;
        localStorage.removeItem("site_language");
        localStorage.removeItem("draft_ids");
        localStorage.removeItem("saveIdList");
      } else {
        issubmitAllData.value = false;
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};

const goPageBack = () => {
  isSuccess.value = false;
  router.push(
    localStorage.getItem("webtoonBackPage")
      ? localStorage.getItem("webtoonBackPage")
      : "/AddNewWebtoon"
  );
  localStorage.removeItem("webtoonBackPage");
};

const closeModal = () => {
  isSubmit.value = false;
  isSuccess.value = false;
};

const submitData = () => {
  // console.log('first', isSubmit.value)
  isSubmit.value = true;
  // console.log('first', isSubmit.value)
};
</script>

<style></style>
