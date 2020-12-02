<template>
  <section class="header flex space-between container">
    <router-link to="/" class="logo">Pet <span>Furr</span>ever</router-link>
    <nav class="navbar">
      <avatar :name="loggedinUserName" />
      <!-- <span>Hello: {{ loggedinUserName }}</span> -->
      <!-- <router-link to="/" class="nav-link">Home</router-link> -->
      <router-link to="/pet" class="nav-link">Our Pets</router-link>
      <router-link
        v-if="loggedinUser"
        :to="`/user/${loggedinUser._id}`"
        class="nav-link"
      >
        Profile
      </router-link>
      <router-link v-else to="/signup" class="nav-link">SignUp</router-link>
      <a v-if="!loggedinUser" @click="loginOpen = !loginOpen" class="nav-link"
        >Login</a
      >
      <a v-else @click="logout" class="nav-link">Logout</a>
    </nav>
    <login v-if="loginOpen" class="login" />
  </section>
</template>

<script>
import eventBus from "../services/event-bus-service.js";
import login from "./login.vue";
import avatar from "../../src/cmps/user/avatar";

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      loginOpen: false,
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.getLoggedInUser
        ? this.$store.getters.getLoggedInUser
        : null;
    },

    loggedinUserName() {
      if (this.$store.getters.getLoggedInUser) {
        return this.$store.getters.getLoggedInUser.fullName;
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
    avatar,
  },
};
</script>