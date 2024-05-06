<template>
  <div class="login-wrap">
    <div class="small-container">
      <div class="box">
        <h2>{{ $t("forgotPassword.settingPassTitle") }}</h2>
        <form>
          <div class="form-group" :class="error.password ? 'error' : ''">
            <input
              type="password"
              :placeholder="$t('placeholder.Enterpassword')"
              class="form-control"
              v-model="password"
              minlength="8"
              maxlength="15"
            />
            <span class="error-txt" v-if="error.password">{{
              error.password
            }}</span>
          </div>
          <div class="form-group" :class="error.confirmPassword ? 'error' : ''">
            <input
              type="password"
              :placeholder="$t('placeholder.confirmPassword')"
              class="form-control"
              v-model="confirmPassword"
              minlength="8"
              maxlength="15"
            />
            <span class="error-txt" v-if="error.confirmPassword">{{
              error.confirmPassword
            }}</span>
          </div>
          <div class="btn-innr">
            <input
              readonly
              @click="passWordCheck"
              class="btn"
              :value="$t('button.check')"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CommonService from "@/services/CommonService";
import MyPageService from "@/services/MyPageService";
import PasswordValidation from "@/Validation/PasswordValidation";
import Toast from "@/alert/alert.js";
import { computed } from "@vue/runtime-core";
export default {
  name: "SettingPassword",
  data() {
    return {
      password: "",
      confirmPassword: "",
      error: {},
      validateOnce: false,
    };
  },
  created() {
    this.CommonService = new CommonService();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal && this.validateOnce == true) {
        this.passWordCheck();
      }
    },
  },
  methods: {
    checkError() {
      let credential = {
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      const { isInvalid, error } = PasswordValidation(credential);
      this.validateOnce = true;
      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    passWordCheck() {
      if (!this.checkError()) {
        return;
      } else {
        const capPass = this.startsWithCapital(this.password);
        if (capPass) {
          if (this.$route.params.code) {
            this.CommonService.setPassword(
              this.$route.params.id,
              this.$route.params.code,
              this.password
            ).then((res) => {
              if (res.status == 200) {
                Toast.fire({ title: res.data.message });
                this.$router.push({ name: "Login" });
              } else if (res.response.status == 400) {
              }
            });
          } else {
            let data = {
              user_id: this.$route.params.id,
              old_password: "",
              new_password: this.password,
              confirm_password: this.confirmPassword,
            };
            MyPageService.changePassword(data).then((res) => {
              if (res.status == 200) {
                Toast.fire({ title: res.data.message });
                this.$router.push({ name: "MyPageSettings" });
              } else if (res.response.status == 400) {
              }
            });
          }
        } else {
          this.error.password = computed(() =>
            this.$t("Error.isCorrectPassword")
          );
        }
      }
    },
    startsWithCapital(word) {
      return /[A-Z]/.test(word.charAt(0));
    },
  },
};
</script>
