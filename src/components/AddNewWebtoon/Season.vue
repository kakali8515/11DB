<template>
  <div class="primary-details-from" v-if="showSec">
    <div
      :class="['page-heading-area page-main-heading season-heading', $route.params.type == 'internal' ? 'tmtb-heading' : 'tmtb-heading']">
      <h2>{{ $t("season.season") }}</h2>
      <div class="media-tmtb-outer">
        <div class="form-group number-id" v-if="$route.params.type == 'internal'">

          <div class="tmtb-fill">
            <input type="text" v-model="tmdb_id" class="form-control" :placeholder="$t('addNewMoviesForm.TMDBID')"
              @keypress="isIntegerNumber($event)" readonly />
            <!-- <span class="refreshBtn" @click="tmdbSeasonListClick"><svg width="18" height="18" viewBox="0 0 18 18"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1V6H1.58152M16.9381 8C16.446 4.05369 13.0796 1 9 1C5.64262 1 2.76829 3.06817 1.58152 6M1.58152 6H6M17 17V12H16.4185M16.4185 12C15.2317 14.9318 12.3574 17 9 17C4.92038 17 1.55399 13.9463 1.06189 10M16.4185 12H12"
                  stroke="white" />
              </svg>
            </span> -->
          </div>
        </div>
      </div>
    </div>
    <div class="login-wrap">
      <div class="custom-table-wrapper">
        <div class="custom-table tv-show-table">
          <div class="table-head">
            <div class="table-head-row">
              <div class="table-head-cell">{{ $t("season.seasonNo") }}</div>
              <div class="table-head-cell">{{ $t("season.seasonName") }}</div>
              <div class="table-head-cell">{{ $t("season.noOfEpisodes") }}</div>
              <div class="table-head-cell">{{ $t("season.releaseDate") }}</div>
            </div>
          </div>
          <div class="table-body">
            <div class="table-body-row" v-for="(
                {
                  season_no,
                  season_name,
                  total_episode,
                  release_date,
                  draft_season_id,
                  season_id,
                  tmdb_id,
                },
                  index
              ) in seasonRequestList" :key="index" @click="
                seasonDetailsEdit(
                  draft_season_id,
                  season_id,
                  tmdb_id,
                  season_no
                )
                ">
              <div class="table-body-cell">
                <span class="cell-name">{{ $t("season.seasonNo") }}</span>{{ season_no }}
              </div>
              <div class="table-body-cell">
                <span class="cell-name">{{ $t("season.seasonName") }}</span>{{ season_name }}
              </div>
              <div class="table-body-cell">
                <span class="cell-name">{{ $t("season.noOfEpisodes") }}</span>{{ total_episode }}
              </div>
              <div class="table-body-cell">
                <span class="cell-name">{{ $t("season.releaseDate") }}</span>{{ release_date }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="add-season-btn" @click="addNewSeaon" :class="routeId == '' && $route.params.type != 'internal' ? 'isDisabled' : ''
        ">
        {{ $t("season.+addNewSeason") }}
      </button>
    </div>
  </div>
  <div class="primary-details-from" v-else>
    <div class="page-heading-area season-heading tmtb-heading">
      <h2>{{ $t("season.addNewSeason") }}</h2>
      <div class="media-tmtb-outer">
        <div class="form-group number-id" v-if="$route.params.type == 'internal'">
          <div class="tmtb-fill">
            <input type="text" v-model="tmdb_id" class="form-control" :placeholder="$t('addNewMoviesForm.TMDBID')"
              @keypress="isIntegerNumber($event)" readonly />
            <!-- <span class="refreshBtn" @click="tmdbRefreshClick" :class="isEdit ? 'pointer-events-none' : ''"><svg
                width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1V6H1.58152M16.9381 8C16.446 4.05369 13.0796 1 9 1C5.64262 1 2.76829 3.06817 1.58152 6M1.58152 6H6M17 17V12H16.4185M16.4185 12C15.2317 14.9318 12.3574 17 9 17C4.92038 17 1.55399 13.9463 1.06189 10M16.4185 12H12"
                  stroke="white" />
              </svg>
            </span> -->
          </div>

        </div>
        <div class="media-save-btn btn-grp mt-0">
          <a href="javascript:void(0)" class="saveBtn" @click="isEdit == true ? isEditBtn() : addSeasonModal()">{{
            isEdit ? $t("button.edit") : $t("button.save") }}</a>
          <button class="delete-btn" type="button" :disabled="isEdit" @click="deleteSeasonData"
            :class="isEdit ? 'isDisabled' : ''">
            {{ $t("button.delete") }}
          </button>
        </div>
      </div>
    </div>

    <div class="login-wrap">
      <div class="box">
        <form @submit.prevent="">
          <div class="divRows">
            <h3>{{ $t("season.seasonNo") }}</h3>
            <div class="div1colmns">
              <div class="form-group">
                <input type="text" class="form-control" :placeholder="$t('season.seasonNumber')"
                  v-model="seasonData.season_no" @keypress="isIntegerNumber($event)" maxlength="3"
                  :class="error.season_number ? 'error-border' : ''" :disabled="isEdit" />
                <span class="error-txt" v-if="error.season_number">{{ error.season_number }}</span>
                <p class="instruction-text">
                  {{ $t("season.seasonRegularseason") }}
                </p>
              </div>
            </div>
          </div>
          <div class="divRows">
            <div class="heads-area">
              <h3>{{ $t("season.seasonName") }}</h3>
            </div>
            <div class="div1colmns">
              <div class="form-group">
                <input type="text" class="form-control" :placeholder="$t('season.seasonTitle')" v-model="seasonData.title"
                  maxlength="150" :class="error.season_title ? 'error-border' : ''" :disabled="isEdit" />
                <span class="error-txt" v-if="error.season_title">{{ error.season_title }}</span>
              </div>
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("season.displayImage") }}</h3>
            <div class="div1colmns">
              <div class="form-group image-uploader">
                <input type="file" id="img-upload" class="form-control" :placeholder="$t('season.imageName')"
                  @change="getThumbnailImage($event)" :disabled="isEdit" />
                <p :class="imgErr ? 'error-border' : ''" class="file-name">
                  {{ fileName ? fileName : $t("season.imageName") }}
                </p>
                <label for="img-upload" class="file-pick-btn" :class="isEdit ? 'isDisabled' : ''">{{
                  $t("season.chooseImage") }}</label>
              </div>
              <div class="img-display" v-show="thumbnailImage">
                <img :src="thumbnailImage?.image_url || thumbnailImage" alt="" class="img-preview"
                  id="imgPreviewSeason" />
                <img :class="isEdit ? 'pointer-events-none' : ''" @click="removeImage"
                  src="@/assets/icons/file-picker-cross-icon.svg" alt="" class="cross-icon" />
              </div>
              <span class="error-txt" v-if="imgErr">{{ imgErr }}</span>
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("filterCard.releaseDate") }}</h3>
            <div class="div1colmns two-calender">
              <Calender @date="getInitialDate" :key="resetComponents" :input_date="seasonData.release_date"
                :datePlaceholder="datePlaceholder" :disabled="isEdit" :isError="error.release_date ? true : false" />
            </div>
            <span class="error-txt" v-if="error.release_date">{{ error.release_date }}</span>
          </div>
          <div class="divRows">
            <h3>{{ $t("season.numberOfTotalEpisode") }}</h3>
            <div class="div1colmns">
              <div class="form-group">
                <div class="number-input">
                  <button :disabled="isEdit" @click="changeEpisodeNumber('sub')" class="minus"
                    :class="isEdit ? 'isDisabled' : ''"></button>
                  <input class="quantity form-control" :class="error.total_episode ? 'error-border' : ''"
                    @keypress="isIntegerNumber($event)" min="0" name="quantity" id="episode_num" type="text"
                    v-model="seasonData.total_episode" maxlength="7" :disabled="isEdit" />
                  <button :disabled="isEdit" @click="changeEpisodeNumber('add')" class="plus"
                    :class="isEdit ? 'isDisabled' : ''"></button>
                </div>
                <span class="error-txt" v-if="error.total_episode">{{ error.total_episode }}</span>
              </div>
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("addNewPeople.primaryDetails.searchKeyword") }}</h3>
            <div class="div1colmns">
              <div class="form-group">
                <input type="text" class="form-control" :placeholder="$t('season.typeKeyword')"
                  v-model="seasonData.search_key" maxlength="100" :disabled="isEdit" />
              </div>
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("season.plot") }}</h3>
            <div class="div1colmns">
              <div class="form-group">
                <textarea rows="5" class="form-control" :placeholder="$t('season.typePlotSummary')"
                  v-model="seasonData.plot" :disabled="isEdit"></textarea>
              </div>
            </div>
          </div>
          <div class="divRows">
            <div class="heads-area">
              <h3>{{ $t("addNewMoviesForm.AKA") }}</h3>
              <span @mouseover="tooltipHover = true" @mouseleave="tooltipHover = false">
                <img src="@/assets/icons/question.svg" alt="question" />
              </span>
            </div>
            <div class="div1colmns">
              <div class="form-group">
                <input type="test" class="form-control" :placeholder="$t('addNewWebtoonForm.typeWebtoonAKA')"
                  v-model="seasonData.aka" maxlength="150" :disabled="isEdit" />
              </div>
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("season.channel") }}</h3>
            <div class="div1colmns">
              <div class="togglewatch-area">
                <div class="form-group">
                  <SearchDropdown @dropdownValue="selectedChannels" :search_type="channel_id"
                    :searchTitleListItem="channelOptions" searchtitle="name" searchvalue="ott_id" :disabled="isEdit"
                    :labelItem="$t('season.selectChannels')" />
                </div>
                <div class="selectTags-area">
                  <div class="watchTags watch-tag-rounds" v-for="(item, index) in channelValue" :key="index">
                    <div class="icon-txt">
                      <span>{{ item.name }}</span>
                    </div>
                    <div :class="isEdit ? 'isDisabled' : ''" class="corss" @click="removeChannelNames(item.ott_id)">
                      <img src="@/assets/icons/close-g.svg" :class="isEdit ? 'pointer-events-none' : ''" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="divRows">
            <h3>{{ $t("season.newsSearchKeyword") }}</h3>
            <div class="div1colmns">
              <div class="form-group">
                <input type="text" class="form-control" :placeholder="$t('season.newsSearchKeyword')"
                  v-model="seasonData.news_key" maxlength="100" :disabled="isEdit" />
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="divRows mt-0">
            <h3>{{ $t('addNewWebtoonForm.read') }}</h3>
            <div class="div1colmns">
              <div class="togglewatch-area">
                <WatchStream :ottList="seasonOttList" @watchInput="getWatchStreamList"
                  :selectText="$t('addNewWebtoonForm.selecrRead')" :belowList="getstream_list"
                  :watchstream="watch_on_stream" typecat="webtoons" :isEdit="isEdit" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- submit modal -->
  <div class="new-cast-modal center-popup-modal">
    <PopUpModal :isModal="isSubmit">
      <template v-slot:header>
        <h1 class="text-center" v-html="$t('addNewMoviesForm.youShouldSubmitToSendTheAdd')"></h1>
      </template>
      <template v-slot:body> </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" @click="addSeason">
            {{ $t("button.ok") }}
          </button>
          <button class="red-fill-btn" @click="isSubmit = false">
            {{ $t("button.cancel") }}
          </button>
        </div>
      </template>
    </PopUpModal>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, computed } from "@vue/runtime-core";
