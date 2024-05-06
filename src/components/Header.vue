<template>
  <header :class="[
    'header',
    $route.path.includes('admin') ? 'admin-header-view' : '',
    { 'is-hidden': !showHeader },
  ]">
    <div class="container">
      <div class="header-main">
        <div class="left-side">
          <a href="javascript:void(0);">
            <img src="@/assets/images/red-logo.svg" alt="logo-red" @click="$router.push('/')" />
          </a>
        </div>
        <div class="right-side">
          <div class="menu-links" :class="{ menuopen: ismenuOpen }">
            <ul class="main-menu">
              <li class="menu-item" v-for="(item, index) of menuData" :key="index" :class="{
                active: checkActive(item.name),
              }">
                <a href="javascript:void(0);" class="head-link" @click="item.status = !item.status">{{
                  $t(`header.mainMenu.${item.key_name}`) }}</a>
                <ul class="sub-menu" v-if="item.status" v-click-outside="() => (item.status = false)">
                  <li v-for="(submenu, index) in item.subMenu" :key="index" @click="item.status = false">
                    <a @click="$router.push(submenu.page_link)">{{
                      $t(`header.subMenu.${submenu.key_name}`)
                    }}</a>
                  </li>
                </ul>
              </li>
              <template v-if="logedInUserDetails">
                <li class="menu-item hide-menu">
                  <a href="javascript:void(0);" v-if="is_admin == 'y'" @click="
                    $router.push('/admin/news-manager');
                  this.ismenuOpen = false;
                  " class="head-link">{{ $t("header.profileDropdown.admin") }}</a>
                </li>
                <li class="menu-item hide-menu">
                  <a href="javascript:void(0);" @click="logOut" class="head-link">{{ $t("header.profileDropdown.logOut")
                  }}</a>
                </li>
              </template>
              <li class="menu-item hide-menu" v-else>
                <a href="javascript:void(0);" @click="goToLogin" class="head-link">{{ $t("button.Login") }}</a>
              </li>
            </ul>
          </div>
          <div class="menu-details">

            <div class="search">
              <a href="javascript:void(0);" class="" @click="openInputBox">
                <img src="@/assets/icons/white-search.svg" alt="search" class="white-image" />
                <img src="@/assets/icons/black-search.svg" alt="search" class="red-image" />
              </a>
              <Transition>
                <!-- <div class="link dropdown-search" v-if="searchArea" v-click-outside="() => (searchArea = false)"> -->
                <div class="link dropdown-search" v-if="searchArea" v-click-outside="() =>
                  $route.path != '/search-result'
                    ? (searchArea = false)
                    : (searchArea = true)
                  ">
                  <div class="container">
                    <form class="search-form" @submit="(e) => e.preventDefault()">
                      <input type="search" class="form-control" :placeholder="$t('placeholder.searchMovieTv')"
                        v-model="searchInput" @input="debouncedHandler(page)" @keydown="directSearch($event, searchInput)"
                        ref="searchInputBox" />
                      <a href="#" @click="
                        (searchArea = false), (searchAreaCloseFlage = true)
                        "><img src="@/assets/icons/red-close.svg" alt="close" /></a>
                    </form>
                    <ul v-if="searchSug && isSearchResult" class="seach-suggesation" @scroll="handleScroll">
                      <template v-if="searchSuggestionList.length > 0">
                        <li v-for="(item, ind) of searchSuggestionList" :key="ind">
                          <a href="javascript:void(0);" @click="searchResult(item)" class="suggexted_title_wrap">
                            <p v-html="item.title_name
                              .toLowerCase()
                              .replace(
                                searchInput.toLowerCase(),
                                `<span>` +
                                searchInput.toLowerCase() +
                                `</span>`
                              )
                              " class="suggexted_title"></p>
                          </a>
                        </li>
                      </template>
                      <li v-if="isSearchData && searchSuggestionList.length == 0">
                        <a class="noDataFound">
                          <p class="suggexted_title">
                            {{ $t("filterCard.noDataFound") }}
                          </p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Transition>
            </div>
            <div class="add-more" v-if="is_admin == 'y' && common.state.userType !== 'editor'">
              <a href="javascript:void(0);" @click="showAdd = !showAdd">
                <img src="@/assets/icons/white-plus.svg" alt="plus" class="white-image" />
                <img src="@/assets/icons/black-plus.svg" alt="plus" class="red-image" />
              </a>
              <Transition>
                <div class="link dropdown-menu fl add-dropdown" v-if="showAdd" v-click-outside="() => (showAdd = false)">
                  <a @click="$router.push('/AddNewMovie'), (showAdd = false)">{{
                    $t("header.addSection.movie")
                  }}</a>
                  <a @click="$router.push('/add-new-tv'), (showAdd = false)">{{
                    $t("header.addSection.tvShows")
                  }}</a>
                  <a @click="$router.push('/AddNewWebtoon'), (showAdd = false)">{{ $t("header.addSection.webtoon") }}</a>
                  <a @click="$router.push('/AddNewPeople'), (showAdd = false)">{{ $t("header.addSection.People") }}</a>
                </div>
              </Transition>
            </div>
            <div class="dropdown-lang">
              <Dropdown @dropdownValue="getLangId" :search_type="$i18n.locale" :searchTitleListItem="language"
                searchtitle="language_name" searchvalue="language_code" />
            </div>
            <div class="dropdown-profile" v-if="logedInUserDetails">
              <a @click="showProfile = !showProfile">
                <img v-if="profileImage?.includes('http')" :src="profileImage" alt="profile" class="profile-pic" />
                <a v-else class="login-link">
                  {{ userName }}
                </a>
                <img src="@/assets/icons/down-arrow-white.svg" alt="search" class="white-image" />
                <img src="@/assets/icons/down-arrow-black.svg" alt="search" class="red-image" /></a>
              <Transition>
                <ul v-if="showProfile" v-click-outside="() => (showProfile = false)"
                  class="link link-profile dropdown-menu profile-dropdown">
                  <li v-if="is_admin == 'y'" @click="$router.push('/admin/news-manager')" class="dropdown-item">
                    {{ $t("header.profileDropdown.admin") }}
                  </li>
                  <li @click="gotoMypgae" class="dropdown-item">
                    {{ $t("header.profileDropdown.myPage") }}
                  </li>
                  <li @click="logOut" class="dropdown-item">
                    {{ $t("header.profileDropdown.logOut") }}
                  </li>
                </ul>
              </Transition>
            </div>
            <div class="dropdown-profile" v-else>
              <a class="login-link" @click="goToLogin" href="javascript:void(0);">{{ $t("button.Login") }}</a>
            </div>
            <a v-if="logedInUserDetails" v-on:click="menuOpen" class="header-mob-profile">
              <figure>
                <img v-if="profileImage?.includes('https')" :src="profileImage" alt="profile" class="profile-pic" />
                <img v-else src="@/assets/icons/user-icon.svg" alt="profile" class="profile-pic" />
              </figure>
              <img src="@/assets/icons/down-arrow-white.svg" alt="search" class="white-image" />
              <img src="@/assets/icons/down-arrow-black.svg" alt="search" class="red-image" />
            </a>
            <a v-else href="#" class="mob-menu" v-on:click="menuOpen"><img src="../assets/icons/mobile-menu.svg"
                alt="menu" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import CommonService from "@/services/CommonService";
