<template>
  <div
      class="d-flex h-100 w-100 align-content-center justify-content-center mt-2"
  >
    <div class="bg-transparent w-100 mx-2">
      <div class="d-flex justify-content-between">
        <div class="search-container px-2">
          <i class="fas fa-search search-icon"></i>
          <input
              :placeholder="$t('search')"
              class="form-control input-search"
              type="text"
          />
        </div>
        <p
            class="mt-2 hover-pointer"
            @click="
            state.showCities = true;
            state.selectedCities = [];
          "
        >
          {{ state.cityLabelName }}
        </p>
        <div class="mt-2">
          <i class="fas fa-map-marker-alt marker-icon"></i>
        </div>
      </div>
      <swiper
          :direction="'horizontal'"
          :free-mode="false"
          :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
          :slides-per-view="'5'"
          :space-between="0"
          class="slider"
      >
        <swiper-slide
            v-for="(item, index) in state.chipsArray"
            :key="item"
            class="pt-2"
        >
          <Chip
              v-if="(state.selectedCities.length != 1 && index == 1) == false"
              :label="item"
              class="p-mb-2"
              @click="showFilterPage(index)"
          />
        </swiper-slide>
      </swiper>
      <!-- show found products-->
      <div v-if="state.loadingProducts" class="text-center">
        <div class="spinner-border text-secondary mx-auto" role="status">
          <p class="sr-only">Loading...</p>
        </div>
      </div>
      <div v-if="state.showFoundProducts">
        <div
            v-for="item in state.found_productsByFilterAPI"
            :key="item"
            class="smart-text-align uper-card-1 d-flex justify-content-between bg-white mt-2 mx-2"
            @click="changeDirectory(item)"
        >
          <div class="col-8 mt-2">
            <p class="col-12 mb-2 px-0">{{ item.name }}</p>
            <div class="col-12 mb-3 d-flex justify-content-between px-0">
              <div class="d-flex">
                <p class="text-muted px-0">{{ $t("cost") }}:</p>
                <p class="mx-2 curr-price px-0">
                  {{
                    item.defaultPrice - item.offPercent * (1 / 100) == 0
                        ? $t("agreement")
                        : item.defaultPrice - item.offPercent * (1 / 100)
                  }}
                  <currency
                      :currencyId="item.currencyId"
                      class="mb-1"
                  ></currency>
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <del class="text-muted mx-1">{{ item.defaultPrice }}</del>
                <p v-if="item.offPercent != null" class="sale">
                  % {{ item.offPercent }}
                </p>
              </div>
            </div>
            <div class="d-flex smart-text-align px-0">
              <p class="col-3 smart-text-align mb-2 px-0">
                {{ DateService.getInstance().timeDifference(item.ladderedAt) }}
              </p>
              <p
                  v-if="item.areaName != null"
                  class="col-6 smart-text-align mb-2 px-0"
              >
                {{ $t("at") }} {{ item.areaName }}
              </p>
            </div>
          </div>
          <div class="col-4 align-items-center justify-content-center">
            <div class="w-100 text-center">
              <img
                  v-lazy="item.mainImageUrl + '_sm.webp'"
                  class="product-img img-fluid"
              />
              <img
                  v-if="item.creditLevel == 1"
                  class="crown"
                  src="@/assets/img/ic_crown_golden.svg"
              />
            </div>
            <div class="text-center">
              <ratingStars :rate="item.average"/>
            </div>
          </div>
        </div>
      </div>

      <Dialog
          v-model:visible="state.showFilterPage"
          :breakpoints="{
          '1000px': '52vw',
          '800px': '65vw',
          '600px': '91vw',
        }"
          :contentStyle="{
          background: 'rgb(255, 255, 255)',
          borderRadius: '12px',
          padding: '1px',
        }"
          :dismissableMask="true"
          :modal="true"
          :showHeader="false"
          :style="{
          width: '25vw',
          background: 'rgb(255, 255, 255)',
          borderRadius: '12px',
          padding: '0px',
        }"
      >
        <filterPageRecentProducts
            :getFound_productsByFilterAPI="found_productsByFilterAPI"
            :selectedChip="selectedChip"
            :selectedCities="state.selectedCities"
            @closeFilterPage="closeFilterPage"
        ></filterPageRecentProducts>
      </Dialog>
      <!-- cities -->
      <Dialog
          v-model:visible="state.showCities"
          :breakpoints="{
          '1000px': '52vw',
          '800px': '65vw',
          '600px': '91vw',
        }"
          :contentStyle="{
          background: 'rgb(255, 255, 255)',
          borderRadius: '12px',
          paddingBottom: '10px',
        }"
          :dismissableMask="state.citiesArray.length==0"
          :modal="true"
          :showHeader="false"
          :style="{ width: '25vw', background: 'rgb(255, 255, 255)' }"
          header=""
      >
        <br/>
        <div v-if="state.citiesArray.length != 0">
          <p class="smart-text-align header bg-light w-100">
            {{ $t("selectCity") }}
          </p>
          <p
              v-for="(item, index) in state.citiesArray"
              :key="item"
              :style="
              index == 0
                ? 'margin-top:44px;'
                : '' || index == state.citiesArray.length - 1
                ? 'margin-bottom:157px;'
                : ''
            "
              class="d-flex px-2 py-2 smart-text-align justify-content-between filters uper-card-1"
              @click="state.selectCity(item)"
          >
            {{ item.cityName }}
            <i
                v-if="state.selectedCity_Ids.indexOf(item.id) !== -1"
                class="fas fa-check mx-3"
                style="color: #2bc64b; font-size: 20px;"
            ></i>
          </p>
          <div class="confirm-div">
            <div class="text-center confirm uper-card-1" @click="state.addCity">
              {{ $t("confirm") }}
            </div>
            <div class="text-center cancel uper-card-1" @click="state.cancel">
              {{ $t("cancel") }}
            </div>
          </div>
        </div>

        <div v-else>
          <p class="col-12 text-center no-result">
            {{ $t("thereAreNoResults") }}
          </p>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperSlide} from "swiper/vue";
