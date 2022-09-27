<template>
  <div class="text-center mt-4 ">
    <h2 class="mb-4">غرفه میزبان</h2>

    <swiper
        :direction="'horizontal'"
        :free-mode="true"
        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
        :slides-per-view="'auto'"
        :space-between="0"
        class="slider"
    >
      <swiper-slide v-for="item in state.swiperItemsArray" :key="item" class="pt-2">
        <div class="smart-text-align px-2">{{ item.description }}</div>
        <div>
          <img class="img" src="https://picsum.photos/512/512/">
        </div>
      </swiper-slide>
    </swiper>

    <div class="mt-4">
      <p class="mt-2 ">
        رستوران موزیک دار سالود بسیار شیک و مجلل است. در این رستوران انوع
        غذاهای دریایی و ایرانی سرو میشود. دارای کافی شاپ که شما میتوانید از
        نوشیندی های سرد و گرم لذت ببرد، همچنین پخش موزیک درکنار سرو غذا
        .و از اجرای زیبای هنرمندان می توانید بهره ببرید
      </p>
    </div>

    <button class="btn btn-danger costume-btn mt-4" type="button">{{ $t('stationSelection') }}</button>
  </div>
</template>

<script>
import {Swiper, SwiperSlide} from "swiper/vue";
import {ref} from 'vue'
import {HostBoothState} from "./HostBoothState";

export default {
  name: "hostBooth",
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const state = ref(new HostBoothState())
    return {
      state
    }

  }
}
</script>

<style scoped>

.swiper-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 61px;

  overflow: hidden;
  list-style: none;

  padding-right: 0px;
  top: -1px;
  z-index: 54;
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}

.img {
  width: 400px;
  height: 300px;
  padding-top: 3px;
  padding-inline: 3px;
  border-radius: 10px;;
}

div p {
  text-align: justify; /* For Edge */
  -moz-text-align-last: center; /* For Firefox prior 58.0 */
  text-align-last: center;
}

.costume-btn {
  background-color: #dc3545e3 !important;
  border-radius: 14px;
}

</style>