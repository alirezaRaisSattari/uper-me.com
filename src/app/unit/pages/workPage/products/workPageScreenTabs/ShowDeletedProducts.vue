<template>
  <div>
    <div
      v-if="workPageProductsState.loadingProductFolders"
      class="d-flex justify-content-center align-items-center h-100 my-2"
    >
      <Skeleton class="mx-2" height="3rem" width="100%" />
    </div>

    <template v-else>
      <div class="col-12">
        <p
          v-if="products.length === 0 && !workPageProductsState.loadingProducts"
          class="text-center my-3"
        >
          {{ $t("noProducts") }}
        </p>
        <div class="row">
          <div
            v-if="workPageProductsState.noContent == true"
            style="margin-top: 100px; margin-inline: 209px"
          >
            no content
          </div>
          <div
            v-for="product in workPageProductsState.products"
            id="productListView"
            :key="product.id"
            class="col-6 mt-1 mb-2 px-1 px-md-2"
          >
            <WorkPageProductItem
              :product="product"
              :workPage="pageId"
              @refresh="
                state.loadProducts(
                  null,
                  workPageProductsState.workPageId,
                  false
                )
              "
            />
          </div>
        </div>
        <loading
          v-if="workPageProductsState.loadingProducts"
          class="my-3 py-3"
        />
      </div>
    </template>
  </div>
</template>


<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
} from "vue";
import { DateService } from "@/core/service/date.service";
import { ProductType, UserStatus } from "@/core/enum/enums";
import Skeleton from "primevue/skeleton";
import router from "@/core/router/router";
import { i18n } from "@/main";
import _ from "lodash";
import WorkPageProductItem from "@/app/unit/shared/items/workPageProductItem/workPageProdcutItemScreen.vue";
import { ScrollController } from "@/core/service/scroll.service";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ShowAllProductsState } from "./ShowAllProductsState";
import { ShowDeletedProductsState } from "./ShowDeletedProducts";
import {slugify} from "@/core/service/utils.service";

export default defineComponent({
  components: {
    WorkPageProductItem,
    Skeleton,
    Swiper,
    SwiperSlide,
  },
  props: ["pageId"],
  setup(props) {
    const productOptions = ref(false);
    const workPageProductsState = ref(new ShowDeletedProductsState());
    const pageId = ref<number>(props.pageId);
    const ProductId = ref();
    const selectedFolderId = ref<number>(null);
    const products = computed(() => workPageProductsState.value.products);
    const enumUserStatus = computed(() => UserStatus);
    const enumProductType = computed(() => ProductType);
    const searchInput = ref("");
    const search = ref(i18n.global.tc("search"));
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      workPageProductsState.value.loadProducts(pageId.value, true);
    }

    onMounted(() => {
      workPageProductsState.value.loadProducts(pageId.value, false);
      workPageProductsState.value.workPageId = pageId.value;
      scrollCtrl.startListen();
    });

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    function offPrice(cost: number, offPercent: number) {
      return cost - (cost * offPercent) / 100;
    }

    onUnmounted(() => {
      window.removeEventListener("scroll", null);
    });

    function dayFromNowFn(params) {
      return DateService.getInstance().dayFromNow(params);
    }

    function goToProduct(product) {
      router.push(`/product/${product.productId}/${pageId.value}/${slugify(product.name)}`);
    }

    const openProductOption = (Id) => {
      ProductId.value = Id;
      productOptions.value = !productOptions.value;
    };

    return {
      workPageProductsState,
      pageId,
      selectedFolderId,
      products,
      enumUserStatus,
      enumProductType,
      productOptions,
      offPrice,
      dayFromNowFn,
      goToProduct,
      openProductOption,
      ProductId,
      searchInput,
      search,
    };
  },
});
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 44px;
  padding-bottom: 15px !important;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.product-name {
  line-height: 1.8;
}

.product-user-status {
  position: absolute;
  bottom: 5px;
  width: 90%;
  text-align: center;
  border-radius: 10px;
  left: 5%;
}

.product-icon-position {
  position: absolute;
  top: 10px;
}

.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
}

.select {
  width: 93px;
  height: 43px;
  border-radius: 7px;
  border: none;
  box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 18%);
  margin-inline: 10px;
}

.searchInput {
  width: 374px;
  height: 42px;
  border-radius: 7px;
  border: none;
  box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 18%);
  padding-inline: 29px;
  margin-inline: 10px;
}

.close-buttun {
  position: absolute;
  top: 12px;
  left: 19px;
}

body[dir="rtl"] .product-icon-position {
  right: 10px;
}

body[dir="ltr"] .product-icon-position {
  left: 10px;
}
</style>
