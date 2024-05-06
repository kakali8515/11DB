<template>
  <div>
    <BannerCardTwo :bannerInfo="{
      imgUrl: posterImage,
      link: 'MoviesDetails',
      id: $route.params.id,
      background_image: background_image,
    }">
      <h3>{{ title }}</h3>
    </BannerCardTwo>
    <div class="container">
      <div class="movies-media media__details">
        <div class="mypage-rght">
          <div class="media-heading">
            <h2>{{ $t("addNewPeople.media") }}</h2>
            <button class="edit-button" @click="toAddMediaVideo" v-if="common.state.is_admin == 'y' && isEdit == 'y'">
              {{ $t("general.editButton") }}
            </button>
          </div>

          <div class="tab-outr">
            <TabWrapper @selectedTab="selectedTab"
              :activeTab="newVideoResult?.length > 0 ? 'addNewPeople.mediadetails.videoTitle' : newImageResult?.length > 0 ? 'mediaSection.images' : newPosterResult?.length > 0 ? 'addNewMoviesForm.poster' : 'addNewPeople.mediadetails.videoTitle'"
              v-if="newVideoResult?.length > 0 || newImageResult?.length > 0 || newPosterResult?.length > 0">
              <Tabs title="addNewPeople.mediadetails.videoTitle">
                <div class="media-otr movies-media-outer" v-if="newVideoResult.length > 0">
                  <template v-for="(video, index) in newVideoResult" :key="videoComponent">
                    <VideoCard :video="video" @isGetError="updateVideoData" />
                  </template>
                </div>
                <div class="no-data-wrapper" v-if="isData && newVideoResult.length == 0">
                  <p>{{ $t("searchResults.noData") }}</p>
                </div>
              </Tabs>
              <Tabs title="mediaSection.images">
                <div class="image-otr" v-if="newImageResult.length > 0">
                  <template v-for="(image, index) in newImageResult" :key="index">
                    <ImageCard :image="image" />
                  </template>
                </div>
                <div class="no-data-wrapper" v-if="isImageData && newImageResult.length == 0">
                  <p>{{ $t("searchResults.noData") }}</p>
                </div>
              </Tabs>
              <Tabs title="addNewMoviesForm.poster">
                <div class="image-otr post-outer" v-if="newPosterResult.length > 0">
                  <template v-for="(poster, index) in newPosterResult" :key="index">
                    <PosterCard :poster="poster" />
                  </template>
                </div>
                <div class="no-data-wrapper" v-if="isPosterData && newPosterResult.length == 0">
                  <p>{{ $t("searchResults.noData") }}</p>
                </div>
              </Tabs>
            </TabWrapper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import BannerCardTwo from "@/components/BannerCardTwo.vue";
