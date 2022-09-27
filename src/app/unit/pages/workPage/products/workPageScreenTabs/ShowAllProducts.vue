<template>
  <div>
    <ConfirmDialog></ConfirmDialog>
    <div
      v-if="workPageProductsState.loadingProductFolders"
      class="d-flex justify-content-center align-items-center h-100 my-2"
    >
      <Skeleton class="mx-2" height="3rem" width="100%" />
    </div>

    <template v-else>
      <div
        v-if="workPageProductsState.showProductsHeader === true"
        class="d-flex"
      >
        <swiper
          :direction="'horizontal'"
          :free-mode="true"
          :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
          :slides-per-view="'auto'"
          :space-between="0"
          class="slider pl-5"
        >
          <swiper-slide
            v-for="item in workPageProductsState.productFolders"
            :key="item.folderId"
          >
            <Button
              :class="
                selectedFolderId === item.folderId
                  ? 'p-button-success'
                  : 'p-button-outlined'
              "
              :label="item.name"
              class="p-button-sm p-button-secondary no-warp"
              @click="selectFolder(item.folderId)"
            />
          </swiper-slide>
        </swiper>
        <div class="d-flex py-auto">
          <Button
            v-if="products.length !== 0"
            class="p-button-rounded p-button-secondary icon-font p-button-text mx-1"
            icon="userch"
            @click="openSearch"
          />
          <router-link
            v-if="isMine()"
            class="text-decoration-none text-dark"
            to="/product-folders"
          >
            <Button
              class="p-button-rounded p-button-secondary icon-font p-button-text mx-1"
              icon="ufolder1"
            />
          </router-link>
        </div>
      </div>
      <div
        v-if="workPageProductsState.showProductsHeader === false"
        class="d-flex"
      >
        <select
          id="cars"
          v-model="workPageProductsState.searchSelect"
          class="select uper-card-1"
          name="cars"
          @change="workPageProductsState.changeSelect"
        >
          <option
            v-for="item in workPageProductsState.productFolders"
            :key="item.folderId"
            :value="item.folderId"
          >
            {{ item.name }}
          </option>
        </select>

        <div class="smart-text-align" style="position: relative">
          <input
            v-model="searchInput"
            :placeholder="search"
            class="searchInput smart-text-align"
            @input="onInputChangeDebounce"
          />
          <i
            class="fas fa-times close-buttun text-muted"
            @click="clearSearch"
          ></i>
        </div>
      </div>
      <div class="col-12">
        <p
          v-if="products.length === 0 && !workPageProductsState.loadingProducts"
          class="text-center my-3"
        >
          {{ $t("noProducts") }}
        </p>
        <div class="row">
          <div
            v-if="workPageProductsState.noContent === true"
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
import { LocalStorageService } from "@/core/service/localStorage.service";
import { EnumKeys } from "@/core/constant/constant";
import { useRoute } from "vue-router";
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
    const workPageProductsState = ref(new ShowAllProductsState());
    const pageId = ref<number>(props.pageId);
    const ProductId = ref();
    const selectedFolderId = ref<number>(null);
    const products = computed(() => workPageProductsState.value.products);
    const enumUserStatus = computed(() => UserStatus);
    const enumProductType = computed(() => ProductType);
    const searchInput = ref("");
    const search = ref(i18n.global.tc("search"));
    const route = useRoute();
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      workPageProductsState.value.loadProducts(
        workPageProductsState.value.searchSelect,
        pageId.value,
        true
      );
    }

    const onInputChangeDebounce = _.debounce(() => {
      workPageProductsState.value.searchInput = searchInput.value;
      workPageProductsState.value.loadProducts(
        selectedFolderId.value,
        pageId.value,
        false
      );
    });
    const openSearch = () => {
      workPageProductsState.value.showProductsHeader = false;
      searchInput.value = "";
      workPageProductsState.value.searchInput = searchInput.value;
    };
    onMounted(() => {
      workPageProductsState.value.getProductFolderByPageId(pageId.value);
      workPageProductsState.value.workPageId = pageId.value;
      scrollCtrl.startListen();
    });

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    function selectFolder(id) {
      if (selectedFolderId.value === id) return;
      selectedFolderId.value = id;
      workPageProductsState.value.loadProducts(id, pageId.value, false);
    }

    function handleChange() {}

    function clearSearch() {
      workPageProductsState.value.products = [];
      workPageProductsState.value.searchInput = "";
      workPageProductsState.value.showProductsHeader = true;
      workPageProductsState.value.searchSelect = null;
      workPageProductsState.value.loadProducts(null, pageId.value, false);
    }

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

    const isMine = () => {
      let workPagesData = JSON.parse(
        String(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
      );
      if (!workPagesData) return  false;
      let x = workPagesData.find((e) => e.username == route.params.username);
      return x ?? false;
    };

    return {
      workPageProductsState,
      pageId,
      isMine,
      selectedFolderId,
      selectFolder,
      products,
      enumUserStatus,
      enumProductType,
      productOptions,
      onInputChangeDebounce,
      offPrice,
      dayFromNowFn,
      goToProduct,
      openProductOption,
      ProductId,
      clearSearch,
      handleChange,
      searchInput,
      openSearch,
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
  width: 20%;
  height: 43px;
  border-radius: 7px;
  border: none;
  box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 18%);
  margin-inline: 10px;
}

.searchInput {
  width: 80%;
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
