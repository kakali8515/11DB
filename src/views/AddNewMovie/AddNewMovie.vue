<template>
  <div class="add-new-movie new-movie-add-sec">
    <div class="new-container">
      <h1 class="heading" v-html="$t('addNewMoviesForm.addNewMovie')"></h1>
      <div class="search-section">
        <h6 class="serch-title">{{ $t("button.search") }}</h6>
        <div class="search-form">
          <div class="select-option">
            <Dropdown @dropdownValue="getDropdownValue" :search_type="search_type"
              :searchTitleListItem="searchTitleListItem" searchtitle="searchtitle" searchvalue="serchvalue" />
          </div>
          <div class="search-field">
            <input type="text" :placeholder="$t('addNewMovies.shareWhatsNew')" class="form-control" v-model="search_text"
              @keydown="directSearch($event)" />
          </div>
          <button class="search-btn" @click="getsearchMovie" :disabled="search_text == ''"
            :class="search_text == '' ? 'isDisabled' : ''">
            {{ $t("button.search") }}
          </button>
        </div>
      </div>
      <div class="filter-section">
        <div class="select-option">
          <Dropdown @dropdownValue="getMovie" :search_type="sort_by" :searchTitleListItem="[
            { name: $t('addNewMovies.latest'), value: 'newest' },
            { name: $t('addNewMovies.oldest'), value: 'oldest' },
          ]" searchtitle="name" searchvalue="value" />
        </div>
      </div>
      <!-- for internal data -->
      <template v-if="isSearch && isTmdbData == false">
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
                      <img v-else src="@/assets/images/sml-no-img.png" alt="" />
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
          <pagination v-model="page" :records="total_internal_data" :per-page="limit" :options="chunkPage"
            @paginate="clickInternalPage" />
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
              {{ $t("addNewMovies.theMovieIsNotOnTheList") }}
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
      <!-- for tmdb data -->
      <template v-if="isTmdbData && isKobisData == false">
        <div class="movie-list-section">
          <h1 class="data-title">{{ $t("addNewMovies.externalDataTMDB") }}</h1>
          <div class="movie-list-wrapper" v-if="tmdb_data.results?.length > 0">
            <ul class="movie-radio-list">
              <li class="movie-radio-item" v-for="(item, index) in tmdb_data.results" :key="index">
                <label :for="'radio-movie-1' + index">
                  <div class="check-circle">
                    <input type="radio" name="each-radio-movie" :id="'radio-movie-1' + index"
                      @click="checkTmdbRadioButton(item.tmdb_id)" />
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
          <template v-if="tmdb_data.results?.length > 0">
            <pagination v-model="page" :records="total_tmdb_data" :per-page="limit" :options="chunkPage"
              @paginate="clickTmdbPage" />
          </template>
          <div class="no-data-block" :style="!tmdb_data.results || !tmdb_data || tmdb_data.results?.length == 0
            ? ''
            : 'display: none'
            ">
            <p class="no-data-text">{{ $t("addNewMovies.noData") }}</p>
          </div>
        </div>
        <div class="checkbox-section" v-if="tmdb_data.results?.length > 0">
          <label for="new-movie-check">
            <input type="checkbox" @click="tmdbCheckbox($event)" id="new-movie-check" ref="tmdbCheckbox" />
            <div class="checkbox">
              <img src="@/assets/icons/checkbox-unchecked.svg" alt="" class="unchecked-icon" />
              <img src="@/assets/icons/checkbox-checked.svg" alt="" class="checked-icon" />
            </div>
            <p class="check-text">
              {{ $t("addNewMovies.theMovieIsNotOnTheList") }}
            </p>
          </label>
        </div>
        <div class="button-section">
          <button :disabled="no_tmdb_movie == false" :class="no_tmdb_movie == false ? 'isDisabled' : ''"
            class="orange-pill-button" @click="tmdbDataNext">
            {{ $t("addNewMovies.next") }}
          </button>
        </div>
      </template>
      <!-- for kobis data -->
      <template v-if="isKobisData">
        <div class="movie-list-section">
          <h1 class="data-title">{{ $t("addNewMovies.externalDataKOBIS") }}</h1>
          <div class="movie-list-wrapper" v-if="kobis_data.results?.length > 0">
            <ul class="movie-radio-list">
              <li class="movie-radio-item" v-for="(item, index) in kobis_data.results" :key="index">
                <label :for="'radio-movie-1' + index">
                  <div class="check-circle">
                    <input type="radio" name="each-radio-movie" :id="'radio-movie-1' + index"
                      @click="checkKobisRadioButton(item.kobis_id)" />
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
          <template v-if="kobis_data.results?.length > 0">
            <pagination v-model="page" :records="total_kobis_data" :per-page="limit" :options="chunkPage"
              @paginate="clickKobisPage" />
          </template>
          <div class="no-data-block" :style="!kobis_data.results ||
            !kobis_data ||
            kobis_data.results?.length == 0
            ? ''
            : 'display: none'
            ">
            <p class="no-data-text">{{ $t("addNewMovies.noData") }}</p>
          </div>
        </div>
        <div class="checkbox-section" v-if="kobis_data.results?.length > 0">
          <label for="new-movie-check">
            <input type="checkbox" @click="KobisCheckbox($event)" id="new-movie-check" ref="kobisCheckbox" />
            <div class="checkbox">
              <img src="@/assets/icons/checkbox-unchecked.svg" alt="" class="unchecked-icon" />
              <img src="@/assets/icons/checkbox-checked.svg" alt="" class="checked-icon" />
            </div>
            <p class="check-text">
              {{ $t("addNewMovies.theMovieIsNotOnTheList") }}
            </p>
          </label>
        </div>
        <div class="button-section">
          <button :disabled="no_Kobis_movie == false" :class="no_Kobis_movie == false ? 'isDisabled' : ''"
            class="orange-pill-button" @click="kobisDataNext">
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
  name: "AddNewMovie",
  components: {},
  emits: ["on-current-theme-change"],
  inject: ["common"],
  data() {
    return {
      searchTitleList: "",
      searchTitleListItem: [],
      search_type: "",
      title_type: "movie",
      search_text: "",
      sort_by: "newest",
      page: 1,
      limit: 20,
      chunkPage: { chunk: 5 },
      isSearch: false,
      internal_data: [],
      tmdb_data: [],
      kobis_data: [],
      no_internal_movie: false,
      isTmdbData: false,
      no_tmdb_movie: false,
      isKobisData: false,
      no_Kobis_movie: false,
      total_internal_data: 0,
      total_tmdb_data: 0,
      total_kobis_data: 0,
      isInterRadioButton: false,
      isTmdbRadioButton: false,
      isKobisRadioButton: false,
      movieId: "",
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

    getDropdownValue(value) {
      this.search_type = value;
    },

    getMovie(value) {
      this.sort_by = value;
      this.searchMovie();
    },

    getsearchMovie() {
      this.isSearch = true;
      this.isTmdbData = false;
      this.isKobisData = false;
      this.page = 1;
      this.searchMovie();
    },

    directSearch(event) {
      let code = event.keyCode || event.which;
      if (code == 13) {
        this.isSearch = true;
        this.isTmdbData = false;
        this.isKobisData = false;
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
            this.tmdb_data = res.data.tmdb_data;
            this.kobis_data = res.data.kobis_data;

            this.total_internal_data = res.data.internal_data.total_records;
            this.total_tmdb_data = res.data.tmdb_data.total_records;
            this.total_kobis_data = res.data.kobis_data.total_records;

            if (this.internal_data.results.length == 0) {
              this.no_internal_movie = true;
            }
            if (
              !this.tmdb_data.results ||
              !this.tmdb_data ||
              this.tmdb_data.results.length == 0
            ) {
              this.no_tmdb_movie = true;
            }
            if (
              !this.kobis_data.results ||
              !this.kobis_data ||
              this.kobis_data.results.length == 0
            ) {
              this.no_Kobis_movie = true;
            }
          }
        })
        .catch((err) => {
          return;
        });
    },
    // for internal data
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
    internalDataNext() {
      if (this.isInterRadioButton) {
        //this will go to second phase
        this.$router.push("/AddNewMovieForm/" + this.movieId + "/internal");
        // this.$router.push("/AddNewMovieForm");
        localStorage.setItem("movieBackPage", "/AddNewMovie");
      } else {
        this.isTmdbData = true;
        this.page = 1;
        this.searchMovie();
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
      this.movieId = id;
    },

    // for tmdb data
    tmdbCheckbox(event) {
      if (event.target.checked) {
        this.no_tmdb_movie = true;
      } else {
        this.no_tmdb_movie = false;
      }
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isTmdbRadioButton = false;
    },
    tmdbDataNext() {
      if (this.isTmdbRadioButton) {
        this.$router.push("/AddNewMovieForm/" + this.movieId + "/tmdb");
        localStorage.setItem("movieBackPage", "/AddNewMovie");
      } else {
        this.isKobisData = true;
        this.page = 1;
        this.searchMovie();
      }
    },
    clickTmdbPage(click) {
      this.page = click;
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isTmdbRadioButton = false;
      this.no_tmdb_movie = false;
      this.searchMovie();
    },
    checkTmdbRadioButton(id) {
      this.isTmdbRadioButton = true;
      this.no_tmdb_movie = true;
      this.$refs.tmdbCheckbox.checked = false;
      this.movieId = id;
    },

    // for kobis data
    KobisCheckbox(event) {
      if (event.target.checked) {
        this.no_Kobis_movie = true;
      } else {
        this.no_Kobis_movie = false;
      }
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isKobisRadioButton = false;
    },
    kobisDataNext() {
      if (this.isKobisRadioButton) {
        this.$router.push("/AddNewMovieForm/" + this.movieId + "/kobis");
        localStorage.setItem("movieBackPage", "/AddNewMovie");
      } else {
        this.$router.push("/AddNewMovieForm/" + 0 + "/new");
        localStorage.setItem("movieBackPage", "/AddNewMovie");
      }
    },
    clickKobisPage(click) {
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isKobisRadioButton = false;
      this.no_Kobis_movie = false;
      this.page = click;
      this.searchMovie();
    },
    checkKobisRadioButton(id) {
      this.isKobisRadioButton = true;
      this.no_Kobis_movie = true;
      this.$refs.kobisCheckbox.checked = false;
      this.movieId = id;
    },
  },
};
</script>

<style>
option {
  font-weight: normal;
  display: block;
  white-space: nowrap;
  min-height: 50px !important;
  padding: 30px !important;
}
</style>
