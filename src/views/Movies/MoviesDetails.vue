<template>
  <div>
    <div v-if="isError == false && title">
      <div class="people-details-sec movies-details-sec details__media"
        :style="{ backgroundImage: 'url(' + background_image + ')' }">
        <div class="container">
          <div class="people-dtl-otr">
            <div class="people-dtl-left">
              <figure>
                <img v-if="poster_image" :src="poster_image" :alt="poster_image" />
                <img v-else src="@/assets/images/no-image-view.png" />
              </figure>
            </div>
            <div class="people-dtl-right">
              <div class="edit-otr">
                <h2 class="big-hdr" :title="title">{{ title }}</h2>
                <div class="edit-innr">
                  <a v-if="common.state.is_admin == 'y' && isEdit == 'y'" @click="toEditMovie" class="btn solid">{{
                    $t("general.editButton")
                  }}</a>
                  <a @click="isFavourite = true" class="sc-icon">
                    <template v-if="is_like == 'y'">
                      <img src="@/assets/icons/wishlist-solid.svg" />
                    </template>
                    <template v-else>
                      <img src="@/assets/icons/wishlist.svg" alt="" class="dark-th" />
                      <img src="@/assets/icons/blk-icon1.svg" alt="" class="light-th" />
                    </template>
                  </a>
                  <a @click="isRating = true" class="sc-icon">
                    <img src="@/assets/icons/star-outline.svg" class="dark-th" alt="" />
                    <img src="@/assets/icons/blk-icon2.svg" class="light-th" alt="" />
                  </a>
                  <a @click="isShare = true;" class="sc-icon">
                    <img src="@/assets/icons/settings.svg" alt="" class="dark-th" />
                    <img src="@/assets/icons/blk-icon3.svg" alt="" class="light-th" />
                  </a>
                </div>
              </div>
              <ul class="people-date-list">
                <li v-if="certification" class="gray-bg">{{ certification }}</li>
                <li>{{ $t("searchResults.searchRight.movieDetails.movie") }}</li>
                <li v-if="genre">{{ genre }}</li>
                <li v-if="year">{{ year }}</li>
                <li v-if="runtime">{{ convertMinToHour(runtime) }}</li>
                <li>
                  {{ $t("searchResults.searchRight.movieDetails.footfalls") }} :
                  {{ footfalls ? footfalls.toLocaleString("en-US") : 0 }}
                </li>
                <li>
                  {{ $t("searchResults.searchRight.movieDetails.likes") }} :
                  {{ no_of_likes ? no_of_likes.toLocaleString("en-US") : 0 }}
                </li>
              </ul>
              <div class="startxt">
                <div class="md-star">
                  <template v-if="rating > 0.0">
                    <!-- integer -->
                    <template v-if="convertFloat(rating / 2) == false">
                      <template v-for="i in 5" :key="i">
                        <img v-if="rating >= i * 2" src="@/assets/icons/star.svg" alt="star" />
                        <img v-else src="@/assets/icons/outline-star.svg" alt="star" />
                      </template>
                    </template>
                    <!-- integer -->
                    <!-- float -->
                    <template v-else>
                      <img v-for="i in parseInt(rating / 2)" :key="i" src="@/assets/icons/star.svg" alt="star" />
                      <img src="@/assets/icons/half-star.svg" alt="star" />
                      <img src="@/assets/icons/outline-star.svg" alt="star" v-for="i in 4 - parseInt(rating / 2)"
                        :key="i" />
                    </template>
                    <!-- float -->
                  </template>
                  <template v-else>
                    <img src="@/assets/icons/outline-star.svg" alt="star" v-for="i in 5" :key="i" />
                  </template>
                </div>
                <span>{{ rating ? rating : "0.0" }}</span>
              </div>
              <h5>{{ $t("searchResults.searchRight.movieDetails.summary") }}</h5>
              <p class="details-para" v-show="!readMore">
                {{
                  details
                  ? details.length > 230
                    ? details.substring(0, 230) + "..."
                    : details.substring(0, 230)
                  : "-"
                }}

                <span @click="readMore = !readMore">
                  <span v-if="readMore">{{ $t("display.Hide") }}</span>
                  <span v-if="!readMore && details.length > 230">{{ $t("display.ReadMore") }}</span>
                </span>
              </p>
              <p class="details-para" v-show="readMore">
                {{ details ? details : "-" }}
                <span @click="readMore = !readMore">
                  <span v-if="readMore && details.length > 230">{{ $t("display.Hide") }}</span>
                  <span v-if="!readMore && details.length > 230">{{ $t("display.ReadMore") }}</span>
                </span>
              </p>

              <ul class="movie-detail-list">
                <li>
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.director")
                  }}</span>
                  <p v-if="director_name.length > 0">
                    <a v-for="(item, index) in director_name" :key="index"
                      @click="$router.push(`/people/details/${item.id}`)">{{
                        item.name }}
                      <p class="inline" v-if="index != director_name.length - 1">,</p>
                    </a>
                  </p>
                  <p v-else>-</p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.writers")
                  }}</span>
                  <p v-if="writer_name.length > 0">
                    <a v-for="(item, index) in writer_name" :key="index"
                      @click="$router.push(`/people/details/${item.id}`)">{{
                        item.name }}
                      <p class="inline" v-if="index != writer_name.length - 1">,</p>
                    </a>
                  </p>
                  <p v-else>-</p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.cast")
                  }}</span>
                  <p class="details-para" v-if="cast.length > 0">
                    <a
                      v-for="(item, index) in readMoreCast?cast:cast.slice(0,16)"
                      :key="index"
                      @click="$router.push(`/people/details/${item.id}`)"
                      >{{ item.name }}
                      <p class="inline" v-if="index != (readMoreCast?cast:cast.slice(0,16)).length - 1">,</p>
                      
                    </a>
                    <p class="inline" @click="readMoreCast = !readMoreCast">
                        <span v-if="readMoreCast && cast.length > 16">{{
                          $t("display.Hide")
                        }}</span>
                        <span v-if="!readMoreCast && cast.length > 16">... {{
                          $t("display.ReadMore")
                        }}</span>
                      </p>
                  </p>
                  <p v-else>-</p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.originalBy")
                  }}</span>
                  <p>{{ original_by }}</p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.officialSite")
                  }}</span>
                  <p v-if="official_site != '-'">
                    <a :href="official_site" target="_blank">{{
                      official_site
                    }}</a>
                  </p>
                  <p v-else>{{ official_site }}</p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.countryLanguage")
                  }}</span>
                  <p>{{ country }}/{{ language }}</p>
                </li>
              </ul>

              <div class="awd-list-outr" v-if="award.winners || award.nominees">
                <ul class="award-list">
                  <li>
                    <span><img src="@/assets/icons/award.svg" alt="" /></span>
                    <em>{{ $t("addNewPeople.award") }}</em>
                  </li>
                  <li>
                    <ul>
                      <li v-if="award.winners"> {{ award.winners }} {{ $t("searchResults.searchRight.movieDetails.wins")
                      }}</li>
                      <li v-if="award.nominees"> {{ award.nominees }} {{
                        $t("searchResults.searchRight.movieDetails.nominations") }} </li>
                    </ul>
                  </li>
                </ul>
                <a href="javascript:void(0)" @click="$router.push(`/movies/awards/${$route.params.id}`)">
                  <img src="@/assets/icons/arrow-right-wh.svg" class="dark-th" alt="" />
                  <img src="@/assets/icons/arrow-right-blk.svg" class="light-th" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="people-details-btm-sec movies-details-btm-sec">
        <div class="container">
          <div class="people-details-btm-otr">
            <div class="people-details-btm-left">
              <h2 class="mb-10 small-hdr">
                {{ $t("searchResults.searchRight.movieDetails.details") }}
              </h2>
              <ul class="detail-lst">
                <li>
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.releaseDate")
                  }}</span>
                  <p>{{ release_date ? dateformat(release_date) : "-" }}</p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.plot")
                  }}</span>
                  <p class="details-para" v-show="!readMorePlot">
                    {{
                      plot
                      ? plot?.length > 230
                        ? plot.substring(0, 230) + "..."
                        : plot.substring(0, 230)
                      : "-"
                    }}
                    <span @click="readMorePlot = !readMorePlot">
                      <span class="more-text" v-if="readMorePlot">{{ $t("display.Hide") }}</span>
                      <span class="more-text" v-if="!readMorePlot && plot.length > 230">{{ $t("display.ReadMore")
                      }}</span>
                    </span>
                  </p>
                  <p class="details-para" v-show="readMorePlot">
                    {{ plot ? plot : "-" }}
                    <span @click="readMorePlot = !readMorePlot">
                      <span class="more-text" v-if="readMorePlot && plot.length > 230">{{ $t("display.Hide") }}</span>
                      <span class="more-text" v-if="!readMorePlot && plot.length > 230">{{ $t("display.ReadMore")
                      }}</span>
                    </span>
                  </p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.alsoKnownAs")
                  }}
                  </span>
                  <p>{{ known_as }}</p>
                </li>
              </ul>
              <div class="work-otr mr-bb2 movie-cast">
                <h2 class="mb-10 small-hdr">
                  {{ $t("searchResults.searchRight.movieDetails.cast&Crew") }}
                </h2>
                <CastCrewSection :people_list="people_list" @navigation="navigate('MoviesDetailsCast&Crew')" />
                <h2 v-if="videos?.length > 0 || images?.length > 0 || poster?.length > 0
                  " class="mb-10 small-hdr">
                  {{ $t("searchResults.searchRight.movieDetails.media") }}
                </h2>
                <MediaSection v-if="videos?.length > 0 || images?.length > 0 || poster?.length > 0
                  " :videos="videos" :images="images" :posters="poster" @navigation="navigate('MoviesMedia')" />
                <h2 class="mb-10 small-hdr" v-if="related_articles.length">
                  {{
                    $t("searchResults.searchRight.movieDetails.relatedArticles")
                  }}
                </h2>
                <RelatedSection :related_articles="related_articles" @navigation="navigate('MoviesMedia')"
                  :related_articles_details_url="related_articles_details_url" />
                <h2 class="mb-10 small-hdr">
                  {{ $t("searchResults.searchRight.tvShowsDetails.community") }}
                </h2>
                <CommunityCard type="title" famous_line_type="people" :season_id="0" :key="resetComponent" />
              </div>
            </div>
            <div class="people-details-btm-right">
              <h2 class="mb-20 small-hdr" v-if="stream.length > 0 || rent.length > 0 || buy.length > 0">
                {{ $t("searchResults.searchRight.movieDetails.watch") }}
              </h2>
              <ul class="social-icon-list" v-if="stream.length > 0 || rent.length > 0 || buy.length > 0">
                <li v-if="stream.length > 0">
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.stream")
                  }}</span><a v-for="(item, i) in stream" :key="i" :href="item.link" target="_blank"><img
                      :src="item.icon" alt="watch" /></a>
                </li>
                <li v-if="rent.length > 0">
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.rent")
                  }}</span><a v-for="(item, i) in rent" :key="i" :href="item.link" target="_blank"><img :src="item.icon"
                      alt="watch" /></a>
                </li>
                <li v-if="buy.length > 0">
                  <span>{{
                    $t("searchResults.searchRight.movieDetails.buy")
                  }}</span><a v-for="(item, i) in buy" :key="i" :href="item.link" target="_blank"><img :src="item.icon"
                      alt="watch" /></a>
                </li>
              </ul>
              <template v-if="connection_list.length > 0">
                <h2 class="mb-20 small-hdr">
                  {{ $t("searchResults.searchRight.movieDetails.connections") }}
                </h2>
                <div class="slider-otr">
                  <Slider :connection_list="connection_list" :componentType="componentType" />
                </div>
              </template>
              <template v-if="series_list.length > 0">
                <h2 class="mb-20 small-hdr">
                  {{ $t("searchResults.searchRight.movieDetails.series") }}
                </h2>
                <div class="slider-otr">
                  <Slider :connection_list="series_list" :componentType="componentType" sliderType="series" />
                </div>
              </template>
              <!-- <GoogleAdd /> -->
              <template v-if="tag_list.length > 0">
                <TagCard :tag_list="tag_list" :selected_tag_list="selected_tag_list" @getTag="getTag" />
              </template>
              <template v-if="recommendation_list.length > 0">
                <h2 class="mb-20 small-hdr">
                  {{
                    $t("searchResults.searchRight.movieDetails.recommendations")
                  }}
                </h2>
                <div class="slider-otr">
                  <Slider :connection_list="recommendation_list" :componentType="componentType" sliderType="recommend" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- favorite modal -->
      <div class="new-cast-modal center-popup-modal">
        <PopUpModal :isModal="isFavourite">
          <template v-slot:header>
            <h1>
              {{
                $t("searchResults.searchRight.movieDetails.favoriteModal.heading")
              }}
            </h1>
          </template>
          <template v-slot:body>
            <div class="cast-details">
            </div>
          </template>
          <template v-slot:footer>
            <div class="button-group">
              <button class="black-outline-btn" @click="isFavourite = false">
                {{ $t("searchResults.searchRight.movieDetails.cancel") }}
              </button>
              <button class="red-fill-btn" @click="addToFavorite">
                {{ $t("button.ok") }}
              </button>
            </div>
          </template>
        </PopUpModal>
      </div>

      <!-- rating modal -->
      <div class="new-cast-modal center-popup-modal smallbx-modal">
        <PopUpModal :isModal="isRating">
          <template v-slot:header>
            <h1>
              {{
                $t("searchResults.searchRight.movieDetails.ratingModal.heading")
              }}
            </h1>
          </template>
          <template v-slot:body>
            <div class="movies-details-sec">
              <div class="startxt">
                <div class="md-star">
                  <template v-for="i in 5" :key="i">
                    <img v-if="selectRating >= i" src="@/assets/icons/star.svg" alt="star" @click="getSelectRating(i)" />
                    <img v-else src="@/assets/icons/outline-star.svg" alt="star" @click="getSelectRating(i)" />
                  </template>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:footer>
            <div class="button-group">
              <button class="black-outline-btn" @click="(isRating = false), getMovieDetails()">
                {{ $t("searchResults.searchRight.movieDetails.cancel") }}
              </button>
              <button class="red-fill-btn" :disabled="selectRating == 0" :class="selectRating == 0 ? 'isDisabled' : ''"
                @click="addRating">
                {{ $t("button.ok") }}
              </button>
            </div>
          </template>
        </PopUpModal>
      </div>

      <!-- share modal -->
      <div class="new-cast-modal center-popup-modal smallbx-modal">
        <PopUpModal :isModal="isShare">
          <template v-slot:header>
            <h1>
              {{
                $t("searchResults.searchRight.movieDetails.shareModal.heading")
              }}
            </h1>
          </template>
          <template v-slot:body>
            <div class="cast-details">

              <a href="#" @click="shareFacebook(baseUrl + $route.fullPath), userShare('facebook')"><img
                  src="@/assets/icons/fb.svg" alt="" /></a>
              <a class="twitter-share-button"
                @click="shareTwitter(baseUrl + $route.fullPath, title, genre), userShare('twitter')">
                <img src="@/assets/icons/twitter-icon.svg" alt="" /></a>
              <a @click="userShare('mail')"
                :href="`mailto:?subject=${title}&amp;body=${details} - ${baseUrl + $route.fullPath}`">
                <img src="@/assets/icons/mail.svg" alt="" />
              </a>

              <a :href="baseUrl + $route.fullPath"
                @click.prevent.stop="onClick(baseUrl + $route.fullPath), userShare('link')"><img
                  src="@/assets/icons/link.svg" alt="" /></a>
              <input type="text" hidden ref="myHiddenInput" />
            </div>
          </template>
          <template v-slot:footer>
            <div class="button-group">
              <button class="black-outline-btn" @click="isShare = false">
                {{ $t("searchResults.searchRight.movieDetails.cancel") }}
              </button>
            </div>
          </template>
        </PopUpModal>
      </div>
    </div>

    <div v-if="isError">
      <PageNotfound />
    </div>
  </div>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import Slider from "@/components/Slider.vue";
