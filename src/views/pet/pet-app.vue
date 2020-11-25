<template>
  <section class="pet-app">
    <pet-filter @filter="changeFilter" />
    <pet-list
      v-if="petsForPreview"
      :user="loggedUser"
      :pets="petsForPreview"
      @deletePet="deletePet"
    ></pet-list>
    <app-footer></app-footer>
  </section>
</template>

<script>
import petFilter from "../../cmps/pet/filtering/pet-filter";
import petList from "../../cmps/pet/pet-list";
export default {
  name: "pet-app.vue",
  props: {},
  data() {
    return {
      pets: null,
    };
  },
  computed: {
    petsForPreview() {
      return this.$store.getters.petsForPreview;
    },
    loggedUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    changeFilter(filter) {
      console.log("filter in change filter", filter);
      this.$store.dispatch({ type: "filterPets", filter });
    },
    deletePet(petId) {
      this.$store.dispatch({
        type: "deletePet",
        petId,
      });
    },
    goToAddPet() {
      this.$router.push("/edit");
    },
  },
  components: {
    petFilter,
    petList,
  },
};
</script>