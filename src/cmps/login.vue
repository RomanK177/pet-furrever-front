<template>
  <section class="login modal">
    <div class="login modal-content">
      <button class="modal-close-btn" @click="closeModal">X</button>
      <h1 class="login-txt">Welcome</h1>
      <div v-if="loginFailed">Login Failed</div>
      <form @submit="login" class="flex column align-center">
        <label
          >User name: <input type="text" v-model="userCred.userName" /></label>
        <br />
        <label
          >Password: <input type="password" v-model="userCred.password" /></label>
        <br />
        <button class="login-btn">Login</button>
      </form>
      <img src="../assets/imgs/dog-login.png" alt="">
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
      loginFailed: false
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch({
          type: 'login',
          userCred: this.userCred
        });

        eventBus.$emit("closeModal");
      } catch(err) {
        this.loginFailed = true
      }
      // this.$router.push('/');
      // eventBus.$emit('loginDone');
    },
    closeModal() {
      eventBus.$emit("closeModal");
    },
  },
};
</script>