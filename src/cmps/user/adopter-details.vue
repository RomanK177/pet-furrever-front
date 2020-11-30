<template>
  <section v-if="user" class="adopter-details">
    <h1>Welcome {{ user.fullName }}!</h1>
    <router-link v-if="checkIfOwner" :to="'/user/edit/' + user._id"
      >Edit your profile</router-link
    >
    <br />
    <img class="user-profile-picture" :src="imgUrlProfile" alt="profile logo" />
    <p><span class="bold">Full name:</span> {{ user.fullName }}</p>
    <p><span class="bold">Email:</span> {{ user.email }}</p>
    <p><span class="bold">Telephone:</span> {{ user.tel }}</p>
    <p>
      <span class="bold">Date of birth:</span>
      {{ user.adopterData.dateOfBirth }}
    </p>
    <p class="bold">
      <span v-if="user.ownPet">Own a pet at the moment</span
      ><span v-else>Doesnt own a pet at the moment</span>
    </p>
    <p class="bold">
      <span v-if="user.ownedPet">Owned a pet before</span
      ><span v-else>Doesnt owned a pet before</span>
    </p>
    <p>{{ user.familyStatus }}</p>
    <p>{{ user.houseStatus }}</p>
    <!-- Add tags from elemnts -->
  </section>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  created() {
    // const userId = this.$route.params.id;
    // this.getUser(userId);
  },
  methods: {
    // async getUser(userId) {
    //   const user = await this.$store.dispatch({
    //     type: "getUserById",
    //     userId,
    //   });
    //   this.user = user;
    // },
  },
  computed: {
    imgUrlProfile() {
      if (!this.user.imgUrlProfile) {
        return (this.user.imgUrlProfile = require("../../assets/imgs/profile-logo.png"));
      } else {
        return this.user.imgUrlProfile;
      }
    },
    checkIfOwner() {
      var loggedInUser = this.$store.getters.getLoggedInUser;
      return loggedInUser && loggedInUser._id === this.user._id;
    },
  },
};
</script>