import AddNewTVService from "@/services/AddNewTVService";
import AddWebtoonService from "@/services/AddWebtoonService";
import WatchStream from "@/components/AddNewmovie/WatchStream.vue";
import Calender from "@/components/Calender.vue";
import { useRoute, useRouter } from "vue-router";
import Toast from "@/alert/alert.js";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import { isIntegerNumber } from "@/mixins/CommonValidation.js";

const props = defineProps({
  site_language: String,
  seasonId: Number,
  saveIdList: Object
});
const emit = defineEmits(["selectedId", "isEditOn", "updatedMenu"])

const route = useRoute();
const router = useRouter();
const routeId = ref(route.params.id);
const showSec = ref(true);
const channelValue = ref([]);
const tooltipHover = ref(false);
const channelOptions = ref([]);
const addNewTVService = new AddNewTVService();
const addWebtoonService = new AddWebtoonService();
const seasonRequestList = ref([]);
const getstream_list = ref([]);
const watch_on_stream = ref([]);
const deleteWatch = ref(false);
const seasonData = reactive({
  title: "",
  season_no: "",
  release_date: "",
  release_date_to: "",
  total_episode: 1,
  plot: "",
  aka: "",
  search_key: "",
  news_key: "",
  selected_channels: [],
  selected_connections: [],
});
const thumbnailImage = ref(null);
const seasonOttList = ref([]);
const resetComponents = ref(0);
const error = ref({});
const isSubmit = ref(false);
const type = ref("webtoons");
const draft_season_id = ref("");
const imgErr = ref("");
const datePlaceholder = ref("MM.DD.YYYY");
const title_id = ref(
  route.params.type == "internal" ? route.params.external_id : ""
);
const edit_season_id = ref("");
const isEdit = ref(false);
const channel_id = ref(null);
const fileName = ref("");
const addSec = ref(false);
const clickSeasonData = reactive({
  season_no: "",
  season_id: "",
  tmdb_id: "",
  id: "",
});
const clickSelectedData = ref("");
const tmdb_id = ref(localStorage.getItem("tmdb_id") ? localStorage.getItem("tmdb_id") : "");

