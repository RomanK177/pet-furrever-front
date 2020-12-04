<template>
  <section class="pet-app container">
    <pet-filter @filter="changeFilter" @sort="setSort" @isFav="toggleFav" />
    <pet-list
      v-if="petsForPreview"
      :user="loggedUser"
      :pets="petsForPreview"
      @addTreat="addTreat"
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
      console.log(
        "🚀 ~ file: pet-app.vue ~ line 35 ~ changeFilter ~ filter",
        filter
      );
      this.$store.dispatch({ type: "filterPets", filter });
    },
    // deletePet(petId) {
    //   this.$store.dispatch({
    //     type: "deletePet",
    //     petId,
    //   });
    // },
    async addTreat(petId) {
      await this.$store.dispatch({
        type: "addTreat",
        petId: petId,
      });
    },
    // goToAddPet() {
    //   this.$router.push("/edit");
    // },
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
  async created() {
    await this.$store.dispatch({ type: "loadPets" });
    // this.$store.dispatch({ type: "loadAdoptionRequests" });

    // this.$store.dispatch({ type: "loadUsers" });
  },
};
</script>