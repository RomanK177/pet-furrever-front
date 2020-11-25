<template>
  <section class="pet-app">
    <filter />
  </section>
</template>

<script>
import filter from "../../cmps/pet/pet-filter";
export default {
  name: "Pet App",
  props: {
    msg: String,
  },
  components: {
    filter,
  },
};
</script>