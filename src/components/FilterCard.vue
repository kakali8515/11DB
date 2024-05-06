<template>
  <div class="filters">
    <div class="lists-tag">
      <span>
        <a href="javascript:void(0);" v-on:click="addClass" :class="{ 'active-red': isAddClassWeb }">{{
          $t("filterCard.tag") }}
          <img src="@/assets/icons/arrow-down2.svg" alt="down-arrow" class="down-arrow" />
          <img src="@/assets/icons/arrow-down-black.svg" alt="down-arrow" class="down-black-arrow" />
          <img src="@/assets/icons/arrow-down-red.svg" alt="up-arrow" class="up-arrow" /></a>
        <a href="javascript:void(0);" v-on:click="addClassFilter" :class="{ 'active-red': isAddClassWebFilter }">{{
          $t("filterCard.filter")
        }}<img src="@/assets/icons/arrow-down2.svg" alt="down-arrow" class="down-arrow" />
          <img src="@/assets/icons/arrow-down-black.svg" alt="down-arrow" class="down-black-arrow" />
          <img src="@/assets/icons/arrow-down-red.svg" alt="up-arrow" class="up-arrow" /></a>
      </span>
      <button type="button" class="btn solid orange-btn" @click="getSearchData">
        {{ $t("button.search") }}
      </button>
    </div>
    <div class="list-common tag-list" v-on:click="addClassTag" :class="{ active: isAddClassWeb }">
      <div class="dropdown">
        <label>{{ $t("filterCard.category") }}</label>
        <SearchDropdown :labelItem="$t('filterCard.selectCategory')" @dropdownValue="changeSubCategoryList"
          :search_type="category_id" :searchTitleListItem="category_list" searchtitle="category_name" searchvalue="id" />
      </div>
      <div class="dropdown">
        <label>{{ $t("filterCard.subCategory") }}</label>
        <SearchDropdown @dropdownValue="getSubCategoryId" :search_type="sub_cat_id"
          :searchTitleListItem="sub_category_list" searchtitle="category_name" searchvalue="id"
          :labelItem="$t('filterCard.selectSubCategory')" />
      </div>
      <div class="dropdown tag-name">
        <label>{{ $t("filterCard.tagName") }}</label>
        <div v-click-outside="() => (toggle = false)">
          <input @click="getTagSearchList()" type="search" :placeholder="$t('button.search')"
            class="item-selector item-selector-search" @keyup="getTagSearchList" v-model="search_text" />
          <div class="watch-list-area" v-if="toggle">
            <ul v-if="tag_search_list.length > 0">
              <li v-for="(tag, i) in tag_search_list" :key="i" @click="getTagSearchName(tag)">
                {{ tag.title }}
              </li>
            </ul>
            <ul v-if="isDataView && tag_search_list.length == 0">
              <li>{{ $t("filterCard.noDataFound") }}</li>
            </ul>
          </div>
        </div>

        <div class="tags-show" v-if="tagBelowList.length > 0">
          <span v-for="(item, i) in tagBelowList" :key="i">{{ item.title
          }}<a @click="removeTagSearch(item)"><img src="@/assets/icons/gray-close.svg" alt="" /></a></span>
        </div>
      </div>
    </div>
    <div class="list-common filter-list" v-on:click="addClassShow" :class="{ active: isAddClassWebFilter }">
      <div class="filter-dropdown-menu">
        <ul class="filter-drop-innr">
          <li class="filter-drop-left">
            <div class="dropdown">
              <label>{{ $t("filterCard.genres") }}</label>
              <SearchDropdown @dropdownValue="getGenreId" :search_type="genre" :searchTitleListItem="genre_list"
                searchtitle="genre_name" searchvalue="tag_id" :labelItem="$t('filterCard.selectgenres')" />
            </div>
          </li>
          <li class="filter-drop-left">
            <div class="dropdown">
              <label>{{ $t("filterCard.certification") }}</label>
            </div>
            <ul class="filter-radio-list">
              <li>
                <label class="filter-radio">
                  <input type="radio" name="radio1" :checked="certification == ''" value=""
                    @click="getCertification($event)" />
                  <span class="checkmark">{{ $t("filterCard.exempt") }}</span>
                </label>
              </li>
              <li v-for="(value, name, index) in certificationList" :key="index">
                <label class="filter-radio">
                  <input type="radio" name="radio" :value="value" @click="getCertification($event)"
                    :checked="certification == value" />
                  <span class="checkmark">{{ value }}</span>
                </label>
              </li>
            </ul>
          </li>
          <li class="filter-drop-left">
            <div class="select-fl-innr country-filter-innr">
              <div class="dropdown labTxt">
                <label>{{ $t("filterCard.country") }}
                  <span>{{ $t("filterCard.countryUpto") }}</span></label>
                <SearchDropdown @dropdownValue="chooseCountry(
                  $event,
                  countryList,
                  countryBelowList,
                  country,
                  country_id
                )
                  " :search_type="country_id[0]" :searchTitleListItem="countryList" searchtitle="country_name"
                  searchvalue="id" :disabled="countryBelowList?.length > 5" :labelItem="$t('filterCard.selectCountry')" />
              </div>
              <div class="tags-show">
                <span v-for="(item, i) in countryBelowList" :key="i">{{ item.country_name
                }}<a @click="removeCountry(item, countryBelowList, country); country_id = [];"><img
                      src="@/assets/icons/gray-close.svg" alt="" /></a>
                </span>
              </div>
            </div>
          </li>
          <li class="filter-drop-left" v-if="filterType == 'webtoons'">
            <div class="dropdown">
              <label>{{ $t("filterCard.webtoonUploadingDate") }}</label>
            </div>
            <ul class="filter-radio-list">
              <li>
                <label class="filter-radio">
                  <input type="radio" v-model="weekly_upload" name="radio2" value="monday" @click="getWeekDay($event)" />
                  <span class="checkmark">{{ $t("days.mon") }}</span>
                </label>
              </li>
              <li>
                <label class="filter-radio">
                  <input type="radio" v-model="weekly_upload" name="radio2" value="tuesday" @click="getWeekDay($event)" />
                  <span class="checkmark">{{ $t("days.tue") }}</span>
                </label>
              </li>
              <li>
                <label class="filter-radio">
                  <input type="radio" v-model="weekly_upload" name="radio2" value="wednesday"
                    @click="getWeekDay($event)" />
                  <span class="checkmark">{{ $t("days.wed") }}</span>
                </label>
              </li>
              <li>
                <label class="filter-radio">
                  <input type="radio" v-model="weekly_upload" name="radio2" value="thursday"
                    @click="getWeekDay($event)" />
                  <span class="checkmark">{{ $t("days.thu") }}</span>
                </label>
              </li>
              <li>
                <label class="filter-radio">
                  <input type="radio" v-model="weekly_upload" name="radio2" value="friday" @click="getWeekDay($event)" />
                  <span class="checkmark">{{ $t("days.fri") }}</span>
                </label>
              </li>
              <li>
                <label class="filter-radio">
                  <input type="radio" v-model="weekly_upload" name="radio2" value="saturday"
                    @click="getWeekDay($event)" />
                  <span class="checkmark">{{ $t("days.sat") }}</span>
                </label>
              </li>
              <li>
                <label class="filter-radio">
                  <input type="radio" v-model="weekly_upload" name="radio2" value="sunday" @click="getWeekDay($event)" />
                  <span class="checkmark">{{ $t("days.sun") }}</span>
                </label>
              </li>
            </ul>
          </li>
          <li class="filter-drop-left filter-runtime" v-if="filterType !== 'webtoons'">
            <div class="dropdown">
              <label>{{ $t("filterCard.runtime") }}</label>
            </div>
            <RangeSlider @rangeValue="getRangeValue" />
          </li>
          <li class="filter-drop-left">
            <div class="dropdown">
              <label v-if="filterType == 'webtoons'">{{ $t('addNewWebtoonForm.read') }}</label>
              <label v-else>{{ $t("filterCard.watch") }}</label>
            </div>
            <ul class="ic-list">
              <template v-for="(ott, i) in ottList" :key="i">
                <li v-if="ott.ott_logo_path">
                  <label class="fliter-check">
                    <img :src="ott.ott_logo_path" alt="" />
                    <input type="checkbox" :value="ott.ott_service_provider_id" v-model="watch" />
                    <span class="checkmark"></span>
                  </label>
                </li>
              </template>
            </ul>
          </li>

          <li class="filter-drop-left">
            <div class="dropdown">
              <label>{{ $t("filterCard.releaseDate") }}</label>
            </div>
            <div class="date-input">
              <div class="date-input-innr">
                <Calender @date="getRealeaseDateFrom" :input_date="release_date_from" page="filterCard"
                  :max_date="dateformat(release_date_to)" :datePlaceholder="datePlaceholder" />
              </div>
              <span class="md-ic">~</span>
              <div class="date-input-innr">
                <Calender @date="getRealeaseDateTo" :input_date="release_date_to" page="filterCard"
                  :min_date="dateformat(release_date_from)" :datePlaceholder="datePlaceholder" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AddNewMovieService from "@/services/AddNewMovieService";
