<template>
  <div>
    <div class="form-group search-area" :class="type == 'artist' ? 'artist-background' : ''">
      <input type="search" class="form-control" v-model="search" @keyup="getSearchInput"
        :class="isError ? 'error-border' : ''" @click="search == '' ? (shows = false) : (shows = !shows)"
        :placeholder="placeholder" :disabled="isEdit" @input="inputEvent" />
      <span class="searchBtn" @click="getSearchInput"><img v-if="type != 'artist'" src="@/assets/icons/search.svg"
          alt="" /></span>
    </div>
    <div class="search-wrap-area search-scrollable" @scroll="onScroll"
      :class="type == 'artist' ? 'artist-background' : ''" v-if="shows" v-click-outside="() => (shows = false)">
      <ul v-if="list.length > 0 && type != 'artist'">
        <li v-for="(item, i) in list" :key="i">
          <div class="tags-img">
            <img :src="item.title_poster" v-if="item.title_poster" alt="" />
            <img v-else src="@/assets/images/no-image-view.png" />
          </div>
          <span>{{ item.title_name }}</span>
          <a @click="addConnection(item)">{{
            $t("addNewPeople.mediadetails.add+")
          }}</a>
        </li>
      </ul>
      <ul v-else-if="list.length > 0 && type == 'artist'">
        <li v-for="(item, i) in list" :key="i" @click="addConnection(item)">
          <div class="tags-img">
            <img :src="item.title_poster" v-if="item.title_poster" alt="" />
            <img v-else src="@/assets/images/no-image-view.png" />
          </div>
          <span>{{ item.title_name }}</span>
        </li>
      </ul>
      <ul v-if="isConnectionData && list.length == 0">
        <li>
          <span>{{ $t("filterCard.noDataFound") }}</span>
        </li>
      </ul>
    </div>
  </div>
  <div class="search-tags-area" :class="type == 'artist' ? 'artist-background' : ''">
    <div class="single-tags" v-for="(item, i) in belowList" :key="i">
      <div class="tags-img" v-if="item.title_poster">
        <img :src="item.title_poster" alt="" />
      </div>
      <p>{{ item.title_name }}</p>
      <span class="clsBtn" :class="isEdit ? 'isDisabled' : ''"><img src="@/assets/icons/close.svg" alt=""
          @click="removeItem(item)" :class="isEdit ? 'pointer-events-none' : ''" /></span>
    </div>
  </div>
</template>

<script>
import { ref, toRef, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import i18n from "@/config/i18n";
import vClickOutside from "click-outside-vue3";
const { t } = i18n.global;
export default {
  name: "SearchVideo",
  // data() {
  //   return {
  //     shows: false,
  //   };
  // },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    list: Array,
    connectionBelowList: Array,
    connectionValue: Array,
    type: String,
    title_type: String,
    isEdit: Boolean,
    isError: Boolean,
    page: Number,
    isConnectionData: Boolean
  },
  emits: ["searchInput", "connectionInput", "scrolling", "inputEvent"],
  setup(props, { emit }) {
    const route = useRoute();
    const search = ref("");
    const belowList = toRef(props, "connectionBelowList");
    const connection = toRef(props, "connectionValue");
    const shows = ref(false);
    const type = toRef(props, "type");
    const placeholder = computed(() => {
      return type.value == "artist"
        ? t("searchVideo.searchArtists")
        : props.title_type == "tv"
          ? t("searchVideo.searchTVShows")
          : props.title_type == "webtoon" ? t("button.search") : t("searchVideo.searchMovies");
    });
    watch(
      () => props.list,
      function (n, o) {
        if (o.length != n.length) {
          isApiCallAllowed = true;
        }
      }
    );
    const inputEvent = (event) => {
      emit("inputEvent");
    };

    const getSearchInput = (event) => {
      if (event.target.value) {
        shows.value = true;
      } else {
        shows.value = false;
      }
      emit("searchInput", event.target.value);
    };

    const addConnection = (item) => {
      let data = belowList.value.find((f) => {
        return f.title_id == item.title_id;
      });

      if (!data) {
        belowList.value.push(item);
      }

      if (connection.value.indexOf(item.title_id) === -1) {
        if (route.params.type == "internal") {
          let data = connection.value.find((f) => {
            return f.related_title_id == item.title_id || f.related_series_title_id == item.title_id;
          });
          if (!data) {
            if (type.value == "connection") {
              connection.value.push({
                related_title_id: item.title_id,
                id: "",
              });
            } else {
              connection.value.push({
                related_series_title_id: item.title_id,
                id: "",
              });
            }
          }
        } else {
          if (type.value == "series") {
            connection.value.push({
              title_id: item.title_id,
              tmdb_id: "",
            });
          } else {
            connection.value.push(item.title_id);
          }
        }
      }

      emit("connectionInput", connection.value);
      shows.value = false;
      search.value = "";
    };

    const removeItem = (item) => {
      let data = belowList.value.find((f) => {
        return f.title_id == item.title_id;
      });
      // console.log(item);
      if (data) {
        belowList.value.splice(belowList.value.indexOf(item), 1);
        if (route.params.type == "internal") {
          let data2;
          if (type.value == "connection") {
            data2 = connection.value.find((f) => {
              return f.related_title_id == item.title_id;
            });
          } else {
            data2 = connection.value.find((f) => {
              return f.related_series_title_id == item.title_id;
            });
          }
          connection.value.splice(connection.value.indexOf(data2), 1);
        } else {
          if (type.value == "series") {
            let data2 = connection.value.find((f) => {
              return f.title_id == item.title_id;
            });
            connection.value.splice(connection.value.indexOf(data2), 1);
          } else {
            connection.value.splice(connection.value.indexOf(item.title_id), 1);
          }
        }
        // console.log(connection.value);
        emit("connectionInput", connection.value);
      }
    };
    // infinite scroll
    let isApiCallAllowed = true;
    const onScroll = (el) => {
      let bottomOfWindow =
        el.target.offsetHeight + 150 + el.target.scrollTop >=
        el.target.scrollHeight;
      if (bottomOfWindow && isApiCallAllowed) {
        let newPage = props.page + 1;
        emit("scrolling", newPage);
        isApiCallAllowed = false;
      }
    };

    return {
      search,
      getSearchInput,
      addConnection,
      belowList,
      removeItem,
      shows,
      type,
      placeholder,
      onScroll,
      inputEvent,
    };
  },
};
</script>

<style></style>
