<template>
  <section class="owner-details">
    <h1>Welcome {{ user.fullName }}</h1>
    <router-link :to="'/user/edit/' +user._id"></router-link>
    <img class="user-profile-picture" :src="imgUrlProfile" />
    <p>Name: {{ user.fullName }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Telephone: {{ user.tel }}</p>
    <p>Activity years: {{ user.ownerData.activityYears }}</p>
    <p>Title: {{ user.ownerData.title }}</p>
    <p>Description: {{ user.ownerData.desc }}</p>
    <!-- Add tags from elemnts -->
    <img
      class="owner-imgs"
      id="imgUploader2"
      v-for="(imgUrl, idx) in user.ownerData.imgUrls"
      :key="idx"
      :src="imgUrl"
    />
  </section>
</template>

<script>
import { uploadImg } from "./../../services/img-upload-service.js";
export default {
  props:{
    user: Object
  },
  created(){
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
  computed:{
    imgUrlProfile(){
      if(!this.user.imgUrlProfile){
       return require('../../assets/imgs/profile-logo.png')  
      } else {
        return this.user.imgUrlProfile;
      }
    }
  }
};
</script>