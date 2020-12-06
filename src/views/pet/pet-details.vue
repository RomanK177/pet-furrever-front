<template>
  <section class="pet-details" v-if="pet">
    <div class="details container">
      <details-images :pet="pet"></details-images>
      <div class="bio-adoption-container flex justify-center">
        <div class="flex column">
          <details-about
            :pet="pet"
            :loggedInUser="getLoggedInUser"
            @updateFavorites="updateFavorites"
          ></details-about>
        </div>

        <div class="likes-adopt-container flex column align-center">
          <div class="adopt-fav flex column justify-center align-center">
            <el-button
              class="add-pet"
              v-if="isActive && !isAdopted"
              type="text"
              @click="requestAdopt"
              >Adopt Me</el-button
            >
            <div v-if="!isActive">Adoption Request Sent!</div>
          </div>
          <!-- <hr /> -->
          <div class="petowner-details-container">
            <div
              class="pet-owner-details flex column space-between align-center"
            >
              <img
                v-if="pet.owner.imgUrlProfile"
                :src="
                  require(`@/assets/imgs/person/${pet.owner.imgUrlProfile}`)
                "
                alt=""
                class="pet-owner-img"
              />
              <router-link
                class="pet-details-owner-name"
                :to="`/user/${pet.owner._id}`"
                >{{ pet.owner.fullName }}</router-link
              >
            </div>
            <p class="location-details flex flex-start">
              <img
                src="../../assets/svgs/location.svg"
                alt=""
                class="location-svg"
              />
              {{ pet.owner.ownerData.location.name }}
              <!-- Location Address -->
            </p>
            <!-- <p class="pet-details-owner-location">
              {{ pet.owner.ownerData.location.name }}
            </p> -->
            <hr />
            <p class="pet-details-owner-email flex flex-start">
              <img src="../../assets/svgs/email.svg" alt="" class="email-svg" />
              {{ pet.owner.email }}
            </p>
            <hr />
            <p class="pet-details-owner-tel flex flex-start">
              <img src="../../assets/svgs/phone.svg" alt="" class="phone-svg" />
              {{ pet.owner.tel }}
            </p>
            <hr />
          </div>
        </div>
      </div>
      <pet-comments
        :comments="pet.comments"
        :loggedInUser="getLoggedInUser"
        @addComment="addComment"
      ></pet-comments>
    </div>
  </section>
</template>
<script>
import { petService } from "../../services/pet-service.js";
import notLoggedIn from "../../cmps/pet/not-loggedin.vue";
import detailsImages from "../../cmps/pet/details-images.vue";
import detailsAbout from "../../cmps/pet/details-about.vue";
import petComments from "../../cmps/pet/pet-comments.vue";
import petFavorite from "../../cmps/pet/pet-favorite";
import { utilService } from "../../services/util-service.js";
import { userService } from "../../services/user-service.js";
import socketService from '../../services/socket-service.js'
export default {
  name: "petDetails",
  data() {
    return {
      pet: null,
      loggedInUser: null,
      isActive: null,
      isAdopted: null,
    };
  },
  methods: {
    requestAdopt() {
      // const loggedInUser = this.$store.getters.getLoggedInUser;
      if (this.loggedInUser === null) {
        this.open();
      } else {
        this.sendRequest();
      }
    },
    async addTreat(pet) {
      console.log("pet", pet);
      const newPet = await this.$store.dispatch({
        type: "addTreat",
        petId: pet._id,
      });
      await this.$store.dispatch({
        type: "savePet",
        pet: newPet,
      });    },
    // addTreat(petId) {
    //   this.$store.dispatch({
    //     type: "addTreat",
    //     petId: petId,
    //   });
    // },
    async sendRequest() {
      const petId = this.pet._id;
      await this.$store.dispatch({
        type: "addAdoptionRequest",
        petId,
      });

      this.allAdoptions();
    },
    open() {
      this.$alert(
        `Please Log In or Sign Up In Order To Send An Adoption Request`,
        {
          confirmButtonText: "OK",
        }
      );
    },
    allAdoptions() {
      const loadedAdoptions = this.$store.getters.getAdoptionRequests;
      const filteredAdoptions = loadedAdoptions.filter(
        (adoption) => adoption.pet._id === this.pet._id
      );
      const isSentRequest = filteredAdoptions.some(
        (adoption) => adoption.adopter._id === this.loggedInUser._id
      );
      this.isActive = !isSentRequest;
    },
    updateFavorites(user) {
      this.$store.dispatch({
        type: "updateUser",
        savedUser: user,
      });
    },
    async addComment(comment) {
      await this.$store.dispatch({
        type: "addComment",
        petId: this.pet._id,
        comment,
      });
      this.getPet();
    },
    async getPet() {
      const pet = await this.$store.dispatch({
        type: "getPetById",
        petId: this.pet._id,
      });
      this.pet = pet;
    },
  },
  computed: {
    getLoggedInUser() {
      // this.loggedInUser = this.$store.getters.getLoggedInUser;
      // return this.loggedInUser;
      return this.$store.getters.getLoggedInUser;
    },
  },
  async created() {
    const petId = this.$route.params.id;
    const pet = await this.$store.dispatch({
      type: "getPetById",
      petId,
    });
    this.pet = pet;
     socketService.setup();
    socketService.emit("treats topic", 'pet-details');
    socketService.on("treats addTreat", this.addTreat);
    this.pet.adoptedAt ? (this.isAdopted = true) : (this.isAdopted = false);
    this.loggedInUser = this.$store.getters.getLoggedInUser;
    await this.$store.dispatch({ type: "loadAdoptionRequests" });
    if (this.loggedInUser === null) {
      this.isActive = true;
      return;
    } else {
      this.allAdoptions();
    }
  },
  destroyed() {
    socketService.off("treats addTreat", this.addTreat);
    socketService.terminate();
  },
  components: {
    notLoggedIn,
    detailsImages,
    detailsAbout,
    petComments,
    petFavorite,
  },
};
</script>