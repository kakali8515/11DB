<template>
  <div>
    <div class="filters tag-filter filters_design">
      <h3>{{ $t("searchResults.searchRight.tags.title") }}</h3>
      <span>
        <a href="javascript:void(0)" @click="sortOrder"><img src="../../assets/icons/filter-arrows.svg" alt="icon" /></a>
        <template v-for="(item, ind) of sortByData" :key="ind">
          <a href="javascript:void(0)" :class="ind == activeItem ? 'active' : ''" @click="sortBy(item.key, ind)">{{
            item.title }}</a>
        </template>
      </span>
    </div>
    <div class="search-no-data" v-if="tagData.length < 1 && showData == false">
      {{ $t("searchResults.noData") }}
    </div>
    <ul class="search-list tag-list search-scroll" v-else>
      <li v-for="(item, ind) of tagData" :key="ind">
        <a href="javascript:void(0)" @click="
          $router.push({
            name: 'TagDetail',
            params: { id: item.id, tagname: item.title, pageTitle: item.title },
          }); searchLog(item, `/search/tag-detail/${item.id}/${item.title}`)
          ">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "@vue/runtime-core";
import moment from "moment";
import i18n from "@/config/i18n";
const { t } = i18n.global;

export default {
  name: "SearchTag",
  props: {
    tagData: {
      type: Array,
    },
    showData: {
      type: Boolean
    }
  },
  emits: ["sortBy", "sortOrder", "searchLog"],

  setup(props, { emit }) {
    const sortByData = computed(() => ([
      { title: t("searchCompanies.alphabetic"), key: "alphabetic" },
    ]));
    const activeItem = ref(0);
    const sortOrderData = ref("asc");
    // const showData = ref(false);

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
      if (sortOrderData.value == "desc") {
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
      searchLog
    };
  },
};
</script>
