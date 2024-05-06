<template>
  <div>
    <section class="banner" v-show="top_news.news_title"
      :class="movies_trending.length > 0 || tv_shows_trending.length > 0 || webtoon_trending.length > 0 ? '' : 'pb-0'">
      <div class="container">
        <div class="banner-content">
          <h2>{{ $t("home.topNews") }}</h2>
          <div class="news-content">
            <div class="news-left">
              <a :href="top_news.slug_name" target="_blank" v-if="showImg">
                <img v-if="top_news.news_image" :src="top_news.news_image" alt="image" @error="showImg = false" />
                <!-- <img v-else src="@/assets/images/zapzee-default-image.png" /> -->
              </a>
              <a :href="top_news.slug_name" target="_blank" v-if="isTopnewsData && top_news.news_image == ''">
                <img src="@/assets/images/zapzee-default-image.png" />
              </a>
            </div>
            <div class="news-right">
              <span>{{ top_news.news_category }}</span>
              <a :href="top_news.slug_name" target="_blank" class="title" v-html="top_news.news_title"></a>
              <p class="p-txt" v-html="top_news.news_details"></p>
              <div class="news-date">
                <p>{{ dateformat(top_news.news_date) }}</p>
              </div>
            </div>
          </div>
          <div class="banner-tabs">
            <div class="tab-outr">
              <TabWrapper>
                <Tabs title="header.mainMenu.Movies">
                  <div class="lists tab-scroll" v-if="movies.length > 0">
                    <div class="outerside">
                      <CardOne v-for="(item, i) in movies" :key="i" :articles="item" />
                    </div>
                    <a :href="movie_rss_link" class="more-content" target="_blank">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isNewsData && movies.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
                <Tabs title="header.mainMenu.TVShows">
                  <div class="lists tab-scroll" v-if="tv_shows.length > 0">
                    <div class="outerside">
                      <CardOne v-for="(item, i) in tv_shows" :key="i" :articles="item" />
                    </div>
                    <a :href="rss_link" class="more-content" target="_blank">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isNewsData && tv_shows.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
                <Tabs title="header.mainMenu.Webtoons">
                  <div class="lists tab-scroll" v-if="webtoon_news.length > 0">
                    <div class="outerside">
                      <CardOne v-for="(item, i) in webtoon_news" :key="i" :articles="item" />
                    </div>
                    <a :href="webtoon_rss_link" class="more-content" target="_blank">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isNewsData && webtoon_news.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
              </TabWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="common-section trending"
      :class="[top_news.news_title ? '' : 'common-shows pb-0',
      hot_videos.length > 0 && (movies_coming_soon?.length > 0 || tv_show_coming_soon?.length > 0 || webtoon_coming_soon?.length > 0) ? '' : 'common-shows pt-0']"
      v-show="movies_trending.length > 0 || tv_shows_trending.length > 0 || webtoon_trending.length > 0">
      <div class="container">
        <div class="trending-content">
          <h2>{{ $t("home.trending") }}</h2>
          <div class="trending-tabs">
            <div class="tab-outr">
              <TabWrapper>
                <Tabs title="header.mainMenu.Movies">
                  <div class="lists tab-scroll" v-if="movies_trending.length > 0">
                    <div class="outerside">
                      <CardTwo v-for="(item, i) in movies_trending" :key="i" :trending="item"
                        :RedirectLink="`/movies/details/${item.title_id}`" />
                    </div>
                    <a @click="$router.push('/movies/popular')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isTrendingData && movies_trending.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
                <Tabs title="header.mainMenu.TVShows">
                  <div class="lists tab-scroll" v-if="tv_shows_trending.length > 0">
                    <div class="outerside">
                      <CardTwo v-for="(item, i) in tv_shows_trending" :key="i" :trending="item"
                        :RedirectLink="`/tvshows/details/${item.title_id}`" />
                    </div>
                    <a @click="$router.push('/tvshows/popular')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isTrendingData && tv_shows_trending.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
                <Tabs title="header.mainMenu.Webtoons">
                  <div class="lists tab-scroll" v-if="webtoon_trending.length > 0">
                    <div class="outerside">
                      <CardTwo v-for="(item, i) in webtoon_trending" :key="i" :trending="item"
                        :RedirectLink="`/webtoons/detail/${item.title_id}`" />
                    </div>
                    <a @click="$router.push('/webtoons/popular')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isTrendingData && webtoon_trending.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
              </TabWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hot-videos"
      :class="movies_coming_soon?.length > 0 || tv_show_coming_soon?.length > 0 || webtoon_coming_soon?.length > 0 ? '' : 'common-shows'"
      v-if="hot_videos.length > 0">
      <div class="container">
        <div class="hot-lists">
          <h2>{{ $t("home.hotVideos") }}</h2>
          <div class="hot-content" v-if="hot_videos.length > 0">
            <div class="lists tab-scroll">
              <VideoSlider :videos="hot_videos" />
              <a @click="$router.push('/video/popular')" class="more-content" v-if="hot_videos.length > 3">
                <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
              </a>
            </div>
          </div>
          <div class="no-data-wrapper" v-else-if="isHotData && hot_videos.length == 0">
            <p>{{ $t("addNewPeople.loading") }}</p>
          </div>
          <div class="no-data-wrapper" v-else>
            <p>{{ $t("addNewPeople.noData") }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="google-adds">
      <div class="container">
        <div class="adds-image">
          <img src="../assets/images/google-add.png" alt="adds-image" />
        </div>
      </div>
    </section> -->
    <section class="common-section coming-soon common-shows" :class="latest_trailers.length > 0 ? '' : 'pb-0'"
      v-show="movies_coming_soon?.length > 0 || tv_show_coming_soon?.length > 0 || webtoon_coming_soon?.length > 0">
      <div class="container">
        <div class="trending-content">
          <h2>{{ $t("home.comingSoon") }}</h2>
          <div class="trending-tabs">
            <div class="tab-outr">
              <TabWrapper>
                <Tabs title="header.mainMenu.Movies">
                  <div class="lists tab-scroll" v-if="movies_coming_soon?.length > 0">
                    <div class="outerside">
                      <CardTwo v-for="(item, i) in movies_coming_soon" :key="i" :trending="item"
                        :RedirectLink="`/movies/details/${item.title_id}`" />
                    </div>
                    <a @click="$router.push('/movies/upcoming')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isComingSoonData && movies_coming_soon?.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
                <Tabs title="header.mainMenu.TVShows">
                  <div class="lists tab-scroll" v-if="tv_show_coming_soon?.length > 0">
                    <div class="outerside">
                      <CardTwo v-for="(item, i) in tv_show_coming_soon" :key="i" :trending="item"
                        :RedirectLink="`/tvshows/details/${item.title_id}`" />
                    </div>
                    <a @click="$router.push('/tvshows/upcoming')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isComingSoonData && tv_show_coming_soon?.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
                <Tabs title="header.mainMenu.Webtoons">
                  <div class="lists tab-scroll" v-if="webtoon_coming_soon?.length > 0">
                    <div class="outerside">
                      <CardTwo v-for="(item, i) in webtoon_coming_soon" :key="i" :trending="item"
                        :RedirectLink="`/webtoons/detail/${item.title_id}`" />
                    </div>
                    <a @click="$router.push({
                      name: 'WebtoonGoing',
                      params: {
                        itemActive: 'comingSoon'
                      }
                    })" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isComingSoonData && webtoon_coming_soon?.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
              </TabWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hot-videos lastest-trailer" v-if="latest_trailers.length > 0">
      <div class="container">
        <div class="hot-lists">
          <h2>{{ $t("home.latestTrailers") }}</h2>
          <div class="hot-content" v-if="latest_trailers.length > 0">
            <VideoSlider :videos="latest_trailers" />
            <a @click="$router.push('/video/trailer')" class="more-content" v-if="latest_trailers.length > 3">
              <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
              <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
            </a>
          </div>
          <div class="no-data-wrapper" v-else-if="isTrailerData && latest_trailers.length == 0">
            <p>{{ $t("addNewPeople.loading") }}</p>
          </div>
          <div class="no-data-wrapper" v-else>
            <p>{{ $t("addNewPeople.noData") }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="common-shows real-time"
      :class="movies_popular?.length > 0 || tv_show_popular?.length > 0 || webtoon_popular?.length > 0 || people_lists.length > 0 ? 'pb-0' : ''"
      v-show="real_time_feeds.length > 0">
      <div class="container">
        <div class="real-time-content">
          <h2>{{ $t("home.realTimeFeeds") }}</h2>
          <ul v-if="real_time_feeds.length > 0">
            <li v-for="(feed, i) in real_time_feeds" :key="i">
              <Comments :comment="feed" />
            </li>
          </ul>
          <div class="no-data-wrapper" v-else>
            <p>{{ $t("addNewPeople.noData") }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="common-shows most-popular pb-0"
      v-show="movies_popular?.length > 0 || tv_show_popular?.length > 0 || webtoon_popular?.length > 0">
      <div class="container">
        <div class="common-content">
          <h2>{{ $t("home.mostPopularShows") }}</h2>
          <div class="common-tabs">
            <div class="tab-outr">
              <TabWrapper>
                <Tabs title="header.mainMenu.Movies">
                  <div class="lists tab-scroll" v-if="movies_popular?.length > 0">
                    <div class="outerside">
                      <CardFour v-for="(item, i) in movies_popular" :key="i" :data="item" :serial_no="i"
                        :RedirectLink="`/movies/details/${item.title_id}`" type="movie" section="popular" />
                    </div>
                    <a @click="$router.push('/movies/toprated')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isPopularData && movies_popular?.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
                <Tabs title="header.mainMenu.TVShows">
                  <div class="lists tab-scroll" v-if="tv_show_popular?.length > 0">
                    <div class="outerside">
                      <CardFour v-for="(item, i) in tv_show_popular" :key="i" :data="item" :serial_no="i"
                        :RedirectLink="`/tvshows/details/${item.title_id}`" type="tv" section="popular" />
                    </div>
                    <a @click="$router.push('/tvshows/toprated')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isPopularData && tv_show_popular?.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
                <Tabs title="header.mainMenu.Webtoons">
                  <div class="lists tab-scroll" v-if="webtoon_popular?.length > 0">
                    <div class="outerside">
                      <CardFour v-for="(item, i) in webtoon_popular" :key="i" :data="item" :serial_no="i"
                        :RedirectLink="`/webtoons/detail/${item.title_id}`" type="tv" section="popular"
                        webtoon_popular="webtoon_popular" />
                    </div>
                    <a @click="$router.push('/webtoons/complete')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isPopularData && webtoon_popular?.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
              </TabWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="common-shows new-release" :class="people_lists.length > 0 ? 'pb-0' : ''"
      v-show="movie_new_release?.length > 0 || tv_show_new_release?.length > 0 || webtoon_new_realease?.length > 0">
      <div class="container">
        <div class="common-content">
          <h2>{{ $t("home.newRelease") }}</h2>
          <div class="common-tabs">
            <div class="tab-outr">
              <TabWrapper>
                <Tabs title="header.mainMenu.Movies">
                  <div class="lists tab-scroll" v-if="movie_new_release?.length > 0">
                    <div class="outerside">
                      <CardFour v-for="(item, i) in movie_new_release" :key="i" :data="item" :serial_no="i"
                        :RedirectLink="`/movies/details/${item.title_id}`" type="movie" section="newrelease" />
                    </div>
                    <a @click="$router.push('/movies/newest')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isNewReleaseData && movie_new_release?.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
                <Tabs title="header.mainMenu.TVShows">
                  <div class="lists tab-scroll" v-if="tv_show_new_release?.length > 0">
                    <div class="outerside">
                      <CardFour v-for="(item, i) in tv_show_new_release" :key="i" :data="item" :serial_no="i"
                        :RedirectLink="`/tvshows/details/${item.title_id}`" type="tv" section="newrelease" />
                    </div>
                    <a @click="$router.push('/tvshows/newest')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isNewReleaseData && tv_show_new_release?.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
                <Tabs title="header.mainMenu.Webtoons">
                  <div class="lists tab-scroll" v-if="webtoon_new_realease?.length > 0">
                    <div class="outerside">
                      <CardFour v-for="(item, i) in webtoon_new_realease" :key="i" :data="item" :serial_no="i"
                        :RedirectLink="`/webtoons/detail/${item.title_id}`" type="webtoons" section="newrelease" />
                    </div>
                    <a @click="$router.push('/webtoons/newest')" class="more-content">
                      <img src="../assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
                      <img src="../assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
                    </a>
                  </div>
                  <div class="no-data-wrapper" v-else-if="isNewReleaseData && webtoon_new_realease?.length == 0">
                    <p>{{ $t("addNewPeople.loading") }}</p>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("addNewPeople.noData") }}</p>
                  </div>
                </Tabs>
              </TabWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="google-adds">
      <div class="container">
        <div class="adds-image">
          <img src="../assets/images/google-add.png" alt="adds-image" />
        </div>
      </div>
    </section> -->
    <section class="common-shows born-today" v-show="people_lists.length > 0">
      <div class="container">
        <div class="born">
          <h2>
            {{ $t("home.bornToday") }}<span>{{ dateformat(date) }}</span>
          </h2>
        </div>
        <ul v-if="people_lists.length > 0">
          <li v-for="(people, i) in people_lists" :key="i">
            <Card :people="people" />
          </li>
        </ul>
        <div class="no-data-wrapper" v-else-if="isBornData && people_lists.length == 0">
          <p>{{ $t("addNewPeople.loading") }}</p>
        </div>
        <div class="no-data-wrapper" v-else>
          <p>{{ $t("addNewPeople.noData") }}</p>
        </div>
      </div>
    </section>
    <Loading :active="isLoading" :can-cancel="true"></Loading>
  </div>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import CardOne from "@/components/CardOne.vue";
