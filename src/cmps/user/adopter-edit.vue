<template>
  <section class="user-details">
    <h1>Welcome {{ userToEdit.fullName }}</h1>
    <form @submit.prevent="saveEdit">
      <template v-if="!isLoading">
        <label for="imgUploader"
          >Choose your profile picture:
          <br />
          <img class="user-profile-picture" :src="userToEdit.imgUrlProfile" />
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
      <p>Full name: <input type="text" v-model="userToEdit.fullName" /></p>
      <p>Email: <input type="text" v-model="userToEdit.email" /></p>
      <p>Telephone: <input type="text" v-model="userToEdit.tel" /></p>
      <p>
        Date of birth:
        <input type="date" v-model="userToEdit.adopterData.dateOfBirth" />
      </p>
      <p v-if="userToEdit.adopterData.ownPet">Own a pet</p>
      <p v-if="userToEdit.adopterData.ownedPet">Owned a pet</p>
      <p>
        Family status:
        <select v-model="userToEdit.adopterData.familyStatus">
          <option
            v-for="(status, idx) in userToEdit.adopterData.familyStatus"
            :key="idx"
          >
            {{ status }}
          </option>
        </select>
      </p>
      <p>
        House status:
        <select v-model="userToEdit.adopterData.houseStatus">
          <option
            v-for="(status, idx) in userToEdit.adopterData.houseStatus"
            :key="idx"
          >
            {{ status }}
          </option>
        </select>
      </p>
      <!-- Add tags from elemnts -->
      <button>Save</button>
    </form>
  </section>
</template>

<script>
import { uploadImg } from "./../../services/img-upload-service.js";

export default {
  props: {
    userToEdit: Object,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    // const userId = this.$route.params.id;
    // this.getUser(userId);
  },
  methods: {
    async onUploadImgProfile(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.userToEdit.imgUrlProfile = res.url;
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
    // imgUrlProfile() {
    //   return this.userToEdit.imgUrlProfile
    // },
  },
};
</script>