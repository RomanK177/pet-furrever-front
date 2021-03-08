<template>
  <section class="home">
    <div class="hero  flex">
      <div class="hero-content">
        <h1 class="container">Find your furry best friend.</h1>
        <div class="view-pets container">
          <router-link to="/pet" class="our-pets-btn"
            >View All Pets</router-link
          >
        </div>
      </div>
    </div>
    <div class="our-pets container">
      <!-- <h1 class="pets-of-the-week">Pets Available For Adoption!</h1> -->
    </div>
    <div class="homepage-pet-list container">
      <div class="most-liked-pets flex align-end space-between">
        <h2 class="most-liked-of-the-week">
          Most Liked Pets Available For Adoption
        </h2>
        <router-link to="/pet" class="all-pets-link">View All Pets</router-link>
      </div>
      <pet-carousel v-if="petsForPreview" :pets="mostLiked"></pet-carousel>
      <!-- <pet-list v-if="petsForPreview" :pets="mostLiked"></pet-list> -->
      <h2 class="pets-of-the-week">Recently Adopted Pets</h2>
      <pet-carousel
        v-if="petsForPreview"
        :pets="recentlyAdopted"
      ></pet-carousel>
      <!-- <pet-list v-if="petsForPreview" :pets="recentlyAdopted"></pet-list> -->
    </div>
    <div class="adopt-container flex container">
      <section class="adopt-reasons flex column space-around">
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
      </section>
      <section class="testimonies">
        <div class="testimony">
          <div class="testimony-img">
            <img src="../assets/imgs/homepage/testimony1.jpg" alt="" />
            <h1>Sarah</h1>
          </div>
          <div class="testimony-p">
            <p>
              Hello! My name is Sarah, and I adopted my incredible dog named
              Martin from <span>"Dog Luvers"</span>. He saved me in so many
              ways. Walking him every morning really gave me a purpose to get
              out of bed each morning. His uncoditional love truly changed me.
              Please adopt and save a life while improving your own!
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
              <span>"Adopt-A-Pup Rescue"</span>. I couldn't imagine my life
              without this little dude. Adopting is the best decision I've ever
              made, and Pet Furrever made this proccess so easy and delightful.
              Thank you so much Pet Furrever and Adop-A-Pup.
            </p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import appHeader from '../cmps/app-header.vue';
import carousel from '../cmps/carousel.vue';
import petList from '../cmps/pet/pet-list.vue';
import petCarousel from '../cmps/pet/pet-carousel.vue';
import socketService from '../services/socket-service.js';

export default {
  name: 'Home',
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
      let mostLiked = notAdopted.sort(function(a, b) {
        return b.numOfTreats - a.numOfTreats;
      });
      return mostLiked.slice(0, 6);
    },
    recentlyAdopted() {
      let adopted = this.petsForPreview.filter((pet) => pet.adoptedAt);
      let mostRecent = adopted.sort(function(a, b) {
        return b.adoptedAt - a.adoptedAt;
      });
      return mostRecent.slice(0, 6);
    },
  },
  async created() {
    await this.$store.dispatch({ type: 'loadUsers' });
    // const pets = await this.$store.dispatch({type: 'loadPets'})
    // this.pets = pets
    socketService.setup();
    socketService.emit('treats topic', 'home-page');
    socketService.on('treats addTreat', this.addTreat);
    await this.$store.dispatch({ type: 'loadPets' });
  },
  methods: {
    async addTreat(pet) {
      const newPet = await this.$store.dispatch({
        type: 'addTreat',
        petId: pet._id,
      });
      await this.$store.dispatch({
        type: 'savePet',
        pet: newPet,
      });
    },
  },
  components: {
    appHeader,
    carousel,
    petList,
    petCarousel,
  },
  destroyed() {
    socketService.off('treats addTreat', this.addTreat);
    socketService.terminate();
  },
};
</script>
