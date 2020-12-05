
<template>
  <section class="pet-card flex column">
    <img class="card-img" v-if="pet.imgUrls" :src="imgUrl" />
    <!-- <div class="card-info flex column space-between"> -->
    <div class="card-info flex column space-between">
        <h3 class="flex">{{ pet.name }}</h3>
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
      <p class="pet-description">{{ pet.description }}</p>
      <div class="owner-treats flex space-between align-center">
        <router-link
          @click.native="$event.stopImmediatePropagation()"
          :to="`/user/${pet.owner._id}`"
          >{{ pet.owner.fullName }}</router-link
        >
        <pet-likes :pet="pet" />
      </div>
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
      imgUrl: null,
    };
  },
  computed: {},
  created() {
    let urlStart = this.pet.imgUrls[0].slice(0, 4);
    if (urlStart === "http") this.imgUrl = this.pet.imgUrls[0];
    else this.imgUrl = require(`../../assets/imgs/pets/${this.pet.imgUrls[0]}`);
  },
  components: {
    petLikes,
  },
};
</script>