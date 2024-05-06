<template>
  <a class="list-content" :href="articles?.slug_name || articles?.slug" target="_blank" href="javascript:void(0)">
    <div class="list-img">
      <template v-if="showImg">
      <img
        v-if="articles?.image || articles?.news_image"
        :src="articles.image || articles.news_image"
        alt="image" @error="(showImg = false)"
      />
      <img v-else src="@/assets/images/zapzee-default-image.png" alt="" />
    </template>
      <img v-else src="@/assets/images/zapzee-default-image.png" alt="" />
    </div>
    <span v-if="articles?.category || articles?.news_category">{{
      articles?.category || articles?.news_category
    }}</span>
    <h3 v-if="articles?.title || articles?.news_title" v-html="articles?.title || articles?.news_title"></h3>
    <p v-if="articles?.short_descriptions" class="p-txt" v-html="articles?.short_descriptions">
    </p>
    <p v-if="articles?.news_creators" class="p-txt">
      {{ articles?.news_creators }}
    </p>
    <div class="news-date">
      <p v-if="articles?.publish_date || articles?.news_date">
        {{ dateformat(articles?.publish_date) || dateformat(articles?.news_date) }}
      </p>
    </div>
  </a>
</template>
<script>
import { dateformat } from "@/mixins/CommonFunctions.js";
export default {
  name: "CardOne",
  props: {
    articles: Object,
  },
  data() {
    return {
      showImg: true,
    }
  },
  mounted() {
    this.dateformat();
  },
  methods: {
    dateformat,
  }
};
</script>