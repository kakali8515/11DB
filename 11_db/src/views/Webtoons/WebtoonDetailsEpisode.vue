<template>
    <div>
      <BannerCardTwo :bannerInfo="{
        imgUrl: posterImage,
        link: 'WebtoonsDetail',
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
                {{ $t("searchResults.searchRight.tvShowsDetails.episodes") }}
              </h2>
              <router-link to @click="toEditTVEpisode" v-if="common.state.is_admin=='y' && isEdit == 'y'">{{
                $t("general.editButton")
              }}</router-link>
            </div>
            <div class="tab-outr small ">
              <DynamicTabWrapper v-if="season_list?.length > 0" @getResponseTitle="onChangeTab" :seasonId="seasonId">
                <DynamicTab v-for="season in season_list" :title="season.season_number" :key="season.season_id"
                  :seasonId="season.season_id">
                  <div class="tv-lists" v-if="episodeDetails?.length > 0 && seasonId == season.season_id">
                    <EpisodeList :episodeList="episodeList" v-for="(episodeList, i) in episodeDetails" :key="i" />
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("searchResults.noData") }}</p>
                  </div>
                </DynamicTab>
              </DynamicTabWrapper>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  <script>
  import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
  import DynamicTab from "@/components/DynamicTabs.vue";
  import BannerCardTwo from "@/components/BannerCardTwo.vue";
  import EpisodeList from "@/components/Details/EpisodeList.vue";
  import { onMounted, ref, watch } from "@vue/runtime-core";
  import { useRoute, useRouter } from "vue-router";
  import WebtoonDetailsService from "@/services/WebtoonDetailsService";
  import i18n from "@/config/i18n";
const { t } = i18n.global;
  import { inject } from "vue";
  export default {
    name: "WebtoonDetailsEpisode",
    emits: ["on-current-theme-change"],
    components: {
      DynamicTabWrapper,
      DynamicTab,
      BannerCardTwo,
      EpisodeList,
    },
  
    setup() {
      const route = useRoute();
      const router = useRouter();
      const tvId = route.params.id;
      const seasonId = ref(route.params.season_id);
      const posterImage = ref("");
      const title = ref("");
      const background_image = ref("");
      const episodeDetails = ref([]);
      const season_list = ref([]);
      const currentSeosonId = ref("0");
      const season_name = ref("");
      const common = inject("common");
      const isEdit = ref("");
  
      const getEpisodeDetails = async (season_id) => {
        try {
          let response = await WebtoonDetailsService.getEpisodeDetails(
            tvId,
            season_id
          );
          episodeDetails.value = response.data.episode_list;
          episodeDetails.value.forEach((item, i) => {
            item.episode_description = item.episode_description;
          });
          if (episodeDetails.value.length > 0) {
            setTimeout(() => {
              const element = document.getElementById(`episode${route.query.episode_id}`)
              if (element && element.scrollIntoView) {
                element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
              }
            }, 500)
          }
          season_list.value = response.data.season_list;
          posterImage.value = response.data.title_poster_image;
          title.value = response.data.title_name;
          window.document.title = `${response.data.title_name} - ${response.data.season_name} - ${t("searchResults.searchRight.tvShowsDetails.episodes")} - 11DB`;
          isEdit.value = response.data.is_edit;
          background_image.value = response.data.background_image ? response.data.background_image : response.data.title_poster_image ? response.data.title_poster_image : "";
          season_name.value = response.data.season_name;
        } catch (error) {
          console.warn(error);
        }
      };
  
      const onChangeTab = async (tab) => {
        let selectedTab = season_list.value.find(function (item) {
          return item.season_id == tab;
        });
        seasonId.value = selectedTab.season_id;
        getEpisodeDetails(seasonId.value);
      };
  
      // Lifecycle hooks
      onMounted(() => {
        getEpisodeDetails(seasonId.value);
      });
  
      // on language change
      watch(
        () => common.state.SelectedLang,
        function (newVal, oldVal) {
          if (newVal && oldVal && newVal != oldVal) {
            getEpisodeDetails(seasonId.value);
          }
        }
      );
  
      // To movies_credit page
      const toEditTVEpisode = () => {
        router.push({
          name: "AddNewWebtoonDetails",
          params: {
            external_id: tvId,
            type: "internal",
            itemActive: "episode",
            activeIndex: "2",
          },
        });
        localStorage.setItem(
          "webtoonBackPage",
          "/webtoons/details-episodes/" + tvId + "/" + seasonId.value
        );
      };
      return {
        episodeDetails,
        posterImage,
        title,
        season_list,
        onChangeTab,
        //   selectedTab,
        toEditTVEpisode,
        background_image,
        currentSeosonId,
        season_name,
        seasonId,
        common,
        isEdit
      };
    },
  };
  </script>
  