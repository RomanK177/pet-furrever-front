<template>
  <div>
    <avatar class="avatar" :fullname="name" size="25"></avatar>
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