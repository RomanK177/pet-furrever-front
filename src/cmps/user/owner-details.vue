<template>
  <section class="owner-details container">
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
    <adoption-request
      @updateAdoption="updateAdoption"
      @removeAdoption="removeAdoption"
      v-if="checkIfOwner && showAdoptions"
      :requests="requests"
      :user="owner"
    />
    <!-- <div class="owner-action" v-if="checkIfOwner">
      <router-link :to="'/user/edit/' + owner._id">Edit profile</router-link> ||
    </div> -->

    <br />
    <div v-if="!showAdoptions">
      <div class="details-images">
        <img
          id="imgUploader2"
          v-for="(imgUrl, idx) in imgUrls"
          :key="idx"
          :src="imgUrl"
          :class="{
            item0: idx === 0,
            item1: idx === 1,
            item2: idx === 2,
            item3: idx === 3,
            item4: idx === 4,
          }"
        />
      </div>
      <div class="owner-profile flex">
        <div class="flex column">
          <div class="flex space-between align-center content-center">
            <h1 v-if="checkIfOwner" class="welcome">
              Welcome {{ owner.fullName }}
            </h1>
            <h1 v-else>{{ owner.fullName }}</h1>
            <div class="flex space-between align-center content-center">
              <img class="star" :src="starUrl" alt="" /><span class="rating-num"
                >{{ ratingAvg }}
              </span>
              <span class="number-of-ratings"
                >({{ owner.ownerData.reviews.length }})
              </span>
            </div>
          </div>
          <p class="ownerDescription">
            <span class="bold"></span>
            {{ owner.ownerData.desc }}
          </p>
        </div>
        <!-- :src="require(`@/assets/imgs/person/${pet.owner.imgUrl}`)" -->
        <div class="owner-info flex column">
          <img class="user-profile-picture" :src="imgUrlProfile" />
          <p class="location-details flex flex-start">
            <img
              src="../../assets/svgs/location.svg"
              alt=""
              class="location-svg"
            />
            {{ owner.ownerData.location.name }}
          </p>
          <!-- <hr /> -->
          <p class="flex">
            <img src="../../assets/svgs/email.svg" alt="" class="email-svg" />
            {{ owner.email }}
          </p>
          <!-- <hr /> -->
          <p class="flex">
            <img
              src="../../assets/svgs/phone.svg"
              alt=""
              class="phone-svg"
            />Telephone: {{ owner.tel }}
          </p>
          <!-- <hr /> -->
          <p>
            <span class="bold">Established since:</span>
            {{ owner.ownerData.established }}
          </p>
          <!-- <p><span class="bold">Title:</span> {{ owner.ownerData.title }}</p> -->
          <!-- Add tags from elemnts -->
        </div>
      </div>
      <owner-review
        :reviews="owner.ownerData.reviews"
        :loggedInUser="getLoggedInUser"
        @addReview="addReview"
      />
      <div class="flex content-center">
        <router-link v-if="checkIfOwner" class="addPet" to="/pet/edit"
          >Add Pet</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
import eventBus from "./../../services/event-bus-service.js";
import { uploadImg } from "./../../services/img-upload-service.js";
import { userService } from "../../services/user-service.js";
import adoptionRequest from "./adoption-request.vue";
import ownerReview from "../user/owner-review";
import petList from "../pet/pet-list";
import socketService from "../../services/socket-service.js";

