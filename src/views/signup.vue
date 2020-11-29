<template>
  <section class="signup container">
    <h1>Thanks to you, another furry friend will find a FURRever home!</h1>
    <h3>Do you want to signup as adopter or as owner of pet?</h3>
    <button @click="adopter">Adopter</button>
    <button @click="petOwner">Pet Owner</button>

    <adopter-form :user="user" v-if="userType === 'adopter'" />
    <owner-form :user="user" v-if="userType === 'owner'" />
    <!-- 
    <section class="adopter-container" v-if="userType === 'adopter'">
      <div>
        Welcome to our site! we hope you'll find you'r perfect furry friend!
      </div>
      <form @submit.prevent="signUp">
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
          >I own an animal<input type="checkbox" v-model="user.adopterData.ownPet"
        /></label>
        <label
          >I owned an animal in the past<input
            type="checkbox"
            v-model="user.adopterData.ownedPet"
        /></label>
        <br />
        <label>What is your family status?</label>
        <select v-model="user.adopterData.familyStatus">
          <option value="single">Single</option>
          <option value="nochildren">
            In a relationship/married with no children
          </option>
          <option value="children">
            In a relationship/married with children
          </option>
        </select>
        <br />
        <select v-model="user.adopterData.houseStatus">
          <option value="appartment">Appartment</option>
          <option value="garden">House with garden</option>
          <option value="farm">Farm</option>
        </select>
        <br />
        <button>Submit</button>
      </form>
    </section> -->
    <!-- <section v-if="userType === 'owner'" class="owner-container">
      <div>
        Welcome to our site! we appriciate that you choose us to share your pet
        for adoption!
      </div>
      <form @submit.prevent="signUp">
        <label>Name: <input type="text" v-model="user.fullName" required /></label>
        <br />
        <label
          >User name: <input type="text" v-model="user.userName" required
        /></label>
        <br />
        <label
          >Password: <input type="password" v-model="user.password" required
        /></label>
        <br />
        <label
          >Email: <input type="email" v-model="user.email" required
        /></label>
        <br />
        <label>
          Telephone: <input type="tel" v-model.number="user.tel" required
        /></label>
        <br />
        <label
          >How many years are you activate (only for shelter / agancy):
          <input type="number" v-model="user.ownerData.activityYears" required
        /></label>
        <br />
        <label>Location: <input type="text" required v-model="user.ownerData.location" /></label>
        <br />
        <button>Submit</button>
      </form>
    </section> -->
  </section>
</template>

<script>
import { userService } from "./../services/user-service.js";
import adopterForm from "./../cmps/user/adopter-form.vue";
import ownerForm from "./../cmps/user/owner-form.vue";

export default {
  data() {
    return {
      user: null,
      userType: null,
    };
  },
  methods: {
    adopter() {
      this.userType = "adopter";
      var emptyUser = userService.getEmptyUser(this.userType);
      this.user = emptyUser;
    },
    petOwner() {
      this.userType = "owner";
      var emptyUser = userService.getEmptyUser(this.userType);
      this.user = emptyUser;
    },
    // signUp() {
    //   console.log(this.user);
    //   this.$store.dispatch({
    //     type: "signUp",
    //     userCred: this.user,
    //   });
    //   this.$router.push("/");
    // },
  },
  components: {
    adopterForm,
    ownerForm
  },
};
</script>