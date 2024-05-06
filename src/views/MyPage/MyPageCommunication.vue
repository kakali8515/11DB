<template>
  <section class="mypage-sec">
    <div class="container">
      <div class="mypage-wrapper">
        <LeftSidePanel />
        <div class="mypage-rght">
          <h2>
            {{ $t("activity.leftSidePannel.Communications") }}
          </h2>
          <div class="tab-outr full-wd four">
            <DynamicTabWrapper @getResponseTitle="onChangeTab" :seasonId="selectedTabId">
              <DynamicTab v-for="tab in tab_list" :title="tab.name" :key="tab.id" :seasonId="tab.id + ''">
                <div v-if="communicationList.length">
                  <ul class="comm-list">
                    <li v-for="(item, index) in communicationList" :key="index">
                      <CommunicationCardOne :communication="item" @ReadMore="getReadMore" @redirection="redirection"
                        @delete="deleteCommunicationModal" @redirectPeople="redirectPeople" @redirectWork="redirectWork"
                        :type="communicationType" />
                    </li>
                  </ul>
                </div>
                <div v-else class="no-data">
                  <p>{{ $t("addNewPeople.noData") }}</p>
                </div>
              </DynamicTab>
            </DynamicTabWrapper>
          </div>
          <div v-if="isLoading"></div>
          <div ref="bottom"></div>
        </div>
      </div>
    </div>
    <div class="new-cast-modal">
      <PopUpModal :isModal="isCharacterModal">
        <template v-slot:header>
          <h1>{{ $t("adminAward.character") + " " + $t("credit.information") }}</h1>
          <button @click="isCharacterModal = false">
            <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
          </button>
        </template>
        <template v-slot:body>
          <div class="cast-details">
            <div class="cast-left-profile">
              <img v-if="characterInfo?.poster_image.includes('https')" :src="characterInfo?.poster_image" alt=""
                class="cast-img" />
              <img v-else src="@/assets/images/no-image-view.png" class="cast-img" />
            </div>

            <div class="right">
              <div class="form-grp">
                <label for="">{{ $t("credit.characterName") }}</label>
                <input type="text" :value="characterInfo?.person_name" readonly />
              </div>
              <div class="form-grp">
                <label for="">{{ $t("addNewWebtoonForm.charDesc") }}</label>
                <textarea class="form-control" readonly>{{ characterInfo?.character_description }}</textarea>
              </div>
            </div>
          </div>
        </template>
      </PopUpModal>
    </div>

    <!-- delete communication -->
    <div class="new-cast-modal center-popup-modal" v-show="isDeleteCommunication">
      <PopUpModal :isModal="isDeleteCommunication">
        <template v-slot:header>
          <h1 class="text-center">{{ $t("dictionary.tagSearch.delete") }}</h1>
        </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="red-fill-btn" @click="deleteCommunication">
              {{ $t("button.delete") }}
            </button>
            <button class="black-outline-btn" @click="isDeleteCommunication = false">
              {{ $t("button.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>
  </section>
</template>

<script setup>
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTab from "@/components/DynamicTabs.vue";
import LeftSidePanel from "@/components/MyPage/LeftSidePanel.vue";
import CommunicationCardOne from "@/components/MyPage/CommunicationCardOne.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import MyPageService from "@/services/MyPageService.js";
import { onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";
import { inject } from "vue";
import i18n from "@/config/i18n";

const page = ref(1);
const limit = ref(10);
const communicationType = ref("comment");
const communicationList = ref([]);
const commentTitle = ref("");
const triviaTitle = ref("");
const commentLength = ref(0);
const triviaLength = ref(0);
const famousLineLength = ref(0);
const goofsLength = ref(0);
const famousLineTitle = ref("");
const goofsTitle = ref("");
const tab_list = ref([]);
const observer = ref(null);
const isLoading = ref(false);
const bottom = ref(null);
const selectedTabId = ref(0);
const isTabChanged = ref(false);
const router = useRouter();
const common = inject("common");
const { t } = i18n.global;
const isCharacterModal = ref(false);
const characterInfo = ref(false);
const isDeleteCommunication = ref(false);
const deleteCommentid = ref("");

onMounted(() => {
  observeWindow();
});

watch(
  () => common.state.SelectedLang,
  function (newVal, oldVal) {
    if (newVal && oldVal && newVal != oldVal) {
      page.value = 1;
      communicationList.value = [];
      getCommunicationList();
    }
  }
);

const getReadMore = (community) => {
  community.readMore = !community.readMore;
};

const getCommunicationList = () => {
  isLoading.value = true;
  let data = {
    communication_type: communicationType.value,
    page: page.value,
    limit: limit.value,
    is_first: page.value == 1 ? "y" : "n",
  };

  MyPageService.getCommunicationList(data)
    .then((res) => {
      if (res.status == 200) {
        res.data.results.forEach((item) => {
          item.readMore = false;
        });
        communicationList.value = [
          ...communicationList.value,
          ...res.data.results,
        ];
        triviaLength.value = res.data.tabs.trivia;
        famousLineLength.value = res.data.tabs.famous_line;
        commentLength.value = res.data.tabs.comment;
        goofsLength.value = res.data.tabs.goofs;
        if (res.data.tabs) {
          commentTitle.value =
            t("communityCard.comments") + "(" + res.data?.tabs.comment + ")";
          triviaTitle.value =
            t("communityCard.trivia") + "(" + res.data?.tabs.trivia + ")";
          famousLineTitle.value =
            t("communityCard.famousLines") +
            "(" +
            res.data?.tabs.famous_line +
            ")";
          goofsTitle.value =
            t("communityCard.goofs") + "(" + res.data?.tabs.goofs + ")";
        }
        tab_list.value = [];
        tab_list.value.push({ id: 0, name: commentTitle.value });
        tab_list.value.push({ id: 1, name: triviaTitle.value });
        tab_list.value.push({ id: 2, name: famousLineTitle.value });
        tab_list.value.push({ id: 3, name: goofsTitle.value });
        if (
          !commentLength.value &&
          communicationType.value == "comment" &&
          !isTabChanged.value
        ) {
          selectedTabId.value = 1;
          communicationType.value = "trivia";
          getCommunicationList();
        } else if (
          !triviaLength.value &&
          communicationType.value == "trivia" &&
          !isTabChanged.value
        ) {
          selectedTabId.value = 2;
          communicationType.value = "famous_line";
          getCommunicationList();
        } else if (
          !famousLineLength.value &&
          communicationType.value == "famous_line" &&
          !isTabChanged.value
        ) {
          selectedTabId.value = 3;
          communicationType.value = "goofs";
          getCommunicationList();
        } else if (
          !goofsLength.value &&
          communicationType.value == "goofs" &&
          !isTabChanged.value
        ) {
          selectedTabId.value = 0;
          communicationType.value = "comment";
        }

        if (res.data.total_records > communicationList.value.length) {
          page.value = page.value + 1;
          isLoading.value = false;
        }
      }
    })
    .catch((err) => {
      return;
    });
};
const onChangeTab = (tab) => {
  selectedTabId.value = tab;
  isTabChanged.value = true;
  if (tab == 0) {
    communicationType.value = "comment";
    communicationList.value = [];
    page.value = 1;
    getCommunicationList();
  }
  if (tab == 1) {
    communicationType.value = "trivia";
    communicationList.value = [];
    page.value = 1;
    getCommunicationList();
  }
  if (tab == 2) {
    communicationType.value = "famous_line";
    communicationList.value = [];
    page.value = 1;
    getCommunicationList();
  }
  if (tab == 3) {
    communicationType.value = "goofs";
    communicationList.value = [];
    page.value = 1;
    getCommunicationList();
  }
};
const redirection = (item) => {
  if (item.list_type == "tv") {
    router.push({
      name: 'TvShowsDetails',
      params: { id: item.commentable_id, pageTitle: item.title_name },
    });
  } else if (item.list_type == "people") {
    router.push({
      name: 'PeopleDetails',
      params: { id: item.commentable_id, pageTitle: item.person_name },
    });
  } else if (item.list_type == "movie") {
    router.push({
      name: 'MoviesDetails',
      params: { id: item.commentable_id, pageTitle: item.title_name },
    });
  } else {
    router.push({
      name: 'WebtoonsDetail',
      params: { id: item.commentable_id, pageTitle: item.title_name },
    });
  }
};

const redirectPeople = (item) => {
  if (item.list_type == "people") {
    router.push({
      name: 'PeopleDetails',
      params: { id: item.commentable_id, pageTitle: item.person_name },
    });
  }
  else if (item.person_id) {
    router.push({
      name: 'PeopleDetails',
      params: { id: item.person_id, pageTitle: item.person_name },
    });
  } else {
    isCharacterModal.value = true;
    characterInfo.value = item;
  }
};

const redirectWork = (item) => {
  if (item.commentable_type == "title") {
    if (item.list_type == "tv") {
      router.push({
        name: 'TvShowsDetails',
        params: { id: item.commentable_id, pageTitle: item.title_name },
      });
    } else if (item.list_type == "movie") {
      router.push({
        name: 'MoviesDetails',
        params: { id: item.commentable_id, pageTitle: item.title_name },
      });
    } else if (item.list_type == "webtoons") {
      router.push({
        name: 'WebtoonsDetail',
        params: { id: item.commentable_id, pageTitle: item.title_name },
      });
    }
  } else {
    if (item.title_type == "tv") {
      router.push({
        name: 'TvShowsDetails',
        params: { id: item.title_id, pageTitle: item.title_name },
      });
    } else if (item.title_type == "movie") {
      router.push({
        name: 'MoviesDetails',
        params: { id: item.title_id, pageTitle: item.title_name },
      });
    } else if (item.title_type == "webtoons") {
      router.push({
        name: 'WebtoonsDetail',
        params: { id: item.title_id, pageTitle: item.title_name },
      });
    }
  }
};

const deleteCommunicationModal = (id) => {
  isDeleteCommunication.value = true;
  deleteCommentid.value = id;
}

const deleteCommunication = () => {
  let data = {
    communication_type: communicationType.value,
    id: deleteCommentid.value,
  };
  MyPageService.deleteCommunication(data)
    .then((res) => {
      if (res.status == 200) {
        isDeleteCommunication.value = false;
        communicationList.value = [];
        deleteCommentid.value = "";
        page.value = 1;
        getCommunicationList();
      }
    })
    .catch((err) => {
      return;
    });
};
const observeWindow = () => {
  observer.value = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isLoading.value) {
        getCommunicationList();
      }
    },
    { threshold: 0 }
  );
  observer.value.observe(bottom.value);
};
</script>
