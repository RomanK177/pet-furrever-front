<template>
  <section class="owner-review">
    <h1 class="pet-details-comments-title">Reviews</h1>
    <hr />
    <form @submit.prevent="addReview" class="flex column">
      <span class="bold">Rate: </span>
      <div class="star-widget align-self-center">
        <input
          type="radio"
          value="5"
          name="rate"
          id="rate-5"
          v-model.number="reviewToAdd.rate"
        />
        <label for="rate-5" class="fas fa-star"></label>
        <input
          type="radio"
          value="4"
          name="rate"
          id="rate-4"
          v-model.number="reviewToAdd.rate"
        />
        <label for="rate-4" class="fas fa-star"></label>
        <input
          type="radio"
          value="3"
          name="rate"
          id="rate-3"
          v-model.number="reviewToAdd.rate"
        />
        <label for="rate-3" class="fas fa-star"></label>
        <input
          type="radio"
          value="2"
          name="rate"
          id="rate-2"
          v-model.number="reviewToAdd.rate"
        />
        <label for="rate-2" class="fas fa-star"></label>
        <input
          type="radio"
          value="1"
          name="rate"
          id="rate-1"
          v-model.number="reviewToAdd.rate"
        />
        <label for="rate-1" class="fas fa-star"></label>
      </div>
      <br />
      <label width="100%"
        ><span class="bold">Write you review: </span>
        <br />
        <textarea cols="30" rows="10" v-model="reviewToAdd.txt"></textarea>
      </label>
      <br />
      <button class="align-self-center">Add review</button>
    </form>
    <ul class="rendered-comments flex">
      <li class="review-card" v-for="(review, index) in reviews" :key="index">
        <div class="flex space-between align-center content-center">
          <img
            class="user-profile"
            v-if="!review.by.imgUrl"
            :src="require('../../assets/imgs/person/guest.png')"
          />
          <img
            class="user-profile"
            v-else
            :src="require(`../../assets/imgs/person/${review.by.imgUrl}`)"
          />
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


