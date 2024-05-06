<template>
  <div class="people-sec">
    <div class="container">
      <h2>{{ $t("popularPeople.header") }}</h2>
      <div class="tab-outr tab-style popular-tab-scroll">
        <DynamicTabWrapper v-if="jobTitleList?.length > 0" @getResponseTitle="onChangeTab" multiple="true"
          :selectedTitleList="activeCategoryList">
          <DynamicTab v-for="job in jobTitleList" :title="job.department_name" :key="job.department_id">
            <div class="image-otr people" v-if="newResult?.length > 0">
              <CastCrewCard v-for="(people, i) in newResult" :key="i" :castList="people" redirectLink="PeopleDetails" />
            </div>
            <div class="no-data-wrapper" v-if="isData && newResult.length == 0">
              <p>{{ $t("searchResults.noData") }}</p>
            </div>
          </DynamicTab>
        </DynamicTabWrapper>
      </div>
    </div>
    <div v-if="isLoading"></div>
    <div ref="bottom"></div>
  </div>
</template>

<script>
import DynamicTabWrapper from "@/components/DynamicTabWrapper.vue";
import DynamicTab from "@/components/DynamicTabs.vue";
import CastCrewCard from "@/components/CastCrewCard.vue";
import PeopleDetailsService from "@/services/PeopleDetailsService.js";
import AddNewMovieService from "@/services/AddNewMovieService.js";

