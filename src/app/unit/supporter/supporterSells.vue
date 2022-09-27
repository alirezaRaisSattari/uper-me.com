<template>
  <div>
    <mainSupporter/>
    <div
        v-for="i in 5"
        :key="i"
        class="sells-card w-100 d-flex flex-column my-3"
    >
      <div class="w-100 d-flex justify-content-between">
        <div class="w-50 d-flex">
          <div class="w-100 d-flex align-items-center">
            <img alt="" class="img" src="@/assets/img/uper.png"/>
            <div class="d-flex flex-column px-2">
              <span>ascsac</span>
              <span>مشهد</span>
            </div>
          </div>
        </div>
        <div class="w-50 d-flex flex-column align-items-end">
          <p>
            <span>16:04</span>
            <span>16/1/1400</span>
          </p>
          <span>UF_71</span>
        </div>
      </div>
      <div class="w-100 d-flex justify-content-between">
        <div class="w-50 d-flex align-items-end">
          <span> {{ $t("shoppingType") }} : {{ $t("reserve") }}</span>
        </div>
        <div class="w-50">
          <span> {{ $t("totalPrice") }} : </span>
          <span>23,750</span>
        </div>
      </div>
      <div class="w-100 d-flex flex-column">
        <p class="w-100 text-right mt-2">{{ $t("status") }} accepted</p>
        <div class="w-100">
          <swiper
              id="myswiper"
              :direction="'horizontal'"
              :free-mode="true"
              :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
              :slides-per-view="'1'"
              :space-between="100"
              class="slider"
          >
            <swiper-slide v-for="i in 5" :key="i" class="text-right">
              <img alt="" class="swip-img" src="@/assets/img/uper.png"/>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainSupporter from "./mainSupporter.vue";
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  name: "supporterSells",
  components: {
    mainSupporter, Swiper, SwiperSlide
  },
};
</script>

<style scoped>
.sells-card {
  font-size: 14px;
  border-radius: 10px;
  width: calc(100% - 40px);
  padding: 10px;
  margin: 10px;
  box-shadow: 1px 2px 10px #afadad;
}

.img {
  width: 70px;
  height: 70px;
  background: blue;
  border-radius: 50%;
  text-align: center;
  border: 1px solid #fafafa;
}

.swip-img {
  width: 60px;
  height: 60px;
}
</style>
