<template>
    <div class="video-popular-sec">
        <div class="container">
            <h2>{{ $t("videos.trailerVideo") }}</h2>
            <div class="video-popular-row">
                <div class="media-otr vd-popular">
                    <VideoContentCard v-for="(item, index) in videoList" :video="item" :key="index"
                        @videoOpen="updateView" videoType="trailer" />
                    <div v-if="isLoading"></div>
                    <div ref="bottom"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VideoContentCard from '@/components/VideoContentCard.vue';
import { onMounted, ref, watch } from "@vue/runtime-core";
import VideoService from "@/services/VideoService.js";
import { inject } from "vue";
import { validateVimeoURL, matchYoutubeUrl } from "@/mixins/CommonValidation.js";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const videoList = ref([]);
const page = ref(1);
const limit = ref(20);
const observer = ref(null);
const isLoading = ref(false);
const bottom = ref(null);
const common = inject("common");

watch(
    () => common.state.SelectedLang,
    function (newVal, oldVal) {
        if (newVal && oldVal && newVal != oldVal) {
            page.value = 1;
            videoList.value = [];
            getVideoList();
        }
    }
);

onMounted(() => {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    localStorage.removeItem("saveIdList");
    observeWindow();
});

const observeWindow = () => {
    observer.value = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !isLoading.value) {
                getVideoList();
            }
        },
        { threshold: 0 }
    );
    observer.value.observe(bottom.value);
};

// award info
const getVideoList = () => {
    isLoading.value = true;
    let data = {
        page: page.value,
        limit: limit.value,
        type: "trailer"
    };
    VideoService.getPopularList(data)
        .then((res) => {
            if (res.status == 200) {
                Array.from(res.data.result).forEach((item, i) => {
                    res.data.result[i]["videoid"] =
                        validateVimeoURL(item.video_path) ||
                        matchYoutubeUrl(item.video_path);
                    res.data.result[i]["link"] = item.video_path;
                    if (validateVimeoURL(item.video_path)) {
                        res.data.result[i]["type"] = "vimeo";
                    } else {
                        res.data.result[i]["type"] = "youtube";
                    }
                });
                videoList.value = [...videoList.value, ...res.data.result];
                if (res.data.total_records > videoList.value.length) {
                    page.value = page.value + 1;
                    isLoading.value = false;
                }
            }
        })
        .catch((err) => {
            console.log(err)
            return;
        });
};

const updateView = (video) => {
    let data = {
        video_id: video.video_id,
        user_session_id: cookies.get("userCookie")
    };
    VideoService.updateVideoView(data, common.state.myIP)
        .then((res) => {
            if (res.status == 200) {

            }
        })
        .catch((err) => {
            console.log(err)
            return;
        });
}
</script>