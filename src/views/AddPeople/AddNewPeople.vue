<template>
  <div class="add-new-movie new-movie-add-sec">
    <div class="new-container">
      <h1 class="heading" v-html="$t('addNewPeople.header')"></h1>
      <div class="search-section">
        <h6 class="serch-title">{{ $t("button.search") }}</h6>
        <div class="search-form">
          <div class="select-option">
            <Dropdown
              @dropdownValue="getDropdownValue"
              :search_type="search_type"
              :searchTitleListItem="searchTitleListItem"
              searchtitle="searchtitle"
              searchvalue="serchvalue"
            />
          </div>

          <div class="search-field">
            <input
              type="text"
              :placeholder="$t('addNewPeople.searchPlaceholder')"
              class="form-control"
              v-model="search_text"
              @keydown="directSearch($event)"
            />
          </div>
          <button
            class="search-btn"
            @click="getsearchPeople"
            :disabled="search_text == ''"
            :class="search_text == '' ? 'isDisabled' : ''"
          >
            {{ $t("button.search") }}
          </button>
        </div>
      </div>
      <div class="filter-section">
        <div class="select-option">
          <Dropdown
            @dropdownValue="getPeople"
            :search_type="sort_by"
            :searchTitleListItem="[
              { name: $t('addNewMovies.latest'), value: 'newest' },
              { name: $t('addNewMovies.oldest'), value: 'oldest' },
            ]"
            searchtitle="name"
            searchvalue="value"
          />
        </div>
      </div>

      <!-- for internal data -->
      <template v-if="isSearch && isTmdbData == false">
        <div class="movie-list-section">
          <h1 class="data-title">
            {{ $t("addNewPeople.internalDataHeader") }}
          </h1>
          <div class="movie-list-wrapper" v-if="internal_data.results">
            <ul class="movie-radio-list">
              <li
                class="movie-radio-item"
                v-for="(item, index) in internal_data.results"
                :key="index"
              >
                <label :for="'radio-movie-1' + index">
                  <div class="check-circle">
                    <input
                      @click="checkInternalRadioButton(item.id)"
                      type="radio"
                      name="each-radio-movie"
                      :id="'radio-movie-1' + index"
                      ref="addInternalMovieOption"
                    />
                    <div class="radio-circle">
                      <div class="inner-circle"></div>
                    </div>
                  </div>
                  <div class="movie-content">
                    <div class="movie-image people-image">
                      <img
                        v-if="item.profile_image"
                        :src="item.profile_image"
                        alt=""
                      />
                      <img
                        v-else
                        src="@/assets/images/no-image-view.png"
                        alt=""
                      />
                    </div>
                    <div class="movie-details">
                      <div class="title-date">
                        <h3 class="title">{{ item.people_name }}</h3>
                      </div>
                      <div class="title-date no-flex">
                        <p class="sub-sub">
                          {{ item.role_name }}
                        </p>
                        <p class="date b-day">
                          <img src="../../assets/icons/birthday.svg" />
                          {{ item.birth_day }}
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </li>
            </ul>
          </div>
          <pagination
            v-model="page"
            :records="total_internal_data"
            :per-page="limit"
            :options="chunkPage"
            @paginate="clickInternalPage"
          />
          <div
            class="no-data-block"
            :style="internal_data.results?.length == 0 ? '' : 'display: none'"
          >
            <p class="no-data-text">{{ $t("addNewPeople.noData") }}</p>
          </div>
        </div>
        <div class="checkbox-section" v-if="internal_data.results?.length > 0">
          <label for="new-movie-check">
            <input
              type="checkbox"
              @click="internalCheckbox($event)"
              id="new-movie-check"
              ref="internalCheckbox"
            />
            <div class="checkbox">
              <img
                src="@/assets/icons/checkbox-unchecked.svg"
                alt=""
                class="unchecked-icon"
              />
              <img
                src="@/assets/icons/checkbox-checked.svg"
                alt=""
                class="checked-icon"
              />
            </div>
            <p class="check-text">{{ $t("addNewPeople.peopleNotInList") }}</p>
          </label>
        </div>
        <div class="button-section">
          <button
            :disabled="no_internal_people == false"
            :class="no_internal_people == false ? 'isDisabled' : ''"
            class="orange-pill-button"
            @click="internalDataNext"
          >
            {{ $t("addNewPeople.nextButton") }}
          </button>
        </div>
      </template>
      <!-- for tmdb data -->
      <template v-if="isTmdbData && isKobisData == false">
        <div class="movie-list-section">
          <h1 class="data-title">{{ $t("addNewPeople.tmdbDataHeader") }}</h1>
          <div class="movie-list-wrapper" v-if="tmdb_data.results?.length > 0">
            <ul class="movie-radio-list">
              <li
                class="movie-radio-item"
                v-for="(item, index) in tmdb_data.results"
                :key="index"
              >
                <label :for="'radio-movie-1' + index">
                  <div class="check-circle">
                    <input
                      type="radio"
                      name="each-radio-movie"
                      :id="'radio-movie-1' + index"
                      @click="checkTmdbRadioButton(item.tmdb_id)"
                    />
                    <div class="radio-circle">
                      <div class="inner-circle"></div>
                    </div>
                  </div>
                  <div class="movie-content">
                    <div class="movie-image">
                      <img
                        v-if="item.profile_image"
                        :src="item.profile_image"
                        alt=""
                      />
                      <img
                        v-else
                        src="@/assets/images/no-image-view.png"
                        alt=""
                      />
                    </div>
                    <div class="movie-details">
                      <div class="title-date">
                        <h3 class="title">{{ item.people_name }}</h3>
                      </div>
                      <div class="title-date no-flex">
                        <p class="sub-sub">{{ item.role_name }}</p>
                        <p class="date b-day">
                          <img src="../../assets/icons/birthday.svg" />
                          {{ item.birth_day }}
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </li>
            </ul>
          </div>
          <template v-if="tmdb_data.results?.length > 0">
            <pagination
              v-model="page"
              :records="total_tmdb_data"
              :per-page="limit"
              :options="chunkPage"
              @paginate="clickTmdbPage"
            />
          </template>
          <div
            class="no-data-block"
            :style="
              !tmdb_data.results || !tmdb_data || tmdb_data.results?.length == 0
                ? ''
                : 'display: none'
            "
          >
            <p class="no-data-text">{{ $t("addNewPeople.noData") }}</p>
          </div>
        </div>
        <div class="checkbox-section" v-if="tmdb_data.results?.length > 0">
          <label for="new-movie-check">
            <input
              type="checkbox"
              @click="tmdbCheckbox($event)"
              id="new-movie-check"
              ref="tmdbCheckbox"
            />
            <div class="checkbox">
              <img
                src="@/assets/icons/checkbox-unchecked.svg"
                alt=""
                class="unchecked-icon"
              />
              <img
                src="@/assets/icons/checkbox-checked.svg"
                alt=""
                class="checked-icon"
              />
            </div>
            <p class="check-text">{{ $t("addNewPeople.peopleNotInList") }}</p>
          </label>
        </div>
        <div class="button-section">
          <button
            :disabled="no_tmdb_people == false"
            :class="no_tmdb_people == false ? 'isDisabled' : ''"
            class="orange-pill-button"
            @click="tmdbDataNext"
          >
            {{ $t("addNewPeople.nextButton") }}
          </button>
        </div>
      </template>

      <!-- for kobis data -->
      <template v-if="isKobisData">
        <div class="movie-list-section">
          <h1 class="data-title">{{ $t("addNewPeople.kobisDataHeader") }}</h1>
          <div class="movie-list-wrapper" v-if="kobis_data.results?.length > 0">
            <ul class="movie-radio-list">
              <li
                class="movie-radio-item"
                v-for="(item, index) in kobis_data.results"
                :key="index"
              >
                <label :for="'radio-movie-1' + index">
                  <div class="check-circle">
                    <input
                      type="radio"
                      name="each-radio-movie"
                      :id="'radio-movie-1' + index"
                      @click="checkKobisRadioButton(item.kobis_id)"
                    />
                    <div class="radio-circle">
                      <div class="inner-circle"></div>
                    </div>
                  </div>
                  <div class="movie-content">
                    <div class="movie-image">
                      <img
                        v-if="item.profile_image"
                        :src="item.profile_image"
                        alt=""
                      />
                      <img
                        v-else
                        src="@/assets/images/no-image-view.png"
                        alt=""
                      />
                    </div>
                    <div class="movie-details">
                      <div class="title-date">
                        <h3 class="title">{{ item.film_name }}</h3>
                      </div>
                      <div class="title-date no-flex">
                        <p class="sub-sub">
                          {{ item.role_name }}
                        </p>
                        <p class="date b-day">
                          <img src="../../assets/icons/birthday.svg" />
                          {{ item.birth_day }}
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </li>
            </ul>
          </div>
          <template v-if="kobis_data.results?.length > 0">
            <pagination
              v-model="page"
              :records="total_kobis_data"
              :per-page="limit"
              :options="chunkPage"
              @paginate="clickKobisPage"
            />
          </template>
          <div
            class="no-data-block"
            :style="
              !kobis_data.results ||
              !kobis_data ||
              kobis_data.results?.length == 0
                ? ''
                : 'display: none'
            "
          >
            <p class="no-data-text">{{ $t("addNewPeople.noData") }}</p>
          </div>
        </div>
        <div class="checkbox-section" v-if="kobis_data.results?.length > 0">
          <label for="new-movie-check">
            <input
              type="checkbox"
              @click="KobisCheckbox($event)"
              id="new-movie-check"
              ref="kobisCheckbox"
            />
            <div class="checkbox">
              <img
                src="@/assets/icons/checkbox-unchecked.svg"
                alt=""
                class="unchecked-icon"
              />
              <img
                src="@/assets/icons/checkbox-checked.svg"
                alt=""
                class="checked-icon"
              />
            </div>
            <p class="check-text">{{ $t("addNewPeople.peopleNotInList") }}</p>
          </label>
        </div>
        <div class="button-section">
          <button
            :disabled="no_Kobis_people == false"
            :class="no_Kobis_people == false ? 'isDisabled' : ''"
            class="orange-pill-button"
            @click="kobisDataNext"
          >
            {{ $t("addNewPeople.nextButton") }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import AddNewMovieService from "@/services/AddNewMovieService";
import AddNewPeopleService from "@/services/AddNewPeopleService";

export default {
  name: "AddNewPeople",
  components: {},
  emits: ["on-current-theme-change"],
  inject: ["common"],
  data() {
    return {
      searchTitleList: "",
      search_type: "",
      search_text: "",
      sort_by: "newest",
      page: 1,
      limit: 20,
      chunkPage: { chunk: 5 },
      isSearch: false,
      internal_data: [],
      tmdb_data: [],
      kobis_data: [],
      no_internal_people: false,
      isTmdbData: false,
      no_tmdb_people: false,
      isKobisData: false,
      no_Kobis_people: false,
      total_internal_data: 0,
      total_tmdb_data: 0,
      total_kobis_data: 0,
      isInterRadioButton: false,
      isTmdbRadioButton: false,
      isKobisRadioButton: false,
      peopleId: "",
      searchTitleListItem: [],
      title_type: "people",
    };
  },
  created() {
    this.AddNewMovieService = new AddNewMovieService();
    this.AddNewPeopleService = new AddNewPeopleService();
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
            this.search_type = Object.keys(this.searchTitleList)[0];
            Object.entries(this.searchTitleList).forEach(([key, value]) => {
              this.searchTitleListItem.push({
                serchvalue: `${key}`,
                searchtitle: `${value}`,
              });
            });
          }
        })
        .catch((err) => {
          return;
        });
    },

    getDropdownValue(value) {
      this.search_type = value;
    },

    getPeople(value) {
      this.sort_by = value;
      this.searchPeople();
    },

    getsearchPeople() {
      this.isSearch = true;
      this.isTmdbData = false;
      this.isKobisData = false;
      this.page = 1;
      this.searchPeople();
    },

    directSearch(event) {
      let code = event.keyCode || event.which;
      if (code == 13) {
        this.isSearch = true;
        this.isTmdbData = false;
        this.isKobisData = false;
        this.page = 1;
        this.searchPeople();
      }
    },

    // search people
    searchPeople() {
      if (this.search_text == "") {
        return;
      }
      this.AddNewPeopleService.searchPeople(
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
              this.no_internal_people = true;
            }
            if (
              !this.tmdb_data.results ||
              !this.tmdb_data ||
              this.tmdb_data.results.length == 0
            ) {
              this.no_tmdb_people = true;
            }
            if (
              !this.kobis_data.results ||
              !this.kobis_data ||
              this.kobis_data.results.length == 0
            ) {
              this.no_Kobis_people = true;
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
        this.no_internal_people = true;
      } else {
        this.no_internal_people = false;
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
        this.$router.push("/AddNewPeopleForm/" + this.peopleId + "/internal");
        localStorage.setItem("peopleBackPage", "/AddNewPeople");
      } else {
        this.isTmdbData = true;
        this.page = 1;
        this.searchPeople();
      }
    },
    clickInternalPage(click) {
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isInterRadioButton = false;
      this.no_internal_people = false;
      this.page = click;
      this.searchPeople();
    },
    checkInternalRadioButton(id) {
      this.isInterRadioButton = true;
      this.no_internal_people = true;
      this.$refs.internalCheckbox.checked = false;
      this.peopleId = id;
    },

    // for tmdb data
    tmdbCheckbox(event) {
      if (event.target.checked) {
        this.no_tmdb_people = true;
      } else {
        this.no_tmdb_people = false;
      }
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isTmdbRadioButton = false;
    },
    tmdbDataNext() {
      if (this.isTmdbRadioButton) {
        this.$router.push("/AddNewPeopleForm/" + this.peopleId + "/tmdb");
        localStorage.setItem("peopleBackPage", "/AddNewPeople");
      } else {
        this.isKobisData = true;
        this.page = 1;
        this.searchPeople();
      }
    },
    clickTmdbPage(click) {
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isTmdbRadioButton = false;
      this.no_tmdb_people = false;
      this.page = click;
      this.searchPeople();
    },
    checkTmdbRadioButton(id) {
      this.isTmdbRadioButton = true;
      this.no_tmdb_people = true;
      this.$refs.tmdbCheckbox.checked = false;
      this.peopleId = id;
    },

    // for kobis data
    KobisCheckbox(event) {
      if (event.target.checked) {
        this.no_Kobis_people = true;
      } else {
        this.no_Kobis_people = false;
      }
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isKobisRadioButton = false;
    },
    kobisDataNext() {
      if (this.isKobisRadioButton) {
        this.$router.push("/AddNewPeopleForm/" + this.peopleId + "/kobis");
        localStorage.setItem("movieBackPage", "/AddNewMovie");
      } else {
        this.$router.push("/AddNewPeopleForm/" + 0 + "/new");
        localStorage.setItem("peopleBackPage", "/AddNewPeople");
      }
    },
    clickKobisPage(click) {
      let radio = document.querySelector(
        "input[type=radio][name=each-radio-movie]:checked"
      );
      radio ? (radio.checked = false) : "";
      this.isKobisRadioButton = false;
      this.no_Kobis_people = false;
      this.page = click;
      this.searchPeople();
    },
    checkKobisRadioButton(id) {
      this.isKobisRadioButton = true;
      this.no_Kobis_people = true;
      this.$refs.kobisCheckbox.checked = false;
      this.peopleId = id;
    },
  },
};
</script>

<style></style>
