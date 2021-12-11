<template>
    <div>
  <b-button @click="openModal(restau.id)" variant="warning" size="sm" class="mt-3">View visit</b-button>

  <b-modal :ref="'modal-'+restau.id" :id="'modal-'+restau.id" 
  title="Visit information"
  header-bg-variant="dark"
  header-text-variant="light"
  body-bg-variant="light"
  body-text-variant="dark"
  hide-footer
  >
   <div>Date of your visit:</div>
                 <b-form-datepicker readonly id="example-datepicker" :value="restau.date" class="mb-2"></b-form-datepicker>
                <div>Your comment:</div>
                <b-form-textarea
                readonly
                :value="restau.comment"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
    ></b-form-textarea>
                <div>
                  <label for="rating">Your rate:</label>
                  <b-form-rating readonly :value="restau.rating"></b-form-rating>
                </div>
  </b-modal>
</div>

</template>
<script>

export default {
  name: "Visit",
  props: ["restau"],
  methods: {
    openModal: function (id) {
      this.$refs['modal-'+id].show();
    }
    
  }
};
</script>
