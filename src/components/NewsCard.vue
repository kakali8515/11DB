<template>
  <div class="article-innr">
    <a :href="article?.slug" target="_blank" class="article-pic" v-if="showImg">
      <img @error="showImg = false" :src="article?.image" :alt="article?.creator_name" />
    </a>
    <a :href="article?.slug" target="_blank" class="article-pic" v-else>
      <img src="@/assets/images/zapzee-default-image.png" />
    </a>
    <h5>{{ article?.category }}</h5>
    <h4 class="cc-hdr">
      <a :href="article?.slug" target="_blank" v-html="article?.title"></a>
    </h4>
    <span class="cc-para" v-html="article?.short_descriptions"></span>
    <h6>{{ dateformat(article?.publish_date) }}</h6>
  </div>
</template>

<script>
import { dateformat } from "@/mixins/CommonFunctions.js";
export default {
  name: "NewsCard",
  props: {
    article: Object,
  },
  data() {
    return {
      showImg: true,
    }
  },
  methods: {
    dateformat,
  },
};
</script>
