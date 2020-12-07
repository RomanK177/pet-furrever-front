<template>
  <section class="adoption-messages container" v-if="request">
    <h2>
      Lets Chat About <span class="bold orange">{{ request.pet.name }}</span>
    </h2>
    <!-- <div class="flex">
      <div>Messages Between <span class="bold">{{request.owner.name}}</span> and <span class="bold">{{request.adopter.name}}</span></div>
      <div> -->
    <!-- <ul class="bold flex space-between rendered-messages-header">
        <li>From</li>
        <li>Message</li>
        <li>Date</li>
      </ul> -->
    <div class="all-messages">
      <div v-for="(message, index) in request.messages" :key="index">
        <messages-preview :message="message" />
        <!-- <messages-preview :message="message" @markMessageAsUnread="markMessageAsUnread" /> -->
      </div>
    </div>
    <form @submit.prevent="addNewMessage" class="message-send">
      <input type="text" v-model="messageToAdd.txt" placeholder="Message" />
      <button>Send</button>
    </form>
    <!-- </div> -->
    <!-- </div> -->
  </section>
</template>
<script>
import messagesPreview from "../../cmps/user/messages-preview.vue";
import socketService from "../../services/socket-service.js";
// import adopterDetails from "./../../cmps/user/adopter-details.vue";
// import ownerDetails from "./../../cmps/user/owner-details.vue";
export default {
  components: { messagesPreview },
  data() {
    return {
      request: null,
      user: null,
      // allMessages: [],
      messageToAdd: {
        txt: "",
        date: "",
        from: "",
      },
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
      // this.messageToAdd.date = Date.now();
      // this.messageToAdd.from = this.user.fullName;
      // const currRequest = {request: this.request, message: this.messageToAdd}
      // console.log('updated request', updatedReq)
      socketService.emit("chat newMsg", this.messageToAdd.txt);
    },
    async addMessage(message) {
      debugger
      // console.log("messagexxxxxxx", message);
      // console.log("req", this.request._id);
      // this.request.messages.push(message);
      await this.$store.dispatch({
        type: "addMessage",
        adoptionId: this.request._id,
        message
      });
      this.updateRequest();
      // this.messageToAdd.txt = "";
      // this.messageToAdd.date = "";
    },
    async updateRequest() {
      const requestId = this.$route.params.id;
      const request = await this.$store.dispatch({
        type: "getAdoptionById",
        adoptionId: requestId,
      });
      this.request = request;
      console.log("request", request);
    },
    // markMessageAsUnread(message) {
    //   debugger
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
    console.log("req", this.request);
    const user = this.$store.getters.getLoggedInUser;
    // const user = await this.$store.dispatch({
    //   type: "getUserById",
    //   userId: userId,
    // });
    this.user = user;
    socketService.setup();
    socketService.emit("chat topic", this.request._id);
    socketService.on("chat addMsg", this.addMessage);
  },
  computed: {
    readUnRead() {
      console.log(this.message);
      if (this.message) return bold;
    },
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMessage);
    socketService.terminate();
  },
};
</script>