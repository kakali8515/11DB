<template>
    <div class="primary-details-from">
        <div
            :class="['page-heading-area episode-heading bb-0 episode-heading', $route.params.type == 'internal' ? 'tmtb-heading' : 'tmtb-heading']">
            <h2>{{ $t("episode.episode") }}</h2>
            <div class="media-tmtb-outer">
                <div class="form-group number-id" v-if="$route.params.type == 'internal'">
                    <div class="tmtb-fill">
                        <input type="text" v-model="tmdb_id" class="form-control"
                            :placeholder="$t('addNewMoviesForm.TMDBID')" @keypress="isIntegerNumber($event)" readonly />
                        <!-- <span class="refreshBtn" @click="tmdbRefreshClick" :class="isEdit ? 'pointer-events-none' : ''"><svg
                                width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1 1V6H1.58152M16.9381 8C16.446 4.05369 13.0796 1 9 1C5.64262 1 2.76829 3.06817 1.58152 6M1.58152 6H6M17 17V12H16.4185M16.4185 12C15.2317 14.9318 12.3574 17 9 17C4.92038 17 1.55399 13.9463 1.06189 10M16.4185 12H12"
                                    stroke="white" />
                            </svg>
                        </span> -->
                    </div>

                </div>
                <div class="media-save-btn">
                    <a class="saveBtn" @click="isEdit == true ? isEditBtn() : (isSubmit = true)">{{ isEdit ?
                        $t("button.edit") :
                        $t("button.save") }}</a>
                </div>
            </div>
        </div>
        <div class="search-episode">
            <div class="search-form">
                <div class="select-option">
                    <SearchDropdown @dropdownValue="getSeasonValue" :search_type="selectedSeason"
                        :searchTitleListItem="seasonRequestList" :searchtitle="seasonRequestList.length > 0
                            ? (item) => `${$t('episode.season')} ${item.season_no}`
                            : ''
                            " return-object :clearable="false" />
                </div>
                <div class="search-field">
                    <input type="text" :placeholder="$t('episode.searchEpisode') +
                        ' in ' +
                        $t('episode.season') +
                        ' ' +
                        seasonSelect
                        " class="form-control" v-model="search_title" @keypress.enter="searchForEpisodes(draft_season_id, exist_season_id)
        " />
                    <button class="search-btn" @click="searchForEpisodes(draft_season_id, exist_season_id)">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.60039 2.67979C4.94942 2.67979 2.80039 4.82882 2.80039 7.47979C2.80039 10.1308 4.94942 12.2798 7.60039 12.2798C10.2514 12.2798 12.4004 10.1308 12.4004 7.47979C12.4004 4.82882 10.2514 2.67979 7.60039 2.67979ZM0.400391 7.47979C0.400391 3.50334 3.62394 0.279785 7.60039 0.279785C11.5768 0.279785 14.8004 3.50334 14.8004 7.47979C14.8004 9.03478 14.3074 10.4746 13.4693 11.6516L19.2489 17.4313C19.7175 17.8999 19.7175 18.6597 19.2489 19.1283C18.7803 19.5969 18.0205 19.5969 17.5519 19.1283L11.7722 13.3487C10.5953 14.1868 9.15539 14.6798 7.60039 14.6798C3.62394 14.6798 0.400391 11.4562 0.400391 7.47979Z"
                                fill="white" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="episode-list">
            <ul class="list-wrapper" v-if="episodeList.length > 0" :class="isEdit ? 'isDisabled' : ''">
                <draggable :disabled="isEdit" v-model="episodeList" item-key="episode_number" :animation="300"
                    :forceFallback="true" :scroll-sensitivity="200">
                    <template #item="{ element }">
                        <li class="episode-card" :class="isEdit ? 'pointer-events-none' : ''">
                            <div class="close-cross" :class="isEdit ? 'pointer-events-none' : ''"
                                @click="closeEpisodeTab(element.episode_number)">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_4676_112527)">
                                        <path
                                            d="M12.2005 3.80714C11.9405 3.54714 11.5205 3.54714 11.2605 3.80714L8.00047 7.06047L4.74047 3.80047C4.48047 3.54047 4.06047 3.54047 3.80047 3.80047C3.54047 4.06047 3.54047 4.48047 3.80047 4.74047L7.06047 8.00047L3.80047 11.2605C3.54047 11.5205 3.54047 11.9405 3.80047 12.2005C4.06047 12.4605 4.48047 12.4605 4.74047 12.2005L8.00047 8.94047L11.2605 12.2005C11.5205 12.4605 11.9405 12.4605 12.2005 12.2005C12.4605 11.9405 12.4605 11.5205 12.2005 11.2605L8.94047 8.00047L12.2005 4.74047C12.4538 4.48714 12.4538 4.06047 12.2005 3.80714Z"
                                            fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4676_112527">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div class="left-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_4676_112514)">
                                        <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4676_112514">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div class="right-content webtoon-content" @click="getSavedEpisodeDeatils(element)">
                                <div class="card-img-wrap webtoon-episode-img">
                                    <img v-if="element.episode_image" :src="element.episode_image" alt=""
                                        class="card-img" />

                                    <img v-else src="@/assets/images/no-image-view.png" alt="" class="card-img" />
                                </div>
                                <div class="episode-details">
                                    <span class="episode-no">{{ $t("episode.episode") }}
                                        {{
                                            element.episode_number > 9
                                            ? element.episode_number
                                            : "0" + element.episode_number
                                        }}</span>
                                    <h1 class="episode-title">{{ element.episode_title }}</h1>
                                    <h3 class="release-date" v-if="element.episode_date">
                                        {{ dateformat(element.episode_date, 'MMMM DD, YYYY') }}
                                    </h3>
                                    <h3 class="release-date" v-if="element.release_date">
                                        {{ dateformat(element.release_date, 'MMMM DD, YYYY') }}
                                    </h3>
                                </div>
                            </div>
                        </li>
                    </template>
                </draggable>
            </ul>
            <div class="tv-no-data" v-else>{{ $t("addNewPeople.noData") }}</div>
        </div>
        <button class="add-season-btn" @click="openEpisodeModal" :disabled="isEdit" :class="isEdit ? 'isDisabled' : ''">
            {{ $t("episode.+addNewEpisode") }}
        </button>
        <!-- <button @click="isEdit == true ? (isEdit = false) : (isSubmit = true)" :disabled="search_title != '' ? true : false"
            :class="search_title != ''
                ? 'isDisabled save-button mobilebtns'
                : 'save-button mobilebtns'
                ">
            {{ isEdit ? $t("button.edit") : $t("button.save") }}
        </button> -->
    </div>

    <!-- add tag modal -->

    <div class="new-cast-modal add-img-modal episode-modal">
        <PopUpModal :isModal="isEpisodeModal">
            <template v-slot:header>
                <h1>{{ $t("episode.addNewEpisode") }}</h1>
            </template>
            <template v-slot:body>
                <div class="cast-details">
                    <div class="episode-modal-content">
                        <div class="img-upload-show">
                            <div class="image-preview" @click="getImagePreview">
                                <img :src="detailImage" id="image_preview" />
                            </div>
                            <div class="upload-options">
                                <label>
                                    <span class="camera-upload">
                                        <img src="@/assets/icons/camera.svg" alt="" />
                                        <input type="file" class="image-upload" id="image_file" @change="getImage($event)"
                                            accept="image/*" style="opacity: 0" />
                                    </span>
                                </label>
                            </div>
                        </div>
                        <span class="error-txt mt-10" v-if="errorData.image_err">{{ errorData.image_err }}</span>
                        <div class="episode-row">
                            <div class="divRows">
                                <h3>{{ $t("episode.episodeNumber") }}</h3>
                                <div class="div1colmns">
                                    <div class="form-group">
                                        <input type="text" class="form-control" :placeholder="$t('episode.episodeNo')"
                                            v-model="episode_number" @keypress="isIntegerNumber($event)" maxlength="3"
                                            :class="errorData.episode_number ? 'error-border' : ''" />
                                        <span v-if="errorData.episode_number" class="error-txt">{{
                                            errorData.episode_number
                                        }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="divRows">
                                <h3>{{ $t("episode.episodeTitle") }}</h3>
                                <div class="div1colmns">
                                    <div class="form-group">
                                        <input type="text" class="form-control"
                                            :placeholder="$t('episode.selectEpisodeTitle')" v-model="episode_title"
                                            maxlength="150" :class="errorData.episode_title ? 'error-border' : ''" />
                                        <span class="error-txt" v-if="errorData.episode_title">{{ errorData.episode_title
                                        }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="divRows">
                                <h3>{{ $t("episode.date") }}</h3>
                                <div class="div1colmns">
                                    <Calender @date="getRealeaseDate" :input_date="episode_realese_date"
                                        :datePlaceholder="datePlaceholder" />
                                </div>
                            </div>

                            <div class="divRows">
                                <h3>URL</h3>
                                <div class="div1colmns">
                                    <div class="form-group">
                                        <input @keyup="checkURL" type="text" v-model="url" class="form-control"
                                            :placeholder="$t('addNewWebtoonForm.enterUrl')"
                                            :class="errorData.url ? 'error-border' : ''" />
                                        <span class="error-txt" v-if="errorData.url">{{ errorData.url }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="button-group">
                    <button class="black-outline-btn" :disabled="disabled" @click="addNewEpisode">
                        {{ $t("button.save") }}
                    </button>
                    <button class="red-fill-btn" @click="canselEpisodeData">
                        {{ $t("button.cancel") }}
                    </button>
                </div>
            </template>
        </PopUpModal>
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
                    <button class="black-outline-btn" @click="saveEpisodeList">
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
import { onBeforeUnmount, onMounted, ref, watch } from "@vue/runtime-core";
import AddNewTVService from "@/services/AddNewTVService";
import EditTVService from "@/services/EditTVService";
import AddWebtoonService from "@/services/AddWebtoonService";
import { useRoute, useRouter } from "vue-router";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import Calender from "@/components/Calender.vue";
import Toast from "@/alert/alert.js";
import epsodeImage from "@/assets/images/poster-no-image.jpg";
import { computed } from "@vue/reactivity";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import { isIntegerNumber, isValidUrl } from "@/mixins/CommonValidation.js";
import { dateformat } from "@/mixins/CommonFunctions.js";
import draggable from "vuedraggable";

const props = defineProps({
    site_language: String,
    requiredId: Object,
    saveIdList: Object
});
const emit = defineEmits(["selectedId", "isEditOn"])
const route = useRoute();
const router = useRouter();
const addNewTVService = new AddNewTVService();
const editTVService = new EditTVService();
const addWebtoonService = new AddWebtoonService();
const seasonRequestList = ref([]);
const episodeList = ref([]);
const routeId = ref(route.params.id);
const draft_season_id = ref(null);
const draft_episode_id = ref(null);
const episode_number = ref(null);
const episode_title = ref("");
const url = ref("");
const episode_realese_date = ref("");
const search_title = ref("");
const isEpisodeModal = ref(false);
const image_file = ref(null);
const isSubmit = ref(false);
const detailImage = ref(epsodeImage);
const allEpisodeList = ref([]);
const errorData = ref({});
const actionType = ref("e");
const editedSeasonNo = ref("");
const editedImage = ref("");
const datePlaceholder = ref("MM.DD.YYYY");
const title_id = ref(
    route.params.type == "internal" ? route.params.external_id : ""
);
const exist_season_id = ref("");
const type = ref("webtoons");
const disabled = ref(false);
const timeout = ref(null);
const isEdit = ref(false);
const seasonSelect = ref("");
const selectedSeason = ref("");
const episode_id = ref("");
const closeEpi = ref(false);
const tmdb_id = ref(localStorage.getItem("tmdb_id") ? localStorage.getItem("tmdb_id") : "");
const istmDBIdClick = ref(false);
const tmdbEpisodeList = ref([]);

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
        draft_episode_id.value =
            draft_ids[0]?.primaryDetails[type.value] &&
                draft_ids[0]?.primaryDetails[type.value][props.site_language]
                    ?.draft_episode_id
                ? draft_ids[0]?.primaryDetails[type.value][props.site_language]
                    ?.draft_episode_id
                : draft_episode_id.value;
    } else {
        routeId.value = routeId.value;
        draft_episode_id.value = draft_episode_id.value;
    }
    seasonDetails();
    draft_season_id.value = props.requiredId.season_request_id;
});

