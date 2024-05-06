<template>
  <div class="video-thumb" v-click-outside="() => ((show = false), (toggle = false))">
    <div class="vidthumb" @dblclick="show = !show">
      <div class="vidposter">
        <img v-if="video.thumbnail" :src="video.thumbnail" alt="" class="video-img" />
        <img v-else src="@/assets/images/video-no-image.png" alt="" class="video-img" />
        <span class="defaults" v-if="video.is_official_trailer == 'y'"><img src="../assets/icons/vid-tags.svg" /></span>
        <div class="play-btn" @click="openVideo(video)">
          <img src="../assets/icons/play.svg" alt="play" />
          <p>{{ duration ? duration : '00:00' }}</p>
        </div>
      </div>
      <div class="overlay" v-if="show"></div>
      <div class="optionmenu" v-if="show" :class="isEdit ? 'isDisabled' : ''" v-click-outside="() => ((show = false))">
        <span @click="toggle = !toggle" :class="isEdit ? 'pointer-events-none' : ''"><img
            src="../assets/icons/ovel-icon.svg" alt="play" /></span>
        <div class="dropstxt" v-show="toggle">
          <span @click="setTrailer">{{
            $t("videoThumb.setofficialTrailer")
          }}</span>
          <span @click="removeItem">{{ $t("videoThumb.Deleted") }}</span>
        </div>
      </div>
    </div>
    <p :title="video.video_title">{{ video.video_title }}</p>
  </div>

  <div class="new-cast-modal add-img-modal" v-show="isImageModal">
    <PopUpModal :isModal="isImageModal">
      <template v-slot:header>
        <h1>{{ $t("videoThumb.videoPreview") }}</h1>
        <button @click="isImageModal = false">
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
import vClickOutside from "click-outside-vue3";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import { secondsToHms } from "@/mixins/CommonFunctions.js";
import VideoService from "@/services/VideoService.js";
export default {
  name: "VideoThumb",
  components: {
    PopUpModal,
  },
  inject: ["common"],
  data() {
    return {
      show: false,
      toggle: false,
      isImageModal: false,
      selectedUrl: "",
      thumbnail: "",
      duration: 0,
    };
  },

  props: {
    video: Object,
    isEdit: Boolean,
  },
  emits: ["removeVideoItem", "setTrailer"],
  directives: {
    clickOutside: vClickOutside.directive,
  },
  mounted() {
    this.vimeo_parser(this.video);
    document.addEventListener('mousedown', function (event) {
      if (event.detail > 1) {
        event.preventDefault();
      }
    }, false);
  },
  methods: {
    removeItem() {
      this.$emit("removeVideoItem", this.video);
      this.toggle = false;
      this.show = false;
    },
    setTrailer() {
      this.$emit("setTrailer", this.video);
      this.toggle = false;
      this.show = false;
    },

    // getting thumbnail image youtube nad video
    vimeo_parser(video) {
      if (video.type == "youtube") {
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

      } else {
        this.duration = secondsToHms(video.video_duration);
      }
    },

    // getting vimeo video duration
    callback(data) {
      var json = JSON.parse(data);
      this.thumbnail = json.thumbnail_url;
      this.duration = secondsToHms(json.duration);
    },

    youtubeDuration(time) {

    },

    // video preview
    openVideo(item) {
      this.isImageModal = true;
      this.updateView(item);
      if (item.type == "youtube") {
        this.selectedUrl = "https://www.youtube.com/embed/" + item.id;
      } else {
        this.selectedUrl = `https://player.vimeo.com/video/${item.id}`;
      }
    },

    updateView(video) {
      if (video.video_id) {
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
      }
    },

    // second to HMS
    secondsToHms,
  },
};
</script>
