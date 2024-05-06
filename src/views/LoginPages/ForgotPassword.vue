<template>
  <div class="login-wrap">
    <div class="small-container">
      <div class="box">
        <h2>{{ $t("forgotPassword.title") }}</h2>
        <p>
          {{ $t("forgotPassword.desc") }}
        </p>
        <form>
          <div class="form-group mb-24" :class="error.email ? 'error' : ''">
            <div class="group">
              <input type="email" v-model="email" :placeholder="$t('placeholder.EnterEmail')" class="form-control" />
              <a class="btn verify-btn" @click="verify" :class="{ isDisabled: isOTPSend }">{{ verifyButton }}</a>
            </div>
            <span class="error-txt" v-if="error.email">{{ error.email }}</span>
          </div>
          <div class="form-group" v-if="isEmailVerify" :class="error.verificationCode ? 'error' : ''">
            <div class="time-group" :class="error.verificationCode ? 'error-border' : ''">
              <input type="text" :placeholder="$t('placeholder.verfiycode')" class="form-control" v-model="emailCode" />
              <span class="time">{{ newTime }}</span>
            </div>
            <span class="error-txt" v-if="error.verificationCode">{{
              error.verificationCode
            }}</span>
          </div>
          <div class="btn-innr">
            <input readonly @click="Check" class="btn" :value="$t('button.check')" />
          </div>
          <div class="btm-txt">
            {{ $t("register.account") }}
            <a @click="$router.push('/login')" class="frgt-txt">{{
              $t("register.loginHere")
            }}</a>
          </div>
        </form>
      </div>
    </div>
    <Modal v-if="isEmailVerifyModal" @close="closeModal" :heading="$t('modal.forgotPasswordModal.heading')"
      :btnText1="$t('button.ok')" @confirm="verifyEmailCode" :showModal="isEmailVerifyModal" />
  </div>
</template>


<script>
import CommonService from "@/services/CommonService";
import Modal from "@/components/Modal.vue";
import validator from "validator";
import { computed } from "@vue/runtime-core";
export default {
  name: "ForgotPassword",
  inject: ["common"],
  emits: ['on-current-theme-change'],
  components: {
    Modal,
  },
  data() {
    return {
      email: "",
      error: {},
      isEmailVerify: false,
      validateOnce: false,
      isEmailVerifyModal: false,
      newTime: "03:00",
      storeSetInterval: null,
      emailCode: "",
      verifyButton: this.$t("button.verify"),
      isOTPSend: false
    };
  },
  created() {
    this.CommonService = new CommonService();
    localStorage.removeItem("redirectPath");
    this.$cookies.remove("lastLoggedinUser");
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if ((newVal && oldVal && newVal != oldVal && this.validateOnce == true)) {
        this.verify();
      }
    },
  },
  methods: {
    verify() {
      if (!this.isOTPSend) {
        if (validator.isEmpty(this.email)) {
          this.error.email = computed(() => this.$t("Error.requiredField"));
          this.validateOnce = true;
          return true;
        } else if (!validator.isEmail(this.email)) {
          this.error.email = computed(() => this.$t('Error.validEmail'));
          return true;
        } else {
          this.CommonService.resetVerificationCode(this.email)
            .then((res) => {
              if (res.status == 200) {
                this.error.email = computed(() => "");
                this.isEmailVerify = true;
                this.isEmailVerifyModal = true;
              } else if (res.response.status == 400) {
                this.error.email = res.response.data.error.email;
              } else {
                this.error.email = computed(() => "");
              }
            })
            .catch((err) => {
              return;
            });
        }
      }
    },
    verifyEmailCode() {
      this.isEmailVerifyModal = false;
      this.verifyButton = computed(() => this.$t("button.resend"));
      this.isOTPSend = true;

      if (this.storeSetInterval) {
        clearInterval(this.storeSetInterval);
      }
      // asign new time again
      this.timer = 180;

      this.storeSetInterval = setInterval(() => {
        let m = Math.floor(this.timer / 60);
        let s = this.timer % 60;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        this.newTime = m + ":" + s;
        if (this.timer > 0) {
          return this.timer--;
        } else {
          this.newTime = "03:00";
        }
      }, 1000);
      setTimeout(() => {
        this.newTime = "03:00";
        this.isOTPSend = false;
      }, (this.timer + 1) * 1000);
    },
    Check() {
      if (!this.isEmailVerify) {
        this.error.email = computed(() => this.$t("Error.verifyCode"));
      } else {
        if (validator.isEmpty(this.emailCode)) {
          this.error.verificationCode = computed(() => this.$t("Error.requiredField"));
          return true;
        } else {
          this.CommonService.checkVerificationCode(this.email, this.emailCode)
            .then((res) => {
              if (res.status == 200) {
                this.$router.push({
                  name: "SettingPassword",
                  params: { id: res.data.user_id, code: this.emailCode },
                });
              } else if (res.response.status == 400) {
                if (res.response.data.error.verification_code) {
                  this.error.verificationCode =
                    res.response.data.error.verification_code;
                  this.error.email = computed(() => "");
                }
                if (res.response.data.error.email) {
                  this.error.email = res.response.data.error.email;
                  this.error.verificationCode = computed(() => "");
                }
              }
            })
            .catch((err) => {
              return;
            });
        }
      }
    },

    closeModal() {
      this.isEmailVerifyModal = false;
    },
  },
};
</script>

<style lang="scss">
.isDisabled {
  cursor: not-allowed;
}
</style>