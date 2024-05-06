<template>
  <a>
    <figure @click="$router.push({ name: 'AwardsDetail', params: { id: award.id, pageTitle: award.award_name } })"><img
        v-if="award.poster_image" :src="award.poster_image" alt="award" />
      <img v-else src="@/assets/images/no-image-view.png" alt="" />
    </figure>
    <div class="award-right-content">
      <h3 @click="$router.push({ name: 'AwardsDetail', params: { id: award.id, pageTitle: award.award_name } })">{{
        award.award_name }}</h3>
      <div class="award-detail">
        <div class="inner">
          <span>{{ $t("adminAward.monthOfEvent") }}</span>
          <p>{{ $t(award.month_name) }}</p>
        </div>
        <div class="inner">
          <span>{{ $t("award.location") }}</span>
          <p v-if="award.country_name || award.city || award.place">{{ award.country_name }}<span
              v-if="award.country_name && award.city">,</span> {{ award.city }}<span
              v-if="award.city && award.place">,</span> {{ award.place }}</p>
          <p v-else>-</p>
        </div>
        <div class="inner">
          <span>{{ $t("award.website") }}</span>
          <p @click="navigate(award.website)" v-if="award.website">{{ award.website }}</p>
          <p class="no-website" v-else>-</p>
        </div>
      </div>
    </div>
  </a>
</template>


<script>
import { dateformat } from "@/mixins/CommonFunctions.js";
export default {
  name: "AwardsCard",
  props: {
    RedirectLink: String,
    award: Object
  },
  methods: {
    dateformat,
    navigate(route) {
      window.open(route, '_blank');
    }
  }
};
</script>