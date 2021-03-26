<template>
  <section class="owner-edit">
    <h1>Edit your profile</h1>
    <form v-if="ownerToEdit" @submit.prevent="saveEdit">
      <template v-if="!isLoadingProfile">
        <label for="imgUploader"
          >Choose your profile picture:
          <br />
          <img class="user-profile-picture" :src="imgUrlProfile" />
        </label>
        <br />
        <input
          type="file"
          name="img-uploader"
          id="imgUploader"
          @change="onUploadImgProfile"
        />
      </template>
      <img
        v-else
        src="../../assets/imgs/loading.gif"
        width="200"
        height="200"
      />
      <br />
      <label>Name: <input type="text" v-model="ownerToEdit.name" /></label>
      <br />
      <label>Email: <input type="email" v-model="ownerToEdit.email" /></label>
      <br />
      <label>Telephone: <input type="tel" v-model="ownerToEdit.tel" /></label>
      <br />
      <label
        >Activity years:
        <input type="number" v-model="ownerToEdit.ownerData.activityYears"
      /></label>
      <br />
      <label
        >Title: <input type="text" v-model="ownerToEdit.ownerData.title"
      /></label>
      <br />
      <label
        >Description: <input type="text" v-model="ownerToEdit.ownerData.desc"
      /></label>
      <br />
      <label>Choose your browser from the list:</label>
      <br />
      <input list="tags" v-model="ownerToEdit.ownerData.tags" />
      <datalist id="tags">
        <option value="Variety of pets" />
        <option value="Care for all animals" />
        <option value="Dog's expert" />
        <option value="Cat lovers" />
        <option value="Big animals professionals" />
      </datalist>
      <br />
      <template v-if="!isLoadingImgs">
        <label
          >Images:
          <input
            type="file"
            name="img-uploader2"
            id="imgUploader2"
            @change="onUploadImgs"
          />
        </label>
        <br />
        <div class="details-images">
          <img
            :class="{
              item0: index === 0,
              item1: index === 1,
              item2: index === 2,
              item3: index === 3,
              item4: index === 4,
            }"
            id="imgUploader2"
            v-for="(imgUrl, index) in ownerToEdit.ownerData.imgUrls"
            :key="index"
            :src="imgUrl"
          />
        </div>
      </template>
      <img
        v-else
        src="../../assets/imgs/loading.gif"
        width="150"
        height="350"
      />
      <br />
      <button>Save</button>
    </form>
  </section>
</template>

<script>
import { uploadImg } from "./../../services/img-upload-service.js";

export default {
  props: {
    ownerToEdit: Object,
  },
  data() {
    return {
      isLoadingProfile: false,
      isLoadingImgs: false,
    };
  },
  created() {
    let urlStart = this.ownerToEdit.imgUrlProfile.slice(0, 4);
    if (urlStart === "http") this.imgUrl = this.ownerToEdit.imgUrlProfile;
    else {
      this.ownerToEdit.imgUrlProfile = require(`../../assets/imgs/person/${this.ownerToEdit.imgUrlProfile}`);
    }

    let newUrls = this.ownerToEdit.ownerData.imgUrls.map((imgUrl) => {
      let urlStart = imgUrl.slice(0, 4);
      if (urlStart === "http") return imgUrl;
      else return require(`../../assets/imgs/owners/${imgUrl}`);
    });
    this.ownerToEdit.ownerData.imgUrls = newUrls;
  },
  methods: {
    async onUploadImgProfile(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.ownerToEdit.imgUrlProfile = res.url;
      this.isLoading = false;
    },
    async onUploadImgs(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.ownerToEdit.ownerData.imgUrls.push(res.url);
      this.isLoading = false;
    },
    saveEdit() {
      this.$store.dispatch({
        type: "updateUser",
        savedUser: this.ownerToEdit,
      });
      this.$router.push(`/user/${this.ownerToEdit._id}`);
    },
  },
  computed: {
    imgUrlProfile() {
      if (!this.ownerToEdit.imgUrlProfile) {
        return require("../../assets/imgs/profile-logo.png");
      } else {
        return this.ownerToEdit.imgUrlProfile;
      }
    },
  },
};
</script>