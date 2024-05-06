<template>
  <div class="tags-from-details">
    <div class="page-heading-area page-main-heading">
      <h2>{{ $t("tagDetails.tags") }}</h2>
      <div :class="[
        genre_details.length == 0 && tag_details.length == 0 ? '' : '',
        'tag-btn',
      ]">
        <a :class="genre_details.length == 0 && tag_details.length == 0 ? '' : ''
          " @click="isEdit == true ? isEditBtn() : saveTagDetails()" class="saveBtn">{{ isEdit ? $t("button.edit") :
    $t("button.save") }}</a>
      </div>
    </div>

    <div class="tag-content-area">
      <div class="tag-content-list" v-for="(tag, index) in tagDetails" :key="index">
        <div class="tags-upper-area" :class="isEdit ? 'isDisabled' : ''">
          <h4>{{ tag.category_name }}</h4>
          <span class="plusicon" @click="openTagModal(tag)" :class="isEdit ? 'pointer-events-none' : ''">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.9993 10.668V21.3346M21.3327 16.0013L10.666 16.0013" stroke="white" stroke-linecap="round"
                stroke-linejoin="round" />
              <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#41444C" />
            </svg>
          </span>
        </div>
        <div class="tags-listings">
          <div class="single-tag" v-for="(item, i) in tag.tags" :key="i" :class="isEdit ? 'isDisabled' : ''">
            {{ item.display_name }} ({{ item.score }})
            <span @click="removeTagList(item, tag)" :class="isEdit ? 'pointer-events-none' : ''"><img
                src="@/assets/icons/close.svg" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- add tag modal -->

  <div class="new-cast-modal tag-modal">
    <PopUpModal :isModal="isTagModal">
      <template v-slot:header>
        <h1>{{ $t("tagDetails.addNewTag") }}</h1>
        <!-- <button @click="isVideoModal = false">
          <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
        </button> -->
      </template>
      <template v-slot:body>
        <div class="add-tag-popbody">
          <div class="form-group">
            <label>{{ $t("filterCard.subCategory") }}</label>
            <SearchDropdown @dropdownValue="getSubCateId" :search_type="sub_cat_id"
              :searchTitleListItem="sub_category_list" searchtitle="category_name" searchvalue="id"
              :labelItem="$t('dictionary.select')" />
          </div>
          <div class="form-group martop16">
            <label>{{ $t("filterCard.tags") }}</label>
            <SearchDropdown @dropdownValue="chooseTag" :search_type="tag_search_id" :searchTitleListItem="tag_search_list"
              searchtitle="title" searchvalue="id" :labelItem="$t('tagDetails.searchTags')" />
          </div>
          <div class="tags-listings" v-if="tagBelowList.length > 0">
            <div class="single-tag" v-for="(tag, i) in tagBelowList" :key="i">
              {{ tag.title }}
              <span @click="removeTagSearch(tag)"><img src="../../assets/icons/cross-black.svg" alt="" /></span>
            </div>
          </div>

          <div class="form-group martop24">
            <label>{{ $t("tagDetails.score") }}</label>
            <SearchDropdown @dropdownValue="(value) => {
              score = value;
            }
              " :search_type="score" :searchTitleListItem="score_list" :labelItem="$t('tagDetails.score')"
              :clearable="false" />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" :class="tagBelowList.length == 0 ? 'isDisabled' : ''"
            :disabled="tagBelowList.length == 0" @click="addTags">
            {{ $t("button.save") }}
          </button>
          <button class="red-fill-btn" @click="closeModal">
            {{ $t("button.cancel") }}
          </button>
        </div>
      </template>
    </PopUpModal>
  </div>

  <!-- submit modal -->
  <div class="new-cast-modal center-popup-modal">
    <PopUpModal :isModal="isSubmit">
      <template v-slot:header>
        <h1 class="text-center" v-html="$t('addNewMoviesForm.youShouldSubmitToSendTheAdd')"></h1>
      </template>
      <template v-slot:body> </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" @click="submitTagDetails">
            {{ $t("button.ok") }}
          </button>
          <button class="red-fill-btn" @click="isSubmit = false">
            {{ $t("button.cancel") }}
          </button>
        </div>
      </template>
    </PopUpModal>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import AddNewMovieService from "@/services/AddNewMovieService";
