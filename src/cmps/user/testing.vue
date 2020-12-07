<template>
  <section class="adoption-messages container" v-if="request">
    <h2>
      Lets Chat About <span class="bold orange">{{ request.pet.name }}</span>
    </h2>
    <div class="all-messages flex column">
      <div v-for="(message, index) in request.messages" :key="index">
        <messages-preview :message="message" :user="user" />
      </div>
    </div>
    <form @submit.prevent="addNewMessage" class="message-send flex">
      <input type="text" v-model="messageToAdd.txt" placeholder="Message" />
      <img class="plane" src="../../assets/svgs/plane.svg" alt="">
    </form>
  </section>
</template>
<script>
import messagesPreview from "../../cmps/user/messages-preview.vue";
import socketService from "../../services/socket-service.js";
export default {
  components: { messagesPreview },
  props: {
    user: Object,
    request: Object
  },
  data() {
    return {
    //   request: null,
    //   user: null,
      allMessages: [],
      messageToAdd: {
        txt: "",
        date: "",
        from: "",
      },
    //   pet: null
    };
  },
  methods: {
    async getUser(userId) {
      const user = await this.$store.dispatch({
        type: "getUserById",
        userId,
      });
      this.user = user;
    },
    addNewMessage() {
      socketService.emit("chat newMsg", this.messageToAdd.txt);
    },
    async addMessage(message) {

      await this.$store.dispatch({
        type: "addMessage",
        adoptionId: this.request._id,
        message
      });
      this.updateRequest();
      this.messageToAdd.txt = "";
      // this.messageToAdd.date = "";
    },
    async updateRequest() {
      const requestId = this.$route.params.id;
      const request = await this.$store.dispatch({
        type: "getAdoptionById",
        adoptionId: requestId,
      });
      this.request = request;
    },
    // markMessageAsUnread(message) {
    //   this.$store.dispatch({
    //     type: "markMessageAsUnread",
    //     message,
    //     adoptionRequestId: this.request._id,
    //   });
    // },
  },
  async created() {
    const requestId = this.$route.params.id;
    const request = await this.$store.dispatch({
      type: "getAdoptionById",
      adoptionId: requestId,
    });
    this.request = request;
    const user = this.$store.getters.getLoggedInUser;
    this.user = user;
    socketService.setup();
    socketService.emit("chat topic", this.request._id);
    socketService.on("chat addMsg", this.addMessage);
  },
  computed: {
    readUnRead() {
      if (this.message) return bold;
    },
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMessage);
    socketService.terminate();
  },
};
</script>