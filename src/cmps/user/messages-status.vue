<template>
  <section v-if="unreadCount" class="messages-status badge">
    {{ unreadCount }}
  </section>
</template>

<script>
import { eventBus } from "../../services/event-bus-service.js";
export default {
  props: {
    adoptionRequest: Object,
  },
  data() {
    return {
      unreadMessages: [],
    };
  },
  computed: {
    unreadCount() {
      debugger;
      if (!this.adoptionRequest.isReadReceiver) {
        return;
        if (this.adoptionRequest.isReadReceiver === false) {
          return "1";
        }
      }
    },
  },
};
</script>