import Chip from "primevue/chip";
import {ref, onMounted, onUnmounted} from "vue";
import {MainPageRecentProductsState} from "./MainPageRecentProductsState.ts";
import filterPageRecentProducts from "../filterPageRecentProducts/filterPageRecentProducts.vue";
import ratingStars from "@/app/public/shared/ratinstar/ratingStars.vue";
import currency from "@/app/public/shared/currency/Currency.vue";
import {
  windowScrolledToBottom,
  getSelectedPageId, slugify,
} from "@/core/service/utils.service";
import router from "@/core/router/router";
import {DateService} from "@/core/service/date.service";

export default {
  name: "mainPageRecentproducts",
  components: {
    Swiper,
    SwiperSlide,
    Chip,
    filterPageRecentProducts,
    ratingStars,
    currency,
  },
  setup() {
    const state = ref(new MainPageRecentProductsState());
    const pageId = ref(null);
    const selectedChip = ref(null);

    function showFilterPage(index) {
      state.value.showFilterPage = true;
      state.value.showFoundProducts = false;
      state.value.found_productsByFilterAPI = [];
      selectedChip.value = index;
    }

    function found_productsByFilterAPI(foundInFilter) {
      state.value.found_productsByFilterAPI = foundInFilter;
      state.value.showFoundProducts = true;
    }

    function closeFilterPage(model) {
      state.value.showFilterPage = false;
      state.value.model = model;
      state.value.ProductFilter(model);
    }

    function changeDirectory(item) {
      router.push(`/product/${item.productId}/${item.workPageId}/${slugify(item.name)}`);
    }

    onMounted(() => {
      state.value.selectedCities.push({
        id: 1,
        provinceId: 1,
        countryId: 1,
        cityName: "مشهد",
      }); /////////////////////////////////????????????????

      pageId.value = getSelectedPageId();
      state.value.ProductFilter(state.value.model);
      windowScrolledToBottom(() => {
        if (state.value.found_productsByFilterAPI.length != 0) {
          state.value.ProductFilter(state.value.model);
        }
      });
    });

    onUnmounted(() => {
      window.addEventListener(
          "scroll",
          function (event) {
            event.stopImmediatePropagation();
          },
          true
      );
    });

    return {
      DateService,
      state,
      showFilterPage,
      found_productsByFilterAPI,
      closeFilterPage,
      getSelectedPageId,
      changeDirectory,
      pageId,
      selectedChip,
    };
  },
};
</script>

<style scoped>
.curr-price {
  color: #45b745f7;
}

.search-container {
  width: 332px;
  position: relative;
}

.search-icon {
  position: absolute !important;
  left: 16px;
  top: 13px;
  font-size: 16px;
  color: rgba(128, 128, 128, 0.4);
}

.no-result {
  height: 51px;
  padding-inline: 100px;
  border-radius: 8px;
}

.input-search {
  height: 43px !important;
  padding-left: 24px;
}

.marker-icon {
  color: #44a0c9;
  font-size: 24px;
}

.product-img {
  width: 115px;
  position: relative;
  border-radius: 10px;
}

body[dir="rtl"] .crown {
  position: absolute;
  width: 33px;
  top: -6px;
  left: 1vw;
}

body[dir="ltr"] .crown {
  position: absolute;
  width: 33px;
  top: -6px;
  right: 1vw;
}

.sale {
  background-color: #dc2020f0;
  color: white;
  border-radius: 11px;
  padding-inline: 3px;
  font-size: 10px;
  max-height: 24px;
  min-width: 30px;
}

.confirm {
  height: 56px;
  padding-inline: 100px;
  padding-top: 19px;
  background-color: #ccf1f8;
  border-radius: 8px;
  margin-left: 10px;
  width: 94%;
  margin-inline: auto;
  margin-block: 10px;
  /*margin-inline: auto;*/
  /*position: fixed;*/
  /*bottom: 0px*/
}

.cancel {
  height: 56px;
  padding-inline: 92px;
  padding-top: 19px;
  background-color: #f0f2f3;
  border-radius: 8px;
  margin-left: 10px;
  width: 94%;
  margin-inline: auto;
}

.confirm-div {
  width: 100%;
  margin-inline: auto;
  position: fixed;
  bottom: 0px;
  background-color: white;
  padding-bottom: 10px;
}

.swiper-container {
  width: 100%;
  height: 44px;
  padding-bottom: 15px !important;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}

/*///////////////////*/

.header {
  height: 50px;
  padding-block: 10px;
  padding-inline: 7px;
  box-shadow: 0 4px 3px 0px #ced6dc96;
  top: 0px;
  left: 1px;
  position: fixed;
  margin-bottom: 10px;
}

.filters {
  margin-block: 20px;
  height: 73px;
  padding-top: 12px;
  padding-right: 10px;
  width: 98%;
  box-shadow: 0 0 3px 4px #dfdfdf96;
  border-radius: 7px;
  border: 1px solid black;
  margin-inline: auto;
}

.hover-pointer:hover {
  cursor: pointer !important;
}

p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

::v-deep(.p-chip-text) {
  font-size: 14px;
}


</style>
