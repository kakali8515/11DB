<template>
  <div class="comm-pic" @click="$emit('redirection', props.rating)">
    <figure v-if="props.rating?.poster_image != ''">
      <img :src="props.rating?.poster_image" alt="" />
    </figure>
    <figure v-else>
      <img src="@/assets/images/no-image-view.png" alt="" />
    </figure>
  </div>
  <div
    class="comm-txt"
    @click="props.rating ? $emit('redirection', props.rating) : ''"
  >
    <div class="comm-txt-top">
      <div class="rating tab-rating-outer">
        <h4 class="c-hdr">
          <a>{{ props.rating?.title_name }}</a>
        </h4>
        <div class="tab-rating-star">
          <template v-if="props.rating.rating > 0.0">
            <!-- integer -->
            <template v-if="convertFloat(props.rating.rating / 2) == false">
              <template v-for="i in 5" :key="i">
                <img
                  v-if="props.rating.rating >= i * 2"
                  src="@/assets/icons/star.svg"
                  alt="star"
                />
                <img v-else src="@/assets/icons/outline-star.svg" alt="star" />
              </template>
            </template>
            <!-- integer -->
            <!-- float -->
            <template v-else>
              <img
                v-for="i in parseInt(props.rating.rating / 2)"
                :key="i"
                src="@/assets/icons/star.svg"
                alt="star"
              />
              <img src="@/assets/icons/half-star.svg" alt="star" />
              <img
                src="@/assets/icons/outline-star.svg"
                alt="star"
                v-for="i in 4 - parseInt(props.rating.rating / 2)"
                :key="i"
              />
            </template>
            <!-- float -->
          </template>
          <template v-else>
            <img
              src="@/assets/icons/outline-star.svg"
              alt="star"
              v-for="i in 5"
              :key="i"
            />
          </template>
        </div>
        <span>{{ props.rating.rating ? props.rating.rating : "0.0" }}</span>
      </div>
      <div class="right">
        <div class="date no-mr">
          <span
            >{{ dateformat(props.rating?.date_1, "ll", "") }}~{{
              dateformat(props.rating?.date_2, "ll", "")
            }}</span
          >
        </div>
      </div>
    </div>
    <p
      v-if="
        props.rating.favourable_type == 'title' ||
        props.rating.favourable_type == 'award'
      "
    >
      {{ props.rating?.summary }}
    </p>
    <ul
      class="innr-list"
      v-for="(item, index) in props.rating?.work_list"
      :key="index"
      v-else
    >
      <li>{{ item.title_name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { convertFloat } from "@/mixins/CommonValidation.js";
import { dateformat } from "@/mixins/CommonFunctions.js";
const props = defineProps({
  rating: Object,
});
const emit = defineEmits(["redirection"]);
onMounted(() => {
  convertFloat();
});
</script>
