<template>
  <section class="details" v-if="pet">
    <div class="details-container">
      <details-images :pet="pet"></details-images>
      <div class="bio-adoption-container flex">
        <details-about :pet="pet"></details-about>
        <div class="more-container">
          <div class="likes-adopt-container">
            <div class="adopt-fav flex column justify-center">
              <el-button v-if="isActive" type="text" @click="adopt"
                >Adopt Me!</el-button
              >
              <div v-if="!isActive">Adoption Request Sent!</div>
              <!-- <button @click="allAdoptions">do it</button> -->
              <!-- <div class="save-pet flex space-between">
                <button class="favorite-pet flex space-between">
                  <img src="../../assets/svgs/like.svg" alt="" class="like-svg" />
                  Favorite {{ pet.name }}</button>
              </div> -->
              <pet-fevorite :pet="pet" :loggedInUser="loggedInUser" />
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
              <!-- <button class="share">Share</button> -->
            </div>
          </div>
          <div class="petowner-details-container">
            <div
              class="pet-owner-details flex column space-between align-center"
            >
              <img
                :src="require(`@/assets/imgs/person/${pet.owner.imgUrl}`)"
                alt=""
                class="owner-img"
              />
              <router-link
                class="pet-details-owner-name"
                :to="`/user/${pet.owner._id}`"
                >{{ pet.owner.name }}</router-link
              >
            </div>
            <!-- <p class="pet-details-owner-name">{{ pet.owner.name }}</p> -->
            <p class="location-details flex flex-start">
              <img
                src="../../assets/svgs/location.svg"
                alt=""
                class="location-svg"
              />
              Location Address
            </p>
            <p class="pet-details-owner-location">{{ pet.owner.location }}</p>
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
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <pet-comments :pet="pet"></pet-comments>
  </section>
</template>

<script>
import { petService } from "../../services/pet-service.js";
import notLoggedIn from "../../cmps/pet/not-loggedin.vue";
import detailsImages from "../../cmps/pet/details-images.vue";
import detailsAbout from "../../cmps/pet/details-about.vue";
import petComments from "../../cmps/pet/pet-comments.vue";
import petFevorite from "../../cmps/pet/pet-fevorite";
import { utilService } from "../../services/util-service.js";

export default {
  name: "petDetails",
  data() {
    return {
      pet: null,
      loggedInUser: null,
      isActive: null,
    };
  },

  methods: {
    adopt() {
      const loggedInUser = this.$store.getters.getLoggedInUser;
      if (loggedInUser === null) {
        this.open();
      } else {
        this.sendRequest();
        console.log("request sent");
        // this.allAdoptions();
      }
    },
    async sendRequest() {
      const req = {
        _id: utilService.makeId(),
        createdAt: Date.now(),
        user: {
          _id: this.loggedInUser._id,
          name: this.loggedInUser.fullName,
        },
        owner: {
          _id: this.pet.owner._id,
          name: this.pet.owner.name,
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
        "Please Log In or Sign Up In Order To Send An Adoption Request.",
        {
          confirmButtonText: "OK",
        }
      );
    },
    // active(){
    //   this.allAdoptions
    //   this.isActive = true
    // },
    allAdoptions() {
      console.log("loggedin user id beggining", this.loggedInUser._id);
      const loadedAdoptions = this.$store.getters.getAdoptionRequests;
      console.log("loaded adoptions", loadedAdoptions);
      const filteredAdoptions = loadedAdoptions.filter(
        (adoption) => adoption.pet._id === this.pet._id
      );
      const isSentRequest = filteredAdoptions.some(
        (adoption) => adoption.user._id === this.loggedInUser._id
      );
      console.log("adoption user", filteredAdoptions);
      console.log("pet id", this.pet._id);
      console.log("loggedInUser", this.loggedInUser._id);
      console.log("isSent", isSentRequest);
      this.isActive = !isSentRequest;

      // if (isSentRequest) {
      //  this.isActive = true;
      // } else {
      //   this.isActive = false
      // }
    },
  },
  computed: {},

  async created() {
    const { id } = this.$route.params;
    console.log(id);
    const pet = await petService.getPetById(id);
    this.pet = pet;
    console.log("created pet", pet);
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
    petFevorite,
  },
};
</script>