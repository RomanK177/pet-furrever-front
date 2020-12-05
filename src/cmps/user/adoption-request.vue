
<template>
  <section class="adoption-request">
    <p class="request-togle" @click="toggleListShow">
      Adoption requests: All({{ requests.length }}) Pending: ({{
        amountOfRequests
      }})
    </p>

    <ul class="adoption-request-list" v-if="requests && showList">
      <li>
        <div class="requests-header">
          <span class="requsted-by">From</span>
          <span class="requsted-pet">Pet to adopt</span>
          <span class="requsted-at">Date</span>
          <span class="requsted-status">Status</span>
        </div>
      </li>

      <li v-for="(request, idx) in requests" :key="idx">
        <adoption-request-preview
          @addMessage="emitAddMessage"
          @updateAdoption="emitUpdateAdoptionRequest"
          @removeAdoption="emitRemoveAdoptionRequest"
          :request="request"
          :user="user"
        />
      </li>
    </ul>
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
      console.log("made it to adoption-request", adoption);
      this.$emit("updateAdoption", adoption);
      // this.$emit("updatePet", pet);
    },
    emitAddMessage(adoptionId, message) {
      console.log("in adoption request", message, adoptionId);
      this.$emit("addMessage", adoptionId, message);
    },
    emitRemoveAdoptionRequest(adoption) {
      this.$emit("removeAdoption", adoption);
      console.log("deleted in request", adoption);
    },
    emitUpdatePet(pet) {
      console.log("pet", pet);
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
      console.log(activeRequests);
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