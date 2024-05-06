<template>
  <div class="image-innr">
    <a @click="openImage(image)">
      <img v-if="(image.image_link) || image.link.includes('https')" :src="(image.link || image.image_link)"
        :alt="(image.link || image.image_link)" />
      <img v-else src="@/assets/images/no-image-view.png" />
    </a>
  </div>

  <div class="new-cast-modal add-img-modal new-media-modal" v-show="isImageModal">
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
  name: "ImageCard",
  props: {
    image: Object,
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
      this.selectedUrl = item.link || item.image_link;
    },
  }
};
</script>