onMounted(() => {
  if (route.params.type == "internal") {
    isEdit.value = true;
  }
  const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
  if (draft_ids[0]) {
    if (!draft_ids[0]?.primaryDetails[type.value]) {
      localStorage.removeItem("site_language");
      localStorage.removeItem("draft_ids");
      localStorage.removeItem("saveIdList");
    }
    routeId.value =
      draft_ids[0]?.primaryDetails[type.value] &&
        draft_ids[0]?.primaryDetails[type.value][props.site_language]
          ?.draft_request_id
        ? draft_ids[0]?.primaryDetails[type.value][props.site_language]
          ?.draft_request_id
        : "";
  } else {
    routeId.value = routeId.value;
  }
  seasonDetails();
});
// on language change
watch(
  () => props.site_language,
  function (n, o) {
    if (n && n != o) {
      const draft_ids = JSON.parse(
        localStorage.getItem("draft_ids") || "[]"
      );
      if (draft_ids[0]) {
        routeId.value =
          draft_ids[0]?.primaryDetails[type.value] &&
            draft_ids[0]?.primaryDetails[type.value][props.site_language]
              ?.draft_request_id
            ? draft_ids[0]?.primaryDetails[type.value][props.site_language]
              ?.draft_request_id
            : "";
      } else {
        routeId.value = routeId.value;
      }
      clickSelectedData.value = "";
      watch_on_stream.value = [];
      seasonData.selected_channels = [];
      channelValue.value = [];
      seasonDetails();
      setTimeout(() => {
        if (clickSelectedData.value[0]?.season_no) {
          seasonDetailsEdit(
            clickSelectedData.value[0].draft_season_id,
            clickSelectedData.value[0].season_id,
            clickSelectedData.value[0].tmdb_id,
            clickSelectedData.value[0].season_no
          );
        }
      }, 500);
    }
  }
);

