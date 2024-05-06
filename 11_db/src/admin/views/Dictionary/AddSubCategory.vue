<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/tag-data.svg" alt="" /></span
        >{{ $t("dictionary.tagTitle") }}
      </h2>
      <div class="cm-bck tag-data">
        <h3>{{ $t("dictionary.addSubCategory.title") }}</h3>
        <div class="frm-innr">
          <div class="form-group">
            <label>{{ $t("dictionary.addTag.mainCategory") }}</label>
            <SearchDropdown
              @dropdownValue="getCurrentcategoryId"
              :search_type="currentCategoryId"
              :searchTitleListItem="adminCategoryList"
              searchtitle="category_name"
              searchvalue="category_id"
              :labelItem="$t('dictionary.select')"
              :isError="error.currentCategoryId ? true : false"
            />
            <span v-if="error.currentCategoryId" class="error-txt">{{
              error.currentCategoryId
            }}</span>
          </div>
          <div class="form-group">
            <label>{{
              $t("dictionary.addSubCategory.englishSubCategory")
            }}</label>
            <input
              type="text"
              :placeholder="$t('placeholder.conflict')"
              class="form-control"
              v-model="sub_category_name_en"
              @keypress="isChar($event),empty('sub_category_name_en',$event)"
              maxlength="150"
              :class="error.sub_category_name_en ? 'error-border' : ''"
            />
            <span v-if="error.sub_category_name_en" class="error-txt">{{
              error.sub_category_name_en
            }}</span>
          </div>
          <div class="form-group">
            <label>{{
              $t("dictionary.addSubCategory.koreanSubCategory")
            }}</label>
            <input
              type="text"
              :placeholder="$t('placeholder.conflict')"
              class="form-control"
              v-model="sub_category_name_ko"
              @keypress="isChar($event),empty('sub_category_name_ko',$event)"
              maxlength="150"
              :class="error.sub_category_name_ko ? 'error-border' : ''"
            />
            <span v-if="error.sub_category_name_ko" class="error-txt">{{
              error.sub_category_name_ko
            }}</span>
          </div>
        </div>
        <div class="btn-group justify-btwn">
          <input
            type="submit"
            class="btn org-btn"
            :value="$t('button.save')"
            @click="addSubCategory"
          />
          <button
            type="button"
            class="btn outline blk-btn"
            @click="backToPreviousScreen"
          >
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
  name: "AddSubCategory",
  components: { Sidebar },
  inject: ["common"],
  data() {
    return {
      adminCategoryList: [],
      sub_category_name_en: "",
      sub_category_name_ko: "",
      currentCategoryId: null,
      error: {
        sub_category_name_en: "",
        sub_category_name_ko: "",
        currentCategoryId: "",
      },
      specialChars: /[`!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?~]/,
    };
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.getAdminDictionaryCategoryList();
      }
      if (
        Object.values(this.error).filter((x) => {
          return x.length > 0;
        }).length != 0
      ) {
        this.addSubCategory();
      }
    },
  },
  mounted() {
    this.getAdminDictionaryCategoryList();
  },
  methods: {
    empty(value,event) {
      if (event.target.value) {
      this.error[value] = computed(() => "");
      }
    },
    //get main category list
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
    // get current categoty id
    getCurrentcategoryId(event) {
      this.currentCategoryId = event;
      this.error.currentCategoryId = computed(() => "");
    },
    // add sub category
    addSubCategory() {
      //validations
      this.error.sub_category_name_en = computed(() => "");
      this.error.sub_category_name_ko = computed(() => "");
      if (!this.currentCategoryId) {
        this.error.currentCategoryId = computed(() =>
          this.$t("Error.fieldRequired")
        );
      }
      if (this.sub_category_name_en == "") {
        this.error.sub_category_name_en = computed(() =>
          this.$t("Error.fieldRequired")
        );
      } else {
        if (/[0-9]+/.test(this.sub_category_name_en)) {
          this.error.sub_category_name_en = computed(() =>
            this.$t("Error.numberNotAll")
          );
        } else if (this.specialChars.test(this.sub_category_name_en)) {
          this.error.sub_category_name_en = computed(() =>
            this.$t("Error.specialCharacter")
          );
        }
      }

      if (this.sub_category_name_ko == "") {
        this.error.sub_category_name_ko = computed(() =>
          this.$t("Error.fieldRequired")
        );
      } else {
        if (/[0-9]+/.test(this.sub_category_name_ko)) {
          this.error.sub_category_name_ko = computed(() =>
            this.$t("Error.numberNotAll")
          );
        } else if (this.specialChars.test(this.sub_category_name_ko)) {
          this.error.sub_category_name_ko = computed(() =>
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
        sub_category_name_en: this.sub_category_name_en,
        sub_category_name_ko: this.sub_category_name_ko,
      };
      DictionaryTagService.addSubCategory(data)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ name: "TagData" });
            Toast.fire({ title: this.$t("Error.success") });
          } else if (response.response.status == 400) {
            this.error.sub_category_name_en = computed(
              () => response.response.data.error
            );
            this.error.sub_category_name_ko = computed(
              () => response.response.data.error
            );
          } else {
            this.error.sub_category_name_en = computed(() => "");
            this.error.sub_category_name_ko = computed(() => "");
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
