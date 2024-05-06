<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/tag-data.svg" alt="" /></span>{{ $t("dictionary.tagTitle") }}
      </h2>
      <div class="cm-bck tag-data">
        <h3>{{ $t("dictionary.editTag.title") }}</h3>
        <div class="frm-innr">
          <div class="form-group">
            <label>{{ $t("dictionary.addTag.mainCategory") }}</label>
            <SearchDropdown @dropdownValue="getCurrentcategoryId" :search_type="currentCategoryId"
              :searchTitleListItem="adminCategoryList" searchtitle="category_name" searchvalue="category_id"
              :labelItem="$t('dictionary.select')" :isError="error.currentCategoryId ? true : false" disabled />
            <span v-if="error.currentCategoryId" class="error-txt">{{
              error.currentCategoryId
            }}</span>
          </div>
          <div class="form-group">
            <label>{{ $t("dictionary.editTag.subCategory") }}</label>
            <SearchDropdown @dropdownValue="getSubCat" :search_type="currentSubCategoryId"
              :searchTitleListItem="subCategoryList" searchtitle="category_name" searchvalue="sub_category_id"
              :labelItem="$t('dictionary.select')" :isError="error.currentSubCategoryId ? true : false" disabled />
            <span v-if="error.currentSubCategoryId" class="error-txt">{{
              error.currentSubCategoryId
            }}</span>
          </div>
          <div class="form-group">
            <label>{{ $t("dictionary.addTag.englishTag") }}</label>
            <input type="text" :placeholder="$t('Error.enterTag')" class="form-control" v-model="tag_name_en"
              @keypress="isChar($event), empty('tag_name_en', $event)" maxlength="150"
              :class="error.tag_name_en ? 'error-border' : ''" />
            <span v-if="error.tag_name_en" class="error-txt">{{
              error.tag_name_en
            }}</span>
          </div>
          <div class="form-group">
            <label>{{ $t("dictionary.addTag.koreanTag") }}</label>
            <input type="text" :placeholder="$t('Error.enterTag')" class="form-control" v-model="tag_name_ko"
              @keypress="isChar($event), empty('tag_name_ko', $event)" maxlength="150"
              :class="error.tag_name_ko ? 'error-border' : ''" />
            <span v-if="error.tag_name_ko" class="error-txt">{{
              error.tag_name_ko
            }}</span>
          </div>
        </div>
        <div class="btn-group justify-btwn">
          <input type="submit" class="btn org-btn" :value="$t('button.save')" @click="updateTagDetails" />
          <button type="button" class="btn outline blk-btn" @click="backToPreviousScreen">
            {{ $t("button.back") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/admin/components/Sidebar.vue";
import DictionaryTagService from "@/admin/services/DictionaryTagService";
import Toast from "@/alert/alert";
import { isChar } from "@/mixins/CommonValidation.js";
import { computed } from "@vue/runtime-core";
export default {
  name: "EditTag",
  components: { Sidebar },
  data() {
    return {
      tagId: this.$route.params.id,
      tag_id: 0,
      tag_name_en: "",
      tag_name_ko: "",
      currentCategoryId: null,
      currentSubCategoryId: null,
      adminCategoryList: [],
      subCategoryList: [],
      error: {
        tag_name_en: "",
        tag_name_ko: "",
        currentCategoryId: "",
        currentSubCategoryId: "",
      },
      specialChars: /[`!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?~]/,
    };
  },
  mounted() {
    this.getTagDetails();
    this.getAdminDictionaryCategoryList();
  },
  methods: {
    empty(value, event) {
      if (event.target.value) {
        this.error[value] = computed(() => "");
      }
    },
    getSubCat(event) {
      this.currentSubCategoryId = event;
      this.error.currentSubCategoryId = computed(() => "");
    },
    getAdminDictionaryCategoryList() {
      DictionaryTagService.getAdminDictionaryCategoryList()
        .then((response) => {
          if (response.status == 200) {
            this.adminCategoryList = response.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },
    //get current categoty id
    getCurrentcategoryId(event) {
      this.currentCategoryId = event;
      this.currentSubCategoryId = null;
      this.error.currentCategoryId = computed(() => "");
      this.subCategoryList = [];
      if (this.currentCategoryId) this.getSubCategoryList();
    },
    getSubCategoryList() {
      DictionaryTagService.getSubCategoryList(this.currentCategoryId)
        .then((response) => {
          if (response.status == 200) {
            this.subCategoryList = response.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },
    getTagDetails() {
      DictionaryTagService.getTagDetails(this.tagId)
        .then((response) => {
          if (response.status == 200) {
            this.tag_id = response.data.tag_id;
            this.tag_name_en = response.data.tag_name_en;
            this.tag_name_ko = response.data.tag_name_ko;
            this.currentCategoryId = response.data.category_id;
            this.currentSubCategoryId = response.data.sub_category_id.toString();
            this.getSubCategoryList();
          }
        })
        .catch((err) => {
          return;
        });
    },
    updateTagDetails() {
      //validations
      if (this.currentCategoryId == null) {
        this.error.currentCategoryId = computed(() =>
          this.$t("Error.fieldRequired")
        );
      }

      if (this.currentSubCategoryId == null) {
        this.error.currentSubCategoryId = computed(() =>
          this.$t("Error.fieldRequired")
        );
      }
      if (this.tag_name_en == "") {
        this.error.tag_name_en = computed(() => this.$t("Error.fieldRequired"));
      } else {
        if (/[0-9]+/.test(this.tag_name_en)) {
          this.error.tag_name_en = computed(() =>
            this.$t("Error.numberNotAll")
          );
        } else if (this.specialChars.test(this.tag_name_en)) {
        }
      }
      if (this.tag_name_ko == "") {
        this.error.tag_name_ko = computed(() => this.$t("Error.fieldRequired"));
      } else {
        if (/[0-9]+/.test(this.tag_name_ko)) {
          this.error.tag_name_ko = computed(() =>
            this.$t("Error.numberNotAll")
          );
        } else if (this.specialChars.test(this.tag_name_ko)) {
          this.error.tag_name_ko = computed(() =>
            this.$t("Error.specialCharacter")
          );
        }
      }

      if (
        Object.values(this.error).filter((x) => {
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

      let data = {
        parent_id: this.currentCategoryId,
        sub_category_id: this.currentSubCategoryId,
        tag_id: this.tag_id,
        tag_name_en: this.tag_name_en,
        tag_name_ko: this.tag_name_ko,
      };

      DictionaryTagService.updateTagDetails(data)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ name: "TagData" });
            Toast.fire({ title: this.$t("Error.success") });
          }
        })
        .catch((err) => {
          return;
        });
    },
    backToPreviousScreen() {
      this.$router.push({ name: "TagData" });
    },
    isChar,
  },
};
</script>
