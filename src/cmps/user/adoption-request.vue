
<template>
  <section class="adoption-request">
    <span class="request-togle" @click="toggleListShow"
      >Adoption requests: ({{ amountOfRequests }})</span
    >
    <ul class="adoption-request-list" v-if="requests && showList">
      <li>
        <div class="requests-header flex">
          <span class="requsted-id">Request Num</span>
          <span class="requsted-by">From</span>
          <span class="requsted-pet">Pet to adopt</span>
          <span class="requsted-at">Date</span>
          <span class="requsted-status">Status</span>
          <span v-if="isOwner" class="approve">Approve</span>
          <span v-if="isOwner" class="decline">Decline</span>
          <span v-if="isOwner" class="delete">Delete</span>
          <span v-if="isAdopter" class="decline">Cancel</span>

        </div>
      </li>
      <li class="flex" v-for="(request, idx) in requests" :key="idx">
        <adoption-request-preview
          @updateAdoption="emiUpdateAdoptionRequest"
          @removeAdoption="emitRemoveAdoptionRequest"
          :request="request"
          :user="user"
        />
      </li>
    </ul>
    <button @click="amountOfRequests"> Do it</button>
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
    };
  },
  methods: {
    toggleListShow() {
      this.showList = !this.showList;
    },
    emiUpdateAdoptionRequest(adoption) {
      this.$emit("updateAdoption", adoption);
    },
    emitRemoveAdoptionRequest(adoption){
      this.$emit("removeAdoption", adoption);
      console.log('deleted in request', adoption)
    },
    doit() {
      console.log(this.user)
    }
  },
  computed: {
    allCancelled() {
      const areAllCancelled = this.requests.every(
        (request) => request.status === "cancelled"
      );

      (this.user.userType === 'adopter')
  
      if (areAllCancelled && (this.user.userType === 'adopter')) return false;
      else return true
      // console.log("areAllCancelled", areAllCancelled);
      // this.hideCancel = areAllCancelled
    },
      amountOfRequests(){
      let counter = 0
      this.requests.forEach((request)=>{
        if (request.status !== 'pending') counter++
        return counter
      })
      const activeRequests = this.requests.length - counter
      console.log(activeRequests)
      return activeRequests
    },
    isOwner() {
      if (this.user.userType === 'owner') return true;
      else return false;
    },
    isAdopter(){
       if (this.user.userType === 'adopter') return true;
      else return false;
    }
  },
  created() {
    // this.getAdoptionRequest
  },
  components: {
    adoptionRequestPreview,
  },
};
</script>