export default {
  props: {
    owner: Object,
    // user: Object
  },
  data() {
    return {
      pets: null,
      showAdoptions: false,
    };
  },
  methods: {
    async addReview(review) {
      await this.$store.dispatch({
        type: "addReview",
        review: JSON.parse(JSON.stringify(review)),
        ownerId: this.owner._id,
      });
      eventBus.$emit("reviewAdded");
    },
    togleShowAdoptions() {
      this.showAdoptions = !this.showAdoptions;
    },
    async updateAdoption(adoptionRequest) {
      await this.$store.dispatch({
        type: "updateAdoptionRequest",
        adoptionRequest,
      });
    },
    async removeAdoption(adoptionRequest) {
      await this.$store.dispatch({
        type: "removeAdoptionRequest",
        adoptionRequest,
      });
    },
    async addTreat(pet) {
      debugger
      const newPet = await this.$store.dispatch({
        type: "addTreat",
        petId: pet._id,
      });
      await this.$store.dispatch({
        type: "savePet",
        pet: newPet,
      });
    },
  },
  computed: {
    imgUrlProfile() {
      let urlStart = this.owner.imgUrlProfile.slice(0, 4);
      if (urlStart !== "http") {
        this.owner.imgUrlProfile = require(`../../assets/imgs/person/${this.owner.imgUrlProfile}`);
      }
      if (!this.owner.imgUrlProfile) {
        return require("../../assets/imgs/profile-logo.png");
      } else {
        return this.owner.imgUrlProfile;
      }
    },
    starUrl() {
      return require("../../assets/svgs/star.svg");
    },
    checkIfOwner() {
      var loggedInUser = this.$store.getters.getLoggedInUser;
      return loggedInUser && loggedInUser._id === this.owner._id;
    },
    requests() {
      let filteredReqs = this.$store.getters.getAdoptionRequests.filter(
        (req) => req.owner._id === this.$store.getters.getLoggedInUser._id
      );
      return filteredReqs;
    },
    ratingAvg() {
      let sum = this.owner.ownerData.reviews.reduce((acc, curr) => {
        return acc + curr.rate;
      }, 0);
      return sum / this.owner.ownerData.reviews.length;
    },
    ownerPetsForPreview() {
      let pets = this.$store.getters.petsForPreview;
      let filterdPets = pets.filter((pet) => pet.ownerId === this.owner._id);
      return filterdPets;
    },
    // getAdoptionRequests() {
    //   let filteredReqs = this.$store.getters.getAdoptionRequests.filter(
    //     (req) => req.owner._id === this.$store.getters.getLoggedInUser._id
    //   );
    //   console.log(
    //     "🚀 ~ file: owner-details.vue ~ line 93 ~ getAdoptionRequests ~ filteredReqs",
    //     filteredReqs
    //   );
    //   this.requests = filteredReqs;
    // },
    getLoggedInUser() {
      const loggedInUser = this.$store.getters.getLoggedInUser;
      return loggedInUser;
    },
    imgUrls() {
      let newUrls = this.owner.ownerData.imgUrls.map((imgUrl) => {
        let urlStart = imgUrl.slice(0, 4);
        if (urlStart === "http") return imgUrl;
        else return require(`../../assets/imgs/owners/${imgUrl}`);
      });
      return newUrls;
    },
  },

  async created() {
    this.$store.dispatch({
      type: "loadAdoptionRequests",
    });
    // this.$store.dispatch({ type: "loadPets" });
    // let urlStart = this.owner.imgUrlProfile.slice(0, 4);
    // if (urlStart !== "http") {
    //   this.owner.imgUrlProfile = require(`../../assets/imgs/person/${this.owner.imgUrlProfile}`);
    // }

    socketService.setup();
    socketService.emit("treats topic", "owner-details");
    socketService.on("treats addTreat", this.addTreat);
    const pets = await this.$store.dispatch({ type: "loadPets" });
    this.pets = pets;
  },
  // mounted() {
  //   let newUrls = this.owner.ownerData.imgUrls.map((imgUrl) => {
  //     let urlStart = imgUrl.slice(0, 4);
  //     if (urlStart === "http") return imgUrl;
  //     else return require(`../../assets/imgs/owners/${imgUrl}`);
  //   });
  //   this.owner.ownerData.imgUrls = newUrls;
  // },
  components: {
    ownerReview,
    adoptionRequest,
    petList,
  },
  destroyed() {
    socketService.off("treats addTreat", this.addTreat);
    socketService.terminate();
  },
};
</script>
