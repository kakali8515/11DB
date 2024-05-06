<template>
    <section class="movies-sec">
        <div class="container">
            <h2>{{ $t('webtoons.complete') }}</h2>
            <div class="movies-main">
                <FilterCard @getSearchData="searchData" :certificationtype="type" filterType="webtoons" />
                <div class="moives-list">
                    <div class="outerside" v-if="newResult.length > 0">
                        <PopularCard v-for="(movie, i) in newResult" :key="i" :popular="movie"
                            RedirectLink="WebtoonsDetail" />
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
import WebtoonDetailsService from "@/services/WebtoonDetailsService.js";
export default {
    name: "CompletedWebtoon",
    components: { FilterCard, PopularCard },
    inject: ["common"],
    data() {
        return {
            page: 1,
            limit: 20,
            popular_list: [],
            search_params: {},
            type: "webtoons",
            totalRecords: 0,
            newResult: [],
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
                this.getCompletedWebtton();
            }
        },
    },
    mounted() {
        localStorage.removeItem("site_language");
        localStorage.removeItem("draft_ids");
        this.observeWindow();
    },
    beforeUnmount() {
        this.observer.disconnect();
    },
    methods: {
        observeWindow() {
            this.observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !this.isLoading) {
                        this.getCompletedWebtton();
                    }
                },
                { threshold: 0 }
            );
            this.observer.observe(this.$refs.bottom);
        },
        // get ongoing webtoon list
        getCompletedWebtton() {
            let credential = {
                page: this.page,
                limit: this.limit,
                search_params: this.search_params,
                date: this.date
            };
            this.isLoading = true;
            WebtoonDetailsService.getCompletedWebtton(credential)
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
            this.getCompletedWebtton();
        },
    },
};
</script>
  