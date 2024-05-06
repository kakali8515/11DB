<template>
    <section class="tvshow-episodes-banner" :style="{ backgroundImage: 'url(' + bannerInfo.background_image + ')' }">
        <div class="container">
            <div class="banner-content">
                
                <figure>
                    <img v-if="bannerInfo.imgUrl?.includes('https')" :src="bannerInfo.imgUrl" alt="..." />
                    <img v-else src="@/assets/images/no-image-view.png" alt="" />
                </figure>
                <div class="left-content">
                    <!-- <h3>Yumi’s Cells<span>Season 1</span></h3> -->
                    <slot />
                    <router-link to @click="$router.push({ name: bannerInfo.link, params:{id: bannerInfo.id} })"><img src="@/assets/icons/left-arrow-gray.svg" alt="leftimg">{{ $t("bannerCardTwo.goToMain") }}</router-link>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        name: 'BannerCardTwo',
        props: {
           bannerInfo: Object
        }
    }
</script>
