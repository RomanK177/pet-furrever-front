
<template>
  <section class="adoption-request">
    <h1>Adoption request:</h1>
    <ul>
      <li v-for="(request, idx) in requests" :key="idx">
        Request by: {{ request.name }} <button>Accept</button><button>Decline</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    requests: Array
  },
  methods: {},
  computed: {
    // getAdoptionRequest(){
    //   this.requests = this.$store.getters.getAdoptionRequests;
    // }
  },
  created() {},
};
</script>