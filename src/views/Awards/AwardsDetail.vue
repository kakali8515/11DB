<template>
    <div>
        <section class="award-details-sec" :style="{ backgroundImage: 'url(' + background_image + ')' }">
            <div class="container">
                <div class="award-dtl-otr">
                    <div class="award-dtl-left">
                        <figure>
                            <img v-if="awardDetails.poster_image" :src="awardDetails.poster_image" alt="image" />
                            <img v-else src="@/assets/images/no-image-view.png" />
                        </figure>
                    </div>
                    <div class="award-dtl-right">
                        <div class="edit-otr">
                            <h2>{{ awardDetails.award_name }}</h2>
                            <div class="edit-innr">
                                <a @click="isFavourite = true" href="#" class="sc-icon">
                                    <template v-if="awardDetails.is_liked == 'y'">
                                        <img src="@/assets/icons/wishlist-solid.svg" />
                                    </template>
                                    <template v-else>
                                        <img src="@/assets/icons/wishlist.svg" alt="" class="dark-th" />
                                        <img src="@/assets/icons/blk-icon1.svg" alt="" class="light-th" />
                                    </template>
                                </a>
                                <a @click="isRating = true" href="#" class="sc-icon">
                                    <img src="@/assets/icons/white-outline-star.svg" class="dark-th" alt="star" />
                                    <img src="@/assets/icons/blk-icon2.svg" class="light-th" alt="star" />
                                </a>
                                <a @click="isShare = true;" href="#" class="sc-icon">
                                    <img src="@/assets/icons/settings.svg" class="dark-th" alt="" />
                                    <img src="@/assets/icons/blk-icon3.svg" class="light-th" alt="" />
                                </a>
                            </div>
                        </div>
                        <ul class="award-date-list">
                            <li v-if="awardDetails.month_name">{{ $t(awardDetails.month_name) }}</li>
                            <li v-if="awardDetails.country_name || awardDetails.city || awardDetails.place">{{
                                awardDetails.country_name }}<span
                                    v-if="awardDetails.country_name && awardDetails.city">,</span> {{ awardDetails.city
                                    }}<span v-if="awardDetails.city && awardDetails.place">,</span> {{ awardDetails.place }}
                            </li>
                        </ul>
                        <div class="startxt">
                            <div class="md-star">
                                <template v-if="awardDetails.avg_rating > 0.0">
                                    <!-- integer -->
                                    <template v-if="convertFloat(awardDetails.avg_rating / 2) == false">
                                        <template v-for="i in 5" :key="i">
                                            <img v-if="awardDetails.avg_rating >= i * 2" src="@/assets/icons/star.svg"
                                                alt="star" />
                                            <img v-else src="@/assets/icons/outline-star.svg" alt="star" />
                                        </template>
                                    </template>
                                    <!-- integer -->
                                    <!-- float -->
                                    <template v-else>
                                        <img v-for="i in parseInt(awardDetails.avg_rating / 2)" :key="i"
                                            src="@/assets/icons/star.svg" alt="star" />
                                        <img src="@/assets/icons/half-star.svg" alt="star" />
                                        <img src="@/assets/icons/outline-star.svg" alt="star"
                                            v-for="i in 4 - parseInt(awardDetails.avg_rating / 2)" :key="i" />
                                    </template>
                                    <!-- float -->
                                </template>
                                <template v-else>
                                    <img src="@/assets/icons/outline-star.svg" alt="star" v-for="i in 5" :key="i" />
                                </template>
                            </div>

                            <span>{{ awardDetails.avg_rating }}</span>
                        </div>
                        <div class="award-list-outr">
                            <Dropdown @dropdownValue="getRoundData" :search_type="selectedRound"
                                :labelItem="$t('filterCard.selectCountry')" :searchTitleListItem="round_list"
                                searchtitle="round_name" searchvalue="round_id" :clearable="false" />
                        </div>
                        <div class="summary-content">
                            <div class="summary-inner">
                                <h5>{{ $t("searchResults.searchRight.tvShowsDetails.summary") }}</h5>
                                <span>
                                    <p v-if="awardDetails?.summary?.length > 230 && !readMore">
                                        {{ awardDetails?.summary?.substring(0, 230) + "..." }}
                                        <a class="community-text cursor-pointer" @click="readMore = !readMore">{{
                                            $t("display.ReadMore") }}</a>
                                    </p>
                                    <p v-if="readMore || awardDetails?.summary?.length < 230">{{ awardDetails?.summary }}
                                        <a class="community-text cursor-pointer" v-if="readMore"
                                            @click="readMore = !readMore">{{
                                                $t("display.Hide") }}</a>
                                    </p>
                                    <!-- <a href="#">more</a> -->
                                </span>
                            </div>
                            <div class="summary-inner">
                                <h5>{{ $t("award.officialWebsite") }}</h5>
                                <a v-if="awardDetails.website" :href="awardDetails.website" target="_blank"
                                    class="a-link">{{ awardDetails.website }}</a>
                                <p v-else>-</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="prize-main">
            <div class="container">
                <div class="prize-col">
                    <div class="left-side">
                        <h2>{{ $t('award.prizeNominee') }}</h2>
                        <ul class="prize-list-detail" v-if="nominee_list.length">
                            <li v-for="(nominee, i) in nominee_list" :key="i">
                                <div class="p-heading">
                                    <h3>{{ nominee.sector_name }}</h3>
                                </div>
                                <MovieDetailCard :nominee="nominee.nominees" :winner="nominee.winners" />

                            </li>
                        </ul>
                        <div class="no-data-wrapper mb-0" v-else>
                            <p>{{ $t("searchResults.noData") }}</p>
                        </div>
                    </div>
                    <div class="right-side">
                        <h2 class="mb-20 small-hdr" v-if="awardDetails.related_articles?.length">{{
                            $t("addNewPeople.relatedArticles") }}</h2>
                        <RelatedArticle :article="awardDetails.related_articles"
                            v-if="awardDetails.related_articles?.length"
                            :related_articles_details_url="awardDetails.related_articles_details_url" />
                        <!-- <div class="mr-80">
                        <GoogleAdd />
                    </div> -->
                    </div>

                </div>
            </div>
        </section>
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
                        <button class="black-outline-btn" @click="(isRating = false), getTVShowsDetails()">
                            {{ $t("searchResults.searchRight.tvShowsDetails.cancel") }}
                        </button>
                        <button class="red-fill-btn" @click="addRating">
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
                            @click="shareTwitter(baseUrl + $route.fullPath, awardDetails.award_name, ''), userShare('twitter')">
                            <img src="@/assets/icons/twitter-icon.svg" alt="" /></a>
                        <a @click="userShare('mail')"
                            :href="`mailto:?subject=${awardDetails.award_name}&amp;body=${awardDetails.summary} - ${baseUrl + $route.fullPath}`">
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
</template>


