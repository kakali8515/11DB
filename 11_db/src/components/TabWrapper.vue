<template>
  <div class="tabs">
    <div class="tabs-otr">
      <ul class="tabs-header">
        <template v-for="title in tabTitles" :key="title">
        <li v-if="title"
          :class="[{ active: title == selectedTitle }, title == webtoonDisable ? 'pointer-events-none' : '']"
          @click="selectedTab(title)">
          {{ $t(title) }}
        </li>
      </template>
      </ul>
    </div>
    <slot />
  </div>
</template>

<script>
import { ref, provide } from "vue";
import { watch } from "@vue/runtime-core";

export default {
  name: "TabWrapper",
  emits: ["selectedTab"],
  props: ["priorityLoopTab", "activeTab", "webtoonDisable"],
  setup(props, { slots, emit }) {
    const tabTitles = ref();
    if (props.priorityLoopTab) {
      const children = ref(
        slots.default().map((item) => {
          return item.children?.map((tab) => tab.props?.title);
        })
      );
      tabTitles.value = children.value[0].map((tab) => tab);
    } else {
      tabTitles.value = slots.default().map((tab) => tab.props?.title);
    }

    // console.log(tabTitles.value);

    // tabTitles.value = tabTitles.value.filter(function (element) {
    //   return element !== undefined;
    // });

    const selectedTitle = ref("");

    if (props.activeTab) {
      selectedTitle.value = props.activeTab;
    } else {
      selectedTitle.value = tabTitles.value[0];
    }

    watch(
      () => props.activeTab,
      function () {
        if (props.activeTab) {
          selectedTitle.value = props.activeTab;
        } else {
          selectedTitle.value = tabTitles.value[0];
        }
      }
    );

    const selectedTab = (title) => {
      selectedTitle.value = title;
      emit("selectedTab", title);
    };
    provide("selectedTitle", selectedTitle);

    return {
      tabTitles,
      selectedTitle,
      selectedTab,
    };
  },
};
</script>
