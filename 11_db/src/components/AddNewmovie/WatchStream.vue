<template>
  <div class="dropdown_wrap" v-click-outside="() => (toggle = false)">
    <div class="togglesdrop" @click="toggle = !toggle" :class="errorValue ? 'error-border' : ''">
      <p>{{ selectText }}</p>
      <span class="arows">
        <img src="@/assets/icons/chevron-down-black.svg" alt="" class="light-mode-icon" />
        <img src="@/assets/icons/chevron-down-white.svg" alt="" class="dark-mode-icon" />
      </span>
    </div>

    <div class="watch-list-area" v-show="toggle">
      <ul>
        <li v-for="(list, i) in ottList" :key="i">
          <span>{{ list.ott_service_provider_name }}</span>
          <a @click="isEdit ? '' : addItem(list)" :disabled="isEdit" :class="isEdit ? 'isDisabled' : ''">{{
            $t("addNewPeople.mediadetails.add+") }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="selectTags-area">
    <div class="watchTags" v-for="(item, i) in belowList" :key="i">
      <div class="icon-txt">
        <span class="channel-icon"> <img :src="item.ott_logo_path" /></span>
        <input :value="item.movie_id || item.read_id" type="text" :placeholder="placeholder"
          @change="addInputItem($event, item)" :disabled="isEdit" maxlength="300" />
      </div>
      <div class="corss" @click="removeItem(item)" :class="isEdit ? 'pointer-events-none' : ''">
        <img src="@/assets/icons/close-g.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";
import { computed } from "@vue/reactivity";
export default {
  name: "WatchStream",
  props: {
    ottList: Array,
    selectText: String,
    belowList: Array,
    watchstream: Array,
    errorValue: String,
    isEdit: Boolean,
    typecat: String,

  },
  data() {
    return {
      toggle: false,
      placeholder: computed(() => this.typecat == "tv" ? this.$t('tvShows.EnterTVID') : this.typecat == "webtoons" ? this.$t('addNewWebtoonForm.EnterWebtoonID') : this.$t('addNewMoviesForm.EntermovieID')),
    };
  },


  computed: {
    addedList() {
      return this.watchstream;
    },

  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  emits: ["watchInput"],
  methods: {

    addItem(item) {
      let data = this.belowList.find((f) => {
        return (
          f.ott_service_provider_id == item.ott_service_provider_id ||
          f.provider_id == item.ott_service_provider_id
        );
      });
      if (!data) {
        this.belowList.push(item);
        if (this.$route.params.type == "internal") {
          if (this.typecat == 'webtoons') {
            this.addedList.push({
              ott_provider_id: item.ott_service_provider_id,
              read_id: "",
              id: "",
            });
          } else {
            this.addedList.push({
              ott_provider_id: item.ott_service_provider_id,
              ott_provider_provided_id: "",
              id: "",
            });
          }
        } else {
          let pushData = {
            ott_provider_id: item.ott_service_provider_id,
          }
          if (this.typecat == 'webtoons') {
            pushData['read_id'] = "";
          } else {
            pushData['ott_provider_provided_id'] = "";
          }
          this.addedList.push(pushData);
        }
        this.$emit("watchInput", this.addedList);
      }
    },

    removeItem(item) {
      let data = this.belowList.find((f) => {
        return (
          f.ott_service_provider_id == item.ott_service_provider_id ||
          f.provider_id == item.ott_service_provider_id
        );
      });
      if (data) {
        this.belowList.splice(this.belowList.indexOf(item), 1);

        for (let j = 0; j < this.addedList.length; j++) {
          if (
            this.addedList[j].ott_provider_id == item.ott_service_provider_id ||
            this.addedList[j].ott_provider_id == item.provider_id
          ) {
            this.addedList.splice(j, 1);
          }
        }
        this.ottList.map((i) => {
          if (i.ott_service_provider_id == item.ott_service_provider_id) {
            i.movie_id = "";
          }
        });
        this.$emit("watchInput", this.addedList);
      }
    },

    addInputItem(event, item) {
      let data = this.addedList.find((f) => {
        return (
          f.ott_provider_id == item.ott_service_provider_id ||
          f.ott_provider_id == item.provider_id
        );
      });
      if (data) {
        if (this.typecat == 'webtoons') {
          data.read_id = event.target.value;
        } else {
          data.ott_provider_provided_id = event.target.value;
        }
        this.$emit("watchInput", this.addedList);
      }

      let data2 = this.belowList.find((f) => {
        return f == item;
      });
      if (data2) {
        data2["movie_id"] = event.target.value;
      }
      // console.log(this.addedList);
    },
  },


};

</script>
