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
</template>
<script>
import petLikes from '../pet/pet-likes.vue'
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
    },
  },
  components:{
      petLikes
  }
};
</script>

  