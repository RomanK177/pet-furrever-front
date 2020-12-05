<template>
  <section class="login modal">
    <div class="login modal-content">
      <button class="modal-close-btn" @click="closeModal">X</button>
      <h1 class="login-txt">Welcome</h1>
      <div v-if="loginFailed">Login Failed</div>
      <form @submit.prevent="login" class="flex column align-center">
        <label
          >Username: <input type="text" v-model="userCred.userName"
        /></label>
        <br />
        <label
          >Password: <input type="password" v-model="userCred.password"
        /></label>
        <br />
        <button @click.stop="emitCloseMenu" class="login-btn">Login</button>
      </form>
      <img src="../assets/imgs/dog-login.png" alt="" />
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
      loginFailed: false,
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch({
          type: "login",
          userCred: this.userCred,
        });
        if (this.$route.path != "/pet") {
          this.$router.push("/pet");
        }
        eventBus.$emit("closeModal");
      } catch (err) {
        this.loginFailed = true;
      }

      // eventBus.$emit('loginDone');
    },
    closeModal() {
      eventBus.$emit("closeModal");
    },
    emitCloseMenu() {
      this.$emit("closeMenu");
    },
  },
};
</script>