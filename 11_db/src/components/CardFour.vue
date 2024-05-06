<template>
  <a @click="$router.push({ name: RedirectLink, params: { id: data.title_id, pageTitle: data.title_name } })"
    class="list-content" href="javascript:void(0)">
    <div class="list-img">
      <img v-if="data.poster_image?.includes('https')" :src="data.poster_image" :alt="data.poster_image" />
      <img v-else src="@/assets/images/no-image-view.png" alt="" />
    </div>
    <div class="pop-count">
      <span class="list-number" v-if="section == 'popular'">{{
        serial_no + 1
      }}</span>
      <span>
        <h3 :title="data.title_name">{{ data.title_name }}</h3>
        <template v-if="!webtoon_popular">
          <p v-if="section == 'newrelease'">
            <span v-for="(tag, i) in data.tags" :key="i">{{ tag }}</span>
          </p>
          <p v-else><span>{{ data.director_name }}</span></p>
        </template>
        <div class="startxt">
          <div class="md-star">
            <template v-if="data.rating > 0.0">
              <!-- integer -->
              <template v-if="convertFloat(data.rating / 2) == false">
                <template v-for="i in 5" :key="i">
                  <img v-if="data.rating >= i * 2" src="@/assets/icons/star.svg" alt="star" />
                  <img v-else src="@/assets/icons/outline-star.svg" alt="star" />
                </template>
              </template>
              <!-- integer -->
              <!-- float -->
              <template v-else>
                <img v-for="i in parseInt(data.rating / 2)" :key="i" src="@/assets/icons/star.svg" alt="star" />
                <img src="@/assets/icons/half-star.svg" alt="star" />
                <img src="@/assets/icons/outline-star.svg" alt="star" v-for="i in 4 - parseInt(data.rating / 2)"
                  :key="i" />
              </template>
              <!-- float -->
            </template>
            <template v-else>
              <img src="@/assets/icons/outline-star.svg" alt="star" v-for="i in 5" :key="i" />
            </template>
          </div>
          <span>{{ data.rating ? data.rating : "0.0" }}</span>
        </div>
      </span>
    </div>

    <div class="news-date" v-if="!webtoon_popular">
      <p v-if="type == 'webtoons'" class="newstatus">{{ $t(data.title_status) }}</p>
      <p>
        {{ type == 'movie' || type == 'tv' || data.title_status == 'completed' ? dateformat(data.release_date) :
          changeArray(data.weekly_telecast) }}
        <span v-if="(type == 'tv' || type == 'webtoons') && section == 'newrelease'">{{
          data.no_of_episodes ? `${data.no_of_episodes} ${$t("searchResults.searchRight.tvShowsDetails.episodes")}` : `0
          ${$t("searchResults.searchRight.tvShowsDetails.episodes")}`
        }}</span>
        <span v-else>{{ convertMinToHour(data.runtime) }}
        </span>
      </p>
    </div>
  </a>
</template>

<script>
import { convertMinToHour, convertFloat } from "@/mixins/CommonValidation.js";
import { dateformat } from "@/mixins/CommonFunctions.js";
export default {
  name: "CardFour",
  props: {
    data: Object,
    RedirectLink: String,
    type: String,
    section: String,
    serial_no: Number,
    webtoon_popular: String
  },
  methods: {
    convertMinToHour,
    convertFloat,
    dateformat,
    changeArray(wordsArr) {
      for (let i = 0; i < wordsArr.length; i++) {
        wordsArr[i] = wordsArr[i][0].toUpperCase() + wordsArr[i].substring(1);
        wordsArr[i] = wordsArr[i].substring(0, 3);
        wordsArr[i] = this.$t(wordsArr[i]);
      }
      return wordsArr.join(', ');
    }
  },
};
</script>
