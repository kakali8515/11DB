<template>
  <div>
    <div class="filters">
      <h3>{{ $t("searchResults.searchRight.awards.title") }}</h3>
      <!-- <span>
        <a href="javascript:void(0)" @click="sortOrder"><img src="../../assets/icons/filter-arrows.svg" alt="icon" /></a>
        <template v-for="(item, ind) of sortByData" :key="ind">
          <a href="javascript:void(0)" :class="sort_by == item.key ? 'active' : ''" @click="sortBy(item.key, ind)">{{
            item.title }}</a>
        </template>
      </span> -->
    </div>

    <div class="search-no-data" v-if="awardData.length < 1 && showData == false">

      {{ $t("searchResults.noData") }}
    </div>
    <ul class="search-list search-scroll" v-else>
      <li v-for="(item, ind) in awardData" :key="ind">
        <a href="javascript:void(0)"
          @click=" $router.push({ name: 'AwardsDetail', params: { id: item.id, pageTitle: item.name } }); searchLog(item, `/awards/detail/${item.id}/${item.name}`)">
          <div class="img-wrap">
            <img v-if="item.poster_image" :src="item.poster_image" alt="image" />
            <img v-else src="@/assets/images/sml-no-img.png" alt="" />
          </div>
          <div class="main-dta">
            <span>
              <h4>{{ item.name }}</h4>
              <p>{{ dateformat(item.date) }}</p>
            </span>
            <div class="p-content" v-if="item.description">
              <p>{{ item.description }}</p>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "@vue/runtime-core";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import { dateformat } from "@/mixins/CommonFunctions.js";

export default {
  name: "SearchResultsMovies",
  props: {
    awardData: {
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
