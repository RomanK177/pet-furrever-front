<template>
  <section class="messages-status">
    <!-- {{ unreadCount }} -->
  </section>
</template>

<script>
import { eventBus } from "../../services/event-bus-service.js";
export default {
  props: {
    requests: Array,
  },
  data() {
    return {
      unreadMessages: 0,
    };
  },
  computed: {
    // unreadCount() {
    //   let user = this.$store.getters.getLoggedInUser;
    //   let userRequests = this.requests.map(request => {
    //     if (user.userType === "owner") {
    //       return request.owner._id === user._id;
    //     } else {
    //       return request.adopter._id === user._id;
    //     }
    //     this.unreadMessages = userRequests.filter(request =>{
    //         return request.isRead === false;
    //     })
    //   });
    //     if (this.unreadMessages.length == 0) return "";
    //     return this.unreadMessages.length;
    // },
  },
  created() {
    // eventBus.$on("mail-readed", () => {
    //   mailService.getMails().then((mails) => {
    //     this.mails = mails;
    //   });
    // }),
    //   eventBus.$on("mail-added", () => {
    //     mailService.getMails().then((mails) => {
    //       this.mails = mails;
    //     });
    //   });
  },
};
</script>

