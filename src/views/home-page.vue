<template>
  <section class="home">
    <div class="hero flex">
      <div class="hero-content">
        <h1 class="container">Find your furry best friend.</h1>
      </div>
    </div>
    <div class="our-pets container">
      <h1 class="pets-of-the-week">Pets Available For Adoption!</h1>
      <router-link to="/pet" class="our-pets-btn"
        >View All Our Pets!</router-link
      >
    </div>
    <div class="homepage-pet-list">
      <h2>Most liked Pets</h2>
      <pet-list
        v-if="petsForPreview"
        :pets="mostLiked"
        @updateLikes="updateLikes"
      ></pet-list>
    </div>
    <div class="homepage-pet-list">
      <h2>Recently Adopted Pets</h2>
      <pet-list
        v-if="petsForPreview"
        :pets="recentlyAdopted"
        @updateLikes="updateLikes"
      ></pet-list>
    </div>
    <div class="adopt-container container flex">
      <section class="adopt-reasons">
        <h3>We Can Help You Find The <span>Purr</span>fect Pet!</h3>
        <div class="heart">
          <h1 class="adopt-circle">Why Should I Adopt?</h1>
        </div>
        <ul class="heart">
          <li>You'll be saving a life</li>
          <li>You get unconditional love</li>
          <li>They teach your children responsibility</li>
          <li>Many are already trained</li>
          <li>They help combat lonliness</li>
          <li>Pets are good for your health</li>
        </ul>
        <p>
          <!-- There are so many reasons why you should adopt a pet, but the most
        important reason is that you will be saving a life, and your pet will
        love you forever for that! -->
        </p>
        <p>
          Research shows that having a pet improves your quality of of life by
          making you a happier person! Taking care of an animal releases
          endorphins in your brain, which causes you to be happier! It's been
          shown that taking care of a pet is psychologically, emotionally and
          physically beneficial to their companions. Let's not forget the
          uncoditional love from your pet! What are you waiting for?! Improve
          your life now - find your new furry best friend!
        </p>
        <!-- <button>View All Animals!</button> -->
      </section>
      <section class="testimonies">
        <!-- <review></review> -->
        <div class="testimony">
          <div class="testimony-img">
            <img src="../assets/imgs/homepage/testimony1.jpg" alt="" />
            <h1>Sarah</h1>
          </div>
          <div class="testimony-p">
            <p>
              Hello! My name is Sarah, and I adopted my incredible dog named
              Martin from "Dog Luvers". He saved me in so many ways. I used to
              be really depressed before I adopted Martin, and would have the
              hardest time getting out of bed. Walking him every morning really
              gave me a purpose to get out of bed each morning, and slowly I
              started coming out of my depression. His uncoditional love truly
              changed me, and I feel like the luckiest person in the world to
              get to be Martin's Dog mom! Please adopt and save a life while
              improving your own!
            </p>
          </div>
        </div>
        <div class="testimony">
          <div class="testimony-img">
            <img src="../assets/imgs/homepage/testimony2.jpg" alt="" />
            <h1>Dom</h1>
          </div>
          <div class="testimony-p">
            <p>
              Hi, I'm Dom and I adopted this stallion of a dog named Kita from
              "Adopt-A-Pup Rescue". I couldn't imagine my life without this
              little dude. He is my best bud, we do everything together, I
              woudln't give him up for the world. Adopting Kita is the best
              decision I've ever made, and Pet Furrever made this proccess so
              easy and delightful. Thank you so much Pet Furrever and
              Adop-A-Pup, I will forever be thankful to you guys.
            </p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import appHeader from "../cmps/app-header.vue";
import carousel from "../cmps/carousel.vue";
import petList from "../cmps/pet/pet-list.vue";

export default {
  name: "Home",
  data() {
    return {
      pets: null,
    };
  },
  computed: {
    petsForPreview() {
      return this.$store.getters.petsForPreview;
    },
    mostLiked() {
      let notAdopted = this.petsForPreview.filter(
        (pet) => pet.adoptedAt === null
      );
      let mostLiked = notAdopted.sort(function (a, b) {
        return b.numOfTreats - a.numOfTreats;
      });
      return mostLiked.slice(0, 4);
    },
    recentlyAdopted() {
      let adopted = this.petsForPreview.filter((pet) => pet.adoptedAt);
      let mostRecent = adopted.sort(function (a, b) {
        return b.adoptedAt - a.adoptedAt;
      });
      return mostRecent.slice(0, 4);
    },
  },
  created() {
    this.$store.dispatch({ type: "loadPets" });
    // this.$store.dispatch({ type: "loadUsers" });
  },
  methods: {
    updateLikes(pet) {
      this.$store.dispatch({
        type: "savePet",
        pet,
      });
    },
  },
  components: {
    appHeader,
    carousel,
    petList,
  },
};
</script>