import MyPageService from "@/services/MyPageService.js";
import SearchResultService from "@/services/SearchResultService";
import VideoService from "@/services/VideoService.js";
import { headerMenuData, AdminheaderMenuData } from "@/config/headerMenuData";
import vClickOutside from "click-outside-vue3";
import Dropdown from "@/components/Dropdown.vue";
import moment from "moment";
import "moment/dist/locale/ko";
import debounce from "lodash.debounce";

export default {
  name: "Header",
  inject: ["common"],
  components: { Dropdown },
  data() {
    return {
      ismenuOpen: false,
      menuData: headerMenuData,
      language: [],
      logedInUserDetails: false,
      userName: "",
      showProfile: false,
      profileImage: "",
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
      searchArea: false,
      showAdd: false,
      searchSug: false,
      searchInput: this.common.state.searchText,
      searchSuggestionList: [],
      seaschSuggList: [],
      page: 1,
      limit: 15,
      showHeader: true,
      lastScrollPosition: 0,
      scrollOffset: 40,
      searchAreaCloseFlage: false,
      directEvent: false,
      isSearchData: false,
    };
  },
  props: {
    is_admin: String,
    isSearchResult: Boolean,
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },
  created() {
    this.CommonService = new CommonService();
    this.SearchResultService = new SearchResultService();
  },

  watch: {
    "common.state.userId": function (newVal, oldVal) {
      if (newVal && localStorage.getItem("token")) {
        this.logedInUserDetails = true;
        this.profileImage = localStorage.getItem("profileImage");
        this.userName = localStorage.getItem("uname");
      } else {
        this.logedInUserDetails = false;
      }
    },
    searchArea: function (n, o) {
      if (n == false && this.searchArea == false) {
        this.searchInput = "";
        this.searchSuggestionList = [];
        this.isSearchData = false;
      }
    },
    searchInput: function (n, o) {
      if (n && n != o) {
        this.page = 1;
        this.searchSuggestionList = [];
        this.isSearchData = false;
      }
      if (n == "") {
        this.searchSug = false;
        this.isSearchData = false;
        this.searchSuggestionList = [];
      }
    },
    // for fetching list again, if you don't want to store the result then uncomment the below code.
    currentRouteName: function (n, o) {
      if (n == false && n != o) {
        this.$cookies.remove("lastLoggedinUser");
      }
    },
    currentTvRoute: function (n, o) {
      if (n == false && n != o) {
        localStorage.removeItem("draft_request_tv_id");
      }
    },
    $route(to, from) {
      if (from.name != to.name) {
        this.ismenuOpen = false;
      }
      if (
        from.name &&
        to.name == "SearchResult" &&
        this.searchAreaCloseFlage == false
      ) {
        this.searchInput = this.common.state.searchText;
        this.searchArea = true;
      } else if (
        window.location.pathname == "/search-result" &&
        this.searchAreaCloseFlage == false
      ) {
        this.searchArea = true;
      } else {
        this.searchInput = "";
        this.searchSug = false;
        this.searchArea = false;
        this.searchSuggestionList = [];
        this.searchAreaCloseFlage = false;
        this.showProfile = false;
        this.isSearchData = false;
      }
    },
  },

  updated() {
    if (localStorage.getItem("token")) {
      this.logedInUserDetails = true;
      this.userName = localStorage.getItem("uname");
      this.profileImage = localStorage.getItem("profileImage");
      // if (this.common.state.is_webtoon_display) {
      //   this.menuData = AdminheaderMenuData;
      // }
      if (this.common.state.is_video_display) {
        this.menuData = AdminheaderMenuData;
      }
    } else {
      this.logedInUserDetails = false;
    }
    const body = document.body;
    this.$vuetify.locale.current = this.$i18n.locale;

    if (this.$i18n.locale == "ko") {
      body.classList.add("translate-ko");
      this.common.methods.updateLang("KO");
      localStorage.setItem("selectedLang", this.common.state.SelectedLang);
    }
    if (this.$i18n.locale == "en") {
      body.classList.remove("translate-ko");
      this.common.methods.updateLang("EN");
      localStorage.setItem("selectedLang", this.common.state.SelectedLang);
    }
  },

  mounted() {
    if (localStorage.getItem("selectedLang"))
      this.$i18n.locale = localStorage.getItem("selectedLang").toLowerCase();
    //language dropdown
    moment.locale(this.$i18n.locale);
    this.languageDropdown();
    // this.getIp();

    if (window.location.pathname == "/search-result") {
      this.searchArea = true;
    }

    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
    this.getUserInfo();
  },

  methods: {
    menuOpen: function () {
      this.ismenuOpen = !this.ismenuOpen;
    },
    openInputBox() {
      // Programmatically trigger a click event on the input box
      this.searchArea = !this.searchArea;
      setTimeout(() => {
        this.$refs.searchInputBox.focus();
      }, 100);
    },

    goToLogin() {
      localStorage.setItem("redirectPath", this.$route.fullPath);
      this.$router.push("/login");
    },
    getLangId(value) {
      this.$i18n.locale = value;
      moment.locale(value);
      // window.location.reload();
    },

    //language dropdown
    languageDropdown() {
      this.CommonService.languageDropdown()
        .then((res) => {
          if (res.status == 200) {
            this.language = res.data.results;
            this.language.forEach((item) => {
              item.language_name = item.language_name
                .toUpperCase()
                .substring(0, 3);
            });
          }
        })
        .catch((err) => {
          return;
        });
    },

    //search suggetion list
    searchSuggetions(page) {
      this.$emit("searchedData");
      if (this.searchInput.length) {
        this.SearchResultService.getSearchSuggetions(
          this.searchInput,
          page,
          this.limit
        )
          .then((res) => {
            if (res.status == 200) {
              this.seaschSuggList = res.data.results;
              this.isSearchData = true;
              this.seaschSuggList.forEach((item) => {
                if (
                  !this.searchSuggestionList.some(
                    (existingItem) => existingItem.title_id === item.title_id
                  )
                ) {
                  this.searchSuggestionList.push(item);
                }
              });
              if (this.directEvent == true) {
                this.searchSug = false;
              } else {
                this.searchSug = true;
              }
              this.directEvent = false;
            }
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      } else {
        this.searchSuggestionList = [];
        this.isSearchData = false;
        this.searchSug = false;
      }
    },

    handleScroll(el) {
      if (
        el.srcElement.offsetHeight + el.srcElement.scrollTop + 1 >=
        el.srcElement.scrollHeight
      ) {
        console.log("end");
        let newPage = ++this.page;
        this.searchSuggetions(newPage);
      }
    },

    searchResult(item) {
      this.searchSug = false;
      this.ismenuOpen = false;
      localStorage.setItem("searchText", item.title_name);
      localStorage.setItem("searchType", item.title_type);
      this.common.methods.updateSearchText(item.title_name);
      this.common.methods.updateSearchType(item.title_type);
      this.searchInput = this.common.state.searchText;
      this.$router.push("/search-result");
    },

    debouncedHandler: debounce(function (page) {
      this.searchSuggetions(page);
    }, 700),

    directSearch(event, searchText) {
      let code = event.keyCode || event.which;
      if (code == 13) {
        this.directEvent = true;
        setTimeout(() => {
          this.searchSug = false;
          this.directEvent = false;
          this.isSearchData = false;
        }, 800);
        localStorage.setItem("searchText", searchText);
        localStorage.setItem("searchType", "");
        this.common.methods.updateSearchType("");
        this.common.methods.updateSearchText(searchText);
        this.searchInput = this.common.state.searchText;
        this.searchAreaCloseFlage = false;
        this.$router.push("/search-result");
      }
    },

    // log out
    logOut() {
      this.$cookies.set("lastLoggedinUser", this.userName);
      this.showProfile = false;
      let storedTheme = localStorage.getItem("theme-colour");
      let my_cookie_value = this.$cookies.get("userCookie");
      localStorage.clear();
      localStorage.setItem("theme-colour", storedTheme);
      this.$cookies.set("userCookie", my_cookie_value);
      localStorage.setItem("redirectPath", this.$route.fullPath);
      window.location.href = "/login";
    },

    gotoMypgae() {
      this.showProfile = false;
      this.$router.push("/my-page/communication");
    },
    checkActive(items) {
      if (items) return items.includes(this.$route.name);
      else return false;
    },
    // Toggle if navigation is shown or hidden
    onScroll() {
      if (this.$route.path.includes("admin")) {
        this.showHeader = true;
      } else {
        this.menuData.forEach((element) => {
          element.status = false;
        });
        this.showAdd = false;
        this.showProfile = false;
        if (window.pageYOffset < 0) {
          return;
        }
        if (
          Math.abs(window.pageYOffset - this.lastScrollPosition) <
          this.scrollOffset
        ) {
          return;
        }
        this.showHeader = window.pageYOffset < this.lastScrollPosition;
        this.lastScrollPosition = window.pageYOffset;
      }
    },
    getUserInfo() {
      if (localStorage.getItem("token")) {
        MyPageService.getUserInfo()
          .then((res) => {
            if (res.status == 200) {
              localStorage.setItem("profileImage", res.data.result.profile_pic);
              this.profileImage = res.data.result.profile_pic;
              // this.userName = res.data.result.user_name;
              // localStorage.setItem("uname", res.data.result.user_name);
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
    getIp() {
      VideoService.getIpaddr().then((res) => {
        // console.log('res', res.data.ipAddress)
        this.common.state.myIP = res.data.ipAddress;
        this.$cookies.set('myIP', res.data.ipAddress);
      });
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.name == "Login";
    },
    currentTvRoute() {
      return this.$route.name == "AddNewTVDetails";
    },
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style lang="scss" scoped>
.suggexted_title_wrap {
  .suggexted_title {
    text-transform: capitalize;
  }
}

.dropdown-menu {
  &.profile-dropdown {
    width: auto;
    display: block;
    cursor: pointer;

    .dropdown-item {
      white-space: nowrap;
      padding: 5px 10px;
    }
  }

  &.add-dropdown {
    display: flex;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.seach-suggesation {
  overflow: auto;
  height: calc(100vh - 240px);
}

.header {
  transform: translateY(0);
  transition: transform 300ms linear;
}

.header.is-hidden {
  transform: translateY(-100%);
}

.noDataFound {
  cursor: default;
}
</style>
