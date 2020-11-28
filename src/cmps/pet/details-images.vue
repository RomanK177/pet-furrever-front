<template>
      <div class="details-images">
        <img
          v-for="(imgUrl, index) in pet.imgUrls"
          :key="index"
          :src="require(`@/assets/imgs/pets/${imgUrl}`)"
          alt=""
          :class="{
            item0: index === 0,
            item1: index === 1,
            item2: index === 2,
            item3: index === 3,
            item4: index === 4,
          }"
        />
      </div>
</template>
<script>
// import { petService } from "../../services/pet-service.js";
export default {
  name: "detailImages",
   props: {
    pet: {
      type: Object,
    },
  },
//   data() {
//     return {
//       pet: null,
//     };
//   },
//   async created() {
//     const { id } = this.$route.params;
//     console.log(id);
//     const pet = await petService.getPetById(id);
//     this.pet = pet;
//   },
};
</script>

  