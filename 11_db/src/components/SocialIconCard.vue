<template>
    <ul class="social-icon-list">
        <li v-if="instagramLink">
            <a @click="onClick(instagramLink)">
                <img src="@/assets/icons/instagram-border-blk.svg" class="dark-th" alt="" />
                <img src="@/assets/icons/facebook-blk.svg" class="light-th" alt="" />
            </a>
        </li>
        <li v-if="facebookLink">
            <a @click="onClick(facebookLink)">
                <img src="@/assets/icons/fb-border-blk.svg" class="dark-th" alt="" />
                <img src="@/assets/icons/instagram-blk.svg" class="light-th" alt="" />
            </a>
        </li>
        <li v-if="twitterLink">
            <a @click="onClick(twitterLink)">
                <img src="@/assets/icons/twitter-border.svg" class="dark-th" alt="" />
                <img src="@/assets/icons/twitter-border-white.svg" class="light-th" alt="" />
            </a>
        </li>
    </ul>
</template>


<script>
    export default {
        name: 'SocialIconCard',
        props:{
            facebookLink: String,
            instagramLink: String,
            twitterLink: String
        },
        methods:{
            onClick(url){
                window.location.href=url;
            }
        }
    }
</script>

