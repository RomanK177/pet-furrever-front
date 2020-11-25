<template>
  <div class="home">
    <carousel></carousel>
    <h1>Homepage</h1>
  </div>
</template>

<script>
import appHeader from "../cmps/app-header.vue";
import carousel from "../cmps/carousel.vue";
export default {
  name: "Home",
  components: {
    appHeader,
    carousel,
  },
};
</script>
