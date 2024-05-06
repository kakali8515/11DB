<template>
  <div class="media-from-details">
    <div :class="['page-heading-area page-main-heading', $route.params.type == 'internal' ? 'tmtb-heading' : '']">
      <h2>{{ $t("addNewMoviesForm.media") }}</h2>
      <div class="media-tmtb-outer">
        <div class="form-group number-id" v-if="$route.params.type == 'internal'">
          <div class="tmtb-fill" v-show="tabName == 'mediaSection.images'">
            <input type="text" v-model="tmdb_id" class="form-control" :placeholder="$t('addNewMoviesForm.TMDBID')"
              readonly id="" name="" />
            <span class="refreshBtn" @click="tmdbRefreshClick" :class="isEdit ? 'pointer-events-none' : ''"><svg
                width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1V6H1.58152M16.9381 8C16.446 4.05369 13.0796 1 9 1C5.64262 1 2.76829 3.06817 1.58152 6M1.58152 6H6M17 17V12H16.4185M16.4185 12C15.2317 14.9318 12.3574 17 9 17C4.92038 17 1.55399 13.9463 1.06189 10M16.4185 12H12"
                  stroke="white" />
              </svg>
            </span>
          </div>
        </div>
        <div class="media-save-btn" v-show="tabName == 'addNewPeople.mediadetails.videoTitle'" :class="routeId == '' && $route.params.type != 'internal'
          ? 'isDisabled'
          : ''
          ">
          <a @click="isEdit == true ? isEditBtn() : AddMediaDetails()" :class="routeId == '' && $route.params.type != 'internal'
            ? 'pointer-events-none'
            : ''
            " class="saveBtn">{{ isEdit ? $t("button.edit") : $t("button.save") }}</a>
        </div>
        <div class="media-save-btn" v-show="tabName == 'mediaSection.images'" :class="(image_list.length == 0 && !background_image_url) ||
          (routeId == '' && $route.params.type != 'internal')
          ? 'isDisabled'
          : ''
          ">
          <a @click="isEdit == true ? isEditBtn() : AddMediaDetails()" :class="routeId == '' && $route.params.type != 'internal'
            ? 'pointer-events-none'
            : ''
            " class="saveBtn">{{ isEdit ? $t("button.edit") : $t("button.save") }}</a>
        </div>
      </div>
    </div>

    <div class="media-tabber-area">
      <TabWrapper @selectedTab="getTabName">
        <Tabs title="addNewPeople.mediadetails.videoTitle">
          <div class="title-area inner-sub-heading">
            <h2>{{ $t("addNewPeople.mediadetails.videoTitle") }}</h2>
            <div :class="isEdit ? 'isDisabled' : ''">
              <a class="advid-btn" @click="isVideoModal = true" :class="isEdit ? 'pointer-events-none' : ''">{{
                $t("addNewPeople.mediadetails.add+") }}</a>
            </div>
          </div>
          <div class="thumb-grid-area">
            <template v-if="video_details.length > 0">
              <template v-for="(video, index) in video_details" :key="index">
                <VideoThumb v-if="video" :video="video" @removeVideoItem="removeVideoItem"
                  @setTrailer="setOfficialTrailer" :isEdit="isEdit" :key="resetComponents" />
              </template>
            </template>
            <template v-else>
              <div class="tv-no-data">
                {{ $t("addNewPeople.noData") }}
              </div>
            </template>
          </div>
        </Tabs>
        <Tabs title="mediaSection.images">
          <div class="image-upload-show-area">
            <div class="image-upload-area">
              <h3>{{ $t("addNewPeople.mediadetails.backgroundTitle") }}</h3>
              <div class="img-uploadbox" v-if="!background_image_url">
                <div class="upload-options">
                  <label :class="(routeId == '' && $route.params.type != 'internal') ||
                    isEdit
                    ? 'isDisabled'
                    : ''
                    ">
                    <input type="file" class="image-upload" accept="image/*" v-on:change="onFileChange" id="bg-picker-1"
                      :disabled="(routeId == '' && $route.params.type != 'internal') ||
                        isEdit
                        " />
                    <span class="img-icons">
                      <svg width="69" height="70" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg"
                        :class="routeId == '' && $route.params.type != 'internal'
                          ? 'isDisabled'
                          : ''
                          ">
                        <circle cx="34.4999" cy="34.9999" r="33.5624" stroke="white" />
                        <path
                          d="M35.5 44H26.1C25.9409 44 25.7883 43.9368 25.6757 43.8243C25.5632 43.7117 25.5 43.5591 25.5 43.4V26.6C25.5 26.4409 25.5632 26.2883 25.6757 26.1757C25.7883 26.0632 25.9409 26 26.1 26H42.9C43.0591 26 43.2117 26.0632 43.3243 26.1757C43.4368 26.2883 43.5 26.4409 43.5 26.6V36"
                          stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                          d="M25.5 39L32.5 36L38 38.5M38.5 42H41.5M44.5 42H41.5M41.5 42V39M41.5 42V45M38.5 33C37.9696 33 37.4609 32.7893 37.0858 32.4142C36.7107 32.0391 36.5 31.5304 36.5 31C36.5 30.4696 36.7107 29.9609 37.0858 29.5858C37.4609 29.2107 37.9696 29 38.5 29C39.0304 29 39.5391 29.2107 39.9142 29.5858C40.2893 29.9609 40.5 30.4696 40.5 31C40.5 31.5304 40.2893 32.0391 39.9142 32.4142C39.5391 32.7893 39.0304 33 38.5 33V33Z"
                          stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div class="img-editbox" v-if="background_image_url">
                <div class="img-display-area">
                  <img :src="background_image_url" />
                </div>
                <span class="img-icon">
                  <input type="file" class="image-upload" accept="image/*" v-on:change="onFileChange" id="bg-picker-1"
                    :disabled="(routeId == '' && $route.params.type != 'internal') ||
                      isEdit
                      " />
                  <svg width="69" height="70" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="34.4999" cy="34.9999" r="33.0624" stroke="white" stroke-width="2" />
                    <path
                      d="M41.7075 27.7911L41.7076 27.7912C42.3745 28.4581 42.6336 29.0162 42.7348 29.3775C42.7795 29.5368 42.7947 29.6625 42.7989 29.7479L36.8837 35.6631L36.8836 35.6631L31.1109 41.4334C31.0866 41.317 31.0477 41.172 30.9854 41.0055C30.8321 40.5959 30.5401 40.064 29.9886 39.513C29.4368 38.9612 28.905 38.6693 28.4956 38.5161C28.3269 38.453 28.1803 38.414 28.0633 38.3898L33.8377 32.6163L33.8377 32.6162L39.7534 26.7006C39.8386 26.7048 39.964 26.72 40.123 26.7645C40.4841 26.8657 41.0417 27.1248 41.7075 27.7911ZM30.6512 41.7477C30.7066 41.7465 30.7558 41.7454 30.7996 41.7445L30.7996 41.7445L30.6512 41.7477ZM27.5158 41.9903C27.7506 42.221 27.9484 42.4864 28.1025 42.7772L26.3489 43.149L26.7208 41.3954C27.0122 41.5504 27.2782 41.749 27.5097 41.9843L27.5097 41.9844L27.5158 41.9903ZM27.7542 38.8507L27.7574 38.6957L27.7574 38.6957C27.7564 38.7411 27.7554 38.7925 27.7542 38.8507Z"
                      stroke="white" />
                  </svg>
                </span>
              </div>
              <div class="note">
                <p>
                  {{ $t("addNewMoviesForm.fileSize")
                  }}<span>{{ $t("addNewMoviesForm.lessthan25mb") }}</span>{{ $t("addNewMoviesForm.imageSize")
}}<span>{{ $t("addNewMoviesForm.1920x946px") }}</span><br />{{ $t("addNewMoviesForm.fileType")
}}<span>{{ $t("addNewMoviesForm.jpgPng") }}</span>
                </p>
              </div>
            </div>
            <div class="title-area">
              <h2>{{ $t("addNewPeople.mediadetails.imagesTitle") }}</h2>
              <div :class="isEdit ? 'isDisabled' : ''">
                <a class="advid-btn" :class="isEdit ? 'pointer-events-none' : ''" @click="isImageModal = true">{{
                  $t("addNewPeople.mediadetails.add+") }}</a>
              </div>
            </div>
            <div class="images-grid-area">
              <template v-if="image_details.length > 0">
                <ImageThumb v-for="(image, index) in image_details" :key="index" :image="image"
                  @removeItem="removeImagesItem" :isEdit="isEdit" />
              </template>
              <div class="tv-no-data" v-else>
                {{ $t("addNewPeople.noData") }}
              </div>
            </div>
          </div>
        </Tabs>
      </TabWrapper>
    </div>
  </div>

  <div class="new-cast-modal" v-show="isVideoModal">
    <PopUpModal :isModal="isVideoModal">
      <template v-slot:header>
        <h1>{{ $t("addNewPeople.mediadetails.videoDialogTitle") }}</h1>
        <!-- <button @click="isVideoModal = false">
            <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
          </button> -->
      </template>
      <template v-slot:body>
        <div class="cast-details">
          <div class="right">
            <div class="form-grp">
              <div class="video-error-heading">
                <label for="">{{ $t("addNewPeople.mediadetails.videoURL")
                }}<span>*</span></label>
                <span class="error" v-if="error.isUniqueUrl">
                  {{ $t("addNewPeople.mediadetails.alreadyExistsURL") }}
                </span>
                <span class="error" v-if="error.isValidUrlName">
                  {{ error.isValidUrlName }}
                </span>
              </div>
              <input type="text" placeholder="https://" v-model="video_url" @input="
              ((error.isValidUrl = computed(() => '')),
                (error.isUniqueUrl = computed(() => '')))
                " :class="error.isValidUrl || error.isUniqueUrl || error.isValidUrlName
    ? 'error-border'
    : ''
    " maxlength="250" />
              <p class="instruction" v-if="error.isValidUrl" :class="error.isValidUrl ? 'error-url' : ''">
                {{ error.isValidUrl }}
              </p>
              <p class="instruction" v-else>
                {{ $t("addNewMoviesForm.onlyYoutubeVimeo") }}
              </p>
            </div>
            <div class="form-grp">
              <label for="">{{
                $t("addNewPeople.mediadetails.videoName")
              }}</label>
              <input type="text" :placeholder="$t('addNewPeople.mediadetails.enterVideoTitle')" v-model="video_title"
                :class="error.isUniqueTitle ? 'error-border' : ''" maxlength="250" />
              <p class="instruction error-url" v-if="error.isUniqueTitle">
                {{ $t("addNewPeople.mediadetails.alreadyExistsTitle") }}
              </p>
              <div class="add-check">
                <label for="official-trailer">
                  <input type="checkbox" id="official-trailer" v-model="is_official_trailer" />
                  <div class="checkbox">
                    <img src="@/assets/icons/modal-checkbox-unchecked.svg" alt="" class="unchecked-icon" />
                    <img src="@/assets/icons/checkbox-checked.svg" alt="" class="checked-icon" />
                  </div>
                  <p class="check-text">
                    {{ $t("addNewPeople.mediadetails.addAsTrailer") }}
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" :disabled="video_url == '' || video_title == ''"
            :class="video_url == '' || video_title == '' ? 'isDisabled' : ''" @click="AddVideo">
            {{ $t("addNewPeople.mediadetails.saveButton") }}
          </button>
          <button class="red-fill-btn" @click="cancelVideo">
            {{ $t("addNewPeople.mediadetails.cancelButton") }}
          </button>
        </div>
      </template>
    </PopUpModal>
  </div>

  <div class="new-cast-modal add-img-modal" v-show="isImageModal">
    <PopUpModal :isModal="isImageModal">
      <template v-slot:header>
        <h1>{{ $t("addNewPeople.mediadetails.imageDialogTitle") }}</h1>
        <!-- <button @click="isImageModal = false">
            <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
          </button> -->
      </template>
      <template v-slot:body>
        <div class="image-picker" :class="images.length == 5 ? 'isDisabled' : ''">
          <input type="file" name="" id="image-pick" ref="file" multiple="multiple" v-on:change="selectMultipleImages" />
          <label for="image-pick" :class="images.length == 5 ? 'pointer-events-none' : ''">
            <h1 class="upload-img-btn">
              {{ $t("addNewPeople.mediadetails.uploadImages") }}
            </h1>
          </label>
        </div>
        <div class="image-grid">
          <div class="each-img" v-for="(item, i) in multipleImages" :key="i">
            <img :src="item.url" alt="" class="picked-img" />
            <img @click="removeImages(item)" src="@/assets/icons/modal-img-cross.svg" alt="" class="cross-icon" />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" :class="images.length == 0 ||
            isAddNewImages ||
            (routeId == '' && $route.params.type != 'internal')
            ? 'isDisabled'
            : ''
            " :disabled="images.length == 0 ||
    isAddNewImages ||
    (routeId == '' && $route.params.type != 'internal')
    " @click="addNewImages">
            {{ $t("addNewPeople.mediadetails.addButton") }}
          </button>
          <button class="red-fill-btn" @click="
            (isImageModal = false), (multipleImages = []), (images = [])
            ">
            {{ $t("addNewPeople.mediadetails.cancelButton") }}
          </button>
        </div>
      </template>
    </PopUpModal>
  </div>

  <!-- submit modal -->
  <div class="new-cast-modal center-popup-modal" v-show="isSubmit">
    <PopUpModal :isModal="isSubmit">
      <template v-slot:header>
        <h1 class="text-center" v-html="$t('addNewMoviesForm.youShouldSubmitToSendTheAdd')"></h1>
      </template>
      <template v-slot:body> </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" @click="(isOKOnceClick = true), submitMediaDetails()"
            :disabled="isOKOnceClick">
            {{ $t("button.ok") }}
          </button>
          <button class="red-fill-btn" @click="isSubmit = false">
            {{ $t("addNewPeople.mediadetails.cancelButton") }}
          </button>
        </div>
      </template>
    </PopUpModal>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import VideoThumb from "@/components/VideoThumb.vue";
