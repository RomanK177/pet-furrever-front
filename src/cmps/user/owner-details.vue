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
                 :class="{
            item0: idx === 0,
            item1: idx === 1,
            item2: idx === 2,
            item3: idx === 3,
            item4: idx === 4,
          }"
      />
    </div>
    <owner-review :owner="user"/>
  </section>
</template>

<script>
import { uploadImg } from "./../../services/img-upload-service.js";
import ownerReview from './../../cmps/user/owner-review.vue';

export default {
  props: {
    user: Object,
  },
  created() {
    // var userId = this.$route.params.id;
    // getUser(userId);
    console.log(this.user)
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
  components:{
    ownerReview
  }
};
</script>