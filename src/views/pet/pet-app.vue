<template>
<section class="pet-app">
  <pet-filter @filter="changeFilter" />
  <pet-list></pet-list>
  <app-footer></app-footer>
</section>
</template>

<script>
import petFilter from "../../cmps/pet/filtering/pet-filter.vue";
import petList from '../../cmps/pet/pet-list.vue'
import appFooter from '../../cmps/app-footer.vue'
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
    petList,
    appFooter
  },
};
</script>