watch(
    () => isEpisodeModal.value,
    (currentValue, oldValue) => {
        if (currentValue != oldValue && currentValue == true) {
            setTimeout(() => {
                let image_preview = document.querySelector("#image_preview");
                image_preview.src = detailImage.value;
            }, 100);
        } else {
            detailImage.value = epsodeImage;
            errorData.episode_number = "";
            episode_number.value = "";
            episode_title.value = "";
            episode_realese_date.value = "";
            url.value = "";
        }
    }
);
watch(
    () => search_title.value,
    (currentValue, oldValue) => {
        if (currentValue != oldValue && search_title.value == "") {
            searchForEpisodes(draft_season_id.value, exist_season_id.value);
            allEpisodes(draft_season_id.value, exist_season_id.value);
        }
    }
);
watch(
    () => isEpisodeModal.value,
    (currentValue, oldValue) => {
        if (currentValue != oldValue && isEpisodeModal.value == false) {
            editedSeasonNo.value = "";
        }
    }
);
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
            seasonDetails();
        }
    }
);
watch(
    () => isEpisodeModal.value,
    (currentValue, oldValue) => {
        if (currentValue != oldValue && isEpisodeModal.value == false) {
            disabled.value = false;
        }
    }
);
// season dropdown list api
const seasonDetails = () => {
    let getTVSeasonList;

    if (route.params.type == "internal") {
        getTVSeasonList = editTVService.getEditSeasonList(
            title_id.value,
            routeId.value,
            props.site_language
        );
    } else {
        getTVSeasonList = addNewTVService.getSeasonList(
            routeId.value,
            props.site_language,
            type.value
        );
    }

    getTVSeasonList
        .then((res) => {
            if (res.status == 200) {
                seasonRequestList.value = res.data.results;
                if (seasonRequestList.value.length == 0) {
                    seasonRequestList.value = [];
                    selectedSeason.value = "";
                    seasonSelect.value = "";
                    draft_season_id.value = "";
                    exist_season_id.value = "";
                    allEpisodeList.value = [];
                    draft_episode_id.value = "";
                    episodeList.value = [];
                }
                selectedSeason.value = res.data.results[0];
                seasonSelect.value = res.data.results[0].season_no;
                draft_season_id.value = res.data.results[0].draft_season_id;
                exist_season_id.value = res.data.results[0].season_id
                    ? res.data.results[0].season_id
                    : "";
                searchForEpisodes(draft_season_id.value, exist_season_id.value);
                allEpisodes(draft_season_id.value, exist_season_id.value);
            } else {
                seasonRequestList.value = [];
                selectedSeason.value = "";
                seasonSelect.value = "";
                draft_season_id.value = "";
                exist_season_id.value = "";
                allEpisodeList.value = [];
                draft_episode_id.value = "";
                episodeList.value = [];
            }
        })
        .catch((err) => {
            return;
        });
};

