<template>
  <swiper :modules="modules" :slidesPerView="2" :grid="{
    rows: connection_list?.length > 2 ? 2 : 1,
  }" :spaceBetween="17" :autoplay="true" :speed="2000" navigation :pagination="{ clickable: true }" :breakpoints="{
  '0': {

  },
  '992': {

  },
}" @swiper="onSwiper" @slideChange="onSlideChange" class="image-swiper">
    <swiper-slide v-for="(connection, index) in connection_list" :key="index">
      <SliderContent :connection="connection" :componentType="componentType" :sliderType="sliderType" />
    </swiper-slide>
    <!-- <swiper-slide>
        <SliderContent /> 
      </swiper-slide> -->
  </swiper>
</template>
<script>

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// import Swiper core and required modules
import { Grid, Navigation, Pagination, Autoplay } from 'swiper';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SliderContent from "@/components/SliderContent.vue";


export default {
  name: 'Slider',
  components: {
    Swiper,
    SwiperSlide,
    Grid,
    Pagination,
    Navigation,
    Autoplay,
    SliderContent
  },
  props: {
    connection_list: Array,
    componentType: String,
    sliderType: String
  },
  setup() {
    const onSwiper = (swiper) => {
      // console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Grid, Navigation, Pagination, Autoplay]
    };
  },
};
</script>
  