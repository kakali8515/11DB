<template>
    <div class="awards-lists">
        <div class="a-content">
            <h2 class="cursor-pointer"
                @click="$router.push({ name: 'AwardsDetail', params: { id: award.award_id, pageTitle: award.award_name } })">
                {{ award.award_name }}</h2>
            <figure class="cursor-pointer"
                @click="$router.push({ name: 'AwardsDetail', params: { id: award.award_id, pageTitle: award.award_name } })">
                <img v-if="award.award_image" :src="award.award_image" alt="award">
                <img v-else src="@/assets/images/no-image-view.png" alt="" />
            </figure>
            <ul>
                <li v-for="(nominee, i) in award.nominees" :key="i">
                    <span class="label-txt">{{ nominee.sector_name }}</span>
                    <p v-if="nominee.character_name">
                    <p :class="nominee.character_name ? 'cursor-pointer' : ''"
                        @click="nominee.character_name ? $router.push({ name: 'PeopleDetails', params: { id: nominee.character_id, pageTitle: nominee.character_name } }) : ''">
                        {{
                            nominee.character_name ?
                            nominee.character_name : '-' }}</p><span v-if="nominee.is_winner == 'y'"><img
                            src="@/assets/icons/award.svg" alt="award">{{ $t('award.Winner') }}</span>
                    </p>
                    <p v-else>
                    <p class="cursor-pointer"
                        @click="$router.push({ name: bannerInfo.link, params: { id: bannerInfo.id, pageTitle: title } })">{{
                            title }}</p><span v-if="nominee.is_winner == 'y'"><img src="@/assets/icons/award.svg" alt="award">{{
        $t('award.Winner') }}</span></p>
                </li>

            </ul>
            <!-- <a href="#" class="show-more">+ more</a>
            <a href="#" class="show-less">- less</a> -->
        </div>

    </div>
</template>


<script setup>
const props = defineProps({
    award: Object,
    title: String,
    bannerInfo: Object
});
</script>