const getSeasonValue = (e) => {
    istmDBIdClick.value = false;
    selectedSeason.value = e;
    seasonSelect.value = e.season_no ? e.season_no : "";
    draft_season_id.value = e.draft_season_id ? e.draft_season_id : "";
    exist_season_id.value = e.season_id ? e.season_id : "";
    episodeList.value = [];
    allEpisodeList.value = [];
    searchForEpisodes(draft_season_id.value, exist_season_id.value);
    allEpisodes(draft_season_id.value, exist_season_id.value);
};

// All episodes list
const allEpisodes = async (draft_season_id, exist_season_id) => {
    let data = {
        draft_request_id: Number(routeId.value), //required
        draft_season_id: Number(draft_season_id), // required
        site_language: props.site_language, // required
        search_text: search_title.value, // optional
    };

    if (route.params.type == "internal") {
        data.title_id = title_id.value;
        data.season_id = Number(exist_season_id); //remiming
    }

    try {
        let response;

        if (route.params.type == "internal") {
            response = await addWebtoonService.editWebtoonReqList(data);
        } else {
            response = await addWebtoonService.getEpisodesList(data);
        }
        if (response.data.results.length) {
            emit("selectedId", {
                ...JSON.parse(localStorage.getItem("saveIdList") || "{}"),
                request_id: response.data.results[0].draft_request_id ? response.data.results[0].draft_request_id : response.data.draft_relation_id,
                episode_request_id: response.data.results[0].draft_episode_id ? response.data.results[0].draft_episode_id : draft_episode_id.value
            });
        }
        allEpisodeList.value = response.data.results;
        allEpisodeList.value.map((i) => {
            i.action_type = "e";
        });
        draft_episode_id.value = response.data.results[0]?.draft_episode_id
            ? response.data.results[0]?.draft_episode_id
            : draft_episode_id.value;
    } catch (error) {
        console.warn(error);
    }
};
// search episode and all episode
const searchForEpisodes = async (draft_season_id, exist_season_id) => {
    let data = {
        draft_request_id: Number(routeId.value), //required
        draft_season_id: Number(draft_season_id), // required
        site_language: props.site_language, // required
        search_text: search_title.value, // optional
    };

    if (route.params.type == "internal") {
        data.title_id = title_id.value;
        data.season_id = Number(exist_season_id);
    }

    try {
        let response;

        if (route.params.type == "internal") {
            response = await addWebtoonService.editWebtoonReqList(data);
        } else {
            response = await addWebtoonService.getEpisodesList(data);
        }

        episodeList.value = response.data.results;
        episodeList.value.map((i) => {
            i.action_type = "e";
        });
    } catch (error) {
        console.warn(error);
    }
};
const isEditBtn = () => {
    isEdit.value = false;
    emit("isEditOn", false);
};

