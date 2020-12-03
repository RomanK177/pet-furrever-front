
<template>
  <section class="pet-likes">
    <div class="flex space-between align-center">
      <!-- <button
        v-if="$route.params.id"
        @click.stop="toggleTreat"
        class="btn treat-btn"
      >
        Send Me A Treat!
      </button> -->
      <div class="flex align-center" @click.stop="toggleTreat">
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
    // toggleTreat() {
    //   if (this.treat === false) {
    //     this.storedLikes.push(this.pet._id);
    //     utilService.storeToStorage("likes_db", this.storedLikes);
    //     this.pet.numOfTreats++;
    //     this.$emit("updateLikes", this.pet);
    //   } else {
    //     let idx = this.storedLikes.indexOf(this.pet._id);
    //     this.storedLikes.splice(idx, 1);
    //     utilService.storeToStorage("likes_db", this.storedLikes);
    //     this.pet.numOfTreats--;
    //     this.$emit("updateLikes", this.pet);
    //   }
    //   this.treat = !this.treat;
    // },
    toggleTreat() {
      this.pet.numOfTreats++;
      this.$emit("updateLikes", this.pet);
      this.treat = true;
      this.storedLikes.push(this.pet._id);
      utilService.storeToStorage("likes_db", this.storedLikes);
      // if (this.treat === false) {
      // } else {
      //   let idx = this.storedLikes.indexOf(this.pet._id);
      //   this.storedLikes.splice(idx, 1);
      //   utilService.storeToStorage("likes_db", this.storedLikes);
      //   this.$emit("updateLikes", this.pet);
      // }
    },
    addTreat() {
      this.$emit("addTreat", this.pet._id);
      this.treat = true;
      this.storedLikes.push(this.pet._id);
      utilService.storeToStorage("likes_db", this.storedLikes);
      // if (this.treat === false) {
      // } else {
      //   let idx = this.storedLikes.indexOf(this.pet._id);
      //   this.storedLikes.splice(idx, 1);
      //   utilService.storeToStorage("likes_db", this.storedLikes);
      //   this.$emit("updateLikes", this.pet);
      // }
    },
    showButton() {
      console.log(this.$route);
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
    this.storedLikes = utilService.loadFromStorage("likes_db");
    if (this.storedLikes === undefined || this.storedLikes === null)
      this.storedLikes = [];
    if (this.storedLikes.find((id) => id === this.pet._id)) this.treat = true;
    else this.treat = false;
  },
};
</script>