<template>
  <div>
    <avatar class="user-avatar" :fullname="name" size="30"></avatar>
  </div>
</template>

<script>
import Avatar from "vue-avatar-component";
export default {
  props: {
    name: String,
  },
  data() {
    return {};
  },
  components: { Avatar },
};
</script>