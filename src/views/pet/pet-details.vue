<template>
  <section class="pet-details" v-if="pet">
    <h1>{{ pet.name }}</h1>
    <div class="pet-details-images">
      <img v-for="(imgUrl, index) in pet.imgUrls" :key="index" :src="require(`@/assets/imgs/pets/${imgUrl}`)" alt="" :class="{item0: index === 0, item1: index === 1, item2: index === 2, item3: index === 3, item4: index === 4}" />
      </div>
    <!-- <img :src="require(`@/assets/imgs/pets/${pet.imgUrls[0]}`)" alt="" class="pet-details-img" /> -->
    <p class="treats"> Treat Count: {{ pet.numOfTreats }}</p>
    <button class="adopt-btn">Adopt Me!</button>
    <button class="treat-btn">Send Me a Treat!</button>
    <p class="pet-bio">A little About {{pet.name}}: {{ pet.description }}</p>
    <p class="pet-details-age">Age: {{ pet.age }}</p>
    <p class="pet-details-gender">Gender: {{ pet.gender }}</p>
    <p class="pet-details-breed">Breed: {{ pet.breed }}</p>
    <ul>
      <li v-for="(tag, index) in pet.tags" :key="index" class="pet-details-tags">
        {{ tag }}
      </li>
      <img :src="pet.owner.imgUrl" alt="" class="pet-details-owner-img"/>
      <p class="pet-details-owner-name">Rescue: {{ pet.owner.name }}</p>
      <h1 class="pet-details-comments-title">Comments</h1>
      <hr>
      <ul>
         <li v-for="(comment, index) in pet.comments" :key="index" class="pet-details-comments">
          {{comment.userName}}: {{comment.comment}}

        </li>
      </ul>
    </ul>
  </section>
</template>

<script>
import {petService} from '../../services/pet-service.js'
export default {
  name: "petDetails",
  data() {
    return {
      pet: null
    };
  },
  async created() {
    const { id } = this.$route.params;
    console.log(id)
    const pet =  await petService.getPetById(id)
    this.pet = pet;
  },
  components: {

  }
};
</script>