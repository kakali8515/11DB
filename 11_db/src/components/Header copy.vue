<template>
  <header>
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
              <li class="menu-item" v-for="(item, index) of menuData" :key="index">
                <a href="javascript:void(0);" class="head-link toggle">{{$t(`header.mainMenu.${item.key_name}`)}}</a>
                <ul class="sub-menu dropdown-menu">
                  <li v-for="(submenu, index) in item.subMenu" :key="index">
                    <a href="javascript:void(0);">{{$t(`header.subMenu.${submenu.key_name}`)}}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="menu-details">
            <div class="add-more">
              <a href="javascript:void(0);" @click="showAdd = !showAdd">
                <img src="@/assets/icons/white-plus.svg" alt="plus" class="white-image" />
                <img src="@/assets/icons/black-plus.svg" alt="plus" class="red-image" />
              </a>
              <Transition>
                <div class="link dropdown-menu fl add-dropdown" v-if="showAdd" v-click-outside="()=>showAdd = false">
                  <a href="javascript:void(0);">{{
                  $t("header.addSection.movie")
                  }}</a>
                  <a href="javascript:void(0);">{{
                  $t("header.addSection.tvShows")
                  }}</a>
                  <a href="javascript:void(0);">{{
                  $t("header.addSection.webtoon")
                  }}</a>
                  <a href="javascript:void(0);">{{
                  $t("header.addSection.People")
                  }}</a>
                </div>
              </Transition>
            </div>
            <div class="search">
              <a href="javascript:void(0);" class="" @click="showSearch = !showSearch">
                <img src="@/assets/icons/white-search.svg" alt="search" class="white-image" />
                <img src="@/assets/icons/black-search.svg" alt="search" class="red-image" />
              </a>
              <Transition>
                <div class="link dropdown-search" v-if="showSearch" v-click-outside="()=>showSearch = false">
                  <div class="container">
                    <form action="#" class="search-form">
                      <input type="search" placeholder="Search for a movie,tv show,person..."
                        v-on:click.stop="doThis" />
                      <a href="#" @click="showSearch = false"><img src="@/assets/icons/red-close.svg" alt="close" /></a>
                    </form>
                    <ul>
                      <li>
                        <a href="javascript:void(0);" @click="showSearch = false"><span>Tom</span> & Jerry</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);"><span>Tom</span>as</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);"><span>Tomas</span>as Ledin</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);"><span>Tom</span>as Ledin : Just Do!</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);"><span>Tom</span>as Arane</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Transition>
            </div>
            <div class="dropdown-lang">
              <select v-model="$i18n.locale">
                <option v-for="(lang, index) in language" :key="index" :value="lang.language_code">
                  {{ lang.language_name }}
                </option>
              </select>
            </div>
            <div class="dropdown-profile" v-if="logedInUserDetails">
              <a @click="showDropdown">
                <a v-if="profileImage == '' || profileImage == 'null'" class="login-link">{{ userName }}</a>
                <img v-else :src="imgBaseUrl + profileImage" alt="profile" class="profile-pic" />
                <img src="@/assets/icons/down-arrow-white.svg" alt="search" class="white-image" />
                <img src="@/assets/icons/down-arrow-black.svg" alt="search" class="red-image" /></a>
              <Transition>
                <ul v-if="isOpenDropdown" v-click-outside="onClickOutside"
                  class="link link-profile dropdown-menu profile-dropdown">
                  <li @click="isOpenDropdown = false" class="dropdown-item">
                    {{ $t("header.profileDropdown.myPage") }}
                  </li>
                  <li @click="logOut" class="dropdown-item">
                    {{ $t("header.profileDropdown.logOut") }}
                  </li>
                </ul>
              </Transition>
            </div>
            <div class="dropdown-profile" v-else>
              <a class="login-link" @click="$router.push('/login')" href="javascript:void(0);">{{ $t("button.Login")
              }}</a>
            </div>
            <a href="#" class="mob-menu" v-on:click="menuOpen"><img src="../assets/icons/mobile-menu.svg"
                alt="menu" /></a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import CommonService from "@/services/CommonService";
import headerMenuData from "@/config/headerMenuData";
import vClickOutside from "click-outside-vue3";
export default {
  name: "Header",
  inject: ["common"],
  data() {
    return {
      ismenuOpen: false,
      menuData: headerMenuData,
      language: [],
      logedInUserDetails: false,
      userName: "",
      isOpenDropdown: false,
      profileImage: "",
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
      showSearch: false,
      showAdd: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  created() {
    this.CommonService = new CommonService();
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
  },

  updated() {
    if (localStorage.getItem("token")) {
      this.logedInUserDetails = true;
      this.userName = localStorage.getItem("uname");
      this.profileImage = localStorage.getItem("profileImage");
      // this.openDropdown();
    } else {
      this.logedInUserDetails = false;
    }

    if (this.$i18n.locale == "ko") {
      this.common.state.SelectedLang = "KO";
      localStorage.setItem("selectedLang", this.common.state.SelectedLang);
    }
    if (this.$i18n.locale == "en") {
      this.common.state.SelectedLang = "EN";
      localStorage.setItem("selectedLang", this.common.state.SelectedLang);
    }
  },

  mounted() {
    this.openDropdown();
    //language dropdown
    this.languageDropdown();
  },

  methods: {
    menuOpen: function () {
      this.ismenuOpen = !this.ismenuOpen;
    },

    onClickOutside(event) {
      this.isOpenDropdown = false;
    },

    openDropdown() {
      var elements = document.getElementsByClassName("toggle");
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.addEventListener("click", myFunction);
      }

      function myFunction() {
        var parent = this.parentElement;
        var hide_box = parent.querySelector(".dropdown-menu");
        var list = hide_box.classList;

        if (list.contains("show")) {
          list.remove("show");
        } else {
          for (let i = 0; i < elements.length; i++) {
            elements[i].parentElement
              .querySelector(".dropdown-menu")
              .classList.remove("show");
          }
          list.add("show");
        }
      }
    },

    //language dropdown
    languageDropdown() {
      this.CommonService.languageDropdown()
        .then((res) => {
          if (res.status == 200) {
            this.language = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // log out
    logOut() {
      this.isOpenDropdown = false;
      localStorage.clear();
      // this.$router.push({ name: 'Login' });
      window.location.href = "/login";
    },

    showDropdown() {
      this.isOpenDropdown = !this.isOpenDropdown;
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>