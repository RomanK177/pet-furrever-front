
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
    if (!this.loggedInUser) {
      let localFevorites = utilService.loadFromStorage("fevoritePets_db");
      if (!localFevorites) {
        localFevorites = [];
        utilService.storeToStorage("fevoritePets_db", localFevorites);
      }
      if (localFevorites.find((petId) => petId === this.pet._id))
        this.isFevorite = true;
      this.localFevorites = localFevorites;
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
        this.isFevorite = true;
      }
    }
  },
};
</script>