// season list api
const seasonDetails = () => {
  let getWebtoonSeasonList;

  if (route.params.type == "internal") {
    getWebtoonSeasonList = addWebtoonService.getSeasonList(
      title_id.value,
      props.site_language,
      routeId.value
    );
  } else {
    getWebtoonSeasonList = addWebtoonService.getSeasonDetails(
      routeId.value,
      props.site_language
    );
  }

  if (routeId.value || title_id.value) {
    getWebtoonSeasonList
      .then((res) => {
        if (res.status == 200) {
          emit("selectedId", {
            ...JSON.parse(localStorage.getItem("saveIdList") || "{}"),
            request_id: res.data.results[0]?.draft_request_id ? res.data.results[0]?.draft_request_id : routeId.value,
            season_id: res.data.results[0]?.draft_season_id,
          });
          seasonRequestList.value = res.data.results;
          if (route.params.type == "internal") {
            clickSelectedData.value = seasonRequestList.value.filter(
              (item) => {
                return (
                  item.season_no === clickSeasonData.season_no &&
                  item.season_id == clickSeasonData.id
                );
              }
            );
          } else {
            clickSelectedData.value = seasonRequestList.value.filter(
              (item) => {
                return (
                  item.season_no === clickSeasonData.season_no &&
                  item.draft_request_id == routeId.value &&
                  item.tmdb_id == clickSeasonData.tmdb_id
                );
              }
            );
          }
        } else {
          seasonRequestList.value = [];
        }
      })
      .catch((err) => {
        console.log(err)
        return;
      });
  }
};

