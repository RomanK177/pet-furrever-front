
<template>
  <section v-if="adopter" class="adopter-details">
    <h1>Welcome {{ adopter.fullName }}!</h1>
    <!-- <router-link v-if="checkIfOwner" :to="'/adopter/edit/' + adopter._id"
      >Edit your profile</router-link
    > -->
    <br />
    <img class="user-profile-picture" :src="imgUrlProfile" alt="profile logo" />
    <p><span class="bold">Full name:</span> {{ adopter.fullName }}</p>
    <p><span class="bold">Email:</span> {{ adopter.email }}</p>
    <p><span class="bold">Telephone:</span> {{ adopter.tel }}</p>
    <p>
      <span class="bold">Date of birth:</span>
      {{ adopter.adopterData.dateOfBirth }}
    </p>
    <p class="bold">
      <span v-if="adopter.ownPet">Currrently owns a pet</span
      ><span v-else>Doesnt own a pet at the moment</span>
    </p>
    <p class="bold">
      <span v-if="adopter.ownedPet">Has owned a pet before</span
      ><span v-else>Has never owned a pet before</span>
    </p>
    <p>{{ adopter.familyStatus }}</p>
    <p>{{ adopter.houseStatus }}</p>
    <!-- Add tags from elemnts -->
    <adoption-request
      :requests="requests"
      :user="adopter"
      @addMessage="addMessage"
      @updateAdoption="updateAdoption"
      v-if="checkIfOwner"
    />
  </section>
</template>

<script>
import adoptionRequest from "./adoption-request.vue";
export default {
  props: {
    adopter: Object,
  },
  created() {
    this.$store.dispatch({
      type: "loadAdoptionRequests",
    });
  },
  methods: {
    async updateAdoption(adoptionRequest) {
      await this.$store.dispatch({
        type: "updateAdoptionRequest",
        adoptionRequest,
      });
    },
    async addMessage(adoptionId, message) {
      //  debugger
      await this.$store.dispatch({
        type: "addMessage",
        adoptionId,
        message,
      });
    },
  },
  computed: {
    imgUrlProfile() {
      if (!this.adopter.imgUrlProfile) {
        return (this.adopter.imgUrlProfile = require("../../assets/imgs/profile-logo.png"));
      } else {
        return this.adopter.imgUrlProfile;
      }
    },
    checkIfOwner() {
      var loggedInUser = this.$store.getters.getLoggedInUser;
      return loggedInUser && loggedInUser._id === this.adopter._id;
    },
    requests() {
      let filteredReqs = this.$store.getters.getAdoptionRequests.filter(
        (req) => req.user._id === this.$store.getters.getLoggedInUser._id
      );
      return filteredReqs;
    },
  },
  components: {
    adoptionRequest,
  },
};
</script>