<template>
  <div class="pet-details-container">
    <div class="details-header flex space-between align-center">
      <h1 class="pet-details-name flex align center">
        Hi, I'm {{ pet.name }}!
      </h1>
      <div class="fav-treat-share flex align-center">
        <pet-likes
          :pet="pet"
          class="details-treat-likes"
        />
        <!-- <pet-favorite
          :pet="pet"
          :loggedInUser="loggedInUser"
          @updateFavorites="emitUpdateFavorites"
        /> -->
        <a href="https://www.facebook.com/login" target="_blank" class="share">
          <img src="../../assets/svgs/share.svg" alt="" class="share-svg" />
        </a>
      </div>
    </div>
    <!-- <hr /> -->
    <div class="pet-about-container">
      <div class="pet-about-details flex wrap space-between align-end">
        <h4 class="pet-about">Meet {{ pet.name }}!</h4>
        <div class="pet-bio-container flex wrap space-between">
          <div class="pet-details-age flex column align-center">
            <img class="age-svg" src="../../assets/svgs/age.svg" alt="" />
            <p class="pet-details-p">
              <span class="bold">Age:</span> {{ pet.age }}
            </p>
          </div>
          <div class="pet-details-gender flex column align-center">
            <img class="gender-svg" src="../../assets/svgs/gender.svg" alt="" />
            <p class="pet-details-p">
              <span class="bold">Gender:</span> {{ pet.gender }}
            </p>
          </div>
          <div class="pet-details-breed flex column align-center">
            <img src="../../assets/svgs/breed.svg" alt="" class="breed-svg" />
            <p class="pet-details-p">
              <span class="bold">Breed:</span> {{ pet.breed }}
            </p>
          </div>
        </div>
      </div>
      <p class="pet-about-p">{{ pet.about }}</p>
      <hr />
      <small
        >If you are interested in meeting or adopting {{ pet.name }}, please
        inquire here on PetFurrever or reach out to {{ pet.owner.fullName }}'s
        email {{ pet.owner.email }}, and we will happily arrange the adoption
        for you if you are deemed a proper fit! Thank you.
      </small>
    </div>
  </div>
</template>
<script>
import petLikes from "../pet/pet-likes.vue";
import petFavorite from "../pet/pet-favorite.vue";
import socketService from '../../services/socket-service.js';
export default {
  name: "detailAbout",
  props: {
    pet: {
      type: Object,
    },
    loggedInUser: {
      type: Object,
    },
  },
  methods: {
    // emitAddTreat(pet) {
    //   // this.$emit("addTreat", pet);
    //   // socketService.emit("treats newTreat", this.pet);

    // },
    emitUpdateFavorites(user) {
      this.$emit("updateFavorites", user);
    },
    // computed: {},
  },
  components: {
    petLikes,
    petFavorite,
  },
};
</script>

  