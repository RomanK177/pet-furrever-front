<template>
  <section class="header flex space-around">
    <h1 class="logo">Pet <span>Furr</span>ever</h1>
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/pet" class="nav-link">Our Pets</router-link>
      <!-- Karin changes:  -->
      <!-- <router-link v-if="loggedinUser" to="/user/u101" class="nav-link">Profile</router-link> -->
      <router-link to="/user/u101" class="nav-link">Profile</router-link>
      <!-- Changes end   -->
      <router-link to="/signup" class="nav-link">SignUp</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
    </nav>
  </section>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  // Karin changes //
  computed: {
    loggedinUser() {
      this.$store.getters.getLoggedInUser;
    },
    // Changes end //
  },
};
</script>