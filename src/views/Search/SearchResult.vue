<template>
  <section class="search-results" id="messageBody">
    <div class="container">
      <h2>{{ $t("searchResults.title") }}</h2>
      <div class="search-main" v-if="menuList.length > 0">
        <div class="search-left stickyBox">
          <ul>
            <li v-for="(menu, index) of menuList" :key="index" :class="search_type.toLowerCase() ==
              menu.menu_key.toLowerCase()
              ? 'active'
              : ''
              " @click="fetchMenuData(menu)">
              <a href="javascript:void(0)">{{ menu.menu_name }} </a>
              <span>{{ menu.result_count }}</span>
            </li>
          </ul>
        </div>
        <div class="search-right">
          <transition name="search-fade">
            <SearchResultsMovies v-if="search_type == 'movies'" :moviesData="newResult ? newResult : ''"
              @sortBy="getSortBy" @sortOrder="getSortOrder" :sort_by="sort_by" :sort_order="sort_order"
              :showData="showData" @searchLog="getSearchLogData" />
          </transition>
          <transition name="search-fade">
            <SearchTvShows v-if="search_type == 'tv_shows'" :tvShowData="newResult ? newResult : ''" @sortBy="getSortBy"
              @sortOrder="getSortOrder" :sort_by="sort_by" :sort_order="sort_order" :showData="showData"
              @searchLog="getSearchLogData" />
          </transition>
          <transition name="search-fade">
            <SearchWebtoons v-if="search_type == 'webtoons'" :webtoonData="newResult ? newResult : ''" @sortBy="getSortBy"
              @sortOrder="getSortOrder" :sort_by="sort_by" :sort_order="sort_order" :showData="showData"
              @searchLog="getSearchLogData" />
          </transition>
          <transition name="search-fade">
            <SearchVideos v-if="search_type == 'videos'" :videoData="newResult ? newResult : ''" @sortBy="getSortBy"
              @sortOrder="getSortOrder" :sort_by="sort_by" :sort_order="sort_order" :showData="showData"
              @searchLog="getSearchLogData" />
          </transition>
          <transition name="search-fade">
            <SearchPeople v-if="search_type == 'people'" :peopleData="newResult ? newResult : ''" @sortBy="getSortBy"
              @sortOrder="getSortOrder" :sort_by="sort_by" :sort_order="sort_order" :showData="showData"
              @searchLog="getSearchLogData" />
          </transition>
          <transition name="search-fade">
            <SearchAwards v-if="search_type == 'award'" :awardData="newResult ? newResult : ''" @sortBy="getSortBy"
              @sortOrder="getSortOrder" :sort_by="sort_by" :sort_order="sort_order" :showData="showData"
              @searchLog="getSearchLogData" />
          </transition>
          <transition name="search-fade">
            <SearchTag v-if="search_type == 'tags'" :tagData="newResult ? newResult : ''" @sortBy="getSortBy"
              @sortOrder="getSortOrder" :showData="showData" @searchLog="getSearchLogData" />
          </transition>
          <transition name="search-fade">
            <SearchCompanies v-if="search_type == 'companies'" :companiesData="newResult ? newResult : ''"
              @sortBy="getSortBy" @sortOrder="getSortOrder" :showData="showData" @searchLog="getSearchLogData" />
          </transition>
        </div>
      </div>
      <div v-if="isLoading"></div>
      <div ref="bottom"></div>
    </div>
  </section>
</template>

