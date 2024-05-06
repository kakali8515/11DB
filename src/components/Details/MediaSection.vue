<template>
  <div class="tab-outr small" v-if="!isPeoplePoster">
    <TabWrapper
      :activeTab="videos?.length > 0 ? 'addNewPeople.mediadetails.videoTitle' : images?.length > 0 ? 'mediaSection.images' : posters?.length > 0 ? 'addNewMoviesForm.poster' : 'addNewPeople.mediadetails.videoTitle'"
      v-if="videos?.length > 0 || images?.length > 0 || posters?.length > 0">
      <Tabs title="addNewPeople.mediadetails.videoTitle">
        <div class="lists tab-scroll moble video-panel-outer" v-if="videos.length > 0">
          <div class="media-otr md-3">
            <VideoCard v-for="(item, i) in videos" :key="videoComponent" :video="item" @isGetError="updateVideoData" />
          </div>
          <router-link to @click="$emit('navigation')" class="more-content">
            <img src="@/assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
            <img src="@/assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
          </router-link>
        </div>
        <div class="no-data-wrapper" v-else>
          <p>{{ $t("searchResults.noData") }}</p>
        </div>
      </Tabs>
      <Tabs title="mediaSection.images">
        <div class="lists tab-scroll moble media-imgs details-images" v-if="images.length > 0">
          <div class="image-otr">
            <ImageCard v-for="(image, index) in images" :key="index" :image="image" />
          </div>
          <router-link to @click="$emit('navigation')" class="more-content">
            <img src="@/assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
            <img src="@/assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
          </router-link>
        </div>
        <div class="no-data-wrapper" v-else>
          <p>{{ $t("searchResults.noData") }}</p>
        </div>
      </Tabs>
      <Tabs title="addNewMoviesForm.poster">
        <div class="lists tab-scroll moble media-poster" v-if="posters?.length > 0">
          <div class="image-otr">
            <PosterCard v-for="(poster, index) in posters" :key="index" :poster="poster" />
          </div>
          <router-link to @click="$emit('navigation')" class="more-content">
            <img src="@/assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
            <img src="@/assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
          </router-link>
        </div>
        <div class="no-data-wrapper" v-else>
          <p>{{ $t("searchResults.noData") }}</p>
        </div>
      </Tabs>
    </TabWrapper>
    <div class="no-data-wrapper" v-else>
      <p>{{ $t("searchResults.noData") }}</p>
    </div>
  </div>
  <div class="tab-outr small" v-else>
    <TabWrapper
      :activeTab="videos?.length > 0 ? 'addNewPeople.mediadetails.videoTitle' : images?.length > 0 ? 'mediaSection.images' : 'addNewPeople.mediadetails.videoTitle'"
      v-if="videos?.length > 0 || images?.length > 0">
      <Tabs title="addNewPeople.mediadetails.videoTitle">
        <div class="lists tab-scroll moble video-panel-outer" v-if="videos.length > 0">
          <div class="media-otr md-3">
            <VideoCard v-for="(item, i) in videos" :key="i" :video="item" @isGetError="updateVideoData" formatChanged="yes" />
          </div>
          <router-link to @click="$emit('navigation')" class="more-content">
            <img src="@/assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
            <img src="@/assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
          </router-link>
        </div>
        <div class="no-data-wrapper" v-else>
          <p>{{ $t("searchResults.noData") }}</p>
        </div>
      </Tabs>
      <Tabs title="mediaSection.images">
        <div class="lists tab-scroll moble media-imgs" v-if="images.length > 0">
          <div class="image-otr ">
            <ImageCard v-for="(image, index) in images" :key="index" :image="image" />
          </div>
          <router-link to @click="$emit('navigation')" class="more-content">
            <img src="@/assets/icons/right-arrow-solid.svg" alt="more" class="white-image" />
            <img src="@/assets/icons/solid-right-arrow.svg" alt="more" class="red-image" />
          </router-link>
        </div>
        <div class="no-data-wrapper" v-else>
          <p>{{ $t("searchResults.noData") }}</p>
        </div>
      </Tabs>
    </TabWrapper>
    <div class="no-data-wrapper" v-else>
      <p>{{ $t("searchResults.noData") }}</p>
    </div>
  </div>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import VideoCard from "@/components/MyPage/VideoCard.vue";
import ImageCard from "@/components/MyPage/ImageCard.vue";
import PosterCard from "@/components/MyPage/PosterCard.vue";
import { ref } from "@vue/reactivity";
export default {
  name: "MediaSection",
  components: {
    Tabs,
    TabWrapper,
    VideoCard,
    ImageCard,
    PosterCard,
  },
  props: {
    videos: Array,
    images: Array,
    posters: Array,
    isPeoplePoster: Boolean,
  },
  setup(props) {
    const videoComponent = ref(0);
    const updateVideoData = (video) => {
      let data2 = props.videos.find((f) => {
        return f.videoid == video.videoid;
      });
      props.videos.splice(props.videos.indexOf(data2), 1);
      videoComponent.value++;
    }
    return {
      updateVideoData,
      videoComponent
    };
  },
};
</script>
