<template>
  <section v-if="adopter" class="adopter-details">
    <button
      class="togle-adoption-btn btn"
      v-if="!showAdoptions && checkIfOwner"
      @click="togleShowAdoptions"
    >
      Show Adoption Requests
    </button>
    <button
      class="btn"
      v-if="showAdoptions && checkIfOwner"
      @click="togleShowAdoptions"
    >
      Back To Profile
    </button>
    <div v-if="!showAdoptions" class="adopter-content flex column">
      <h1>Hi, I'm {{ adopter.fullName }}!</h1>
      <!-- <router-link v-if="checkIfOwner" :to="'/adopter/edit/' + adopter._id"
      >Edit your profile</router-link
    > -->
      <img
        class="user-profile-picture"
        :src="imgUrlProfile"
        alt="profile logo"
      />
      <div class="flex column justify-center align-center content-center">
        <p class="flex">
          <img src="../../assets/svgs/email.svg" alt="" class="email-svg" />
          <span>
            {{ adopter.email }}
          </span>
        </p>

        <p class="flex align-center content-center">
          <img src="../../assets/svgs/phone.svg" alt="" class="phone-svg" />
          <span> {{ adopter.tel }}</span>
        </p>
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
      </div>
      <!-- Add tags from elemnts -->
    </div>
    <div class="adoption-request-adopter">
      <adoption-request
        :requests="requests"
        :user="adopter"
        @updateAdoption="updateAdoption"
        v-if="checkIfOwner && showAdoptions"
      />
    </div>
  </section>
</template>
<script>
import adoptionRequest from "./adoption-request.vue";
export default {
  props: {
    adopter: Object,
  },
  data() {
    return {
      showAdoptions: false,
    };
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
    togleShowAdoptions() {
      this.showAdoptions = !this.showAdoptions;
    },
    // async addMessage(adoptionId, message) {
    //   debugger
    //   await this.$store.dispatch({
    //     type: "addMessage",
    //     adoptionId,
    //     message,
    //   });
    // },
  },
  computed: {
    imgUrlProfile() {
      if (!this.adopter.imgUrlProfile) {
        return (this.adopter.imgUrlProfile = require("../../assets/imgs/profile-logo.png"));
      } else {
        return (this.adopter.imgUrlProfile = require("../../assets/imgs/person/alex.jpg"));
      }
    },
    checkIfOwner() {
      var loggedInUser = this.$store.getters.getLoggedInUser;
      return loggedInUser && loggedInUser._id === this.adopter._id;
    },
    requests() {
      let filteredReqs = this.$store.getters.getAdoptionRequests.filter(
        (req) => {
          return (
            req.adopter._id === this.$store.getters.getLoggedInUser._id ||
            req.owner._id === this.$store.getters.getLoggedInUser._id
          );
        }
      );
      return filteredReqs;
    },
  },
  created() {
    this.$store.dispatch({
      type: "loadAdoptionRequests",
    });
  },
  components: {
    adoptionRequest,
  },
};
</script>
