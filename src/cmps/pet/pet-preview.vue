
<template>
  <section class="pet-card flex column space-between">
    <img class="card-img" v-if="pet.imgUrls" :src="imgUrl" />
    <div class="flex space-between align-center">
      <h3>{{ pet.name }}</h3>
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
    </div>
    <p>{{ pet.description }}</p>
    <div class="flex space-between align-center">
      <router-link
        @click.native="$event.stopImmediatePropagation()"
        :to="`/user/${pet.owner._id}`"
        >{{ pet.owner.name }}</router-link
      >
      <div class="flex space-between align-center">
        <img
          :class="{ treatClicked: treat }"
          @click.stop="toggleTreat"
          v-if="pet.type === 'dog'"
          class="svg-symbol treat"
          src="../../assets/svgs/dog-bone.svg"
          alt=""
        />
        <img
          :class="{ treatClicked: treat }"
          @click.stop="toggleTreat"
          v-if="pet.type === 'cat'"
          class="svg-symbol treat"
          src="../../assets/svgs/fish.svg"
          alt=""
        />
        <span class="treats-count">{{ pet.numOfTreats }}</span>
      </div>
    </div>
    <div class="card-btns flex">
      <button v-show="user && user.isAdmin" @click.stop="emitDelete">x</button>
      <button v-show="user && user.isAdmin" @click.stop="editPet">Edit</button>
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
      imgUrl: require(`../../assets/imgs/pets/${this.pet.imgUrls[0]}`),
      treat: false,
      storedLikes: undefined,
    };
  },
  methods: {
    emitDelete() {
      this.$emit("deletePet", this.pet._id);
    },
    editPet() {
      this.$router.push(`/edit/${this.pet._id}`);
    },
    toggleTreat() {
      if (this.treat === false) {
      }
      this.treat = !this.treat;
    },
  },
  computed: {},
  created() {
    this.storedLikes = utilService.loadFromStorage("likes_db");
    // if (
    //   this.storedLikes === undefined ||
    //   !this.storedLikes.likedPets.find((petId) => petId === this.pet._id)
    // ) {
    //   this.storedLikes = { likedPets: [] };
    //   utilService.storeToStorage("likes_db", storedLikes);
    //   return (this.treat = false);
    // } else this.treat = true;
  },
};
</script>