<template>
  <section class="user-details container">
    <adopter-edit
      v-if="userToEdit && userToEdit.userType === 'adopter'"
      :userToEdit="userToEdit"
    />
    <owner-edit
      v-if="userToEdit && userToEdit.userType === 'owner'"
      :ownerToEdit="userToEdit"
    />
  </section>
</template>

<script>
import { userService } from "../../services/user-service.js";
import adopterEdit from "./../../cmps/user/adopter-edit.vue";
import ownerEdit from "./../../cmps/user/owner-edit.vue";

export default {
  data() {
    return {
      userToEdit: null,
    };
  },
  async created() {
    debugger
    const userId = this.$route.params.id;
    const user = await userService.getById(userId);
    this.userToEdit = user;
  },
  methods: {},
  computed: {},
  components: {
    adopterEdit,
    ownerEdit,
  },
};
</script>