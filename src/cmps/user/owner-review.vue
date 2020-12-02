<template>
  <section class="owner-review details" v-if="owner.ownerData.reviews">
    <h1 class="review-header">Reviews</h1>
    <hr />
    <form v-if="!checkIfOwner" @submit="addReview">
      <label
        ><span class="bold">Rate: </span
        ><input type="number" v-model.number="review.rate"
      /></label>
      <label
        ><span class="bold">Write you review: </span
        ><input type="text" v-model="review.txt"
      /></label>
      <button>Add review</button>
    </form>
    <ul>
      <li
        v-for="(review, idx) in owner.ownerData.reviews"
        :key="idx"
        class="review"
      >
        <span class="bold">From: </span>{{ review.by.fullName }}
        <img :src="review.by.imgUrl" />
        <br />
        <span class="bold">Rate: </span>{{ review.rate }}
        <br />
        {{ review.txt }}
      </li>
    </ul>
  </section>
</template>
<script>
import eventBus from './../../services/event-bus-service.js';
export default {
  props: {
    owner: Object,
  },
  data() {
    return {
      review: {
        txt: null,
        rate: null,
      },
    };
  },
  computed: {
    checkIfOwner() {
      var loggedInUser = this.$store.getters.getLoggedInUser;
      if (loggedInUser) {
        if (loggedInUser._id === this.owner._id) return true;
      } else return false;
    },
  },
  methods: {
    async addReview() {
      await this.$store.dispatch({
        type: "addReview",
        review: JSON.parse(JSON.stringify(this.review)),
        ownerId: this.owner._id
      });
      // eventBus.$emit('reviewAdded')
    },
  },
};
</script>