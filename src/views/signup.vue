<template>
  <section class="signup">
    <h1>Thanks to you, another furry friend will find a FURRever home!</h1>
    <h3>Do you want to signup as adopter or as owner of pet?</h3>
    <button @click="adopter">Adopter</button>
    <button @click="petOwner">Pet Owner</button>
    <section class="adopter-container" v-if="isAdopter">
      <div>
        Welcome to our site! we hope you'll find you'r perfect furry friend!
      </div>
      <form @sumbit.prevent="signUp">
        <label
          >Full name: <input type="text" v-model="user.fullName" required
        /></label>
        <br />
        <label
          >User name: <input type="text" v-model="user.userName" required
        /></label>
        <br />
        <label
          >password: <input type="password" v-model="user.password" required
        /></label>
        <br />
        <label
          >Email: <input type="email" v-model="user.email" required
        /></label>
        <br />
        <label
          >Telephone: <input type="tel" v-model.number="user.tel" required
        /></label>
        <br />
        <label
          >Date of birth:
          <input type="date" v-model="user.dateOfBirth" required
        /></label>
        <br />
        <label>Do you own an animal or owned in the past?</label>
        <br />
        <label
          >I own an animal<input type="checkbox" v-model="user.ownPet"
        /></label>
        <label
          >I owned an animal in the past<input
            type="checkbox"
            v-model="user.ownedPet"
        /></label>
        <br />
        <label>What is your family status?</label>
        <select v-model="user.familyStatus">
          <option value="single">Single</option>
          <option value="nochildren">
            In a relationship/married with no children
          </option>
          <option value="children">
            In a relationship/married with children
          </option>
        </select>
        <br />
        <select v-model="user.houseStatus">
          <option value="appartment">Appartment</option>
          <option value="garden">
            House with garden
          </option>
          <option value="farm">
            Farm
          </option>
        </select>
        <button>Submit</button>
      </form>
    </section>
    <section v-if="isOwner" class="owner-container">
      <div>
        Welcome to our site! we appriciate that you choose us to share your pet
        for adoption!
      </div>
      <form @submit.prevent="signUp">
        <label>Name: <input type="text" v-model="owner.name" required /></label>
        <br />
        <label
          >User name: <input type="text" v-model="owner.userName" required
        /></label>
        <br />
        <label
          >password: <input type="password" v-model="owner.password" required
        /></label>
        <br />
        <label
          >Email: <input type="email" v-model="owner.email" required
        /></label>
        <br />
        <label>
          Telephone: <input type="tel" v-model.number="owner.tel" required
        /></label>
        <br />
        <label
          >How many years are you activate (only for shelter / agancy):
          <input type="number" v-model="owner.activityYears" required
        /></label>
        <br />
        <label>Location: <input type="text" required /></label>
        <br />
        <button>Submit</button>
      </form>
    </section>
  </section>
</template>

<script>
import { userService } from "./../services/user-service.js";
import { ownerService } from "./../services/owner-service.js";

export default {
  data() {
    return {
      isAdopter: false,
      isOwner: false,
      user: null,
      owner: null,
    };
  },
  methods: {
    adopter() {
      this.isAdopter = true;
      this.isOwner = false;
    },
    petOwner() {
      this.isOwner = true;
      this.isAdopter = false;
    },
    signUp() {
      var user = this.user;
      var owner = this.owner;
      if (user) {
        userService.signUp(user);
      } else {
        ownerService.signUp(owner);
      }
    },
  },
  computed: {
    getEmptyUser() {
      var emptyUser = this.$store.getters.getEmptyUser;
      this.user = emptyUser;
    },
    getEmptyOwner() {
      var emptyOwner = this.$store.getters.getEmptyOwner;
      this.owner = emptyOwner;
    },
  },
};
</script>