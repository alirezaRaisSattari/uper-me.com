<template>
  <div class="bg-light">
    <!-- first button line -->
    <div class="d-flex justify-content-around pt-3">
      <div v-for="infoBtn in infoBtns" :key="infoBtn" class="w-33 padding-3btn">
        <router-link :to="infoBtn.path">
          <div class="uper-card-1 hover-pointer border-radius-30 w-100">
            <ratio ratio="1/1">
              <div class="d-flex flex-column m-auto">
                <i :class="infoBtn.icon" class="font-48 mx-auto custom-color" />
                <p class="mb-auto mt-3btn custom-color">{{ infoBtn.label }}</p>
              </div>
            </ratio>
          </div>
        </router-link>
      </div>
    </div>
    <!-- second line button -->
    <div class="d-flex justify-content-around py-3">
      <div
        v-for="infoBtn in buyInfoBtns"
        :key="infoBtn"
        class="w-50 padding-2btn"
      >
        <router-link :to="infoBtn.path">
          <div class="card bg-custom border-radius-30 w-100 hover-pointer">
            <ratio ratio="1/1">
              <div class="d-flex flex-column m-auto">
                <i :class="infoBtn.icon" class="font-68 mx-auto custom-color" />
                <p class="mb-auto mt-3btn custom-color mx-auto">
                  {{ infoBtn.label }}
                </p>
              </div>
            </ratio>
          </div>
        </router-link>
      </div>
    </div>
    <div class="d-flex justify-content-between px-4 align-content-center">
      <p>{{ $t("recommende-products") }}</p>
      <p class="font-size-14">{{ $t("seeAll") }}</p>
    </div>
    <product-swiper />
  </div>
</template>

<script>
import { i18n } from "@/main";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import ProductSwiper from "./productSwiper/productSwiper.vue";

export default {
  components: { ratio, ProductSwiper },
  setup() {
    const infoBtns = [
      { label: i18n.global.tc("freeVouchers"), icon: "fa fa-tags", path: "/freeVouchers" },
      {
        label: i18n.global.tc("shoppingHistory"),
        icon: "fa fa-clipboard-list",
        path: "shoppingHistory",
      },
      {
        label: i18n.global.tc("returned"),
        icon: "fa fa-clipboard-list",
        path: "/returnedHistory",
      },
    ];

    const buyInfoBtns = [
      { label: i18n.global.tc("shoppingCart"), icon: "fa fa-tags", path: "/shoppingCart" },
      {
        label: i18n.global.tc("customProducts"),
        icon: "fa fa-clipboard-list",
        path: "/custom",
      },
    ];
    return {
      infoBtns,
      buyInfoBtns,
    };
  },
};
</script>

<style scoped>

p, span, button {
  font-size: 13px !important;
}



.w-33 {
  width: 33%;
}

.border-radius-30 {
  border-radius: 30px;
}

.custom-color {
  color: rgb(89, 137, 141);
}

.mt-3btn {
  margin-top: 17px;
}

.padding-3btn {
  padding-right: 7px;
  padding-left: 7px;
}

.padding-2btn {
  padding-right: 10px;
  padding-left: 10px;
}

@media (max-width: 512px) {
  .font-48 {
    font-size: 8vw !important;
  }
  .font-68 {
    font-size: 10vw !important;
  }
  .mt-3btn {
    margin-top: 10%;
  }
  .padding-3btn {
    padding-right: 1%;
    padding-left: 1%;
  }
  .padding-2btn {
    padding-right: 1.5%;
    padding-left: 1.5%;
  }
}

.font-48 {
  font-size: 48px;
}

.font-68 {
  font-size: 68px;
}

.mt-27px {
  margin-top: 27px;
}

.bg-custom {
  background-color: rgb(227, 244, 254);
  border: none;
}

.font-size-14 {
  font-size: 14px;
}
</style>
