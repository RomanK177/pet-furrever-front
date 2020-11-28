<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <app-header></app-header>
    </div>
    <router-view />
  </div>
</template>

<script>
import appHeader from "./cmps/app-header.vue"
export default {
    created() {
      if (sessionStorage.user) {
        var localLoggedinUser = JSON.parse(sessionStorage.user);
        this.$store.dispatch({
          type: 'setUser',
          user: localLoggedinUser
        })
      }
    },
    components: {
        appHeader,
       
    },
};
</script>

<style>
</style>