const seasonDetailsEdit = async (season_id, id, tmdb_id, season_no) => {
  clickSeasonData.id = id ? id : "";
  clickSeasonData.season_id = season_id;
  clickSeasonData.season_no = season_no;
  clickSeasonData.tmdb_id = tmdb_id;
  channelValue.value = [];
  let getWebtoonSeasonDetails;
  if (route.params.type == "internal") {
    getWebtoonSeasonDetails = addWebtoonService.getEditWebttonSeasonDetails(
      title_id.value,
      id,
      routeId.value,
      season_id,
      props.site_language
    );
  } else {
    getWebtoonSeasonDetails = addWebtoonService.seasonDetails(
      props.site_language,
      routeId.value,
      season_id,
    );
  }

  try {
    let res = await getWebtoonSeasonDetails;
    if (res) {
      getOTTListForSeason();
      getSeasonChannelList();
    }
    showSec.value = false;
    edit_season_id.value = res.data.season_id;
    seasonData.season_no = res.data.season_no;
    seasonData.title = res.data.season_name;
    seasonData.total_episode = res.data.total_episode;
    seasonData.release_date = res.data.release_date;
    seasonData.plot = res.data.plot;
    seasonData.aka = res.data.aka;
    seasonData.search_key = res.data.search_keyword_details
      ? res.data.search_keyword_details
        .map((i) => i.search_keyword)
        .join(",")
      : [];
    seasonData.news_key = res.data.news_keyword_details
      ? res.data.news_keyword_details.map((i) => i.news_keyword).join(",")
      : "";
    thumbnailImage.value = res.data.display_image;
    getstream_list.value = res.data.getRead_list
      ? res.data.getRead_list
      : [];
    Array.from(getstream_list.value).forEach((item) => {
      if (route.params.type == "internal") {
        watch_on_stream.value.push({
          ott_provider_id: item.provider_id,
          read_id: item.read_id,
          id: item.id,
        });
      } else {
        watch_on_stream.value.push({
          ott_provider_id: item.provider_id,
          read_id: item.read_id,
        });
      }
    });


    draft_season_id.value = res.data.request_season_id
      ? res.data.request_season_id
      : draft_season_id.value;

    Array.from(res.data.getChannel_list).forEach((item) => {
      channelValue.value.push({
        name: item.webtoons_channel_name,
        ott_id: item.webtoons_channel_id,
      });
    });

    if (route.params.type == "internal") {
      Array.from(res.data.getChannel_list).forEach((item) => {
        seasonData.selected_channels.push({
          id: item.id,
          webtoons_channel_id: item.webtoons_channel_id,
        });
      });
    } else {
      seasonData.selected_channels = res.data.getChannel_list
        ? res.data.getChannel_list.map((i) => i.webtoons_channel_id)
        : [];
    }
  } catch (error) {
    console.warn(error);
  }
};

// for thumbnail image
const getThumbnailImage = (e) => {
  let file = e.target.files[0];
  let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  if (!allowedExtensions.exec(file.name)) {
    imgErr.value = t("Error.onlyJpg");
    document.querySelector("#img-upload").value = "";
  } else if (Math.round(file.size / 1024 / 1024) > 25) {
    imgErr.value = t("Error.uploadFileSize");
    document.querySelector("#img-upload").value = "";
  } else {
    imgErr.value = "";
    fileName.value = file.name;
    thumbnailImage.value = {
      image_file: file,
      image_url: URL.createObjectURL(file),
    };
  }
};

// remove image
const removeImage = () => {
  thumbnailImage.value = null;
  fileName.value = "";
  document.querySelector("#img-upload").value = "";
};

// get value of dates
const getInitialDate = (data) => {
  if (seasonRequestList.value.length > 0) {
    resetComponents.value++;
    // Find the maximum date
    var dates = seasonRequestList.value.map((date) => {
      return date.release_date;
    });
    if (dates.includes(data)) {
      seasonData.release_date = "";
      error.value.release_date = computed(() =>
        t("Error.properReleaseDate")
      );
    } else {
      seasonData.release_date = data;
      error.value.release_date = ref("");
    }
  } else {
    seasonData.release_date = data;
  }
};

// total number of episode
const changeEpisodeNumber = (type) => {
  if (type == "add" && seasonData.total_episode < 999) {
    seasonData.total_episode++;
  }
  if (type == "sub" && seasonData.total_episode > 1) {
    seasonData.total_episode--;
  }
};

//Get list of OTT platforms
const getOTTListForSeason = async () => {
  try {
    let ottResponse = await addNewTVService.getSeasonOTTList(
      props.site_language,
      type.value
    );
    // console.log("OTT", ottResponse);
    seasonOttList.value = ottResponse.data.results;
  } catch (error) {
    console.warn("OTT-ERROR", error);
  }
};


