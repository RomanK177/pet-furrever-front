<template>
  <section class="details" v-if="pet">
    <div class="details-container">
      <details-images :pet="pet"></details-images>
      <div class="bio-adoption-container flex">
        <details-about :pet="pet" @updateLikes="updatePet"></details-about>
        <div class="more-container">
          <div class="likes-adopt-container">
            <div class="adopt-fav flex column justify-center align-center">
              <el-button v-if="isActive" type="text" @click="adopt"
                >Adopt Me!</el-button
              >
              <div v-if="!isActive">Adoption Request Sent!</div>
              <pet-favorite
                :pet="pet"
                :loggedInUser="loggedInUser"
                @updateFavorites="updateFavorites"
              />
            </div>
            <hr />
            <div class="help-pet flex justify-center">
              <!-- <button class="sponsor">Sponsor</button> -->
              <a
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
              >
            </div>
          </div>
          <div class="petowner-details-container">
            <div
              class="pet-owner-details flex column space-between align-center"
            >
              <img v-if="pet.owner.imgUrlProfile"
                :src="require(`@/assets/imgs/person/${pet.owner.imgUrlProfile}`)"
                alt=""
                class="owner-img"
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
            <p class="pet-details-owner-location">{{pet.owner.ownerData.location.name}}</p>
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
      :loggedInUser="loggedInUser"
      @addComment="updateComments"
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
      // owner: {
      //   email: "",
      //   tel: "",
      //   fullName: "",
      //   ownerData: {
      //     location: {
      //       name: ''
      //     }
      //   },
      //   imgUrlProfile: "",
      // },
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
    updatePet(pet) {
      this.$store.dispatch({
        type: "savePet",
        pet,
      });
    },
    // async getOwnerById() {
    //   const ownerId = this.pet.owner._id;
    //   const owner = await userService.getById(ownerId);
    //   this.owner = owner;
    // },
    async sendRequest() {
      const req = {
        _id: utilService.makeId(),
        createdAt: Date.now(),
        user: {
          _id: this.loggedInUser._id,
          name: this.loggedInUser.fullName,
        },
        owner: {
          _id: this.owner._id,
          name: this.owner.fullName,
        },
        pet: {
          _id: this.pet._id,
          name: this.pet.name,
        },
        status: "pending",
      };
      await this.$store.dispatch({
        type: "addAdoptionRequest",
        request: req,
      });
      this.allAdoptions();
    },
    open() {
      this.$alert(
        `Please Log In or Sign Up In Order To Send An Adoption Request.
        To Sign Up: <router-link to="/signup">Click here</router-link>`,
        {
          confirmButtonText: "OK",
        }
      );
    },
    allAdoptions() {
      console.log("loggedinuser", this.loggedInUser);
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
      sessionStorage.user = JSON.stringify(user);
      this.$store.dispatch({
        type: "updateUser",
        savedUser: user,
      });
    },
    updateComments(comment) {
      this.pet.comments.unshift(comment);
      this.$store.dispatch({
        type: "savePet",
        pet: this.pet,
      });
    },
  },
  async created() {
    const { id } = this.$route.params;
    const pet = await petService.getPetById(id);
    this.pet = pet;
    console.log(this.pet)
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