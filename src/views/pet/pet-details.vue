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
      <div class="bio-adoption-container flex wrap">
        <div class="pet-details-container">
          <h1 class="pet-details-name">{{ pet.name }}</h1>
          <hr>
          <button class="btn treat-btn" >Send Me a Treat!</button>
          <p class="treats">Treat Count: {{ pet.numOfTreats }}</p>
          <h4 class="pet-about"> About:</h4>
            <!-- A little About {{ pet.name }}: {{ pet.description }} -->
          <p>{{pet.description}}</p>
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
          <!-- <ul>
      <li
        v-for="(tag, index) in pet.tags"
        :key="index"
        class="pet-details-tags"
      >
        {{ tag }}
      </li>
      </ul> -->
      </div>
        </div>
        <div class="petowner-details-container">
          <img
            :src="require(`@/assets/imgs/person/${pet.owner.imgUrl}`)"
            alt=""
            class="owner-img"
          />
          <p class="pet-details-owner-name">Rescue: {{ pet.owner.name }}</p>
            <button class="btn adopt-btn">Adopt Me!</button>
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
        </div>
      </div>
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