// save episode list
const saveEpisodeList = async () => {
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

    let data = {
        draft_request_id: routeId.value,
        draft_season_id: draft_season_id.value,
        draft_episode_id: draft_episode_id.value,
        site_language: props.site_language,
        episode_details: [],
    };

    if (route.params.type == "internal") {
        data.title_id = title_id.value;
        data.season_id = exist_season_id.value;
    }
    if (closeEpi.value == true) {
        allEpisodeList.value.filter((i) => !episodeList.value.some((j) => i.episode_number === j.episode_number)).forEach((item) => {
            Object.assign(item, { action_type: "d" });
            episodeList.value.push(item);
        });
    } else {
        // console.log(allEpisodeList.value)
        // allEpisodeList.value.filter((i) => !episodeList.value.some((j) => i.episode_number === j.episode_number)).forEach((item) => {
        //     Object.assign(item, { action_type: "e" });
        //     episodeList.value.push(item);
        // });
    }
    //console.log(episodeList.value)
    //return
    if (episodeList.value.length > 0) {
        if (route.params.type == "internal") {
            Array.from(episodeList.value).forEach((item) => {
                // if (item.action_type) {
                data.episode_details.push({
                    action_type: item.action_type,
                    name: item.episode_title,
                    url: item.episode_summary || item.episode_url,
                    poster: item.episode_image,
                    release_date: item.release_date || item.episode_date || "",
                    episode_number: item.episode_number,
                    id: item.id,
                });
                // }
            });
        } else {
            Array.from(episodeList.value).forEach((item) => {
                data.episode_details.push({
                    action_type: item.action_type,
                    name: item.episode_title,
                    url: item.episode_summary || item.episode_url,
                    poster: item.episode_image,
                    release_date: item.release_date || item.episode_date || "",
                    episode_number: item.episode_number,
                });
            });
        }
    }

    try {
        let res;
        if (route.params.type == "internal") {
            res = await addWebtoonService.saveEditEpisode(data);
        } else {
            res = await addWebtoonService.saveEpisode(data);
        }
        if (res.status == 200) {
            draft_episode_id.value = res.data.data[0].draft_episode_id;
            props.saveIdList.episode_request_id = res.data.data[0].draft_episode_id;
            props.saveIdList.request_id = res.data.data[0].draft_request_id;
            isSubmit.value = false;
            istmDBIdClick.value = false;
            search_title.value = "";
            localStorage.setItem("saveIdList", JSON.stringify(props.saveIdList));
            emit("selectedId", props.saveIdList);
            Toast.fire({ title: t("Error.success") });
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
                        draft_ids[0].primaryDetails[type.value][props.site_language] = {};
                        draft_ids[0].primaryDetails[type.value][props.site_language] = res.data.data[0];
                    }
                } else {
                    const put_primary_details = {
                        primaryDetails: {
                            [type.value]: {
                                [props.site_language]: {
                                    draft_request_id: res.data.data[0].draft_request_id,
                                    draft_episode_id: res.data.data[0].draft_episode_id,
                                },
                                draft_relation_id: res.data.data[0].draft_request_id,
                            },
                        },
                    };
                    draft_ids.push(put_primary_details);
                }
                // Saving
                localStorage.setItem("draft_ids", JSON.stringify(draft_ids));
                localStorage.setItem("tmdb_id", tmdb_id.value);
                router.push({
                    name: "AddNewWebtoonDetails",
                    params: {
                        external_id: title_id.value,
                        type: "internal",
                        id: res.data.data[0].draft_request_id,
                        itemActive: "episode",
                        activeIndex: "2",
                    },
                });
            }
            searchForEpisodes(draft_season_id.value, exist_season_id.value);
            allEpisodes(draft_season_id.value, exist_season_id.value);
        } else {
            isSubmit.value = false;
            Toast.fire({ title: res.response.data.error });
        }
    } catch (error) {
        console.warn(error);
    }
    closeEpi.value = false;
};

