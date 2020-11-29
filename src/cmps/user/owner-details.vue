<template>
  <section class="owner-details">
    <div class="owner-action" v-if="checkIfOwner">
      <router-link :to="'/user/edit/' + owner._id">Edit profile</router-link> ||
      <router-link to="/pet/edit">Add pet</router-link>
      <adoption-request />
    </div>
    <h1 v-if="checkIfOwner">Welcome {{ owner.fullName }}</h1>
    <h1 v-else>{{ owner.fullName }}</h1>
    <br />
    <img class="user-profile-picture" :src="imgUrlProfile" />
    <!-- :src="require(`@/assets/imgs/person/${pet.owner.imgUrl}`)" -->
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
    <owner-review :owner="owner" />
  </section>
</template>

<script>
import eventBus from "./../../services/event-bus-service.js";
import { uploadImg } from "./../../services/img-upload-service.js";
import { userService } from "../../services/user-service.js";
import ownerReview from "./../../cmps/user/owner-review.vue";
import adoptionRequest from "./adoption-request.vue";

export default {
  props: {
    owner: Object,
  },
  data() {
    return {};
  },
  methods: {},
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
      if (!loggedInUser) return false;
      else if (loggedInUser._id === this.owner._id) return true;
      else return false;
    },
    getAdoptionRequests() {
      this.requests = this.$store.getters.getAdoptionRequests;
    },
  },
  created() {
    this.$store.dispatch({
      type: "loadAdoptionRequests",
    });

    let urlStart = this.owner.imgUrlProfile.slice(0, 4);
    if (urlStart === "http") {
      this.owner.imgUrlProfile = this.this.owner.imgUrlProfile;
    } else {
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
    adoptionRequest,
  },
};
</script>