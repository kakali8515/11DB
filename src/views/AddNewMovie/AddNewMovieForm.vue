<template>
  <div class="add-new-movie-form">
    <div class="new-container">
      <div class="page-heads-area">
        <h1 class="heading" v-if="$route.params.type !== 'internal'" v-html="$t('addNewMoviesForm.addNewMovie')"></h1>
        <h1 class="heading" v-else v-html="$t('addNewMoviesForm.editMovies')"></h1>
        <div class="filter-section">
          <div class="select-option">
            <Dropdown @dropdownValue="getSelctedLang" :search_type="language" :searchTitleListItem="languageList"
              searchtitle="language_name" searchvalue="language_code" />
          </div>
        </div>
      </div>
      <div class="mypage-wrapper">
        <LeftMenuPanel @movieMenudata="getMenudata" :selectedMenu="menu" :menuType="type" :saveIdList="saveIdList"
          @submitData="submitData" @tabChanged="isEdittable = false" :isEdittable="isEdittable"
          :activeIndex="activeIndex" />
        <div class="mypage-rght">
          <PrimaryDetails @selectedId="getId" :site_language="language"
            v-if="languageList.length > 0 && menu == 'primary'" @isEditOn="getEdit" />
          <MediaDetails :site_language="language" v-if="languageList.length > 0 && menu == 'media'"
            :saveIdList="saveIdList" :itemType="type" @selectedId="getId" @isEditOn="getEdit" />
          <CreditDetails :site_language="language" v-if="languageList.length > 0 && menu == 'credit'"
            :saveIdList="saveIdList" :itemType="type" @selectedId="getId" @isEditOn="getEdit" />
          <TagsDetails :site_language="language" v-if="languageList.length > 0 && menu == 'tag'" :saveIdList="saveIdList"
            :itemType="type" @selectedId="getId" @isEditOn="getEdit" />
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
              {{ $t("addNewMoviesForm.cancel") }}
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

<script>
import LeftMenuPanel from "@/components/LeftMenuPanel.vue";
import PrimaryDetails from "@/components/AddNewmovie/PrimaryDetails.vue";
import MediaDetails from "@/components/AddNewmovie/MediaDetails.vue";
import CreditDetails from "@/components/AddNewmovie/CreditDetails.vue";
import TagsDetails from "@/components/AddNewmovie/TagsDetails.vue";
import CommonService from "@/services/CommonService";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import AddNewMovieService from "@/services/AddNewMovieService";
import EditMovieService from "@/services/EditMovieService";
import { inject } from "vue";
import Modal from "@/components/Modal.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;
export default {
  name: "AddMovieForm",
  emits: ["on-current-theme-change"],
  components: {
    LeftMenuPanel,
    PrimaryDetails,
    MediaDetails,
    CreditDetails,
    TagsDetails,
    Modal,
    PopUpModal,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isEdittable = ref(false);
    const languageList = ref([]);
    const language = ref("");
    const commonService = new CommonService();
    const menu = route.params.itemActive
      ? ref(route.params.itemActive)
      : ref("primary");
    const activeIndex = route.params.activeIndex
      ? parseInt(route.params.activeIndex)
      : 0;
    const type = ref("movie");
    const common = inject("common");
    const saveIdList = ref({});
    const addNewMovieService = new AddNewMovieService();
    const editMovieService = new EditMovieService();
    const isSubmit = ref(false);
    const routeId = ref(route.params.id);
    const isSuccess = ref(false);
    const issubmitAllData = ref(false);

    watch(
      () => route.fullPath,
      (to, from) => {
        if (to.includes('AddNewMovieForm') == false) {
          localStorage.removeItem("site_language");
          localStorage.removeItem("draft_ids");
          localStorage.removeItem("saveIdList");
          localStorage.removeItem("tmdb_id");
        }
      }
    );

    document.title = t("pageTitle.editMovies") + ' - 11DB';

    //language dropdown
    const languageDropdown = () => {
      commonService
        .languageDropdown()
        .then((res) => {
          if (res.status == 200) {
            languageList.value = res.data.results;
            // language.value = languageList.value[0].language_code;
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
    };

    const getEdit = (val) => {
      isEdittable.value = !val;
    };

    const submitData = () => {
      isSubmit.value = true;
    };

    const goPageBack = () => {
      isSuccess.value = false;
      router.push(
        localStorage.getItem("movieBackPage")
          ? localStorage.getItem("movieBackPage")
          : "/AddNewMovie"
      );
      localStorage.removeItem("movieBackPage");
    };

    const submitAllData = () => {
      let submitData;
      issubmitAllData.value = true;

      const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
      if (draft_ids[0]) {
        routeId.value = draft_ids[0]?.primaryDetails["movie"]?.draft_relation_id
          ? draft_ids[0]?.primaryDetails["movie"]?.draft_relation_id
          : "";
      } else {
        routeId.value = routeId.value;
      }

      if (route.params.type == "internal") {
        submitData = editMovieService.submitData(
          routeId.value,
          route.params.external_id,
          "movie"
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
          } else {
            issubmitAllData.value = false;
            Toast.fire({ title: res.response.data.error });
          }
        })
        .catch((err) => {
          return;
        });
    };

    const closeModal = () => {
      isSubmit.value = false;
      isSuccess.value = false;
    };

    // return all data
    return {
      languageList,
      language,
      getMenudata,
      menu,
      type,
      getId,
      saveIdList,
      submitAllData,
      isSubmit,
      closeModal,
      submitData,
      isSuccess,
      goPageBack,
      issubmitAllData,
      getSelctedLang,
      getEdit,
      isEdittable,
      activeIndex,
    };
  },
};
</script>

<style></style>
