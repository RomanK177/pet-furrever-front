<template>
  <section class="pet-details">
    <h1>{{ pet.name }}</h1>
    <img :src="pet.imgUrls" alt="" class="pet-details-img" />
    <p class="treats"> Treat Count: {{ pet.numOfTreats }}</p>
    <button class="adopt-btn">Adopt Me!</button>
    <button class="treat-btn">Send Me a Treat!</button>
    <p class="pet-bio">A little About {{pet.name}}: {{ pet.description }}</p>
    <p class="pet-details-age">Age: {{ pet.age }}</p>
    <p class="pet-details-gender">Gender: {{ pet.gender }}</p>
    <p class="pet-details-breed">Breed: {{ pet.breed }}</p>
    <ul>
      <li v-for="(tag, index) in pet.tags" :key="index" class="pet-details-tags">
        {{ tag }}
      </li>
      <img :src="pet.owner.imgUrl" alt="" class="pet-details-owner-img"/>
      <p class="pet-details-owner-name">Rescue: {{ pet.owner.name }}</p>
      <h1 class="pet-details-comments-title">Comments</h1>
      <hr>
      <ul>
         <li v-for="(comment, index) in pet.comments" :key="index" class="pet-details-comments">
          {{comment.userName}}: {{comment.comment}}

        </li>
      </ul>
    </ul>
  </section>
</template>

<script>
export default {
  name: "petDetails",
  // props: {
  //   pet: Object,
  // },
  data() {
    return {
      pet: {
        id: "s101",
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
        comments: [
          {
            userName: "Guest",
            _id: "c123",
            comment: "I just sent him a treat! He's so cute!",
          },
          {
            userName: "Alex",
            _id: "c124",
            comment: "How is he still available for adoption?! He's adorable.",
          },
        ],
        numOfTreats: 20,
      },
    };
  },
  created() {
    // const { id } = this.$route.params;
    // console.log(id)
    // const pet =  await petService.getById(id)
    // this.pet = pet;
  },
};
</script>