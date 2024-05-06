<template>
  <div :class="$route.query.episode_id == episodeList?.episode_id
    ? 'tv-content sm active_episode'
    : 'tv-content sm'
    " :id="`episode${episodeList?.episode_id}`">
    <figure class="episode-link-circle">
      <img v-if="episodeList?.episode_poster_image" :src="episodeList?.episode_poster_image"
        :alt="episodeList?.episode_poster_image" />
      <img v-else src="@/assets/images/no-image-view.png" />
      <span class="link-tag" v-if="episodeList?.url" @click="openNewPage(episodeList.url);"><img src="@/assets/icons/icon-link.svg" alt="" /></span>
    </figure>
    <div class="left-content" :class="showingFullText ? 'episode-more-description' : ''">
      <div class="tv-heading">
        <h3>{{ episodeList.episode_name }}</h3>
        <span>{{ dateformat(episodeList.episode_release_date) }} </span>
      </div>
      <p>{{ discription }}</p>
      <a v-if="text_length > limit_by" @click="getFormatText()">{{
        showingFullText
        ? $t("episodeList.minusClose")
        : $t("episodeList.plusMore")
      }}</a>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "@vue/runtime-core";
import {  dateformat } from "@/mixins/CommonFunctions.js";
export default {
  name: "EpisodeList",
  props: {
    episodeList: Object,
  },

  setup(props) {
    const showingFullText = ref(false);
    const discription = ref("");
    const limit_by = ref("1150");
    const text_length = ref("0");

    watch(
      () => props.episodeList,
      function (newVal, oldVal) {
        if (newVal && oldVal && newVal != oldVal) {
          formattedBody();
        }
      }
    );

    const formattedBody = () => {
      //if(props.episodeList.episode_description.length >= limit_by.value){
      showingFullText.value = false;
      discription.value = props.episodeList.episode_description;
      text_length.value = props.episodeList.episode_description.length;
      return;
      //}
    };

    const getFormatText = () => {
      showingFullText.value = !showingFullText.value;
      if (showingFullText.value == true) {
        discription.value = props.episodeList.episode_description;
        text_length.value = props.episodeList.episode_description.length;
        return;
      } else {
        discription.value = props.episodeList.episode_description;
        text_length.value = props.episodeList.episode_description.length;
        return;
      }
    };

    onMounted(() => {
      formattedBody();
      setTimeout(() => {
        const ele = document.getElementById(`episode${props.episodeList.episode_id}`);
        ele.classList.remove("active_episode");
      }, 4000);
    });

    const openNewPage = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
};

    return {
      formattedBody,
      showingFullText,
      discription,
      text_length,
      limit_by,
      getFormatText,
      openNewPage,
      dateformat
    };
  },
};
</script>

<!-- <style lang="scss" scoped>
.active_episode {
  box-shadow: 1px 2px 18px 0px rgba(195,45,44,0.31);
}
</style> -->
