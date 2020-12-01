<template>
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
    <p class="pet-about-p">{{ pet.about }}</p>
    <div class="pet-bio-container flex wrap space-between">
      <div class="pet-details-age flex column align-center">
         <img class="age-svg"
        src="../../assets/svgs/age.svg"
        alt=""
      />
      <p class="pet-details-p">Age: {{ pet.age }}</p>
      </div>
      <div class="pet-details-gender flex column align-center">
         <img class="gender-svg"
        src="../../assets/svgs/gender.svg"
        alt=""
      />
      <p class="pet-details-p">Gender: {{ pet.gender }}</p>
      </div>
      <div class="pet-details-breed flex column align-center">
      <img src="../../assets/svgs/breed.svg" alt="" class="breed-svg" />
      <p class="pet-details-p">Breed: {{ pet.breed }}</p>
      </div>
    </div>
    <hr>
    <small>If you are interested in meeting or adopting {{pet.name}}, please inquire here on PetFurrever or reach out to {{pet.owner.fullName}}'s email {{pet.owner.email}}, and we will happily arrange the adoption for you if you are deemed a proper fit! Thank you. </small>
  </div>
</template>
<script>
import petLikes from "../pet/pet-likes.vue";
export default {
  name: "detailImages",
  props: {
    pet: {
      type: Object,
    },
  },
  methods: {
    emitUpdateLikes(pet) {
      this.$emit("updateLikes", pet);
      console.log
    },
  },
  components: {
    petLikes,
  },
};
</script>

  