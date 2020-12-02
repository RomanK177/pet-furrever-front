<template>
  <section class="owner-details container">
    <div class="owner-action" v-if="checkIfOwner">
      <router-link :to="'/user/edit/' + owner._id">Edit profile</router-link> ||
      <router-link to="/pet/edit">Add pet</router-link>
    </div>
    <h1 v-if="checkIfOwner" class="welcome">Welcome {{ owner.fullName }}</h1>
    <h1 v-else>{{ owner.fullName }}</h1>
    <br />
        <div class="details-images">
      <img
        id="imgUploader2"
        v-for="(imgUrl, idx) in owner.ownerData.imgUrls"
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
    <div class="owner-profile flex align-center">
    <img class="user-profile-picture" :src="imgUrlProfile" />
    <!-- :src="require(`@/assets/imgs/person/${pet.owner.imgUrl}`)" -->
    <div class="owner-info">
    <p><span class="bold">Name:</span> {{ owner.fullName }}</p>
    <p><span class="bold">Email:</span> {{ owner.email }}</p>
    <p><span class="bold">Telephone:</span> {{ owner.tel }}</p>
    <p>
      <span class="bold">Activity years:</span>
      {{ owner.ownerData.activityYears }}
    </p>
    <p><span class="bold">Title:</span> {{ owner.ownerData.title }}</p>
    <p><span class="bold">Description:</span> {{ owner.ownerData.desc }}</p>
    <!-- Add tags from elemnts -->
    </div>
    </div>
    <adoption-request
      @updateAdoption="updateAdoption"
      v-if="checkIfOwner"
      :requests="requests"
    />
    <!-- <owner-review :owner="owner" /> -->
    <!-- <owner-review :owner="owner" :loggedInUser="loggedInUser" @addReview="updateReviews"/> -->
    <owner-review-updated
      :reviews="owner.ownerData.reviews"
      :loggedInUser="getLoggedInUser"
      @addReview="addReview"
    />
  </section>
</template>

<script>
import eventBus from "./../../services/event-bus-service.js";
import { uploadImg } from "./../../services/img-upload-service.js";
import { userService } from "../../services/user-service.js";
import ownerReview from "./../../cmps/user/owner-review.vue";
import adoptionRequest from "./adoption-request.vue";
import ownerReviewUpdated from "../user/owner-reviewUpdated";

export default {
  props: {
    owner: Object,
  },
  methods: {
    // updateReviews(review) {
    //   this.owner.ownerData.reviews.unshift(review);
    //   this.$store.dispatch({
    //     type: "saveUser",
    //     user: this.owner,
    //   });

    async addReview(review) {
      await this.$store.dispatch({
        type: "addReview",
        review: JSON.parse(JSON.stringify(review)),
        ownerId: this.owner._id,
      });
    },
    updateAdoption(adoptionRequest) {
      this.$store.dispatch({
        type: "updateAdoption",
        adoptionRequest,
      });
    },
  },
  computed: {
    imgUrlProfile() {
      if (!this.owner.imgUrlProfile) {
        return require("../../assets/imgs/profile-logo.png");
      } else {
        return this.owner.imgUrlProfile;
      }
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
  },

  created() {
    this.$store.dispatch({
      type: "loadAdoptionRequests",
    });

    let urlStart = this.owner.imgUrlProfile.slice(0, 4);
    if (urlStart !== "http") {
      this.owner.imgUrlProfile = require(`../../assets/imgs/person/${this.owner.imgUrlProfile}`);
    }

    let newUrls = this.owner.ownerData.imgUrls.map((imgUrl) => {
      let urlStart = imgUrl.slice(0, 4);
      if (urlStart === "http") return imgUrl;
      else return require(`../../assets/imgs/owners/${imgUrl}`);
    });
    this.owner.ownerData.imgUrls = newUrls;
  },
  components: {
    ownerReview,
    ownerReviewUpdated,
    adoptionRequest,
  },
};
</script>