<template>
  <section class="owner-review" v-if="owner.ownerData.reviews">
    <h1 class="reviews-header">Reviews</h1>
    <hr />
    <ul>
      <li v-for="(review, idx) in owner.ownerData.reviews" :key="idx" class="details-comments">
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
    owner: Object,
  },
};
</script>