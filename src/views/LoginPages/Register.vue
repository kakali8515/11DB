<template>
  <div class="login-wrap">
    <div class="small-container">
      <div class="box">
        <h2>{{ $t("register.title") }}</h2>
        <form autocomplete="off">
          <div class="form-group" :class="error.email ? 'error' : ''">
            <div class="group">
              <input type="email" @keyup="validEmailCheck" :placeholder="$t('placeholder.EnterEmail')"
                class="form-control" v-model="email" :readonly="isEmailVerify" />
              <a @click="verifyEmail" class="btn verify-btn resend" v-if="isEmailVerify"
                :class="{ isDisabled: isOTPSend }">{{ $t("button.resend") }}</a>
              <a @click="checkEmail"
                :class="[error.email || email == '' ? 'pointer-events-none' : '', isValidEmailCheck ? 'resend' : '']"
                class="btn verify-btn" v-else>{{
                  $t("button.verify")
                }}</a>
            </div>
            <span class="error-txt" v-if="error.email">{{ error.email }}</span>
          </div>
          <div class="form-group" v-if="isEmailVerify">
            <div class="group">
              <div class="time-group login-time-group" :class="error.verificationCode ? 'error-border' : ''">
                <input type="text" :placeholder="$t('placeholder.verfiycode')" class="form-control" v-model="emailCode" />
                <span class="time">{{ newTime }}</span>
              </div>
              <a @click="checkCode" class="btn verify-btn resend">{{
                $t("button.check")
              }}</a>
            </div>
            <span class="error-txt" v-if="error.verificationCode">{{
              error.verificationCode
            }}</span>
            <span class="success-txt" v-if="codeSuccess">{{ codeSuccess }}</span>
          </div>
          <div class="form-group" :class="error.name ? 'error' : ''">
            <input type="text" :placeholder="$t('placeholder.name')" class="form-control" v-model="name" />
            <span class="error-txt" v-if="error.name">{{ error.name }}</span>
          </div>
          <div class="form-group" :class="error.password ? 'error' : ''">
            <input type="password" :placeholder="$t('placeholder.Enterpassword')" class="form-control" v-model="password"
              autocomplete="new-password" minlength="8" maxlength="15" />
            <span class="error-txt" v-if="error.password">{{
              error.password
            }}</span>
            <p class="chr-txt" v-if="!error.password">
              {{ $t("register.passwordDesc") }}
            </p>
          </div>
          <div class="form-group t-24" :class="error.confirmPassword ? 'error' : ''">
            <input type="password" :placeholder="$t('placeholder.confirmPassword')" class="form-control"
              v-model="confirmPassword" minlength="8" maxlength="15" />
            <span class="error-txt" v-if="error.confirmPassword">{{
              error.confirmPassword
            }}</span>
          </div>
          <div class="btn-innr">
            <input readonly @click="register" class="btn" :value="$t('button.Register')" />
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

    <!-- available modal -->

    <Modal v-if="isEmailVerifyModal" @close="closeModal" :heading="$t('modal.emailAvailableModal.heading')"
      :bodyText="$t('modal.emailAvailableModal.bodyText')" :btnText1="$t('button.ok')" @confirm="verifyEmail"
      :showModal="isEmailVerifyModal" />

    <!-- already register modal -->

    <Modal v-show="isAlreadyRegistered" @close="closeModal" :heading="$t('modal.alreadyRegisterModal.heading')"
      :bodyText="$t('modal.alreadyRegisterModal.bodyText')" :bodyText2="$t('modal.alreadyRegisterModal.bodyText2')"
      :btnText1="$t('button.ok')" @confirm="closeModal" :showModal="isAlreadyRegistered" />

    <!-- send verification code modal -->

    <Modal v-if="isVerificationSend" @close="closeModal" :heading="$t('modal.forgotPasswordModal.heading')"
      :btnText1="$t('button.ok')" @confirm="closeModal" :showModal="isVerificationSend" className="mb-0" />

  </div>
</template>


