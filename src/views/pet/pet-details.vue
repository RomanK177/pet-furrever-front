<template>
  <section class="pet-details" v-if="pet">
    <div class="details container">
      <details-images :pet="pet"></details-images>
      <div class="bio-adoption-container flex justify-center">
        <details-about
          :pet="pet"
          :loggedInUser="getLoggedInUser"
          @updateLikes="addTreat"
          @updateFavorites="updateFavorites"
        ></details-about>
        <div class="more-container">
          <div class="likes-adopt-container">
            <div class="adopt-fav flex column justify-center align-center">
              <el-button
                v-if="isActive && !isAdopted"
                type="text"
                @click="adopt"
                >Adopt Me</el-button
              >
              <div v-if="!isActive">Adoption Request Sent!</div>
              <!-- <pet-favorite
                :pet="pet"
                :loggedInUser="loggedInUser"
                @updateFavorites="updateFavorites"
              /> -->
            </div>
            <hr />
            <div class="help-pet flex justify-center">
              <!-- <button class="sponsor">Sponsor</button> -->
              <!-- <a
                href="https://www.facebook.com/login"
                target="_blank"
                class="share"
              >
                <img
                  src="../../assets/svgs/share.svg"
                  alt=""
                  class="share-svg"
                />
                Share</a
              > -->
            </div>
          </div>
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
              Location Address
            </p>
            <p class="pet-details-owner-location">
              {{ pet.owner.ownerData.location.name }}
            </p>
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
    </div>
    <!-- <pet-comments :pet="pet"></pet-comments> -->
    <pet-comments
      :comments="pet.comments"
      :loggedInUser="getLoggedInUser"
      @addComment="addComment"
    ></pet-comments>
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
    adopt() {
      // const loggedInUser = this.$store.getters.getLoggedInUser;
      if (this.loggedInUser === null) {
        this.open();
      } else {
        this.sendRequest();
      }
    },
    addTreat(pet) {
      this.$store.dispatch({
        type: "addTreat",
        petId: pet._id,
      });
    },
    async sendRequest() {
      debugger;
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
        (adoption) => adoption.user._id === this.loggedInUser._id
      );
      this.isActive = !isSentRequest;
    },
    updateFavorites(user) {
      console.log(
        "🚀 ~ file: pet-details.vue ~ line 191 ~ updateFavorites ~ user",
        user
      );
      // sessionStorage.user = JSON.stringify(user);
      // this.$store.dispatch({
      //   type: "updateUser",
      //   savedUser: user,
      // });
    },
    // updateComments(comment) {
    //   debugger
    //   this.pet.comments.unshift(comment);
    //   this.$store.dispatch({
    //     type: "savePet",
    //     pet: this.pet,
    //   });
    // },

    addComment(comment) {
      this.$store.dispatch({
        type: "addComment",
        petId: this.pet._id,
        comment,
      });
    },
  },
  computed: {
    getLoggedInUser() {
      this.loggedInUser = this.$store.getters.getLoggedInUser;
      return this.loggedInUser;
    },
  },
  async created() {
    const petId = this.$route.params.id;
    const pet = await this.$store.dispatch({
      type: "getPetById",
      petId,
    });
    this.pet = pet;
    this.pet.adoptedAt ? (this.isAdopted = true) : (this.isAdopted = false);
    // const ownerId = this.pet.owner._id;
    // const owner = await userService.getById(ownerId);
    // this.owner = owner;
    this.loggedInUser = this.$store.getters.getLoggedInUser;
    await this.$store.dispatch({ type: "loadAdoptionRequests" });
    if (this.loggedInUser === null) {
      this.isActive = true;
      return;
    } else {
      this.allAdoptions();
    }
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