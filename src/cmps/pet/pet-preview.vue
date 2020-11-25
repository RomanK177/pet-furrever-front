<template>
  <section class="pet-card flex f-col">
    <h3>{{ pet.name }}</h3>
    <img v-if="pet.imgUrls" :src="sd" />
    <!-- <img src="../../../src/assets/imgs/pets/max1.jpg" /> -->
    <h4>{{ pet.gender }}</h4>
    <div class="card-btns flex">
      <button v-show="user && user.isAdmin" @click.stop="emitDelete">x</button>
      <button v-show="user && user.isAdmin" @click.stop="editPet">Edit</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    pet: Object,
    user: Object,
  },

  methods: {
    emitDelete() {
      this.$emit("deletePet", this.pet._id);
    },
    editPet() {
      this.$router.push(`/edit/${this.pet._id}`);
    },
  },
  computed: {},
};
</script>