<script setup>
import MovieDetailCard from '@/components/MovieDetailCard.vue';
import GoogleAdd from '@/components/GoogleAdd.vue';
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import RelatedArticle from '@/components/RelatedArticle.vue';
import { onMounted, ref, watch } from "@vue/runtime-core";
import { convertFloat } from "@/mixins/CommonValidation.js";
import { useRoute, useRouter } from "vue-router";
import AwardServices from "@/services/AwardServices.js";
import MoviesDetailsService from "@/services/MoviesDetailsService";
import { inject } from "vue";
import Toast from "@/alert/alert.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import { shareFacebook, shareTwitter } from "@/mixins/CountryFunctions.js";

const emit = defineEmits(["on-current-theme-change"]);
const route = useRoute();
const router = useRouter();
const common = inject("common");
const awardId = route.params.id;
const awardDetails = ref("");
const background_image = ref("");
const readMore = ref(false);
const round_list = ref([]);
const selectedRound = ref("");
const nominee_list = ref("");
const round_id = ref("")
const isRating = ref(false);
const selectRating = ref(0);
const isFavourite = ref(false);
const isShare = ref(false);
const baseUrl = import.meta.env.VITE_SITE_BASE_URL;
const myHiddenInput = ref(null);

watch(
    () => common.state.SelectedLang,
    function (newVal, oldVal) {
        if (newVal && oldVal && newVal != oldVal) {
            getAwradDetails();
        }
    }
);

onMounted(() => {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    localStorage.removeItem("saveIdList");
    getAwradDetails();
});

// award info
const getAwradDetails = () => {
    AwardServices.getAwardDetails(awardId)
        .then((res) => {
            if (res.status == 200) {
                awardDetails.value = res.data;
                window.document.title = `${res.data.award_name} - 11DB`;
                background_image.value = res.data.poster_image ? res.data.poster_image : "";
                round_list.value = res.data.round_list;
                selectedRound.value = res.data.round_list[0];
                round_id.value = selectedRound.value?.round_id;
                getNomineeDetails();
            }
        })
        .catch((err) => {
            console.log(err)
            return;
        });
};

// nominne info
const getNomineeDetails = () => {
    let data = {
        id: awardId,
        round_id: round_id.value
    }
    AwardServices.getNomineeList(data)
        .then((res) => {
            if (res.status == 200) {
                nominee_list.value = res.data.results;
            }
        })
        .catch((err) => {
            console.log(err)
            return;
        });
};

const getRoundData = (event) => {
    round_id.value = event
    getNomineeDetails();
}

// add favorite
const addToFavorite = () => {
    MoviesDetailsService.addToFavorite(awardId, "award")
        .then((res) => {
            if (res.status == 200) {
                isFavourite.value = false;
                getAwradDetails();
            }
        })
        .catch((err) => {
            return;
        });
};

// add to share
const userShare = (shared_channel) => {
    MoviesDetailsService.addToShare(awardId, "award", shared_channel)
        .then((res) => { })
        .catch((err) => {
            return;
        });
};
const getSelectRating = (i) => {
    selectRating.value = i;
};

const addRating = () => {
    MoviesDetailsService.addRating(
        awardId,
        "award",
        selectRating.value * 2
    )
        .then((res) => {
            if (res.status == 200) {
                isRating.value = false;
                getAwradDetails();
            }
        })
        .catch((err) => {
            return;
        });
};

const onClick = (url) => {
    const input = myHiddenInput.value;
    input.value = url;
    input.style.display = "block";
    input.select();
    document.execCommand("copy");
    input.style.display = "none";
    Toast.fire({ title: t("addNewPeople.primaryDetails.linkCopied") });
}

</script>