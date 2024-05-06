<template>
    <a href="javascript:void(0);" class="media-innr">
        <div class="media-pic" @click="openVideo(video)">
            <figure class="img">
                <img v-if="video.video_thumb" :src="video.video_thumb" alt="" />
                <img v-else src="@/assets/images/video-no-image.png" alt="" />
                <span class="defaults" v-if="videoType == 'trailer'"><img src="../assets/icons/vid-tags.svg" /></span>
            </figure>
            <p><span><img src="@/assets/icons/play-btn.svg" alt="" /></span> {{ duration ? duration : '00:00' }}</p>
        </div>
        <h5 :title="video.video_title">{{ video.video_title }}</h5>
        <h6 @click="navigateToDetails(video)" :title="video.title_name">{{ video.title_name }}</h6>
        <ul>
            <li>{{ dateformat(video.registration_date) }}</li>
            <li>{{ $t("videos.view") }} {{ video.no_of_views ? video.no_of_views.toLocaleString("en-US") : 0 }}</li>
        </ul>
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
export default {
    name: "VideoContentCard",
    components: {
        PopUpModal,
    },
    props: {
        video: Object,
        videoType: String
    },
    inject: ["common"],
    emits: ["isGetError", "videoOpen"],
    data() {
        return {
            isVideoModal: false,
            selectedUrl: "",
            thumbnail: "",
            duration: 0,
            views: 0
        };
    },
    mounted() {
        this.vimeo_parser(this.video);
    },
    methods: {
        // video preview
        openVideo(item) {
            this.isVideoModal = true;
            this.$emit("videoOpen", item);
            if (item.type == "youtube") {
                this.selectedUrl = "https://www.youtube.com/embed/" + item.videoid;
            } else {
                this.selectedUrl = `https://player.vimeo.com/video/${item.videoid}`;
            }
        },
        // getting thumbnail image youtube nad video
        vimeo_parser(video) {
            if (video.video_source == "vimeo") {
                this.duration = this.secondsToHms(video.video_time);
            } else {
                if (video?.video_time) {
                    // Remove the "PT" prefix from the duration
                    let timing = video?.video_time?.replace("PT", "");

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
            };
        },
        secondsToHms,
        dateformat,

        navigateToDetails(video) {
            if (video.item_type == "tv") {
                this.$router.push({
                    name: 'TvShowsDetails',
                    params: { id: video.item_id, pageTitle: video.title_name },
                });
            } else if (video.item_type == "movie") {
                this.$router.push({
                    name: 'MoviesDetails',
                    params: { id: video.item_id, pageTitle: video.title_name },
                });
            } else if (video.item_type == "webtoons") {
                this.$router.push({
                    name: 'WebtoonsDetail',
                    params: { id: video.item_id, pageTitle: video.title_name },
                });
            } else if (video.item_type == "people") {
                this.$router.push({
                    name: 'PeopleDetails',
                    params: { id: video.item_id, pageTitle: video.title_name },
                });
            }
        }
    },
};
</script>