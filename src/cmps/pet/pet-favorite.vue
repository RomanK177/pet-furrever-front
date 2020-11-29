
<template>
  <section class="favorite-pet">
    <div class="flex justify-center align-center" @click.stop="toggleFevorite">
      <img
        class="like-svg fevorite"
        :class="{ isFevorite: isFevorite }"
        src="../../assets/svgs/heart2.svg"
        alt=""
      />
      <span>Favorite</span>
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
      isFevorite: false,
      localFevorites: null,
    };
  },
  methods: {
    toggleFevorite() {
      if (this.isFevorite === false) {
        if (this.loggedInUser === null) {
          this.localFevorites.push(this.pet._id);
          this.isFevorite = true;
          utilService.storeToStorage("fevoritePets_db", this.localFevorites);
        } else {
          this.loggedInUser.favorites.push(this.pet._id);
          this, (this.isFevorite = true);
          this.$emit("updateFavorites", this.loggedInUser);
        }
      } else {
        if (this.loggedInUser === null) {
          let idx = this.localFevorites.indexOf(this.pet._id);
          this.localFevorites.splice(idx, 1);
          this.isFevorite = false;
          utilService.storeToStorage("fevoritePets_db", this.localFevorites);
        }
      }
    },
  },
  computed: {},
  async created() {
    if (this.loggedInUser === null) {
      let localFevorites = undefined;
      localFevorites = utilService.loadFromStorage("fevoritePets_db");
      if (localFevorites === undefined) {
        localFevorites = [];
        utilService.storeToStorage("fevoritePets_db", localFevorites);
      }
      if (localFevorites.find((petId) => petId === this.pet._id))
        this.isFevorite = true;
      this.localFevorites = localFevorites;
    } else {
      console.log(
        "🚀 ~ file: pet-favorite.vue ~ line 65 ~ created ~ this.loggedInUser.favorites",
        this.loggedInUser.favorites
      );
      if (
        !this.loggedInUser.favorites ||
        this.loggedInUser.favorites.length === 0
      ) {
        this.loggedInUser.favorites = [];
        await this.$emit("updateFavorites", this.loggedInUser);
      } else if (
        this.loggedInUser.favorites.find((petId) => petId === this.pet._id)
      ) {
        this.isFevorite = true;
      }
    }
  },
};
</script>