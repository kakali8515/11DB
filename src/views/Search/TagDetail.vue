<template>
  <section class="tag-details">
    <div class="container">
      <h2>{{ tag_name }}</h2>
      <div class="tagdetail-content">
        <div class="tab-outr">
          <ul class="tabs-header">
            <li v-for="(item, index) of tagList" :key="index" @click="filterTag(item.value, index)"
              :class="index == activeItem ? 'active' : ''">
              {{ item.title }}
            </li>
          </ul>
          <ul class="tags-list" v-if="newTagDetailResult.length > 0">
            <li v-for="(item, index) of newTagDetailResult" :key="index" @click="tagRedirect(item)">
              <a href="javaScript:void(0)">
                <div class="img-wrap">
                  <img v-if="item.poster_image" :src="item.poster_image" alt="image" />

                  <img v-else src="@/assets/images/no-image-view.png" alt="image" />
                </div>
                <div class="main-dta">
                  <span>
                    <h4>{{ item.title }}</h4>
                    <p>{{ dateformat(item.release_date) }}</p>
                  </span>
                  <div class="complete-status-info">
                    <div class="complete-status" v-if="item.tag_status">
                      {{ item.tag_status }}
                    </div>
                    <div class="complete-date-info">{{ item.show_day }}</div>
                  </div>
                  <div class="p-content" v-if="item.overview">
                    <p>{{ item.overview }}</p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <div class="no-data-wrapper" v-if="isData && newTagDetailResult.length == 0">
            <p>{{ $t("searchResults.noData") }}</p>
          </div>
        </div>
      </div>
      <div v-if="isScrolling"></div>
      <div ref="bottom"></div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref, watch } from "@vue/runtime-core";
import SearchResultService from "@/services/SearchResultService";
import { useRoute } from "vue-router";
import i18n from "@/config/i18n";
import { dateformat } from "@/mixins/CommonFunctions.js";
import { useRouter } from "vue-router";
const { t } = i18n.global;
import { inject } from "vue";
export default {
  name: "TagDetail",
  inject: ["common"],
  setup() {
    const activeItem = ref(0);
    const route = useRoute();
    const tag_id = ref(route.params.id);
    const type = ref("all");
    const page = ref(1);
    const limit = ref(10);
    const tagDetailResult = ref([]);
    const searchResultService = new SearchResultService();
    const common = inject("common");
    const router = useRouter();
    const tag_name = ref();
    const isData = ref(false);
    const isScrolling = ref(false);
    const observer = ref(null);
    const bottom = ref(null);
    const newTagDetailResult = ref([]);
    // get update seach result on language change
    watch(
      () => common.state.SelectedLang,
      function (newVal, oldVal) {
        if (newVal && oldVal && newVal != oldVal) {
          page.value = 1;
          newTagDetailResult.value = [];
          isData.value = false;
          tagDetails(tag_id.value, type.value, page.value, limit.value);
        }
      }
    );

    // get search data on load
    onMounted(() => {
      //tagDetails(tag_id.value, type.value, page.value, limit.value);
      observeWindow();
    });
    const observeWindow = () => {
      observer.value = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrolling.value) {
            tagDetails(tag_id.value, type.value, page.value, limit.value);
          }
        },
        { threshold: 0 }
      );
      observer.value.observe(bottom.value);
    };

    // search result main api
    const tagDetails = (tag_id, type, _page, limit) => {
      isScrolling.value = true;
      searchResultService
        .getTagDetails(tag_id, type, _page, limit)
        .then((res) => {
          if (res.status == 200) {
            isData.value = true;
            tagDetailResult.value = res.data.results;
            tag_name.value = res.data.tag_name;
            document.title = res.data.tag_name + ' - 11DB';
            newTagDetailResult.value.push(...tagDetailResult.value);
            if (res.data.total_records > newTagDetailResult.value.length) {
              page.value = page.value + 1;
              isScrolling.value = false;
            }
          }
        })
        .catch((err) => {
          setTimeout(() => {
            isData.value = false;
          }, 1000);
          return;
        });
    };
    const filterTag = (item, i) => {
      newTagDetailResult.value = [];
      activeItem.value = i;
      type.value = item;
      page.value = 1;
      isData.value = false;
      tagDetails(tag_id.value, type.value, page.value, limit.value);
    };

    const tagRedirect = (item) => {
      if (item.type === "tv") {
        router.push({
          name: 'TvShowsDetails',
          params: { id: item.id, pageTitle: item.title },
        });
      } else if (item.type === "movie") {
        router.push({
          name: 'MoviesDetails',
          params: { id: item.id, pageTitle: item.title },
        });
      } else if (item.type === "webtoons") {
        router.push({
          name: 'WebtoonsDetail',
          params: { id: item.id, pageTitle: item.title },
        });
      }
    };

    return {
      filterTag,
      tagDetailResult,
      dateformat,
      activeItem,
      tagRedirect,
      tag_name,
      isData,
      isScrolling,
      bottom,
      newTagDetailResult,
    };
  },
  computed: {
    tagList() {
      if (this.common.state.is_webtoon_display) {
        return [
          { title: t("bulk.worklist.all"), value: "all" },
          { title: t("searchResults.searchRight.movies"), value: "movie" },
          { title: t("searchResults.searchRight.tvShows"), value: "tv" },
          { title: t("searchResults.searchRight.webtoons.title"), value: "webtoons", },
        ];
      } else {
        return [
          { title: t("bulk.worklist.all"), value: "all" },
          { title: t("searchResults.searchRight.movies"), value: "movie" },
          { title: t("searchResults.searchRight.tvShows"), value: "tv" },
        ];
      }
    },
  },
};
</script>
