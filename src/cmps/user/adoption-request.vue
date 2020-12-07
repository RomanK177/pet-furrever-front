
<template>
  <section class="adoption-request">
    <p class="request-togle">
      All adoption requests: ({{ requests.length }}) <br />
      Pending: ({{ amountOfRequests }})
    </p>
    <section v-if="requests">
      <ul class="adoption-request-list requests-header">
        <li class="requsted-by">From</li>
        <li class="requsted-pet requsted-pet-header">Pet to adopt</li>
        <li class="requsted-at">Date</li>
        <li class="requsted-status requsted-status-header">Status</li>

        <li id="requsted-actions-header" clas="requsted-actions ">Actions</li>
        <li clas="requsted-lastBtns"></li>
      </ul>
      <adoption-request-preview
        v-for="(request, idx) in requests"
        :key="idx"
        @updateAdoption="emitUpdateAdoptionRequest"
        @removeAdoption="emitRemoveAdoptionRequest"
        :request="request"
        :user="user"
      />
    </section>
  </section>
</template>

<script>
import adoptionRequestPreview from "./adoption-request-preview.vue";
export default {
  props: {
    requests: Array,
    user: Object,
  },
  data() {
    return {
      showList: false,
      hideCancel: false,
      pendingRequests: [],
    };
  },
  methods: {
    toggleListShow() {
      this.showList = !this.showList;
    },
    togglePendingList() {
      const pendingRequests = this.requests.filter(
        (request) => request.status === "pending"
      );
      return pendingRequests;
    },
    emitUpdateAdoptionRequest(adoption) {
      this.$emit("updateAdoption", adoption);
      // this.$emit("updatePet", pet);
    },
    // emitAddMessage(adoptionId, message) {
    //   debugger
    //   this.$emit("addMessage", adoptionId, message);
    // },
    emitRemoveAdoptionRequest(adoption) {
      this.$emit("removeAdoption", adoption);
    },
    emitUpdatePet(pet) {
      this.$emit("updatePet", pet);
    },
    filteredRequests() {
      const pendingRequests = this.requests.filter(
        (request) => request.status === "pending"
      );
      this.pendingRequests = pendingRequests;
    },
  },
  computed: {
    allCancelled() {
      const areAllCancelled = this.requests.every(
        (request) => request.status === "cancelled"
      );
      this.user.userType === "adopter";

      if (areAllCancelled && this.user.userType === "adopter") return false;
      else return true;
      // this.hideCancel = areAllCancelled
    },
    amountOfRequests() {
      let counter = 0;
      this.requests.forEach((request) => {
        if (request.status !== "pending") counter++;
        return counter;
      });
      const activeRequests = this.requests.length - counter;
      return activeRequests;
    },
    isOwner() {
      if (this.user.userType === "owner") return true;
      else return false;
    },
    isAdopter() {
      if (this.user.userType === "adopter") return true;
      else return false;
    },
  },
  created() {
    // this.getAdoptionRequest
  },
  components: {
    adoptionRequestPreview,
  },
};
</script>