<template>
  <section class="owner-details">
    <h1>Welcome {{ owner.name }}</h1>
    <router-link to="/owner/edit/ +owner._id"></router-link>
    <img class="owner-profile-picture" :src="imgUrlProfile" />
    <p>Name: {{ owner.name }}</p>
    <p>Email: {{ owner.email }}</p>
    <p>Telephone: {{ owner.tel }}</p>
    <p>Activity years: {{ owner.activityYears }}</p>
    <p>Title: {{ owner.title }}</p>
    <p>Description: {{ owner.desc }}</p>
    <!-- Add tags from elemnts -->
    <img
      class="owner-imgs"
      id="imgUploader2"
      v-for="(imgUrl, idx) in owner.imgUrls"
      :key="idx"
      :src="imgUrl"
    />
  </section>
</template>

<script>
import { uploadImg } from "./../../services/img-upload-service.js";
export default {
  data() {
    return {
      owner: null,
    };
  },
  created(){
    var ownerId = this.$route.params.id;
    getUser(ownerId);
  },
  methods: {
    async getOwner(ownerId){
    var owner = await this.$store.dispatch({
      type: 'getOwnerById',
      ownerId
    })
    this.owner = owner;
    }
  },
  computed:{
    imgUrlProfile(){
      if(!this.owner.imgUrlProfile) return require('../../assets/imgs/profile-logo.png')
    }
  }
};
</script>