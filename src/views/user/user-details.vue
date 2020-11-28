<template>
  <section class="user-details">
    <adopter-details v-if="user && user.userType === 'adopter'" :user="user" />
    <owner-details v-if="user && user.userType === 'owner'" :user="user" />
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
  components:{
    adopterDetails,
    ownerDetails
  }
};
</script>