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
    <section class="tvepisodes-btm">
      <div class="container">
        <div class="tvepisodes-content">
          <div class="top-head">
            <h2>
              {{ $t("searchResults.searchRight.movieDetails.cast&Crew") }}
            </h2>
            <router-link to @click="toEditMovieCredit" v-if="common.state.is_admin == 'y' && isEdit == 'y'">{{
              $t("general.editButton")
            }}</router-link>
          </div>
          <div class="tab-outr small">
            <TabWrapper @selectedTab="selectedTab">
              <Tabs title="addNewPeople.cast">
                <div class="tvimage-otr" v-if="newResult.length > 0">
                  <template v-for="(castList, i) in newResult" :key="i">
                    <CastCrewCard :castList="castList" redirectLink="PeopleDetails" />
                  </template>
                </div>
                <div class="no-data-wrapper" v-if="isData && newResult.length == 0">
                  <p>{{ $t("searchResults.noData") }}</p>
                </div>
              </Tabs>
              <Tabs title="addNewPeople.crew">
                <div class="tvimage-otr" v-if="newResult.length > 0">
                  <template v-for="(castList, i) in newResult" :key="i">
                    <CastCrewCard :castList="castList" redirectLink="PeopleDetails" />
                  </template>
                </div>
                <div class="no-data-wrapper" v-if="isCrewData && newResult.length == 0">
                  <p>{{ $t("searchResults.noData") }}</p>
                </div>
              </Tabs>
            </TabWrapper>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import BannerCardTwo from "@/components/BannerCardTwo.vue";
import CastCrewCard from "@/components/CastCrewCard.vue";
import TVShowsDetailsService from "@/services/TVShowsDetailsService";
import { onMounted, ref, watch, onUnmounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import i18n from "@/config/i18n";
const { t } = i18n.global;
export default {
  name: "TvShowsDetailsCast&Crew",
  emits: ["on-current-theme-change"],
  components: {
    Tabs,
    TabWrapper,
    BannerCardTwo,
    CastCrewCard,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const tvId = route.params.id;
    const season_id = route.params.season_id;
    const castDetails = ref([]);
    const posterImage = ref("");
    const title = ref("");
    const background_image = ref("");
    const season_name = ref("");
    const page = ref(1);
    const totalRecords = ref("");
    const newResult = ref([]);
    const selectTab = ref("");
    const common = inject("common");
    const isData = ref(false);
    const isCrewData = ref(false);
    const isEdit = ref("");
    // Lifecycle hooks
    onMounted(() => {
      getCastCrewDetails(tvId, "cast", 1);
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
            newResult.value = [];
            page.value = 1;
            isData.value = false;
            isCrewData.value = false;
            if (selectTab.value == "addNewPeople.crew")
              getCastCrewDetails(tvId, "crew", 1);
            else getCastCrewDetails(tvId, "cast", 1);
          }
        }
      );

    // API for cast and crew details
    const getCastCrewDetails = async (_id, _type, _page) => {
      let data = {
        id: Number(_id),
        season_id: Number(season_id),
        type: _type,
        page: _page,
        limit: 20,
      };
      try {
        let response = await TVShowsDetailsService.getCastDetails(data);
        if (response.status == 200) {
          if (_type == 'cast') {
            isData.value = true;
            isCrewData.value = false;
          } else {
            isData.value = false;
            isCrewData.value = true;
          }
          castDetails.value = response.data.results;
          posterImage.value = response.data.poster_image;
          title.value = response.data.title;
          window.document.title = `${response.data.title} - ${response.data.season_name} - ${t("searchResults.searchRight.movieDetails.cast&Crew")} - 11DB`;
          isEdit.value = response.data.is_edit;
          background_image.value = response.data.background_image ? response.data.background_image : response.data.poster_image ? response.data.poster_image : "";
          season_name.value = response.data.season_name;
          totalRecords.value = response.data.total_records;
          newResult.value.push(...castDetails.value);
          // setTimeout(() => {
          //   isData.value=false;
          // }, 1000);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    // When clicked on tab then...
    const selectedTab = (tab) => {
      newResult.value = [];
      selectTab.value = tab;
      page.value = 1;
      isData.value = false;
      isCrewData.value = false;
      if (tab == "addNewPeople.crew") {
        getCastCrewDetails(tvId, "crew", 1);
      } else {
        getCastCrewDetails(tvId, "cast", 1);
      }
    };

    // To movies_credit page
    const toEditMovieCredit = () => {
      router.push({
        name: "AddNewTVDetails",
        params: {
          external_id: tvId,
          type: "internal",
          itemActive: "credit",
          activeIndex: "4",
        },
      });
      localStorage.setItem(
        "tvBackPage",
        "/tvshows/cast&crew/" + tvId + "/" + season_id
      );
    };

    // infinite scroll
    const onScroll = () => {
      let bottomOfWindow =
        document.documentElement.offsetHeight + 1 +
        document.documentElement.scrollTop >=
        document.documentElement.scrollHeight;
      if (bottomOfWindow && totalRecords.value > newResult.value.length) {
        let newPage = ++page.value;
        setTimeout(() => {
          if (selectTab.value == "addNewPeople.crew")
            getCastCrewDetails(tvId, "crew", newPage);
          else getCastCrewDetails(tvId, "cast", newPage);
        }, 100);
      }
    };

    return {
      season_id,
      tvId,
      castDetails,
      posterImage,
      title,
      selectedTab,
      toEditMovieCredit,
      background_image,
      season_name,
      newResult,
      onScroll,
      isData,
      isCrewData,
      common,
      isEdit
    };
  },
};
</script>
