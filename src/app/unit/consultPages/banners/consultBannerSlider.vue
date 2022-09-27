<template>
  <swiper
      :pagination="{
      clickable: true
    }"
      :slidesPerView="'auto'"
      :spaceBetween="30"
  >
    <swiper-slide v-for="i in list" :key="i.showViewId" class="mySwiper">
      <img
          v-lazy="i.webImageUrl"
          alt="Girl in a jacket"
          class="img-fluid"
          style="object-fit:cover;"
      />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from "swiper/vue";

// Import Swiper styles
import "swiper/swiper.scss";

import "swiper/components/pagination/pagination.min.css";

//import "./style.css";
// import Swiper core and required modules
import SwiperCore, {Pagination} from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination]);

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: ["list"],

  setup(props) {
    return {};

  }
};
</script>

<style scoped>
#app {
  height: 100%;
}

html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.mySwiper {
  max-height: 300px;
  height: 100%;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 22px;
}
</style>
