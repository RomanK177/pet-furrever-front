<template>
  <section class="owner-details">
    <section class="owner-action flex reverse" v-if="checkIfOwner">
      <router-link :to="'/user/edit/' + user._id">Edit profile</router-link> ||
      <router-link to="/pet/edit">Add pet</router-link>
      <adoption-request />
    </section>
    <h1 v-if="checkIfOwner">Welcome {{ user.fullName }}</h1>
    <h1 v-else>{{ user.fullName }}</h1>
    <br />
    <img class="user-profile-picture" :src="imgUrlProfile" />
    <!-- :src="require(`@/assets/imgs/person/${pet.owner.imgUrl}`)" -->
    <p><span class="bold">Name:</span> {{ user.fullName }}</p>
    <p><span class="bold">Email:</span> {{ user.email }}</p>
    <p><span class="bold">Telephone:</span> {{ user.tel }}</p>
    <p>
      <span class="bold">Activity years:</span>
      {{ user.ownerData.activityYears }}
    </p>
    <p><span class="bold">Title:</span> {{ user.ownerData.title }}</p>
    <p><span class="bold">Description:</span> {{ user.ownerData.desc }}</p>
    <!-- Add tags from elemnts -->
    <div class="details-images">
      <img
        id="imgUploader2"
        v-for="(imgUrl, idx) in user.ownerData.imgUrls"
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
    <owner-review :user="user" />
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
    user: Object,
  },
  data() {
    return {
    };
  },
  methods: {},
  computed: {
    imgUrlProfile() {
      if (!this.user.imgUrlProfile) {
        return require("../../assets/imgs/profile-logo.png");
      } else {
        return this.user.imgUrlProfile;
      }
    },
    checkIfOwner() {
      var loggedInUser = this.$store.getters.getLoggedInUser;
      if (!loggedInUser) return false;
      else if (loggedInUser._id === this.user._id) return true;
      else return false;
    },
    getAdoptionRequests() {
      this.requests = this.$store.getters.getAdoptionRequests;
    },
  },
  async created() {
    this.$store.dispatch({
      type: "loadAdoptionRequests",
    });
  },
  components: {
    ownerReview,
    adoptionRequest,
  },
};
</script>