// Get channel list
const getSeasonChannelList = async () => {
  try {
    let channelResponse = await addNewTVService.getSeasonOTTList(
      props.site_language,
      type.value
    );
    Array.from(channelResponse.data.results).forEach((item) =>
      channelOptions.value.push({
        name: item.ott_service_provider_name,
        ott_id: item.ott_service_provider_id,
      })
    );
    // console.log("CHANNEL", channelOptions.value);
  } catch (error) {
    console.warn(error);
  }
};

const selectedChannels = (e) => {
  channel_id.value = e;
  if (e == null) {
    return;
  }
  let selectedOption = Number(e);
  if (!seasonData.selected_channels.includes(selectedOption)) {
    if (route.params.type == "internal") {
      let data = seasonData.selected_channels.find((f) => {
        return f.webtoons_channel_id == selectedOption;
      });
      if (!data) {
        seasonData.selected_channels.push({
          webtoons_channel_id: selectedOption,
          id: "",
        });
      }
    } else {
      seasonData.selected_channels.push(selectedOption);
    }
  }
  let channelName = channelOptions.value.find(
    (item) => item.ott_id == selectedOption
  );
  let data = channelValue.value.find((f) => {
    return f.ott_id == selectedOption;
  });
  if (!data) {
    channelValue.value.push(channelName);
  }
};

const removeChannelNames = (channel) => {
  let index = channelValue.value.findIndex((i) => i.ott_id == channel);
  if (index > -1) channelValue.value.splice(index, 1);

  if (route.params.type == "internal") {
    let index2 = seasonData.selected_channels.findIndex(
      (i) => i.webtoons_channel_id == channel
    );
    if (index2 > -1) seasonData.selected_channels.splice(index2, 1);
  } else {
    let index2 = seasonData.selected_channels.findIndex(
      (i) => i == channel
    );
    if (index2 > -1) seasonData.selected_channels.splice(index2, 1);
  }
  // console.log(seasonData.selected_channels);
};

const isEditBtn = () => {
  isEdit.value = false;
  emit("isEditOn", false);
};

// add season details section
const addNewSeaon = () => {
  draft_season_id.value = "";
  edit_season_id.value = "";
  showSec.value = false;
  isEdit.value = false;
  addSec.value = true;
  getOTTListForSeason();
  getSeasonChannelList();
  deleteSeasonData();
};

