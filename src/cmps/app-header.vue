<template>
  <section class="header">
    <h1 class="logo">Pet <span>Furr</span>ever</h1>
    <nav class="navbar">
      <router-link to="/">Home</router-link> |
      <router-link to="/pet">Our Pets</router-link> |
      <router-link to="/profile">Profile</router-link>
    </nav>
  </section>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>