<template>
  <a @click="redirectLink ? $router.push({ name: redirectLink, params: { id: castList?.id, pageTitle: castList?.name } }) : isCharacterModal = true" class="image-innr"
    href="javascript:void(0)">
    <figure class="hgt">
      <img v-if="castList?.image.includes('https')" :src="castList?.image" alt="" />
      <img v-else src="@/assets/images/no-image-view.png" alt="" />
    </figure>
    <div class="cast-crew-info">
      <p :title="castList?.name">{{ castList?.name }}</p>
      <p class="sub-para">{{ castList?.designation }}</p>
    </div>

  </a>
  <div class="new-cast-modal" v-show="isCharacterModal">
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
            <img v-if="castList?.image.includes('https')" :src="castList?.image" alt="" class="cast-img" />
            <img v-else src="@/assets/images/no-image-view.png" class="cast-img" />
          </div>

          <div class="right">
            <div class="form-grp">
              <label for="">{{ $t("credit.characterName") }}</label>
              <input type="text" :value="castList?.name" readonly />
            </div>
            <div class="form-grp">
              <label for="">{{ $t("addNewWebtoonForm.charDesc") }}</label>
              <textarea class="form-control" readonly>{{ castList?.description }}</textarea>
            </div>
          </div>
        </div>
      </template>
    </PopUpModal>
  </div>
</template>

<script>
import PopUpModal from "@/components/Modals/PopUpModal.vue";
export default {
  name: "CastCrewCard",
  components: {
    PopUpModal
  },
  props: {
    castList: {
      type: Object,
    },
    redirectLink: {
      type: String,
    },
  },
  data() {
    return {
      isCharacterModal: false
    }
  }
};
</script>
