<template>
  <section class="pet-filter">
    <h1>I am Filter</h1>
    <input type="text" placeholder="Search for pets..." v-model="filter.txt" />
    <my-select />
  </section>
</template>

<script>
import mySelect from "./my-select";

export default {
  data() {
    return {
      filter: {
        txt: "",
        type: "All",
      },
    };
  },
  components: {
    mySelect,
  },
};
</script>