<template>
  <div>
    <div class="filters tag-filter">
      <h3>{{ $t("searchResults.searchRight.companies.title") }}</h3>
      <span>
        <a href="javascript:void(0)" @click="sortOrder"><img src="../../assets/icons/filter-arrows.svg" alt="icon" /></a>
        <template v-for="(item, ind) of sortByData" :key="ind">
          <a href="javascript:void(0)" :class="ind == activeItem ? 'active' : ''" @click="sortBy(item.key, ind)">{{
            item.title }}</a>
        </template>
      </span>
    </div>
    <div class="search-no-data" v-if="companiesData.length < 1 && showData == false">
      {{ $t("searchResults.noData") }}
    </div>
    <ul class="search-list tag-list" v-else>
      <li v-for="(item, ind) of companiesData" :key="ind">
        <a href="javascript:void(0)" @click="openModal(item);searchLog(item, '')">{{
          item.name
        }}</a>
      </li>
    </ul>

    <!-- modal -->
    <div class="company-details-modal">
      <PopUpModal :isModal="isModal">
        <template v-slot:header>
          <h1>{{ companyData.agency_name }}</h1>
          <button @click="isModal = false">
            <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
          </button>
        </template>
        <template v-slot:body>
          <div class="modal-tab-wrapper">
            <TabWrapper @selectedTab="tabChange">
              <Tabs title="credit.information">
                <div class="content-wrapper kkkk" @scroll="infoScroll">
                  <div class="company-details">
                    <div class="each-detail">
                      <h1>
                        {{
                          $t("searchResults.searchRight.companies.model.code")
                        }}
                      </h1>
                      <p>
                        {{
                          companyData.agency_code
                          ? companyData.agency_code
                          : "-"
                        }}
                      </p>
                    </div>
                    <div class="each-detail">
                      <h1>
                        {{
                          $t("searchResults.searchRight.companies.model.aka")
                        }}
                      </h1>
                      <p>{{ companyData.aka ? companyData.aka : "-" }}</p>
                    </div>
                    <div class="each-detail">
                      <h1>
                        {{
                          $t(
                            "searchResults.searchRight.companies.model.address"
                          )
                        }}
                      </h1>
                      <p>
                        {{ companyData.address ? companyData.address : "-" }}
                      </p>
                    </div>
                    <div class="each-detail">
                      <h1>
                        {{
                          $t("searchResults.searchRight.companies.model.tel")
                        }}
                      </h1>
                      <p>{{ companyData.tel ? companyData.tel : "-" }}</p>
                    </div>
                    <div class="each-detail">
                      <h1>
                        {{
                          $t("searchResults.searchRight.companies.model.fax")
                        }}
                      </h1>
                      <p>{{ companyData.fax ? companyData.fax : "-" }}</p>
                    </div>
                    <div class="each-detail">
                      <h1>
                        {{
                          $t("searchResults.searchRight.companies.model.email")
                        }}
                      </h1>
                      <p>{{ companyData.email ? companyData.email : "-" }}</p>
                    </div>
                    <div class="each-detail">
                      <h1>
                        {{
                          $t(
                            "searchResults.searchRight.companies.model.officalSite"
                          )
                        }}
                      </h1>
                      <p>
                        {{
                          companyData.official_site
                          ? companyData.official_site
                          : "-"
                        }}
                      </p>
                    </div>
                    <div class="each-detail" v-if="companyData.youtube_link ||
                        companyData.instagram_link ||
                        companyData.facebook_link ||
                        companyData.twitter_link
                        ">
                      <h1>
                        {{
                          $t(
                            "searchResults.searchRight.companies.model.socialMedia"
                          )
                        }}
                      </h1>
                      <div class="icon-wrapper">
                        <a v-if="companyData.youtube_link" :href="companyData.youtube_link"><img
                            src="@/assets/icons/Youtube.svg" alt="" /></a>
                        <a v-if="companyData.instagram_link" :href="companyData.instagram_link"><img
                            src="@/assets/icons/Instagram.svg" alt="" /></a>
                        <a v-if="companyData.facebook_link" :href="companyData.facebook_link"><img
                            src="@/assets/icons/Facebook.svg" alt="" /></a>
                        <a v-if="companyData.twitter_link" :href="companyData.twitter_link"><img
                            src="@/assets/icons/Twitter.svg" alt="" /></a>
                      </div>
                    </div>
                  </div>
                  <div class="manager-list">
                    <h1>
                      {{
                        $t(
                          "searchResults.searchRight.companies.model.managerList"
                        )
                      }}
                    </h1>
                    <div class="list-wrapper">
                      <div class="each-manager" v-for="(item, index) of managerLists" :key="index">
                        <h1>{{ item.name }}</h1>
                        <div class="details">
                          <div class="contact">
                            <span>{{
                              $t(
                                "searchResults.searchRight.companies.model.artist"
                              )
                            }}
                              :
                            </span>
                            <span v-for="(data, i) of item.artist_list" :key="i">{{ data.name }}</span>
                            <span>{{ item.email }}</span>
                            <div class="bullet"></div>
                            <span>{{ item.phone_number }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
              <Tabs title="dictionary.agent.artist">
                <div class="content-wrapper images-wrapper" @scroll="artistScroll">
                  <div class="image-grid" v-if="artistList.length > 0">
                    <div class="image-card" v-for="(item, index) of artistList" :key="index">
                      <span class="company-img-card"><img v-if="item.profile_picture" :src="item.profile_picture"
                          alt="" />
                        <img v-else src="@/assets/images/no-image-view.png" alt="" />
                      </span>
                      <p>{{ item.name }}</p>
                    </div>
                  </div>
                  <div class="no-data-wrapper" v-else>
                    <p>{{ $t("searchResults.noData") }}</p>
                  </div>
                </div>
              </Tabs>
            </TabWrapper>
          </div>
        </template>
        <template v-slot:footer>
          <button @click="$router.push('/contact')">
            {{ $t("searchResults.searchRight.companies.model.requestModify") }}
          </button>
        </template>
      </PopUpModal>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch, computed } from "@vue/runtime-core";