const addSeasonModal = () => {
  // console.log('season data', thumbnailImage.value)
  imgErr.value = "";

  if (seasonData.season_no) {
    if (isNaN(seasonData.season_no)) {
      error.value.season_number = computed(() => t("Error.onlyNumberReq"));
    } else {
      error.value.season_number = ref("");
    }
  }
  if (seasonData.total_episode) {
    if (isNaN(seasonData.total_episode)) {
      error.value.total_episode = computed(() => t("Error.onlyNumberReq"));
    } else {
      error.value.total_episode = ref("");
    }
  }
  if (seasonData.season_no == "" && !/[0-9]+/.test(seasonData.season_no)) {
    error.value.season_number = computed(() => t("Error.seasonNumber"));
  }
  if (seasonData.title == "") {
    error.value.season_title = computed(() => t("Error.seasonTitle"));
  } else {
    error.value.season_title = ref("");
  }

  if (
    Object.values(error.value).filter((x) => {
      return x.length > 0;
    }).length != 0
  ) {
    setTimeout(() => {
      const errorElement = document.querySelector(".error-txt");
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 500);
    return false;
  }
  isSubmit.value = true;
};

// add season api
const addSeason = async () => {
  let formData = new FormData();

  const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");

  if (draft_ids[0] && route.params.type == "internal") {
    routeId.value =
      draft_ids[0]?.primaryDetails[type.value] &&
        draft_ids[0]?.primaryDetails[type.value][props.site_language]
          ?.draft_request_id
        ? draft_ids[0]?.primaryDetails[type.value][props.site_language]
          ?.draft_request_id
        : draft_ids[0]?.primaryDetails[type.value].draft_relation_id
          ? draft_ids[0]?.primaryDetails[type.value].draft_relation_id
          : "";
  }

  if (route.params.type == "internal") {
    formData.append("title_id", title_id.value);
    formData.append("season_id", edit_season_id.value);
  }

  if (thumbnailImage.value == null) {
    formData.append("image_action", "");
  } else if (thumbnailImage.value?.image_file) {
    formData.append("image", thumbnailImage.value.image_file);
    formData.append("image_action", "");
  } else {
    formData.append("image_action", "unchanged");
  }
  formData.append("site_language", props.site_language);
  formData.append("draft_request_id", routeId.value ? Number(routeId.value) : 0);
  formData.append("draft_season_id", draft_season_id.value);
  formData.append("season_no", seasonData.season_no);
  formData.append("season_name", seasonData.title);
  if (seasonData.release_date) {
    formData.append("release_date", seasonData.release_date);
  }
  formData.append("episode_count", seasonData.total_episode);
  formData.append("search_keyword", seasonData.search_key);
  formData.append("summary", seasonData.plot);
  formData.append("aka", seasonData.aka);
  formData.append("news_search_keyword", seasonData.news_key);

  seasonData.selected_channels.forEach((item, i) =>
    formData.append(`channel[${i}]`, JSON.stringify(item))
  );
  watch_on_stream.value.forEach((item, i) =>
    formData.append(`read[${i}]`, JSON.stringify(item))
  );

  let addWebtoonSeasonDetails;
  if (route.params.type == "internal") {
    addWebtoonSeasonDetails = addWebtoonService.editSeasonDeatils(formData, title_id.value);
  } else {
    addWebtoonSeasonDetails = addWebtoonService.addSeasonDeatils(formData);
  }

  try {
    let response = await addWebtoonSeasonDetails;
    error.value = {};
    // emit("updatedMenu");
    if (response.status == 200) {
      props.saveIdList.season_id = response.data.data[0].draft_season_id;
      props.saveIdList.request_id = response.data.data[0].draft_request_id;
      routeId.value = response.data.data[0].draft_request_id;
      localStorage.setItem("saveIdList", JSON.stringify(props.saveIdList));
      emit("selectedId", props.saveIdList);
      Toast.fire({ title: t("Error.success") });
      isSubmit.value = false;
      showSec.value = true;
      watch_on_stream.value = [];
      seasonData.selected_channels = [];
      channelValue.value = [];
      error.value.watch_on_stream = ref("");
      seasonDetails();
      if (route.params.type == "internal") {
        isEdit.value = true;
        emit("isEditOn", true);
        const draft_ids = JSON.parse(
          localStorage.getItem("draft_ids") || "[]"
        );
        if (draft_ids[0]) {
          const res_option_type =
            draft_ids[0].primaryDetails[type.value][props.site_language]
              ?.draft_request_id;

          if (!res_option_type) {
            draft_ids[0].primaryDetails[type.value][props.site_language] =
              response.data.data[0];
          }
        } else {
          const put_primary_details = {
            primaryDetails: {
              [type.value]: {
                [props.site_language]: {
                  draft_request_id: response.data.data[0].draft_request_id,
                },
                draft_relation_id: response.data.data[0].draft_request_id,
              },
            },
          };
          draft_ids.push(put_primary_details);
        }
        // Saving
        localStorage.setItem("draft_ids", JSON.stringify(draft_ids));
        router.push({
          name: "AddNewWebtoonDetails",
          params: {
            external_id: title_id.value,
            type: "internal",
            id: response.data.data[0].draft_request_id,
            itemActive: "season",
            activeIndex: "1",
          },
        });
      }
    } else if (response.response.status == 400) {
      Toast.fire({ title: response.response.data.error });
      isSubmit.value = false;
    } else {
      isSubmit.value = false;
      Toast.fire({ title: response.response.data.error });
    }
  } catch (error) {
    console.log(error);
  }
};

// delete season data

const deleteSeasonData = () => {
  seasonData.season_no = "";
  seasonData.title = "";
  seasonData.release_date = "";
  seasonData.total_episode = 1;
  seasonData.plot = "";
  seasonData.aka = "";
  seasonData.search_key = "";
  seasonData.news_key = "";
  seasonData.selected_channels = [];
  channel_id.value = null;
  watch_on_stream.value = [];
  fileName.value = "";
  thumbnailImage.value = null;
  channelValue.value = [];
  getstream_list.value = [];
  resetComponents.value++;

  setTimeout(() => {
    deleteWatch.value = false;
  }, 200);
};

//watch stream input
const getWatchStreamList = (val) => {
  watch_on_stream.value = val;
};
</script>

<style lang="scss" scoped>
.error-txt {
  color: #db5857;
  padding-left: 0;
  font-weight: 400;
  font-size: 12px;
  display: block;
  text-align: left;
}
</style>
