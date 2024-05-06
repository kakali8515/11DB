<template>
  <v-select class="custom-select-dropdown" :class="isError ? 'error-border' : ''" v-model="search_type" :eager="false"
    :items="searchTitleListItem" :item-title="searchtitle" :item-value="searchvalue"
    @update:modelValue="handleDropdown"></v-select>
</template>
<script>
export default {
  name: "Dropdown",
  props: [
    "search_type",
    "searchTitleListItem",
    "searchtitle",
    "searchvalue",
    "isError",
  ],
  mounted() {
    this.scrollHandler = () => {
      document.body.click();
    };
    window.addEventListener('scroll', this.scrollHandler);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
  methods: {
    handleDropdown(modelData) {
      this.$emit("dropdownValue", modelData);
    },
  },
};
</script>
<style>
/* .error-border > .v-input__control {
  border: 1px solid #db5857 !important;
} */
</style>
