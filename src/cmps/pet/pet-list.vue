

<template>
  <section class="pet-list container">
    <pet-preview
      v-for="pet in pets"
      :key="pet._id"
      :pet="pet"
      :user="user"
      @deletePet="emitDelete"
      @updateLikes="emitUpdateLikes"
      @click.native="showDetails(pet._id)"
    />
  </section>
</template>

<script>
import petPreview from "../pet/pet-preview";

export default {
  props: {
    pets: Array,
    user: Object,
  },
  components: {
    petPreview,
  },
  methods: {
    emitDelete(petId) {
      this.$emit("deletePet", petId);
    },
    emitUpdateLikes(pet) {
      this.$emit("updateLikes", pet);
    },
    emitAddTreat(pet) {
      this.$emit("addTreat", pet._id);
    },
    showDetails(petId) {
      this.$router.push(`/pet/${petId}`);
    },
  },
};
</script>