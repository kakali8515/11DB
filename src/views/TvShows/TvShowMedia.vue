<template>
  <div>
    <BannerCardTwo :bannerInfo="{
      imgUrl: posterImage,
      link: 'TvShowsDetails',
      id: $route.params.id,
      background_image: background_image,
    }">
      <h3>
        {{ title }}<span v-if="season_name">{{ season_name }}</span>
      </h3>
    </BannerCardTwo>
    <div class="container">
      <div class="movies-media media__details">
        <div class="mypage-rght">
          <div class="media-heading">
            <h2>{{ $t("addNewMoviesForm.media") }}</h2>
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
                <div class="image-otr" v-if="newPosterResult.length > 0">
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
import {
  onBeforeMount,
  onMounted,
  ref,
  watch,
  onUnmounted,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import TVShowsDetailsService from "@/services/TVShowsDetailsService";
import { inject } from "vue";
import { validateVimeoURL, matchYoutubeUrl } from "@/mixins/CommonValidation.js";
import { youtube_parser } from "@/mixins/CommonFunctions.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;
export default {
  name: "TvShowMedia",
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
    const tvId = route.params.id;
    const background_image = ref("");
    const seasonId = route.params.season_id;
    const season_name = ref("");
    const newImageResult = ref([]);
    const newVideoResult = ref([]);
    const newPosterResult = ref([]);
    const page = ref(1);
    const selectTab = ref("addNewPeople.mediadetails.videoTitle");
    const common = inject("common");
    const isData = ref(false);
    const isImageData = ref(false);
    const isPosterData = ref(false);
    const videoComponent = ref(0);
    const isEdit = ref("");

    // Function for video details
    const mediaVideoDetails = async (_id, _page) => {
      let data = {
        id: Number(_id),
        season_id: Number(seasonId),
        type: "video",
        page: _page,
        limit: 20,
      };
      try {
        let response = await TVShowsDetailsService.getMediaDetails(data);
        if (response.status == 200) {
          isData.value = true;
          videos.value = response.data.tv_season_meadia_list;
          Array.from(response.data.tv_season_meadia_list).forEach((item, i) => {
            videos.value[i]["videoid"] =
              validateVimeoURL(item.video_link) ||
              matchYoutubeUrl(item.video_link);
            videos.value[i]["link"] = item.video_link;
            videos.value[i]["title"] = item.video_name;
            videos.value[i]["time"] = item.video_time;
            videos.value[i]["thumb"] = item.video_thumb;
            if (validateVimeoURL(item.video_link)) {
              videos.value[i]["type"] = "vimeo";
            } else {
              videos.value[i]["type"] = "youtube";
            }
          });

          videoCount.value = response.data.total_records;
          newVideoResult.value.push(...videos.value);
          posterImage.value = response.data.title_poster_image;
          title.value = response.data.title_name;
          window.document.title = `${response.data.title_name} - ${response.data.season_name} - ${t("addNewMoviesForm.media")} - 11DB`;
          isEdit.value = response.data.is_edit;
          background_image.value = response.data.background_image ? response.data.background_image : response.data.title_poster_image ? response.data.title_poster_image : "";
          season_name.value = response.data.season_name;
        }
      } catch (error) {
        console.warn(error);
      }
    };

    // Function for image details
    const mediaImageDetails = async (_id, _page) => {
      let data = {
        id: Number(_id),
        season_id: Number(seasonId),
        type: "image",
        page: _page,
        limit: 20,
      };
      try {
        let response = await TVShowsDetailsService.getMediaDetails(data);
        if (response.status == 200) {
          isImageData.value = true;
          images.value = response.data.tv_season_meadia_list;
          imageCount.value = response.data.total_records;
          season_name.value = response.data.season_name;
          title.value = response.data.title_name;
          window.document.title = `${response.data.title_name} - ${response.data.season_name} - ${t("addNewMoviesForm.media")} - 11DB`;
          isEdit.value = response.data.is_edit;
          posterImage.value = response.data.title_poster_image;
          newImageResult.value.push(...images.value);
          background_image.value = response.data.background_image ? response.data.background_image : response.data.title_poster_image ? response.data.title_poster_image : "";
        }
      } catch (error) {
        console.warn(error);
      }
    };

    // Function for poster details
    const mediaPosterDetails = async (_id, _page) => {
      let data = {
        id: Number(_id),
        season_id: Number(seasonId),
        type: "poster",
        page: _page,
        limit: 20,
      };
      try {
        let response = await TVShowsDetailsService.getMediaDetails(data);
        if (response.status == 200) {
          isPosterData.value = true;
          posters.value = response.data.tv_season_meadia_list;
          posters.value.forEach((item, i) => {
            item["link"] = item.poster_image_link;
          });
          newPosterResult.value.push(...posters.value);
          posterCount.value = response.data.total_records;
          season_name.value = response.data.season_name;
          posterImage.value = response.data.title_poster_image;
          title.value = response.data.title_name;
          window.document.title = `${response.data.title_name} - ${response.data.season_name} - ${t("addNewMoviesForm.media")} - 11DB`;
          isEdit.value = response.data.is_edit;
          background_image.value = response.data.background_image ? response.data.background_image : response.data.title_poster_image ? response.data.title_poster_image : "";
        }
      } catch (error) {
        console.warn(error);
      }
    };

    // To add media video page
    const toAddMediaVideo = () => {
      router.push({
        name: "AddNewTVDetails",
        params: {
          external_id: tvId,
          type: "internal",
          itemActive: "media",
          activeIndex: "3",
        },
      });
      localStorage.setItem(
        "tvBackPage",
        "/tvshows/details-media/" + tvId + "/" + seasonId
      );
    };

    // When clicked on tab then...
    const selectedTab = (tab) => {
      isData.value = false;
      isImageData.value = false;
      isPosterData.value = false;
      selectTab.value = tab;
      page.value = 1;
      if (tab == "mediaSection.images") {
        newImageResult.value = [];
        mediaImageDetails(tvId, 1);
      }
      if (tab == "addNewPeople.mediadetails.videoTitle") {
        newVideoResult.value = [];
        mediaVideoDetails(tvId, 1);
      }
      if (tab == "addNewMoviesForm.poster") {
        newPosterResult.value = [];
        mediaPosterDetails(tvId, 1);
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
            mediaVideoDetails(tvId, newPage);
          }, 100);
        }
      }
      if (selectTab.value == "mediaSection.images") {
        if (bottomOfWindow && imageCount.value > newImageResult.value.length) {
          let newPage = ++page.value;
          setTimeout(() => {
            mediaImageDetails(tvId, newPage);
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
            mediaPosterDetails(tvId, newPage);
          }, 100);
        }
      }
    };

    // Lifecycle hooks
    onBeforeMount(() => {
      mediaVideoDetails(tvId, 1);
      setTimeout(() => {
        if (newVideoResult.value.length == 0) {
          selectTab.value = "mediaSection.images";
          mediaImageDetails(tvId, 1);
        }
      }, 200);
      setTimeout(() => {
        if (newImageResult.value.length == 0) {
          selectTab.value = "addNewMoviesForm.poster";
          mediaPosterDetails(tvId, 1);
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
            if (selectTab.value == "mediaSection.images") {
              newImageResult.value = [];
              page.value = 1;
              mediaImageDetails(tvId, 1);
            }
            if (selectTab.value == "addNewPeople.mediadetails.videoTitle") {
              newVideoResult.value = [];
              page.value = 1;
              mediaVideoDetails(tvId, 1);
            }
            if (selectTab.value == "addNewMoviesForm.poster") {
              newPosterResult.value = [];
              page.value = 1;
              mediaPosterDetails(tvId, 1);
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
      season_name,
      newVideoResult,
      newImageResult,
      newPosterResult,
      selectedTab,
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
