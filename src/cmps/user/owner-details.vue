<template>
  <section class="owner-details">
    <h1>Welcome {{ user.fullName }}</h1>
    <router-link :to="'/user/edit/' + user._id">Edit profile</router-link>
    <br />
    <img class="user-profile-picture" :src="imgUrlProfile" />
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
    <div class="details-images flex wrap">
      <img
        id="imgUploader2"
        v-for="(imgUrl, idx) in user.ownerData.imgUrls"
        :key="idx"
        :src="imgUrl"
        class="`item${idx}`"
      />
    </div>
  </section>
</template>

<script>
import { uploadImg } from "./../../services/img-upload-service.js";
export default {
  props: {
    user: Object,
  },
  created() {
    // var userId = this.$route.params.id;
    // getUser(userId);
  },
  methods: {
    // async getUser(userId){
    // var user = await this.$store.dispatch({
    //   type: 'getUserById',
    //   userId
    // })
    // this.user = user;
    // }
  },
  computed: {
    imgUrlProfile() {
      if (!this.user.imgUrlProfile) {
        return require("../../assets/imgs/profile-logo.png");
      } else {
        return this.user.imgUrlProfile;
      }
    },
  },
};
</script>