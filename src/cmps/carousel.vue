<template>
  <el-carousel indicator-position="outside">
    <!-- <el-carousel-item v-for="item in 4" :key="item"> -->
    <el-carousel-item v-for="imgUrl in imgUrls" :key="imgUrl">
      <!-- <h3>{{ imgUrl }}</h3> -->
      <img :src="imgUrl" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      imgUrls: [
        require("../assets/imgs/homepage/hero1.2.png"),
        require("../assets/imgs/homepage/hero2.jpg"),
        require("../assets/imgs/homepage/hero3.jpg"),
        require("../assets/imgs/homepage/hero4.jpg"),
      ],
    };
  },
  //   methods: {
  //     getImgUrl: function (imagePath) {
  //       return require("@/assets/" + imagePath);
  //     },
  //   },
};
</script>




<style>
.el-carousel__container{
    height: 500px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  object-fit: cover;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
