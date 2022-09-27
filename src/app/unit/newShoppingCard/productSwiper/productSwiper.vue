<template>
  <div v-if="state.loading">
    <loading />
  </div>
  <div v-else>
    <div class="mb-2">
      <swiper
        :direction="'horizontal'"
        :free-mode="true"
        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
        :slides-per-view="'auto'"
        :space-between="15"
        class="slider"
      >
        <swiper-slide
          v-for="product in state.newProducts"
          :key="product.productId"
          class="pt-2 mt-1"
          style="cursor: pointer"
        >
          <div
            class="bg-white newProduct-card text-one-line"
            @click="goToNewProduct(product)"
          >
            <div class="img-con text-center">
              <img v-lazy="product.mainImageUrl + '_sm.webp'" class="newProductImg" />
            </div>
            <div>
              <p class="smart-text-align m-2 text-one-line">
                {{ product.name }}
              </p>
              <div class="m-2 smart-text-align">
                <div class="d-flex justify-content-between rtl">
                  <div style="color: #ff9f00">
                    <i class="fas fa-star font-21"></i>
                  </div>
                  <div class="d-flex rtl">
                    <p v-if="product.offPercent != 0" class="text-muted mx-1 mt-1 lined-txt" >
                      {{$filters.currency( product.defaultPrice) }}
                    </p>
                    <div v-if="product.offPercent" class="offPercent d-flex justify-content-center px-4" >
                      <p v-if="product.offPercent != 0" class="my-auto text-white">
                        %&nbsp;{{ product.offPercent }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between mt-1">
                  <p class="text-muted">{{ product.average }}</p>
                  <div class="d-flex reverse-smart-text-align">
                    <currency :currencyId="product.currencyId" class="mt-1"></currency>
                  </div>
                  <p class="mr-auto ml-1">
                    <b>{{$filters.currency(calculateCurrentPrice(product.defaultPrice, product.offPercent) ,false )}}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ratingStars from "@/app/public/shared/ratinstar/ratingStars.vue";
import currency from "@/app/public/shared/currency/Currency.vue";
import router from "@/core/router/router";
import { productSwiperState } from "./productSwiperState";
import { Swiper, SwiperSlide } from "swiper/vue";
import { slugify } from "@/core/service/utils.service";

export default {
  components: {
    ratingStars,
    currency,
    Swiper,
    SwiperSlide,
  },

  setup() {
    const state = ref(new productSwiperState());
    state.value.getProducts();

    function calculateCurrentPrice(defaultPrice, offPercent) {
      return (defaultPrice * (1 - offPercent / 100)).toFixed(2);
    }

    function goToNewProduct(product) {
      router.push(`/product/${product.productId}/${null}/${slugify(product.name)}`);
    }

    return {
      calculateCurrentPrice,
      goToNewProduct,
      state,
    };
  },
};
</script>

<style scoped>
p,
span,
div {
  font-size: 13px !important;
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
</style>
