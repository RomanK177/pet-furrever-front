<template>
  <section v-if="unreadCount" class="messages-status badge">
    {{ unreadCount }}
  </section>
</template>

<script>
import { eventBus } from "../../services/event-bus-service.js";
export default {
  props: {
    messages: Array,
  },
  data() {
    return {
      unreadMessages: [],
    };
  },
  computed: {
    unreadCount() {
      var loggedInUser = this.$store.getters.getLoggedInUser;
      if (!this.messages || !this.messages.length) {
        return;
      } else {
        let unreadMessages = this.messages.filter((message) => {
          return message.isReadReceiver === false && loggedInUser.fullName !== message.from;
        });
        // this.unreadMessages.push(unreadMessages.length)
        return unreadMessages.length;
      }
    },
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