<script>
import SearchResultsMovies from "@/views/Search/SearchResultsMovies.vue";
import SearchWebtoons from "@/views/Search/SearchWebtoons.vue";
import SearchVideos from "@/views/Search/SearchVideos.vue";
import SearchPeople from "@/views/Search/SearchPeople.vue";
import SearchAwards from "@/views/Search/SearchAwards.vue";
import SearchTag from "@/views/Search/SearchTag.vue";
import SearchCompanies from "@/views/Search/SearchCompanies.vue";
import SearchTvShows from "@/views/Search/SearchTvShows.vue";
import SearchResultService from "@/services/SearchResultService";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { inject } from "vue";
import { validateVimeoURL, matchYoutubeUrl } from "@/mixins/CommonValidation.js";
import UserStatistics from "@/services/UserStatistics.js";
export default {
  name: "SearchResult",
  components: {
    SearchResultsMovies,
    SearchWebtoons,
    SearchVideos,
    SearchPeople,
    SearchAwards,
    SearchTag,
    SearchCompanies,
    SearchTvShows,
  },
  setup(props, { emit }) {
    // decleared variabled
    const common = inject("common");
    const results = ref([]);
    const newResult = ref([]);
    const searchData = ref([]);
    const sort_by = ref("popularity");
    const sort_order = ref("desc");
    const search_type = ref(common.state.searchType ? common.state.searchType : 'movies');
    const page = ref(1);
    const limit = ref(10);
    const is_first = ref("yes");
    const totalRecords = ref("");
    const searchResultService = new SearchResultService();
    const menuList = ref([]);
    const getMenuTab = ref("movies");
    const isLoading = ref(false);
    const bottom = ref(null);
    const showData = ref(false);
    // update seachtype on change of seachtype
    watch(
      () => common.state.searchType,
      function (newVal, oldVal) {
        search_type.value = common.state.searchType ? common.state.searchType : 'movies';
        // setTimeout(() => {
        //   // search_type.value = common.state.searchType ? common.state.searchType : 'movies';
        //   if (newVal && newVal != oldVal) {
        //     updateSearchtype();
        //     newResult.value = [];
        //   }
        // }, 1000);
      }
    );

    // get search data on load
    onMounted(() => {
      localStorage.removeItem("site_language");
      localStorage.removeItem("draft_ids");
      newResult.value = [];
      updateSearchtype(search_type.value);
      //search_type.value = 'movies';
      is_first.value = "yes";
      observer.observe(bottom.value);

      // setTimeout(() => {
      //   search_type.value = 'movies';
      //   is_first.value = "yes";
      //   getSearchResult(
      //     sort_by.value,
      //     sort_order.value,
      //     search_type.value,
      //     page.value,
      //     limit.value,
      //     is_first.value
      //   );
      // }, 1000);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading.value) {
          getSearchResult(
            sort_by.value,
            sort_order.value,
            search_type.value,
            page.value,
            limit.value,
            is_first.value
          );
        }
      },
      { threshold: 0 }
    );

    // on search text change search api call again
    watch(
      () => common.state.searchText,
      function (n, o) {
        // sort_by.value = "latest";
        is_first.value = "yes";

        setTimeout(() => {
          search_type.value = common.state.searchType ? common.state.searchType : 'movies';
          //search_type.value = 'movies';
          newResult.value = [];
          showData.value = true;
          page.value = 1;
          if (n == '') {
            // Reset result counts to 0 if search text is empty
            menuList.value.forEach(menu => {
              menu.result_count = 0
              showData.value = false

            })
          }
          updateSearchtype(search_type.value);
          if ((n && n != o) || n == "")
            getSearchResult(
              sort_by.value,
              sort_order.value,
              search_type.value,
              page.value,
              limit.value,
              is_first.value,
            );
        }, 1000);
      }
    );
    // get update seach result on language change
    watch(
      () => common.state.SelectedLang,
      function (newVal, oldVal) {
        if (newVal && oldVal && newVal != oldVal) {
          newResult.value = [];
          is_first.value = "yes";
          page.value = 1;
          getSearchResult(
            sort_by.value,
            sort_order.value,
            search_type.value,
            page.value,
            limit.value,
            is_first.value,
            showData.value
          );
        }
      }
    );

    // search result main api
    const getSearchResult = (
      new_sort_by,
      new_sort_order,
      new_search_type,
      new_page,
      new_limit,
      new_is_first
    ) => {
      if (common.state.searchText) {
        isLoading.value = true;
        searchResultService
          .getSearchResult(
            common.state.searchText,
            new_sort_by,
            new_sort_order,
            new_search_type,
            new_page,
            new_limit,
            new_is_first
          )
          .then((res) => {
            if (res.status == 200) {
              emit('directSearch');
              searchData.value = res.data;
              results.value = res.data.results;
              totalRecords.value = res.data.total_records;
              search_type.value = res.data.search_type;
              showData.value = false;
              if (search_type.value == 'videos') {
                Array.from(results.value).forEach((item, i) => {
                  results.value[i]["videoid"] =
                    validateVimeoURL(item.video_path) ||
                    matchYoutubeUrl(item.video_path);
                  results.value[i]["link"] = item.video_path;
                  if (validateVimeoURL(item.video_path)) {
                    results.value[i]["type"] = "vimeo";
                  } else {
                    results.value[i]["type"] = "youtube";
                  }
                });
              }
              newResult.value.push(...results.value);
              if (res.data.menu_list) {
                // getMenuTab.value = getTab(res.data.menu_list, 'movies');
                // if (search_type.value !== getMenuTab.value) {
                //   search_type.value = getMenuTab.value;
                //   results.value = [];
                //   newResult.value = [];
                //   page.value = 1;
                //   updateSearchtype(getMenuTab.value);
                //   getSearchResult(
                //     sort_by.value,
                //     sort_order.value,
                //     search_type.value,
                //     page.value,
                //     limit.value,
                //     is_first.value
                //   );
                // }
                localStorage.setItem(
                  "menuList",
                  JSON.stringify(res.data.menu_list)
                );
                menuList.value = JSON.parse(localStorage.getItem("menuList"));
              }
              // if (totalRecords.value > newResult.value.length && search_type.value != 'people') {
              if (totalRecords.value > newResult.value.length) {
                is_first.value = "no";
                page.value++;
                isLoading.value = false;
              }

            } else {
              emit('directSearch');
            }
          })
          .catch((err) => {
            showData.value = false
            return;
          });
      }
    };

    const getTab = (menuList, defaultTab) => {
      let tab = defaultTab;
      if (menuList && menuList != 'undefined' && menuList != null && menuList.length > 0) {
        for (let i = 0; i < menuList.length; i++) {
          if (menuList[i].result_count > 0) {
            tab = menuList[i].menu_key;
            showData.value = true
            break
          } else {
            showData.value = false;
          }
        }
      }
      return tab;
    };

    // side menu functionality based on click
    const fetchMenuData = (menu) => {
      results.value = [];
      newResult.value = [];
      page.value = 1;
      isLoading.value = false;
      search_type.value = menu.menu_key;
      is_first.value = "no";
      if (menu.result_count == 0) {
        showData.value = false
      }
      else {
        showData.value = true
      }

      if (menu.menu_key == "people") {
        sort_by.value = "default";
        sort_order.value = "desc";
      } else if (menu.menu_key == "tags" || menu.menu_key == "companies") {
        sort_by.value = "alphabetic";
        sort_order.value = "asc";
      } else {
        sort_by.value = "default";
        sort_order.value = "desc";
      }
      getSearchResult(
        sort_by.value,
        sort_order.value,
        search_type.value,
        page.value,
        limit.value,
        is_first.value,
        showData.value
      );
    };

    // sorting
    const getSortBy = (item) => {
      if (item == "oldest") {
        sort_order.value = "asc";
      } else if (item == "birth_year" || item == "alphabetic") {
        sort_order.value = "asc";
      } else {
        sort_order.value = "desc";
      }
      sort_by.value = item;
      results.value = [];
      newResult.value = [];
      page.value = 1;
      is_first.value = "no";


      getSearchResult(
        sort_by.value,
        sort_order.value,
        search_type.value,
        page.value,
        limit.value,
        is_first.value,
        showData.value
      );
    };
    const getSortOrder = (item) => {
      sort_order.value = item;
      results.value = [];
      newResult.value = [];
      page.value = 1;
      is_first.value = "no";
      showData.value = false;

      getSearchResult(
        sort_by.value,
        sort_order.value,
        search_type.value,
        page.value,
        limit.value,
        is_first.value,
        showData.value
      );
    };
    // commonly used function to update sorting based on searchtype 
    const updateSearchtype = (type) => {

      if (type == "people") {
        sort_by.value = "default";
        sort_order.value = "desc";
      } else if (
        type == "tags" ||
        type == "companies"
      ) {
        sort_by.value = "alphabetic";
        sort_order.value = "asc";
      } else {
        sort_by.value = "default";
        sort_order.value = "desc";
      }
    };
    validateVimeoURL;
    matchYoutubeUrl;

    // infinite scroll on window scroll
    // window.onscroll = () => {
    //   InfiniteScroll();
    // };
    // infinite scroll fn
    // const InfiniteScroll = () => {
    //   let bottomOfWindow =
    //     document.documentElement.offsetHeight +
    //     document.documentElement.scrollTop >=
    //     document.documentElement.scrollHeight;
    //   if (bottomOfWindow && totalRecords.value > newResult.value.length) {
    //     is_first.value = "no";
    //     let newPage = ++page.value;
    //     setTimeout(() => {
    //       getSearchResult(
    //         sort_by.value,
    //         sort_order.value,
    //         search_type.value,
    //         newPage,
    //         limit.value,
    //         is_first.value
    //       );
    //     }, 100);
    //   }
    // };

    const getSearchLogData = (data, url) => {

      let payloadData = {
        search_text: common.state.searchText,
        type: search_type.value,
        goto_text: data.title || data.agency_name || data.title_name || data.people_name,
        search_sort: sort_by.value,
        goto_url: url,
        release_at: data.release_date ? data.release_date : null,
        view_id: data.id,
        statistic_id: common.state.statistic_id,
      };

      console.log(payloadData);

      UserStatistics.searchLogUpdate(payloadData)
        .then((res) => {
          if (res.status == 200) {
          }
        })
        .catch((err) => {
          console.log(err);
          return;
        });

    }
    return {
      searchData,
      fetchMenuData,
      search_type,
      results,
      getSortBy,
      getSortOrder,
      newResult,
      menuList,
      getMenuTab,
      isLoading,
      bottom,
      sort_by,
      sort_order,
      showData,
      getSearchLogData
    };
  },
};
</script>

<style lang="scss" scoped>
.search-fade-enter-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.search-fade-enter-from {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}</style>
