<template>
  <section class="details" v-if="pet">
    <div class="details-container">
      <details-images :pet="pet"></details-images>
      <div class="bio-adoption-container flex wrap">
        <div class="pet-details-container">
          <h1 class="pet-details-name">Hi, I'm {{ pet.name }}!</h1>
          <hr />
          <pet-likes
            :pet="pet"
            @updateLikes="emitUpdateLikes"
            id="animated-example"
            class="animated tada"
          />
          <h4 class="pet-about">Meet {{ pet.name }}!</h4>
          <p>{{ pet.description }}</p>
          <div class="pet-bio-container flex wrap space-between">
            <p class="pet-details-age">Age: {{ pet.age }}</p>
            <img
              class="svg-symbol male"
              v-if="pet.gender === 'male'"
              src="../../assets/svgs/male-symbol.svg"
              alt=""
            />
            <img
              class="svg-symbol female"
              v-if="pet.gender === 'female'"
              src="../../assets/svgs/female-symbol.svg"
              alt=""
            />
            <p class="pet-details-gender">Gender: {{ pet.gender }}</p>
            <img src="../../assets/imgs/search.png" alt="" class="breed-icon" />
            <p class="pet-details-breed">Breed: {{ pet.breed }}</p>
          </div>
        </div>
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
            <!-- <button class="btn adopt-btn" @click="adopt">
            Adopt Me!
          </button> -->
          </div>
        </div>
      </div>
      <div class="comments-container">
        <h1 class="pet-details-comments-title">Comments</h1>
        <hr />
        <ul>
          <li
            v-for="(comment, index) in pet.comments"
            :key="index"
            class="pet-details-comments"
          >
            {{ comment.userName }}: {{ comment.comment }}
          </li>
        </ul>
        <input class="comment-input" type="text" placeholder="Add a Comment" />
      </div>
    </div>
  </section>
</template>

<script>
import { petService } from "../../services/pet-service.js";
import petLikes from "../../cmps/pet/pet-likes.vue";
import notLoggedIn from "../../cmps/pet/not-loggedin.vue";
import detailsImages from '../../cmps/pet/details-images.vue'
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
    emitUpdateLikes(pet) {
      this.$emit("updateLikes", pet);
    },
    adopt() {
      const loggedInUser = this.$store.getters.getLoggedInUser;
      // loggedInUser = this.loggedInUser
      if (loggedInUser === null) {
        this.open();
      }
    },
    open() {
      //  this.isModal = true
      console.log("You need to log in!");
      this.$alert("Please Log In In Order To Send An Adoption Request.", {
        confirmButtonText: "OK",
      });
    },
    showButton() {
      console.log(this.$route);
    },
  },
  async created() {
    const { id } = this.$route.params;
    console.log(id);
    const pet = await petService.getPetById(id);
    this.pet = pet;
  },
  components: {
    petLikes,
    notLoggedIn,
    detailsImages
  },
};
</script>