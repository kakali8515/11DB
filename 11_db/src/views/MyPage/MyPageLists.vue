<template>
  <section class="mypage-sec">
    <div class="container">
      <div class="mypage-wrapper">
        <LeftSidePanel />
        <div class="mypage-rght">
          <h2>{{ $t("activity.leftSidePannel.Lists") }}</h2>
          <div class="tab-outr full-wd three">
            <DynamicTabWrapper @getResponseTitle="onChangeTab" :seasonId="selectedTabId">
              <DynamicTab v-for="tab in tab_list" :title="tab.name" :key="tab.id" :seasonId="tab.id + ''">
                <div v-if="favoriteData.length">
                  <div v-if="tab.id != 1">
                    <ul class="comm-list list2 cursor-pointer" v-for="(item, index) in favoriteData" :key="index">
                      <li>
                        <FavoriteCard :favorite="item" @redirection="redirection" />
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    <ul class="comm-list list2 cursor-pointer" v-for="(item, index) in favoriteData" :key="index">
                      <li>
                        <FavoriteRatingCard :rating="item" @redirection="redirection" />
                      </li>
                    </ul>
                  </div>
                </div>
                <ul v-else>
                  <li>
                    <div class="no-data">
                      <p>{{ $t("addNewPeople.noData") }}</p>
                    </div>
                  </li>
                </ul>
              </DynamicTab>
            </DynamicTabWrapper>
            <div v-if="isLoading"></div>
            <div ref="bottom"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTab from "@/components/DynamicTabs.vue";
import LeftSidePanel from "@/components/MyPage/LeftSidePanel.vue";
import FavoriteCard from "@/components/MyPage/FavoriteCard.vue";
import FavoriteRatingCard from "@/components/MyPage/FavoriteRatingCard.vue";
import MyPageService from "@/services/MyPageService.js";
import { onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";
import { inject } from "vue";
import i18n from "@/config/i18n";

const page = ref(1);
const limit = ref(10);
const favoriteData = ref([]);
const favoriteLength = ref(0);
const ratingLength = ref(0);
const sharedLength = ref(0);
const favoriteTitle = ref("Favorite");
const ratingTitle = ref("Rating");
const sharedTitle = ref("Shared");
const listType = ref("favorite");
const tab_list = ref([]);
const observer = ref(null);
const isLoading = ref(false);
const bottom = ref(null);
const router = useRouter();
const isTabChanged = ref(false);
const common = inject("common");
const { t } = i18n.global;

onMounted(() => {
  observeWindow();
});

watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      page.value = 1;
      favoriteData.value = [];
      getFavouriteList();
    }
  }
);
const selectedTabId = ref(0);
const onChangeTab = (tab) => {
  selectedTabId.value = tab;
  isTabChanged.value = true;
  if (tab == 2) {
    listType.value = "shared";
    favoriteData.value = [];
    page.value = 1;
    getFavouriteList();
  }
  if (tab == 0) {
    listType.value = "favorite";
    favoriteData.value = [];
    page.value = 1;
    getFavouriteList();
  }
  if (tab == 1) {
    listType.value = "rating";
    favoriteData.value = [];
    page.value = 1;
    getFavouriteList();
  }
};

const getFavouriteList = () => {
  isLoading.value = true;
  let data = {
    list_type: listType.value,
    page: page.value,
    limit: limit.value,
    is_first: page.value == 1 ? "y" : "n",
  };

  MyPageService.getFavouriteList(data)
    .then((res) => {
      if (res.status == 200) {
        favoriteData.value = [...favoriteData.value, ...res.data.results];
        if (res.data.tabs) {
          favoriteLength.value = res.data?.tabs.favorite;
          ratingLength.value = res.data.tabs.rating;
          sharedLength.value = res.data.tabs.shared;
          favoriteTitle.value =
            t("myPage.list.favorite") + "(" + favoriteLength.value + ")";
          ratingTitle.value =
            t("myPage.list.rating") + "(" + ratingLength.value + ")";
          sharedTitle.value =
            t("myPage.list.shared") + "(" + sharedLength.value + ")";
        }
        tab_list.value = [];
        tab_list.value.push({ id: 0, name: favoriteTitle.value });
        tab_list.value.push({ id: 1, name: ratingTitle.value });
        tab_list.value.push({ id: 2, name: sharedTitle.value });
        if (
          !favoriteLength.value &&
          listType.value == "favorite" &&
          !isTabChanged.value
        ) {
          selectedTabId.value = 1;
          listType.value = "rating";
          getFavouriteList();
        } else if (
          !ratingLength.value &&
          listType.value == "rating" &&
          !isTabChanged.value
        ) {
          selectedTabId.value = 2;
          listType.value = "shared";
          getFavouriteList();
        } else if (
          !sharedLength.value &&
          listType.value == "shared" &&
          !isTabChanged.value
        ) {
          selectedTabId.value = 0;
          listType.value = "favorite";
        }
        if (res.data.total_records > favoriteData.value.length) {
          page.value = page.value + 1;
          isLoading.value = false;
        }
      }
    })
    .catch((err) => {
      return;
    });
};

const redirection = (item) => {
  if (item.list_type == "tv") {
    router.push({
      name: 'TvShowsDetails',
      params: { id: item.favourable_id, pageTitle: item.title_name },
    });
  } else if (item.list_type == "people") {
    router.push({
      name: 'PeopleDetails',
      params: { id: item.favourable_id, pageTitle: item.title_name },
    });
  } else if (item.list_type == "movie") {
    router.push({
      name: 'MoviesDetails',
      params: { id: item.favourable_id, pageTitle: item.title_name },
    });
  } else if (item.list_type == "award") {
    router.push({
      name: 'AwardsDetail',
      params: { id: item.favourable_id, pageTitle: item.title_name },
    });
  } else {
    router.push({
      name: 'WebtoonsDetail',
      params: { id: item.favourable_id, pageTitle: item.title_name },
    });
  }
};

const observeWindow = () => {
  observer.value = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isLoading.value) {
        getFavouriteList();
      }
    },
    { threshold: 0 }
  );
  observer.value.observe(bottom.value);
};
</script>
