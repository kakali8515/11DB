<template>
  <div class="article-otr" v-for="(item, key) in article" :key="key">
    <NewsCard :article="item" />
  </div>
  <a class="more-article-btn" :href="related_articles_details_url" target="_blank">{{ $t("relatedArticles.morePlus") }}</a>
</template>

<script>
import NewsCard from "@/components/NewsCard.vue";
export default {
  name: "RelatedArticle",
  components: { NewsCard },
  props: {
    article: Array,
    related_articles_details_url: String,
  },
  methods: {
    moreArticles() {
      window.open(
        "https://zapzee.net/",
        "_blank" // <- This is what makes it open in a new window.
      );
    },
  },
};
</script>
