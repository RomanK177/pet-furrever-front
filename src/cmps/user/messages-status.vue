<template>
  <section v-if="messages" class="messages-status badge">
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
      unreadMessages: 0,
    };
  },
  computed: {
    unreadCount() {
      if (!this.messages || !this.messages.length) {
        return;
      } else {
        let unreadMessages = this.messages.filter((message) => {
          return message.isReadReceiver === false;
        });
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

