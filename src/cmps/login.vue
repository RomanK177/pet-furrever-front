<template>
<section class="login">
  <form>
    <label>User name: <input type="text" v-model="userCred.userName"></label>
    <label>Password: <input type="password" v-model="userCred.password"></label>
  </form>
</section>
</template>

<script>
export default {
  // props: {
  //   msg: String
  // },
  data(){
    return{
      userCred: {
        userName: null,
        password: null
      }
    }
  }
}
</script>