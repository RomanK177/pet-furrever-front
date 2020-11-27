
<template>
  <section class="pet-card flex column space-between">
    <img class="card-img" v-if="pet.imgUrls" :src="imgUrl" />
    <div class="card-info flex column space-between">
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
        <pet-likes :pet="pet" @updateLikes="emitUpdateLikes" />
      </div>
    </div>
    <div class="card-btns flex">
      <button v-show="user && user.isAdmin" @click.stop="emitDelete">x</button>
      <button v-show="user && user.isAdmin" @click.stop="editPet">Edit</button>
    </div>
    <span class="adopted" v-if="pet.adoptedAt">ADOPTED</span>
  </section>
</template>

<script>
import { utilService } from "../../services/util-service.js";
import petLikes from "./pet-likes";
export default {
  props: {
    pet: Object,
    user: Object,
  },
  data() {
    return {
      imgUrl: require(`../../assets/imgs/pets/${this.pet.imgUrls[0]}`),
    };
  },
  methods: {
    emitDelete() {
      this.$emit("deletePet", this.pet._id);
    },
    emitUpdateLikes(pet) {
      this.$emit("updateLikes", pet);
    },
    editPet() {
      this.$router.push(`/edit/${this.pet._id}`);
    },
  },
  computed: {},
  created() {},
  components: {
    petLikes,
  },
};
</script>