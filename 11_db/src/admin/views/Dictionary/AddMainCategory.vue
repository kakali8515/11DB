<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/tag-data.svg" alt="" /></span>{{ $t("dictionary.tagTitle") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("dictionary.addMainCategory.title") }}</h3>
        <span v-if="error.category_name" class="error-txt">{{
          error.category_name
        }}</span>
        <div class="frm-innr">
          <div class="form-group">
            <label>{{ $t("dictionary.addMainCategory.englishName") }}</label>
            <input type="text" :placeholder="$t('Error.mainCategory')" class="form-control" v-model="category_name_en"
              @keypress="isChar($event), empty('category_name_en', $event)" maxlength="150"
              :class="error.category_name_en ? 'error-border' : ''" />
            <span v-if="error.category_name_en" class="error-txt">{{
              error.category_name_en
            }}</span>
          </div>
          <div class="form-group">
            <label>{{ $t("dictionary.addMainCategory.koreanName") }}</label>
            <input type="text" :placeholder="$t('Error.mainCategory')" class="form-control" v-model="category_name_ko"
              @keypress="isChar($event), empty('category_name_ko', $event)" maxlength="150"
              :class="error.category_name_ko ? 'error-border' : ''" />
            <span v-if="error.category_name_ko" class="error-txt">{{
              error.category_name_ko
            }}</span>
          </div>
        </div>
        <div class="btn-group justify-btwn">
          <input type="submit" class="btn org-btn" :value="$t('button.save')" @click="addMainCategory" />
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
  name: "AddMainCategory",
  components: { Sidebar },
  inject: ["common"],
  data() {
    return {
      category_name_en: "",
      category_name_ko: "",
      error: {
        category_name_en: "",
        category_name_ko: "",
        category_name: "",
      },
      specialChars: /[`!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?~]/,
    };
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        if (
          Object.values(this.error).filter((x) => {
            return x.length > 0;
          }).length != 0
        ) {
          this.addMainCategory();
        }
      }
    },
  },
  methods: {
    empty(value, event) {
      if (event.target.value) {
        this.error[value] = computed(() => "");
      }
    },
    //add category
    addMainCategory() {
      this.error.category_name_en = computed(() => "");
      this.error.category_name_ko = computed(() => "");
      this.error.category_name = "";
      //validation
      if (this.category_name_en == "") {
        this.error.category_name_en = computed(() =>
          this.$t("Error.fieldRequired")
        );
      } else {
        if (/[0-9]+/.test(this.category_name_en)) {
          this.error.category_name_en = computed(() => {
            return this.$t("Error.numberNotAll");
          });
        } else if (this.specialChars.test(this.category_name_en)) {
          this.error.category_name_en = computed(() =>
            this.$t("Error.specialCharacter")
          );
        }
      }

      if (this.category_name_ko == "") {
        this.error.category_name_ko = computed(() =>
          this.$t("Error.fieldRequired")
        );
      } else {
        if (/[0-9]+/.test(this.category_name_ko)) {
          this.error.category_name_ko = computed(() =>
            this.$t("Error.numberNotAll")
          );
        } else if (this.specialChars.test(this.category_name_ko)) {
          this.error.category_name_ko = computed(() =>
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
        category_name_en: this.category_name_en,
        category_name_ko: this.category_name_ko,
      };

      DictionaryTagService.addMainCategory(data)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push({ name: "TagData" });
            Toast.fire({ title: this.$t("Error.success") });
          } else if (response.response.status == 400) {
            this.error.category_name = response.response.data.error;
          } else {
            this.error.category_name_en = computed(() => "");
            this.error.category_name_ko = computed(() => "");
          }
        })
        .catch((err) => {
          return;
        });
    },
    //back to previous page
    backToPreviousScreen() {
      this.$router.push({ name: "TagData" });
    },
    isChar,
  },
};
</script>
