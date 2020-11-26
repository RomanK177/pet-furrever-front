<template>
  <div class="owner-edit">
    <h1>Edit your profile</h1>
    <form>
        <template v-if="!isLoading">
            <label for="imgUploader">Choose your profile picture:
        <br />
            <img class="owner-profile-picture" :src="ownerToEdit.imgUrlProfile" />
            </label>
      <br />
      <input type="file" name="img-uploader" id="imgUploader" @change="onUploadImgProfile" />
    </template>
    <img v-else src="../../assets/imgs/loading.gif" />
      <label>Name: <input type="text" v-model="ownerToEdit.name" /></label>
      <label>Email: <input type="email" v-model="ownerToEdit.email" /></label>
      <label>Telephone: <input type="tel" v-model="ownerToEdit.tel" /></label>
      <label>Activity years: <input type="number" v-model="ownerToEdit.activityYears" /></label>
      <label>Title: <input type="text" v-model="ownerToEdit.title" /></label>
      <label>Description: <input type="text" v-model="ownerToEdit.desc" /></label>
    <label>Choose your browser from the list:</label>
    <input list="tags" v-model="ownerToEdit.tags">
    <datalist id="tags">
        <option value="Variety of pets" />
        <option value="Care for all animals" />
        <option value="Dog's expert" />
        <option value="Cat lovers" />
        <option value="Big animals professionals" />
    </datalist>
          <input type="file" name="img-uploader2" id="imgUploader2" @change="onUploadImgs" />
    <img class="owner-imgs" id="imgUploader2" v-for="(imgUrl,idx) in owner.imgUrls" :key="idx" :src="imgUrl">
      <button>Save</button>
    </form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            isLoading: false,
            ownerToEdit: null
        }
    },
    created(){
      const ownerId = this.$route.params.id;
      this.getOwner(ownerId);
    },
  methods: {
      async getOwner(ownerId) {
        const owner = await this.$store.dispatch({
          type: "getOwnerById",
          ownerId,
        });
        this.user = user;
      },
    async onUploadImgProfile(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.owner.imgUrlProfile = res.url;
      this.isLoading = false;
    },
    //     async onUploadImgs(ev) {
    //   // this.isLoading = true;
    //   const res = await uploadImg(ev);
    //   this.owner.imgUrls.push(res.url);
    //   // this.isLoading = false;
    // },
  },
};
</script>