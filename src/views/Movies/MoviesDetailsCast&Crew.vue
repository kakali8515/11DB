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
    <section class="tvepisodes-btm">
      <div class="container">
        <div class="tvepisodes-content">
          <div class="top-head">
            <h2>
              {{ $t("searchResults.searchRight.movieDetails.cast&Crew") }}
            </h2>
            <!-- <a href="javascript">Edit</a> -->
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
import MoviesDetailsService from "@/services/MoviesDetailsService.js";
import { onMounted, ref, watch, onUnmounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import i18n from "@/config/i18n";
const { t } = i18n.global;

export default {
  name: "MoviesDetailsCast&Crew",
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
    const castDetails = ref([]);
    const posterImage = ref("");
    const title = ref("");
    const movieId = route.params.id;
    const background_image = ref("");
    const totalRecords = ref("");
    const newResult = ref([]);
    const page = ref(1);
    const selectTab = ref("");
    const common = inject("common");
    const isData = ref(false);
    const isCrewData = ref(false);
    const isEdit = ref("");

    // API for cast and crew details
    const getCastCrewDetails = async (_id, _type, _page) => {
      let data = { id: Number(_id), type: _type, page: _page, limit: 20 };
      try {
        let response = await MoviesDetailsService.getCastDetails(data);
        if (response.status == 200) {
          if (_type == "cast") {
            isData.value = true;
            isCrewData.value = false;
          } else {
            isData.value = false;
            isCrewData.value = true;
          }
          castDetails.value = response.data.results;
          posterImage.value = response.data.poster_image;
          title.value = response.data.title;
          window.document.title = `${response.data.title} - ${t("searchResults.searchRight.movieDetails.cast&Crew")} - 11DB`;
          isEdit.value = response.data.is_edit;
          background_image.value = response.data.background_image
            ? response.data.background_image
            : response.data.poster_image
              ? response.data.poster_image
              : "";
          totalRecords.value = response.data.total_records;
          newResult.value.push(...castDetails.value);
          // setTimeout(() => {
          //   isData.value = false;
          // }, 1000);
        }

        // console.log(newResult.value);
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
        getCastCrewDetails(movieId, "crew", 1);
      } else {
        getCastCrewDetails(movieId, "cast", 1);
      }
    };

    // To movies_credit page
    const toEditMovieCredit = () => {
      router.push({
        name: "AddNewMovieForm",
        params: {
          external_id: movieId,
          type: "internal",
          itemActive: "credit",
          activeIndex: "2",
        },
      });
      localStorage.setItem(
        "movieBackPage",
        "/movies/movies-details-cast&crew/" + movieId
      );
    };

    // Lifecycle hooks
    onMounted(() => {
      getCastCrewDetails(movieId, "cast", 1);
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
              getCastCrewDetails(movieId, "crew", 1);
            else getCastCrewDetails(movieId, "cast", 1);
          }
        }
      );

    // infinite scroll
    const onScroll = () => {
      let bottomOfWindow =
        document.documentElement.offsetHeight +
        1 +
        document.documentElement.scrollTop >=
        document.documentElement.scrollHeight;
      if (bottomOfWindow && totalRecords.value > newResult.value.length) {
        let newPage = ++page.value;
        setTimeout(() => {
          if (selectTab.value == "addNewPeople.crew")
            getCastCrewDetails(movieId, "crew", newPage);
          else getCastCrewDetails(movieId, "cast", newPage);
        }, 100);
      }
    };

    return {
      castDetails,
      posterImage,
      title,
      selectedTab,
      toEditMovieCredit,
      background_image,
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
