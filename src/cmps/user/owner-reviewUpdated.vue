<template>
  <section class="owner-review details">
    <h1 class="review-header">Reviews</h1>
    <hr />
    <form v-if="checkIfOwner" @submit="addReview">
      <label
        ><span class="bold">Rate: </span
        ><input type="number" v-model.number="reviewToAdd.rate"
      /></label>
      <label
        ><span class="bold">Write you review: </span
        ><input type="text" v-model="reviewToAdd.txt"
      /></label>
      <button>Add review</button>
    </form>
    <ul>
      <li
        v-for="(review, index) in reviews"
        :key="index"
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
export default {
  props: {
    reviews: {
      type: Array,
    },
    loggedInUser: {
      type: Object,
    },
  },
  data() {
    return {
      reviewToAdd: {
        txt: "",
        rate: null,
        by: {
            userId: '',
          fullName: '',
          imgUrl: '',
        },
        
      },
    };
  },
  methods: {
    addReview() {
      this.reviewToAdd.by.fullName = !this.loggedInUser
        ? "Guest"
        : this.loggedInUser.fullName;
      this.$emit("addReview", JSON.parse(JSON.stringify(this.reviewToAdd)));
      this.reviewToAdd.txt = "";
    },
  },
   computed: {
    checkIfOwner() {
      var loggedInUser = this.loggedInUser;
      if (this.loggedInUser) {
        if (this.loggedInUser._id === this.owner._id) return false;
      } else return true;
    },
  },
 
};
</script>


