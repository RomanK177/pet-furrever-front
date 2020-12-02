<template>
  <div id="app">
    <div id="nav" class="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <app-header></app-header>
    </div>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from "./cmps/app-header.vue"
import appFooter from "./cmps/app-footer.vue"
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
        appFooter
       
    },
};
</script>

<style>
</style>



