<template>
    <div>
        <div v-if="isError == false && webtoonDetails.id">
            <div class="people-details-sec tvshows-details-sec"
                :style="{ backgroundImage: 'url(' + background_image + ')' }">
                <div class="container">
                    <div class="people-dtl-otr">
                        <div class="people-dtl-left">
                            <figure>
                                <img v-if="webtoonDetails.poster_image?.includes('https')"
                                    :src="webtoonDetails.poster_image" :alt="webtoonDetails.poster_image" />
                                <img v-else src="@/assets/images/no-image-view.png" />
                            </figure>
                        </div>
                        <div class="people-dtl-right">
                            <div class="edit-otr">
                                <h2 class="big-hdr" :title="webtoonDetails.title">{{ webtoonDetails.title }}</h2>
                                <div class="edit-innr">
                                    <a @click="toEditWbtoon" class="btn solid"
                                        v-if="common.state.is_admin == 'y' && webtoonDetails.is_edit === 'y'">{{
                                            $t("general.editButton")
                                        }}</a>
                                    <a @click="isFavourite = true" class="sc-icon">
                                        <template v-if="webtoonDetails.is_like == 'y'">
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
                                <li v-if="webtoonDetails.title_status" class="gray-bg">
                                    {{ $t(webtoonDetails.title_status) }}
                                </li>
                                <li v-if="webtoonDetails.certification" class="gray-bg">
                                    {{ webtoonDetails.certification }}
                                </li>
                                <li>{{ $t("header.mainMenu.Webtoons") }}</li>
                                <li v-if="webtoonDetails.genre">{{ webtoonDetails.genre }}</li>
                                <li v-if="webtoonDetails.year">{{ webtoonDetails.year }}</li>
                                <li v-if="webtoonDetails.weekly_telecast.length">{{ $t('webtoons.Every') }} {{
                                    changeArray(webtoonDetails.weekly_telecast) }}</li>
                                <li>{{ $t("searchResults.searchRight.tvShowsDetails.likes") }}
                                    {{ webtoonDetails.no_of_likes ? webtoonDetails.no_of_likes.toLocaleString("en-US") : 0
                                    }}
                                </li>
                            </ul>
                            <div class="startxt">
                                <div class="md-star">
                                    <template v-if="webtoonDetails.rating > 0.0">
                                        <!-- integer -->
                                        <template v-if="convertFloat(webtoonDetails.rating / 2) == false">
                                            <template v-for="i in 5" :key="i">
                                                <img v-if="webtoonDetails.rating >= i * 2" src="@/assets/icons/star.svg"
                                                    alt="star" />
                                                <img v-else src="@/assets/icons/outline-star.svg" alt="star" />
                                            </template>
                                        </template>
                                        <!-- integer -->
                                        <!-- float -->
                                        <template v-else>
                                            <img v-for="i in parseInt(webtoonDetails.rating / 2)" :key="i"
                                                src="@/assets/icons/star.svg" alt="star" />
                                            <img src="@/assets/icons/half-star.svg" alt="star" />
                                            <img src="@/assets/icons/outline-star.svg" alt="star"
                                                v-for="i in 4 - parseInt(webtoonDetails.rating / 2)" :key="i" />
                                        </template>
                                        <!-- float -->
                                    </template>
                                    <template v-else>
                                        <img src="@/assets/icons/outline-star.svg" alt="star" v-for="i in 5" :key="i" />
                                    </template>
                                </div>
                                <span>{{
                                    webtoonDetails.rating ? webtoonDetails.rating : "0.0"
                                }}</span>
                            </div>

                            <ul class="movie-detail-list webtoons-detail-list mb-20">
                                <li>
                                    <span>{{ $t("searchResults.searchRight.tvShowsDetails.summary") }}</span>
                                    <p class="details-para" v-show="!readMore">
                                        {{
                                            webtoonDetails.details
                                            ? webtoonDetails.details?.length > 230
                                                ? webtoonDetails.details.substring(0, 230) + "..."
                                                : webtoonDetails.details.substring(0, 230)
                                            : "-"
                                        }}

                                        <span @click="readMore = !readMore">
                                            <span v-if="readMore">{{ $t("display.Hide") }}</span>
                                            <span v-if="!readMore && webtoonDetails.details?.length > 230">{{
                                                $t("display.ReadMore")
                                            }}</span>
                                        </span>
                                    </p>
                                    <p class="details-para" v-show="readMore">
                                        {{ webtoonDetails.details ? webtoonDetails.details : "-" }}
                                        <span @click="readMore = !readMore">
                                            <span v-if="readMore && webtoonDetails.details?.length > 230">{{
                                                $t("display.Hide")
                                            }}</span>
                                            <span v-if="!readMore && webtoonDetails.details?.length > 230">{{
                                                $t("display.ReadMore")
                                            }}</span>
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <span>{{ $t("searchResults.searchRight.tvShowsDetails.countryLanguage") }}</span>
                                    <p>
                                        {{ webtoonDetails.country ? webtoonDetails.country : "-" }} /
                                        {{ webtoonDetails.language ? webtoonDetails.language : "-" }}
                                    </p>
                                </li>
                                <li
                                    v-if="webtoonDetails.creators?.length > 0 || webtoonDetails.writer_name?.length > 0 || webtoonDetails.characters?.length > 0">
                                    <ul>
                                        <li v-if="webtoonDetails.creators?.length > 0">
                                            <span>{{
                                                $t("webtoons.Creator")
                                            }}</span>
                                            <p v-if="webtoonDetails.creators?.length > 0">
                                                <a v-for="(item, index) in webtoonDetails.creators" :key="index"
                                                    @click="$router.push(`/people/details/${item.id}`)">{{
                                                        item.name }}
                                                    <p class="inline" v-if="index != webtoonDetails.creators?.length - 1">,
                                                    </p>
                                                </a>
                                            </p>
                                            <p v-else>-</p>
                                        </li>
                                        <li v-if="webtoonDetails.writer_name?.length > 0">
                                            <span>{{ $t('webtoons.writer') }}</span>
                                            <p v-if="webtoonDetails.writer_name?.length > 0">
                                                <a v-for="(item, index) in webtoonDetails.writer_name" :key="index"
                                                    @click="$router.push(`/people/details/${item.id}`)">{{
                                                        item.name }}
                                                    <p class="inline"
                                                        v-if="index != webtoonDetails.writer_name?.length - 1">,</p>
                                                </a>
                                            </p>
                                            <p v-else>-</p>
                                        </li>
                                        <li v-if="webtoonDetails.characters?.length > 0">
                                            <span>{{ $t('webtoons.Illustrator') }}</span>
                                            <p v-if="webtoonDetails.characters?.length > 0">
                                                <a v-for="(item, index) in webtoonDetails.characters" :key="index"
                                                    @click="$router.push(`/people/details/${item.id}`)">{{
                                                        item.name }}
                                                    <p class="inline" v-if="index != webtoonDetails.characters.length - 1">,
                                                    </p>
                                                </a>
                                            </p>
                                            <p v-else>-</p>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>
                                            <span>{{
                                                $t("searchResults.searchRight.tvShowsDetails.channel")
                                            }}</span>
                                            <div class="channel-list" v-if="webtoonDetails.channel_list?.length > 0">
                                                <a v-for="channelList in webtoonDetails.channel_list"
                                                    :key="channelList.icon"><img :src="channelList.icon"
                                                        :alt="channelList.icon" /></a>
                                            </div>
                                            <p v-else>-</p>
                                        </li>
                                        <li>
                                            <span>{{
                                                $t("searchResults.searchRight.tvShowsDetails.officialSite")
                                            }}</span>
                                            <p v-if="webtoonDetails.official_site">
                                                <a :href="webtoonDetails.official_site" target="_blank">{{
                                                    webtoonDetails.official_site
                                                    ? webtoonDetails.official_site
                                                    : "-"
                                                }}</a>
                                            </p>
                                            <p v-else>-</p>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <div class="awd-list-outr" v-if="webtoonDetails.award.winners || webtoonDetails.award.nominees">
                                <ul class="award-list">
                                    <li>
                                        <span><img src="@/assets/icons/award.svg" alt="" /></span>
                                        <em>{{ $t("searchResults.searchRight.tvShowsDetails.award") }}</em>
                                    </li>
                                    <li>
                                        <ul>
                                            <li v-if="webtoonDetails.award.winners"> {{ webtoonDetails.award.winners }} {{
                                                $t("searchResults.searchRight.movieDetails.wins") }}
                                            </li>
                                            <li v-if="webtoonDetails.award.nominees"> {{ webtoonDetails.award.nominees }} {{
                                                $t("searchResults.searchRight.movieDetails.nominations") }}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <a href="javascript:void(0)" @click="$router.push(`/webtoons/awards/${$route.params.id}`)">
                                    <img src="@/assets/icons/arrow-right-wh.svg" class="dark-th" alt="" />
                                    <img src="@/assets/icons/arrow-right-blk.svg" class="light-th" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="people-details-btm-sec tvshows-details-btm-sec movies-details-btm-sec">
                <div class="container">
                    <div class="tab-outr small" v-if="webtoonDetails.season_name_list?.length > 0">
                        <DynamicTabWrapper @getResponseTitle="onChangeTab" :seasonId="selectedSeason">
                            <DynamicTab v-for="tabName in webtoonDetails.season_name_list" :key="tabName.id"
                                :title="tabName.season_number" :seasonId="tabName.id">
                                <div class="people-details-btm-otr">
                                    <div class="people-details-btm-left">
                                        <h2 class="small-hdr">{{
                                            $t("searchResults.searchRight.tvShowsDetails.details") }}</h2>
                                        <figure class="detailfigure">
                                            <img v-if="seasonDetails.season_poster?.includes('https')"
                                                :src="seasonDetails.season_poster" :alt="seasonDetails.season_poster" />
                                            <img v-else src="@/assets/images/no-image-view.png" alt="" />
                                        </figure>
                                        <ul class="detail-lst">
                                            <li>
                                                <span>{{
                                                    $t(
                                                        "searchResults.searchRight.tvShowsDetails.releaseDate"
                                                    )
                                                }}</span>
                                                <p>{{
                                                    seasonDetails.release_date
                                                    ? dateformat(seasonDetails.release_date)
                                                    : "-"
                                                }}</p>
                                            </li>
                                            <li>
                                                <span>{{
                                                    $t("searchResults.searchRight.tvShowsDetails.episodes")
                                                }}</span>
                                                <p>{{
                                                    seasonDetails.episode_number
                                                    ? seasonDetails.episode_number
                                                    : "-"
                                                }}</p>
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
                                                        <span class="more-text" v-if="readMorePlot">{{ $t("display.Hide")
                                                        }}</span>
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
                                        <h2 class="small-hdr episode-heading">{{
                                            $t("searchResults.searchRight.tvShowsDetails.episodes")
                                        }}</h2>
                                        <EpisodeSection :episode_list="episode_list" @episodeid="getEpisodeId" @navigation="
                                            navigationToDetails('WebtoonDetailsEpisode')
                                            " />
                                        <div class="work-otr mr-bb2">
                                            <h2 class="small-hdr">{{ $t('webtoons.CharacterCrew') }}</h2>
                                            <CastCrewSection :people_list="people_list" @navigation="
                                                navigationToDetails('WebtoonDetailsChar&Crew')
                                                " />
                                            <h2 class="small-hdr" v-if="videos?.length > 0 ||
                                                images?.length > 0 ||
                                                poster?.length > 0
                                                ">{{ $t("searchResults.searchRight.tvShowsDetails.media") }}</h2>
                                            <MediaSection :videos="videos" :images="images" :posters="poster"
                                                @navigation="navigationToDetails('WebtoonMedia')" v-if="videos?.length > 0 ||
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
                                                @navigation="navigationToDetails('TvShowMedia')"
                                                :related_articles_details_url="related_articles_details_url
                                                    " />
                                            <h2 class="small-hdr">
                                                {{
                                                    $t("searchResults.searchRight.tvShowsDetails.community")
                                                }}
                                            </h2>
                                            <CommunityCard v-if="seasonDetails" type="title" title_type="webtoons"
                                                famous_line_type="people" :season_id="currentSeosonId"
                                                :key="resetComponent" />
                                        </div>
                                    </div>
                                    <div class="people-details-btm-right">
                                        <h2 class="small-hdr" v-if="seasonDetails.read?.length > 0">
                                            {{ $t('addNewWebtoonForm.read') }}</h2>
                                        <ul class="social-icon-list" v-if="seasonDetails.read?.length > 0">
                                            <li><span>{{ $t('addNewWebtoonForm.read') }}</span>
                                                <a v-for="read in seasonDetails.read" :href="read.link" :key="read.link"
                                                    target="_blank"><img :src="read.icon" alt="read" /></a>
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
                                                <slider :connection_list="connection_list" />
                                            </div>
                                        </template>

                                        <!-- <GoogleAdd /> -->
                                        <template v-if="tag_list.length > 0">
                                            <TagCard :tag_list="tag_list" :selected_tag_list="selected_tag_list"
                                                @getTag="getTag" />
                                        </template>
                                    </div>
                                </div>
                            </DynamicTab>
                        </DynamicTabWrapper>
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
                                        <img v-if="selectRating >= i" src="@/assets/icons/star.svg" alt="star"
                                            @click="getSelectRating(i)" />
                                        <img v-else src="@/assets/icons/outline-star.svg" alt="star"
                                            @click="getSelectRating(i)" />
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-slot:footer>
                        <div class="button-group">
                            <button class="black-outline-btn" @click="(isRating = false), getWebtoonDetails()">
                                {{ $t("searchResults.searchRight.tvShowsDetails.cancel") }}
                            </button>
                            <button class="red-fill-btn" :disabled="selectRating == 0"
                                :class="selectRating == 0 ? 'isDisabled' : ''" @click="addRating">
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
                                @click="shareTwitter(baseUrl + $route.fullPath, webtoonDetails.title, webtoonDetails.genre), userShare('twitter')">
                                <img src="@/assets/icons/twitter-icon.svg" alt="" /></a>
                            <a @click="userShare('mail')"
                                :href="`mailto:?subject=${webtoonDetails.title}&amp;body=${webtoonDetails.details} - ${baseUrl + $route.fullPath}`">
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
import TagCard from "@/components/TagCard.vue";
import GoogleAdd from "@/components/GoogleAdd.vue";
import CommunityCard from "@/components/CommunityCard.vue";
import CastCrewSection from "@/components/Details/CastCrewSection.vue";
import MediaSection from "@/components/Details/MediaSection.vue";
import EpisodeSection from "@/components/Details/EpisodeSection.vue";
import RelatedSection from "@/components/Details/RelatedSection.vue";
import WebtoonDetailsService from "@/services/WebtoonDetailsService";
import TVShowsDetailsService from "@/services/TVShowsDetailsService";
import { validateVimeoURL, matchYoutubeUrl, convertMinToHour, convertFloat, } from "@/mixins/CommonValidation.js";
import { dateformat, youtube_parser } from "@/mixins/CommonFunctions.js";
import PageNotfound from "@/components/PageNotfound.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import MoviesDetailsService from "@/services/MoviesDetailsService";
import { shareFacebook, shareTwitter } from "@/mixins/CountryFunctions.js";
import Toast from "@/alert/alert.js";
export default {
    name: 'WebtoonsDetail',
    emits: ["on-current-theme-change"],
    inject: ["common"],
    components: {
        DynamicTabWrapper,
        DynamicTab,
        Slider,
        TagCard,
        GoogleAdd,
        CommunityCard,
        CastCrewSection,
        MediaSection,
        EpisodeSection,
        PageNotfound,
        RelatedSection, PopUpModal
    },
    watch: {
        "common.state.SelectedLang": function (newVal, oldVal) {
            if (newVal && oldVal && newVal != oldVal) {
                this.getWebtoonDetails();
                this.getTVConnectionList();
                this.getTVTagList();
                this.selectedSeason = null;
                this.resetComponent++;
            }
        },
    },

    data() {
        return {
            componentType: "webtoons",
            webtoonDetails: {},
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
            readMore: false,
            isError: false,
            resetComponent: 0
        };
    },

    mounted() {
        localStorage.removeItem("site_language");
        localStorage.removeItem("draft_ids");
        localStorage.removeItem("saveIdList");
        this.getWebtoonDetails();
        this.getTVConnectionList();
        this.getTVTagList();
        this.userLog();
    },

    methods: {
        validateVimeoURL,
        matchYoutubeUrl,
        convertMinToHour,
        convertFloat,
        dateformat,
        youtube_parser,
        shareFacebook,
        shareTwitter,

        getWebtoonDetails() {
            WebtoonDetailsService.getWebtoonDetails(this.$route.params.id)
                .then((response) => {
                    if (response.status == 200) {
                        this.isError = false;
                        this.webtoonDetails = response.data;
                        window.document.title = `${response.data.title} - 11DB`;
                        this.poster_image = response.data.poster_image;
                        this.background_image = response.data.background_image
                            ? response.data.background_image
                            : response.data.poster_image
                                ? response.data.poster_image
                                : "";
                        this.selectRating = response.data.user_rating / 2;
                        if (this.webtoonDetails) {
                            this.currentSeosonId = this.webtoonDetails.season_name_list[0].id;
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

        getSeasonWiseDetails(seasonid) {
            WebtoonDetailsService.getSeasonDetails(this.$route.params.id, seasonid)
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
                        });
                        this.images = response.data.media.images;
                        this.poster = response.data.media.poster_images;
                        this.people_list = response.data.character_crew_list;
                        this.related_articles = response.data.related_articles;
                        this.related_articles_details_url = response.data.related_articles_details_url;
                    }
                })
                .catch((err) => {
                    console.log(err)
                    return;
                });
        },
        onChangeTab(tab) {
            this.selectedSeason = tab;
            let selectedTab = this.webtoonDetails.season_name_list.find(function (
                item
            ) {
                return item.id == tab;
            });
            this.currentSeosonId = selectedTab.id;
            this.getSeasonWiseDetails(this.currentSeosonId);
        },

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
        onClick(url) {
            const input = this.$refs["myHiddenInput"];
            input.value = url;
            input.style.display = "block";
            input.select();
            document.execCommand("copy");
            input.style.display = "none";
            Toast.fire({ title: this.$t("addNewPeople.primaryDetails.linkCopied") });
        },

        // add favorite
        addToFavorite() {
            MoviesDetailsService.addToFavorite(this.$route.params.id, "title")
                .then((res) => {
                    if (res.status == 200) {
                        this.isFavourite = false;
                        this.getWebtoonDetails();
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
                        this.getWebtoonDetails();
                    }
                })
                .catch((err) => {
                    return;
                });
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

        changeArray(wordsArr) {
            for (let i = 0; i < wordsArr.length; i++) {
                wordsArr[i] = wordsArr[i][0].toUpperCase() + wordsArr[i].substring(1);
                wordsArr[i] = wordsArr[i].substring(0, 3);
                wordsArr[i] = this.$t(wordsArr[i]);
                wordsArr[i] = wordsArr[i].toUpperCase()
            }
            return wordsArr.join(', ');
        },

        toEditWbtoon() {
            this.$router.push({
                name: "AddNewWebtoonDetails",
                params: { external_id: this.$route.params.id, type: "internal" },
            });
            localStorage.setItem(
                "webtoonBackPage", "/webtoons/detail/" + this.$route.params.id
            );
        },

    }

};
</script>

<style scoped>
.inline {
    display: inline-block;
}
</style>