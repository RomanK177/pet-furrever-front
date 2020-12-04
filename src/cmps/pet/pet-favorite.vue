
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
      if (!this.isFavorite) {
        if (!this.loggedInUser) {
          this.localFavorites.push(this.pet._id);
          this.isFavorite = true;
          utilService.storeToStorage("favoritePets_db", this.localFavorites);
        } else {
          this.loggedInUser.favoritePets.push(this.pet._id);
          this.isFavorite = true;
          // this.$emit("updateFavorites", this.isFavorite, this.pet._id);
          this.$emit("updateFavorites", this.loggedInUser);
        }
      } else {
        if (!this.loggedInUser) {
          let idx = this.localFavorites.indexOf(this.pet._id);
          this.localFavorites.splice(idx, 1);
          this.isFavorite = false;
          utilService.storeToStorage("favoritePets_db", this.localFavorites);
        } else {
          let idx = this.loggedInUser.favoritePets.indexOf(this.pet._id);
          this.loggedInUser.favoritePets.splice(idx, 1);
          this.isFavorite = false;
          // this.$emit("updateFavorites", this.isFavorite, this.pet._id);
          this.$emit("updateFavorites", this.loggedInUser);
        }
      }
    },
  },
  computed: {},
  created() {
    console.log(this.loggedInUser);
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
      if (!this.loggedInUser.favoritePets) {
        this.loggedInUser.favoritePets = [];
      } else {
        console.log(
          "🚀 ~ file: pet-favorite.vue ~ line 75 ~ created ~ this.loggedInUser.favoritePets",
          this.loggedInUser.favoritePets
        );
        console.log(
          "🚀 ~ file: pet-favorite.vue ~ line 81 ~ created ~ this.pet._id",
          this.pet._id
        );
        if (
          this.loggedInUser.favoritePets.find((petId) => petId === this.pet._id)
        ) {
          this.isFavorite = true;
        } else {
          this.isFavorite = false;
        }
      }
    }
  },
};
</script>