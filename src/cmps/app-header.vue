<template>
  <section class="header flex space-around">
    <router-link to="/" class="logo">Pet <span>Furr</span>ever</router-link>
    <!-- <h1 class="logo">Pet <span>Furr</span>ever</h1> -->
    <nav class="navbar">
      <span>Hello: {{ loggedinUserName }}</span>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/pet" class="nav-link">Our Pets</router-link>
      <!-- Karin changes:  -->
      <router-link
        v-if="loggedinUser"
        :to="`/user/${loggedinUser._id}`"
        class="nav-link"
        >Profile</router-link
      >
      <!-- Changes end   -->
      <router-link v-else to="/signup" class="nav-link">SignUp</router-link>
      <a v-if="!loggedinUser" @click="loginOpen = !loginOpen" class="nav-link"
        >Login</a
      >
      <a v-else @click="logout" class="nav-link">Logout</a>
      <!-- <router-link to="/login" class="nav-link">Login</router-link> -->
    </nav>
    <login v-if="loginOpen" class="login" />
  </section>
</template>

<script>
import eventBus from "../services/event-bus-service.js";
import login from "./login.vue";

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      loginOpen: false,
      loggedinUser: this.$store.getters.getLoggedInUser,
    };
  },
  computed: {
    loggedinUserName() {
      if (this.loggedinUser) {
        return this.loggedinUser.userName;
      } else {
        return "Guest";
      }

    },
  },
  methods: {
    logout() {
      this.$store.dispatch({
        type: "logout",
      });
    },
  },
  created() {
    eventBus.$on("login", () => {
      this.loginOpen = false;
    }),
      eventBus.$on("closeModal", () => {
        this.loginOpen = false;
      });
  },
  components: {
    login,
  },
};
</script>