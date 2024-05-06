<template>
  <v-autocomplete
    class="custom-select-dropdown"
    :class="isError ? 'error-border' : ''"
    clearable
    :label="labelItem"
    :items="searchTitleListItem"
    :item-title="searchtitle"
    :item-value="searchvalue"
    v-model="search_type"
    @update:modelValue="handleDropdown"
    :eager="true"
    @keydown="handleInput($event)"
    id="test"
  ></v-autocomplete>
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
    "labelItem",
  ],
  methods: {
    handleDropdown(modelData) {
      this.$emit("dropdownValue", modelData);
    },
    handleInput(e) {
      if (e.key === "Backspace" || e.key === "Delete") {
        this.$emit("dropdownValue", null);
      }
    },
  },
  mounted() {
    this.scrollHandler = () => {
      var element = document.querySelectorAll("#test");
      element.forEach((el) => {
        el.blur();
      });
    };
    window.addEventListener("scroll", this.scrollHandler);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
};
</script>
<style>
.error-border > .v-input__control {
  border: 1px solid #db5857 !important;
}
</style>
