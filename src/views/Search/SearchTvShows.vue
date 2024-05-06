<template>
  <div>
    <div class="filters">
      <h3>{{ $t("searchResults.searchRight.tvShows") }}</h3>
      <span>
        <a href="javascript:void(0)" @click="sortOrder"><img src="../../assets/icons/filter-arrows.svg" alt="icon" /></a>
        <template v-for="(item, ind) of sortByData" :key="ind">
          <a href="javascript:void(0)" :class="sort_by == item.key ? 'active' : ''" @click="sortBy(item.key, ind)">{{
            item.title }}</a>
        </template>
      </span>
    </div>
    <div class="search-no-data" v-if="tvShowData.length < 1 && showData == false">
      {{ $t("searchResults.noData") }}
    </div>
    <ul class="search-list" v-else>
      <li v-for="(item, ind) in tvShowData" :key="ind">
        <a href="javascript:void(0)"
          @click="$router.push({ name: 'TvShowsDetails', params: { id: item.id, pageTitle: item.title } }); searchLog(item, `/tvshows/details/${item.id}`)">
          <div class="img-wrap">
            <img v-if="item.poster_image?.includes('https')" :src="item.poster_image" alt="image" />
            <img v-else src="@/assets/images/sml-no-img.png" alt="" />
          </div>
          <div class="main-dta">
            <span>
              <h4>{{ item.title }}</h4>
              <p>{{ dateformat(item.release_date) }}</p>
            </span>
            <div class="p-content" v-if="item.overview">
              <p>{{ item.overview }}</p>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "@vue/runtime-core";
import { dateformat } from "@/mixins/CommonFunctions.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;

export default {
  name: "SearchTvShows",
  props: {
    tvShowData: {
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
  emits: ["sortBy", "sortOrder", "searchLog"],
  setup(props, { emit }) {
    const sortByData = computed(() => ([
      { title: t("addNewMovies.latest"), key: "latest" },
      { title: t("addNewMovies.oldest"), key: "oldest" },
      { title: t("searchResultsMovies.popularity"), key: "popularity" },
    ]));
    const activeItem = ref(0);
    const sortOrderData = ref("desc");


    // fetching prpost data here from perent
    onMounted(() => {
      // setTimeout(() => {
      //   showData.value = true;
      // }, 300);
    });
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

    const searchLog = (item, url) => {
      emit("searchLog", item, url);
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
