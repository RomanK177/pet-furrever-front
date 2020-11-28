<template>
  <section class="owner-review" v-if="user.ownerData.reviews">
    <h1 class="reviews-header">Reviews</h1>
    <hr />
    <form v-if="checkIfOwner" @submit="addReview">
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
        v-for="(review, idx) in user.ownerData.reviews"
        :key="idx"
        class="details-comments"
      >
        <span class="bold">Rate: </span>{{ review.rate }}
        <br />
        <span class="bold">From: </span>{{ review.by.fullName }}
        <img :src="review.by.imgUrl" />
        <br />
        {{ review.txt }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      // TODO: Decide if need to change original object or to fit this object to the original
      review: {
        txt: null,
        rate: null,
        from: this.$store.getters.getLoggedInUser
          ? this.$store.getters.getLoggedInUser
          : "Guest",
        to: this.user._id,
      },
    };
  },
  computed: {
    checkIfOwner() {
      var loggedInUser = this.$store.getters.getLoggedInUser;
      if (loggedInUser) {
        if (loggedInUser._id === this.user._id) return false;
      } else return true;
    },
  },
  methods: {
    addReview() {
      this.$store.dispatch({
        type: "addReview",
        review: JSON.parse(JSON.stringify(this.review)),
      });
    },
  },
};
</script>