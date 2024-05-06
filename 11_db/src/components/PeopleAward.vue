<template>
    <div class="people-award-bottom-innr">
        <div class="people-award-bottom-left" v-if="!isOther">
            <figure class="cursor-pointer" @click="navigateToDetails(award)">
                <img v-if="award.poster_image" :src="award.poster_image" alt="award">
                <img v-else src="@/assets/images/no-image-view.png" alt="" />
            </figure>
        </div>
        <div class="people-award-bottom-right" v-if="!isOther">
            <h4 class="cursor-pointer" @click="navigateToDetails(award)">{{ award.title_name }}</h4>
            <div class="people-award-bottom-list">
                <ul>
                    <li v-for="(nominee, i) in nominees.slice(0, 6)" :key="i">
                        <h5>{{ nominee.sector_name }}</h5>
                        <p class="cursor-pointer"
                            @click="$router.push({ name: 'AwardsDetail', params: { id: nominee.award_id, pageTitle: nominee.award_name } })">
                            {{
                                nominee.award_name }}<span v-if="nominee.is_winner == 'y'">
                                <img src="@/assets/icons/trophy.svg" alt="" />
                                {{ $t('award.Winner') }}</span></p>
                    </li>
                </ul>
                <a v-if="nominees.length > 6" @click="isAwardModal = true" class="more-list">{{ $t("episodeList.plusMore")
                }}</a>
            </div>
        </div>

        <div class="people-award-bottom-right" v-else>
            <div class="people-award-bottom-list">
                <ul>
                    <li v-for="(nominee, i) in nominees" :key="i">
                        <h5>{{ nominee.sector_name }}</h5>
                        <p class="cursor-pointer"
                            @click="$router.push({ name: 'AwardsDetail', params: { id: nominee.award_id, pageTitle: nominee.award_name } })">
                            {{
                                nominee.award_name }}<span v-if="nominee.is_winner == 'y'">
                                <img src="@/assets/icons/trophy.svg" alt="" />
                                {{ $t('award.Winner') }}</span></p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="new-cast-modal award-modal" v-show="isAwardModal">
            <PopUpModal :isModal="isAwardModal">
                <template v-slot:header>
                    <h1>{{ $t("award.AwardsDetails") }}</h1>
                    <button @click="isAwardModal = false">
                        <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
                    </button>
                </template>
                <template v-slot:body>
                    <div class="awards-outer">
                        <div class="awards-row" v-if="!isOther">
                            <div class="awd-mdl-hdng">
                                <h4>{{ $t("award.Pieceofwork") }}</h4>
                            </div>
                            <div class="work-awrd-info-row">
                                <div class="work-awrd-pic" @click="navigateToDetails(award)">
                                    <a href="javascript:void(0);">
                                        <img v-if="award.poster_image" :src="award.poster_image" alt="award">
                                        <img v-else src="@/assets/images/no-image-view.png" alt="" />
                                    </a>
                                </div>
                                <div class="work-awrd-text">
                                    <!-- <div class="winner-tag">
                                        <img src="@/assets/icons/a-trophy.svg" alt="" />
                                        <span> {{ $t('award.Winner') }}</span>
                                    </div> -->
                                    <a @click="navigateToDetails(award)" href="javascript:void(0);">{{ award.title_name
                                    }}</a>
                                    <h5>{{ dateformat(award.release_date) }} </h5>
                                </div>
                            </div>
                        </div>
                        <div class="awards-row">
                            <div class="awd-mdl-hdng">
                                <h4>{{ $t("award.Listofawards") }} </h4>
                            </div>
                            <div class="award-list-innr">
                                <div class="awrd-list-row" v-for="(nominee, i) in nominees" :key="i">
                                    <h4>{{ nominee.sector_name }}</h4>
                                    <div class="winner-row"
                                        @click="$router.push({ name: 'AwardsDetail', params: { id: nominee.award_id, pageTitle: nominee.award_name } })">
                                        <h3 class="cursor-pointer">{{ nominee.award_name }}</h3>
                                        <div class="winner-tag" v-if="nominee.is_winner == 'y'">
                                            <img src="@/assets/icons/a-trophy.svg" alt="" />
                                            <span> {{ $t('award.Winner') }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </template>
            </PopUpModal>
        </div>
    </div>
</template>


<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "@vue/runtime-core";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import { dateformat } from "@/mixins/CommonFunctions.js";
const props = defineProps({
    award: Object,
    nominees: Array,
    isOther: String
});
const router = useRouter();
const isAwardModal = ref(false);

const navigateToDetails = (award) => {
    if (award.title_type == "tv") {
        router.push({
            name: 'TvShowsDetails',
            params: { id: award.title_id, pageTitle: award.title_name },
        });
    } else if (award.title_type == "movie") {
        router.push({
            name: 'MoviesDetails',
            params: { id: award.title_id, pageTitle: award.title_name },
        });
    } else if (award.title_type == "webtoons") {
        router.push({
            name: 'WebtoonsDetail',
            params: { id: award.title_id, pageTitle: award.title_name },
        });
    } else if (award.title_type == "people") {
        router.push({
            name: 'PeopleDetails',
            params: { id: award.title_id, pageTitle: award.title_name },
        });
    }
}
</script>