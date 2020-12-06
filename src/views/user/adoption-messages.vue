<template>
  <section class="adoption-messages container" v-if="request">
      <h2>Lets Chat About <span class="bold orange">{{ request.pet.name }}</span></h2>
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
      </div>
      </div>

      <form @submit.prevent="addMessage" class="message-send">
        <input type="text" v-model="messageToAdd.txt" placeholder="Message" />
        <button>Send</button>
      </form>
    <!-- </div> -->
    <!-- </div> -->
  </section>
</template>

<script>
import messagesPreview from "../../cmps/user/messages-preview.vue";
// import adopterDetails from "./../../cmps/user/adopter-details.vue";
// import ownerDetails from "./../../cmps/user/owner-details.vue";
export default {
  components: { messagesPreview },
  data() {
    return {
      request: null,
      user: null,
      messageToAdd: {
        txt: "",
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
    async addMessage(adoptionId, message) {
      await this.$store.dispatch({
        type: "addMessage",
        adoptionId: this.request._id,
        message: JSON.parse(JSON.stringify(this.messageToAdd.txt)),
      });
      this.messageToAdd.txt = "";
      this.updateRequest();
    },
    async updateRequest() {
      const requestId = this.$route.params.id;
      const request = await this.$store.dispatch({
        type: "getAdoptionById",
        adoptionId: requestId,
      });
      this.request = request;
      console.log(request);
    },
  },
  async created() {
    const requestId = this.$route.params.id;
    const request = await this.$store.dispatch({
      type: "getAdoptionById",
      adoptionId: requestId,
    });
    this.request = request;
    console.log('req',this.request)

    const user = this.$store.getters.getLoggedInUser;
    // const user = await this.$store.dispatch({
    //   type: "getUserById",
    //   userId: userId,
    // });
    this.user = user;
  },
  computed: {
    readUnRead() {
      console.log(this.message);
      if (this.message) return bold;
    },
  },
};
</script>