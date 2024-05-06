<template>
  <div>
    <div
      class="comm-pic cursor-pointer"
      v-if="props.communication?.poster_image"
      @click="$emit('redirection', props.communication)"
    >
      <figure>
        <img :src="props.communication?.poster_image" alt="" />
      </figure>
    </div>
    <div
      v-else
      class="comm-pic"
      @click="$emit('redirection', props.communication)"
    >
      <figure>
        <img src="@/assets/images/no-image-view.png" alt="" />
      </figure>
    </div>
    <div class="comm-txt">
      <div class="comm-txt-top">
        <h4 class="c-hdr" @click="$emit('redirection', props.communication)">
          <a
            >{{ props.communication?.person_name }}
            <span>{{ props.communication?.title_name }}</span></a
          >
        </h4>
        <div class="right">
          <div class="date">
            <span>{{
              dateformat(props.communication.posted_date, "ll", "")
            }}</span>
            <span>{{
              getDateformat(props.communication.posted_date, "time")
            }}</span>
          </div>
          <a
            href="#"
            class="delete pt-0"
            @click="$emit('delete', props.communication.id)"
          >
            <img src="@/assets/icons/delete.svg" class="dark-th" alt="" />
            <img src="@/assets/icons/delete-blk.svg" class="light-th" alt="" />
          </a>
        </div>
      </div>
      <p @click="$emit('redirection', props.communication)">
        {{ props.communication?.post_text }}
      </p>
      <h5 v-if="props.communication?.replied_to">
        replied to <span>{{ props.communication.replied_to }}</span>
      </h5>
    </div>
  </div>
</template>

<script setup>
import { dateformat } from "@/mixins/CommonFunctions.js";
const props = defineProps({
  communication: Object,
});
const emit = defineEmits(["delete", "redirection"]);
// date format
const getDateformat = (value, type) => {
  if (type == "date") {
    return dateformat(value, "MMM DD YYYY");
  }
  if (type == "time") {
    return new Date(value).toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};
</script>
