<template>
  <div>
    <avatar :fullname="name" size="30"></avatar>
  </div>
</template>

<script>
import Avatar from "vue-avatar-component";
export default {
  props: {
    name: String,
  },
  components: { Avatar },
};
</script>