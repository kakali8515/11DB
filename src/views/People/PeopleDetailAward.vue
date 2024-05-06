<template>
    <div>
        <BannerCardTwo :bannerInfo="{
            imgUrl: posterImage,
            link: 'PeopleDetails',
            id: $route.params.id,
            background_image: background_image,
        }">
            <h3>{{ title }}</h3>
        </BannerCardTwo>
        <div class="people-award-bottom-sec">
            <div class="container">
                <h2 class="mb-30 small-hdr">{{ $t("header.mainMenu.Awards") }}</h2>
                <div class="people-award-bottom-otr awards-people-detail-row" v-if="awardDetails.length">
                    <PeopleAward v-for="award in awardDetails" :key="award.award_id" :award="award"
                        :nominees="award.nominees" />
                </div>
                <div class="no-data-wrapper" v-if="isAwardData && awardDetails.length == 0">
                    <p>{{ $t("searchResults.noData") }}</p>
                </div>
            </div>
        </div>
        <div class="people-award-bottom-sec other-award-details pt-0">
            <div class="container">
                <h2 class="mb-30 small-hdr">{{ $t("award.others") }}</h2>
                <div class="people-award-bottom-otr" v-if="otherDetails.length">
                    <PeopleAward :nominees="otherDetails" isOther="others" />
                </div>
                <div class="no-data-wrapper" v-if="isAwardData && otherDetails.length == 0">
                    <p>{{ $t("searchResults.noData") }}</p>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
import BannerCardTwo from "@/components/BannerCardTwo.vue";
import PeopleAward from '@/components/PeopleAward.vue';
import AwardServices from "@/services/AwardServices.js";
import { onMounted, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { inject } from "vue";
import i18n from "@/config/i18n";
const { t } = i18n.global;

const route = useRoute();
const title = ref("");
const peopleId = route.params.id;
const posterImage = ref("");
const background_image = ref("");
const awardDetails = ref([]);
const isAwardData = ref(false);
const common = inject("common");
const otherDetails = ref([]);

// on language change
watch(
    () => common.state.SelectedLang,
    function (newVal, oldVal) {
        if (newVal && oldVal && newVal != oldVal) {
            isAwardData.value = false;
            getAward();
        }
    }
);

// Lifecycle hooks
onMounted(() => {
    getAward();
});

// award info
const getAward = () => {
    AwardServices.getDetailPageAwardList(peopleId, 'people')
        .then((res) => {
            if (res.status == 200) {
                isAwardData.value = true;
                awardDetails.value = res.data.results;
                otherDetails.value = res.data.others;
                background_image.value = res.data.bg_image ? res.data.bg_image : res.data.poster_image ? res.data.poster_image : "";
                posterImage.value = res.data.poster_image ? res.data.poster_image : "";
                title.value = res.data.item_name;
                window.document.title = `${res.data.item_name} - ${t("header.mainMenu.Awards")} - 11DB`;
            } else {
                isAwardData.value = true;
            }
        })
        .catch((err) => {
            console.log(err)
            return;
        });
};

</script>