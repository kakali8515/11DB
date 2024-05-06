<template>
  <div class="add-new-movie">
    <div class="new-container">
      <h1 class="heading" v-html="$t('addNewWebtoonForm.addNewWebtoon')"></h1>
      <div class="search-section">
        <h6 class="serch-title">{{ $t("button.search") }}</h6>
        <div class="search-form">
          <div class="select-option">
            <Dropdown @dropdownValue="getDropdownValue" :search_type="search_type"
              :searchTitleListItem="searchTitleListItem" searchtitle="searchtitle" searchvalue="serchvalue" />
          </div>
          <div class="search-field">
            <input type="text" :placeholder="$t('communityCard.sharewhatsnew')" class="" v-model="search_text"
              @keydown="directSearch($event)" />
          </div>
          <button class="search-btn" @click="getsearchWebtoon" :disabled="search_text == ''"
            :class="search_text == '' ? 'isDisabled' : ''">
            {{ $t("button.search") }}
          </button>
        </div>
      </div>
      <div class="filter-section search-filter">
        <div class="select-option">
          <Dropdown @dropdownValue="getWebtoon" :search_type="sort_by" :searchTitleListItem="[
            { name: $t('addNewMovies.latest'), value: 'newest' },
            { name: $t('addNewMovies.oldest'), value: 'oldest' },
          ]" searchtitle="name" searchvalue="value" />
        </div>
      </div>
      <!-- for internal data -->
      <template v-if="isSearch">
        <div class="movie-list-section">
          <h1 class="data-title">{{ $t("addNewMovies.internalDataExist") }}</h1>
          <div class="movie-list-wrapper" v-if="internal_data.results">
            <ul class="movie-radio-list">
              <li class="movie-radio-item" v-for="(item, index) in internal_data.results" :key="index">
                <label :for="'radio-movie-1' + index">
                  <div class="check-circle">
                    <input @click="checkInternalRadioButton(item.id)" type="radio" name="each-radio-movie"
                      :id="'radio-movie-1' + index" ref="addInternalMovieOption" />
                    <div class="radio-circle">
                      <div class="inner-circle"></div>
                    </div>
                  </div>
                  <div class="movie-content">
                    <div class="movie-image">
                      <img v-if="item.poster_image" :src="item.poster_image" alt="" />
                      <img v-else src="@/assets/images/no-image-view.png" alt="" />
                    </div>
                    <div class="movie-details">
                      <div class="title-date">
                        <h3 class="title">{{ item.title }}</h3>
                        <span class="date">{{ item.year }}</span>
                      </div>
                      <p class="summary">
                        {{ item.overview }}
                      </p>
                    </div>
                  </div>
                </label>
              </li>
            </ul>
          </div>
          <template v-if="internal_data.results?.length > 0">
            <pagination v-model="page" :records="total_internal_data" :per-page="limit" :options="chunkPage" @paginate="clickInternalPage" />
          </template>
          <div class="no-data-block" :style="internal_data.results?.length == 0 ? '' : 'display: none'">
            <p class="no-data-text">{{ $t("addNewMovies.noData") }}</p>
          </div>
        </div>
        <div class="checkbox-section" v-if="internal_data.results?.length > 0">
          <label for="new-movie-check">
            <input type="checkbox" @click="internalCheckbox($event)" id="new-movie-check" ref="internalCheckbox" />
            <div class="checkbox">
              <img src="@/assets/icons/checkbox-unchecked.svg" alt="" class="unchecked-icon" />
              <img src="@/assets/icons/checkbox-checked.svg" alt="" class="checked-icon" />
            </div>
            <p class="check-text">
              {{ $t("addNewWebtoonForm.theWebtoonIsNotOnTheList") }}
            </p>
          </label>
        </div>
        <div class="button-section">
          <button :disabled="no_internal_movie == false" :class="no_internal_movie == false ? 'isDisabled' : ''"
            class="orange-pill-button" @click="internalDataNext">
            {{ $t("addNewMovies.next") }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import AddNewMovieService from "@/services/AddNewMovieService";
export default {
  name: "addNewWebtoon",
  emits: ["on-current-theme-change"],
  inject: ["common"],
  data() {
    return {
      sort_by: "newest",
      page: 1,
      limit: 10,
      chunkPage: { chunk: 5 },
      search_type: "",
      title_type: "webtoons",
      search_text: "",
      total_internal_data: 0,
      no_internal_movie: false,
      isInterRadioButton: false,
      isSearch: false,
      webtoonId: "",
      searchTitleList: "",
      searchTitleListItem: [],
      internal_data: [],
    };
  },

  created() {
    this.AddNewMovieService = new AddNewMovieService();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.searchTitleDropdown();
      }
    },
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    localStorage.removeItem("saveIdList");
    this.searchTitleDropdown();
  },
  methods: {

    //search title dropdown
    searchTitleDropdown() {
      this.searchTitleListItem = [];
      this.AddNewMovieService.getTitleSearchList(this.title_type)
        .then((res) => {
          if (res.status == 200) {
            this.searchTitleList = res.data.search_by_list;

            Object.entries(this.searchTitleList).forEach(([key, value]) => {
              this.searchTitleListItem.push({
                serchvalue: `${key}`,
                searchtitle: `${value}`,
              });
            });
            this.search_type = Object.keys(this.searchTitleList)[0];
          }
        })
        .catch((err) => {
          return;
        });
    },

    internalDataNext() {
      if (this.isInterRadioButton) {
        this.$router.push("/add-webtoon-details/" + this.webtoonId  + "/internal");
        // this.$router.push("/add-webtoon-details/" + 0 + "/new");
        localStorage.setItem("webtoonBackPage", "/AddNewWebtoon");
      } else {
        this.$router.push("/add-webtoon-details/" + 0 + "/new");
        localStorage.setItem("webtoonBackPage", "/AddNewWebtoon");
      }
    },

    clickInternalPage(click) {
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isInterRadioButton = false;
      this.no_internal_movie = false;
      this.page = click;
      this.searchMovie();
    },

    checkInternalRadioButton(id) {
      this.isInterRadioButton = true;
      this.no_internal_movie = true;
      this.$refs.internalCheckbox.checked = false;
      this.webtoonId = id;
    },

    internalCheckbox(event) {
      if (event.target.checked) {
        this.no_internal_movie = true;
      } else {
        this.no_internal_movie = false;
      }
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isInterRadioButton = false;
    },

    getDropdownValue(value) {
      this.search_type = value;
    },

    getWebtoon(value) {
      this.sort_by = value;
      this.searchMovie();
    },

    getsearchWebtoon() {
      this.isSearch = true;
      this.page = 1;
      this.searchMovie();
    },
    directSearch(event) {
      let code = event.keyCode || event.which;
      if (code == 13) {
        this.isSearch = true;
        this.page = 1;
        this.searchMovie();
      }
    },

    // search movie
    searchMovie() {
      if (this.search_text == "") {
        return;
      }
      this.AddNewMovieService.searchMovieTitle(
        this.title_type,
        this.search_type,
        this.search_text,
        this.sort_by,
        this.page,
        this.limit
      )
        .then((res) => {
          if (res.status == 200) {
            this.internal_data = res.data.internal_data;
            this.total_internal_data = res.data.internal_data.total_records;
            if (this.internal_data.results.length == 0) {
              this.no_internal_movie = true;
            }
          }
        })
        .catch((err) => {
          return;
        });
    },

  },
};
</script>

<style></style>
