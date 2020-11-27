<template>
  <section class="details" v-if="pet">
    <div class="details-container">
      <div class="details-images">
        <img
          v-for="(imgUrl, index) in pet.imgUrls"
          :key="index"
          :src="require(`@/assets/imgs/pets/${imgUrl}`)"
          alt=""
          :class="{
            item0: index === 0,
            item1: index === 1,
            item2: index === 2,
            item3: index === 3,
            item4: index === 4,
          }"
        />
      </div>
      <h1 class="pet-details-name">{{ pet.name }}</h1>
      <p class="treats">Treat Count: {{ pet.numOfTreats }}</p>
      <button class="adopt-btn">Adopt Me!</button>
      <button class="treat-btn">Send Me a Treat!</button>
      <p class="pet-bio">
        A little About {{ pet.name }}: {{ pet.description }}
      </p>
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
      <img src="../../assets/imgs/search.png" alt="" class="breed-icon">
      <p class="pet-details-breed">Breed: {{ pet.breed }}</p>
      <!-- <ul>
      <li
        v-for="(tag, index) in pet.tags"
        :key="index"
        class="pet-details-tags"
      >
        {{ tag }}
      </li>
      </ul> -->
      <img :src="require(`@/assets/imgs/person/${pet.owner.imgUrl}`)" alt="" class="owner-img" />
      <p class="pet-details-owner-name">Rescue: {{ pet.owner.name }}</p>
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
    </div>
  </section>
</template>

<script>
import { petService } from "../../services/pet-service.js";
export default {
  name: "petDetails",
  data() {
    return {
      pet: null,
    };
  },
  async created() {
    const { id } = this.$route.params;
    console.log(id);
    const pet = await petService.getPetById(id);
    this.pet = pet;
  },
  components: {},
};
</script>