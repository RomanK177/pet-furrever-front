<template>
  <section class="user-details">
    <adopter-details v-if="user && user.userType === 'adopter'" />
    <ownerDetails v-if="user && user.userType === 'owner'" />
  </section>
</template>

<script>
import adopterDetails from './../../cmps/user/adopter-details.vue';
import ownerDetails from "./../../cmps/user/owner-details.vue";

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
  components:{
    adopterDetails,
    ownerDetails
  }
};
</script>