import VideoCard from "@/components/MyPage/VideoCard.vue";
import ImageCard from "@/components/MyPage/ImageCard.vue";
import PosterCard from "@/components/MyPage/PosterCard.vue";
import MoviesDetailsService from "@/services/MoviesDetailsService.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import {
  onBeforeMount,
  onMounted,
  ref,
  watch,
  onUnmounted,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import {
  validateVimeoURL,
  matchYoutubeUrl,
} from "@/mixins/CommonValidation.js";
import { youtube_parser } from "@/mixins/CommonFunctions.js"
export default {
  name: "MoviesMedia",
  emits: ["on-current-theme-change"],
  components: {
    Tabs,
    TabWrapper,
    BannerCardTwo,
    VideoCard,
    ImageCard,
    PosterCard,
  },
  mixins: [matchYoutubeUrl, validateVimeoURL, youtube_parser],

  setup() {
    const route = useRoute();
    const router = useRouter();
    const posterImage = ref("");
    const title = ref("");
    const videos = ref([]);
    const videoCount = ref(0);
    const images = ref([]);
    const imageCount = ref(0);
    const posters = ref([]);
    const posterCount = ref(0);
    const movieId = route.params.id;
    const background_image = ref("");
    const newVideoResult = ref([]);
    const page = ref(1);
    const selectTab = ref("addNewPeople.mediadetails.videoTitle");
    const newImageResult = ref([]);
    const newPosterResult = ref([]);
    const common = inject("common");
    const isData = ref(false);
    const isImageData = ref(false);
    const isPosterData = ref(false);
    const videoComponent = ref(0);
    const isEdit = ref("");

    // Function for video details
    const mediaVideoDetails = async (_id, _page) => {
      let data = { id: Number(_id), type: "video", page: _page, limit: 20 };
      try {
        let response = await MoviesDetailsService.getMediaDetails(data);
        if (response.status == 200) {
          isData.value = true;
          videos.value = response.data.results;
          Array.from(response.data.results).forEach((item, i) => {
            videos.value[i]["videoid"] =
              validateVimeoURL(item.link) || matchYoutubeUrl(item.link);
            if (validateVimeoURL(item.link)) {
              videos.value[i]["type"] = "vimeo";
            } else {
              videos.value[i]["type"] = "youtube";
            }
          });
          videoCount.value = response.data.total_records;
          newVideoResult.value.push(...videos.value);

          posterImage.value = response.data.poster_image;
          title.value = response.data.title;
          window.document.title = `${response.data.title} - ${t("addNewPeople.media")} - 11DB`;
          isEdit.value = response.data.is_edit;
          background_image.value = response.data.background_image ? response.data.background_image : response.data.poster_image ? response.data.poster_image : "";
        }
      } catch (error) {
        console.warn(error);
      }
    };

    // Function for image details
    const mediaImageDetails = async (_id, _page) => {
      let data = { id: Number(_id), type: "image", page: _page, limit: 20 };
      try {
        let response = await MoviesDetailsService.getMediaDetails(data);
        if (response.status == 200) {
          isImageData.value = true;
          images.value = response.data.results;
          imageCount.value = response.data.total_records;
          title.value = response.data.title;
          window.document.title = `${response.data.title} - ${t("addNewPeople.media")} - 11DB`;
          isEdit.value = response.data.is_edit;
          newImageResult.value.push(...images.value);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    // Function for poster details
    const mediaPosterDetails = async (_id, _page) => {
      let data = { id: Number(_id), type: "poster", page: _page, limit: 20 };
      try {
        let response = await MoviesDetailsService.getMediaDetails(data);
        if (response.status == 200) {
          isPosterData.value = true;
          posters.value = response.data.results;
          posterCount.value = response.data.total_records;
          title.value = response.data.title;
          window.document.title = `${response.data.title} - ${t("addNewPeople.media")} - 11DB`;
          isEdit.value = response.data.is_edit;
          newPosterResult.value.push(...posters.value);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    // To add media video page
    const toAddMediaVideo = () => {
      router.push({
        name: "AddNewMovieForm",
        params: {
          external_id: movieId,
          type: "internal",
          itemActive: "media",
          activeIndex: "1",
        },
      });
      localStorage.setItem("movieBackPage", "/movies-media/" + movieId);
    };

    // When clicked on tab then...
    const selectedTab = (tab) => {
      selectTab.value = tab;
      isData.value = false;
      isImageData.value = false;
      isPosterData.value = false;
      page.value = 1;
      if (tab == "mediaSection.images") {
        newImageResult.value = [];
        mediaImageDetails(movieId, 1);
      }
      if (tab == "addNewPeople.mediadetails.videoTitle") {
        newVideoResult.value = [];
        mediaVideoDetails(movieId, 1);
      }
      if (tab == "addNewMoviesForm.poster") {
        newPosterResult.value = [];
        mediaPosterDetails(movieId, 1);
      }
    };

    // infinite scroll
    const onScroll = () => {
      let bottomOfWindow =
        document.documentElement.offsetHeight + 1 +
        document.documentElement.scrollTop >=
        document.documentElement.scrollHeight;
      if (selectTab.value == "addNewPeople.mediadetails.videoTitle") {
        if (bottomOfWindow && videoCount.value > newVideoResult.value.length) {
          let newPage = ++page.value;
          setTimeout(() => {
            mediaVideoDetails(movieId, newPage);
          }, 100);
        }
      }
      if (selectTab.value == "mediaSection.images") {
        if (bottomOfWindow && imageCount.value > newImageResult.value.length) {
          let newPage = ++page.value;
          setTimeout(() => {
            mediaImageDetails(movieId, newPage);
          }, 100);
        }
      }
      if (selectTab.value == "addNewMoviesForm.poster") {
        if (
          bottomOfWindow &&
          posterCount.value > newPosterResult.value.length
        ) {
          let newPage = ++page.value;
          setTimeout(() => {
            mediaPosterDetails(movieId, newPage);
          }, 100);
        }
      }
    };

    // Lifecycle hooks
    onBeforeMount(() => {
      mediaVideoDetails(movieId, 1);
      setTimeout(() => {
        if (newVideoResult.value.length == 0) {
          selectTab.value = "mediaSection.images";
          mediaImageDetails(movieId, 1);
        }
      }, 300);
      setTimeout(() => {
        if (newImageResult.value.length == 0) {
          selectTab.value = "addNewMoviesForm.poster";
          mediaPosterDetails(movieId, 1);
        }
      }, 500);
    });

    onMounted(() => {
      window.addEventListener("scroll", onScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
    }),
      // on language change
      watch(
        () => common.state.SelectedLang,
        function (newVal, oldVal) {
          if (newVal && oldVal && newVal != oldVal) {
            isData.value = false;
            isImageData.value = false;
            isPosterData.value = false;
            console.log(selectTab.value)
            if (selectTab.value == "mediaSection.images") {
              newImageResult.value = [];
              page.value = 1;
              mediaImageDetails(movieId, 1);
            }
            if (selectTab.value == "addNewPeople.mediadetails.videoTitle") {
              newVideoResult.value = [];
              page.value = 1;
              mediaVideoDetails(movieId, 1);
            }
            if (selectTab.value == "addNewMoviesForm.poster") {
              newPosterResult.value = [];
              page.value = 1;
              mediaPosterDetails(movieId, 1);
            }
          }
        }
      );

    const updateVideoData = (video) => {
      let data2 = newVideoResult.value.find((f) => {
        return f.videoid == video.videoid;
      });
      newVideoResult.value.splice(newVideoResult.value.indexOf(data2), 1);
      videoComponent.value++;
    }

    return {
      videos,
      images,
      posters,
      videoCount,
      imageCount,
      posterCount,
      posterImage,
      title,
      toAddMediaVideo,
      background_image,
      selectedTab,
      newVideoResult,
      newImageResult,
      newPosterResult,
      onScroll,
      isData,
      isImageData,
      isPosterData,
      updateVideoData,
      videoComponent,
      common,
      isEdit
    };
  },
};
</script>
