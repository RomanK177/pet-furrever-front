<template>
  <section class="owner-details">
    <h1>Welcome {{ owner.userName }}</h1>
    <!-- <img src="" alt=""> Need to uploade from cloudinary -->
    <h2>{{ owner.name }}</h2>
    <h2>{{ owner.email }}</h2>
    <h2>{{ owner.tel }}</h2>
    <h2>{{ owner.activityYears }}</h2>
    <h2>{{ owner.title }}</h2>
    <h2>{{ owner.desc }}</h2>
    <!-- Add tags from elemnts -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      owner: null,
    };
  },
<<<<<<< HEAD
  async created(){
=======
  async created() {
>>>>>>> 64fa4098a8f260d883d8ed82b43bb237d566aaf1
    var ownerId = this.$router.params.id;
    const currOwner = await ownerService.getOwnerById(ownerId);
    this.owner = currOwner;
  },
};
</script>