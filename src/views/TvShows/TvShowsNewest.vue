<template>
  <section class="movies-sec">
    <div class="container">
      <h2>{{ $t("tvShows.tvShowsNewest") }}</h2>
      <div class="movies-main">
        <FilterCard @getSearchData="searchData" :certificationtype="type" />
        <div class="moives-list">
          <div class="outerside" v-if="newResult.length > 0">
            <PopularCard v-for="(tv, i) in newResult" :key="i" :popular="tv" RedirectLink="TvShowsDetails" />
          </div>
          <p v-if="isData && newResult.length == 0" class="list-no-data">
            {{ $t("searchResults.noData") }}
          </p>
        </div>
      </div>
      <div v-if="isLoading"></div>
      <div ref="bottom"></div>
    </div>
  </section>
</template>
<script>
import FilterCard from "@/components/FilterCard.vue";
import PopularCard from "@/components/PopularCard.vue";
import TVShowsDetailsService from "@/services/TVShowsDetailsService";
export default {
  name: "TvShowsNewest",
  components: { FilterCard, PopularCard },
  inject: ["common"],
  data() {
    return {
      type: "tv",
      page: 1,
      limit: 20,
      popular_list: [],
      totalRecords: 0,
      newResult: [],
      search_params: {},
      isData: false,
      isLoading: false,
      observer: null,
      date: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
    };
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.newResult = [];
        this.page = 1;
        this.isData = false;
        this.getNewestTVShowsList();
      }
    },
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    // this.getNewestTVShowsList();
    // window.addEventListener("scroll", this.onScroll);
    this.observeWindow();
  },
  beforeUnmount() {
    // window.removeEventListener("scroll", this.onScroll);
    this.observer.disconnect();
  },
  methods: {
    observeWindow() {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this.isLoading) {
            this.getNewestTVShowsList();
          }
        },
        { threshold: 0 }
      );
      this.observer.observe(this.$refs.bottom);
    },
    getNewestTVShowsList() {
      let credential = {
        page: this.page,
        limit: this.limit,
        search_params: this.search_params,
        date: this.date,
      };
      this.isLoading = true;
      TVShowsDetailsService.getNewestTVShowsList(credential)
        .then((res) => {
          if (res.status == 200) {
            this.isData = true;
            this.popular_list = res.data.results;
            this.totalRecords = res.data.total_records;
            this.popular_list.forEach((item) => {
              const existingItem = this.newResult.some(
                (displayedItem) => displayedItem.id === item.id
              );
              if (!existingItem) {
                this.newResult.push(item);
              }
            });
            if (this.totalRecords > this.newResult.length) {
              this.page++;
              this.isLoading = false;
            }
          }
        })
        .catch((err) => {
          return;
        });
    },
    // search params
    searchData(val) {
      this.search_params = val;
      this.newResult = [];
      this.page = 1;
      this.getNewestTVShowsList();
    },
    // window scroll
    // onScroll() {
    //   let bottomOfWindow =
    //     document.documentElement.offsetHeight +
    //       document.documentElement.scrollTop >=
    //     document.documentElement.scrollHeight;
    //   if (bottomOfWindow && this.totalRecords > this.newResult.length) {
    //     this.page = ++this.page;
    //     setTimeout(() => {
    //       this.getNewestTVShowsList();
    //     }, 100);
    //   }
    // },
  },
};
</script>
