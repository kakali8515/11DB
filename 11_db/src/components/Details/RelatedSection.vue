<template>
    <div class="lists tab-scroll" v-if="related_articles?.length > 0">
        <div class="outerside">
            <CardOne v-for="(item, i) in related_articles" :key="i" :articles="item" />
        </div>
        <a :href="related_articles_details_url" target="_blank" class="more-content more-ct">
            <img src="@/assets/icons/right-arrow-solid.svg" alt="more" class="white-image">
            <img src="@/assets/icons/solid-right-arrow.svg" alt="more" class="red-image">
        </a>
    </div>
    <!-- <div class="no-data-wrapper" v-else>
    <p>{{ $t("searchResults.noData") }}</p>
  </div> -->
</template>


<script>
    import CardOne from "@/components/CardOne.vue";
    export default {
        name: 'RelatedSection',
        components: {
            CardOne,
        },
        props : {
            related_articles: Array,
            related_articles_details_url: String,
        }
    }
</script>