

<template>
  <section class="pet-list container">
    <pet-preview
      v-for="pet in pets"
      :key="pet._id"
      :pet="pet"
      :user="user"
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
    // emitDelete(petId) {
    //   this.$emit("deletePet", petId);
    // },
    showDetails(petId) {
      this.$router.push(`/pet/${petId}`);
    },
  },
};
</script>