<template>
  <div class="tab-content" v-if="seasonId" v-show="seasonId == selectedTitleId">
    <slot />
  </div>
  <div class="tab-content" v-else v-show="title == selectedTitle">
    <slot />
  </div>
</template>
<script>
import { inject } from "vue";

export default {
  name: "DynamicTabs",
  props: ["title", "seasonId"],
  setup(props) {
    if (props.seasonId) {
      const selectedTitleId = inject("selectedTitleId");
      return {
        selectedTitleId,
      };
    } else {
      const selectedTitle = inject("selectedTitle");
      return {
        selectedTitle,
      };
    }
  },
};
</script>
