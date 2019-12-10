<template>
  <div id="app">
    <header>
      <div class="banner">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(image, index) in img" :key="index">
            <router-link to="/search">
              <img :src="image" alt="banner">
            </router-link>
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination"></div>
        </swiper>
        <!-- <router-link to="/search">
          <img src="https://fuss10.elemecdn.com/b/74/55aceba2b0b22d83b105370db1a7ajpeg.jpeg?imageMogr/thumbnail/!750x369r/gravity/Center/crop/750x369/" alt="banner">
        </router-link> -->
      </div>
    </header>
    <div class="product-list">
      <Product
        v-for="product of productLists"
        :key="product.foodId"
        class="product"
        :product="product"
      >
      </Product>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Product from '../components/product.vue'
import productData from '../data'

export default {
  name: 'App',

  components: {
    Product,
    swiper,
    swiperSlide
  },

  data() {
    return {
      productLists: productData,
      img: [
        'https://fuss10.elemecdn.com/b/74/55aceba2b0b22d83b105370db1a7ajpeg.jpeg?imageMogr/thumbnail/!750x369r/gravity/Center/crop/750x369/',
        'https://fuss10.elemecdn.com/b/74/55aceba2b0b22d83b105370db1a7ajpeg.jpeg?imageMogr/thumbnail/!750x369r/gravity/Center/crop/750x369/',
        'https://fuss10.elemecdn.com/b/74/55aceba2b0b22d83b105370db1a7ajpeg.jpeg?imageMogr/thumbnail/!750x369r/gravity/Center/crop/750x369/',
        'https://fuss10.elemecdn.com/b/74/55aceba2b0b22d83b105370db1a7ajpeg.jpeg?imageMogr/thumbnail/!750x369r/gravity/Center/crop/750x369/'
      ],
      swiperOption: {
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.swiper-pagination',
          disableOnInteraction: false
        },
        loop: true
      }
    }
  }
}
</script>

<style>
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-tap-highlight-color: transparent;
  }
  html {
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Tahoma, Arial, PingFangSC-Regular, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    touch-action: manipulation;
  }
  body {
    margin: 0;
  }
</style>

<style scoped>
  .swiper-container {
    height: 360px;
  }
  .banner img {
    width: 100%;
  }
</style>
