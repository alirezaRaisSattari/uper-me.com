<template>
  <div>
    <p class="mt-0 mb-2 smart-text-align">{{ title }}</p>
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
          v-for="product in newProducts"
          :key="product.productId"
          class="pt-2 mt-1"
          style="cursor: pointer"
        >
          <div
            class="bg-white newProduct-card text-one-line"
            @click="goToNewProduct(product)"
          >
            <div class="img-con text-center">
              <img
                v-lazy="product.mainImageUrl + '_sm.webp'"
                class="newProductImg"
              />
            </div>
            <div>
              <p class="smart-text-align m-2 text-one-line">
                {{ product.name }}
              </p>
              <div class="m-2 smart-text-align">
                <div class="d-flex justify-content-between">
                  <div style="color: #ff9f00"><i class="fas fa-star"></i></div>
                  <div class="d-flex reverse-smart-text-align">
                    <p
                      v-if="product.offPercent != 0"
                      class="offPercent text-center text-white"
                    >
                      {{ product.offPercent }}%
                    </p>
                    <p
                      v-if="product.offPercent != 0"
                      class="text-muted mx-1 mt-1"
                    >
                      {{ $filters.currency(product.defaultPrice , product.currencyId == 0) }}
                    </p>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="text-muted">{{ product.average }}</p>
                  <div class="d-flex reverse-smart-text-align">
                    <currency
                      :currencyId="product.currencyId"
                      class="mt-1"
                    ></currency>
                    <p class="mx-1">
                      {{$filters.currency(
                        calculateCurrentPrice(
                          product.defaultPrice,
                          product.offPercent
                        ), product.currencyId == 0)
                      }}
                    </p>
                  </div>
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
import { Swiper, SwiperSlide } from "swiper/vue";
import router from "@/core/router/router";
import {slugify} from "@/core/service/utils.service";

export default {
  name: "newProducts",
  props: {
    newProducts: [],
    title: String,
  },
  components: {
    ratingStars,
    currency,
    Swiper,
    SwiperSlide,
  },

  setup(props) {
    const newProducts = ref(props.newProducts);
    const title = ref(props.title);

    function calculateCurrentPrice(defaultPrice, offPercent) {
      return (defaultPrice * (1 - offPercent / 100)).toFixed(2);
    }

    function goToNewProduct(product) {
      let x = document.createElement("a");
      x.href = `/product/${product.productId}/${null}/${slugify(product.name)}`;
      x.click();
      // router.replace({ name:'product',params:product.productId });
      // window.open(`/product/${}`, 'mywindow', 'width=500, height=400', )
    }

    return {
      calculateCurrentPrice,
      goToNewProduct,
      newProducts,
      title,
    };
  },
};
</script>

<style scoped>

p, span, div {
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
  font-size: 14px;
  padding-block: 4px;
}

p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}
</style>
