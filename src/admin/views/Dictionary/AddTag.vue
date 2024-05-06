<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/tag-data.svg" alt="" /></span>{{ $t("dictionary.tagTitle") }}
      </h2>
      <div class="cm-bck tag-data">
        <h3>{{ $t("dictionary.addTag.title") }}</h3>
        <div class="frm-innr">
          <div class="form-group">
            <label>{{ $t("dictionary.addTag.mainCategory") }}</label>
            <SearchDropdown @dropdownValue="getCurrentcategoryId" :search_type="currentCategoryId"
              :searchTitleListItem="adminCategoryList" searchtitle="category_name" searchvalue="category_id"
              :labelItem="$t('dictionary.select')" :isError="error.currentCategoryId ? true : false" />
            <span v-if="error.currentCategoryId" class="error-txt">{{
              error.currentCategoryId
            }}</span>
          </div>
          <div class="form-group">
            <label>{{ $t("dictionary.addTag.subCategory") }}</label>
            <SearchDropdown @dropdownValue="getSubCat" :search_type="currentSubCategoryId"
              :searchTitleListItem="subCategoryList" searchtitle="category_name" searchvalue="sub_category_id"
              :labelItem="$t('dictionary.select')" :isError="error.currentSubCategoryId ? true : false" />
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
          <input type="submit" class="btn org-btn" :value="$t('button.save')" @click="addTag" />
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
  name: "AddTag",
  inject: ["common"],
  components: { Sidebar },
  data() {
    return {
      adminCategoryList: [],
      subCategoryList: [],
      currentCategoryId: null,
      tag_name_en: "",
      tag_name_ko: "",
      currentSubCategoryId: null,
      error: {
        tag_name_en: "",
        tag_name_ko: "",
        currentCategoryId: "",
        currentSubCategoryId: "",
      },
      specialChars: /[`!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?~]/,
    };
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) this.getAdminDictionaryCategoryList();
    },
  },
  mounted() {
    this.getAdminDictionaryCategoryList();
  },
  methods: {
    empty(value, event) {
      if (event.target.value) {
        this.error[value] = computed(() => "");
      }
    },
    //get category list
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
    getSubCat(value) {
      this.currentSubCategoryId = value;
      this.error.currentSubCategoryId = computed(() => "");
    },
    //get current categoty id
    getCurrentcategoryId(event) {
      this.currentCategoryId = event;
      this.currentSubCategoryId = null;
      this.error.currentCategoryId = computed(() => "");
      this.subCategoryList = [];
      if (this.currentCategoryId) this.getSubCategoryList();
    },

    //get sub category list
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

    //add tag
    addTag() {
      //validations
      if (!this.currentCategoryId) {
        this.error.currentCategoryId = computed(() =>
          this.$t("Error.fieldRequired")
        );
      }

      if (!this.currentSubCategoryId) {
        this.error.currentSubCategoryId = computed(() =>
          this.$t("Error.fieldRequired")
        );
      } else {
        this.error.currentSubCategoryId = computed(() => "");
      }
      if (this.tag_name_en == "") {
        this.error.tag_name_en = computed(() => this.$t("Error.fieldRequired"));
      } else {
        if (/[0-9]+/.test(this.tag_name_en)) {
          this.error.tag_name_en = computed(() =>
            this.$t("Error.numberNotAll")
          );
        } else if (this.specialChars.test(this.tag_name_en)) {
          this.error.tag_name_en = computed(() =>
            this.$t("Error.specialCharacter")
          );
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
        tag_name_en: this.tag_name_en,
        tag_name_ko: this.tag_name_ko,
      };
      DictionaryTagService.addTag(data)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ name: "TagData" });
            Toast.fire({ title: this.$t("Error.success") });
          } else if (response.response.status == 400) {
            this.error.tag_name_en = computed(
              () => response.response.data.error
            );
          } else {
            this.error.tag_name_en = computed(() => "");
          }
        })
        .catch((err) => {
          return;
        });
    },
    // back to previous page
    backToPreviousScreen() {
      this.$router.push({ name: "TagData" });
    },
    isChar,
  },
};
</script>
