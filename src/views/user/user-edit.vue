<template>
  <section class="user-details">
    <adopter-edit v-if="userToEdit && userToEdit.userType === 'adopter'" :userToEdit="userToEdit" />
    <owner-edit v-if="userToEdit && userToEdit.userType === 'owner'" :userToEdit="userToEdit" />
  </section>
</template>

<script>
import { userService } from "../../services/user-service";
import adopterEdit from './../../cmps/user/adopter-edit.vue';
import ownerEdit from './../../cmps/user/owner-edit.vue';

export default {
  data() {
    return {
      userToEdit: null,
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.getUser(userId);
  },
  methods: {
    async getUser(userId) {
      const user = await this.$store.dispatch({
        type: "getUserById",
        userId,
      });
      this.userToEdit = user;
    },
  },
  computed: {
  },
  components:{
    adopterEdit,
    ownerEdit
  }
};
</script>