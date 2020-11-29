
<template>
  <section class="pet-likes">
    <div class="flex space-between align-center">
      <button
        v-if="$route.params.id"
        @click.stop="toggleTreat"
        class="btn treat-btn"
      >
        Send Me A Treat!
      </button>
      <div @click.stop="toggleTreat">
        <img
          :class="{ treatClicked: treat }"
          v-if="pet.type === 'Dog'"
          class="svg-symbol treat"
          src="../../assets/svgs/dog-bone.svg"
          alt=""
        />
        <img
          :class="{ treatClicked: treat }"
          v-if="pet.type === 'Cat'"
          class="svg-symbol treat"
          src="../../assets/svgs/fish.svg"
          alt=""
        />
        <img
          :class="{ treatClicked: treat }"
          v-if="pet.type === 'Pig' || pet.type === 'Horse'"
          class="svg-symbol treat"
          src="../../assets/svgs/carrot.svg"
          alt=""
        />
      </div>
      <span class="treats-count">{{ pet.numOfTreats }}</span>
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
    showButton() {
      console.log(this.$route);
    },
  },
  computed: {},
  created() {
    this.storedLikes = utilService.loadFromStorage("likes_db");
    if (this.storedLikes === undefined || this.storedLikes === null)
      this.storedLikes = [];
    if (this.storedLikes.find((id) => id === this.pet._id)) this.treat = true;
    else this.treat = false;
  },
};
</script>