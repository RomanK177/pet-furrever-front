<template>
  <section class="pet-app">
    <pet-filter />
  </section>
</template>

<script>
import petFilter from "../../cmps/pet/pet-filter";
export default {
  name: "pet-app.vue",
  props: {
    msg: String,
  },
  components: {
    petFilter,
  },
};
</script>