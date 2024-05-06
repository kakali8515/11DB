<template>
  <div class="form-group w-100">
    <input
      type="search"
      class="form-control"
      v-model="search"
      @keyup.enter="getSearchInput"
      :class="isError ? 'error-border' : ''"
      @click="!list.length ? (shows = false) : (shows = !shows)"
      :placeholder="placeholder"
      @input="inputEvent"
    />
  </div>
  <div
    class="search-wrap-area search-scrollable"
    @scroll="onScroll"
    v-if="shows"
    v-click-outside="() => (shows = false)"
  >
    <ul v-if="list.length > 0">
      <li
        v-for="(item, i) in list"
        :key="i"
        :class="
          selectedItem != null && item[label_id] == selectedItem[label_id]
            ? 'selected'
            : ''
        "
      >
        <div class="tags-img">
          <img :src="item.thumbnail" v-if="item.thumbnail" alt="" />
          <img v-else src="@/assets/images/no-image-view.png" />
        </div>
        <span @click="selectItem(item)"
          >{{ item[label_property] }}({{ item[label_id] }})</span
        >
      </li>
    </ul>
    <ul v-else>
      <li>
        <span>{{ $t("filterCard.noDataFound") }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, toRef, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import i18n from "@/config/i18n";
import vClickOutside from "click-outside-vue3";
const { t } = i18n.global;
export default {
  name: "DropdownWithPagination",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    list: Array,
    isError: Boolean,
    page: Number,
    label_property: String,
    label_id: String,
    placeholder: String,
    selectedItem: Object,
    totalRecords: Number,
  },
  emits: ["searchInput", "itemSelected", "scrolling", "inputEvent"],
  setup(props, { emit }) {
    const route = useRoute();
    const search = ref("");
    const belowList = toRef(props, "connectionBelowList");
    const connection = toRef(props, "connectionValue");
    const shows = ref(false);
    const type = toRef(props, "type");

    watch(
      () => props.list,
      function (n, o) {
        if (o.length != n.length) {
          isApiCallAllowed.value = true;
        }
      }
    );
    watch(
      () => props.selectedItem,
      function (n, o) {
        if (n != null) {
          search.value = n[props.label_property];
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
      if (props.selectedItem != null) emit("itemSelected", null);
    };

    // infinite scroll
    const isApiCallAllowed = ref(true);
    const onScroll = (el) => {
      let bottomOfWindow =
        el.target.offsetHeight + 150 + el.target.scrollTop >=
        el.target.scrollHeight;
      if (
        bottomOfWindow &&
        isApiCallAllowed.value &&
        props.list.length != props.totalRecords
      ) {
        let newPage = props.page + 1;
        emit("scrolling", newPage);
        isApiCallAllowed.value = false;
      }
    };
    const selectItem = (item) => {
      shows.value = false;
      emit("itemSelected", item);
    };

    return {
      search,
      getSearchInput,
      shows,
      type,
      selectItem,
      onScroll,
      inputEvent,
      isApiCallAllowed,
    };
  },
};
</script>

<style>
.selected {
  background-color: #f3f6f8;
}
</style>
