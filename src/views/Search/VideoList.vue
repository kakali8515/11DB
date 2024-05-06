<template>
    <a href="javascript:void(0)">
        <span @click="openVideo(video);" class="video-image-list">
            <img v-if="video.video_thumb" :src="video.video_thumb" alt="video" class="video-img" />
            <img v-else src="@/assets/images/video-no-image.png" alt="" class="video-img" />
            <div class="play-btn">
                <img src="/src/assets/icons/play.svg" alt="play" />
                <p>{{ duration ? duration : '00:00' }}</p>
            </div>
        </span>
        <h3 :title="video.video_title">{{ video.video_title }}</h3>
        <p :title="video.title_name"> {{ video.title_name }}</p>
        <div class="news-date">
            <p>{{ $t("videos.view") }} {{ video.no_of_views ? video.no_of_views.toLocaleString("en-US") : 0 }}<span>{{
                dateformat(video.registration_date) }}</span>
            </p>
        </div>
    </a>

    <div class="new-cast-modal add-img-modal" v-show="isVideoModal">
        <PopUpModal :isModal="isVideoModal">
            <template v-slot:header>
                <h1>{{ $t("videoThumb.videoPreview") }}</h1>
                <button @click="isVideoModal = false">
                    <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
                </button>
            </template>
            <template v-slot:body>
                <div class="video-pannel">
                    <iframe :src="selectedUrl + '?autoplay=1'" width="100%" height="100%" frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"></iframe>
                </div>
            </template>
        </PopUpModal>
    </div>
</template>
<script>
import { secondsToHms, dateformat } from "@/mixins/CommonFunctions.js";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import VideoService from "@/services/VideoService.js";
export default {
    name: "VideoList",
    components: {
        PopUpModal,
    },
    props: {
        video: Object,
    },
    inject: ["common"],
    emits: ["isGetError","videoData"],
    data() {
        return {
            isVideoModal: false,
            selectedUrl: "",
            duration: 0,
            views: 0
        };
    },
    mounted() {
        this.vimeo_parser(this.video);
    },
    methods: {
        updateView(video) {
            let data = {
                video_id: video.id || video.video_id,
                user_session_id: this.$cookies.get("userCookie")
            };
            VideoService.updateVideoView(data, this.common.state.myIP)
                .then((res) => {
                    if (res.status == 200) {

                    }
                })
                .catch((err) => {
                    console.log(err)
                    return;
                });
        },
        // video preview
        openVideo(item) {
            this.isVideoModal = true;
            this.$emit('videoData',item)
            this.updateView(item);
            if (item.type == "youtube") {
                this.selectedUrl = "https://www.youtube.com/embed/" + item.videoid;
            } else {
                this.selectedUrl = `https://player.vimeo.com/video/${item.videoid}`;
            }
        },
        // getting thumbnail image youtube nad video
        vimeo_parser(video) {
            if (video.video_source == "vimeo") {
                this.duration = this.secondsToHms(video.video_duration);
            } else {
                if (video?.video_duration) {
                    // Remove the "PT" prefix from the duration
                    let timing = video?.video_duration?.replace("PT", "");

                    // Extract the hours, minutes, and seconds from the duration string
                    const hours = parseInt(timing?.substring(0, timing?.indexOf("H")));
                    const minutes = parseInt(timing?.substring(timing?.indexOf("H") + 1, timing?.indexOf("M")));
                    const seconds = parseInt(timing?.substring(timing?.indexOf("M") + 1, timing?.indexOf("S")));
                    let formattedTime = '';
                    // Format the time as "H:MM:SS"
                    if (!hours) {
                        if (!minutes) formattedTime = `00:${seconds.toString().padStart(2, "0")}`;
                        else formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                    } else {
                        formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                    }
                    this.duration = formattedTime;
                }
            }
        },
        secondsToHms,
        dateformat
    },
};
</script>