<template>
  <div class="details-images">
    <img
      v-for="(imgUrl, index) in pet.imgUrls"
      :key="index"
      :src="getUrl(imgUrl)"
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
    methods: {
      getUrl(url) {
        let urlStart = url.slice(0, 4);
        if (urlStart === "http") return url;
        else return require(`../../assets/imgs/pets/${url}`);
      },
    },
  },
};
</script>

  