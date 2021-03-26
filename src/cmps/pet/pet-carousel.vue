<template>
  <section class="pet-carousel container">
    <carousel
      :perPageCustom="[
        [560, 2],
        [720, 3],
        [1200, 4],
      ]"
      :navigation-enabled="false"
      :navigationClickTargetSize="0"
      :paginationPadding="3"
    >
      <slide v-for="pet in pets" :key="pet._id">
        <pet-preview
          :pet="pet"
          :user="user"
          @click.native="showDetails(pet._id)"
        />
      </slide>
    </carousel>
  </section>
</template>

<script>
import petPreview from '../pet/pet-preview';

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
