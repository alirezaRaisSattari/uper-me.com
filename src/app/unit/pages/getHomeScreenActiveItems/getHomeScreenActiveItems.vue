<template>
  <div class="">
    <!-- start of page-->
    <div class=" w-100 border-bottom d-flex justify-content-between align-items-center p-3 header-card">
      <i class="icon-font uheart-fill text-danger fa-lg"></i>
      <div class="d-flex align-items-center" @click="cityCategory = !cityCategory">
        <span class="mx-2">{{ cityTitle }}</span>
        <i class="icon-font uposition-svg" style="color: #6bccfa; font-size: 24px"></i>
      </div>
    </div>
    <!-- /////////// stories  // common type-->

    <Stories v-if="State.recentStories.length !== 0 " :State="State.recentStories"></Stories>
    <!-- /////////// swiper AmazingProducts -->
    <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :space-between="15" slides-per-view="auto">
      <swiper-slide v-for="product in State.AmazingProduct" :key="product" class="w-90">
        <div class="">
          <router-link :to="'/product/' + product.productId" class=" text-dark text-decoration-none banners-card mt-5 mb-2 mx-2 d-flex smart-text-align align-items-center ">
            <img alt="" class="border-shape" src="@/assets/img/svg/border5.svg" />
            <div class="border-text px-0 mt-1 text-white text-center">
              <small class="d-flex justify-content-center">
                <div class="text-sm">{{ getNumbersOfproducts(product) }}</div>
                &nbsp;&nbsp;&nbsp;
                <div class="text-sm">
                  <b>{{ product.remainingTime }}</b>
                </div>
                &nbsp;&nbsp;
                <div class="text-sm">{{ product.remainingDays }}</div>
              </small>
            </div>
            <img v-lazy="product.mainImageUrl + '_sm.webp'" alt="" class="w-and-h-100px banner-img" />
            <div class="col d-flex flex-column px-0 py-4">
              <p class="w-100 h-50 d-flex align-items-center smart-text-align">
                <small class="mx-1">{{ product.name }}</small>
              </p>
              <div class=" w-100 d-flex flex-wrap smart-text-align justify-content-between px-0">
                <div v-if="product.offPercent !== 0" class="mx-auto d-flex">
                  <del class="text-muted text-sm">
                    {{ formatPriceNumber(product.cost, product.currencyId) }}
                  </del>
                  <span class="text-light rounded bg-danger text-xs px-1 mx-1 text-sm">{{ product.offPercent }}%</span>
                </div>
                <div class="text-left p-0 mx-auto d-flex">
                  <small class="text-success">{{formatPriceNumber(product.cost - product.cost * (product.offPercent / 100),product.currencyId )}}</small>
                  <currency :currency-id="product.currencyId" class="mx-1"></currency>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </swiper-slide>
    </swiper>
    <div
      v-if="State.items.length === 0 && State.banners.length===0 && State.stories.length===0 && !State.itemLoading&&State.items!=null"
      class="mt-5 ">
      <div class="d-flex justify-content-center mt-5">
        <i class="fas fa-box-open fa-6x mt-5"></i>
      </div>
      <p class="text-center mt-5">{{ $t("emptyFolderList") }}</p>
    </div>
    <!-- /////////posts -->
    <div v-if="State.items.length!==0 && State.items!=null" class="d-flex flex-column w-100 my-3">
      <div v-for="(item, index) in State.items" :key="index" class="container p-2">
        <posts v-if="item.itemType===2" :postItem="item.item" />
        <homeProductsSlider v-if="item.itemType===1" :productItem="item.item" />
        <!-- ////////banners -->
        <!-- State.banners.length !== 0 && index + 1 === State.items.length / 2 -->
        <div v-if="(index % 10 == 0) && ((index / 10) % 2 != 0)" class="w-100">
            <div class="banner-controller">
              <div class="child"  v-for="item in State.sliceController(State.items.length , State.banners )" :key="item">
                <img v-lazy="item.webImageUrl" class="banner-image uper-card-1"  />
              </div>
            </div>
        </div>
        <!-- /////////// stories common type  -->
        <template v-if="((index+1) % 20) == 0">
          {{State.stories}}
        </template>
        <Stories v-if="((index+1) % 20) == 0" :State="State.stories"></Stories>
      </div>
    </div>
    <loading v-if="State.productLoading || State.itemLoading"></loading>
    <!-- ///////// end of posts -->
    </div>
    <!-- /////////city dialog -->
    <Dialog v-model:visible="cityCategory" :breakpoints="{
      '1000px': '52vw',
      '800px': '65vw',
      '600px': '91vw',
    }" :contentStyle="{ background: 'rgb(255, 255, 255)'}" :showHeader="false" :style="{}" dismissableMask header=""
      modal>
      <div class="w-100 p-3">
        <p class="w-100 text-center">{{ $t("SelectCityOrCities") }}</p>

        <input v-model="cityName" :placeholder="$t('EnterCityName')" class="form-control py-4" type="text"
          @input="searchCity" />
        <div class="w-100 d-flex mt-2">
          <p v-if="State.cities.length <= 0" class="w-100 text-center">
            {{ $t("noItem") }}
          </p>
          <p v-else-if="cityTitle.length <= 0" class="w-100 text-right px-2 text-muted">
            {{ $t("noItemsSelected") }}
          </p>
          <div v-else class="d-flex align-items-center smart-text-align px-3">
            <p class="p-1 pt-3 my-auto">
              <b>{{ cityTitle }}</b>
            </p>
          </div>
        </div>
        <div class="show-cities">
          <div v-for="(city, index) in State.searchResult" :key="city" class="w-100 my-1 text-center border-bottom py-2"
            @click="createCityList(index)">
            {{ city.cityName }}
          </div>
        </div>
      </div>
    </Dialog>