import CardTwo from "@/components/CardTwo.vue";
import CardFour from "@/components/CardFour.vue";
import VideoSlider from "@/components/VideoSlider.vue";
import Comments from "@/components/Comments.vue";
import Card from "@/components/Card.vue";
import HomePageService from "@/services/HomePageService";
import { dateformat } from "@/mixins/CommonFunctions.js";
import Loading from "vue3-loading-overlay";
import {
  validateVimeoURL,
  matchYoutubeUrl,
} from "@/mixins/CommonValidation.js";
export default {
  name: "Home",
  components: {
    Tabs,
    TabWrapper,
    CardOne,
    CardTwo,
    CardFour,
    VideoSlider,
    Comments,
    Card,
    Loading
  },
  emits: ["on-current-theme-change"],
  inject: ["common"],
  data() {
    return {
      top_news: "",
      tv_shows: [],
      movies: [],
      movie_rss_link: "",
      rss_link: "",
      webtoon_news: [],
      webtoon_rss_link: "",
      movies_trending: [],
      tv_shows_trending: [],
      webtoon_trending: [],
      hot_videos: [],
      movies_coming_soon: [],
      tv_show_coming_soon: [],
      webtoon_coming_soon: [],
      latest_trailers: [],
      real_time_feeds: [],
      movie_new_release: [],
      tv_show_new_release: [],
      webtoon_new_realease: [],
      today_date: "",
      movies_popular: [],
      tv_show_popular: [],
      webtoon_popular: [],
      people_lists: [],
      showImg: true,
      date: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
      isLoading: false,
      isPopularData: false,
      isBornData: false,
      isNewsData: false,
      isTrendingData: false,
      isHotData: false,
      isComingSoonData: false,
      isTrailerData: false,
      isNewReleaseData: false,
      isTopnewsData: false
    };
  },
  created() {
    this.HomePageService = new HomePageService();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.isPopularData = true;
        this.isBornData = true;
        this.isNewsData = true;
        this.isTrendingData = true;
        this.isHotData = true;
        this.isComingSoonData = true;
        this.isTrailerData = true;
        this.isNewReleaseData = true;
        this.isTopnewsData = false;
        this.latest_trailers = [];
        this.movies_popular = [];
        this.tv_show_popular = [];
        this.webtoon_popular = [];
        this.movie_new_release = [];
        this.tv_show_new_release = [];
        this.webtoon_new_realease = [];
        this.homePageTopNews();
        this.homePageTrending();
        this.homePageHotVideos();
        this.homePageComingSoon();
        this.homePageLatestTrailer();
        this.homePageRealTimeFeeds();
        this.homePagePopularshows();
        this.homePageNewRelease();
        this.homePageBornToday();
      }
    },
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    localStorage.removeItem("saveIdList");
    this.homePageTopNews();
    this.homePageTrending();
    this.homePageHotVideos();
    this.homePageComingSoon();
    this.homePageLatestTrailer();
    this.homePageRealTimeFeeds();
    this.homePagePopularshows();
    this.homePageNewRelease();
    this.homePageBornToday();
  },
  methods: {
    //top news
    homePageTopNews() {
      this.isLoading = true;
      this.isNewsData = true;
      this.HomePageService.homePageTopNews(this.date)
        .then((res) => {
          if (res.status == 200) {
            this.isLoading = false;
            this.isNewsData = false;
            this.isTopnewsData = true;
            this.top_news = res.data.top_news;
            this.tv_shows = res.data.news_list?.tv_shows?.list
              ? res.data.news_list?.tv_shows?.list
              : [];
            this.rss_link = res.data.news_list?.tv_shows?.rss_link;
            this.movies = res.data.news_list?.movies?.list
              ? res.data.news_list?.movies?.list
              : [];
            this.movie_rss_link = res.data.news_list?.movies?.movie_rss_link;
            this.webtoon_news = res.data.news_list?.webtoons?.list
              ? res.data.news_list?.webtoons?.list
              : [];
            this.webtoon_rss_link = res.data.news_list?.webtoons?.rss_link;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          return;
        });
    },
    //trending
    homePageTrending() {
      this.isTrendingData = true;
      this.HomePageService.homePageTrending(this.date)
        .then((res) => {
          if (res.status == 200) {
            this.isTrendingData = false;
            this.movies_trending = res.data.trendings?.movies
              ? res.data.trendings?.movies
              : [];
            this.tv_shows_trending = res.data.trendings?.tv_shows
              ? res.data.trendings?.tv_shows
              : [];
            this.webtoon_trending = res.data.trendings?.webtoons
              ? res.data.trendings?.webtoons
              : [];
          }
        })
        .catch((err) => {
          return;
        });
    },
    // hot- videos
    homePageHotVideos() {
      this.isHotData = true;
      this.HomePageService.homePageHotVideos(this.date)
        .then((res) => {
          if (res.status == 200) {
            this.isHotData = false;
            this.hot_videos = res.data.hot_videos;
            Array.from(this.hot_videos).forEach((item, i) => {
              this.hot_videos[i]["videoid"] =
                this.validateVimeoURL(item.video_path) ||
                this.matchYoutubeUrl(item.video_path);
              this.hot_videos[i]["link"] = item.video_path;
              if (this.validateVimeoURL(item.video_path)) {
                this.hot_videos[i]["type"] = "vimeo";
              } else {
                this.hot_videos[i]["type"] = "youtube";
              }
            });
          }
        })
        .catch((err) => {
          return;
        });
    },

    //coming soon
    homePageComingSoon() {
      this.isComingSoonData = true;
      this.HomePageService.homePageComingSoon(this.date)
        .then((res) => {
          if (res.status == 200) {
            this.isComingSoonData = false;
            this.movies_coming_soon = res.data.coming_soon?.movie
              ? res.data.coming_soon?.movie
              : [];
            this.tv_show_coming_soon = res.data.coming_soon?.tv_shows
              ? res.data.coming_soon?.tv_shows
              : [];
            this.webtoon_coming_soon = res.data.coming_soon?.webtoons
              ? res.data.coming_soon?.webtoons
              : [];
          }
        })
        .catch((err) => {
          return;
        });
    },

    //latest trailer
    homePageLatestTrailer() {
      this.isTrailerData = true;
      this.HomePageService.homePageLatestTrailer(this.date)
        .then((res) => {
          if (res.status == 200) {
            this.isTrailerData = false;
            this.latest_trailers = res.data.latest_trailers;
            Array.from(this.latest_trailers).forEach((item, i) => {
              this.latest_trailers[i]["videoid"] =
                this.validateVimeoURL(item.video_path) ||
                this.matchYoutubeUrl(item.video_path);
              this.latest_trailers[i]["link"] = item.video_path;
              if (this.validateVimeoURL(item.video_path)) {
                this.latest_trailers[i]["type"] = "vimeo";
              } else {
                this.latest_trailers[i]["type"] = "youtube";
              }

            });
          }
        })
        .catch((err) => {
          return;
        });
    },

    // real time feeds
    homePageRealTimeFeeds() {
      this.HomePageService.homePageRealTimeFeeds(this.date)
        .then((res) => {
          if (res.status == 200) {
            this.real_time_feeds = res.data.real_time_feeds;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // popular shows
    homePagePopularshows() {
      this.isPopularData = true;
      this.HomePageService.homePagePopularshows(this.date)
        .then((res) => {
          if (res.status == 200) {
            this.isPopularData = false;
            this.movies_popular = res.data.popular_shows?.movie
              ? res.data.popular_shows?.movie
              : [];
            this.tv_show_popular = res.data.popular_shows?.tv_shows
              ? res.data.popular_shows?.tv_shows
              : [];
            this.webtoon_popular = res.data.popular_shows?.webtoons
              ? res.data.popular_shows?.webtoons
              : [];
          }
        })
        .catch((err) => {
          return;
        });
    },

    // new release
    homePageNewRelease() {
      this.isNewReleaseData = true;
      this.HomePageService.homePageNewRelease(this.date)
        .then((res) => {
          if (res.status == 200) {
            this.isNewReleaseData = false;
            this.movie_new_release = res.data.new_release.movie;
            this.tv_show_new_release = res.data.new_release.tv_shows;
            this.webtoon_new_realease = res.data.new_release.webtoons;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // born today 
    homePageBornToday() {
      this.isBornData = true;
      this.HomePageService.homePageBornToday(this.date)
        .then((res) => {
          if (res.status == 200) {
            this.isBornData = false;
            this.today_date = res.data.born_today.today_date;
            this.people_lists = res.data.born_today?.people_lists
              ? res.data.born_today?.people_lists
              : [];

          }
        })
        .catch((err) => {
          return;
        });
    },
    validateVimeoURL,
    matchYoutubeUrl,
    dateformat
  },
};
</script>
