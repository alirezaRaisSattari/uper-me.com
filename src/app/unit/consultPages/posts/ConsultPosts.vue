<template>
  <div class="mycard bg-white uper-card-1" style="width: 18rem;">
    <div class="row mx-2 my-2 d-flex justify-content-center headcard">
      <!--      <div class="col-8">-->
      <!--        <span class="mt-3">{{ page.name }}</span>-->
      <!--        <p class="mt-2 text-muted">{{ page.userName }}</p>-->
      <!--        <p>{{ page.creditLevel }}</p>-->
      <!--      </div> -->
      <div class="col-3 align-content-center justify-content-start">
        <div class="image-div">
          <img
              v-lazy="page.imageUrl + '_sm.webp'"
              alt="Card image cap"
              class="card-img-top img-fluid image rounded-circle"
          />
          <img
              v-if="page.creditLevel === 1"
              alt="My5 SVG"
              class="m-svg"
              src="@/assets/img/ic_crown_golden.svg"
          />
          <img
              v-if="page.creditLevel === 2"
              alt="My5 SVG"
              class="m-svg"
              src="@/assets/img/ic_crown_grey.svg"
          />
        </div>
      </div>

      <div class="col-9 smart-text-align">
        <span class="mt-3 p-0 m-0">{{ page.name }}</span>
        <p class="mt-2 text-muted p-0 m-0">{{ page.userName }}</p>
        <!-- <p>{{ page.creditLevel }}</p> -->
      </div>
    </div>
    <div class="card-body card-align">
      <Swiper
          :direction="'horizontal'"
          :free-mode="true"
          :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
          :slides-per-view="'auto'"
          :space-between="0"
      >
        <SwiperSlide v-for="i in page.categories" :key="i.categoryId">
          <span class="category-span">{{ i.name }}</span>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperSlide} from "swiper/vue";
import {reactive} from "vue";

// Import Swiper styles
import "swiper/swiper.scss";

import "swiper/components/pagination/pagination.min.css";

export default {
  name: "Card",
  //  props: ["name", "image", "catagorylist"],
  props: ["page"],
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const svg_crowns = reactive({
      golden: "@/assets/svg/ic_crown_golden.svg",
      grey: "@/assets/svg/ic_crown_grey.svg"
    });
    return {svg_crowns};
  }
};
</script>

<style scoped>
.image {
  border-radius: 50%;
  width: 80%;
  border: 2px solid #a2a6ab;
}

.mycard {
  width: 100% !important;
  max-height: 150px;
}

.headcard {
  max-height: 50px;
}

.category-span {
  border-radius: 22px;
  /* padding: 3px 3px 3px 3px; */
  padding-inline: 8px;
  color: #adb5bd;
  padding-bottom: 6px;
  font-size: 16px;

  border: 3px solid #eaecef;
}

.card-align {
  text-align: right;
  margin-top: 20px;
}

.swiper-container {
  width: 100%;
  height: 44px;
  direction: rtl;
  padding-bottom: 15px !important;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-div {
  position: relative;
}

/* .m-svg {
  position: absolute;
  bottom: 0px;
  left: 4vw;
  width: 20px;
  height: 20px;
} */

@media only screen and (max-width: 425px) {
  .m-svg {
    position: absolute;
    bottom: 0;
    left: 4vw;
    width: 20px;
    height: 20px;
  }
}

@media only screen and (min-width: 425px) {
  .m-svg {
    position: absolute;
    bottom: 0;
    left: 6vw;
    width: 20px;
    height: 20px;
  }
}

@media only screen and (min-width: 768px) {
  .m-svg {
    position: absolute;
    bottom: 5px;
    left: 4vw;
    width: 20px;
    height: 20px;
  }
}

@media only screen and (min-width: 1024px) {
  .m-svg {
    position: absolute;
    bottom: 3px;
    left: 3vw;
    width: 20px;
    height: 20px;
  }
}

@media only screen and (min-width: 1440px) {
  .m-svg {
    position: absolute;
    bottom: 4px;
    left: 2vw;
    width: 20px;
    height: 20px;
  }
}
</style>
