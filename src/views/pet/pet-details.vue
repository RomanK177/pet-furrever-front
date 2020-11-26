<template>
  <section class="pet-details">
    <h1>{{ pet.name }}</h1>
    <img :src="pet.imgUrls" alt="" />
    <p>{{ pet.description }}</p>
    <p>{{ pet.age }}</p>
    <p>{{ pet.gender }}</p>
    <p>{{ pet.breed }}</p>
    <p></p>
  </section>
</template>

<script>
export default {
  name: "petDetails",
  props: {
    pet: Object,
  },
  data() {
    return {
      pet: {
        name: "Winston",
        gender: "male",
        size: "medium",
        type: "dog",
        breed: "Australian Shepherd",
        age: 1,
        adoptedAt: null,
        owner: {
          _id: "s101",
          name: "Dogs for life",
          imgUrl: require("@/assets/imgs/homepage/testimony1.jpg"),
        },
        description:
          "Sweetest pup. He's incredibly smart. Loves to play frisbee, and run!",
        imgUrls: [require("@/assets/imgs/pets/aussie.jpg")],
        tags: ["cute", "puppy", "friendly"],
      },
    };
  },
};
</script>