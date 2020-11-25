<template>
  <section class="pet-app">
    <pet-filter @filter="changeFilter" />
  </section>
</template>

<script>
import petFilter from "../../cmps/pet/filtering/pet-filter";
export default {
  name: "pet-app.vue",
  props: {},
  methods: {
    changeFilter(filter) {
      this.$store.dispatch({ type: "filterPets", filter });
    },
  },
  components: {
    petFilter,
  },
};
</script>