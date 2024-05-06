<template>
  <div class="comm-pic cursor-pointer" @click="
    props.type != 'famous_line'
      ? $emit('redirection', props.communication)
      : props.communication?.list_type == 'people'
        ? $emit('redirectWork', props.communication)
        : $emit('redirectPeople', props.communication)
    ">
    <figure v-if="props.communication?.poster_image">
      <img :src="props.communication?.poster_image" alt="" />
    </figure>
    <figure v-else>
      <img src="@/assets/images/no-image-view.png" alt="" />
    </figure>
  </div>

  <div class="comm-txt">
    <div class="comm-txt-top">
      <h4 class="c-hdr cursor-pointer" v-if="props.type != 'famous_line'"
        @click="$emit('redirection', props.communication)">
        <a v-if="props.communication.list_type == 'people'">{{
          props.communication?.person_name
        }}</a>
        <a v-else @click="$emit('redirection', props.communication)">{{
          props.communication?.title_name
        }}</a>
      </h4>
      <h4 v-else class="c-hdr cursor-pointer">
        <a @click="$emit('redirectPeople', props.communication)">{{
          props.communication?.person_name
        }}</a>
        <span @click="$emit('redirectWork', props.communication)">{{
          props.communication?.title_name
        }}</span>
      </h4>
      <div class="right">
        <div class="date">
          <span>{{
            dateformat(props.communication.posted_date, "ll", "")
          }}</span>
          <span>
            {{ getDateformat(props.communication.posted_date, "time") }}</span>
        </div>
        <a class="delete pt-0" @click="$emit('delete', props.communication.id)">
          <img src="@/assets/icons/delete.svg" class="dark-th" alt="" />
          <img src="@/assets/icons/delete-blk.svg" class="light-th" alt="" />
        </a>
      </div>
    </div>
    <div class="comment-desc">
      <!-- <p >
        {{ props.communication?.post_text }}
      </p> -->
      <p v-if="props.communication?.post_text.length > 370 &&
        !props.communication?.readMore
        ">
        <span class="cursor-pointer" @click="navigateToDetails(props.communication, props.type, true)">{{
          props.communication?.post_text.substring(0, 370) +
          "... " }}</span>
        <span class="community-text cursor-pointer" @click="$emit('ReadMore', props.communication)">{{
          $t("display.ReadMore") }}</span>
      </p>
      <p v-if="props.communication.readMore ||
        props.communication?.post_text.length < 370
        ">
        <span class="cursor-pointer" @click="navigateToDetails(props.communication, props.type, true)">{{
          props.communication?.post_text + " " }}
        </span>
        <span class="community-text cursor-pointer" v-if="props.communication.readMore"
          @click="$emit('ReadMore', props.communication)">{{ $t("display.Hide") }}</span>
      </p>
      <div class="comment-pic" v-if="props.communication.post_upload_image">
        <img :src="props.communication.post_upload_image" />
      </div>
    </div>

    <h5 v-if="props.communication?.replied_to">
      {{ $t("myPage.settings.repliedTo") }}
      <span>{{ props.communication.replied_to }}</span>
    </h5>
    <span class="like" v-if="props.type != 'famous_line'"><img src="@/assets/icons/like.svg" alt="" />
      {{
        props.communication?.post_liked ? props.communication.post_liked : 0
      }}</span>
  </div>
</template>

<script setup>
import { dateformat } from "@/mixins/CommonFunctions.js";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  communication: Object,
  type: String,
});
const emit = defineEmits([
  "delete",
  "redirection",
  "ReadMore",
  "redirectPeople",
  "redirectWork",
]);
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

const navigateToDetails = (comment, type, feed) => {
  if (comment.list_type == "tv") {
    router.push({
      name: 'TvShowsDetails',
      params: { id: comment.commentable_id, itemActive: feed ? type : '' },
    });
  } else if (comment.list_type == "movie") {
    router.push({
      name: 'MoviesDetails',
      params: { id: comment.commentable_id, itemActive: feed ? type : '' },
    });
  } else if (comment.list_type == "webtoons") {
    router.push({
      name: 'WebtoonsDetail',
      params: { id: comment.commentable_id, itemActive: feed ? type : '' },
    });
  }
  else if (comment.list_type == "people") {
    router.push({
      name: 'PeopleDetails',
      params: { id: comment.commentable_id, list_type: 'people', itemActive: feed ? type : '' },
    });
  }

}
</script>