// get episode details
const getSavedEpisodeDeatils = async (item) => {
    if (item.action_type == "a") {
        Toast.fire({
            title: t("Error.saveEpisode"),
        });
    } else {
        try {
            let res;

            if (route.params.type == "internal") {
                res = await addWebtoonService.getEditEpisodeDetails(
                    props.site_language,
                    routeId.value,
                    item.id,
                    item.episode_number,
                    title_id.value,
                    item.season_id,
                    item.draft_season_id,
                    item.draft_episode_id
                );
            } else {
                res = await addWebtoonService.getEpisodeDetails(
                    props.site_language,
                    routeId.value,
                    item.draft_episode_id,
                    item.episode_number
                );
            }

            if (res) {
                isEpisodeModal.value = true;
                // editedSeasonNo
                res.data.result.map((i) => {
                    editedSeasonNo.value = i.episode_no;
                    editedImage.value = i.image;
                });
                res.data.result.map((i) => {
                    detailImage.value = i.image ? i.image : epsodeImage;
                    episode_number.value = i.episode_no;
                    episode_title.value = i.episode_title;
                    episode_realese_date.value = i.date;
                    url.value = i.url;
                    episode_id.value = i.episode_id;
                });
            }
        } catch (error) {
            console.warn(error);
        }
    }
};

