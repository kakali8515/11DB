<template>
  <div>
    <div class="filters">
      <h3>{{ $t("searchResults.searchRight.videos.title") }}</h3>
      <span>
        <a href="javascript:void(0)" @click="sortOrder"><img src="../../assets/icons/filter-arrows.svg" alt="icon" /></a>
        <template v-for="(item, ind) of sortByData" :key="ind">
          <a href="javascript:void(0)" :class="sort_by == item.key ? 'active' : ''" @click="sortBy(item.key, ind)">{{
            item.title }}</a>
        </template>
      </span>
    </div>
    <div class="search-video-outer">
      <ul class="video-content">
        <li v-for="(video, i) in videoData" :key="i">
          <VideoList :video="video" @videoData="searchLog" />
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { onMounted, ref, computed } from "@vue/runtime-core";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import { dateformat } from "@/mixins/CommonFunctions.js";
import VideoList from "./VideoList.vue";
export default {
  name: "SearchVideos",
  components: {
    VideoList
  },
  props: {
    videoData: {
      type: Array,
    },
    sort_by: {
      type: String,
    },
    sort_order: {
      type: String
    },
    showData: {
      type: Boolean
    }
  },
  emits: ["sortBy", "sortOrder","searchLog"],

  setup(props, { emit }) {
    const sortByData = computed(() => ([
      { title: t("addNewMovies.latest"), key: "latest" },
      { title: t("addNewMovies.oldest"), key: "oldest" },
      { title: t("searchResultsMovies.popularity"), key: "popularity" },
    ]));
    const activeItem = ref(0);
    const sortOrderData = ref("desc");

    // send clicked sort by to the perent
    const sortBy = (item, i) => {
      emit("sortBy", item);
      activeItem.value = i;
    };
    // send clicked sort order to the perent
    const sortOrder = () => {
      if (props.sort_order == "desc") {
        sortOrderData.value = "asc";
      } else {
        sortOrderData.value = "desc";
      }
      emit("sortOrder", sortOrderData.value);
    };

    const searchLog = (item) => {
      console.log(item)
      emit("searchLog", item, "");
    }

    return {
      sortByData,
      sortBy,
      activeItem,
      sortOrderData,
      sortOrder,
      dateformat,
      searchLog
    };
  },
};
</script>
