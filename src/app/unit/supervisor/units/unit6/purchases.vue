<template>
  <div v-if="state.factorsLoading">
    <loading/>
  </div>
  <div
      v-if="state.factors.length == 0 && !state.factorsLoading"
      class="text-center py-5"
  >
    {{ $t("noItem") }}
  </div>
  <div v-for="factor in state.factors" :key="factor" class="uper-card-1">
    <div
        class="d-flex justify-content-between align-items-center mt-2 pr-2 ltr"
    >
      <div class="p-2 hover-pointer">
        <div class="d-flex m-0">
          <p class="m-0">{{ factor.time }}</p>
          <p class="m-0 px-1">{{ factor.createDate }}</p>
        </div>
        <p class="m-0">UF_{{ factor.factorId }}</p>
      </div>
      <span class="ml-auto mr-3">
        <span class="d-flex size-small smart-text-align justify-content-end text-sm">
          {{ factor.sellerName }}</span
        >
      </span>
      <img
          v-lazy="factor.sellerProfileImageUrl + '_sm.webp'"
          alt=""
          class="user-profile-image"
      />
    </div>
    <div class="d-flex px-2 justify-content-between">
      <p class="m-0">
        {{ $t("shoppingType") }}: {{ productType(factor.productType) }}
      </p>
      <p class="m-0">
        {{ $t("totalPrice") }} : {{ factor.finalPrice }}
        <Currency :currency-id="factor.currencyId"/>
      </p>
    </div>
    <p class="px-2 text-right">
      {{ $t("status") }} : {{ factorStatus(factor.factorStaus) }}
    </p>
    <swiper
        :direction="'horizontal'"
        :free-mode="true"
        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
        :slides-per-view="'auto'"
        :space-between="2"
        class="slider"
    >
      <swiper-slide
          v-for="img in factor.imageUrls"
          :key="img"
          class="pt-2 mt-1"
          style="cursor: pointer"
      >
        <div class="">
          <img v-lazy="img + '_sm.webp'" alt="" class="w-60px swiper-img"/>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {purchasesState} from "./purchasesState";
import {factorStatus, productType} from "@/core/service/type.service";
import Currency from "@/app/public/shared/currency/Currency.vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import Ratio from "@/app/public/shared/ratio/ratio.vue";
import Loading from "@/app/public/shared/loading/Loading.vue";
import {ScrollController} from "@/core/service/scroll.service";
import {useRoute} from "vue-router";

export default {
  components: {
    Currency,
    Swiper,
    SwiperSlide,
    Ratio,
    Loading,
  },
  setup() {
    const state = ref(new purchasesState());
    const route = useRoute();
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      state.value.getFactors(route.params.supporterId);
    }

    onMounted(() => {
      state.value.getFactors(route.params.supporterId);
      scrollCtrl.startListen();
    });
    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });
    return {
      state,
      productType,
      factorStatus,
    };
  },
};
</script>

<style>
.swiper-img {
  border-radius: 15px;
  border: 1px solid rgb(203, 202, 202);
}

.w-60px {
  width: 60px;
}

.m-1px {
  margin-top: 1px;
}

.border-radius-2px {
  border-radius: 2px;
}

@media (min-width: 990px) {
  .close-btn {
    display: none;
  }
}

.close-btn {
  width: fit-content;
}

.user-profile-image {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}

.main-postImg {
  width: 25px;
  height: 25px;
  border-radius: 25px;
}

.comment-input {
  background-color: rgb(255, 255, 255);
  border: none;
  width: 85%;
  color: black;
}

.comment-input:focus {
  outline: none;
}

.size-too-small {
  font-size: 13px;
}

.size-small {
  font-size: 14px;
}

.size-medium {
  font-size: 22px;
}

.last-icon {
  font-size: 19px;
}

.eye-icon-color {
  color: rgb(100, 100, 100);
}

.more-color {
  color: rgb(120, 120, 120);
  margin-top: -14px;
}

::placeholder {
  color: rgb(0, 0, 0);
  opacity: 1;
}

.info {
  margin-top: -7px;
}

.caption {
  word-break: break-word;
  margin-top: -13px;
  text-justify: inter-word;
}

.swiper-container {
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  list-style: none;
  padding-right: 0;
  /*width: 506px !important;*/
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}

.newProduct-card {
  border-radius: 10px;
  box-shadow: 0 0 2px 2px #dfdfdf96;
  max-width: 180px;
  min-width: 180px;
}

.newProductImg {
  width: 100%;
  min-height: 180px;
  max-height: 180px;
  border-radius: 10px;
}

.offPercent {
  background-color: #e81818;
  width: 36px;
  height: 27px;
  border-radius: 4px;
}

p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.lined-txt {
  text-decoration: line-through;
}

.font-21 {
  font-size: 21px;
}

.long-caption {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.header-shadow {
  box-shadow: 0px 1px 9px #d0cfcfd4;
}

.icon {
  border: 1px solid black;
  border-radius: 50%;
  padding: 3px 10px;
  font-size: 20px;
}

.switch {
  display: block;
  margin-top: 24px;
}

.switch .slider {
  position: relative;
  display: inline-block;
  height: 11px;
  width: 32px;
  border-radius: 8px;
  cursor: pointer;
  background: #c5c5c5;
  transition: all 0.2s ease;
}

.switch .slider:after {
  background: #eeeeee;
  position: absolute;
  left: -8px;
  top: -8px;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  content: "";
  transition: all 0.2s ease;
}

.switch label {
  margin-right: 7px;
}

.switch .input {
  display: none;
}

.switch .input ~ .label {
  margin-left: 8px;
}

.switch .input:checked ~ .slider:after {
  left: 16px;
}

.switch .input:checked ~ .slider {
  background: #4cd27ba6;
}

.switch .input:checked ~ .slider:after {
  background: #4cd27b;
}

.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

.main {
  z-index: 4;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.border-radius {
  border-radius: 8px;
}
</style>