// get image ready
const getImagePreview = () => document.querySelector("#image_file").click();
const getImage = (e) => {
    let file = e.target.files[0];
    let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
        Toast.fire({ title: t("Error.onlyJpg") });
        document.querySelector("#img-upload").value = "";
    } else if (Math.round(file.size / 1024 / 1024) > 25) {
        Toast.fire({ title: t("Error.ImageSize") });
        document.querySelector("#image_file").value = "";
    } else {
        let image_preview = document.querySelector("#image_preview");
        image_preview.src = URL.createObjectURL(file);
        detailImage.value = URL.createObjectURL(file);
        image_file.value = file;
    }
};

// get date
const getRealeaseDate = (date) => {
    episode_realese_date.value = date;
};

// modal open

const openEpisodeModal = () => {
    isEpisodeModal.value = true;
    image_file.value = "";
    episode_number.value = "";
    episode_title.value = "";
    episode_realese_date.value = "";
    url.value = "";
    episode_id.value = "";
    errorData.value = {};
};

// add new episode details, this function is preventing to add multiple time on rapid btn click
const addNewEpisode = async () => {
    disabled.value = true;

    // Re-enable after 5 seconds
    timeout.value = setTimeout(() => {
        disabled.value = false;
    }, 5000);

    addNewEpisodePrev();
};
// add new episode details
const addNewEpisodePrev = async () => {
    let formData = new FormData();
    if (route.params.type == "internal") {
        formData.append("title_id", title_id.value);
        formData.append("season_id", exist_season_id.value);
        formData.append("episode_id", episode_id.value);
        formData.append("draft_episode_id", draft_episode_id.value ? draft_episode_id.value : "");
    }
    formData.append("draft_request_id", routeId.value ? routeId.value : 0);
    formData.append("draft_season_id", Number(draft_season_id.value));
    if (image_file.value) {
        formData.append("image", image_file.value);
    }
    formData.append("episode_no", episode_number.value);
    formData.append("episode_title", episode_title.value);
    formData.append("date", episode_realese_date.value ? episode_realese_date.value : "");
    formData.append("overview", url.value ? url.value : "");
    formData.append("site_language", props.site_language);
    formData.append("url", url.value ? url.value : "");
    formData.append("type", type.value);

    let episodeNo = allEpisodeList.value.map((i) => i.episode_number);
    let episodeNolatest = episodeList.value.map((i) => i.episode_number);

    if (!episode_number.value || episode_number.value == 0) {
        errorData.value.episode_number = computed(() =>
            t("Error.episodeNumber")
        );
    } else if (isNaN(episode_number.value)) {
        errorData.value.episode_number = computed(() =>
            t("Error.onlyNumberReq")
        );
    } else if (!episode_title.value) {
        errorData.value.episode_title = computed(() => t("Error.episodeTitle"));
    } else {
        if (
            editedSeasonNo.value &&
            episodeNolatest.includes(Number(episode_number.value)) &&
            editedSeasonNo.value != episode_number.value
        ) {
            errorData.value.episode_number = computed(() =>
                t("Error.episodeTaken")
            );
        } else if (
            editedSeasonNo.value == "" &&
            episodeNolatest.includes(Number(episode_number.value))
        ) {
            errorData.value.episode_number = computed(() =>
                t("Error.episodeTaken")
            );
        } else {
            try {
                let res;
                if (route.params.type == "internal") {
                    res = await editTVService.editEpisodeDetails(formData, title_id.value);
                } else {
                    res = await addNewTVService.addEpisodeDetails(formData);
                }
                if (res.status == 200) {
                    let data = res.data.episode_details;
                    //console.log('episodeNo', episodeNo);
                    //console.log('episodeNolatest', episodeNolatest);
                    //console.log('episode_number.value', episode_number.value);
                    //console.log('editedSeasonNo.value', editedSeasonNo.value);
                    if (
                        !(
                            episodeNo.includes(Number(editedSeasonNo.value)) ||
                            episodeNolatest.includes(Number(editedSeasonNo.value))
                        )
                    ) {
                        actionType.value = "a";
                    } else {
                        actionType.value = "e";
                    }
                    let editedEpisodeIndex = episodeList.value.findIndex(
                        (i) => i.episode_number == editedSeasonNo.value
                    );
                    // console.log(editedEpisodeIndex)
                    if (editedEpisodeIndex > -1) {
                        // episodeList.value.splice(editedEpisodeIndex, 1);
                        addDataReplace(episodeList.value, editedEpisodeIndex, {
                            action_type: actionType.value,
                            episode_image: data.poster_location
                                ? data.poster_location
                                : detailImage.value && detailImage.value != epsodeImage
                                    ? detailImage.value
                                    : "",
                            episode_number: data.episode_number,
                            episode_title: data.name,
                            release_date: data.release_date,
                            episode_summary: data.description ? data.description : "",
                            id: data.episode_id ? data.episode_id : "",
                            season_id: data.season_id,
                            draft_season_id: data.draft_season_id,
                            draft_episode_id: data.draft_episode_id,
                            draft_request_id: data.draft_request_id
                        });
                    } else {
                        episodeList.value.push({
                            action_type: actionType.value,
                            episode_image: data.poster_location
                                ? data.poster_location
                                : detailImage.value && detailImage.value != epsodeImage
                                    ? detailImage.value
                                    : "",
                            episode_number: data.episode_number,
                            episode_title: data.name,
                            release_date: data.release_date,
                            episode_summary: data.description ? data.description : "",
                            id: data.episode_id ? data.episode_id : "",
                            season_id: data.season_id,
                            draft_season_id: data.draft_season_id,
                            draft_episode_id: data.draft_episode_id,
                            draft_request_id: data.draft_request_id
                        });
                    }

                    console.log(episodeList.value)

                    isEpisodeModal.value = false;
                    errorData.value.episode_number = ref("");
                    errorData.value.episode_title = ref("");
                } else {
                    errorData.value.episode_number = ref("");
                    errorData.value.episode_title = ref("");
                    Toast.fire({ title: res.response.data.error });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
};

// Check if the position is within the bounds of the array
const addDataReplace = (arr, position, newData) => {
    if (position >= 0 && position < arr.length) {
        arr[position] = newData;
    } else {
        console.error("Error: Position out of bounds.");
    }
};

// clearing the timeout, which was implemented to prevent similar data addition in rapid btn click
onBeforeUnmount(() => {
    clearTimeout(timeout.value);
});
// cancel episode data
const canselEpisodeData = () => {
    isEpisodeModal.value = false;
    episode_number.value = "";
    episode_title.value = "";
    episode_realese_date.value = "";
    url.value = "";
    image_file.value = null;
    errorData.value.episode_number = ref("");
    errorData.value.episode_title = ref("");
    document.querySelector("#image_file").value = "";
};

const closeEpisodeTab = (id) => {
    closeEpi.value = true;
    let index = episodeList.value.findIndex(
        (item) => item.episode_number == id
    );
    if (index > -1) episodeList.value.splice(index, 1);
};

// ** validation **

const checkURL = () => {
    if (url.value == "") {
        errorData.value.url = ref("");
        return true;
    }
    if (!isValidUrl(url.value)) {
        errorData.value.url = computed(() => t("Error.validUrl"));
        return false;
    } else {
        errorData.value.url = ref("");
    }
};
</script>
  
<style lang="scss" scoped>
.tv-no-data {
    min-height: 160px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.error-txt {
    color: #db5857;
    padding-left: 0;
    font-weight: 400;
    font-size: 12px;
    display: block;
    text-align: left;
}

.mt-10 {
    margin-top: 10px;
}

.v-none {
    visibility: hidden;
}
</style>
  