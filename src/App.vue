<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <app-header></app-header>
    </div>
    <router-view/>
  </div>
</template>

<script>
import appHeader from "./cmps/app-header.vue"
export default {
    components: {
        appHeader,
       
    },
};
</script>

<style>
</style>



