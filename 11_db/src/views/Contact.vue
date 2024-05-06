<template>
  <div class="my-accout-otr contact-sec">
    <div class="large-container">
      <div class="my-accout-box">
        <div class="contact-heading">
          <h2>{{ $t("contactUs.title") }}</h2>
          <p class="sm mrb">
            {{ $t("contactUs.info") }}
          </p>
        </div>
        <div class="login-wrap p-o">
          <div class="form-box box">
            <form>
              <div class="form-group" :class="error.name ? 'error' : ''">
                <label>{{ $t("input_label.name") }}</label>
                <input
                  v-model="name"
                  type="text"
                  :placeholder="$t('placeholder.enter')"
                  class="form-control"
                  @keypress="isValidation($event)"
                  @keyup="error.name = ''"
                  maxlength="100"
                />
                <span class="error-txt" v-if="error.name">{{
                  error.name
                }}</span>
              </div>
              <div class="form-group" :class="error.email ? 'error' : ''">
                <label>{{ $t("input_label.email") }}</label>
                <input
                  v-model="email"
                  type="email"
                  :placeholder="$t('placeholder.enter')"
                  class="form-control"
                  @keyup="error.email = ''"
                  maxlength="150"
                />
                <span class="error-txt" v-if="error.email">{{
                  error.email
                }}</span>
              </div>
              <div class="form-group" :class="error.type ? 'error' : ''">
                <label>{{ $t("input_label.type") }}</label>
                <!-- <select
                  class="form-control"
                  v-model="type"
                  @change="error.type = ''"
                >
                  <option value="" disabled>
                    {{ $t("placeholder.select") }}
                  </option>
                  <option
                    v-for="(type, index) in Object.entries(type_list)"
                    :key="index"
                    :value="type[0]"
                  >
                    {{ type[1] }}
                  </option>
                </select> -->
                <Dropdown
                  :search_type="type"
                  @dropdownValue="
                    (value) => {
                      type = value;
                    }
                  "
                  :searchTitleListItem="[
                    {
                      key: '',
                      value: $t('placeholder.select'),
                      disabled: true,
                    },
                    ...Object.keys(type_list).map((key) => {
                      return { key: key, value: type_list[key] };
                    }),
                  ]"
                  searchtitle="value"
                  searchvalue="key"
                  :isError="error.type ? true : false"
                />
                <span class="error-txt" v-if="error.type">{{
                  error.type
                }}</span>
              </div>
              <div
                class="form-group mb-24"
                :class="error.message ? 'error' : ''"
              >
                <label>{{ $t("input_label.message") }}</label>
                <textarea
                  v-model="message"
                  :placeholder="$t('placeholder.EnterMessage')"
                  class="form-control hh"
                  @keyup="error.message = ''"
                  maxlength="1000"
                ></textarea>
                <span class="error-txt" v-if="error.message">{{
                  error.message
                }}</span>
              </div>
              <div class="btn-innr">
                <input type="button"
                  @click="submitContact"
                  class="btn"
                  :value="$t('button.send')"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonService from "@/services/CommonService";
import ContactUsValidation from "@/Validation/ContactUsValidation";
import Toast from "@/alert/alert.js";
export default {
  name: "Contact",
  emits: ["on-current-theme-change"],
  inject: ["common"],
  data() {
    return {
      type_list: [],
      name: "",
      email: "",
      type: "",
      message: "",
      validateOnce: false,
      error: {},
    };
  },
  created() {
    this.CommonService = new CommonService();
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    this.typeList();
  },

  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.typeList();
      }
    },
  },

  methods: {
    typeList() {
      this.CommonService.contactTypeList()
        .then((res) => {
          if (res.status == 200) {
            this.type_list = res.data.type_list;
          }
        })
        .catch((err) => {
          return;
        });
    },

    checkError() {
      let credential = {
        email: this.email,
        name: this.name,
        type: this.type,
        message: this.message,
      };
      const { isInvalid, error } = ContactUsValidation(credential);
      this.validateOnce = true;
      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },

    submitContact() {
      if (!this.checkError()) {
        return;
      } else {
        this.CommonService.contactUs(
          this.name,
          this.email,
          this.type,
          this.message
        )
          .then((res) => {
            if (res.status == 200) {
              this.name = "";
              this.email = "";
              this.type = "";
              this.message = "";
              Toast.fire({ title: res.data.message });
            }
          })
          .catch((err) => {
            return;
          });
      }
    },

    isValidation(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        !(charCode >= 65 && charCode <= 90) &&
        !(charCode >= 97 && charCode <= 122) &&
        charCode != 32 &&
        charCode != 0
      ) {
        evt.preventDefault();
      }
    },
  },
};
</script>
