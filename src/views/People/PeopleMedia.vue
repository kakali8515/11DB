<template>
  <div>
    <BannerCardTwo :bannerInfo="{
      imgUrl: posterImage,
      link: 'PeopleDetails',
      id: $route.params.id,
      background_image: background_image,
    }">
      <h3>{{ title }}</h3>
    </BannerCardTwo>
    <div class="container">
      <div class="movies-media">
        <div class="mypage-rght">
          <div class="media-heading">
            <h2>{{ $t("addNewPeople.media") }}</h2>
            <button class="edit-button" @click="toAddMediaVideo" v-if="common.state.is_admin=='y' && isEdit == 'y'">
              {{ $t("addNewPeople.editButton") }}
            </button>
          </div>
          <div class="tab-outr">
            <TabWrapper @selectedTab="selectedTab"
              :activeTab="newVideoResult?.length > 0 ? 'addNewPeople.mediadetails.videoTitle' : newImageResult?.length > 0 ? 'mediaSection.images' : 'addNewPeople.mediadetails.videoTitle'"
              v-if="newVideoResult?.length > 0 || newImageResult?.length > 0">
              <Tabs title="addNewPeople.mediadetails.videoTitle">
                <div class="media-otr movies-media-outer" v-if="newVideoResult.length > 0">
                  <template v-for="(video, index) in newVideoResult" :key="videoComponent">
                    <VideoCard :video="video" @isGetError="updateVideoData" formatChanged="yes" />
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
import PeopleDetailsService from "@/services/PeopleDetailsService.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import {
  onBeforeMount,
  ref,
  watch,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import {
  matchYoutubeUrl,
  validateVimeoURL,
} from "@/mixins/CommonValidation.js";
import { youtube_parser } from "@/mixins/CommonFunctions.js"
export default {
  name: "PeopleMedia",
  emits: ["on-current-theme-change"],
  components: {
    Tabs,
    TabWrapper,
    BannerCardTwo,
    VideoCard,
    ImageCard,
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
    const peopleId = route.params.id;
    const background_image = ref("");
    const newImageResult = ref([]);
    const newVideoResult = ref([]);
    const selectTab = ref("addNewPeople.mediadetails.videoTitle");
    const page = ref(1);
    const common = inject("common");
    const isData = ref(false);
    const isImageData = ref(false);
    const videoComponent = ref(0);
    const isEdit = ref("");
    // Function for video details
    const mediaVideoDetails = async (_id, _page) => {
      let data = { person_id: _id, type: "video", page: _page, limit: 10 };
      try {
        isData.value = true;
        let response = await PeopleDetailsService.getMediaDetails(data);
        videos.value = response.data.results.map((item) => {
          return {
            link: item.path,
            title: item.title,
            id: item.video_id,
            thumb: item.thumb,
            time: item.time,
            type:item.type
          };
        });
        videoCount.value = response.data.total_records;
        newVideoResult.value.push(...videos.value);
        title.value = response.data.person_name;
        window.document.title = `${response.data.person_name} - ${t("addNewPeople.media")} - 11DB`;
        isEdit.value = response.data.is_edit;
        posterImage.value = response.data.poster_image;
        background_image.value = response.data.background_image ? response.data.background_image : response.data.poster_image ? response.data.poster_image : "";
      } catch (error) {
        console.warn(error);
      }
    };

    // Function for image details
    const mediaImageDetails = async (_id, _page) => {
      let data = { person_id: _id, type: "image", page: _page, limit: 10 };
      try {
        let response = await PeopleDetailsService.getMediaDetails(data);
        if (response.status == 200) {
          isImageData.value = true;
          images.value = response.data.results.map((item) => {
            return {
              link: item.path,
              title: item.title,
              id: item.image_id,
            };
          });
          title.value = response.data.person_name;
          window.document.title = `${response.data.person_name} - ${t("addNewPeople.media")} - 11DB`;
          newImageResult.value.push(...images.value);
          imageCount.value = response.data.total_records;
        }
      } catch (error) {
        console.warn(error);
      }
    };

    // To add media video page
    const toAddMediaVideo = () => {
      router.push({
        name: "AddNewPeopleForm",
        params: {
          external_id: peopleId,
          type: "internal",
          itemActive: "media",
          activeIndex: "1",
        },
      });
      localStorage.setItem("peopleBackPage", "/people-media/" + peopleId);
    };

    // When clicked on tab then...
    const selectedTab = (tab) => {
      selectTab.value = tab;
      isImageData.value = false;
      isData.value = false;
      page.value = 1;
      if (tab == "mediaSection.images") {
        newImageResult.value = [];
        mediaImageDetails(peopleId, 1);
      }
      if (tab == "addNewPeople.mediadetails.videoTitle") {
        newVideoResult.value = [];
        mediaVideoDetails(peopleId, 1);
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
            mediaVideoDetails(peopleId, newPage);
          }, 100);
        }
      }
      if (selectTab.value == "mediaSection.images") {
        if (bottomOfWindow && imageCount.value > newImageResult.value.length) {
          let newPage = ++page.value;
          setTimeout(() => {
            mediaImageDetails(peopleId, newPage);
          }, 100);
        }
      }
    };

    // Lifecycle hooks
    onBeforeMount(() => {
      mediaVideoDetails(peopleId, 1);

      setTimeout(() => {
        if (newVideoResult.value.length == 0) {
          selectTab.value = "mediaSection.images";
          mediaImageDetails(peopleId, 1);
        }
      }, 100);
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
          if (
            (newVal == "KO" && oldVal == "EN") ||
            (newVal == "EN" && oldVal == "KO")
          ) {
            if (selectTab.value == "mediaSection.images") {
              newImageResult.value = [];
              page.value = 1;
              mediaImageDetails(peopleId, 1);
            }
            if (selectTab.value == "addNewPeople.mediadetails.videoTitle") {
              newVideoResult.value = [];
              page.value = 1;
              mediaVideoDetails(peopleId, 1);
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
      videoCount,
      imageCount,
      posterImage,
      title,
      toAddMediaVideo,
      background_image,
      newVideoResult,
      newImageResult,
      selectedTab,
      onScroll,
      isData,
      isImageData,
      updateVideoData,
      videoComponent,
      common,
      isEdit
    };
  },
};
</script>
