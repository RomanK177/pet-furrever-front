<template>
  <section v-if="user" class="message-preview">
    <!-- <ul class="flex space-between" :class="readUnread"> -->
    <div class="messages flex column" :class="{greymsg: isReciever, bluemsg: isSender}" >
      <div class="message-from-date">
        <span class="bold"> {{ message.from }}</span>
        <span class="message-date">{{ sentTime }}</span>
      </div>
      <div class="message-text">
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
    user: Object
  },
  methods: {
    // markMessageAsUnread() {
    //   this.$emit("markMessageAsUnread", this.message);
    // },
  },
  created() {
    console.log('user in preview', this.user)
    console.log(this.message)
  },
  computed: {
    isSender(){
      const sender = (this.message.from === this.user.fullName) ? true : false
      return sender

      // if (this.user.userType === )

    },
    isReciever(){
     const reciever = (this.message.from !== this.user.fullName) ? true : false
     return reciever
    },
    // readUnread() {
    //   const loggedInUser = this.$store.getters.getLoggedInUser;
    //   if (this.message.from !== loggedInUser.fullName)
    //     return { bold: !this.message.isRead };
    // },
    sentTime() {
      let d = new Date(this.message.date);
      // return d.toDateString();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dateObj = d;
      const month = dateObj.getMonth() + 1;
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      const output = day + "." + month + "." + year;
      return output;
    }
  },
};
</script>