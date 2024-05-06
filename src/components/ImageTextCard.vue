<template>
    <a class="list-content">
        <div class="list-img">
            <img v-if="episodeList.image" :src="episodeList.image" :alt="episodeList.image">
            <img v-else src="@/assets/images/no-image-view.png" alt="" />
            <span class="link-tag" v-if="episodeList.url"><img src="@/assets/icons/icon-link.svg" alt="" /></span>
        </div>
        <h3 :title="episodeList.name">{{ episodeList.name }}</h3>
        <p class="p-txt">{{ dateformat(episodeList.release_date) }}</p>

    </a>
</template>


<script>
import { dateformat } from "@/mixins/CommonFunctions.js";
export default {
    name: 'ImageTextCard',
    props: {
        episodeList: {
            type: Object,
        }
    },
    methods: {
        dateformat
    }
}
</script>
