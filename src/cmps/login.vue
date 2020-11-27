<template>
  <section class="login modal">
    <div class="login modal-content">
      <button @click="closeModal">X</button>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <label
          >User name: <input type="text" v-model="userCred.userName" /></label>
        <br />
        <label
          >Password: <input type="password" v-model="userCred.password" /></label>
        <br />
        <button>Login</button>
      </form>
    </div>
  </section>
</template>

<script>
import eventBus from "./../services/event-bus-service.js";
export default {
  data() {
    return {
      userCred: {
        userName: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch({
        type: 'login',
        userCred: this.userCred
      });
      // this.$router.push('/');
      // eventBus.$emit('loginDone');
      eventBus.$emit("closeModal");
    },
    closeModal() {
      eventBus.$emit("closeModal");
    },
  },
};
</script>