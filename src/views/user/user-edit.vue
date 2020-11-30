<template>
  <section class="user-details container">
    <adopter-edit v-if="userToEdit && userToEdit.userType === 'adopter'" :userToEdit="userToEdit" />
    <owner-edit v-if="userToEdit && userToEdit.userType === 'owner'" :ownerToEdit="userToEdit" />
  </section>
</template>

<script>
import { userService } from "../../services/user-service.js";
import adopterEdit from './../../cmps/user/adopter-edit.vue';
import ownerEdit from './../../cmps/user/owner-edit.vue';

export default {
  data() {
    return {
      userToEdit: null,
    };
  },
  async created() {
    const userId = this.$route.params.id;
    const user = userService.getById(userId);
    // this.getUser(userId);
          this.userToEdit = user;

  },
  methods: {
    // async getUser(userId) {
    //   const user = await this.$store.dispatch({
    //     type: "getUserById",
    //     userId,
    //   });
    //   this.userToEdit = user;
    // },
  },
  computed: {
  },
  components:{
    adopterEdit,
    ownerEdit
  }
};
</script>