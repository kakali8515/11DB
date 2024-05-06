<template>
  <div>
    <div class="filters">
      <h3>{{ $t("searchResults.searchRight.webtoons.title") }}</h3>
      <span>
        <a href="javascript:void(0)" @click="sortOrder"><img src="../../assets/icons/filter-arrows.svg" alt="icon" /></a>
        <template v-for="(item, ind) of sortByData" :key="ind">
          <a href="javascript:void(0)" :class="sort_by == item.key ? 'active' : ''" @click="sortBy(item.key, ind)">{{
            item.title }}</a>
        </template>
      </span>
    </div>
    <div class="search-no-data" v-if="webtoonData.length < 1 && showData == false">
      {{ $t("searchResults.noData") }}
    </div>
    <ul class="search-list" v-else>
      <li v-for="(item, ind) in webtoonData" :key="ind">
        <a href="javascript:void(0)"
          @click=" $router.push({ name: 'WebtoonsDetail', params: { id: item.id, pageTitle: item.title } }); searchLog(item, `/webtoons/detail/${item.id}`)">
          <div class="img-wrap">
            <img v-if="item.poster_image?.includes('https')" :src="item.poster_image" alt="image" />
            <img v-else src="@/assets/images/sml-no-img.png" alt="" />
          </div>
          <div class="main-dta">
            <span>
              <h4>{{ item.title }}</h4>
              <p>{{ dateformat(item.release_date) }}</p>
            </span>
            <div class="status">
              <span>{{ $t(item.title_status) }}</span>
              <p v-if="item.weekly_telecast">{{ $t('webtoons.Every') }} {{ changeArray(item.weekly_telecast) }}</p>
            </div>
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
import { ref, computed } from "@vue/runtime-core";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import { dateformat } from "@/mixins/CommonFunctions.js";
export default {
  name: "SearchWebtoons",
  props: {
    webtoonData: {
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

    const changeArray = (data) => {
      if (data) {
        let wordsArr = data.split(',');
        for (let i = 0; i < wordsArr.length; i++) {
          wordsArr[i] = wordsArr[i][0].toUpperCase() + wordsArr[i].substring(1);
          wordsArr[i] = wordsArr[i].substring(0, 3);
          wordsArr[i] = t(wordsArr[i]);
        }
        return wordsArr.join(', ');
      }
    }

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
      changeArray,
      searchLog
    };
  },
};
</script>