</template>

<script>
import {ref, onMounted, watch} from "vue";
import {activeItemsState} from "./getHomeScreenActiveItemsState";
import productSlider from "./productSlider.vue"
import {
  getSelectedPageData,
  getSelectedPageId,
  numberOfProductsForHomeScreen,
  windowScrolledToBottom
} from "@/core/service/utils.service";
import postSlider from "./postSlider.vue";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import Currency from "@/app/public/shared/currency/Currency.vue";
import {priceFormat} from "@/core/service/utils.service";
import Stories from "@/app/unit/pages/story/storyScreen.vue";
import bookmark from "@/app/unit/pages/bookmark/bookmark.vue";
import Report from "./ReportProblem.vue";
import posts from './HomeScreenPostSlider.vue'
import homeProductsSlider from './HomeScreenProductSlider.vue'
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  components: {
    postSlider, homeProductsSlider,
    Swiper, SwiperSlide, ratio, Currency, Stories, bookmark, Report, productSlider, posts
  },
  setup() {
    const cityCategory = ref(false);
    const State = ref(new activeItemsState());
    const cityName = ref("");
    const cityTitle = ref("مشهد");
    const cityID = ref(1);
    const myUser = ref(getSelectedPageData());
    const clickedMore = ref(false);
    const newcomments = ref([]);
    const inputText = ref();
    const postId = ref();
    const productId = ref()
    const displayBookmark = ref(false);
    const displayPostDetailes = ref(false);
    const displayProductDetailes = ref(false);
    const remindTime = ref();
    const reportVisible = ref(false);


    function getCities() {
      State.value.getCities();
    }

    const formatPriceNumber = (value, cid) => {
      if (cid !== 0) {
        return priceFormat(Math.floor(value));
      } else{
        return priceFormat(value);
      }
    };

    function searchCity() {
      State.value.serachCity(cityName.value, () => {
      });
    }

    function createCityList(id) {
      cityTitle.value = State.value.searchResult[id].cityName;
      cityID.value = State.value.searchResult[id].id;
    }

    function GetHomeScreenActiveItems() {
      let model = {
        requestTime: new Date(),
        pagination: 1,
        pageId: getSelectedPageId(),
        cityId: cityID.value,
      };
      State.value.GetHomeScreenActiveItems(model);
    }

    function GetAmazingProductByCity() {
      let model = {
        skip: 0,
        take: 100,
        cityId: cityID.value,
        startDate: null,
        endDate: null,
        isActive: true,
      };
      State.value.GetAmazingProductByCity(model);
    }

    onMounted(() => {
      GetAmazingProductByCity();
      getCities();
      recentStories();
      GetHomeScreenActiveItems();
      State.value.serachCity(null, () => {
      });
      windowScrolledToBottom(() => {
        GetHomeScreenActiveItems();
      });
    });

    watch(
        () => cityID.value,
        (c) => {
          cityCategory.value = false;
          State.value.items = [];
          State.value.stories = [];
          State.value.AmazingProduct = [];
          State.value.paginationCount = 1;
          State.value.itemIsFinished = false;
          State.value.itemLoading = false;
          GetAmazingProductByCity();
          GetHomeScreenActiveItems();
        }
    );


    function recentStories() {
      let model = {
        skip: 0,
        take: 100,
        requestTime: new Date(),
        pageId: Math.abs(getSelectedPageId()),
      };
      State.value.GetActiveStories(model);
    }

    function getNumbersOfproducts(model) {
      return numberOfProductsForHomeScreen(model);
    }

    return {
      State,
      cityCategory,
      cityName,
      searchCity,
      cityTitle,
      createCityList,
      clickedMore,
      formatPriceNumber,
      myUser,
      inputText,
      newcomments,
      displayBookmark,
      postId,
      displayPostDetailes,
      displayProductDetailes,
      reportVisible,
      remindTime,
      getNumbersOfproducts,
      productId
    };
  },
};
</script>

