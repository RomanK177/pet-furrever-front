<template>
  <div class="details-images">
    <img
      v-for="(imgUrl, index) in urls"
      :key="index"
      :src="imgUrl"
      alt=""
      :class="{
        item0: index === 0,
        item1: index === 1,
        item2: index === 2,
        item3: index === 3,
        item4: index === 4,
      }"
    />
  </div>
</template>
<script>
export default {
  name: "detailImages",
  props: {
    pet: {
      type: Object,
    },
  },
  data() {
    return {
      urls: null,
    };
  },
  computed: {
    // getUrl() {
    //   let newUrls = this.pet.urls.map((url) => {
    //     let urlStart = url.slice(0, 4);
    //     if (urlStart === "http") return url;
    //     else return require(`../../assets/imgs/pets/${url}`);
    //   });
    //   this.urls = newUrls;
    // },
  },
  created() {
    let newUrls = this.pet.imgUrls.map((url) => {
      let urlStart = url.slice(0, 4);
      if (urlStart === "http") return url;
      else return require(`../../assets/imgs/pets/${url}`);
    });
    this.urls = newUrls;
  },
};
</script>

  