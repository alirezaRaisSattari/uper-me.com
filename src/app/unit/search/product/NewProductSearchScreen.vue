<template>
  <NewFilterProductScreen :model="state.filterProductModel" @confirmFilter="confirmFilter"/>

  <div
      v-if="!state.loading && state.resKeywords.length === 0 && state.products.length === 0"
      class="col-12 text-center pt-5 mt-5"
  >
    <i class="fas fa-box-open fa-5x"></i>
    <h4 class="text-center mt-3">{{ $t("emptyProductList") }}</h4>
  </div>
  <loading
      v-else-if="
      state.loading &&
        state.resKeywords.length === 0 &&
        state.products.length === 0
    "
      class="margin-loading"
  />

  <template v-else>
    <div v-if="state.resKeywords.length !== 0" class="card w-100">
      <p
          class="
            my-0
            smart-text-align
            text-dark
            d-flex
            py-3
            align-items-center
            hover-pointer hover-bg-grey
          "
          @click="selectKeyword(null)"
      >
        <i class="fa fa-search mx-3 text-muted"></i>
        {{ $t("at") }} {{ $t("allCategories") }}
      </p>
      <p
          v-for="item in state.resKeywords"
          :key="item.catId"
          class="
            my-0
            smart-text-align
            text-dark
            d-flex
            py-3
            align-items-center
            hover-pointer hover-bg-grey
          "
          @click="selectKeyword(item)"
      >
        <i class="fa fa-search mx-3 text-muted"></i>
        {{ item.title }}
      </p>
      <loading v-if="state.loading"/>
      <div
          v-if="state.KeywordsShowMore && !state.loading"
          class="d-flex justify-content-center"
      >
        <Button
            :label="$t('showMore')"
            class="page-action-button my-1"
            @click="showMoreKeyword()"
        />
      </div>
    </div>
    <template v-else>
      <div v-if="state.selectedKeyword != null"
           class="col-12 d-flex align-items-center smart-text-align my-1"
      >
        <i
            class="fa fa-arrow-right hover-pointer"
            @click="backToKeywords()"
        ></i>
      </div>
      <div
          v-for="product in state.products"
          :key="product.id"
          class="px-1"
      >
        <FourStoryList v-if="product.isStoryPack" :stories="product.stories"/>

        <div
            v-else-if="product.generalCounts != null"
            class="d-flex justify-content-between mb-2 product-card border-radius-10px hover-pointer"
            @click="openProduct(product)">

          <div class="col">
            <p class="smart-text-align my-1 text-sm d-flex justify-content-between align-items-center">
              {{ product.name }}
              <Button v-if="product.isCached" class="p-button-rounded p-button-danger p-button-text"
                      icon="fa fa-times" @click="removeCache($event, product.productId)"
              />
            </p>
            <div class="d-flex align-items-center">
              <i class="fas fa-store fa-xs text-muted"></i>&nbsp;
              <span class="text-sm">{{ product.generalCounts }}</span>&nbsp;
              <span class="text-sm">{{ $t('seller') }}</span>
            </div>
            <small class="smart-text-align mr-2 text-overflow-two-line">{{
                product.description
              }}</small>
          </div>
          <div class="col-3 p-0 rounded position-relative">
            <img
                v-lazy="product.mainImageUrl + '_sm.webp'"
                alt="product image"
                class="img-fluid border-radius-10px"
            />
            <div v-if="product.creditLevel !== 3" class="credit-svg">
              <img
                  v-if="product.creditLevel === 1"
                  class="m-svg"
                  src="@/assets/img/ic_crown_golden.svg"
              />
              <img
                  v-if="product.creditLevel === 2"
                  class="m-svg"
                  src="@/assets/img/ic_crown_grey.svg"
              />
            </div>
          </div>
        </div>
        <template v-else>
          <div class="d-flex justify-content-between mb-2 product-card border-radius-10px hover-pointer"
               @click="openProduct(product)"
          >
            <div class="col">

              <p class="smart-text-align my-1 text-sm d-flex justify-content-between align-items-center">
                {{ product.name }}
                <Button v-if="product.isCached" class="p-button-rounded p-button-danger p-button-text"
                        icon="fa fa-times" @click="removeCache($event, product.productId)"
                />
              </p>
              <div>

                <small v-if="product.productType > 4 && product.productType < 9">{{ $t('agreement') }}</small>

                <div v-else-if="product.productType === 1">

                  <div v-if="product.currencyId == null" class="d-flex">
                    <small>{{ $t('cost') }}&nbsp;:&nbsp;</small>
                    <small>{{ $t('agreement') }}</small>
                  </div>

                  <div v-else-if="product.offPercent > 0" class="d-flex align-items-center">
                    <small>{{ $t('cost') }} : </small>
                    <small class="text-success mx-1">{{ product.defaultPrice }}</small>
                    <Currency :currency-id="product.currencyId"/>
                    <small class="text-success mx-1">{{ product.defaultPrice }}</small>
                    <span class="text-sm badge badge-danger">{{ product.offPercent }}</span>
                  </div>

                  <div v-else class="d-flex align-items-center">
                    <small>{{ $t('cost') }} : </small>
                    <small class="text-success mx-1">{{ product.defaultPrice }}</small>
                    <Currency :currency-id="product.currencyId"/>
                  </div>
                </div>

                <div v-else-if="product.defaultPrice != null" class="d-flex align-items-center">
                  <small>{{ $t('cost') }} : </small>
                  <small class="text-success mx-1">{{ product.defaultPrice }}</small>
                  <Currency :currency-id="product.currencyId"/>
                </div>

                <p v-else class="smart-text-align text-sm text-overflow-two-line">{{ product.description }}</p>

              </div>
              <div v-if="product.productType !== 14 && product.areaName != null">

              </div>
            </div>
            <div class="col-3 p-0 align-content-center position-relative justify-content-end rounded">
              <img
                  v-lazy="product.mainImageUrl + '_sm.webp'"
                  alt="product image"
                  class="rounded img-fluid border-radius-10px"
              />
              <div v-if="product.creditLevel !== 3" class="credit-svg">
                <img
                    v-if="product.creditLevel === 1"
                    class="m-svg"
                    src="@/assets/img/ic_crown_golden.svg"
                />
                <img
                    v-if="product.creditLevel === 2"
                    class="m-svg"
                    src="@/assets/img/ic_crown_grey.svg"
                />
              </div>
              <div class="d-flex justify-content-center w-100">
                <ratingStars :rate="product.average"/>
              </div>

            </div>
          </div>
        </template>
      </div>
      <loading v-if="state.loading" class="my-5"/>
    </template>
  </template>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, ref,} from "vue";
