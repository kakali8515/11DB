<template>
  <div
    v-if="props.rating?.poster_image != ''"
    class="comm-pic"
    @click="$emit('redirection', props.rating)"
  >
    <figure>
      <img :src="props.rating?.poster_image" alt="" />
    </figure>
  </div>
  <div
    v-else
    class="comm-pic"
    @click="props.rating ? $emit('redirection', props.rating) : ''"
  >
    <figure>
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
          <a>{{ props.rating?.title_name }}jjj{{ props.rating.rating }}</a>
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
          <span>{{ props.rating?.date_1 }} ~{{ props.rating?.date_2 }} </span>
        </div>
      </div>
    </div>
    <ul
      class="innr-list"
      v-for="(item, index) in props.rating?.work_list"
      :key="index"
    >
      <li>{{ item.title_name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { convertFloat } from "@/mixins/CommonValidation.js";

const props = defineProps({
  rating: Object,
});
const emit = defineEmits(["redirection"]);

onMounted(() => {
  convertFloat();
});
</script>
