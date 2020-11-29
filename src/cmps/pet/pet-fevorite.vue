
<template>
  <section class="pet-fevorite">
    <div class="flex justify-center align-center" @click.stop="toggleFevorite">
      <img
        class="fevorite"
        :class="{ isFevorite: isFevorite }"
        src="../../assets/svgs/like.svg"
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
  created() {
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
    }
  },
};
</script>