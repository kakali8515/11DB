<template>
    <div class="lists episode-list tab-scroll" v-if="episode_list.length > 0">
        <div class="outerside">
            <ImageTextCard v-for="(episode, i) in episode_list" :key="i" :episodeList="episode"
                @click="routeNavigation(episode.id)" />
        </div>
        <router-link to class="more-content" @click="routeNavigation()">
            <a href="#" class="more-content more-ct">
                <img src="@/assets/icons/right-arrow-solid.svg" alt="more" class="white-image">
                <img src="@/assets/icons/solid-right-arrow.svg" alt="more" class="red-image">
            </a>
        </router-link>
    </div>
    <div class="lists no-data-wrapper tab-scroll mb-0" v-else>
    <p>{{ $t("searchResults.noData") }}</p>
  </div>
</template>


<script>
import ImageTextCard from '@/components/ImageTextCard.vue';
export default {
    name: "EpisodeSection",
    components: { ImageTextCard },
    props: {
        episode_list: Array,
        season_id: Number
    },
    methods: {
        routeNavigation(episode_id) {
            if (episode_id) {
                this.$emit('episodeid', episode_id);
            }
            this.$emit('navigation');
        }
    }
}
</script>
