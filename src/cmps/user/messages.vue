<template>
  <section>
    <div class="messages">
      <h2>Lets Chat About {{ request.pet.name }}</h2>
      <ul>
        <li v-for="(message, index) in request.messages" :key="index">
          <span class="bold">{{ message.from }}:</span> {{ message.txt }}
        </li>
      </ul>
      <form @submit.prevent="addMessage">
        <input type="text" v-model="messageToAdd.txt" placeholder="Message" />
        <button>Send</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    request: Object,
    user: Object,
  },
  data() {
    return {
      messageToAdd: {
        txt: "",
        from: "",
      },
    };
  },
  methods: {
    addMessage() {
      this.messageToAdd.from = this.user.fullName;
      console.log("hi", this.user);
      // this.request.messages.push(this.messageToAdd)
      console.log(this.messageToAdd);
      this.$emit(
        "addMessage",
        this.request._id,
        JSON.parse(JSON.stringify(this.messageToAdd))
      );
      this.messageToAdd.txt = "";
    },
  },
};
</script>

