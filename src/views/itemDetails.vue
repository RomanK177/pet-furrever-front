<template>
  <section class="item-details">
      <h1 v-if="item === user"></h1>
  </section>
</template>

<script>
export default {
  data() {
    return {
      item: null,
    };
  },
  created() {
    const item = this.$route.params.item;
    this.item = item;
  },
};
</script>