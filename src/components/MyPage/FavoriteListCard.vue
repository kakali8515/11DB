<template>
  <div
    v-if="props.favorite?.poster_image != ''"
    class="comm-pic"
    @click="$emit('redirection', props.favorite)"
  >
    <figure>
      <img :src="props.favorite?.poster_image" alt="" />
    </figure>
  </div>
  <div v-else class="comm-pic" @click="$emit('redirection', props.favorite)">
    <figure>
      <img src="@/assets/images/no-image-view.png" alt="" />
    </figure>
  </div>
  <div
    class="comm-txt"
    @click="props.favorite ? $emit('redirection', props.favorite) : ''"
  >
    <div class="comm-txt-top">
      <h4 class="c-hdr">
        <a>{{ props.favorite?.title_name }}</a>
      </h4>
      <div class="right">
        <div class="date no-mr">
          <span
            >{{ props.favorite?.date_1 }}~{{ props.favorite?.date_2 }}
          </span>
        </div>
      </div>
    </div>
    <ul class="innr-list" v-for="(item, index) in props.favorite?.work_list">
      <li>{{ item.title_name }}</li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  favorite: Object,
});
const emit = defineEmits(["redirection"]);
</script>
