<template>
  <section class="pet-card flex column space-between">
    <img class="card-img" v-if="pet.imgUrls" :src="imgUrl" />
    <div class="flex space-between align-center">
      <h3>{{ pet.name }}</h3>
      <img
        class="svg-symbol"
        v-if="isMale"
        src="../../assets/svgs/male-symbol.svg"
        alt=""
      />
      <img
        class="svg-symbol"
        v-if="!isMale"
        src="../../assets/svgs/female-symbol.svg"
        alt=""
      />
    </div>
    <p>{{ pet.description }}</p>
    <p>{{ pet.owner.name }}</p>
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
  data() {
    return {
      imgUrl: require(`../../assets/imgs/pets/${this.pet.imgUrls[0]}`),
      isMale: undefined,
    };
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
  created() {
    this.isMale = this.pet.gender === "male" ? true : false;
  },
};
</script>