<script>
import CommonService from "@/services/CommonService";
import RegistrationValidation from "@/Validation/RegistrationValidation";
import Modal from "@/components/Modal.vue";
import validator from "validator";
import bcrypt from "bcryptjs";
import { computed } from "@vue/runtime-core";
export default {
  name: "Register",
  inject: ["common"],
  emits: ['on-current-theme-change'],
  components: {
    Modal,
  },
  data() {
    return {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      error: {},
      validateOnce: false,
      isEmailVerify: false,
      isEmailVerifyModal: false,
      isAlreadyRegistered: false,
      newTime: "03:00",
      storeSetInterval: null,
      isOTPSend: false,
      emailVerificationHash: "",
      emailCode: "",
      isVerifyCode: false,
      isVerificationSend: false,
      codeSuccess: "",
      clickVerify: false,
      isValidEmailCheck: false,
      type: ""
    };
  },
  created() {
    this.CommonService = new CommonService();
    localStorage.removeItem("redirectPath");
    this.$cookies.remove("lastLoggedinUser");
  },
  // watch: {
  //   "common.state.SelectedLang": function (newVal, oldVal) {
  //     if (
  //       (newVal && newVal != oldVal && this.validateOnce == true)
  //     ) {
  //       this.checkError();
  //     }
  //   },
  // },
  methods: {
    checkError() {
      let credential = {
        email: this.email,
        name: this.name,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      const { isInvalid, error } = RegistrationValidation(credential);
      this.validateOnce = true;
      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    register() {
      if (!this.checkError()) {
        return;
      } else {
        if (!this.isEmailVerify) {
          this.error.email = computed(() => this.$t("Error.verifyEmail"));
        }
        if (!this.isVerifyCode) {
          this.error.verificationCode = computed(() => this.$t("Error.verifyCode"));
        } else {
          const capPass = this.startsWithCapital(this.password);
          if (capPass) {
            this.CommonService.getRegistration(
              this.email,
              this.name,
              this.password
            ).then((res) => {
              if (res.status == 200) {
                this.error.email = computed(() => "");
                this.$router.push({ name: "RegisterComplete" });
              } else if (res.response.status == 400) {
              }
            });
          } else {
            this.error.password = computed(() => this.$t("Error.isCorrectPassword"));
          }
        }
      }
    },

    startsWithCapital(word) {
      return /[A-Z]/.test(word.charAt(0));
    },

    validEmailCheck() {
      if (validator.isEmpty(this.email)) {
        this.error.email = computed(() => this.$t("Error.requiredField"));
        this.isValidEmailCheck = false;
        return true;
      } else if (!validator.isEmail(this.email)) {
        this.error.email = computed(() => this.$t('Error.validEmail'));
        this.isValidEmailCheck = false;
        return true;
      } else {
        this.error.email = computed(() => "");
        this.isValidEmailCheck = true;
      }
    },
    checkEmail() {
      this.clickVerify = true;
      if (validator.isEmpty(this.email)) {
        this.error.email = computed(() => this.$t("Error.requiredField"));
        this.isValidEmailCheck = false;
        return true;
      } else if (!validator.isEmail(this.email)) {
        this.error.email = computed(() => this.$t('Error.validEmail'));
        this.isValidEmailCheck = false;
        return true;
      } else {
        this.isValidEmailCheck = true;
        this.CommonService.emailCheck(this.email)
          .then((res) => {
            if (res.status == 200) {
              this.error.email = computed(() => "");
              this.isEmailVerifyModal = true;
            } else if (res.response.status == 400) {
              this.isAlreadyRegistered = true;
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    closeModal() {
      this.isEmailVerifyModal = false;
      this.isAlreadyRegistered = false;
      this.isVerificationSend = false;
    },
    verifyEmail() {
      if (!this.isOTPSend) {
        this.CommonService.emailVerify(this.email, this.type).then((res) => {
          if (res.status == 200) {
            this.isVerifyCode = false;
            this.codeSuccess = computed(() => "");
            this.isEmailVerify = true;
            this.isEmailVerifyModal = false;
            this.isOTPSend = true;
            this.emailVerificationHash = res.data.code;
            this.emailCode = "";
            this.isVerificationSend = true;

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
              this.emailVerificationHash = "";
              this.type = "resend";
            }, (this.timer + 1) * 1000);
          }
        });
      }
    },
    async checkCode() {
      if (validator.isEmpty(this.emailCode)) {
        this.error.verificationCode = computed(() => this.$t("Error.requiredField"));
        return true;
      } else {
        const match = await bcrypt.compare(
          this.emailCode,
          this.emailVerificationHash
        );

        if (match) {
          this.codeSuccess = computed(() => this.$t("register.codeVerified"));
          this.isVerifyCode = true;
          this.error.verificationCode = computed(() => "");
          if (this.storeSetInterval) {
            clearInterval(this.storeSetInterval);
          }
          this.isOTPSend = false;
          this.newTime = "03:00";
        } else {
          this.error.verificationCode = computed(() => this.$t("Error.checkCode"));
        }
      }
    },
  },
};
</script>

<style lang="scss">
.isDisabled {
  cursor: not-allowed;
}
</style>