import EditMovieService from "@/services/EditMovieService";
import Toast from "@/alert/alert.js";
import Modal from "@/components/Modal.vue";
export default {
  name: "TagsDetails",
  components: {
    Tabs,
    TabWrapper,
    PopUpModal,
    Modal,
  },
  data() {
    return {
      shows: false,
      shows1: false,
      isTagModal: false,
      tagDetails: [],
      routeId: this.$route.params.id,
      category_id: "",
      sub_category_list: [],
      tag_search_list: [],
      sub_cat_id: null,
      score: 1,
      tagBelowList: [],
      genre_details: [],
      tag_details: [],
      type: "",
      isSubmit: false,
      tag_search_id: null,
      title_id:
        this.$route.params.type == "internal"
          ? this.$route.params.external_id
          : "",
      isEdit: false,
      score_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  props: {
    site_language: {
      type: String,
    },
    saveIdList: {
      type: Object,
    },
    itemType: {
      type: String,
    },
  },
  emits: ["selectedId", "isEditOn"],
  created() {
    this.AddNewMovieService = new AddNewMovieService();
    this.EditMovieService = new EditMovieService();
  },

  watch: {
    site_language: function (newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
        if (draft_ids[0]) {
          this.routeId = draft_ids[0]?.primaryDetails[this.itemType][
            this.site_language
          ]?.draft_request_id
            ? draft_ids[0]?.primaryDetails[this.itemType][this.site_language]
              ?.draft_request_id
            : "";
        } else {
          this.routeId = this.routeId;
        }
        this.genre_details = [];
        this.tag_details = [];
        this.tagRequestList();
      }
    },
  },

  mounted() {
    if (this.$route.params.type == "internal") {
      this.isEdit = true;
    }
    const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
    if (draft_ids[0]) {
      this.routeId = draft_ids[0]?.primaryDetails[this.itemType][
        this.site_language
      ]?.draft_request_id
        ? draft_ids[0]?.primaryDetails[this.itemType][this.site_language]
          ?.draft_request_id
        : "";
    } else {
      this.routeId = this.routeId;
    }

    this.tagRequestList();
  },
  methods: {
    // tag list
    tagRequestList() {
      let tagDetails;
      if (this.$route.params.type == "internal") {
        tagDetails = this.EditMovieService.getTagDetails(
          this.routeId,
          this.site_language,
          this.title_id
        );
      } else {
        tagDetails = this.AddNewMovieService.getTagDetails(
          this.routeId,
          this.site_language
        );
      }
      tagDetails
        .then((res) => {
          if (res.status == 200) {
            this.$emit("selectedId", {
              ...JSON.parse(localStorage.getItem("saveIdList") || "{}"),
              request_id: res.data.draft_request_id,
              tag_request_id: res.data.draft_tag_id,
            });
            this.tagDetails = res.data.results;
            if (this.$route.params.type == "internal") {
              Array.from(this.tagDetails).forEach((item) => {
                if (item.type == "genre") {
                  Array.from(item.tags).forEach((tag) => {
                    this.genre_details.push({
                      tag_id: tag.tag_id,
                      id: tag.id ? tag.id : "",
                      title: tag.display_name,
                      score: tag.score,
                    });
                  });
                } else {
                  Array.from(item.tags).forEach((tag) => {
                    this.tag_details.push({
                      tag_id: tag.tag_id,
                      id: tag.id ? tag.id : "",
                      title: tag.display_name,
                      score: tag.score,
                    });
                  });
                }
              });
            } else {
              Array.from(this.tagDetails).forEach((item) => {
                if (item.type == "genre") {
                  Array.from(item.tags).forEach((tag) => {
                    this.genre_details.push({
                      id: tag.tag_id,
                      title: tag.display_name,
                      score: tag.score,
                    });
                  });
                } else {
                  Array.from(item.tags).forEach((tag) => {
                    this.tag_details.push({
                      id: tag.tag_id,
                      title: tag.display_name,
                      score: tag.score,
                    });
                  });
                }
              });
            }
          }
        })
        .catch((err) => {
          return;
        });
    },
    openTagModal(tag) {
      this.isTagModal = true;
      this.category_id = tag.category_id;
      this.type = tag.type;
      this.sub_cat_id = null;
      this.tag_search_id = null;
      this.getSubcategoryList();
      const storedTheme = localStorage.getItem("theme-colour");
      const body = document.body;
      if (storedTheme === "theme-dark") {
        body.classList.add("dark-modal-open");
      }
    },

    // get sub category list

    getSubcategoryList() {
      this.AddNewMovieService.getSubcategoryList(
        this.category_id,
        this.site_language
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

    getSubCateId(event) {
      this.sub_cat_id = event;
      this.tag_search_id = null;
      this.tag_search_list = [];
      if (this.sub_cat_id) {
        this.getTagSearchList();
      }
    },

    // tag search list
    getTagSearchList() {
      this.AddNewMovieService.getTagSearchList(
        this.category_id,
        this.sub_cat_id,
        this.site_language,
        ""
      )
        .then((res) => {
          if (res.status == 200) {
            this.tag_search_list = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },

    // score select

    addScore() {
      if (this.score == 10) {
        return false;
      }
      this.score++;
    },
    removeScore() {
      if (this.score == 1) {
        return false;
      }
      this.score--;
    },

    // select tags
    chooseTag(event) {
      this.tag_search_id = event;
      let data = this.tagBelowList.find((f) => {
        return f.id == event;
      });
      let tag_name = this.tag_search_list.find((item) => {
        return item.id == event;
      });
      if (!data && event) {
        this.tagBelowList.push({
          id: event,
          title: tag_name.title,
          score: this.score,
        });
      }
    },

    // remove tag search
    removeTagSearch(tag) {
      let data = this.tagBelowList.find((f) => {
        return f.id == tag.id;
      });
      if (data) {
        this.tagBelowList.splice(this.tagBelowList.indexOf(tag), 1);
      }
    },

    // add new tag
    addTags() {
      Array.from(this.tagBelowList).forEach((item) => {
        item.score = this.score;

        let tagData = this.tagDetails.find((f) => {
          return f.category_id == this.category_id;
        });

        if (tagData) {
          let subTag = tagData.tags.find((f) => {
            return f.tag_id == item.id && f.score == this.score;
          });
          if (!subTag) {
            tagData.tags.push({
              tag_id: item.id,
              score: this.score,
              display_name: item.title,
            });
          }
        }
        const body = document.body;
        body.classList.remove("dark-modal-open");
      });

      this.genre_details = [];
      this.tag_details = [];
      Array.from(this.tagDetails).forEach((item) => {
        if (item.type == "genre") {
          Array.from(item.tags).forEach((tag) => {
            this.genre_details.push({
              id: tag.id ? tag.id : "",
              tag_id: tag.tag_id,
              title: tag.display_name,
              score: tag.score,
            });
          });
        } else {
          Array.from(item.tags).forEach((tag) => {
            this.tag_details.push({
              tag_id: tag.tag_id,
              id: tag.id ? tag.id : "",
              title: tag.display_name,
              score: tag.score,
            });
          });
        }
      });

      this.isTagModal = false;
      this.category_id = "";
      this.type = "";
      this.score = 1;
      this.tagBelowList = [];
      this.sub_cat_id = "";
      this.tag_search_list = [];
    },

    findUnique(arr, predicate) {
      var found = {};
      arr.forEach((d) => {
        found[predicate(d)] = d;
      });
      return Object.keys(found).map((key) => found[key]);
    },

    closeModal() {
      this.isTagModal = false;
      this.category_id = "";
      this.type = "";
      this.score = 1;
      this.tagBelowList = [];
      this.sub_cat_id = "";
      this.tag_search_list = [];
      const body = document.body;
      body.classList.remove("dark-modal-open");
    },

    // remove tag mail list
    removeTagList(tag, mainTag) {
      let tagData = this.tagDetails.find((f) => {
        return f.category_id == mainTag.category_id;
      });
      if (tagData) {
        let subTag = tagData.tags.find((f) => {
          return f.tag_id == tag.tag_id;
        });
        if (subTag) {
          tagData.tags.splice(tagData.tags.indexOf(subTag), 1);
        }
      }

      if (mainTag.type == "genre") {
        let data;
        if (this.$route.params.type == "internal") {
          data = this.genre_details.find((f) => {
            return f.tag_id == tag.tag_id;
          });
        } else {
          data = this.genre_details.find((f) => {
            return f.id == tag.tag_id;
          });
        }

        if (data) {
          this.genre_details.splice(this.genre_details.indexOf(data), 1);
        }
      } else {
        let data;
        if (this.$route.params.type == "internal") {
          data = this.tag_details.find((f) => {
            return f.tag_id == tag.tag_id;
          });
        } else {
          data = this.tag_details.find((f) => {
            return f.id == tag.tag_id;
          });
        }
        if (data) {
          this.tag_details.splice(this.tag_details.indexOf(data), 1);
        }
      }
    },

    saveTagDetails() {
      this.isSubmit = true;
    },

    submitTagDetails() {
      this.addTagDetails();
    },

    isEditBtn() {
      this.isEdit = false;
      this.$emit("isEditOn", false);
    },

    // save tag details
    addTagDetails() {
      let saveTagDetails;
      const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
      if (draft_ids[0] && this.$route.params.type == "internal") {
        this.routeId = draft_ids[0]?.primaryDetails[this.itemType][
          this.site_language
        ]?.draft_request_id
          ? draft_ids[0]?.primaryDetails[this.itemType][this.site_language]
            ?.draft_request_id
          : draft_ids[0]?.primaryDetails[this.itemType].draft_relation_id
            ? draft_ids[0]?.primaryDetails[this.itemType].draft_relation_id
            : "";
      }
      let credentials = {
        draft_request_id: this.routeId,
        site_language: this.site_language,
        draft_tag_id: this.saveIdList.tag_request_id,
        genre_details: this.genre_details,
        tag_details: this.tag_details,
      };
      if (this.$route.params.type == "internal") {
        credentials.title_id = this.title_id;
        credentials.title_type = this.itemType;
        saveTagDetails = this.EditMovieService.saveTag(credentials);
      } else {
        credentials.tag_details = credentials.tag_details.map((tags) => {
          tags.id = tags.id ? tags.id : tags.tag_id;
          return tags;
        });
        credentials.genre_details = credentials.genre_details.map((tags) => {
          tags.id = tags.id ? tags.id : tags.tag_id;
          return tags;
        });
        saveTagDetails = this.AddNewMovieService.saveTag(credentials);
      }

      saveTagDetails
        .then((res) => {
          if (res.status == 200) {
            this.genre_details = [];
            this.tag_details = [];
            this.isSubmit = false;
            this.saveIdList.tag_request_id = res.data.data[0].draft_tag_id;
            if (this.$route.params.type == "internal") {
              this.isEdit = true;
              const draft_ids = JSON.parse(
                  localStorage.getItem("draft_ids") || "[]"
                );

                if (draft_ids[0]) {
                  const res_option_type =
                    draft_ids[0].primaryDetails[this.itemType][
                      this.site_language
                    ]?.draft_request_id;

                  if (!res_option_type) {
                    draft_ids[0].primaryDetails[this.itemType][
                      this.site_language
                    ] = res.data.data[0];
                  }
                } else {
                  const put_primary_details = {
                    primaryDetails: {
                      [this.itemType]: {
                        [this.site_language]: {
                          draft_request_id: res.data.data[0].draft_request_id,
                        },
                        draft_relation_id: res.data.data[0].draft_request_id,
                      },
                    },
                  };
                  draft_ids.push(put_primary_details);
                }

                // Saving
                localStorage.setItem("draft_ids", JSON.stringify(draft_ids));
              if (this.itemType == "movie") {
                this.$router.push({
                  name: "AddNewMovieForm",
                  params: {
                    external_id: this.title_id,
                    type: "internal",
                    id: res.data.data[0].draft_request_id,
                    itemActive: "tag",
                    activeIndex: "3",
                  },
                });
              } else if(this.itemType == "tv") {
                this.$router.push({
                  name: "AddNewTVDetails",
                  params: {
                    external_id: this.title_id,
                    type: "internal",
                    id: res.data.data[0].draft_request_id,
                    itemActive: "tag",
                    activeIndex: "5",
                  },
                });
              } else {
                this.$router.push({
                  name: "AddNewWebtoonDetails",
                  params: {
                    external_id: this.title_id,
                    type: "internal",
                    id: res.data.data[0].draft_request_id,
                    itemActive: "tag",
                    activeIndex: "5",
                  },
                });
              }
            }
            this.$emit("selectedId", this.saveIdList);
            localStorage.setItem("saveIdList", JSON.stringify(this.saveIdList));
            this.$emit("isEditOn", true);
            this.tagRequestList();
            Toast.fire({ title: this.$t("Error.success") });
          } else {
            this.isSubmit = false;
            Toast.fire({ title: res.response.data.error });
          }
        })
        .catch((err) => {
          this.isSubmit = false;
          Toast.fire({ title: err.response.data.error });
          return;
        });
    },
  },
};
</script>

<style></style>
