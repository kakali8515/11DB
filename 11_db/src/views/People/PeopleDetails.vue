<template>
  <div>
    <div v-if="isError == false && people_id">
      <div class="people-details-sec" :style="{ backgroundImage: 'url(' + background_image + ')' }">
        <div class="container">
          <div class="people-dtl-otr">
            <div class="people-dtl-left">
              <figure>
                <img v-if="poster_image" :src="poster_image" alt="" />
                <img v-else src="@/assets/images/no-image-view.png" alt="" />
              </figure>
            </div>
            <div class="people-dtl-right flex-dr">
              <div class="edit-otr">
                <h2 :title="name" class="big-hdr">{{ name }}</h2>
                <div class="edit-innr">
                  <a @click="toEditPeople" class="btn solid" v-if="common.state.is_admin == 'y' && isEdit == 'y'">{{
                    $t("addNewPeople.editButton") }}</a>
                  <a @click="isFavourite = true" class="sc-icon">
                    <template v-if="is_like == 'y'">
                      <img src="@/assets/icons/wishlist-solid.svg" />
                    </template>
                    <template v-else>
                      <img src="@/assets/icons/wishlist.svg" alt="" class="dark-th" />
                      <img src="@/assets/icons/blk-icon1.svg" alt="" class="light-th" />
                    </template>
                  </a>
                  <a @click="isShare = true;" class="sc-icon">
                    <img src="@/assets/icons/settings.svg" alt="" class="dark-th" />
                    <img src="@/assets/icons/blk-icon3.svg" alt="" class="light-th" />
                  </a>
                </div>
              </div>
              <ul class="people-date-list job-role">
                <li v-if="birth_day">
                  {{ dateformat(birth_day) }}
                  <span v-if="death_date">- {{ dateformat(death_date) }}</span>
                </li>
                <li v-if="role.length">
                  <ul>
                    <li v-for="item in role" :key="item">{{ item }}</li>
                  </ul>
                </li>
                <li v-if="gender">
                  {{ $t(gender) }}
                </li>
                <li v-if="countries.length">{{ countries.toString() }}</li>
                <li>
                  {{ $t("addNewPeople.likes") }} :
                  {{ likeNumber.toLocaleString("en-US") }}
                </li>
              </ul>
              <div class="detl-bt-content">
                <h5>{{ $t("addNewPeople.primaryDetails.biography") }}</h5>
                <p class="details-para" v-show="!readMore">
                  <div style="display: inline;"
                    v-html="biography ? biography.length > 230 ? biography.substring(0, 230) + '...' : biography.substring(0, 230) : '-'" />
                  <span @click="readMore = !readMore">
                    <span v-if="readMore">{{ $t("display.Hide") }}</span>
                    <span v-if="!readMore && biography.length > 230">{{ $t("display.ReadMore") }}</span>
                  </span>
                </p>
                <p class="details-para" v-show="readMore">
                <div v-html="biography" style="display: inline;"></div>
                <span @click="readMore = !readMore">
                  <span v-if="readMore && biography.length > 230">{{ $t("display.Hide") }}</span>
                  <span v-if="!readMore && biography.length > 230">{{ $t("display.ReadMore") }}</span>
                </span>
                </p>
                <h5>{{ $t("addNewPeople.aka") }}</h5>
                <p>{{ aka ? aka : "-" }}</p>
                <div class="awd-list-outr" v-if="award.winners || award.nominees">
                  <ul class="award-list">
                    <li>
                      <span><img src="@/assets/icons/award.svg" alt="" /></span>
                      <em>{{ $t("addNewPeople.award") }}</em>
                    </li>
                    <li>
                      <ul>
                        <li v-if="award.winners">
                          {{ award.winners }} {{ $t("addNewPeople.wins") }}
                        </li>
                        <li v-if="award.nominees">
                          {{ award.nominees }}
                          {{ $t("addNewPeople.nominations") }}
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <a href="javascript:void(0)" @click="
                    $router.push(`/people/detail-award/${$route.params.id}`)
                    ">
                    <img src="@/assets/icons/arrow-right-wh.svg" class="dark-th" alt="" />
                    <img src="@/assets/icons/arrow-right-blk.svg" class="light-th" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="people-details-btm-sec">
        <div class="container">
          <div class="people-details-btm-otr">
            <div class="people-details-btm-left">
              <h2 class="mb-10 small-hdr" v-if="videos?.length > 0 || images?.length > 0">
                {{ $t("addNewPeople.media") }}
              </h2>
              <MediaSection :videos="videos" :images="images" :isPeoplePoster="true" @navigation="navigate('PeopleMedia')"
                v-if="videos?.length > 0 || images?.length > 0" />
              <div class="work-otr mr-bb2">
                <h2 class="mb-10 small-hdr">{{ $t("addNewPeople.works") }}</h2>
                <div class="tab-outr small">
                  <TabWrapper @selectedTab="selectedTab" :activeTab="activeTab">
                    <Tabs title="header.mainMenu.Movies">
                      <Dropdown :search_type="workTab" @dropdownValue="
                        getPeopleWorkList('movie', $event, false, true)
                        " :searchTitleListItem="[
    {
      key: 'cast',
      value:
        $t('addNewPeople.cast') + '(' + castLength + ')',
    },
    {
      key: 'crew',
      value:
        $t('addNewPeople.crew') + '(' + crewLength + ')',
    },
  ]" searchtitle="value" searchvalue="key" />

                      <div class="divider"></div>
                      <div v-if="workList.length">
                        <div class="works-list-sec" v-for="item in workList" :key="item">
                          <div class="works-list-sec-innr">
                            <h5>{{ item.year }}</h5>
                            <div class="image-otr cast-crew">
                              <CastCrewCard v-for="(people, i) in item.list" :key="i" :castList="people"
                                redirectLink="MoviesDetails" />
                            </div>
                          </div>
                          <div class="divider"></div>
                        </div>
                      </div>
                      <div v-else class="no-data-wrapper">
                        <p>{{ $t("addNewPeople.noData") }}</p>
                      </div>
                    </Tabs>
                    <Tabs title="header.mainMenu.TVShows">
                      <Dropdown :search_type="workTab" @dropdownValue="
                        getPeopleWorkList('tv', $event, false, true)
                        " :searchTitleListItem="[
    {
      key: 'cast',
      value:
        $t('addNewPeople.cast') + '(' + castLength + ')',
    },
    {
      key: 'crew',
      value:
        $t('addNewPeople.crew') + '(' + crewLength + ')',
    },
  ]" searchtitle="value" searchvalue="key" />
                      <div class="divider"></div>
                      <div v-if="workList.length">
                        <div class="works-list-sec" v-for="item in workList" :key="item">
                          <div class="works-list-sec-innr">
                            <h5>{{ item.year }}</h5>
                            <div class="image-otr cast-crew">
                              <CastCrewCard v-for="(people, i) in item.list" :key="i" :castList="people"
                              redirectLink="TvShowsDetails" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-else class="no-data-wrapper">
                        <p>{{ $t("addNewPeople.noData") }}</p>
                      </div>
                    </Tabs>
                    <template v-if="common.state.is_webtoon_display && webtoonCrewLength">
                      <Tabs title="header.mainMenu.Webtoons">
                        <Dropdown :search_type="workTab" @dropdownValue="
                          getPeopleWorkList('webtoons', $event, false, true)
                          " :searchTitleListItem="[
    {
      key: 'crew',
      value:
        $t('addNewPeople.crew') + '(' + crewLength + ')',
    },
  ]" searchtitle="value" searchvalue="key" />
                        <div class="divider"></div>
                        <div v-if="workList.length">
                          <div class="works-list-sec" v-for="item in workList" :key="item">
                            <div class="works-list-sec-innr">
                              <h5>{{ item.year }}</h5>
                              <div class="image-otr cast-crew">
                                <CastCrewCard v-for="(people, i) in item.list" :key="i" :castList="people"
                                redirectLink="WebtoonsDetail" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="no-data-wrapper">
                          <p>{{ $t("addNewPeople.noData") }}</p>
                        </div>
                      </Tabs>
                    </template>
                  </TabWrapper>
                </div>
                <h2 class="mb-10 small-hdr">
                  {{ $t("addNewPeople.community") }}
                </h2>
                <CommunityCard type="people" famous_line_type="title" :season_id="0" :key="resetComponent" />
              </div>
            </div>
            <div class="people-details-btm-right">
              <h2 class="mb-10 small-hdr" v-if="facebookLink || instagramLink || twitterLink">
                {{ $t("addNewPeople.socialMedia") }}
              </h2>
              <SocialIconCard v-if="facebookLink || instagramLink || twitterLink" :facebookLink="facebookLink"
                :instagramLink="instagramLink" :twitterLink="twitterLink" />
              <h2 v-if="knownForList.length" class="mb-10 small-hdr">
                {{ $t("addNewPeople.knownFor") }}
              </h2>
              <div v-if="knownForList.length" class="slider-otr">
                <Slider :connection_list="knownForList" :componentType="componentType" />
              </div>

              <!-- <GoogleAdd /> -->
              <h2 class="mb-10 small-hdr" v-if="article.length">
                {{ $t("addNewPeople.relatedArticles") }}
              </h2>
              <RelatedArticle :article="article" v-if="article.length"
                :related_articles_details_url="related_articles_details_url" />
            </div>
          </div>
        </div>
      </div>
      <!-- favorite modal -->
      <div class="new-cast-modal center-popup-modal">
        <PopUpModal :isModal="isFavourite">
          <template v-slot:header>
            <h1>
              {{
                $t(
                  "searchResults.searchRight.movieDetails.favoriteModal.heading"
                )
              }}
            </h1>
          </template>
          <template v-slot:body>
            <div class="cast-details"></div>
          </template>
          <template v-slot:footer>
            <div class="button-group">
              <button class="black-outline-btn" @click="isFavourite = false">
                {{ $t("addNewPeople.mediadetails.cancelButton") }}
              </button>
              <button class="red-fill-btn" @click="addToFavorite">
                {{ $t("button.ok") }}
              </button>
            </div>
          </template>
        </PopUpModal>
      </div>
      <!-- share modal -->
      <div class="new-cast-modal center-popup-modal smallbx-modal">
        <PopUpModal :isModal="isShare">
          <template v-slot:header>
            <h1>{{ $t("addNewPeople.share") }}</h1>
          </template>
          <template v-slot:body>
            <div class="cast-details">
              <a href="#" @click="shareFacebook(baseUrl + $route.fullPath), userShare('facebook')"><img
                  src="@/assets/icons/fb.svg" alt="" /></a>
              <a class="twitter-share-button"
                @click="shareTwitter(baseUrl + $route.fullPath, name, ''), userShare('twitter')">
                <img src="@/assets/icons/twitter-icon.svg" alt="" /></a>
              <a @click="userShare('mail')" :href="`mailto:?subject=${name}&amp;body=${biography} - ${baseUrl + $route.fullPath
                }`">
                <img src="@/assets/icons/mail.svg" alt="" />
              </a>

              <a :href="baseUrl + $route.fullPath"
                @click.prevent.stop="onClick(baseUrl + $route.fullPath), userShare('link')"><img
                  src="@/assets/icons/link.svg" alt="" /></a>
              <input type="text" hidden ref="myHiddenInput" />
            </div>
          </template>
          <template v-slot:footer>
            <div class="button-group">
              <button class="black-outline-btn" @click="isShare = false">
                {{ $t("addNewPeople.mediadetails.cancelButton") }}
              </button>
            </div>
          </template>
        </PopUpModal>
      </div>
    </div>
    <div v-if="isError">
      <PageNotfound />
    </div>
  </div>
</template>
<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import Slider from "@/components/Slider.vue";
import CommunityCard from "@/components/CommunityCard.vue";
import SocialIconCard from "@/components/SocialIconCard.vue";
import GoogleAdd from "@/components/GoogleAdd.vue";
import RelatedArticle from "@/components/RelatedArticle.vue";
import MediaSection from "@/components/Details/MediaSection.vue";
import CastCrewCard from "@/components/CastCrewCard.vue";
import CastCrewSection from "@/components/Details/CastCrewSection.vue";
import PeopleDetailsService from "@/services/PeopleDetailsService.js";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import Toast from "@/alert/alert.js";
import MoviesDetailsService from "@/services/MoviesDetailsService";
import { dateformat, youtube_parser } from "@/mixins/CommonFunctions.js";
import { shareFacebook, shareTwitter } from "@/mixins/CountryFunctions.js";
import {
  matchYoutubeUrl,
  validateVimeoURL,
} from "@/mixins/CommonValidation.js";
import PageNotfound from "@/components/PageNotfound.vue";
export default {
  name: "PeopleDetails",
  emits: ["on-current-theme-change"],
  inject: ["common"],
  components: {
    Tabs,
    TabWrapper,
    Slider,
    CommunityCard,
    SocialIconCard,
    GoogleAdd,
    RelatedArticle,
    MediaSection,
    CastCrewCard,
    CastCrewSection,
    PopUpModal,
    PageNotfound,
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.page = 1;
        this.getPeopleDetails();
        this.getRelatedArticles(this.person_id, this.page, this.limit);
        this.getKnownForList();
        this.resetComponent++;
      }
    },
  },
  data() {
    return {
      componentType: "people",
      workTab: "cast",
      background_image: "",
      person_id: this.$route.params.id,
      name: "",
      birth_day: "",
      role: [],
      gender: "",
      countries: [],
      likeNumber: 0,
      biography: "",
      aka: "",
      poster_image: "",
      isFavourite: false,
      isShare: false,
      is_like: "",
      baseUrl: import.meta.env.VITE_SITE_BASE_URL,
      videos: [],
      images: [],
      facebookLink: "",
      instagramLink: "",
      twitterLink: "",
      article: [],
      knownForList: [],
      workList: [],
      page: 1,
      limit: 3,
      crewLength: 0,
      castLength: 0,
      webtoonCrewLength: 0,
      workListCounts: {},
      crewList: [],
      castList: [],
      related_articles_details_url: "",
      readMore: false,
      activeTab: "header.mainMenu.Movies",
      isError: false,
      people_id: "",
      death_date: "",
      resetComponent: 0,
      award: "",
      isEdit: "",
    };
  },

  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    this.getPeopleDetails();
    this.getRelatedArticles(this.person_id, this.page, this.limit);
    this.getKnownForList();
    this.userLog();
  },
  methods: {
    // get people details
    getPeopleDetails() {
      PeopleDetailsService.getPeopleDetails(this.$route.params.id)
        .then((res) => {
          if (res.status == 200) {
            this.workListCounts = res.data.works;
            this.webtoonCrewLength = res.data.works["webtoons"][0]["no_of_count"];
            this.isEdit = res.data.is_edit;
            // this.background_image = res.data.bg_image;
            this.isError = false;
            this.background_image = res.data.bg_image
              ? res.data.bg_image
              : res.data.poster_image
                ? res.data.poster_image
                : "";
            this.name = res.data.name;
            window.document.title = `${res.data.name} - 11DB`;
            this.people_id = res.data.id;
            this.birth_day = res.data.dob;
            this.death_date = res.data.death_date;
            this.role = res.data.profession;
            this.gender = res.data.gender;
            this.countries = res.data.countries;
            this.likeNumber = res.data.no_of_likes;
            this.award = res.data.awards ? res.data.awards : "";
            this.biography = res.data.biography
              ? res.data.biography.replace(/\n/g, "<br>")
              : "-";
            this.aka = res.data.aka;
            this.poster_image = res.data.poster_image;
            this.is_like = res.data.is_liked;
            this.videos = res.data.media.videos;
            this.videos = this.videos.map((item) => {
              return {
                link: item.path,
                title: item.title,
                id: item.video_id,
                thumb: item.thumb,
                time: item.time,
                type: item.type,
              };
            });
            this.images = res.data.media.images;
            this.images = this.images.map((item) => {
              return {
                link: item.path,
                title: item.title,
                id: item.image_id,
              };
            });
            this.facebookLink = res.data.social_media.facebook;
            this.instagramLink = res.data.social_media.instagram;
            this.twitterLink = res.data.social_media.twitter;
            if (this.activeTab == "header.mainMenu.TVShows") {
              this.getPeopleWorkList("tv", "cast", true);
            }
            else if (this.activeTab == "header.mainMenu.Webtoons") {
              this.getPeopleWorkList("webtoon", "crew", true);
            } else {
              this.getPeopleWorkList("movie", "cast", true);
            }
          } else {
            this.isError = true;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // add to share
    userShare(shared_channel) {
      MoviesDetailsService.addToShare(this.$route.params.id, "people", shared_channel)
        .then((res) => { })
        .catch((err) => {
          return;
        });
    },

    // to edit movie
    toEditPeople() {
      this.$router.push({
        name: "AddNewPeopleForm",
        params: { external_id: this.$route.params.id, type: "internal" },
      });
      localStorage.setItem(
        "peopleBackPage",
        "/people/details/" + this.$route.params.id
      );
    },

    // add favorite
    addToFavorite() {
      MoviesDetailsService.addToFavorite(this.$route.params.id, "people")
        .then((res) => {
          if (res.status == 200) {
            this.isFavourite = false;
            this.getPeopleDetails();
          }
        })
        .catch((err) => {
          return;
        });
    },

    // copy link on share modal
    onClick(url) {
      const input = this.$refs["myHiddenInput"];
      input.value = url;
      input.style.display = "block";
      input.select();
      document.execCommand("copy");
      input.style.display = "none";
      Toast.fire({ title: this.$t("addNewPeople.primaryDetails.linkCopied") });
    },

    navigate(component_name) {
      this.$router.push({
        name: component_name,
        params: { person_id: this.$route.params.id },
      });
    },

    // get people related articles
    getRelatedArticles(id, page, limit) {
      PeopleDetailsService.getRelatedArticles(id, page, limit)
        .then((res) => {
          if (res.status == 200) {
            this.article = res.data.results;
            this.related_articles_details_url =
              res.data.related_articles_details_url;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // get people known for list
    getKnownForList() {
      PeopleDetailsService.getKnownForList(this.person_id)
        .then((res) => {
          if (res.status == 200) {
            this.knownForList = res.data.results.map((item) => {
              return {
                image: item.poster_image,
                title: item.title_name,
                id: item.title_id,
                title_type: item.title_type,
              };
            });
          }
        })
        .catch((err) => {
          return;
        });
    },

    //get people work list
    async getPeopleWorkList(
      title_type,
      list_type,
      isMounted = false,
      isClicked = false
    ) {
      this.workTab = list_type;
      if (title_type == "movie") {
        this.castLength = this.workListCounts["movies"][0]["no_of_count"];
        this.crewLength = this.workListCounts["movies"][1]["no_of_count"];
      } else if (title_type == "webtoons") {
        this.crewLength = this.workListCounts["webtoons"][0]["no_of_count"];
      } else {
        this.castLength = this.workListCounts["tv"][0]["no_of_count"];
        this.crewLength = this.workListCounts["tv"][1]["no_of_count"];
      }
      let data;
      data = {
        person_id: this.person_id,
        title_type: title_type,
        list_type: list_type,
      };
      if (
        isMounted &&
        this.workTab == "cast" &&
        this.castLength == 0 &&
        this.crewLength != 0
      ) {
        data = {
          person_id: this.person_id,
          title_type: title_type,
          list_type: "crew",
        };
        this.workTab = "crew";
      } else if (
        !isClicked &&
        this.castLength == 0 &&
        this.crewLength == 0 &&
        this.activeTab != "header.mainMenu.TVShows"
      ) {
        this.activeTab = "header.mainMenu.TVShows";
        this.getPeopleWorkList("tv", "cast", true);
        return;
      } else if (
        isMounted &&
        this.activeTab == "header.mainMenu.TVShows" &&
        this.castLength == 0 &&
        this.crewLength == 0
      ) {
        this.activeTab = "header.mainMenu.Webtoons";
        this.getPeopleWorkList("webtoons", "crew", false, true);
        return;
      }
      else if (
        isMounted &&
        this.activeTab == "header.mainMenu.Webtoons" &&
        this.crewLength == 0
      ) {
        this.activeTab = "header.mainMenu.Movies";
        this.getPeopleWorkList("movie", "cast", false, true);
        return;
      }
      await PeopleDetailsService.getWorkList(data)
        .then((res) => {
          if (res.status == 200) {
            this.castList = res.data.results.map((year) => {
              let list = year.list;
              year.list = list.map((work) => {
                return {
                  image: work.poster_image,
                  name: work.title_name,
                  id: work.title_id,
                  designation: work.character_name,
                };
              });
              return year;
            });
            this.workList = this.castList;
          }
        })
        .catch((err) => {
          return;
        });
    },

    selectedTab(tab) {
      if (tab == "header.mainMenu.Movies") {
        this.getPeopleWorkList("movie", "cast", true, true);
        this.activeTab = "header.mainMenu.Movies";
      } else if (tab == "header.mainMenu.Webtoons") {
        this.getPeopleWorkList("webtoons", "crew", true, true);
        this.activeTab = "header.mainMenu.Webtoons";
      } else {
        this.getPeopleWorkList("tv", "cast", true, true);
        this.activeTab = "header.mainMenu.TVShows";
      }
    },
    // user log API
    userLog() {
      MoviesDetailsService.userLog(
        this.$route.params.id,
        "people",
        this.$cookies.get("userCookie")
      )
        .then((res) => {
          if (res.status == 200) {
          }
        })
        .catch((err) => {
          return;
        });
    },
    matchYoutubeUrl,
    validateVimeoURL,
    dateformat,
    youtube_parser,
    shareFacebook,
    shareTwitter,
  },
};
</script>
<style>
.theme-light select.select-style option {
  color: #111111;
}
</style>
