<template>
  <div
    class="thumbs"
    v-click-outside="() => ((shows = false), (toggle = false))"
  >
    <div class="imgs-area" @click="shows = !shows">
      <img :src="poster.poster_path" alt="img" />
      <span class="defaults" v-if="poster.is_main_poster == 'y'"
        ><img src="../assets/icons/img-tags.svg"
      /></span>
    </div>
    <div class="overlay" v-if="shows"></div>
    <div class="optionmenu" v-if="shows" :class="isEdit ? 'isDisabled' : ''">
      <span @click="toggle = !toggle" :class="isEdit ? 'pointer-events-none' : ''"
        ><img src="../assets/icons/ovel-icon.svg" alt="play"
      /></span>
      <div class="dropstxt" v-show="toggle">
        <p @click="setMainPoster">{{ $t("videoThumb.setMainPoster") }}</p>
        <p @click="removeItem">{{ $t("button.delete") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";
export default {
  name: "PosterThumb",
  components: {},
  props: {
    poster: Object,
    isEdit: Boolean,
  },
  data() {
    return {
      shows: false,
      toggle: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    removeItem() {
      this.$emit("removeItem", this.poster);
      this.toggle = false;
      this.shows = false;
    },
    setMainPoster() {
      this.$emit("setPoster", this.poster);
      this.toggle = false;
      this.shows = false;
    },
  },
};
</script>