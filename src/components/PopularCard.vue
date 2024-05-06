<template>
  <a @click="$router.push({ name: RedirectLink, params: { id: popular.id, pageTitle: popular.title } })"
    class="list-content" href="javascript:void(0)">
    <div class="list-img">
      <img v-if="popular.image?.includes('https')" :src="popular.image" :alt="popular.image" />
      <img v-else src="@/assets/images/no-image-view.png" alt="" />
    </div>
    <div class="pop-count">
      <span>
        <h3 :title="popular.title">{{ popular.title }}</h3>
        <div class="startxt">
          <div class="md-star">
            <template v-if="popular.rating > 0.0">
              <!-- integer -->
              <template v-if="convertFloat(popular.rating / 2) == false">
                <template v-for="i in 5" :key="i">
                  <img v-if="popular.rating >= i * 2" src="@/assets/icons/star.svg" alt="star" />
                  <img v-else src="@/assets/icons/outline-star.svg" alt="star" />
                </template>
              </template>
              <!-- integer -->
              <!-- float -->
              <template v-else>
                <img v-for="i in parseInt(popular.rating / 2)" :key="i" src="@/assets/icons/star.svg" alt="star" />
                <img src="@/assets/icons/half-star.svg" alt="star" />
                <img src="@/assets/icons/outline-star.svg" alt="star" v-for="i in 4 - parseInt(popular.rating / 2)"
                  :key="i" />
              </template>
              <!-- float -->
            </template>
            <template v-else>
              <img src="@/assets/icons/outline-star.svg" alt="star" v-for="i in 5" :key="i" />
            </template>
          </div>
          <span>{{ popular.rating ? popular.rating : "0.0" }}</span>
        </div>
      </span>
    </div>

    <div class="news-date">
      <p>
        {{ dateformat(popular.release_date) }}
        <span v-if="popular.episodes">67 episodes</span>
      </p>
    </div>
  </a>
</template>

<script>
import { convertFloat } from "@/mixins/CommonValidation.js";
import { dateformat } from "@/mixins/CommonFunctions.js";
export default {
  name: "PopularCard",
  props: {
    RedirectLink: String,
    popular: Object,
  },
  methods: {
    convertFloat,
    dateformat,
  },
};
</script>