<style lang="scss" scoped>
.w-90 {
  width: 90%;
}

.header-card {
  border-bottom: 1px solid black;
  background: #fff;
}

.show-cities {
  overflow: scroll;
}

.user-profile-image {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}

.caption {
  word-break: break-word;
  margin-top: -13px;
}

.long-caption {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.banners-card {
  background: #fff;
  position: relative;
  border-radius: 10px;
  height: 110px;
  box-shadow: 0px 2px 0px 4px #ffac07;
}

.off-badge {
  background-color: #e82828;
  color: white;
  height: 28px;
  padding-top: 3px;
  padding-inline: 10px;
  border-radius: 7px;
}

.w-and-h-100px {
  height: 110px;
  width: 110px;
}

.green {
  color: #49b549;
}

.border-shape {
  position: absolute;
  top: -32px;
  right: 6px;
  width: 96%;
  z-index: 99;
}

.banner-img {
  border-radius: 10px;
}

.border-text {
  position: absolute;
  top: -25px;
  right: 0;
  width: 100%;
  z-index: 999;
}

@media (max-width: 487px) {
  .border-shape {
    top: -31px;
  }
}

@media (max-width: 480px) {
  .border-shape {
    top: -30px;
  }
}

@media (max-width: 456px) {
  .border-shape {
    top: -28px;
  }
}

@media (max-width: 424px) {
  .border-shape {
    top: -27px;
  }
}

@media (max-width: 408px) {
  .border-shape {
    top: -25px;
  }
}

@media (max-width: 376px) {
  .border-shape {
    top: -24px;
  }
}

@media (max-width: 360px) {
  .border-shape {
    top: -23px;
  }
}

@media (max-width: 345px) {
  .border-shape {
    top: -22px;
  }
}

@media (max-width: 329px) {
  .border-shape {
    top: -21px;
  }
}

.banner-image {
  border-radius: 10px;
}

.swiper-slide {
  padding: 0 5px !important;
}

.banner-controller {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .child {
    width: 50%;
    padding: 10px;

    img {
      width: 100%;
      height: 120px;
      object-fit: contain;
      border: none;
    }
  }
}
</style>
