
<template>
  <section class="pet-likes">
    <div class="flex space-between align-center">
      <div class="pet-like-btns flex align-center" @click.stop="addTreat">
        <img
          :class="{ treatClicked: treat }"
          class="svg-symbol treat"
          :src="require(`../../assets/svgs/${treatSrc}`)"
          alt="treat image"
        />

        <span class="treats-count">{{ pet.numOfTreats }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "../../services/util-service.js";
export default {
  props: {
    pet: Object,
    user: Object,
  },
  data() {
    return {
      treat: false,
      storedLikes: [],
    };
  },
  methods: {
    addTreat() {
      this.$emit("addTreat", this.pet._id);
      this.treat = true;
      this.storedLikes.push(this.pet._id);
      utilService.storeToStorage("likes_db", this.storedLikes);
    },
  },
  computed: {
    treatSrc() {
      if (this.pet.type === "Dog") return "dog-bone.svg";
      if (this.pet.type === "Cat") return "fish.svg";
      if (this.pet.type === "Hamster") return "nut.svg";
      if (
        this.pet.type === "Pig" ||
        this.pet.type === "Horse" ||
        this.pet.type === "Bunny" ||
        this.pet.type === "Goat" ||
        this.pet.type === "Cow" ||
        this.pet.type === "Chicken"
      )
        return "carrot.svg";
      if (this.pet.type === "Frog" || this.pet.type === "Lizard")
        return "fly.svg";
    },
  },
  created() {
    this.storedLikes = utilService.loadFromStorage("likes_db") || [];
    this.treat = this.storedLikes.find((id) => id === this.pet._id)
      ? true
      : false;
  },
};
</script>