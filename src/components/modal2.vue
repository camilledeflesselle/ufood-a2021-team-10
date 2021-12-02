<!-- Pour remplacer les slots, faire <template v-slot:nomSlot></template> -->
<template>
  <div class="modal-backdrop">
    <div class="modal-container">
      <div class="modal-header">
        <slot name="m-header"> Default modal header </slot>
      </div>
      <div class="modal-body">
        <slot name="m-body"> Default modal body </slot>
      </div>
      <div class="modal-footer">
        <slot name="m-footer">
          Default modal footer
          <button type="button" class="close-button" @click="close">
            Close modal
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 40%;
  border-color: black;
}
/* .modal-header,
.modal-body {
  height: inherit;
  width: inherit;
} */
</style>
