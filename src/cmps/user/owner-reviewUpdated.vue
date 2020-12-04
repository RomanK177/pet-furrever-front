<template>
  <section class="owner-review details">
    <h1 class="pet-details-comments-title">Reviews</h1>
    <hr />
    <form @submit.prevent="addReview">
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
    <ul class="rendered-comments flex">
      <li class="review-card" v-for="(review, index) in reviews" :key="index">
        <div class="flex space-between align-center content-center">
          <span class="bold">{{ review.by.fullName }}: </span>
          <div class="flex space-between align-center content-center">
            <span> {{ review.rate }}</span>
            <img class="star" :src="starUrl" alt="" />
          </div>
        </div>
        <hr />
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
      },
    };
  },
  methods: {
    addReview() {
      this.$emit("addReview", JSON.parse(JSON.stringify(this.reviewToAdd)));
      this.reviewToAdd.txt = "";
    },
  },
  computed: {
    starUrl() {
      return require("../../assets/svgs/star.svg");
    },
  },
};
</script>


