<template>
  <div>
    <avatar class="avatar" :fullname="name" size="size"></avatar>
  </div>
</template>

<script>
import Avatar from "vue-avatar-component";
export default {
  props: {
    name: String,
  },
  data() {
    return {
      size: 30,
    };
  },
  components: { Avatar },
};
</script>