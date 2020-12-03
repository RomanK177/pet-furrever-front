 
<template>
  <section
    @mouseover="showButtons"
    @mouseleave="hideButtons"
    class="adoption-request-preview"
  >
    <div class="prev-content flex">
      <span class="requsted-id">{{ request._id }}</span>
      <span class="requsted-by">
        <router-link :to="`/user/${request.user._id}`">{{
          request.user.name
        }}</router-link>
      </span>
      <span class="requsted-pet">
        <router-link :to="`/pet/${request.pet._id}`">{{
          request.pet.name
        }}</router-link>
      </span>
      <span class="requsted-at">{{ sentTime }}</span>
      <span class="requsted-status">{{ statusCap }}</span>

      <div v-if="checkIfOwner" class="approve">
        <img
          @click="emiUpdateAdoptionRequest(true)"
          src="../../assets/imgs/green-check.png"
          alt=""
        />
      </div>
      <div class="decline">
        <img
          @click="emiUpdateAdoptionRequest(false)"
          src="../../assets/imgs/red-x.png"
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<script>
import { petService } from "../../services/pet-service.js";
export default {
  name: "adoptionrequestPreview",
  props: {
    request: Object,
  },
  data() {
    return {
      areButtonsShown: false,
      pet: undefined,
    };
  },
  methods: {
    // async getAdopter() {
    //   let adopter = await this.$store.getters.getUserById(adopterId);
    //   return adopter;
    // },
    showButtons() {
      this.areButtonsShown = true;
    },
    hideButtons() {
      this.areButtonsShown = false;
    },
    emiUpdateAdoptionRequest(action) {
      if (action === true) {
        this.request.status = "approved";
      } else {
        this.request.status = "declined";
      }
      this.$emit("updateAdoption", this.request);
    },
  },
  computed: {
    sentTime() {
      let d = new Date(this.request.createdAt);
      return d.toDateString();
    },
    statusCap() {
      return (
        this.request.status.charAt(0).toUpperCase() +
        this.request.status.slice(1)
      );
    },
    getPetById() {
      let pet = this.$store.getters.getPetById(this.request.pet._id);
      return pet;
    },
    checkIfOwner() {
      var loggedInUser = this.$store.getters.getLoggedInUser;
      return loggedInUser && loggedInUser.userType === 'owner';
    },
  },
  async created() {
    const pet = await petService.getPetById(this.request.pet._id);
    this.pet = pet;
  },
};
</script>