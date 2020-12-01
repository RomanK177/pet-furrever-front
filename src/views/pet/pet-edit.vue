<template>
  <section class="pet-edit">
    <h1 v-if="pet">Add pet</h1>
    <h1 v-else>Edit pet</h1>
    <form v-if="pet" @submit.prevent="edit">
      <label>Pet name: <input type="text" v-model="pet.name" required /></label>
      <br />
      <label
        >Pet gender:
        <select v-model="pet.gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select></label
      >
      <br />
      <label
        >Pet size:
        <select v-model="pet.size" required>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select></label
      >
      <br />
      <label
        >Pet type:
        <select v-model="pet.type" required>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="pig">Pig</option>
        </select></label
      >
      <label>Breed: <input type="text" v-model="pet.breed" required /></label>
      <br />
      <label>Age: <input type="number" v-model="pet.age" required /></label>
      <br />
      <label>
        Description: <input type="text" v-model="pet.description"
      /></label>
      <br />
      <template v-if="!isLoading">
      <label
        >Images:
        <input
          type="file"
          name="img-uploader2"
          id="imgUploader2"
          @change="onUploadImgs"
        />
        <div class="details-images">
          <img
            :class="{
              item0: index === 0,
              item1: index === 1,
              item2: index === 2,
              item3: index === 3,
              item4: index === 4,
            }"
            id="imgUploader2"
            v-for="(imgUrl, index) in pet.imgUrls"
            :key="index"
            :src="imgUrl"
          />
        </div>
      </label>
      </template>
            <img
        v-else
        src="../../assets/imgs/loading.gif"
        width="150"
        height="350"
      />
      <br />
      <label
        >Location: <input type="text" required v-model="pet.owner.location.name"
      /></label>
      <br />
      <button>Submit</button>
    </form>
  </section>
</template>

<script>
import { petService } from "../../services/pet-service.js";
import { uploadImg } from "../../services/img-upload-service.js";

export default {
  data() {
    return {
      pet: null,
      isLoading: false
      // tags: [],
    };
  },
  created() {
    this.pet = petService.getEmptyPet();
    console.log('ppp', this.pet)
  },
  methods: {
    edit() {
      this.$store.dispatch({
        type: 'savePet',
        pet: this.pet
      })
    },
    async onUploadImgs(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.pet.imgUrls.push(res.url);
      this.isLoading = false;
    },
  },
};
</script>