import ImageThumb from "@/components/ImageThumb.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import AddNewPeopleService from "@/services/AddNewPeopleService";
import EditPeopleService from "@/services/EditPeopleService";
import Toast from "@/alert/alert.js";
import { computed } from "@vue/reactivity";
import {
  validateVimeoURL,
  matchYoutubeUrl,
  isValidUrl,
} from "@/mixins/CommonValidation.js";
export default {
  name: "MediaDetails",
  components: {
    Tabs,
    TabWrapper,
    VideoThumb,
    ImageThumb,
    PopUpModal,
  },
  props: {
    site_language: {
      type: String,
    },
    itemType: {
      type: String,
    },
    saveIdList: {
      type: Object,
    },
  },
  emits: ["selectedId", "isEditOn"],
  created() {
    this.AddNewPeopleService = new AddNewPeopleService();
    this.EditPeopleService = new EditPeopleService();
  },
  data() {
    return {
      isEdit: false,
      isVideoModal: false,
      isImageModal: false,
      video_url: "",
      video_title: "",
      is_official_trailer: "",
      error: {},
      background_image: "",
      background_image_url: "",
      background_image_filename: "",
      background_image_mime_type: "",
      background_image_originalname: "",
      background_image_size: "",
      background_image_path: "",
      background_error_msg: "",
      multipleImages: [],
      images: [],
      title_type: "people",
      video_details: [],
      image_details: [],
      routeId: this.$route.params.id,
      people_id:
        this.$route.params.external_id &&
          typeof this.$route.params.external_id == "string"
          ? Number(this.$route.params.external_id)
          : this.$route.params.external_id,
      draft_media_id: "",
      draft_request_id: "",
      image_list: [],
      isSubmit: false,
      isAddNewImages: false,
      isOKOnceClick: false,
      tabName: "addNewPeople.mediadetails.videoTitle",
      tmdb_id: localStorage.getItem("tmdb_id") ? localStorage.getItem("tmdb_id") : "",
      istmDBIdClick: false,
      resetComponents: 0
    };
  },
  mounted() {
    if (this.$route.params.type == "internal") {
      this.isEdit = true;
    }
    const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
    if (draft_ids[0]) {
      this.routeId = draft_ids[0]?.primaryDetails[this.title_type][
        this.site_language
      ]?.draft_request_id
        ? draft_ids[0]?.primaryDetails[this.title_type][this.site_language]
          ?.draft_request_id
        : "";
    } else {
      this.routeId = this.routeId;
    }
    setTimeout(() => {
      this.getVideoList();
      this.getImageList();
    }, 500);
  },
  watch: {
    site_language: function (newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
        if (draft_ids[0]) {
          this.routeId = draft_ids[0]?.primaryDetails[this.title_type][
            this.site_language
          ]?.draft_request_id
            ? draft_ids[0]?.primaryDetails[this.title_type][this.site_language]
              ?.draft_request_id
            : "";
        } else {
          this.routeId = this.routeId;
        }

        this.video_details = [];
        this.background_image = "";
        this.image_list = [];
        this.background_image_url = "";
        setTimeout(() => {
          this.getVideoList();
          this.getImageList();
        }, 1000);
      }
    },
  },

  methods: {
    isEditBtn() {
      this.isEdit = false;
      this.$emit("isEditOn", false);
    },
    getTabName(tab) {
      this.tabName = tab;
    },
    //get video list
    getVideoList() {
      let getVideoList;
      if (this.$route.params.type == "internal") {
        getVideoList = this.EditPeopleService.mediaRequestList(
          this.$route.params.external_id,
          this.routeId,
          this.site_language,
          "video"
        );
      } else if (this.routeId) {
        getVideoList = this.AddNewPeopleService.mediaRequestList(
          this.routeId,
          this.site_language,
          "video"
        );
      }
      getVideoList
        .then((res) => {
          if (res.status == 200) {
            this.$emit("selectedId", {
              request_id: res.data.draft_request_id,
              media_request_id: res.data.draft_media_id,
            });
            this.video_details = res.data.video_details || res.data.result;
            this.draft_media_id =
              res.data?.draft_media_id ||
              res.data.video_details[0]?.draft_media_id;
            if (this.routeId) {
              this.tmdb_id = localStorage.getItem("tmdb_id") ? localStorage.getItem("tmdb_id") : this.tmdb_id;
            } else {
              this.tmdb_id = res.data.tmdb_id ? res.data.tmdb_id : this.tmdb_id;
            }
            Array.from(res.data.video_details).forEach((item, i) => {
              item.video_id = item.id ? item.id : "";
              this.video_details[i]["id"] =
                this.validateVimeoURL(item.video_url) ||
                this.matchYoutubeUrl(item.video_url);
              if (this.validateVimeoURL(item.video_url)) {
                this.video_details[i]["type"] = "vimeo";
              } else {
                this.video_details[i]["type"] = "youtube";
              }
            });
          }
        })
        .catch((err) => {
          return;
        });
    },

    tmdbRefreshClick() {
      this.istmDBIdClick = true;
      this.image_list = [];
      this.getImageList();
    },

    //get image list
    getImageList() {
      let getImageList;
      if (this.$route.params.type == "internal") {
        if (this.istmDBIdClick) {
          getImageList = this.EditPeopleService.tmdbMediaRequestList(
            this.$route.params.external_id,
            this.tmdb_id,
            this.site_language,
            "image"
          );
        } else {
          getImageList = this.EditPeopleService.mediaRequestList(
            this.$route.params.external_id,
            this.routeId,
            this.site_language,
            "image"
          );
        }
      } else if (this.routeId) {
        getImageList = this.AddNewPeopleService.mediaRequestList(
          this.routeId,
          this.site_language,
          "image"
        );
      }
      getImageList
        .then((res) => {
          if (res.status == 200) {
            this.image_details = res.data.image_details || res.data.result;
            this.draft_media_id =
              res.data?.draft_media_id ? res.data?.draft_media_id : this.draft_media_id ||
                res.data.bg_image_details[0]?.draft_media_id;

            this.background_image_url = res.data.bg_image_details[0]?.image_path ? res.data.bg_image_details[0]?.image_path : this.background_image_url;
            this.background_image_originalname =
              res.data.bg_image_details[0]?.image_original_name ? res.data.bg_image_details[0]?.image_original_name : this.background_image_originalname;

            Array.from(res.data.image_details).forEach((item, i) => {
              this.image_list.push({
                id: item.id ? item.id : "",
                originalname: item.image_original_name,
                path: item.image_path,
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // add video
    AddVideo() {
      this.error.isUniqueUrl = computed(() => "");
      this.error.isUniqueTitle = "";
      //video url validation
      let value = this.isValidUrl(this.video_url);
      if (value) {
        this.error.isValidUrlName = computed(() => "");
        if (
          this.video_details.filter((video) => {
            return this.video_url == video.video_url;
          }).length != 0
        ) {
          this.error.isUniqueUrl = this.$t(
            "addNewMoviesForm.videoAlreadyUploaded"
          );
          return;
        }
        //video title validation
        if (
          this.video_details.filter((video) => {
            return this.video_title == video.video_title;
          }).length != 0
        ) {
          this.error.isUniqueTitle = this.$t(
            "addNewMoviesForm.videoTitleAlreadyUploaded"
          );
          return;
        }
        let youtubeid = this.matchYoutubeUrl(this.video_url);
        let vimeoId = this.validateVimeoURL(this.video_url);

        if (vimeoId != false || youtubeid != false) {
          this.error.isValidUrl = computed(() => "");
          let type = youtubeid ? "youtube" : "vimeo";
          if (type == "vimeo") {
            fetch(`https://vimeo.com/api/v2/video/${vimeoId}.json`)
              .then(response => response.json())
              .then(data => {
                this.video_details.push({
                  video_url: this.video_url,
                  video_title: this.video_title,
                  is_official_trailer: this.is_official_trailer == true ? "y" : "n",
                  video_id: "",
                  id: vimeoId,
                  type: type,
                  thumbnail: data[0]?.thumbnail_large,
                  view_count: data[0]?.stats_number_of_plays,
                  video_duration: data[0]?.duration.toString(),
                });
                this.video_url = "";
                this.video_title = "";
                this.is_official_trailer = false;
              })
              .catch(error => {
                console.error('Error:', error);
              });
          } else {
            const youTubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `https://www.googleapis.com/youtube/v3/videos?id=${youtubeid}&key=${youTubeApiKey}&part=snippet,contentDetails,statistics,status`);
            xhr.send();
            xhr.responseType = "json";
            xhr.onload = () => {
              if (xhr.readyState == 4 && xhr.status == 200) {
                const data = xhr.response;
                if (data.items[0]) {
                  this.video_details.push({
                    video_url: this.video_url,
                    video_title: this.video_title,
                    is_official_trailer: this.is_official_trailer == true ? "y" : "n",
                    video_id: "",
                    id: youtubeid,
                    type: type,
                    thumbnail: data.items[0]?.snippet.thumbnails.high.url,
                    view_count: data.items[0]?.statistics.viewCount,
                    video_duration: data.items[0]?.contentDetails.duration
                  });
                  this.video_url = "";
                  this.video_title = "";
                  this.is_official_trailer = false;
                } else {
                  this.video_details.push({
                    video_url: this.video_url,
                    video_title: this.video_title,
                    is_official_trailer: this.is_official_trailer == true ? "y" : "n",
                    video_id: "",
                    id: youtubeid,
                    type: type,
                    thumbnail: "",
                    view_count: "",
                    video_duration: ""
                  });
                  this.video_url = "";
                  this.video_title = "";
                  this.is_official_trailer = false;
                }
              } else {
                console.log(`Error: ${xhr.status}`);
              }
            };
          }
          this.isVideoModal = false;

        } else {
          // this.error.isValidUrl = computed(() => this.$t("Error.youtubeVomeo"));
          this.error.isValidUrl = computed(() => this.$t("Error.videoLink"));
        }
      } else {
        this.error.isValidUrlName = computed(() =>
          this.$t("Error.validEnterUrl")
        );
      }
    },

    cancelVideo() {
      this.isVideoModal = false;
      this.video_url = "";
      this.video_title = "";
      this.is_official_trailer = "";
      this.error.isUniqueUrl = computed(() => "");
      this.error.isUniqueTitle = "";
      this.error.isValidUrlName = computed(() => "");
      this.error.isValidUrl = computed(() => "");
    },

    // select background images
    onFileChange(e) {
      let uploadBackgroundImages;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.background_image = files[0];
      let fileSize = e.target.files[0].size;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(this.background_image.name)) {
        this.background_error_msg = "jpg, jpeg, png 파일만 업로드 가능합니다";
        this.background_image_url = "";
        Toast.fire({ title: this.$t("Error.onlyJpg") });
        document.querySelector("#bg-picker-1").value = "";
        return false;
      } else if (fileSize > 1024 * 1024 * 25) {
        this.background_error_msg = "업로드 파일 용량은 최대 25mb입니다";
        Toast.fire({ title: this.$t("Error.uploadFileSize") });
        this.background_image_url = "";
        document.querySelector("#bg-picker-1").value = "";
        return false;
      } else if (allowedExtensions.exec(this.background_image.name)) {
        this.background_error_msg = "";
        this.background_image_url = URL.createObjectURL(e.target.files[0]);

        let formData = new FormData();
        if (this.$route.params.type == "internal") {
          formData.append("people_id", this.people_id);
        }
        formData.append("draft_request_id", this.routeId ? this.routeId : "");
        formData.append("site_language", this.site_language);
        formData.append("image", this.background_image);

        if (this.$route.params.type == "internal") {
          // formData.append("people_id", this.people_id);
          uploadBackgroundImages = this.EditPeopleService.uploadBackgroundImages(formData, this.people_id);
        } else {
          uploadBackgroundImages = this.AddNewPeopleService.uploadBackgroundImages(formData);
        }

        uploadBackgroundImages.then((res) => {
          if (res.status == 200) {
            this.background_image_url = res.data.bg_image_details[0].location;
            this.background_image_size = res.data.bg_image_details[0].size;
            this.background_image_filename =
              res.data.bg_image_details[0].filename;
            this.background_image_mime_type =
              res.data.bg_image_details[0].mime_type;
            this.background_image_originalname =
              res.data.bg_image_details[0].originalname;
            this.background_image_path = res.data.bg_image_details[0].path;
          } else {
            Toast.fire({ title: res.response.data.error });
          }
        })
          .catch((err) => {
            return;
          });
      }
      this.background_error_msg = "";
    },

    // select multiple images
    selectMultipleImages(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let count = files.length;
      let tCount = this.multipleImages.length + count;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      for (let i = 0; i < count; i++) {
        if (!allowedExtensions.exec(files[i].name)) {
          Toast.fire({
            title: this.$t("Error.onlyJpg"),
          });
          document.querySelector("#image-pick").value = "";
          // this.multipleImages = []; // Alamgir
          return false;
        } else if (e.target.files[i].size > 1024 * 1024 * 25) {
          Toast.fire({ title: this.$t("Error.uploadFileSize") });
          document.querySelector("#image-pick").value = "";
          // this.multipleImages = [];
          return false;
        } else if (allowedExtensions.exec(files[i].name)) {
          if (tCount > 5) {
            Toast.fire({
              title: this.$t(
                "addNewPeople.mediadetails.Maximum5imagesuploaded"
              ),
            });
            document.querySelector("#image-pick").value = "";
          } else {
            this.images.push(files[i]);
            this.multipleImages.push({
              url: URL.createObjectURL(e.target.files[i]),
              file: files[i],
            });
          }
        }
      }
    },

    // remove new images
    removeImages(data) {
      let img = this.multipleImages.find((item) => {
        return item.url == data.url;
      });
      if (img) {
        this.multipleImages.splice(this.multipleImages.indexOf(img), 1);
      }
      let obj = this.images.find((item) => {
        return item == data.file;
      });
      if (obj) {
        this.images.splice(this.images.indexOf(obj), 1);
      }
      document.querySelector("#image-pick").value = "";
    },

    // add new images
    addNewImages() {
      let newImages;
      this.isAddNewImages = true;
      let formData = new FormData();
      if (this.$route.params.type == "internal") {
        formData.append("people_id", this.people_id);
      }
      formData.append("draft_request_id", this.routeId ? this.routeId : "");
      formData.append("site_language", this.site_language);
      this.images.forEach((item, i) => formData.append("images", item));

      if (this.$route.params.type == "internal") {
        // formData.append("people_id", this.people_id);
        newImages = this.EditPeopleService.uploadMediaImages(formData, this.people_id);
      } else {
        newImages = this.AddNewPeopleService.uploadMediaImages(formData);
      }

      newImages.then((res) => {
        if (res.status == 200) {
          this.isAddNewImages = false;
          Array.from(res.data.image_list).forEach((item, i) => {
            this.image_list.push({
              id: "",
              filename: item.filename,
              originalname: item.originalname,
              path: item.location,
              size: item.size,
              mime_type: item.mime_type,
            });

            this.image_details.push({
              draft_request_id: item.request_id,
              image_original_name: item.originalname,
              image_path: item.location,
              draft_media_id: this.draft_media_id,
            });
          });

          this.isImageModal = false;
          this.images = [];
          this.multipleImages = [];
        } else {
          this.isAddNewImages = false;
          Toast.fire({ title: res.response.data.error });
        }
      })
        .catch((err) => {
          return;
        });
    },

    AddMediaDetails() {
      this.isSubmit = true;
    },

    submitMediaDetails() {
      this.saveMediaDetails();
    },

    // add all media details
    saveMediaDetails() {
      let saveMediaDetails;
      let video = [];
      let image = [];
      if (this.$route.params.type == "internal") {
        Array.from(this.video_details).forEach((item, i) => {
          video.push({
            video_url: item.video_url,
            video_title: item.video_title,
            is_official_trailer: item.is_official_trailer,
            id: item.video_id ? item.video_id : "",
            thumbnail: item.thumbnail,
            view_count: item.view_count,
            video_duration: item.video_duration.toString(),
          });
        });
        Array.from(this.image_list).forEach((item, i) => {
          image.push({
            id: item.id ? item.id : "",
            originalname: item.originalname,
            filename: item.filename ? item.filename : item.originalname,
            path: item.path,
            size: item.size ? item.size : 0,
            mime_type: item.mime_type,
          });
        });
      } else {
        Array.from(this.video_details).forEach((item, i) => {
          video.push({
            video_url: item.video_url,
            video_title: item.video_title,
            is_official_trailer: item.is_official_trailer,
            thumbnail: item.thumbnail,
            view_count: item.view_count,
            video_duration: item.video_duration.toString(),
          });
        });
        Array.from(this.image_list).forEach((item) => {
          image.push({
            originalname: item.originalname,
            filename: item.filename ? item.filename : item.originalname,
            path: item.path,
            size: item.size,
            mime_type: item.mime_type,
          });
        });
      }

      const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
      if (draft_ids[0] && this.$route.params.type == "internal") {
        this.routeId = draft_ids[0]?.primaryDetails[this.title_type][
          this.site_language
        ]?.draft_request_id
          ? draft_ids[0]?.primaryDetails[this.title_type][this.site_language]
            ?.draft_request_id
          : draft_ids[0]?.primaryDetails[this.title_type].draft_relation_id
            ? draft_ids[0]?.primaryDetails[this.title_type].draft_relation_id
            : "";
      }

      let credentials = {
        draft_request_id: this.routeId,
        draft_media_id: this.draft_media_id,
        site_language: this.site_language,
        video_list: video,
        background_image: this.background_image_url
          ? [
            {
              path: this.background_image_url,
              filename: this.background_image_filename
                ? this.background_image_filename
                : this.background_image_originalname,
              mime_type: this.background_image_mime_type
                ? this.background_image_mime_type
                : "",
              originalname: this.background_image_originalname,
              size: this.background_image_size
                ? this.background_image_size
                : "",
            },
          ]
          : [],
        image_list: image,
      };
      if (this.$route.params.type == "internal") {
        credentials.people_id = this.people_id;
        saveMediaDetails = this.EditPeopleService.addMediaDetails(credentials);
      } else {
        saveMediaDetails =
          this.AddNewPeopleService.addMediaDetails(credentials);
      }
      saveMediaDetails
        .then((res) => {
          if (res.status == 200) {
            this.saveIdList.media_request_id = res.data.data[0].draft_media_id;
            this.draft_request_id = res.data.data[0].draft_request_id;
            this.draft_media_id = res.data.data[0].draft_media_id;
            this.$emit("selectedId", this.saveIdList);

            this.isOKOnceClick = false;
            this.istmDBIdClick = false;
            if (this.$route.params.type == "internal") {
              this.isEdit = true;
              this.$emit("isEditOn", true);
              const draft_ids = JSON.parse(
                localStorage.getItem("draft_ids") || "[]"
              );
              if (draft_ids[0]) {
                const res_option_type =
                  draft_ids[0].primaryDetails[this.itemType][this.site_language]?.draft_request_id;
                if (!res_option_type) {
                  draft_ids[0].primaryDetails[this.itemType][
                    this.site_language
                  ] = res.data.data[0];
                }
              } else {
                const put_primary_details = {
                  primaryDetails: {
                    [this.itemType]: {
                      [this.site_language]: res.data.data[0],
                      draft_relation_id: res.data.data[0].draft_request_id,
                    },
                  },
                };
                draft_ids.push(put_primary_details);
              }
              // Saving
              localStorage.setItem("draft_ids", JSON.stringify(draft_ids));
              localStorage.setItem("tmdb_id", this.tmdb_id);
              this.$router.push({
                name: "AddNewPeopleForm",
                params: {
                  external_id: this.people_id,
                  type: "internal",
                  id: this.draft_request_id,
                  itemActive: "media",
                  activeIndex: "1",
                },
              });
            }
            video = [];
            image = [];
            this.image_list = [];
            this.getVideoList();
            this.getImageList();
            this.isSubmit = false;
            Toast.fire({ title: this.$t("Error.success") });
          } else {
            this.isOKOnceClick = false;
            this.isSubmit = false;
            Toast.fire({ title: res.response.data.error });
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },

    // remove video item
    removeVideoItem(video) {
      let data = this.video_details.find((item) => item == video);
      if (data) {
        this.video_details.splice(this.video_details.indexOf(video), 1);
      }
      this.resetComponents++;
    },

    // set official video trailer
    setOfficialTrailer(video) {
      let data = this.video_details.find((item) => item == video);
      if (data) {
        data.is_official_trailer = "y";
      }
    },

    // remove images item
    removeImagesItem(image) {
      let data = this.image_details.find((item) => item == image);
      if (data) {
        this.image_details.splice(this.image_details.indexOf(image), 1);
      }
      this.image_list = [];
      Array.from(this.image_details).forEach((item, i) => {
        this.image_list.push({
          id: item.id,
          originalname: item.image_original_name,
          path: item.image_path,
        });
      });
    },
    validateVimeoURL,
    matchYoutubeUrl,
    isValidUrl,
    computed,
  },
};
</script>

<style lang="scss" scoped>
.error-url {
  color: red !important;
}

.tv-no-data {
  min-height: 160px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.img-icon {
  input {
    height: 68px;
    width: 68px;
    position: absolute;
    text-indent: -999px;
    cursor: pointer;
  }
}

.with-dropdown {
  margin: 0 0 30px 0;
  justify-content: flex-start !important;

  h2 {
    margin: 0 20px 0 0;
  }

  select {
    width: 214px;
    height: 44px;
    border: 1px solid #a4a4a4;
    border-radius: 4px;
    background-color: transparent;
    background: url(@//assets/icons/arrow-down2.svg) right 12px center no-repeat;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    padding: 0 12px;
  }
}
</style>
