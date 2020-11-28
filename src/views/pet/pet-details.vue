<template>
  <section class="details" v-if="pet">
    <div class="details-container">
      <details-images :pet="pet"></details-images>
      <div class="bio-adoption-container flex wrap">
        <details-about :pet="pet"></details-about>
        <div class="more-container">
          <div class="likes-adopt-container">
            <div class="adopt-fav flex column">
              <el-button type="text" @click="adopt">Adopt Me!</el-button>
              <div class="save-pet flex space-between">
                <img src="../../assets/svgs/like.svg" alt="" class="like-svg" />
                <button class="favorite-pet">Favorite {{ pet.name }}</button>
              </div>
            </div>
            <hr />
            <div class="help-pet flex">
              <button class="sponsor">Sponsor</button>
              <button class="share">Share</button>
            </div>
          </div>
          <div class="petowner-details-container">
            <img
              :src="require(`@/assets/imgs/person/${pet.owner.imgUrl}`)"
              alt=""
              class="owner-img"
            />
            <p class="pet-details-owner-name">{{ pet.owner.name }}</p>
            <p>Location Address</p>
            <p class="pet-details-owner-name">{{ pet.owner.location }}</p>
            <hr />
            <p class="pet-details-owner-name">{{ pet.owner.email }}</p>
            <hr />
            <p class="pet-details-owner-name">{{ pet.owner.tel }}</p>
            <hr />
          </div>
        </div>
      </div>
      <pet-comments :pet="pet"></pet-comments>
    </div>
  </section>
</template>

<script>
import { petService } from "../../services/pet-service.js";
import notLoggedIn from "../../cmps/pet/not-loggedin.vue";
import detailsImages from "../../cmps/pet/details-images.vue";
import detailsAbout from "../../cmps/pet/details-about.vue";
import petComments from "../../cmps/pet/pet-comments.vue";
import { utilService } from "../../services/util-service.js";

export default {
  name: "petDetails",
  data() {
    return {
      pet: null,
      loggedInUser: null,
      // isModal: false
    };
  },

  methods: {
    adopt() {
      const loggedInUser = this.$store.getters.getLoggedInUser;
      if (loggedInUser === null) {
        this.open();
      } else {
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
        this.$store.dispatch({
          type: "addAdoptionRequest",
          request: req
        });
      }
    },
    open() {
      this.$alert("Please Log In or Sign Up In Order To Send An Adoption Request.", {
        confirmButtonText: "OK",
      });
    },
  },
  async created() {
    const { id } = this.$route.params;
    console.log(id);
    const pet = await petService.getPetById(id);
    this.pet = pet;
    this.loggedInUser = this.$store.getters.getLoggedInUser;
  },
  components: {
    notLoggedIn,
    detailsImages,
    detailsAbout,
    petComments,
  },
};
</script>