import NewFilterProductScreen from "./NewFilterProductScreen.vue";
import {NewProductSearchState} from "./NewProductSearchState";
import {ScrollController,} from "@/core/service/scroll.service";
import Currency from "@/app/public/shared/currency/Currency.vue";
import ratingStars from "@/app/public/shared/ratinstar/ratingStars.vue";
import FourStoryList from "@/app/public/shared/fourStoryList/FourStoryList.vue";
import {LocalStorageService} from "@/core/service/localStorage.service";
import {EnumKeys} from "@/core/constant/constant";
import {PageStore} from "@/core/store/page.store";
import router from "@/core/router/router";
import {slugify} from "@/core/service/utils.service";

export default defineComponent({
  name: "NewProductSearchScreen",
  components: {
    Currency,
    ratingStars,
    NewFilterProductScreen,
    FourStoryList,
  },
  props: ["text"],
  setup(props) {
    let searchedText = ref(props.text.trim());
    let state = ref(new NewProductSearchState());
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      state.value.productFilter(searchedText.value, true);
    }

    function onChangeTextFromParent(txt: string) {
      searchedText.value = txt.trim();
      if (searchedText.value.length > 2)
        state.value.searchProductKeyword(searchedText.value, false);
      else {
        state.value.resKeywords = [];
        state.value.products = [];
      }
    }

    function showMoreKeyword() {
      state.value.searchProductKeyword(searchedText.value, true);
    }

    function selectKeyword(item) {
      state.value.selectedKeyword = item;
      state.value.clearKeywordForApi();
      state.value.filterProductModel.categoryIds = null;
      state.value.productFilter(searchedText.value, false);
    }

    function backToKeywords() {
      state.value.searchProductKeyword(searchedText.value, false);
    }

    onMounted(() => {
      if (searchedText.value.length > 2)
        state.value.searchProductKeyword(searchedText.value, false);
      else getCache();
      scrollCtrl.startListen();
    });

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    function confirmFilter(e) {
      state.value.filterProductModel = {...e};
      state.value.filterProductModel.cityIds = (e.cityIds ?? []).slice();
      state.value.filterProductModel.areaIds = (e.areaIds ?? []).slice();
      state.value.filterProductModel.creditLevels = (e.creditLevels ?? []).slice();
      state.value.filterProductModel.categoryIds = (e.categoryIds ?? []).slice();

      if (state.value.filterProductModel.categoryIds.length == 0) {
        state.value.clearKeywordForApi();
        state.value.selectedKeyword = null;
      }

      state.value.productFilter(searchedText.value, false);
    }

    function getCache() {
      state.value.products = getCachedItems(true).map(m => {
        m.isCached = true;
        return m;
      });
    }

    function getCachedItems(isFilter) {
      try {
        let products = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeySearchProductCache));
        if (Array.isArray(products) && products.length != 0) {
          if (isFilter) return products.filter(m => m.searchedPageId == PageStore().selectedPageId);
          return products;
        }
        LocalStorageService.getInstance().setItem(EnumKeys.KeySearchProductCache, []);
        return [];
      } catch (e) {
        LocalStorageService.getInstance().setItem(EnumKeys.KeySearchProductCache, []);
        return [];
      }
    }

    function openProduct(product) {
      let x = getCachedItems(false);
      if (!x.find(m => m.productId == product.productId && (m.searchedPageId == PageStore().selectedPageId))) {
        product.searchedPageId = PageStore().selectedPageId;
        x.unshift(product);
      } else {
        x.sort((x, y) => {
          return x.productId == product.productId ? -1 : y.productId == product.productId ? 1 : 0;
        });
      }
      LocalStorageService.getInstance().setItem(EnumKeys.KeySearchProductCache, JSON.stringify(x));
      router.push(`/product/${product.productId}/${product.workPageId}/${slugify(product.name)}`);
    }

    function removeCache(event, productId: number) {
      event.stopPropagation();
      let x = getCachedItems(false);
      let itemIndex = x.findIndex(m => m.productId == productId && (m.searchedPageId == PageStore().selectedPageId));
      if (itemIndex != -1) {
        x.splice(itemIndex, 1);
        LocalStorageService.getInstance().setItem(EnumKeys.KeySearchProductCache, JSON.stringify(x));
        getCache();
      }
    }

    return {
      onChangeTextFromParent,
      state,
      searchedText,
      showMoreKeyword,
      selectKeyword,
      backToKeywords,
      confirmFilter,
      openProduct,
      removeCache,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-card {
  box-shadow: 0px 0px 5px -2px grey !important;
}

.border-radius-10px {
  border-radius: 10px !important;
}

.margin-loading {
  margin-top: calc((100vh - 300px) / 2);
}

body[dir="rtl"] .credit-svg {
  position: absolute;
  right: 5px;
  top: 5px;
}

body[dir="ltr"] .credit-svg {
  position: absolute;
  left: 5px;
  top: 5px;
}

.m-svg {
  width: 25px;
  height: 25px;
}
</style>