import moment from "moment";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import SearchResultService from "@/services/SearchResultService";
import i18n from "@/config/i18n";
const { t } = i18n.global;

export default {
  name: "SearchCompanies",
  props: {
    companiesData: {
      type: Array,
    },
    showData: {
      type: Boolean
    }
  },
  components: {
    PopUpModal,
    TabWrapper,
    Tabs,
  },
  emits: ["sortBy", "sortOrder", "searchLog"],

  setup(props, { emit }) {
    const sortByData = computed(() => [
      { title: t("searchCompanies.alphabetic"), key: "alphabetic" },
    ]);
    const activeItem = ref(0);
    const sortOrderData = ref("asc");
    // const showData = ref(false);
    const isModal = ref(false);
    const company_id = ref("");
    const type = ref("information");
    const page = ref(1);
    const limit = ref(10);
    const companyData = ref("");
    const artistList = ref([]);
    const managerLists = ref([]);
    const artistRecords = ref("");
    const infoRecords = ref("");
    const searchResultService = new SearchResultService();

    // fetching prpost data here from perent
    onMounted(() => {
      // setTimeout(() => {
      //   showData.value = true;
      // }, 300);
    });
    watch(
      () => isModal.value,
      function (n, o) {
        if (isModal.value == false) {
          page.value = 1;
          artistList.value = [];
          managerLists.value = [];
        }
      }
    );
    // send clicked sort by to the perent
    const sortBy = (item, i) => {
      emit("sortBy", item);
      activeItem.value = i;
    };
    // send clicked sort order to the perent
    const sortOrder = () => {
      if (sortOrderData.value == "desc") {
        sortOrderData.value = "asc";
      } else {
        sortOrderData.value = "desc";
      }
      emit("sortOrder", sortOrderData.value);
    };

    const searchLog = (item, url) => {
      emit("searchLog", item, url);
    }

    // open modal
    const openModal = (item) => {
      company_id.value = item.id;
      isModal.value = true;
      companyDetails(company_id.value, type.value, page.value, limit.value);
    };
    // company details API

    const companyDetails = (company_id, type, page, limit) => {
      if (company_id) {
        searchResultService
          .getCompanyDetails(company_id, type, page, limit)
          .then((res) => {
            if (res.status == 200) {
              companyData.value = res.data;
              if (type == "artist") {
                artistRecords.value = res.data.total_records;
                let arr = res.data.artist;
                artistList.value.push(...arr);
              }
              if (type == "information") {
                infoRecords.value = res.data.total_records;
                let arr = res.data.manager_lists;
                managerLists.value.push(...arr);
              }
            }
          })
          .catch((err) => {
            return;
          });
      }
    };

    // tab change
    const tabChange = (tabTitle) => {
      artistList.value = [];
      managerLists.value = [];
      page.value = 1;
      if (tabTitle.toLowerCase() == "dictionary.agent.artist") {
        let artistType = "artist";
        companyDetails(company_id.value, artistType, page.value, limit.value);
      } else {
        companyDetails(company_id.value, type.value, page.value, limit.value);
      }
    };

    // infinite scroll

    const artistScroll = (el) => {
      if (
        el.srcElement.offsetHeight + el.srcElement.scrollTop >=
        el.srcElement.scrollHeight &&
        artistRecords.value > artistList.value.length
      ) {
        let newPage = ++page.value;
        let artistType = "artist";
        companyDetails(company_id.value, artistType, newPage, limit.value);
      }
    };
    const infoScroll = (el) => {
      if (
        el.srcElement.offsetHeight + el.srcElement.scrollTop >=
        el.srcElement.scrollHeight &&
        infoRecords.value > managerLists.value.length
      ) {
        let newPage = ++page.value;
        let infoType = "information";
        companyDetails(company_id.value, infoType, newPage, limit.value);
      }
    };

    return {
      sortByData,
      sortBy,
      activeItem,
      sortOrderData,
      sortOrder,
      isModal,
      openModal,
      companyData,
      tabChange,
      artistList,
      managerLists,
      artistScroll,
      infoScroll,
      searchLog
    };
  },
};
</script>
