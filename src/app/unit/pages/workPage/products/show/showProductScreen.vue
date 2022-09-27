<template>
  <div class="m-2 padding-bottom-80px">
    <div v-if="_state.isProductReceived && _state.product != null">
      <productTitle
        :book-mark-call-back="showBookmark"
        :persian-name="_state.product.result.name"
        :product="_state.product.result"
        :src="_state.product.result.mainImageUrl + '_sm.webp'"
        :isbookmarked="_state.product.result.bookMarked"
        options-call-back="()=>{}"
      />
      <div class="position-relative mt-2">
        <div class="reverse-smart-text-align">
          <div class="image-slider-border">
            <productImageSlider
              :main-image="_state.product.result.mainImageUrl + '_lg.webp'"
              :other-images="_state.product.result.otherImages"
            />
          </div>
        </div>
        <productSelfEvent
          :comment-call-back="goToComment"
          :comment-count="_state.product.scoreItem ? _state.product.scoreItem.vote : 0"
          :like-call-back="() => {}"
          :like-count="_state.product.result.numberOfLikes"
          :rating-value="_state.product.scoreItem ? _state.product.scoreItem.average : 2.5"
          :seen-call-back="() => {}"
          :seen-count="_state.product.result.numberOfViews"
          :page-id="_state.product.result.workPageId"
          :product-id="productId"
          :liked="_state.product.result.liked"
        />
      </div>
      <product-major-details
        :area-name="_state.product.productArea ? _state.product.productArea.areaName : ''"
        :english-name="_state.product.result.latinName"
        :persian-name="_state.product.result.name"
        :activityOffCodePercent="_state.product.result.activityOffCodePercent"
        activity-off-code-percent-expired="_state.product.result.activityOffCodeExpiredAt"
      />
      <productReview :caption="_state.product.result.description" class="mt-2" />
      <productFeatures
        v-if="_state.product.result.features"
        :features="_state.product.result.features"
        :features-count="_state.product.result.features.length"
      />
      <!--  event emit mish ba meghdar @selected  -->
      <productCalendar v-if="showCalendar()" class="mt-2" />
      <p class="mt-2 smart-text-align">
        {{ getSellTypes(_state.product.result.sellType) }}
      </p>

      <productProps
        v-if="_state.props != null"
        :creator="_state.props.workPageDetails"
        :prop-list="_state.props.res"
        :wpId="_state.product.result.workPageId"
        :sellType="_state.product.result.sellType"
      />
      
      <productCategories
        v-if="_state.product.result.parentcategories"
        :categories="_state.product.result.parentcategories"
      />
      <productComment
        v-if="_state.comments != null && _state.comments.length !== 0"
        :comments="_state.comments"
      />
      <productSafeBuy title="report" />
      <productSafeBuy title="cancelBuy" />
      <div class="d-flex justify-content-between mb-3 mt-4">
        <p>{{ $t("productCode") }} UP- {{ productId }}</p>
        <i class="pi pi-share-alt" />
      </div>
      <productOtherProduct
        v-if="_state.newProducts != null && _state.newProducts.length !== 0"
        :new-products="_state.newProducts"
        :title="$t('mostRecent')"
      />
      <productOtherProduct
        v-if="_state.popularProducts != null && _state.popularProducts.length !== 0"
        :new-products="_state.popularProducts"
        :title="$t('mostLikes')"
      />
      <productOtherProduct
        v-if="_state.bestSellProducts != null && _state.bestSellProducts.length !== 0"
        :new-products="_state.bestSellProducts"
        :title="$t('bestSell')"
      />
    </div>
    <div v-else></div>
  </div>
  <Dialog
    v-model:visible="displayBookmark"
    :breakpoints="{
      '1000px': '52vw',
      '800px': '65vw',
      '600px': '91vw',
    }"
    :contentStyle="{
      background: 'rgb(255, 255, 255)',
      borderRadius: '12px',
    }"
    :showHeader="false"
    :style="{}"
    dismissableMask
    header=""
    modal
  >
    <!-- <bookmark :Id="productId"/> -->
    <bookmarkProduct :Id="productId" />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import productImageSlider from "@/app/unit/pages/workPage/products/show/productImageSlider.vue";
import productMajorDetails from "@/app/unit/pages/workPage/products/show/productMajorDetails.vue";
import productTitle from "@/app/unit/pages/workPage/products/show/productTitle.vue";
import productSelfEvent from "@/app/unit/pages/workPage/products/show/productSelfEvent.vue";
import productReview from "@/app/unit/pages/workPage/products/show/productReview.vue";
import productFeatures from "@/app/unit/pages/workPage/products/show/productFeatures.vue";
import productCalendar from "@/app/unit/pages/workPage/products/show/productCalendar.vue";
import productProps from "@/app/unit/pages/workPage/products/show/productProps.vue";
import productOtherProduct from "@/app/unit/pages/workPage/products/show/productOtherProduct.vue";
import productCategories from "@/app/unit/pages/workPage/products/show/productCategories.vue";
import productComment from "@/app/unit/pages/workPage/products/show/productComment.vue";
import productSafeBuy from "@/app/unit/pages/workPage/products/show/productMoreInfo.vue";
import { useRoute } from "vue-router";
import { ProductState } from "@/app/unit/pages/workPage/products/show/state";
import { getSelectedPageId } from "@/core/service/utils.service";
import { getSellType } from "@/core/service/type.service";
import { i18n } from "@/main";
import router from "@/core/router/router";
import bookmarkProduct from "@/app/unit/pages/bookmark/bookmarkProduct.vue";
import { ProductType } from "@/core/enum/enums";

export default defineComponent({
  components: {
    productImageSlider,
    bookmarkProduct,
    productMajorDetails,
    productTitle,
    productSelfEvent,
    productReview,
    productFeatures,
    productCalendar,
    productProps,
    productOtherProduct,
    productCategories,
    productComment,
    productSafeBuy,
  },
  setup() {
    const _state = reactive(new ProductState());
    const route = reactive(useRoute());
    const displayBookmark = ref(false);
    const productId = ref(route.params.productId);

    onMounted(() => {
      _state.getProductById(
        route.params.productId,
        route.params.workPageId === "" ? null : route.params.workPageId,
        getSelectedPageId()
      );
    });

    function getSellTypes(sellType) {
      return `${i18n.global.tc("sellType")}: ${getSellType(sellType)}`;
    }

    function goToComment() {
      router.push(
        `/page/productComment/${route.params.productId}/${
          route.params.workPageId !== "" ? route.params.workPageId : getSelectedPageId()
        }`
      );
    }

    function showBookmark() {
      displayBookmark.value = true;
    }

    function showCalendar() {
      switch (_state.product.result.productType) {
        case ProductType.Service:
        case ProductType.Reserve:
        case ProductType.Fare:
          return true;
        default:
          return false;
      }
    }

    return {
      _state,
      getSellTypes,
      goToComment,
      displayBookmark,
      showBookmark,
      showCalendar,
      productId,
    };
  },
});
</script>
<style lang="scss" scoped>
.image-slider-border {
  border: 3px solid #43a9b5;
  border-radius: 10px;
}

.padding-bottom-80px {
  padding-bottom: 80px;
}

p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

::v-deep(.p-button-label) {
  font-size: 14px;
}
</style>
