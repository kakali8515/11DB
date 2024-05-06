<template>
  <div :class="[currentTheme]">
    <div class="body">
      <!-- header -->
      <Header :is_admin="is_admin" :isSearchResult="isSearchResult" @searchedData="isSearchResult = true" />
      <!-- page idle -->
      <v-idle @idle="onidle" @remind="onremind" :reminders="[10, 15]" :duration="600" />
      <!-- body -->
      <!-- <RouterView /> -->
      <div class="innr-sec-wrapper">
        <router-view :key="$route.path" v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component :is="Component" @on-current-theme-change="setTheme" @directSearch="searchEvent"
              @stopLoading="loadingStop" />
          </transition>
        </router-view>
      </div>
      <!-- body -->
      <!-- Footer -->
      <Footer @on-current-theme-change="setTheme" />
      <!-- Loading -->
      <Loading v-if="$route.name != 'Home'" :active="isLoading" :opacity="0" :can-cancel="false"></Loading>
    </div>
  </div>
</template>

<script>
// import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import Loading from "vue3-loading-overlay";
import { provide, watch } from "vue";
import common from "./store/common";
import moment from "moment";
import UserStatistics from "@/services/UserStatistics.js";
import VideoService from "@/services/VideoService.js";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    Loading
  },

  data() {
    return {
      currentTheme: "theme-dark",
      is_admin: "",
      isSearchSuggestion: true,
      isSearchResult: true,
      apiUrls: [],
      baseUrl: import.meta.env.VITE_SITE_BASE_URL,
      referralUrl: document.referrer,
      pageURL: {},
      pageTitle: document.title,
      currentRouteName: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      language: common.state.SelectedLang,
      ipAddress: this.$cookies.get("myIP"),
    };
  },

  emits: ["on-current-theme-change"],
  setup() {
    provide("common", common);
  },
  computed: {
    isLoading: function () {
      if (this.apiUrls.length) return true;
      else return false;
    },
  },
  watch: {
    "common.state.is_admin": function (newVal, oldVal) {
      if (newVal && localStorage.getItem("is_admin")) {
        this.is_admin = localStorage.getItem("is_admin");
      }
    },
    language(newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        if (!this.$route.path.includes("admin") && this.$route.name != 'PageNotfound') {

          console.log('watch pageTitle', this.currentRouteName);
          if (this.pageURL[this.currentRouteName]) {
            this.pageURL[this.currentRouteName].breakaway_at = moment.utc(new Date()).toISOString();
            console.log('leave', this.pageURL[this.currentRouteName])
            if (this.pageURL[this.currentRouteName].browse_platform) {
              this.updateStatistic(this.pageURL[this.currentRouteName], this.currentRouteName, 'leave')
            }
          }

          this.currentRouteName = this.$route.name;

          this.pageURL[this.currentRouteName] = {
            user_session_id: this.$cookies.get("userCookie"),
            utm_source: "",
            utm_medium: "",
            utm_campaign: "",
            utm_term: "",
            utm_content: "",
            url: this.baseUrl + this.$route.path,
            referrer: document.referrer,
            title: document.title,
            type: this.$route.meta?.type,
            view_at: moment.utc(new Date()).toISOString(),
            breakaway_at: null,
            browse_platform: this.$platform.os.family || this.parseUserAgent(navigator.userAgent),
            ip: common.state.myIP,
            statistic_id: "",
            visit_id: ""
          };

          setTimeout(() => {
            this.currentRouteName = this.currentRouteName;
            this.pageURL[this.currentRouteName].title = this.$route.meta?.title ? this.$t(this.$route.meta?.title) : this.pageTitle;
            this.pageURL[this.currentRouteName].utm_source = this.utm_source;
            this.pageURL[this.currentRouteName].utm_medium = this.utm_medium;
            this.pageURL[this.currentRouteName].utm_campaign = this.utm_campaign;
            this.pageURL[this.currentRouteName].utm_term = this.utm_term;
            this.pageURL[this.currentRouteName].utm_content = this.utm_content;
            console.log('entry', this.pageURL[this.currentRouteName])
            if (this.pageURL[this.currentRouteName].browse_platform) {
              this.updateStatistic(this.pageURL[this.currentRouteName], this.currentRouteName, 'entry')
            }
          }, 3000);

        }
      }
    },
    $route(to, from) {
      if (to.name != from.name) {
        this.apiUrls = [];
        // console.log('Route is changing from', from.name, 'to', to.name);
        if (this.pageURL != 'undefined' && Object.keys(this.pageURL).length > 0) {
          for (const page in this.pageURL) {
            if (page != from.name && page != to.name) {
              delete this.pageURL[page];
            }
          }
        }
        if (!common.state.myIP) {
          this.getIp();
        }

        if (!this.pageURL[to.name] && !to.path.includes('admin') && to.name != 'PageNotfound') {
          this.pageURL[to.name] = {
            user_session_id: this.$cookies.get("userCookie"),
            utm_source: "",
            utm_medium: "",
            utm_campaign: "",
            utm_term: "",
            utm_content: "",
            url: this.baseUrl + to.fullPath,
            referrer: from.fullPath && from.fullPath != '/' ? this.baseUrl + from.fullPath : document.referrer,
            title: document.title,
            type: to.meta.type,
            view_at: moment.utc(new Date()).toISOString(),
            breakaway_at: null,
            browse_platform: this.$platform.os.family || this.parseUserAgent(navigator.userAgent),
            ip: common.state.myIP,
            statistic_id: "",
            visit_id: ""
          };

          setTimeout(() => {
            // this.userStatisticInput.title = this.pageTitle;
            this.currentRouteName = to.name;
            this.pageURL[to.name].title = this.pageTitle;
            this.pageURL[to.name].utm_source = this.utm_source;
            this.pageURL[to.name].utm_medium = this.utm_medium;
            this.pageURL[to.name].utm_campaign = this.utm_campaign;
            this.pageURL[to.name].utm_term = this.utm_term;
            this.pageURL[to.name].utm_content = this.utm_content;
            this.pageURL[to.name].ip = this.ipAddress;
            console.log('entry', this.pageURL[to.name])
            if (this.pageURL[to.name].browse_platform) {
              this.updateStatistic(this.pageURL[to.name], to.name, 'entry')
            }
          }, 5000);

        }

        if (this.pageURL[from.name]) {
          this.pageURL[from.name]['breakaway_at'] = moment.utc(new Date()).toISOString(),
            // this.referralUrl = from.name;
            setTimeout(() => {
              console.log('leave', this.pageURL[from.name])
              if (this.pageURL[from.name].browse_platform) {
                this.updateStatistic(this.pageURL[from.name], from.name, 'leave')
              }
            }, 2000);

        }

        console.log(this.pageURL);
        // console.log('referralUrl', this.referralUrl)
        // setTimeout(() => {
        //   console.log('pageTitle', this.pageTitle)
        // }, 2000);
      }
    },
  },
  updated() {
    this.utm_source = this.$route.query.utm_source;
    this.utm_medium = this.$route.query.utm_medium;
    this.utm_campaign = this.$route.query.utm_campaign;
    this.utm_term = this.$route.query.utm_term;
    this.utm_content = this.$route.query.utm_content;
    this.pageTitle = document.title;
    this.language = common.state.SelectedLang;
    this.ipAddress = this.$cookies.get("myIP");
    // console.log(this.ipAddress);
    // console.log(common.state.myIP);
    if (localStorage.getItem("is_admin")) {
      this.is_admin = localStorage.getItem("is_admin");
    }
  },
  mounted() {

    // console.log('Browser Name:', this.$platform.name);
    // console.log('Browser Version:', this.$platform.version);
    // console.log('OS:', this.$platform.os.family);

    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      let my_cookie_value = this.$cookies.get("userCookie");
      this.$cookies.set("userCookie", my_cookie_value);
      return;
      //console.info( "This page is reloaded" );
    } else {
      this.$cookies.remove("userCookie");
      this.$cookies.set("userCookie", this.generateHexString(32), 0);
      //console.info( "This page is not reloaded");
    }

    this.getIp();
  },
  created() {
    axios.interceptors.request.use(
      (config) => {
        const urlKey = ["/search/search-suggestion", "/analytics/embed/statistics"];
        if (!urlKey.includes(config.url)) {
          this.apiUrls.push(config.url);
        }
        return config;
      },
      function (err) {
        const index = this.apiUrls.indexOf(err.config.url);
        this.apiUrls.splice(index, 1);
        return Promise.reject(err);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        const index = this.apiUrls.indexOf(response.config.url);
        this.apiUrls.splice(index, 1);
        return response;
      },
      (error) => {
        const index = this.apiUrls.indexOf(error.config.url);
        this.apiUrls.splice(index, 1);
        return Promise.reject(error);
      }
    );
  },

  methods: {

    onidle() {
      console.log('You have been logged out')

      if (!this.$route.path.includes("admin") && this.pageURL[this.currentRouteName]) {
        console.log('idle', this.pageURL);
        this.pageURL[this.currentRouteName].visit_id = common.state.visit_id;
        this.pageURL[this.currentRouteName].statistic_id = common.state.statistic_id;
        this.pageURL[this.currentRouteName].breakaway_at = moment.utc(new Date()).toISOString();
        if (this.pageURL[this.currentRouteName].browse_platform) {
          this.updateStatistic(this.pageURL[this.currentRouteName], this.currentRouteName, 'leave')
        }
      }

    },
    onremind(time) {
      // alert seconds remaining to 00:00
      console.log(time)
    },
    searchEvent() {
      this.apiUrls = [];
      this.isSearchResult = false;
    },
    setTheme(newTheme) {
      this.currentTheme = newTheme;
    },
    generateHexString(size) {
      return [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
    },
    removeUser() {
      this.$cookies.remove("myCoookie");
    },
    loadingStop() {
      this.apiUrls = [];
    },

    getIp() {
      VideoService.getIpaddr().then((res) => {
        console.log('res', res.data.ipAddress)
        this.ipAddress = res.data.ipAddress;
        common.state.myIP = res.data.ipAddress;
        this.$cookies.set('myIP', res.data.ipAddress);
      });
    },

    parseUserAgent(userAgent) {
      const osRegex = /(windows|macintosh|mac os|linux|android|iphone|ipad|ipod)/i;
      const osMatch = userAgent.match(osRegex);

      if (osMatch && osMatch[1]) {
        return osMatch[1].toLowerCase();
      } else {
        return "";
      }
    },

    updateStatistic(data, key, type) {
      //console.log(data)
      //return
      UserStatistics.statisticDataUpdate(data)
        .then((res) => {
          if (res.status == 200) {
            if (type == 'entry') {
              this.pageURL[key].visit_id = res.data.visit_id;
              this.pageURL[key].statistic_id = res.data.statistic_id;
              common.state.visit_id = res.data.visit_id;
              common.state.statistic_id = res.data.statistic_id;
            }
            if (type == 'leave') {
              delete this.pageURL[key];
            }

            console.log('api call', this.pageURL)
          }
        })
        .catch((err) => {
          console.log(err)
          return;
        });
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/style.scss";
@import "@/assets/styles/admin/style.scss";
</style>
