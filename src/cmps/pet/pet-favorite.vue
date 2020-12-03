
<template>
  <section class="favorite-pet">
    <div class="flex justify-center align-center" @click.stop="toggleFavorite">
      <img
        class="like-svg favorite"
        :class="{ isFavorite: isFavorite }"
        src="../../assets/svgs/heart2.svg"
        alt=""
      />
      <!-- <span>Favorite</span> -->
    </div>
  </section>
</template>

<script>
import { utilService } from "../../services/util-service.js";
export default {
  props: {
    pet: Object,
    loggedInUser: Object,
  },
  data() {
    return {
      isFavorite: false,
      localFavorites: null,
    };
  },
  methods: {
    toggleFavorite() {
      if (this.isFavorite === false) {
        if (this.loggedInUser === null) {
          this.localFavorites.push(this.pet._id);
          this.isFavorite = true;
          utilService.storeToStorage("favoritePets_db", this.localFavorites);
        } else {
          this.loggedInUser.favorites.push(this.pet._id);
          this.isFavorite = true;
          this.$emit("updateFavorites", this.loggedInUser);
        }
      } else {
        if (this.loggedInUser === null) {
          let idx = this.localFavorites.indexOf(this.pet._id);
          this.localFavorites.splice(idx, 1);
          this.isFavorite = false;
          utilService.storeToStorage("favoritePets_db", this.localFavorites);
        } else {
          let idx = this.loggedInUser.favorites.indexOf(this.pet._id);
          this.loggedInUser.favorites.splice(idx, 1);
          this.isFavorite = false;
          this.$emit("updateFavorites", this.loggedInUser);
        }
      }
    },
  },
  computed: {},
  async created() {
    if (!this.loggedInUser) {
      let localFavorites = utilService.loadFromStorage("favoritePets_db");
      if (!localFavorites) {
        localFavorites = [];
        utilService.storeToStorage("favoritePets_db", localFavorites);
      }
      if (localFavorites.find((petId) => petId === this.pet._id))
        this.isFavorite = true;
      this.localFavorites = localFavorites;
    } else {
      if (
        !this.loggedInUser.favorites ||
        this.loggedInUser.favorites.length === 0
      ) {
        await this.$emit("updateFavorites", this.loggedInUser);
        this.loggedInUser.favorites = [];
      } else if (
        this.loggedInUser.favorites.find((petId) => petId === this.pet._id)
      ) {
        this.isFavorite = true;
      }
    }
  },
};
</script>