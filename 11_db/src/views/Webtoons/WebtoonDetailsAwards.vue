<template>
    <div>
        <BannerCardTwo :bannerInfo="{
            imgUrl: posterImage,
            link: 'WebtoonsDetail',
            id: $route.params.id,
            background_image: background_image,
        }">
            <h3>{{ title }}</h3>
        </BannerCardTwo>
        <section class="tvepisodes-btm">
            <div class="container">
                <div class="tvepisodes-content">
                    <div class="top-head">
                        <h2>{{ $t("header.mainMenu.Awards") }}</h2>
                    </div>
                    <div class="a-lists" v-if="awardDetails.length">
                        <AwardList v-for="award in awardDetails" :key="award.award_id" :award="award" :title="title"
                            :bannerInfo="{
                                imgUrl: posterImage,
                                link: 'WebtoonsDetail',
                                id: $route.params.id,
                                background_image: background_image,
                            }" />
                    </div>
                    <div class="no-data-wrapper" v-if="isAwardData && awardDetails.length == 0">
                        <p>{{ $t("searchResults.noData") }}</p>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import BannerCardTwo from "@/components/BannerCardTwo.vue";
import AwardList from "@/components/Details/AwardList.vue";
import AwardServices from "@/services/AwardServices.js";
import { onMounted, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { inject } from "vue";
import i18n from "@/config/i18n";
const { t } = i18n.global;
const route = useRoute();
const title = ref("");
const webtoonId = route.params.id;
const posterImage = ref("");
const background_image = ref("");
const awardDetails = ref("");
const isAwardData = ref(false);
const common = inject("common");

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
    AwardServices.getDetailPageAwardList(webtoonId, 'webtoons')
        .then((res) => {
            if (res.status == 200) {
                isAwardData.value = true;
                awardDetails.value = res.data.results;
                background_image.value = res.data.bg_image ? res.data.bg_image : res.data.poster_image ? res.data.poster_image : "";
                posterImage.value = res.data.poster_image ? res.data.poster_image : "";
                title.value = res.data.item_name;
                window.document.title = `${res.data.item_name} - ${t("header.mainMenu.Awards")} - 11DB`;
            } else {
                isAwardData.value = true
            }
        })
        .catch((err) => {
            console.log(err)
            return;
        });
};

</script>
