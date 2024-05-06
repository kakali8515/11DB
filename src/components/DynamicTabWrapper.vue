<template>
  <div class="tabs">
    <div class="tabs-otr">
      <ul v-if="multiple" class="tabs-header">
        <li
          v-for="title in tabTitles"
          :key="title"
          :class="selectedTitleList.includes(title) ? 'active' : ''"
          @click="selectTitle(title)"
        >
          {{ title }}
        </li>
      </ul>
      <ul v-else class="tabs-header">
        <li
          v-for="title in tabTitles"
          :key="title.key"
          :class="{ active: title.key == selectedTitleId }"
          @click="selectTitleId(title.key)"
        >
          {{ title.title }}
        </li>
      </ul>
    </div>
    <slot />
  </div>
</template>

<script>
import { ref, provide, computed } from "vue";

export default {
  props: ["multiple", "selectedTitleList","seasonId"],
  setup(props, { slots }) {
    if (props.multiple) {
      const children = computed(() => {
        return slots.default().map((item) => {
          return item.children?.map((tab) => tab.props?.title);
        });
      });
      const tabTitles = computed(() => {
        return children.value[0].map((tab) => tab);
      });
      const selectedTitle = computed(() => {
        return tabTitles.value[0];
      });
      provide("selectedTitle", selectedTitle);
      return {
        tabTitles,
        selectedTitle,
      };
    } else {
      // const children = ref(
      //   slots.default().map((item) => {
      //     return item.children?.map((tab) => tab.props?.title);
      //   })
      // );
      // const tabTitles = ref(children.value[0].map((tab) => tab));
      // const selectedTitle = ref(tabTitles.value[0]);
      // provide("selectedTitle", selectedTitle);

      const children1 = computed(() => {
        return slots.default().map((item) => {
          return item.children?.map((tab) => tab.props);
        });
      });
      const tabTitles = computed(() => {
        return children1.value[0].map((tab) => tab);
      });

      // for season
      const titleId = computed(() => {
        return slots.default().map((item) => {
          return item.children?.map((tab) => tab.props?.key);
        });
      });
      const tabTitlesId = computed(() => {
        return titleId.value[0].map((tab) => tab);
      });
      const selectedTitleId = computed(() => {
        if (props.seasonId) {
          return props.seasonId;
        } else {
          return tabTitlesId.value[0];
        }
      });
      provide("selectedTitleId", selectedTitleId);
      return {
        tabTitles,
        selectedTitleId,
      };
    }
  },
  methods: {
    selectTitle(title) {
      this.$emit("getResponseTitle", title);
    },
    selectTitleId(id) {
      this.$emit("getResponseTitle", id);
    },
  },
};
</script>
