<template>
  <a @click="openVideo(video)" class="media-innr" :id="'video' + video?.videoid">
    <div class="media-pic">
      <figure class="img">
        <img v-if="video?.thumb" :src="video?.thumb" alt="" />
        <img v-else src="@/assets/images/video-no-image.png" alt="" />
      </figure>
      <p v-if="formatChanged">
        <span><img src="@/assets/icons/play-btn.svg" alt="" /></span>
        {{ duration ? duration : '00:00' }}
      </p>
      <p v-else>
        <span><img src="@/assets/icons/play-btn.svg" alt="" /></span>
        {{ video?.time ? video?.time : '00:00' }}
      </p>
    </div>
    <h5 :title="video?.title">{{ video?.title }}</h5>
  </a>

  <div class="new-cast-modal add-img-modal new-media-modal" v-show="isImageModal">
    <PopUpModal :isModal="isImageModal">
      <template v-slot:header>
        <h1>{{ $t("myPage.videoCard.videoPreview") }}</h1>
        <button @click="isImageModal = false">
          <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
        </button>
      </template>
      <template v-slot:body>
        <div class="video-pannel">
          <iframe :src="selectedUrl" width="100%" height="100%" frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"></iframe>
        </div>
      </template>
    </PopUpModal>
  </div>
</template>

<script>
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import { secondsToHms } from "@/mixins/CommonFunctions.js";
import VideoService from "@/services/VideoService.js";
export default {
  name: "VideoCard",
  components: {
    PopUpModal,
  },
  props: {
    video: Object,
    formatChanged: String
  },
  inject: ["common"],
  emits: ["isGetError"],
  data() {
    return {
      isImageModal: false,
      selectedUrl: "",
      thumbnail: "",
      duration: 0,
    };
  },
  mounted() {
    if (this.formatChanged) {
      this.vimeo_parser(this.video);
    }
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
      this.isImageModal = true;
      this.updateView(item);
      if (item.type == "youtube") {
        this.selectedUrl = "https://www.youtube.com/embed/" + item.videoid;
      } else {
        this.selectedUrl = `https://player.vimeo.com/video/${item.videoid}`;
      }
    },

    // getting thumbnail image youtube nad video
    vimeo_parser(video) {
      if (video.type == "vimeo") {
        this.duration = this.secondsToHms(video.time);
      } else {
        if (video?.time) {
          // Remove the "PT" prefix from the duration
          let timing = video?.time?.replace("PT", "");

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
    // second to HMS
    secondsToHms,
  },
};
</script>