const addNewMovieService = new AddNewMovieService();
export default {
  name: "PeoplePopular",
  components: {
    DynamicTab,
    DynamicTabWrapper,
    CastCrewCard,
  },
  inject: ["common"],
  data() {
    return {
      page: 1,
      limit: 24,
      popular_list: [],
      newResult: [],
      active: false,
      jobTitleList: [],
      activeCategoryID: [],
      activeCategoryList: [this.$t("popularPeople.all")],
      selectedTab: [],
      tabname: "",
      isData: false,
      isLoading: false,
      observer: null,
    };
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.isData = false;
        this.creditJobTitleList();
        this.newResult = [];
        this.page = 1;
        if (
          this.tabname != this.$t("popularPeople.all") &&
          this.tabname != ""
        ) {
          this.activeCategoryID = this.selectedTab.map(
            (item) => item.department_id
          );
          this.activeCategoryList = this.selectedTab.map(
            (item) => item.department_name
          );
          if (!this.activeCategoryList.length) {
            this.activeCategoryList.push(this.$t("popularPeople.all"));
          }
          if (this.activeCategoryList.length == this.jobTitleList.length - 1) {
            this.activeCategoryList.push(this.$t("popularPeople.all"));
          }
          this.getPopularPeople(this.activeCategoryID);
        } else {
          this.selectedTab = [];
          this.activeCategoryID = [];
          this.activeCategoryList = [this.$t("popularPeople.all")];
          this.getPopularPeople(this.activeCategoryID);
        }
      }
    },
  },
  mounted() {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    // this.getPopularPeople();
    this.creditJobTitleList();
    // window.addEventListener("scroll", this.onScroll);

    this.observeWindow();
  },
  beforeUnmount() {
    // window.removeEventListener("scroll", this.onScroll);
    this.observer.disconnect();
  },
  methods: {
    observeWindow() {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this.isLoading) {
            if (
              this.tabname != this.$t("popularPeople.all") &&
              this.tabname != ""
            ) {
              this.activeCategoryID = this.selectedTab.map(
                (item) => item.department_id
              );
              this.activeCategoryList = this.selectedTab.map(
                (item) => item.department_name
              );
              if (!this.activeCategoryList.length) {
                this.activeCategoryList.push(this.$t("popularPeople.all"));
              }
              if (
                this.activeCategoryList.length ==
                this.jobTitleList.length - 1
              ) {
                this.activeCategoryList.push(this.$t("popularPeople.all"));
              }
              this.getPopularPeople(this.activeCategoryID);
            } else {
              this.selectedTab = [];
              this.activeCategoryID = [];
              this.activeCategoryList = [this.$t("popularPeople.all")];
              this.getPopularPeople(this.activeCategoryID);
            }
          }
        },
        { threshold: 0 }
      );
      this.observer.observe(this.$refs.bottom);
    },
    // get popular people list
    getPopularPeople(id) {
      let credential = {
        page: this.page,
        limit: this.limit,
        department_type: id ? id : [],
      };
      this.isLoading = true;
      PeopleDetailsService.getPopularPeople(credential)
        .then((res) => {
          if (res.status == 200) {
            this.isData = true;
            this.popular_list = res.data.results;
            this.totalRecords = res.data.total_records;
            // if (this.activeCategoryID != id) {
            //   this.newResult.push(...this.popular_list);
            // } else {
            //   this.newResult = [];
            //   this.newResult.push(...this.popular_list);
            // }
            this.popular_list.forEach((item) => {
              const existingItem = this.newResult.some(
                (displayedItem) => displayedItem.id === item.id
              );
              if (!existingItem) {
                this.newResult.push(item);
              }
            });
            if (this.totalRecords > this.newResult.length) {
              this.page++;
              this.isLoading = false;
            }
          }
        })
        .catch((err) => {
          return;
        });
    },

    //job title list
    creditJobTitleList() {
      addNewMovieService
        .creditJobTitleList(this.$i18n.locale)
        .then((res) => {
          if (res.status == 200) {
            this.jobTitleList = res.data.results;
            this.jobTitleList.unshift({
              department_name: this.$t("popularPeople.all"),
              department_id: "",
            });
          }
        })
        .catch((err) => {
          return;
        });
    },
    onChangeTab(tab) {
      this.isData = false;
      this.page = 1;
      this.tabname = tab;
      if (tab != this.$t("popularPeople.all")) {
        let selectedTabNames = this.selectedTab.map((item) => {
          return item.department_name;
        });
        if (selectedTabNames.includes(tab)) {
          this.selectedTab = this.selectedTab.filter(function (obj) {
            return obj.department_name !== tab;
          });
        } else {
          this.selectedTab.push(
            this.jobTitleList.find(function (item) {
              return item.department_name == tab;
            })
          );
        }
        this.activeCategoryID = this.selectedTab.map((item) => {
          return item.department_id;
        });
        this.activeCategoryList = this.selectedTab.map(
          (item) => item.department_name
        );
        if (!this.activeCategoryList.length) {
          this.activeCategoryList.push(this.$t("popularPeople.all"));
        }
        if (this.activeCategoryList.length == this.jobTitleList.length - 1) {
          this.activeCategoryList.push(this.$t("popularPeople.all"));
        }
        this.newResult = [];
        this.getPopularPeople(this.activeCategoryID);
      } else {
        this.newResult = [];
        this.selectedTab = [];
        this.activeCategoryID = [];
        this.activeCategoryList = [this.$t("popularPeople.all")];
        this.getPopularPeople(this.activeCategoryID);
      }
    },
    // onScroll() {
    //   let bottomOfWindow =
    //     document.documentElement.offsetHeight +
    //     document.documentElement.scrollTop >=
    //     document.documentElement.scrollHeight;
    //   if (bottomOfWindow && this.totalRecords > this.newResult.length) {
    //     this.page = ++this.page;
    //     setTimeout(() => {
    //       // this.getPopularPeople();
    //       if (
    //         this.tabname != this.$t("popularPeople.all") &&
    //         this.tabname != ""
    //       ) {
    //         this.activeCategoryID = this.selectedTab.map(
    //           (item) => item.department_id
    //         );
    //         this.activeCategoryList = this.selectedTab.map(
    //           (item) => item.department_name
    //         );
    //         if (!this.activeCategoryList.length) {
    //           this.activeCategoryList.push(this.$t("popularPeople.all"));
    //         }
    //         if (this.activeCategoryList.length == this.jobTitleList.length - 1) {
    //           this.activeCategoryList.push(this.$t("popularPeople.all"));
    //         }
    //         this.getPopularPeople(this.activeCategoryID);
    //       } else {
    //         this.selectedTab = [];
    //         this.activeCategoryID = [];
    //         this.activeCategoryList = [this.$t("popularPeople.all")];
    //         this.getPopularPeople(this.activeCategoryID);
    //       }
    //     }, 100);
    //   }
    // },
  },
};
</script>
