<template>
  <section class="header flex space-between container">
    <router-link to="/" class="logo"><span>Fur</span>Ever</router-link>
    <nav class="navbar flex align-center content-center">
      <router-link to="/pet" class="nav-link">All Pets</router-link>
      <div @click.stop="toggleUserMenu">
        <!-- <messages-status :requests="requests" /> -->
        <avatar v-if="loggedinUser" :name="loggedinUserName" />

        <div
          :class="{ userDropedMenu: loggedinUser }"
          v-if="showUserMenu || !loggedinUser"
        >
          <router-link
            class="nav-link"
            v-if="loggedinUser"
            :to="'/user/edit/' + loggedinUser._id"
            >Edit</router-link
          >
          <router-link
            v-if="loggedinUser"
            :to="`/user/${loggedinUser._id}`"
            class="nav-link"
          >
            Profile
          </router-link>
          <router-link v-else to="/signup" class="nav-link">SignUp</router-link>
          <a
            v-if="!loggedinUser"
            @click="loginOpen = !loginOpen"
            class="nav-link"
            >Login</a
          >
          <a v-else @click="logout" class="nav-link">Logout</a>
        </div>
        <login @closeMenu="closeMenu" v-if="loginOpen" class="login" />
      </div>
    </nav>
  </section>
</template>

<script>
import eventBus from '../services/event-bus-service.js';
import login from './login.vue';
import avatar from '../../src/cmps/user/avatar';
// import messagesStatus from "./../cmps/user/messages-status.vue";

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      loginOpen: false,
      showUserMenu: false,
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
        return 'Guest';
      }
    },
    requests() {
      return this.$store.getters.getAdoptionRequests;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch({
        type: 'logout',
      });
      if (this.$route.path != '/pet') {
        this.$router.push('/pet');
      }
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    closeMenu() {
      this.showUserMenu = false;
    },
  },
  created() {
    eventBus.$on('login', () => {
      this.loginOpen = false;
    }),
      eventBus.$on('closeModal', () => {
        this.loginOpen = false;
      });
  },

  components: {
    login,
    avatar,
    // messagesStatus,
  },
};
</script>
