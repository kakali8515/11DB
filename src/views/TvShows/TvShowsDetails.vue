<template>
  <div>
    <div v-if="isError == false && tvshowDetails.id">
      <div class="people-details-sec tvshows-details-sec" :style="{
        backgroundImage: 'url(' + background_image + ')',
      }">
        <div class="container">
          <div class="people-dtl-otr">
            <div class="people-dtl-left">
              <figure>
                <img v-if="tvshowDetails.poster_image?.includes('https')" :src="tvshowDetails.poster_image"
                  :alt="tvshowDetails.poster_image" />
                <img v-else src="@/assets/images/no-image-view.png" />
              </figure>
            </div>
            <div class="people-dtl-right">
              <div class="edit-otr">
                <h2 class="big-hdr" :title="tvshowDetails.title">{{ tvshowDetails.title }}</h2>
                <div class="edit-innr">
                  <a @click="toEditTvShow" class="btn solid"
                    v-if="common.state.is_admin == 'y' && tvshowDetails.is_edit == 'y'">{{
                      $t("general.editButton")
                    }}</a>
                  <a @click="isFavourite = true" class="sc-icon">
                    <template v-if="tvshowDetails.is_like == 'y'">
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
                    <img src="@/assets/icons/settings.svg" class="dark-th" alt="" />
                    <img src="@/assets/icons/blk-icon3.svg" class="light-th" alt="" />
                  </a>
                </div>
              </div>
              <ul class="people-date-list">
                <li v-if="tvshowDetails.certification" class="gray-bg">
                  {{ tvshowDetails.certification }}
                </li>
                <li>
                  {{ $t("searchResults.searchRight.tvShowsDetails.tvShow") }}
                </li>
                <li v-if="tvshowDetails.genre">{{ tvshowDetails.genre }}</li>
                <li v-if="tvshowDetails.year">{{ tvshowDetails.year }}</li>
                <li v-if="tvshowDetails.runtime">
                  {{ convertMinToHour(tvshowDetails.runtime) }}
                </li>
                <li>
                  {{ $t("searchResults.searchRight.tvShowsDetails.likes") }}
                  {{
                    tvshowDetails.no_of_likes
                    ? tvshowDetails.no_of_likes.toLocaleString("en-US")
                    : 0
                  }}
                </li>
              </ul>
              <div class="startxt">
                <div class="md-star">
                  <template v-if="tvshowDetails.rating > 0.0">
                    <!-- integer -->
                    <template v-if="convertFloat(tvshowDetails.rating / 2) == false">
                      <template v-for="i in 5" :key="i">
                        <img v-if="tvshowDetails.rating >= i * 2" src="@/assets/icons/star.svg" alt="star" />
                        <img v-else src="@/assets/icons/outline-star.svg" alt="star" />
                      </template>
                    </template>
                    <!-- integer -->
                    <!-- float -->
                    <template v-else>
                      <img v-for="i in parseInt(tvshowDetails.rating / 2)" :key="i" src="@/assets/icons/star.svg"
                        alt="star" />
                      <img src="@/assets/icons/half-star.svg" alt="star" />
                      <img src="@/assets/icons/outline-star.svg" alt="star"
                        v-for="i in 4 - parseInt(tvshowDetails.rating / 2)" :key="i" />
                    </template>
                    <!-- float -->
                  </template>
                  <template v-else>
                    <img src="@/assets/icons/outline-star.svg" alt="star" v-for="i in 5" :key="i" />
                  </template>
                </div>
                <span>{{
                  tvshowDetails.rating ? tvshowDetails.rating : "0.0"
                }}</span>
              </div>
              <h5>
                {{ $t("searchResults.searchRight.tvShowsDetails.summary") }}
              </h5>
              <p class="details-para" v-show="!readMore">
                {{
                  tvshowDetails.details
                  ? tvshowDetails.details?.length > 230
                    ? tvshowDetails.details.substring(0, 230) + "..."
                    : tvshowDetails.details.substring(0, 230)
                  : "-"
                }}

                <span @click="readMore = !readMore">
                  <span v-if="readMore">{{ $t("display.Hide") }}</span>
                  <span v-if="!readMore && tvshowDetails.details?.length > 230">{{ $t("display.ReadMore") }}</span>
                </span>
              </p>
              <p class="details-para" v-show="readMore">
                {{ tvshowDetails.details ? tvshowDetails.details : "-" }}
                <span @click="readMore = !readMore">
                  <span v-if="readMore && tvshowDetails.details?.length > 230">{{ $t("display.Hide") }}</span>
                  <span v-if="!readMore && tvshowDetails.details?.length > 230">{{ $t("display.ReadMore") }}</span>
                </span>
              </p>
              <ul class="movie-detail-list">
                <li>
                  <span>{{
                    $t("searchResults.searchRight.tvShowsDetails.director")
                  }}</span>
                  <p v-if="tvshowDetails.director_name?.length > 0">
                    <a v-for="(item, index) in tvshowDetails.director_name" :key="index"
                      @click="$router.push(`/people/details/${item.id}`)">{{
                        item.name }}
                      <p class="inline" v-if="index != tvshowDetails.director_name?.length - 1">,</p>
                    </a>
                  </p>
                  <p v-else>-</p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.tvShowsDetails.writers")
                  }}</span>
                  <p v-if="tvshowDetails.writer_name?.length > 0">
                    <a v-for="(item, index) in tvshowDetails.writer_name" :key="index"
                      @click="$router.push(`/people/details/${item.id}`)">{{
                        item.name }}
                      <p class="inline" v-if="index != tvshowDetails.writer_name?.length - 1">,</p>
                    </a>
                  </p>
                  <p v-else>-</p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.tvShowsDetails.cast")
                  }}</span>
                  <p class="details-para" v-if="tvshowDetails.cast?.length > 0">
                    <a :key="index"
                      v-for="(item, index) in readMoreCast ? tvshowDetails.cast : tvshowDetails.cast.slice(0, 16)"
                      @click="$router.push(`/people/details/${item.id}`)">{{ item.name }}
                      <p class="inline"
                        v-if="index != (readMoreCast ? tvshowDetails.cast : tvshowDetails.cast.slice(0, 16)).length - 1">,</p>
                    </a>
                  <p class="inline" @click="readMoreCast = !readMoreCast">
                    <span v-if="readMoreCast && tvshowDetails.cast.length > 16">{{
                      $t("display.Hide")
                    }}</span>
                    <span v-if="!readMoreCast && tvshowDetails.cast.length > 16">... {{
                      $t("display.ReadMore")
                    }}</span>
                  </p>
                  </p>
                  <p v-else>-</p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.tvShowsDetails.originalBy")
                  }}</span>
                  <p>
                    {{
                      tvshowDetails.original_by ? tvshowDetails.original_by : "-"
                    }}
                  </p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.tvShowsDetails.officialSite")
                  }}</span>
                  <p v-if="tvshowDetails.official_site">
                    <a :href="tvshowDetails.official_site" target="_blank">{{
                      tvshowDetails.official_site
                      ? tvshowDetails.official_site
                      : "-"
                    }}</a>
                  </p>
                  <p v-else>-</p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.tvShowsDetails.countryLanguage")
                  }}</span>
                  <p>
                    {{ tvshowDetails.country ? tvshowDetails.country : "-" }} /
                    {{ tvshowDetails.language ? tvshowDetails.language : "-" }}
                  </p>
                </li>
                <li>
                  <span>{{
                    $t("searchResults.searchRight.tvShowsDetails.channel")
                  }}</span>
                  <div class="channel-list" v-if="tvshowDetails.channel_list?.length > 0">
                    <a v-for="channelList in tvshowDetails.channel_list" :key="channelList.icon"><img
                        :src="channelList.icon" :alt="channelList.icon" /></a>
                  </div>
                  <p v-else>-</p>
                </li>
                <li v-if="tvshowDetails.award.winners || tvshowDetails.award.nominees">
                  <div class="awd-list-outr">
                    <ul class="award-list">
                      <li>
                        <span class="mb-0"><img src="@/assets/icons/award.svg" alt="" /></span>
                        <em>{{ $t("searchResults.searchRight.tvShowsDetails.award") }}</em>
                      </li>
                      <li>
                        <ul>
                          <li v-if="tvshowDetails.award.winners"> {{ tvshowDetails.award.winners }} {{
                            $t("searchResults.searchRight.movieDetails.wins") }}
                          </li>
                          <li v-if="tvshowDetails.award.nominees"> {{ tvshowDetails.award.nominees }} {{
                            $t("searchResults.searchRight.movieDetails.nominations") }} </li>
                        </ul>
                      </li>
                    </ul>
                    <a href="javascript:void(0)" @click="$router.push(`/tvshows/awards/${$route.params.id}`)">
                      <img src="@/assets/icons/arrow-right-wh.svg" class="dark-th" alt="" />
                      <img src="@/assets/icons/arrow-right-blk.svg" class="light-th" alt="" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="people-details-btm-sec tvshows-details-btm-sec movies-details-btm-sec details__media">
        <div class="container">
          <div class="tab-outr small" v-if="tvshowDetails.season_name_list?.length > 0">
            <DynamicTabWrapper @getResponseTitle="onChangeTab" :seasonId="selectedSeason">
              <DynamicTab v-for="tabName in tvshowDetails.season_name_list" :key="tabName.id"
                :title="tabName.season_number" :seasonId="tabName.id">
                <div class="people-details-btm-otr">
                  <div class="people-details-btm-left">
                    <h2 class="small-hdr">
                      {{ $t("searchResults.searchRight.tvShowsDetails.details") }}
                    </h2>
                    <figure class="detailfigure">
                      <img v-if="seasonDetails.season_poster?.includes('https')" :src="seasonDetails.season_poster"
                        :alt="seasonDetails.season_poster" />
                      <img v-else src="@/assets/images/no-image-view.png" alt="" />
                    </figure>
                    <ul class="detail-lst">
                      <li>
                        <span>{{
                          $t(
                            "searchResults.searchRight.tvShowsDetails.seasonName"
                          )
                        }}</span>
                        <p>{{ seasonDetails.season_name }}</p>
                      </li>
                      <li>
                        <span>{{
                          $t(
                            "searchResults.searchRight.tvShowsDetails.releaseDate"
                          )
                        }}</span>
                        <p>
                          {{
                            seasonDetails.release_date
                            ? dateformat(seasonDetails.release_date)
                            : "-"
                          }}
                        </p>
                      </li>
                      <li>
                        <span>{{
                          $t("searchResults.searchRight.tvShowsDetails.episodes")
                        }}</span>
                        <p>
                          {{
                            seasonDetails.episode_number
                            ? seasonDetails.episode_number
                            : "-"
                          }}
                        </p>
                      </li>
                      <li>
                        <span>{{
                          $t("searchResults.searchRight.tvShowsDetails.plot")
                        }}</span>

                        <p class="details-para" v-show="!readMorePlot">
                          {{
                            seasonDetails.plot
                            ? seasonDetails.plot?.length > 230
                              ? seasonDetails.plot.substring(0, 230) + "..."
                              : seasonDetails.plot.substring(0, 230)
                            : "-"
                          }}
                          <span @click="readMorePlot = !readMorePlot">
                            <span class="more-text" v-if="readMorePlot">{{ $t("display.Hide") }}</span>
                            <span class="more-text" v-if="!readMorePlot && seasonDetails.plot?.length > 230
                              ">{{ $t("display.ReadMore") }}</span>
                          </span>
                        </p>
                        <p class="details-para" v-show="readMorePlot">
                          {{
                            seasonDetails.plot ? seasonDetails.plot + "ss" : "-"
                          }}
                          <span @click="readMorePlot = !readMorePlot">
                            <span class="more-text" v-if="readMorePlot && seasonDetails.plot?.length > 230
                              ">{{ $t("display.Hide") }}</span>
                            <span class="more-text" v-if="!readMorePlot && seasonDetails.plot?.length > 230
                              ">{{ $t("display.ReadMore") }}</span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <span>{{
                          $t(
                            "searchResults.searchRight.tvShowsDetails.alsoKnownAs"
                          )
                        }}</span>
                        <p>{{ seasonDetails.aka ? seasonDetails.aka : "-" }}</p>
                      </li>
                    </ul>

                    <div class="work-otr mr-bb2">
                      <h2 class="small-hdr">
                        {{
                          $t("searchResults.searchRight.tvShowsDetails.episodes")
                        }}
                      </h2>
                      <EpisodeSection :episode_list="episode_list" @episodeid="getEpisodeId" @navigation="
                        navigationToDetails('TvShowsDetailsEpisodes')
                        " />
                      <h2 class="small-hdr">
                        {{
                          $t("searchResults.searchRight.tvShowsDetails.cast&Crew")
                        }}
                      </h2>
                      <CastCrewSection :people_list="people_list" @navigation="
                        navigationToDetails('TvShowsDetailsCast&Crew')
                        " />
                      <h2 class="small-hdr" v-if="videos?.length > 0 ||
                        images?.length > 0 ||
                        poster?.length > 0
                        ">
                        {{ $t("searchResults.searchRight.tvShowsDetails.media") }}
                      </h2>
                      <MediaSection :videos="videos" :images="images" :posters="poster"
                        @navigation="navigationToDetails('TvShowMedia')" v-if="videos?.length > 0 ||
                          images?.length > 0 ||
                          poster?.length > 0
                          " />
                      <h2 class="small-hdr" v-if="related_articles.length">
                        {{
                          $t(
                            "searchResults.searchRight.tvShowsDetails.relatedArticles"
                          )
                        }}
                      </h2>
                      <RelatedSection :related_articles="related_articles"
                        @navigation="navigationToDetails('TvShowMedia')" :related_articles_details_url="related_articles_details_url
                          " />
                      <h2 class="small-hdr">
                        {{
                          $t("searchResults.searchRight.tvShowsDetails.community")
                        }}
                      </h2>
                      <CommunityCard v-if="seasonDetails" type="title" famous_line_type="people"
                        :season_id="currentSeosonId" :key="resetComponent" />
                    </div>
                  </div>
                  <div class="people-details-btm-right">
                    <h2 class="small-hdr" v-if="seasonDetails.watch?.stream.length > 0 ||
                      seasonDetails.watch?.rent.length > 0 ||
                      seasonDetails.watch?.buy.length > 0
                      ">
                      {{ $t("searchResults.searchRight.tvShowsDetails.watch") }}
                    </h2>
                    <ul class="social-icon-list" v-if="seasonDetails.watch?.stream.length > 0 ||
                      seasonDetails.watch?.rent.length > 0 ||
                      seasonDetails.watch?.buy.length > 0
                      ">
                      <li v-if="seasonDetails.watch?.stream.length > 0">
                        <span>{{
                          $t("searchResults.searchRight.tvShowsDetails.stream")
                        }}</span>
                        <a v-for="stream in seasonDetails.watch?.stream" :href="stream.link" :key="stream.link"
                          target="_blank"><img :src="stream.icon" alt="watch" /></a>
                      </li>
                      <li v-if="seasonDetails.watch?.rent.length > 0">
                        <span>{{
                          $t("searchResults.searchRight.tvShowsDetails.rent")
                        }}</span><a v-for="rent in seasonDetails.watch?.rent" :href="rent.link" :key="rent.link"
                          target="_blank"><img :src="rent.icon" alt="watch" /></a>
                      </li>
                      <li v-if="seasonDetails.watch?.buy.length > 0">
                        <span>{{
                          $t("searchResults.searchRight.tvShowsDetails.buy")
                        }}</span><a v-for="buy in seasonDetails.watch?.buy" :href="buy.link" :key="buy.lnk"
                          target="_blank"><img :src="buy.icon" alt="watch" /></a>
                      </li>
                    </ul>
                    <template v-if="connection_list.length > 0">
                      <h2 class="small-hdr">
                        {{
                          $t(
                            "searchResults.searchRight.tvShowsDetails.connections"
                          )
                        }}
                      </h2>
                      <div class="slider-otr">
                        <slider :connection_list="connection_list" :componentType="componentType" />
                      </div>
                    </template>
                    <!-- <GoogleAdd /> -->
                    <template v-if="tag_list.length > 0">
                      <TagCard :tag_list="tag_list" :selected_tag_list="selected_tag_list" @getTag="getTag" />
                    </template>
                    <template v-if="recommendation_list.length > 0">
                      <h2 class="small-hdr">
                        {{
                          $t(
                            "searchResults.searchRight.tvShowsDetails.recommendations"
                          )
                        }}
                      </h2>
                      <div class="slider-otr">
                        <slider :connection_list="recommendation_list" :componentType="componentType"
                          sliderType="recommend" />
                      </div>
                    </template>
                  </div>
                </div>
              </DynamicTab>
            </DynamicTabWrapper>
          </div>
          <div class="no-data-wrapper" v-else>
            <p>{{ $t("searchResults.noData") }}</p>
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
                {{ $t("searchResults.searchRight.tvShowsDetails.cancel") }}
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
                $t("searchResults.searchRight.tvShowsDetails.ratingModal.heading")
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
              <button class="black-outline-btn" @click="(isRating = false), getTVShowsDetails()">
                {{ $t("searchResults.searchRight.tvShowsDetails.cancel") }}
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
                $t("searchResults.searchRight.tvShowsDetails.shareModal.heading")
              }}
            </h1>
          </template>
          <template v-slot:body>
            <div class="cast-details">
              <a href="#" @click="shareFacebook(baseUrl + $route.fullPath), userShare('facebook')"><img
                  src="@/assets/icons/fb.svg" alt="" /></a>
              <a class="twitter-share-button"
                @click="shareTwitter(baseUrl + $route.fullPath, tvshowDetails.title, tvshowDetails.genre), userShare('twitter')">
                <img src="@/assets/icons/twitter-icon.svg" alt="" /></a>
              <a @click="userShare('mail')"
                :href="`mailto:?subject=${tvshowDetails.title}&amp;body=${tvshowDetails.details} - ${baseUrl + $route.fullPath}`">
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
                {{ $t("searchResults.searchRight.tvShowsDetails.cancel") }}
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
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTab from "@/components/DynamicTabs.vue";
import Slider from "@/components/Slider.vue";
import CastCrewSection from "@/components/Details/CastCrewSection.vue";
import MediaSection from "@/components/Details/MediaSection.vue";
import RelatedSection from "@/components/Details/RelatedSection.vue";
import CommunityCard from "@/components/CommunityCard.vue";
import GoogleAdd from "@/components/GoogleAdd.vue";
import TagCard from "@/components/TagCard.vue";
import EpisodeSection from "@/components/Details/EpisodeSection.vue";
import TVShowsDetailsService from "@/services/TVShowsDetailsService";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import MoviesDetailsService from "@/services/MoviesDetailsService";
import Toast from "@/alert/alert.js";
import { dateformat, youtube_parser } from "@/mixins/CommonFunctions.js";
import { shareFacebook, shareTwitter } from "@/mixins/CountryFunctions.js";
import {
  validateVimeoURL,
  matchYoutubeUrl,
  convertMinToHour,
  convertFloat,
} from "@/mixins/CommonValidation.js";
import PageNotfound from "@/components/PageNotfound.vue";
export default {
  name: "TvShowsDetails",
  emits: ["on-current-theme-change"],
  inject: ["common"],
  components: {
    Slider,
    CastCrewSection,
    MediaSection,
    RelatedSection,
    CommunityCard,
    GoogleAdd,
    TagCard,
    EpisodeSection,
    DynamicTabWrapper,
    DynamicTab,
    PopUpModal,
    MoviesDetailsService,
    PageNotfound
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.getTVShowsDetails();
        this.getTVConnectionList();
        this.getTVRecommendationList();
        this.getTVTagList();
        this.selectedSeason = null;
        this.resetComponent++;
      }
    },
  },
  data() {
    return {
      componentType: "tv",
      tvshowDetails: {},
      seasonDetails: {},
      episode_list: [],
      connection_list: [],
      recommendation_list: [],
      videos: [],
      images: [],
      poster: [],
      people_list: [],
      episode_list: [],
      tag_list: [],
      tag_cat_id: "",
      selected_tag_list: [],
      related_articles: [],
      poster_image: "",
      isRating: false,
      selectRating: 0,
      isFavourite: false,
      isShare: false,
      baseUrl: import.meta.env.VITE_SITE_BASE_URL,
      selectedSeason: null,
      background_image: "",
      episodeId: "",
      related_articles_details_url: "",
      readMorePlot: false,
      readMoreCast: false,
      readMore: false,
      isError: false,
      resetComponent: 0
    };
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    this.getTVShowsDetails();
    this.getTVConnectionList();
    this.getTVRecommendationList();
    this.getTVTagList();
    this.userLog();
  },
  methods: {
    getEpisodeId(id) {
      this.episodeId = id;
    },
    navigate(component_name) {
      this.$router.push({
        name: component_name,
        params: { id: this.$route.params.id },
      });
    },
    navigationToDetails(component_name) {
      if (this.episodeId) {
        this.$router.push({
          name: component_name,
          params: {
            id: this.$route.params.id,
            season_id: this.currentSeosonId,
          },
          query: { episode_id: this.episodeId },
          hash: "#episode" + this.episodeId,
        });
      } else {
        this.$router.push({
          name: component_name,
          params: {
            id: this.$route.params.id,
            season_id: this.currentSeosonId,
          },
        });
      }
    },
    toEditTvShow() {
      this.$router.push({
        name: "AddNewTVDetails",
        params: { external_id: this.$route.params.id, type: "internal" },
      });
      localStorage.setItem(
        "tvBackPage",
        "/tvshows/details/" + this.$route.params.id
      );
    },

    // add favorite
    addToFavorite() {
      MoviesDetailsService.addToFavorite(this.$route.params.id, "title")
        .then((res) => {
          if (res.status == 200) {
            this.isFavourite = false;
            this.getTVShowsDetails();
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
    addRating() {
      MoviesDetailsService.addRating(
        this.$route.params.id,
        "title",
        this.selectRating * 2
      )
        .then((res) => {
          if (res.status == 200) {
            this.isRating = false;
            this.getTVShowsDetails();
          }
        })
        .catch((err) => {
          return;
        });
    },
    getTVTagList() {
      TVShowsDetailsService.getTVTagList(this.$route.params.id)
        .then((response) => {
          if (response.status == 200) {
            this.tag_list = response.data.results;
            this.tag_cat_id = response.data.results[0].id;
            this.getTVTagListByCategory();
          }
        })
        .catch((err) => {
          return;
        });
    },
    getTVTagListByCategory() {
      TVShowsDetailsService.getTVTagListByCategory(
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
      this.getTVTagListByCategory();
    },

    getTVShowsDetails() {
      TVShowsDetailsService.getTVShowsDetails(this.$route.params.id)
        .then((response) => {
          if (response.status == 200) {
            this.isError = false;
            this.tvshowDetails = response.data;
            window.document.title = `${response.data.title} - 11DB`;
            this.poster_image = response.data.poster_image;
            this.background_image = response.data.background_image
              ? response.data.background_image
              : response.data.poster_image
                ? response.data.poster_image
                : "";
            this.selectRating = response.data.user_rating / 2;
            if (this.tvshowDetails) {
              this.currentSeosonId = this.tvshowDetails.season_name_list[0].id;
              this.getSeasonWiseDetails(this.currentSeosonId);
            }
          } else {
            this.isError = true;
          }
        })
        .catch((err) => {
          return;
        });
    },

    onChangeTab(tab) {
      this.selectedSeason = tab;
      let selectedTab = this.tvshowDetails.season_name_list.find(function (
        item
      ) {
        return item.id == tab;
      });
      this.currentSeosonId = selectedTab.id;
      this.getSeasonWiseDetails(this.currentSeosonId);
    },

    getSeasonWiseDetails(seasonid) {
      TVShowsDetailsService.getSeasonDetails(this.$route.params.id, seasonid)
        .then((response) => {
          if (response.status == 200) {
            this.seasonDetails = response.data;
            this.episode_list = response.data.episode_list;
            this.videos = response.data.media.videos;
            Array.from(this.videos).forEach((item, i) => {
              this.videos[i]["videoid"] =
                this.validateVimeoURL(item.link) ||
                this.matchYoutubeUrl(item.link);
              if (this.validateVimeoURL(item.link)) {
                this.videos[i]["type"] = "vimeo";
              } else {
                this.videos[i]["type"] = "youtube";
              }
              //this.videos[i]["thumbnail"] = this.youtube_parser(this.videos[i]);
            });
            this.images = response.data.media.images;
            this.poster = response.data.media.poster_images;
            this.people_list = response.data.people_list;
            this.related_articles = response.data.related_articles;
            this.related_articles_details_url =
              response.data.related_articles_details_url;
          }
        })
        .catch((err) => {
          return;
        });
    },
    getTVConnectionList() {
      TVShowsDetailsService.getTVConnectionList(this.$route.params.id)
        .then((response) => {
          if (response.status == 200) {
            this.connection_list = response.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },
    getTVRecommendationList() {
      TVShowsDetailsService.getTVRecommendationList(this.$route.params.id)
        .then((response) => {
          if (response.status == 200) {
            this.recommendation_list = response.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },
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
