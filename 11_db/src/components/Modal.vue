<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :click-to-close="false"
  >
    <!-- <button class="modal__close" @click="close">
      <mdi-close></mdi-close>
      X
    </button> -->
    <span class="modal__title" :class="className" v-html="heading"></span>
    <div class="modal__content">
      <p v-if="bodyText">
        {{ bodyText }}
      </p>
      <p v-if="bodyText2">
        {{ bodyText2 }}
      </p>
      <div class="movies-details-sec" v-if="starRating">
        <div class="startxt">
          <div class="md-star">
            <template v-for="i in 5" :key="i">
            <img src="@/assets/icons/outline-star.svg" alt="star" />
          </template>
          </div>
        </div>
      </div>
    </div>
    <div class="modal__action">
      <button v-if="btnText2" class="btn orange-btn" @click="close">
        {{ btnText2 }}
      </button>
      <button v-if="btnText1" class="btn orange-btn" @click="confirm">
        {{ btnText1 }}
      </button>
    </div>
  </vue-final-modal>
</template>


<script>
export default {
  name: "Modal",
  props: [
    "heading",
    "bodyText",
    "bodyText2",
    "btnText1",
    "showModal",
    "btnText2",
    "starRating",
    "className"
  ],
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  border: 1px solid #e2e8f0;
  background: #fff;
  text-align: center;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
        
        <style scoped>
.dark-mode div:deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>