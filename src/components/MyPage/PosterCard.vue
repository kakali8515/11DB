<template>
  <a @click="$router.push(RedirectLink)" class="image-innr">
    <figure class="hgt">
      <img v-if="poster.link?.includes('https') || poster.poster_image_link?.includes('https')" @click="openImage(poster)"
        :src="poster.link || poster.poster_image_link" :alt="(poster.link || poster.poster_image_link)" />
      <img v-else src="@/assets/images/no-image-view.png" />
    </figure>
    <slot />
  </a>
  <div class="new-cast-modal add-img-modal new-media-modal poster-modal" v-show="isImageModal">
    <PopUpModal :isModal="isImageModal">
      <template v-slot:header>
        <h1>{{ $t("myPage.imageCard.imagePreview") }}</h1>
        <button @click="isImageModal = false">
          <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
        </button>
      </template>
      <template v-slot:body>
        <div class="modal-img-area"><img :src="selectedUrl" :alt="selectedUrl" /></div>
      </template>
    </PopUpModal>
  </div>
</template>


<script>
import PopUpModal from "@/components/Modals/PopUpModal.vue";
export default {
  name: "PosterCard",
  props: {
    RedirectLink: String,
    poster: Object,
  },
  components: {
    PopUpModal,
  },
  data() {
    return {
      isImageModal: false,
      selectedUrl: ''
    };
  },
  methods: {
    // image preview
    openImage(item) {
      this.isImageModal = true;
      this.selectedUrl = item.link || item.poster_image_link;
    },
  }
};
</script>