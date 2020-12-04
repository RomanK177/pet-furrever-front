<template>
  <section class="user-details container">
    <adopter-details v-if="user && user.userType === 'adopter'" :adopter="user" />
    <owner-details v-if="user && user.userType === 'owner'" :owner="user" />
  </section>
</template>

<script>
import adopterDetails from "./../../cmps/user/adopter-details.vue";
import ownerDetails from "./../../cmps/user/owner-details.vue";

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async getUser(userId) {
      const user = await this.$store.dispatch({
        type: "getUserById",
        userId,
      });
      this.user = user;
      console.log('user', this.user)

    },
   
  },
   created() {
    const userId = this.$route.params.id;
    this.getUser(userId);
  },
  components: {
    adopterDetails,
    ownerDetails,
  },
};
</script>