import MoviesDetailsService from "@/services/MoviesDetailsService.js";
import Calender from "@/components/Calender.vue";
import vClickOutside from "click-outside-vue3";
import moment from "moment";
import { chooseCountry, removeCountry } from "@/mixins/CountryFunctions.js";
let weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
export default {
  name: "FilterCard",
  inject: ["common"],
  components: {
    Calender,
  },
  data() {
    return {
      toggle: false,
      isAddClassWeb: false,
      isAddClassWebFilter: false,
      category_list: [],
      type: "all",
      sub_category_list: [],
      category_id: null,
      sub_cat_id: null,
      search_text: "",
      tag_search_list: [],
      genre_list: [],
      genre: null,
      countryList: [],
      certificationList: [],
      certification: "",
      selectedTagName: [],
      tagBelowList: [],
      countryBelowList: [],
      country: [117],
      ottList: [],
      watch: [],
      release_date_from: "",
      release_date_to: "",
      run_time_from: "0",
      run_time_to: "0",
      country_id: [117],
      datePlaceholder: "MM.DD.YYYY",
      isSearchButtonView: true,
      isFilterButtonView: false,
      isDataView: false,
      comingSoonActive: this.$route.params.itemActive,
      weekly_upload: this.$route.params.itemActive == 'comingSoon' ? weekday[new Date().getDay() + 1] : this.menu == "ongoing" ? weekday[new Date().getDay()] : "",
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    certificationtype: String,
    filterType: String,
    // menu: String
  },
  created() {
    this.AddNewMovieService = new AddNewMovieService();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.tagCategories();
        this.getGenreList();
        this.getCountryList();
        this.crtificationDropdown();
        this.getStreamList();
        this.dateformat();
        let search_params = {
          country: this.country
        };
        if (this.certificationtype == 'webtoons') {
          search_params['weekly_upload'] = this.weekly_upload;
        }
        this.$emit("getSearchData", search_params);
      }
    },
  },
  mounted() {
    this.tagCategories();
    this.getGenreList();
    this.getCountryList();
    this.crtificationDropdown();
    this.getStreamList();
    this.dateformat();
    let search_params = {
      country: this.country
    };
    if (this.certificationtype == 'webtoons') {
      search_params['weekly_upload'] = this.weekly_upload;
    }
    this.$emit("getSearchData", search_params);
  },
  methods: {
    //search title dropdown
    tagCategories() {
      this.AddNewMovieService.tagCategories(this.$i18n.locale, this.type)
        .then((res) => {
          if (res.status == 200) {
            this.category_list = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },

    changeSubCategoryList(value) {
      this.category_id = value;
      this.sub_cat_id = null;
      this.sub_category_list = [];
      this.tag_search_list = [];
      if (this.category_id) {
        this.getSubcategoryList();
      }
    },

    getSubCategoryId(value) {
      this.sub_cat_id = value;
    },
    getGenreId(value) {
      this.genre = value;
    },
    // get sub category list
    getSubcategoryList() {
      this.AddNewMovieService.getSubcategoryList(
        this.category_id,
        this.$i18n.locale
      )
        .then((res) => {
          if (res.status == 200) {
            this.sub_category_list = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // tag search list
    getTagSearchList() {
      this.toggle = true;
      MoviesDetailsService.getFilterTagSearchList(
        this.category_id,
        this.sub_cat_id,
        this.search_text,
        this.$i18n.locale
      )
        .then((res) => {
          if (res.status == 200) {
            this.isDataView = true;
            this.tag_search_list = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // genre list
    getGenreList() {
      MoviesDetailsService.getGenreList()
        .then((res) => {
          if (res.status == 200) {
            this.genre_list = res.data.genre_list;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // emit data
    getSearchData() {
      this.toggle = false;
      let search_params = {
        category_id: this.category_id,
        sub_category_id: this.sub_cat_id,
        tag_id: this.selectedTagName,
        genre: this.genre,
        certification: this.certification,
        country: this.country,
        release_date_from: this.dateformat(this.release_date_from),
        release_date_to: this.dateformat(this.release_date_to),
      };
      if (this.certificationtype == 'webtoons') {
        search_params['weekly_upload'] = this.weekly_upload;
        search_params['read'] = this.watch;
      } else {
        search_params['run_time_from'] = this.run_time_from;
        search_params['run_time_to'] = this.run_time_to;
        search_params['watch'] = this.watch;
      }
      this.$emit("getSearchData", search_params);
    },

    // country list
    getCountryList() {
      this.countryBelowList = [];
      this.AddNewMovieService.getCountryList()
        .then((res) => {
          if (res.status == 200) {
            this.countryList = res.data.results;
            let country_name = this.countryList.find((item) => {
              return item.id == 117;
            });
            this.countryBelowList.push(country_name)
          }
        })
        .catch((err) => {
          return;
        });
    },

    // cirtification dropdown
    crtificationDropdown() {
      this.AddNewMovieService.getCertificationList(this.certificationtype)
        .then((res) => {
          if (res.status == 200) {
            this.certificationList = res.data.certification_list;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // get tag search name
    getTagSearchName(tag) {
      let data = this.tagBelowList.find((f) => {
        return f.id == tag.id;
      });
      if (!data) {
        this.tagBelowList.push(tag);
      }

      if (this.selectedTagName.indexOf(tag.id) === -1) {
        this.selectedTagName.push(tag.id);
      }
    },

    removeTagSearch(tag) {
      let data = this.tagBelowList.find((f) => {
        return f.id == tag.id;
      });
      if (data) {
        this.tagBelowList.splice(this.tagBelowList.indexOf(tag), 1);
        this.selectedTagName.splice(this.selectedTagName.indexOf(tag.id), 1);
      }
    },

    getStreamList() {
      this.AddNewMovieService.getServiceProviderList(
        this.$i18n.locale,
        this.certificationtype
      )
        .then((res) => {
          if (res.status == 200) {
            this.ottList = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },
    // date format
    dateformat(value) {
      if (value) {
        return moment.utc(value).format("YYYY-MM-DD");
      }
    },
    removeCountry,
    chooseCountry,
    getRealeaseDateFrom(date) {
      this.release_date_from = date;
    },

    getRealeaseDateTo(date) {
      this.release_date_to = date;
    },

    getCertification(event) {
      this.certification = event.target.value;
    },

    getWeekDay(event) {
      if (event.target.value === this.weekly_upload && event.target.value) {
        this.weekly_upload = "";
      } else {
        this.weekly_upload = event.target.value
      }

    },

    getRangeValue(value) {
      this.run_time_from = value[0];
      this.run_time_to = value[1];
    },

    addClass: function () {
      this.isAddClassWebFilter = false;
      this.isSearchButtonView = true;
      this.isFilterButtonView = false;
      this.isAddClassWeb = !this.isAddClassWeb;
    },
    addClassFilter: function () {
      this.isAddClassWeb = false;
      this.isSearchButtonView = false;
      this.isFilterButtonView = true;
      this.isAddClassWebFilter = !this.isAddClassWebFilter;
    },
    addClassTag: function () {
      this.isAddClassWeb = this.isAddClassWeb;
    },
    addClassShow: function () {
      this.isAddClassWebFilter = this.isAddClassWebFilter;
    },
  },
};
</script>
