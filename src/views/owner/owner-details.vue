<template>
  <section class="owner-details">
    <h1>Welcome {{ owner.userName }}</h1>
    <template v-if="!isLoading">
      <label for="imgUploader">Choose your profile picture:
        <br />
        <img class="owner-profile-picture" :src="owner.imgUrlProfile" />
      </label>
      <br />
      <input
        type="file"
        name="img-uploader"
        id="imgUploader"
        @change="onUploadImgProfile"
      />
    </template>
    <img v-else src="../../assets/imgs/loading.gif" />
    <h2>Name: {{ owner.name }}</h2>
    <h2>Email: {{ owner.email }}</h2>
    <h2>Telephone: {{ owner.tel }}</h2>
    <h2>Activity years: {{ owner.activityYears }}</h2>
    <h2>Title: {{ owner.title }}</h2>
    <h2>Description: {{ owner.desc }}</h2>
    <!-- Add tags from elemnts -->
      <input
        type="file"
        name="img-uploader2"
        id="imgUploader2"
        @change="onUploadImgs"
      />
    <img class="owner-imgs" id="imgUploader2" v-for="(imgUrl,idx) in owner.imgUrls" :key="idx" :src="imgUrl">
  </section>
</template>

<script>
import { uploadImg } from "./../../services/img-upload-service.js";
export default {
  data() {
    return {
      isLoading: false,
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
    async onUploadImgProfile(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.owner.imgUrlProfile = res.url;
      this.isLoading = false;
    },
        async onUploadImgs(ev) {
      // this.isLoading = true;
      const res = await uploadImg(ev);
      this.owner.imgUrls.push(res.url);
      // this.isLoading = false;
    },
  },
};
</script>