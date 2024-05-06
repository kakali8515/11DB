<template>
  <div class="comm-pic" @click="$emit('redirection', props.favorite)">
    <figure v-if="props.favorite?.poster_image != ''">
      <img :src="props.favorite?.poster_image" alt="" />
    </figure>
    <figure v-else>
      <img src="@/assets/images/no-image-view.png" alt="" />
    </figure>
  </div>

  <div class="comm-txt">
    <div class="comm-txt-top">
      <h4 class="c-hdr" @click="$emit('redirection', props.favorite)">
        <a>{{ props.favorite?.title_name }}</a>
      </h4>
      <div class="right">
        <div class="date no-mr">
          <span
            >{{ dateformat(props.favorite?.date_1, "ll", "") }} ~
            {{ dateformat(props.favorite?.date_2, "ll", "") }}
          </span>
        </div>
      </div>
    </div>
    <p
      v-if="
        props.favorite.favourable_type == 'title' ||
        props.favorite.favourable_type == 'award'
      "
      @click="$emit('redirection', props.favorite)"
    >
      {{ props.favorite?.summary }}
    </p>
    <ul
      v-else
      class="innr-list"
      v-for="(item, index) in props.favorite?.work_list"
      @click="$emit('redirection', props.favorite)"
    >
      <li>{{ item.title_name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { dateformat } from "@/mixins/CommonFunctions.js";
const props = defineProps({
  favorite: Object,
});
const emit = defineEmits(["redirection"]);
</script>
