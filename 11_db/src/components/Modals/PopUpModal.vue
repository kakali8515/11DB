<template>
  <transition name="fade">
    <div v-if="isModal" class="modal-backdrop"></div>
  </transition>
  <transition name="pop">
    <div v-if="isModal" class="modal" role="dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>

        <section class="modal-body" id="modalBody">
          <slot name="body"></slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isModal: Boolean,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped></style>
