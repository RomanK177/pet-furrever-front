<template>
  <section class="message-preview">
    <!-- <ul class="flex space-between" :class="readUnread"> -->
    <div class="messages flex column">
      <div class="message-from-date">
        <span class="bold"> {{ message.from }}</span>
        <span class="message-date">{{ date }}</span>
      </div>
      <div>
        {{ message.txt }}
      </div>
    </div>
    <!-- <ul class="flex space-between">
      <li>{{ message.from }}</li>
      <li>{{ message.txt }}</li>
      <li>{{ message.date }}</li>
    </ul> -->
  </section>
</template>

<script>
export default {
  props: {
    message: Object,
  },
  methods: {
    // markMessageAsUnread() {
    //   this.$emit("markMessageAsUnread", this.message);
    // },
  },
  created() {
    // this.markMessageAsUnread();
  },
  computed: {
    // readUnread() {
    //   const loggedInUser = this.$store.getters.getLoggedInUser;
    //   if (this.message.from !== loggedInUser.fullName)
    //     return { bold: !this.message.isRead };
    // },
    date() {
      let date = new Date(this.message.date);
      return date.toDateString();
    },
  },
};
</script>