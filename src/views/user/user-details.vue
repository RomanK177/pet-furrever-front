<template>
  <section class="user-details">
    <h1>Welcome {{ user }}!</h1>
    <h1>Welcome {{ user.userName }}</h1>
    <!-- <img src="" alt=""> Need to uploade from cloudinary -->
    <h2>{{ user.fullName }}</h2>
    <h2>{{ user.email }}</h2>
    <h2>{{ user.tel }}</h2>
    <h2>{{ user.dateOfBirth }}</h2>
    <h2 v-if="user.ownPet">Own a pet</h2>
    <h2 v-if="user.ownedPet">Owned a pet</h2>
    <h2>{{ user.familyStatus }}</h2>
    <h2>{{user.houseStatus}}</h2>
    <!-- Add tags from elemnts -->
  </section>
</template>

<script>
import { userService } from '../../services/user-service';
export default {
  data() {
    return {
      user: null,
    };
  },
  created(){
    var userId = this.$router.params.id;
    const currUser = await userService.getUserById(userId);
    this.user = currUser;
  }
};
</script>