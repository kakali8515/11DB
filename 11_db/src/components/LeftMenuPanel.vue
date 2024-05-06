<template>
  <div class="left-panel-menu">
    <div class="left-menu">
      <ul>
        <li v-for="(item, index) in menudata" :key="index" @click="fetchMenuData(item.value, index)" :class="[
          index == activeItem ? 'active' : '',
          item.isSaved ? 'complete' : '',
        ]">
          <a :class="[
            index != 0 &&
              !menudata[0].isSaved &&
              $route.params.type != 'internal'
              ? 'isDisabled'
              : '',
            (menuType == 'tv' || menuType == 'webtoons') &&
              item.value != 'tag' &&
              item.value != 'season' &&
              item.value != 'primary' &&
              $route.params.type != 'internal' &&
              !menudata[1].isSaved
              ? 'isDisabled'
              : '',
          ]">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <button @click="submitAllData" class="submit-movie-form" type="submit" :class="!routeId ? 'isDisabled' : ''"
      :disabled="!routeId">
      {{ $t("addNewMoviesForm.submitAllData") }}
    </button>
    <!-- Warning modal -->
    <div class="new-cast-modal center-popup-modal">
      <PopUpModal :isModal="isChange">
        <template v-slot:header>
          <h1>{{ $t("addNewMoviesForm.warningModelTitle") }}</h1>
        </template>
        <template v-slot:body>
          <div class="cast-details">
            <p>
              {{ $t("addNewMoviesForm.warningModelSubText1") }}<br />
              {{ $t("addNewMoviesForm.warningModelSubText2") }}
            </p>
          </div>
        </template>
        <template v-slot:footer>
          <div class="button-group">
            <button class="black-outline-btn" @click="onConfirm">
              {{ $t("button.ok") }}
            </button>
            <button class="red-fill-btn" @click="onCancel">
              {{ $t("addNewMoviesForm.cancel") }}
            </button>
          </div>
        </template>
      </PopUpModal>
    </div>
  </div>
</template>

<!-- :class="item.isSaved ? 'complete' : ''" -->
<script>
import { computed } from "@vue/reactivity";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
export default {
  components: { PopUpModal },
  name: "LeftMenuPanel",
  props: {
    selectedMenu: String,
    menuType: String,
    saveIdList: Object,
    isEdittable: Boolean,
    activeIndex: Number,
  },
  emits: ["movieMenudata", "submitData", "tabChanged"],
  data() {
    return {
      activeItem: this.activeIndex ? this.activeIndex : 0,
      routeId: this.$route.params.id,
      menudata: this.fetchMenuType(),
      isChange: false,
      targetMenuItem: {},
    };
  },
  watch: {
    saveIdList: {
      handler(n, o) {
        // console.log(n, o);
        if (n.media_request_id) {
          if (this.$route.name == "AddNewTVDetails" || this.$route.name == "AddNewWebtoonDetails") {
            this.menudata[3]["isSaved"] = true;
          } else {
            this.menudata[1]["isSaved"] = true;
          }
        }
        if (n.credit_request_id) {
          if (this.$route.name == "AddNewTVDetails" || this.$route.name == "AddNewWebtoonDetails") {
            this.menudata[4]["isSaved"] = true;
          } else {
            this.menudata[2]["isSaved"] = true;
          }
        }
        if (n.tag_request_id) {
          if (this.$route.name == "AddNewTVDetails" || this.$route.name == "AddNewWebtoonDetails") {
            this.menudata[5]["isSaved"] = true;
          } else {
            this.menudata[3]["isSaved"] = true;
          }
        }
        if (n.request_id) {
          this.menudata[0]["isSaved"] = true;
        }
        if (n.episode_request_id) {
          if (this.$route.name == "AddNewTVDetails" || this.$route.name == "AddNewWebtoonDetails") {
            this.menudata[2]["isSaved"] = true;
          }
        }
        if (n.season_id) {
          if (this.$route.name == "AddNewTVDetails" || this.$route.name == "AddNewWebtoonDetails") {
            this.menudata[1]["isSaved"] = true;
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    fetchMenuData(val, i) {
      if (
        i != 0 &&
        !this.menudata[0].isSaved &&
        this.$route.params.type != "internal"
      ) {
        return;
      } else if (
        (this.menuType == "tv" || this.menuType == "webtoons") &&
        val != "tag" &&
        val != "season" &&
        val != "primary" &&
        !this.menudata[1].isSaved &&
        this.$route.params.type != "internal"
      ) {
        return;
      }

      if (this.$route.params.type == "internal" && this.isEdittable) {
        this.isChange = true;
        this.targetMenuItem = { val, i };
      } else {
        this.activeItem = i;
        this.$emit("movieMenudata", val);
      }
    },
    onConfirm() {
      this.activeItem = this.targetMenuItem.i;
      this.$emit("movieMenudata", this.targetMenuItem.val);
      this.isChange = false;
      this.$emit("tabChanged", true);
    },
    onCancel() {
      this.isChange = false;
    },

    submitAllData() {
      this.$emit("submitData");
    },
    fetchMenuType() {
      let menuitems = [
        {
          title: computed(() => this.$t("addNewMoviesForm.primaryDetails")),
          value: "primary",
          isSaved: false,
        },
        {
          title: computed(() => this.$t("addNewMoviesForm.media")),
          value: "media",
          isSaved: false,
        },
      ];
      if (this.menuType == "movie") {
        menuitems.push({
          title: computed(() => this.$t("credit.credit")),
          value: "credit",
          isSaved: false,
        });
        menuitems.push({
          title: computed(() => this.$t("tagDetails.tags")),
          value: "tag",
          isSaved: false,
        });
      }
      if (this.menuType == "tv" || this.menuType == "webtoons") {
        let mediaItem = menuitems.pop();
        menuitems.push({
          title: computed(() => this.$t("season.season")),
          value: "season",
          isSaved: false,
        });
        menuitems.push({
          title: computed(() => this.$t("episode.episode")),
          value: "episode",
          isSaved: false,
        });
        menuitems.push(mediaItem);
        menuitems.push({
          title: computed(() => this.$t("credit.credit")),
          value: "credit",
          isSaved: false,
        });
        menuitems.push({
          title: computed(() => this.$t("tagDetails.tags")),
          value: "tag",
          isSaved: false,
        });
      }
      return menuitems;
    },
  },
  updated() {
    const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
    if (draft_ids[0]) {
      this.routeId =
        draft_ids[0]?.primaryDetails[this.menuType] &&
          draft_ids[0]?.primaryDetails[this.menuType]?.draft_relation_id
          ? draft_ids[0]?.primaryDetails[this.menuType]?.draft_relation_id
          : "";
    } else {
      this.routeId = this.routeId;
    }
  },
};
</script>
