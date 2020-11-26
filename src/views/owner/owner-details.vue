<template>
  <section class="owner-details">
    <h1>Welcome {{ owner.userName }}</h1>
    <router-link to="/owner/edit/ +owner._id"></router-link>
    <img class="owner-profile-picture" :src="owner.imgUrlProfile" />
    <p>Name: {{ owner.name }}</p>
    <p>Email: {{ owner.email }}</p>
    <p>Telephone: {{ owner.tel }}</p>
    <p>Activity years: {{ owner.activityYears }}</p>
    <p>Title: {{ owner.title }}</p>
    <p>Description: {{ owner.desc }}</p>
    <!-- Add tags from elemnts -->
    <img class="owner-imgs" id="imgUploader2" v-for="(imgUrl,idx) in owner.imgUrls" :key="idx" :src="imgUrl">
  </section>
</template>

<script>
import { uploadImg } from "./../../services/img-upload-service.js";
export default {
  data() {
    return {
      // owner: null,
      owner: {
        name: "Hope 4 paws",
        email: "hope4paws@gmail.com",
        tel: "052-000000",
        activityYears: 5,
        title: "LOVE animals",
        desc: "Saving animals and finds home 4 ever",
        imgUrlProfile: require('../../assets/imgs/profile-logo.png'),
        imgUrls: []
      },
    };
  },
  // async created(){
  //   var ownerId = this.$router.params.id;
  //   const currOwner = await ownerService.getOwnerById(ownerId);
  //   this.owner = currOwner;
  // },
  methods: {
  },
};
</script>