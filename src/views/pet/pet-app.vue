<template>
  <section class="pet-app">
    <pet-filter @filter="changeFilter" @sort="setSort" @isFav="toggleFav" />
    <pet-list
      v-if="petsForPreview"
      :user="loggedUser"
      :pets="petsForPreview"
      @deletePet="deletePet"
      @updateLikes="addTreat"
    ></pet-list>
  </section>
</template>

<script>
import petFilter from "../../cmps/pet/filtering/pet-filter.vue";
import petList from "../../cmps/pet/pet-list.vue";
import appFooter from "../../cmps/app-footer.vue";
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
      this.$store.dispatch({ type: "filterPets", filter });
    },
    deletePet(petId) {
      this.$store.dispatch({
        type: "deletePet",
        petId,
      });
    },
    async addTreat(pet) {
      await this.$store.dispatch({
        type: "addTreat",
        petId: pet._id,
      });
    },
    goToAddPet() {
      this.$router.push("/edit");
    },
    setSort(sortBy) {
      this.$store.dispatch({ type: "sortPets", sortBy });
    },
    toggleFav() {},
  },
  components: {
    petFilter,
    petList,
    appFooter,
  },
  created() {
    this.$store.dispatch({ type: "loadPets" });
    // this.$store.dispatch({ type: "loadAdoptionRequests" });

    // this.$store.dispatch({ type: "loadUsers" });
  },
};
</script>