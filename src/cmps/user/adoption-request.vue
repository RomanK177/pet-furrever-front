
<template>
  <section class="adoption-request">
    <p class="request-togle" @click="toggleListShow">
      Adoption requests: All({{ requests.length }}) Pending: ({{
        amountOfRequests
      }})
    </p>
    <section v-if="requests && showList">
      <ul class="adoption-request-list requests-header flex">
        <li class="requsted-by">From</li>
        <li class="requsted-pet">Pet to adopt</li>
        <li class="requsted-at">Date</li>
        <li class="requsted-status">Status</li>
        <li>Actions</li>
      </ul>
      <adoption-request-preview
        v-for="(request, idx) in requests"
        :key="idx"
        @addMessage="emitAddMessage"
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
    emitAddMessage(adoptionId, message) {
      this.$emit("addMessage", adoptionId, message);
    },
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
      // console.log("areAllCancelled", areAllCancelled);
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