
<template>
  <section
    @mouseover="showButtons"
    @mouseleave="hideButtons"
    class="adoption-request-preview"
  >
    <div class="prev-content flex">
      <span class="requsted-id">{{ request._id }}</span>
      <span class="requsted-by">
        <router-link :to="`/user/${request.user._id}`">{{
          request.user.name
        }}</router-link>
      </span>
      <span class="requsted-pet">
        <router-link :to="`/pet/${request.pet._id}`">{{
          request.pet.name
        }}</router-link>
      </span>
      <span class="requsted-at">{{ sentTime }}</span>
      <span class="requsted-status">{{ statusCap }}</span>
      <div v-if="areButtonsShown">
        <button @click="updateRequest(true)">Approve</button>
        <button @click="updateRequest(false)">Decline</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "adoptionrequestPreview",
  props: {
    request: Object,
  },
  data() {
    return {
      areButtonsShown: false,
    };
  },
  methods: {
    async getAdopter() {
      let adopter = await this.$store.getters.getUserById(adopterId);
      return adopter;
    },
    showButtons() {
      this.areButtonsShown = true;
    },
    hideButtons() {
      this.areButtonsShown = false;
    },
    updateRequest(action) {
      if (action == true) this.request.status = "approved";
      else this.request.status = "declined";
      this.$emit("updateAdoption", this.request);
    },
  },
  computed: {
    sentTime() {
      let d = new Date(this.request.cretatedAt);
      return d.toDateString();
    },
    statusCap() {
      return (
        this.request.status.charAt(0).toUpperCase() +
        this.request.status.slice(1)
      );
    },
  },
  created() {
    // this.getAdoptionRequest
  },
};
</script>