import GoogleAdd from "@/components/GoogleAdd.vue";
import TagCard from "@/components/TagCard.vue";
import CommunityCard from "@/components/CommunityCard.vue";
import ImageTextCard from "@/components/ImageTextCard.vue";
import MediaSection from "@/components/Details/MediaSection.vue";
import CastCrewSection from "@/components/Details/CastCrewSection.vue";
import RelatedSection from "@/components/Details/RelatedSection.vue";
import MoviesDetailsService from "@/services/MoviesDetailsService.js";
import { dateformat, youtube_parser } from "@/mixins/CommonFunctions.js";
import { shareFacebook, shareTwitter } from "@/mixins/CountryFunctions.js";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import Toast from "@/alert/alert.js";
import PageNotfound from "@/components/PageNotfound.vue";
import {
  validateVimeoURL,
  matchYoutubeUrl,
  convertMinToHour,
  convertFloat,
} from "@/mixins/CommonValidation.js";
export default {
  name: "MoviesDetails",
  emits: ["on-current-theme-change"],
  inject: ["common"],
  components: {
    Tabs,
    TabWrapper,
    Slider,
    GoogleAdd,
    TagCard,
    CommunityCard,
    ImageTextCard,
    MediaSection,
    CastCrewSection,
    RelatedSection,
    PopUpModal,
    PageNotfound
  },
  data() {
    return {
      componentType: "movie",
      title: "",
      footfalls: "",
      year: "",
      no_of_likes: "",
      details: "",
      rating: "",
      genre: "",
      director_name: [],
      writer_name: [],
      cast: [],
      original_by: "",
      official_site: "",
      country: "",
      language: "",
      award: "",
      no_of_win: "",
      no_of_nomination: "",
      release_date: "",
      known_as: "",
      plot: "",
      people_list: [],
      videos: [],
      poster_image: "",
      background_image: "",
      certification: "",
      runtime: "",
      images: [],
      poster: [],
      stream: [],
      rent: [],
      buy: [],
      connection_list: [],
      series_list: [],
      recommendation_list: [],
      tag_list: [],
      tag_cat_id: "",
      selected_tag_list: [],
      related_articles: [],
      isFavourite: false,
      isRating: false,
      selectRating: 0,
      isShare: false,
      baseUrl: import.meta.env.VITE_SITE_BASE_URL,
      is_like: "",
      related_articles_details_url: "",
      readMore: false,
      readMorePlot: false,
      readMoreCast: false,
      isError: false,
      resetComponent: 0,
      isEdit: ''
    };
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.getMovieDetails();
        this.getMovieConnectionList();
        this.getMovieSeriesList();
        this.getMovieRecommendationList();
        this.getMovieTagList();
        this.convertFloat();
        this.resetComponent++;
      }
    },
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    this.getMovieDetails();
    this.getMovieConnectionList();
    this.getMovieSeriesList();
    this.getMovieRecommendationList();
    this.getMovieTagList();
    this.convertFloat();
    this.userLog();
  },

  methods: {
    navigate(component_name) {
      this.$router.push({
        name: component_name,
        params: { id: this.$route.params.id },
      });
    },

    // get movies details
    getMovieDetails() {
      MoviesDetailsService.getMovieDetails(this.$route.params.id)
        .then((res) => {
          if (res.status == 200) {
            this.isError = false;
            this.title = res.data.title;
            window.document.title = `${res.data.title} - 11DB`;
            this.isEdit = res.data.is_edit;
            this.poster_image = res.data.poster_image;
            this.background_image = res.data.background_image
              ? res.data.background_image
              : res.data.poster_image
                ? res.data.poster_image
                : "";
            this.certification = res.data.certification;
            this.runtime = res.data.runtime;
            this.footfalls = res.data.footfalls;
            this.year = res.data.year;
            this.no_of_likes = res.data.no_of_likes;
            this.details = res.data.details;
            this.rating = res.data.rating;
            this.genre = res.data.genre;
            this.is_like = res.data.is_like;
            this.selectRating = res.data.user_rating / 2;
            this.director_name = res.data.director_name
              ? res.data.director_name
              : [];
            this.writer_name = res.data.writer_name
              ? res.data.writer_name
              : [];
            this.cast = res.data.cast ? res.data.cast : [];
            this.original_by = res.data.original_by
              ? res.data.original_by
              : "-";
            this.official_site = res.data.official_site
              ? res.data.official_site
              : "-";
            this.country = res.data.country;
            this.language = res.data.language ? res.data.language : "-";
            this.award = res.data.award ? res.data.award : "";
            this.no_of_win = res.data.no_of_win ? res.data.no_of_win : "0";
            this.no_of_nomination = res.data.no_of_nomination
              ? res.data.no_of_nomination
              : "0";
            this.release_date = res.data.detail.release_date;
            this.plot = res.data.detail.plot ? res.data.detail.plot : "-";
            this.known_as = res.data.detail.known_as
              ? res.data.detail.known_as
              : "-";
            this.people_list = res.data.people_list;
            this.videos = res.data.media.videos;
            Array.from(res.data.media.videos).forEach((item, i) => {
              this.videos[i]["videoid"] =
                this.validateVimeoURL(item.link) ||
                this.matchYoutubeUrl(item.link);
              if (this.validateVimeoURL(item.link)) {
                this.videos[i]["type"] = "vimeo";
              } else {
                this.videos[i]["type"] = "youtube";
              }
              // this.videos[i]["thumbnail"] = this.youtube_parser(this.videos[i]);
            });
            this.images = res.data.media.images;
            this.poster = res.data.media.poster_images;
            this.stream = res.data.watch.stream;
            this.rent = res.data.watch.rent;
            this.buy = res.data.watch.buy;
            this.related_articles = res.data.related_articles;
            this.related_articles_details_url =
              res.data.related_articles_details_url;
          } else {
            this.isError = true;
          }
        })
        .catch((err) => {
          console.log(err)
          return;
        });
    },

    // to edit movie
    toEditMovie() {
      this.$router.push({
        name: "AddNewMovieForm",
        params: { external_id: this.$route.params.id, type: "internal" },
      });
      localStorage.setItem(
        "movieBackPage",
        "/movies/details/" + this.$route.params.id
      );
    },

    // get movie connection list
    getMovieConnectionList() {
      MoviesDetailsService.getMovieConnectionList(this.$route.params.id)
        .then((res) => {
          if (res.status == 200) {
            this.connection_list = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // get movie series list
    getMovieSeriesList() {
      MoviesDetailsService.getMovieSeriesList(this.$route.params.id)
        .then((res) => {
          if (res.status == 200) {
            this.series_list = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // get movie recommendation list
    getMovieRecommendationList() {
      MoviesDetailsService.getMovieRecommendationList(this.$route.params.id)
        .then((res) => {
          if (res.status == 200) {
            this.recommendation_list = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },
    // get movie tag category list
    getMovieTagList() {
      MoviesDetailsService.getMovieTagList(this.$route.params.id)
        .then((res) => {
          if (res.status == 200) {
            this.tag_list = res.data.results;
            this.tag_cat_id = res.data.results[0].id;
            this.getMovieTagListByCategory();
          }
        })
        .catch((err) => {
          return;
        });
    },
    // get movie tag list
    getMovieTagListByCategory() {
      MoviesDetailsService.getMovieTagListByCategory(
        this.$route.params.id,
        this.tag_cat_id
      )
        .then((res) => {
          if (res.status == 200) {
            this.selected_tag_list = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // after dropdown selected get tag
    getTag(val) {
      this.tag_cat_id = val;
      this.getMovieTagListByCategory();
    },

    // add favorite
    addToFavorite() {
      MoviesDetailsService.addToFavorite(this.$route.params.id, "title")
        .then((res) => {
          if (res.status == 200) {
            this.isFavourite = false;
            this.getMovieDetails();
          }
        })
        .catch((err) => {
          return;
        });
    },
    // add to share
    userShare(shared_channel) {
      MoviesDetailsService.addToShare(this.$route.params.id, "title", shared_channel)
        .then((res) => { })
        .catch((err) => {
          return;
        });
    },
    getSelectRating(i) {
      this.selectRating = i;
    },

    // add rating
    addRating() {
      MoviesDetailsService.addRating(
        this.$route.params.id,
        "title",
        this.selectRating * 2
      )
        .then((res) => {
          if (res.status == 200) {
            this.isRating = false;
            this.selectRating = 0;
            this.getMovieDetails();
          }
        })
        .catch((err) => {
          return;
        });
    },

    // copy link on share modal
    onClick(url) {
      const input = this.$refs["myHiddenInput"];
      input.value = url;
      input.style.display = "block";
      input.select();
      document.execCommand("copy");
      input.style.display = "none";
      Toast.fire({ title: this.$t("addNewPeople.primaryDetails.linkCopied") });
    },

    // user log API
    userLog() {
      MoviesDetailsService.userLog(
        this.$route.params.id,
        "title",
        this.$cookies.get("userCookie")
      )
        .then((res) => {
          if (res.status == 200) {
          }
        })
        .catch((err) => {
          return;
        });
    },

    validateVimeoURL,
    matchYoutubeUrl,
    convertMinToHour,
    convertFloat,
    dateformat,
    youtube_parser,
    shareFacebook,
    shareTwitter
  },
};
</script>
<style scoped>
.inline {
  display: inline-block;
}
</style>
