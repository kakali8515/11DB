<template>
    <section class="tvshow-episodes-banner" style="background-image:url('../../../src/assets/images/tvbg.png');">
        <div class="container">
            <div class="banner-content">
                <figure>
                    <img src="@/assets/images/benedict-small.jpg" alt="yumi">
                </figure>
                <div class="left-content">
                    <h3>Benedict Cumberbatch</h3>
                    <a href="#"><img src="@/assets/icons/left-arrow-gray.svg" alt="leftimg">{{ $t("bannerCardTwo.goToMain") }}</a>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        name: 'InnerBanner',
    }
</script>