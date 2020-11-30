
<template>
  <section class="adoption-request">
    <span class="request-togle" @click="togleListShow"
      >Adoption requests: ({{ requests.length }})</span
    >
    <ul class="adoption-request-list" v-if="requests && showList">
      <li>
        <div class="requests-header flex">
          <span class="requsted-id">Request Num</span>
          <span class="requsted-by">From</span>
          <span class="requsted-pet">Pet to adopt</span>
          <span class="requsted-at">Date</span>
          <span class="requsted-status">Status</span>
        </div>
      </li>
      <li class="flex" v-for="(request, idx) in requests" :key="idx">
        <adoption-request-preview
          @updateAdoption="emiUpdateAdoption"
          :request="request"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import adoptionRequestPreview from "./adoption-request-preview.vue";
export default {
  data() {
    return {
      showList: false,
    };
  },
  methods: {
    async getAdopter() {
      let adopter = await this.$store.getters.getUserById(adopterId);
      return adopter;
    },
    togleListShow() {
      this.showList = !this.showList;
    },
    emiUpdateAdoption(adoption) {
      this.$emit("updateAdoption", adoption);
    },
  },
  computed: {
    requests() {
      return this.$store.getters.getAdoptionRequests;
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