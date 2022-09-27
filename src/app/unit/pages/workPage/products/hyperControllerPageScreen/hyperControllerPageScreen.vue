<template>
  <div class="head-hyper-controller">
    <swiper
      :direction="'horizontal'"
      :free-mode="true"
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :slides-per-view="'auto'"
      :space-between="15"
      class="slider"
    >
      <swiper-slide
        v-for="(item, index) in state.headListHyper"
        :key="item.src"
        class="pt-2 mt-1"
        style="cursor: pointer"
      >
        <div
          v-ripple
          class="img-controller p-ripple"
          @click="
            state.getSubCategories(item);
            state.paginat.main = index + 1;
          "
        >
          <img
            :src="
              state.selectedHeadCategory.id == item.id
                ? require(`@/assets/img/svg/hyper/${item.src}.svg`)
                : require(`@/assets/img/svg/hyper/${item.src}Disabled.svg`)
            "
          />
        </div>
      </swiper-slide>
    </swiper>
    <swiper
      :direction="'horizontal'"
      :free-mode="true"
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :slides-per-view="'auto'"
      :space-between="15"
      class="slider"
    >
      <swiper-slide
        v-for="(item, index) in state.listSubCategories"
        :key="item"
        class="pt-2 mt-1"
        style="cursor: pointer"
      >
        <Button
          :class="state.selectedSub == item ? 'btn-active' : ''"
          :label="item.title"
          class="p-button-text"
          @click="
            state.getUnderSub(item);
            state.paginat.sub = index + 1;
          "
        />
      </swiper-slide>
    </swiper>
    <div class="body-controller">
      <hr />
      <swiper
        :direction="'horizontal'"
        :free-mode="true"
        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
        :slides-per-view="'auto'"
        :space-between="15"
        class="slider"
      >
        <swiper-slide
          v-for="(item, index) in state.listUnderSub"
          :key="item"
          class="pt-2 mt-1"
          style="cursor: pointer"
        >
          <Button
            :class="state.selectedUnderSub == item ? 'btn-active' : ''"
            :label="item.title"
            class="p-button-text"
            @click="
              state.getAllProducts(item);
              state.paginat.underSub = index + 1;
            "
          />
        </swiper-slide>
      </swiper>

      <div class="list-product-controller">
        <template v-if="state.products">
          <div v-for="item in state.products" :key="item" class="item">
            <ItemHyper :item="item" :showAddToCart="showAddToCart" />
          </div>
        </template>
        <template v-else>
          <div class="d-flex justify-content-center w-100">
            <Lottie
              :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'"
              :title="$t('noProducts')"
            />
          </div>
        </template>
      </div>
      <div class="added-space"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { hyperControllerPageState } from "./hyperControllerPageState";
import Ripple from "primevue/ripple";
import Currency from "@/app/public/shared/currency/Currency.vue";
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";
import { getSelectedPageId } from "@/core/service/utils.service";
import ItemHyper from "@/app/unit/shared/items/hyperProduct/hyperProductPageScreen.vue";
import { ScrollController } from "@/core/service/scroll.service";

export default {
  components: {
    Currency,
    Lottie,
    ItemHyper,
  },
  directives: {
    ripple: Ripple,
  },
  setup() {
    const state = ref(new hyperControllerPageState());
    const showAddToCart = ref(false);
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      if (!state.value.paginat.loading) {
        if (state.value.paginat.main < state.value.headListHyper.length) {
          state.value.paginat.loading = true;
          if (state.value.paginat.sub < state.value.listSubCategories.length) {
            if (
              state.value.paginat.underSub < state.value.listUnderSub.length
            ) {
              state.value.getAllProducts(
                state.value.listUnderSub[state.value.paginat.underSub]
              );
              state.value.paginat.underSub++;
            } else {
              state.value.paginat.underSub = 0;
              state.value.getUnderSub(
                state.value.listSubCategories[state.value.paginat.sub]
              );
              state.value.paginat.sub++;
            }
          } else {
            state.value.paginat.sub = 0;
            state.value.paginat.underSub = 0;
            state.value.getSubCategories(
              state.value.headListHyper[state.value.paginat.main]
            );
            state.value.paginat.main++;
          }
        }
      }
    }

    onMounted(() => {
      scrollCtrl.startListen();
    });

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    onMounted(() => {
      state.value.getHyperProducts();
      state.value.getSubCategories(state.value.headListHyper[0]);

      if (
        Number(state.value.route.params.wpid) ===
        Math.abs(Number(getSelectedPageId()))
      ) {
        showAddToCart.value = true;
      }
    });

    return {
      state,
      showAddToCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.head-hyper-controller {
  .swiper-container {
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    list-style: none;
    padding-right: 0;
  }

  .swiper-slide {
    width: auto !important;
    padding: 3px !important;
  }

  .img-controller {
    padding: 10px;

    img {
      width: 40px;
      transition: 0.6s;
      transition-delay: 0.5s;
    }
  }

  button {
    font-size: 13px;
    border-radius: 14px;
    background: #fff !important;
    color: #303030 !important;
    box-shadow: 0 0 1px #b5b5b5;
    border: 1px solid #b5b5b5;

    &.btn-active {
      box-shadow: 0 0 2px #90caf9;
      border: 1px solid #90caf9;
    }
  }

  .body-controller {
    padding: 0 10px;

    .list-product-controller {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding-top: 10px;

      .item {
        width: 33%;
        padding: 5px;
        border-radius: 10px;
      }
    }

    .added-space {
      display: flex;
      height: 500px;
    }
  }
}
</style>
