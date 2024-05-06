<template>
  <div class="left-image cursor-pointer" @click="navigateToDetails(comment)">
    <img v-if="comment.feed_category == 'famous_line' &&
      comment.feed_people_image?.includes('https')
      " :src="comment.feed_people_image" alt="pic" />
    <img v-else-if="(comment.feed_category != 'famous_line') && comment.feed_image?.includes('https')"
      :src="comment.feed_image" alt="" />
    <img v-else src="@/assets/images/no-image-view.png" alt="" />
  </div>
  <div class="right-content">
    <span class="comment" v-if="comment.feed_category == 'comment'">{{
      $t("communityCard.comments")
    }}</span>
    <span class="comment" v-if="comment.feed_category == 'famous_line'">{{
      $t("communityCard.famousLines")
    }}</span>
    <span class="comment" v-if="comment.feed_category == 'trivia'">{{
      $t("communityCard.trivia")
    }}</span>
    <span class="comment" v-if="comment.feed_category == 'goofs'">{{
      $t("communityCard.goofs")
    }}</span>
    <div class="comment-name">
      <h3 v-if="comment.feed_category === 'famous_line'">
        <span class="cursor-pointer" @click="navigateToDetails(comment)">{{
          comment.feed_people_character +
          (comment.feed_season_number && comment.feed_title_type == 'webtoons' ? " (" + $t("season.season") + " " +
            comment.feed_season_number + ")" : ` (${comment.feed_people_name})`) }}</span>
        <span class="famous-text cursor-pointer" @click="navigateToDetails(comment, true)">{{ comment.feed_title }}</span>
      </h3>
      <h3 class="cursor-pointer" v-else @click="navigateToDetails(comment)">{{ comment.feed_title +
        (comment.feed_season_number ? " (" + $t("season.season") + " " +
          comment.feed_season_number + ")" : '') }}</h3>
      <p>
        {{ dateformat(comment.feed_time, "ll", "") }}
        <span>{{ getDateformat(comment.feed_time, "time") }}</span>
      </p>
    </div>
    <p class="cursor-pointer" @click="navigateToDetails(comment, true, true)">{{ comment.feed_details }}</p>
    <div class="user-name">
      <img v-if="comment.feed_user_image" :src="comment.feed_user_image" alt="pic" />
      <img v-else src="@/assets/images/no-image-view.png" alt="" />
      <p>{{ comment.feed_user_name }}</p>
    </div>
  </div>
  <div class="new-cast-modal">
    <PopUpModal :isModal="isCharacterModal">
      <template v-slot:header>
        <h1>{{ $t("adminAward.character") + " " + $t("credit.information") }}</h1>
        <button @click="isCharacterModal = false">
          <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
        </button>
      </template>
      <template v-slot:body>
        <div class="cast-details">
          <div class="cast-left-profile">
            <img v-if="comment?.feed_people_image.includes('https')" :src="comment?.feed_people_image" alt=""
              class="cast-img" />
            <img v-else src="@/assets/images/no-image-view.png" class="cast-img" />
          </div>

          <div class="right">
            <div class="form-grp">
              <label for="">{{ $t("credit.characterName") }}</label>
              <input type="text" :value="comment?.feed_people_character" readonly />
            </div>
            <div class="form-grp">
              <label for="">{{ $t("addNewWebtoonForm.charDesc") }}</label>
              <textarea class="form-control" readonly>{{ comment?.feed_description }}</textarea>
            </div>
          </div>
        </div>
      </template>
    </PopUpModal>
  </div>
</template>

<script>
import { dateformat } from "../mixins/commonFunctions";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
export default {
  name: "Comments",
  components: {
    PopUpModal
  },
  props: {
    comment: Object,
  },
  data() {
    return {
      isCharacterModal: false
    }
  },
  methods: {
    // date format
    getDateformat(value, type) {
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
    },
    dateformat,
    navigateToDetails(comment, type, feed) {
      if (comment.feed_title_type == "tv" && (comment.feed_category != 'famous_line' || type)) {
        this.$router.push({
          name: 'TvShowsDetails',
          params: { id: comment.commentable_id, itemActive: feed ? comment.feed_category : '' },
        });
      } else if (comment.feed_title_type == "movie" && (comment.feed_category != 'famous_line' || type)) {
        this.$router.push({
          name: 'MoviesDetails',
          params: { id: comment.commentable_id, itemActive: feed ? comment.feed_category : '' },
        });
      } else if (comment.feed_title_type == "webtoons" && (comment.feed_category != 'famous_line' || type)) {
        this.$router.push({
          name: 'WebtoonsDetail',
          params: { id: comment.commentable_id, itemActive: feed ? comment.feed_category : '' },
        });
      } else {
        if (comment.feed_people_id) {
          this.$router.push({
            name: 'PeopleDetails',
            params: { id: comment.feed_people_id },
          });
        } else {
          this.isCharacterModal = true;
        }
      }
    }
  },
};
</script>
