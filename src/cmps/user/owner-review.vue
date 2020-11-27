<template>
  <section class="owner-review">
    <h1 class="reviews-header">Reviews</h1>
    <hr />
    <ul>
      <li
        v-for="(review, idx) in owner.reviews"
        :key="idx"
        class="details-comments"
      >
        Rate: {{ review.rate }} From: {{ review.by.fullName }}
        {{ review.by.imgUrl }}
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