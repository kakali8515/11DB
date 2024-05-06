<template>
  <div class="admin-left">
    <ul>
      <li v-for="(menu, index) in menuData" :key="index">
        <a href="javascript:void(0);" class="ad-link" :class="{
          active: checkActive(menu, false),
        }">
          <span><img :src="getImageUrl(menu.icon)" :alt="menu.icon" />{{
            $t(`sideBar.mainMenu.${menu.label}`)
          }}</span>
          <!-- <span><img :src="menu.icon" alt="" />{{ $t(`sideBar.mainMenu.${menu.label}`) }}</span> -->
          <img class="arrw1" src="@/assets/icons/down-arrow-black2.svg" alt="" />
          <img class="arrw2" src="@/assets/icons/up-arrow-red.svg" alt="" />
        </a>
        <ul class="ad-dropdown-menu" :style="checkActive(menu)">
          <li :class="{ active: sub.key.includes($route.name) }" v-for="(sub, index) in menu.subCategory" :key="index"
            @click="
              sub.redirectionLink
                ? $router.push(`/admin${sub.redirectionLink}`)
                : navigate();
              ">
            <a href="javascript:void(0);">
              <span><img :src="getImageUrl(sub.icon)" :alt="sub.icon" /></span>
              {{ $t(`sideBar.subMenu.${sub.label}`) }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import UserService from "@/admin/services/UserServices.js";
export default {
  name: "Sidebar",
  data() {
    return {
      menuData: [],
    };
  },
  watch: {
    menuData(n, o) {
      if (n.length) {
        setTimeout(this.assignClickListeners, 1000);
      }
    },
  },
  methods: {
    navigate() {
      window.open('https://analytics.google.com/analytics/web/#/p417448055/reports/intelligenthome?params=_u..nav%3Dmaui&collectionId=life-cycle', '_blank');
    },
    getImageUrl(path) {
      return new URL(`../../assets/icons/${path}`, import.meta.url);
    },
    checkActive(category, returnStyle = true) {
      let keysArray = category.subCategory.reduce((all, current) => {
        return all.concat(current.key);
      }, []);
      if (returnStyle) {
        let styleObject = {};
        if (keysArray.includes(this.$route.name)) {
          styleObject.display = "block";
        }
        return styleObject;
      } else {
        return keysArray.includes(this.$route.name);
      }
    },
    getUserMenu() {
      UserService.getUserMenu()
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem("menuData", JSON.stringify(res.data.results));
            this.menuData = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },
    assignClickListeners() {
      var dropdown = document.getElementsByClassName("ad-link");
      var i;
      for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var dropdownContent = this.nextElementSibling;
          if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
          } else {
            dropdownContent.style.display = "block";
          }
        });
      }
    },
  },
  created() {
    this.getUserMenu();
    if (localStorage.getItem("menuData")) {
      this.menuData = JSON.parse(localStorage.getItem("menuData"));
      setTimeout(this.assignClickListeners, 1000);
    }
  },
};
</script>
