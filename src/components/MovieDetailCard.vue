<template>
    <div class="movie-detail" v-for="(name, i) in winner" :key="i">
        <figure class="prize-img cursor-pointer" @click="navigateToDetails(name.type, name.nominee_item_id, name.type == 'people' ? name.nominee_people_name :
            name.nominee_title_name)">
            <img v-if="name.poster_image" :src="name.poster_image" alt="award">
            <img v-else src="@/assets/images/no-image-view.png" alt="" />
        </figure>
        <div class="m-content" v-if="name.type != 'people'">
            <span>
                <figure><img src="@/assets/icons/trophy.svg" alt="trophy"></figure>
                <p>{{ $t('award.Winner') }}</p>
            </span>
            <h3 class="cursor-pointer" @click="navigateToDetails(name.type, name.nominee_item_id, name.nominee_title_name)">
                {{
                    name.nominee_title_name
                }}</h3>
            <p class="cursor-pointer"
                @click="navigateToDetails('people', name.nominee_people_id, name.nominee_people_name)">{{
                    name.nominee_people_name }}</p>
        </div>
        <div class="m-content" v-else>
            <span>
                <figure><img src="@/assets/icons/trophy.svg" alt="trophy"></figure>
                <p>{{ $t('award.Winner') }}</p>
            </span>
            <h3 class="cursor-pointer"
                @click="navigateToDetails(name.type, name.nominee_item_id, name.nominee_people_name)">{{
                    name.nominee_people_name }}</h3>
            <p class="cursor-pointer"
                @click="navigateToDetails(name.nominee_title_type, name.nominee_title_id, name.nominee_title_name)">{{
                    name.nominee_title_name }}</p>
        </div>

    </div>
    <div class="nominee-content" :class="winner.length == 0 ? 'nominee-gap' : ''">
        <h4>{{ $t('award.Nominees') }}</h4>
        <ul>
            <template v-for="(name, i) in nominee" :key="i">
                <li v-if="name.type != 'people'">
                    <p class="cursor-pointer"
                        @click="navigateToDetails(name.type, name.nominee_item_id, name.nominee_title_name)">{{
                            name.nominee_title_name }}</p><span class="cursor-pointer"
                        @click="navigateToDetails('people', name.nominee_people_id, name.nominee_people_name)">{{
                            name.nominee_people_name
                        }}</span>
                </li>
                <li v-else>
                    <p class="cursor-pointer"
                        @click="navigateToDetails(name.type, name.nominee_item_id, name.nominee_people_name)">{{
                            name.nominee_people_name }}</p><span class="cursor-pointer"
                        @click="navigateToDetails(name.nominee_title_type, name.nominee_title_id, name.nominee_title_name)">{{
                            name.nominee_title_name
                        }}</span>
                </li>
            </template>
        </ul>
    </div>
</template>


<script setup>
import { useRoute, useRouter } from "vue-router";
const props = defineProps({
    nominee: Array,
    winner: Array
});
const router = useRouter();

const navigateToDetails = (type, nominee_item_id, title) => {
    if (type == "tv") {
        router.push({
            name: 'TvShowsDetails',
            params: { id: nominee_item_id, pageTitle: title },
        });
    } else if (type == "movie") {
        router.push({
            name: 'MoviesDetails',
            params: { id: nominee_item_id, pageTitle: title },
        });
    } else if (type == "webtoons") {
        router.push({
            name: 'WebtoonsDetail',
            params: { id: nominee_item_id, pageTitle: title },
        });
    } else if (type == "people") {
        router.push({
            name: 'PeopleDetails',
            params: { id: nominee_item_id, pageTitle: title },
        });
    }
}
</script>