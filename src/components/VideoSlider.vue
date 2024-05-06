<template>
  <swiper :modules="modules" :slidesPerView="4" :spaceBetween="20" :autoplay="true" :speed="2000" navigation :breakpoints="{
    '0': {
      slidesPerView: 1,
    },
    '576': {
      slidesPerView: 2,
    },
    '992': {
      slidesPerView: 3,
    },
    '1200': {
      slidesPerView: 4,
    },
  }" class="video-swiper">
    <template v-for="(item, i) in videos" :key="i">
      <swiper-slide v-if="item.videoid">
        <CardThree :video="item" @videoOpen="openModal" @isGetError="updateVideoData" :key="sliderComponent" />
      </swiper-slide>
    </template>
  </swiper>

  <div class="new-cast-modal add-img-modal" v-show="isImageModal">
    <PopUpModal :isModal="isImageModal">
      <template v-slot:header>
        <h1>{{ $t("myPage.videoCard.videoPreview") }}</h1>
        <button @click="isImageModal = false">
          <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
        </button>
      </template>
      <template v-slot:body>
        <iframe :src="selectedUrl" width="680" height="360" frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"></iframe>
      </template>
    </PopUpModal>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// import Swiper core and required modules
import { Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import CardThree from "@/components/CardThree.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";

import { ref } from "@vue/reactivity";
export default {
  name: "VideoSlider",
  components: {
    Swiper,
    SwiperSlide,
    Navigation,
    Autoplay,
    CardThree,
    PopUpModal,
  },
  props: {
    videos: Array,
  },
  setup(props) {
    const isImageModal = ref(false);
    const selectedUrl = ref('');
    const sliderComponent = ref(0);
    const openModal = (val) => {
      isImageModal.value = true;
      selectedUrl.value = val;
    }

    const updateVideoData = (video) => {
      let data2 = props.videos.find((f) => {
        return f.videoid == video.videoid;
      });
      props.videos.splice(props.videos.indexOf(data2), 1);
      sliderComponent.value++;
    }
    return {
      modules: [Navigation, Autoplay],
      isImageModal,
      openModal,
      selectedUrl,
      updateVideoData,
      sliderComponent
    };
  },
};
</script>
  