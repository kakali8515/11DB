<template>
  <div>
    <a @click="openVideo(video)" class="vd-innr-content" href="javascript:void(0)" :id="'video' + video?.videoid">
      <span>
        <img :src="video?.video_thumb" alt="video" class="video-img" />
        <div class="play-btn">
          <img src="../assets/icons/play.svg" alt="play" />
          <p>{{ video?.video_time }}</p>
        </div>
      </span>
      <p :title="video?.video_title">{{ video?.video_title }}</p>
    </a>
  </div>
</template>

<script>
import { secondsToHms } from "@/mixins/CommonFunctions.js";
import VideoService from "@/services/VideoService.js";
export default {
  name: "CardThree",
  props: {
    video: Object,
  },
  inject: ["common"],
  emits: ["videoOpen", "isGetError"],
  data() {
    return {
      selectedUrl: "",
    };
  },
  mounted() {
    this.vimeo_parser(this.video);
  },
  methods: {
    // video preview
    openVideo(item) {
      if (item.type == "youtube") {
        this.selectedUrl = "https://www.youtube.com/embed/" + item.videoid;
        this.$emit("videoOpen", this.selectedUrl);
      } else {
        this.selectedUrl = `https://player.vimeo.com/video/${item.videoid}`;
        this.$emit("videoOpen", this.selectedUrl);
      }
      this.updateView(item);
    },
    updateView(video) {
      let data = {
        video_id: video.video_id,
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
    // getting thumbnail image youtube nad video
    vimeo_parser(video) {
      if (video.type == "vimeo") {
        if (video.video_thumb == "") {
          this.$emit("isGetError", this.video);
        }
      } else {
        if (video.video_thumb == "") {
          this.$emit("isGetError", this.video);
        }
      }
    },
    secondsToHms,
  },
};
</script>
