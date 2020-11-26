<template>
    <section class="adopter-details">
      <h1>Welcome {{ user.fullName }}!</h1>
      <router-link to="/edit/user">Edit your profile</router-link>
      <br />
      <img
        :src="imgUrlProfile"
        class="user-profile-picture"
        alt="profile logo"
      />
      <p><span class="bold">Full name:</span> {{ user.fullName }}</p>
      <p><span class="bold">Email:</span> {{ user.email }}</p>
      <p><span class="bold">Telephone:</span> {{ user.tel }}</p>
      <p><span class="bold">Date of birth:</span> {{ user.dateOfBirth }}</p>
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
  data() {
    return {
      user: null,
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.getUser(userId);
  },
  methods: {
    async getUser(userId) {
      const user = await this.$store.dispatch({
        type: "getUserById",
        userId,
      });
      this.user = user;
    },
  },
  computed: {
    imgUrlProfile() {
      if (!this.user.imgUrlProfile)
        return require("../../assets/imgs/profile-logo.png");
    },
  },
  components: ownerDetails,
};
</script>