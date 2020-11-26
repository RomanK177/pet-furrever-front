<template>
  <section class="user-details">
    <h1>Welcome {{ userToEdit.fullName }}</h1>
    <img :src="userToEdit.imgUrlProfile" alt="profile logo" />
    <h2>Full name: <input type="text" v-model="userToEdit.fullName" /></h2>
    <h2>Email: <input type="text" v-model="userToEdit.email" /></h2>
    <h2>Telephone: <input type="text" v-model="userToEdit.tel" /></h2>
    <h2>
      Date of birth: <input type="text" v-model="userToEdit.dateOfBirth" />
    </h2>
    <h2 v-if="userToEdit.ownPet">Own a pet</h2>
    <h2 v-if="userToEdit.ownedPet">Owned a pet</h2>
    <h2>
      Family status:
      <select v-model="userToEdit.familyStatus"></select>
    </h2>
    <h2>
      House status:
      <select v-model="userToEdit.houseStatus"></select>
    </h2>
    <!-- Add tags from elemnts -->
  </section>
</template>

<script>
import { userService } from "../../services/user-service";
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
};
</script>