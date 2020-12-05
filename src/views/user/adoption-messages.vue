<template>
  <section>
    <div class="adoption-messages container" v-if="request">
      <h2>Lets Chat About {{ request.pet.name }}</h2>
      <ul class="rendered-messages">
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
// import adopterDetails from "./../../cmps/user/adopter-details.vue";
// import ownerDetails from "./../../cmps/user/owner-details.vue";
import messages from "../../cmps/user/messages.vue";
export default {
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
      // debugger;
      await this.$store.dispatch({
        type: "addMessage",
        adoptionId: this.request._id,
        message: JSON.parse(JSON.stringify(this.messageToAdd.txt)),
      });
      this.messageToAdd.txt = ''
      this.updateRequest()
    },
      async updateRequest() {
        const requestId = this.$route.params.id;
        const request = await this.$store.dispatch({
          type: "getAdoptionById",
          adoptionId: requestId,
        });
        this.request = request;
    },
  },
  async created() {
    const requestId = this.$route.params.id;
    const request = await this.$store.dispatch({
      type: "getAdoptionById",
      adoptionId: requestId,
    });
    this.request = request;
    console.log("req", this.request.messages);
    const userId = this.request.user._id;
    const user = await this.$store.dispatch({
      type: "getUserById",
      userId: userId,
    });
    this.user = user;
    console.log("user", this.user);
  },
  components: {
    messages,
  },
};
</script>