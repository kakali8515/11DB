<template>
  <div class="login-wrap">
    <div class="small-container">
      <div class="box">
        <h2>{{ $t("button.Login") }}</h2>
        <form>
          <div class="form-group" :class="error.email ? 'error' : ''">
            <input type="email" v-model="email" :placeholder="$t('placeholder.EnterEmail')" class="form-control"
              maxlength="150" />
            <span class="error-txt" v-if="error.email">{{ error.email }}</span>
          </div>
          <div class="form-group" :class="error.password ? 'error' : ''">
            <input type="password" :placeholder="$t('placeholder.Enterpassword')" class="form-control" v-model="password"
              maxlength="150" />
            <span class="error-txt" v-if="error.password">{{
              error.password
            }}</span>
          </div>
          <div class="btn-innr">
            <input readonly class="btn" :value="$t('button.Login')" @click="login" />
          </div>
          <div class="divider"></div>
          <div class="btn-innr mb-20">
            <a class="btn outline" @click="$router.push('/register')">{{
              $t("button.Register")
            }}</a>
          </div>
          <a class="frgt-txt" @click="$router.push('/forgot-password')">{{
            $t("login.forgotPassword")
          }}</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CommonService from "@/services/CommonService";
import LoginValidation from "@/Validation/LoginValidation";
import themes from "@/mixins/themes";
export default {
  name: "Login",
  inject: ["common"],
  mixins: [themes],
  emits: ["on-current-theme-change"],
  data() {
    return {
      email: "",
      password: "",
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
        this.login();
      }
    },
  },
  mounted() {
    let storedTheme = localStorage.getItem("theme-colour");
    // localStorage.clear();
    localStorage.setItem("theme-colour", storedTheme);
    let redirectPath = localStorage.getItem("redirectPath");
    if (redirectPath?.includes('register' || 'forgot-password' || 'forgot-password-resend' || 'setting-password')) {
      localStorage.removeItem("redirectPath");
      this.$cookies.remove("lastLoggedinUser");
    }
  },
  methods: {
    checkError() {
      let credential = {
        email: this.email,
        password: this.password,
      };
      const { isInvalid, error } = LoginValidation(credential);
      this.validateOnce = true;
      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },

    login() {
      let lastLoggedinUser = this.$cookies.get("lastLoggedinUser");
      if (!this.checkError()) {
        return;
      } else {
        this.CommonService.getLogin(this.email, this.password).then((res) => {
          if (res.response && res.response.status == 400) {
            // if (res.response.status == 400) {
            if (res.response.data.error.password) {
              this.error.password = res.response.data.error.password;
            }
            if (res.response.data.error.email) {
              this.error.email = res.response.data.error.email;
            }
            if (res.response.data.validation?.body.keys == "email") {
              this.error.email = this.$t("Error.validEmail");
            }
            // }
          } else {
            let redirectPath = "";
            if (res.status == 200) {
              //   console.log("login res", res.data);
              this.validateOnce = false;
              this.common.state.userId = res.data.user_id;
              this.common.state.name = res.data.username ? res.data.username : res.data.email;
              this.common.state.userType = res.data.user_type;
              this.common.state.is_admin = res.data.is_admin;
              this.common.state.is_webtoon_display = res.data.is_admin == 'y' ? true : false;
              this.common.state.is_video_display = res.data.is_admin == 'y' ? true : false;;
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("uid", res.data.user_id);
              localStorage.setItem("uname", res.data.username ? res.data.username : res.data.email);
              localStorage.setItem("tokenexpiresAt", res.data.token_expiry);
              localStorage.setItem("userType", res.data.user_type);
              localStorage.setItem("is_admin", res.data.is_admin);
              localStorage.setItem("profileImage", res.data.profile_image);
              this.$i18n.locale = res.data.user_default_language;
              if (res.data.is_admin == "y") {
                redirectPath = localStorage.getItem("redirectPath") || "/admin/news-manager";
                if (redirectPath && (!lastLoggedinUser || lastLoggedinUser === this.common.state.name)) {
                  this.$router.push(redirectPath);
                } else {
                  const body = document.body;
                  localStorage.setItem("theme-colour", "theme-light");
                  body.classList.add("body-light");
                  this.$vuetify.theme.global.name = 'light';
                  this.$emit("on-current-theme-change", "theme-light");
                  this.$router.push("/admin/news-manager");
                }
                // this.$router.push(redirectPath);
                localStorage.removeItem("redirectPath");
                this.$cookies.remove("lastLoggedinUser");
                // this.$router.push("/admin/news-manager");
              } else {
                redirectPath = localStorage.getItem("redirectPath") || "/";
                if (redirectPath && (!lastLoggedinUser || lastLoggedinUser === this.common.state.name)) {
                  this.$router.push(redirectPath);
                } else {
                  this.$router.push("/");
                }
                localStorage.removeItem("redirectPath");
                this.$cookies.remove("lastLoggedinUser");

              }
            }
          }
        });
      }
    },
  },
};
</script>
