<template>
  <section class="pet-app container">
    <pet-filter @filter="changeFilter" @sort="setSort" @isFav="toggleFav" />
    <pet-list
      v-if="petsForPreview"
      :user="loggedUser"
      :pets="petsForPreview"
    ></pet-list>
  </section>
</template>

<script>
import petFilter from "../../cmps/pet/filtering/pet-filter.vue";
import petList from "../../cmps/pet/pet-list.vue";
import appFooter from "../../cmps/app-footer.vue";
import socketService from '../../services/socket-service.js';
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
    async addTreat(pet) {
      console.log('petid', pet)
      const newPet = await this.$store.dispatch({
        type: "addTreat",
        petId: pet._id,
      });
      await this.$store.dispatch({
        type: 'savePet',
        pet: newPet
      })
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
    socketService.setup();
    socketService.emit("treats topic", 'pet-app');
    socketService.on('treats addTreat', this.addTreat);
    // this.$store.dispatch({ type: "loadAdoptionRequests" });

    await this.$store.dispatch({ type: "loadUsers" });
  },
  destroyed() {
    socketService.off("treats addTreat", this.addTreat);
    socketService.terminate();
  },
};
</script>