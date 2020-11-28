
<template>
  <section class="adoption-request">
    <h1>Adoption request:</h1>
    <ul v-if="requests">
      <li class="adoption-request-list"  v-for="(request, idx) in requests" :key="idx">
        Request by: {{ request.user.name }} 
        <br />
        Pet: {{ request.pet.name }}
        <br />
        <button>Accept</button
        ><button>Decline</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {},
  computed: {
    requests() {
      return this.$store.getters.getAdoptionRequests;
    },
  },
  created() {
// this.getAdoptionRequest
  },
};
</script>