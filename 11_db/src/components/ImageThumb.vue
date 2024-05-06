<template>
  <div
    class="thumbs"
    v-click-outside="() => ((show = false), (toggle = false))"
  >
    <div class="imgs-area" @click="show = !show">
      <img :src="image.image_path" alt="img" />
    </div>
    <div class="overlay" v-if="show"></div>
    <div class="optionmenu" v-if="show" :class="isEdit ? 'isDisabled' : ''">
      <span
        @click="toggle = !toggle"
        :class="isEdit ? 'pointer-events-none' : ''"
        ><img src="../assets/icons/ovel-icon.svg" alt="play"
      /></span>
      <div class="dropstxt" v-show="toggle">
        <p @click="removeItem">{{ $t("button.delete") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";
export default {
  name: "ImageThumb",
  components: {},
  props: {
    image: Object,
    isEdit: Boolean,
  },
  data() {
    return {
      show: false,
      toggle: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    removeItem() {
      this.$emit("removeItem", this.image);
      this.toggle = false;
      this.show = false;
    },
  },
};
</script>
