<template>
  <div class="owner-edit">
    <h1>Edit your profile</h1>
    <form>
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
      <label>Name: <input type="text" v-model="userToEdit.name" /></label>
      <br />
      <label>Email: <input type="email" v-model="userToEdit.email" /></label>
      <br />
      <label>Telephone: <input type="tel" v-model="userToEdit.tel" /></label>
      <br />
      <label
        >Activity years:
        <input type="number" v-model="userToEdit.ownerData.activityYears"
      /></label>
      <br />
      <label>Title: <input type="text" v-model="userToEdit.ownerData.title" /></label>
      <br />
      <label
        >Description: <input type="text" v-model="userToEdit.ownerData.desc"
      /></label>
      <br />
      <label>Choose your browser from the list:</label>
      <br />
      <input list="tags" v-model="userToEdit.ownerData.tags" />
      <datalist id="tags">
        <option value="Variety of pets" />
        <option value="Care for all animals" />
        <option value="Dog's expert" />
        <option value="Cat lovers" />
        <option value="Big animals professionals" />
      </datalist>
      <br />
      <template v-if="!isLoadingImgs">
        <label>Images:
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
            v-for="(imgUrl, index) in userToEdit.ownerData.imgUrls"
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
  </div>
</template>

<script>
import { uploadImg } from "./../../services/img-upload-service.js";

export default {
  props: {
    userToEdit: Object,
  },
  data() {
    return {
      isLoadingProfile: false,
      isLoadingImgs: false,
    };
  },
  created() {
console.log(this.userToEdit)
  },
  methods: {
    // async getOwner(ownerId) {
    //   const owner = await this.$store.dispatch({
    //     type: "getOwnerById",
    //     ownerId,
    //   });
    //   this.user = user;
    // },
    async onUploadImgProfile(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.userToEdit.imgUrlProfile = res.url;
      this.isLoading = false;
    },
    async onUploadImgs(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.userToEdit.ownerData.imgUrls.push(res.url);
      this.isLoading = false;
    },
    saveEdit() {
      this.$store.dispatch({
        type: "updateUser",
        savedUser: this.userToEdit,
      });
      this.$router.push(`/user/${this.userToEdit._id}`);
    },
  },
  computed: {
    imgUrlProfile() {
      if (!this.userToEdit.imgUrlProfile) {
        return require("../../assets/imgs/profile-logo.png");
      } else {
        return this.userToEdit.imgUrlProfile;
      }
    },
  },
};
</script>