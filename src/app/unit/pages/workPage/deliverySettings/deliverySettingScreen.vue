<template>
  <header-app-screen :title="$t('sendSettings')" />
  <loading v-if="state.loading" />
  <div v-else>
    <div class="my-3">
      <div
        @click="growDiv(2)"
        class="
          d-flex
          justify-content-between
          align-content-center
          my-2
          hover-pointer
        "
      >
        <div class="d-flex align-content-center">
          <Button
            v-if="!state.sellerDeliveryList.sellerSendAddress"
            @click="$function.goTo(`/deliverySetting/sellerDelivery/create`)"
            :label="$t('addAddress')"
            class="bg-blue my-auto mr-2"
          />
          <div v-if="state.sellerDeliveryList.sellerSendAddress" class="mr-5" />
          <h6
            class="user-select-none head-txt mr-3 my-auto"
            :class="isUp[2] ? 'text-blue' : ''"
          >
            {{ $t("sellerSend") }}
          </h6>
        </div>
        <i
          class="fas fa-chevron-down text-blue chevron mx-3 my-auto"
          :class="isUp[2] ? 'down-chevron' : 'null'"
        ></i>
      </div>
      <div id="grow2" class="">
        <div class="measuringWrapper2">
          <div
            v-if="!state.sellerDeliveryList.sellerSendAddress"
            class="text-center text-sm mx-auto"
          >
            {{ $t("pleaseAddAddress") }}
          </div>
          <div v-else class="uper-card-1 m-2 p-3">
            <div
              class="d-flex justify-content-between align-content-center my-2"
            >
              <div class="uper-card-1 p-2 px-3 w-auto first-card">
                {{ $t("area") }} :
                {{ state.sellerDeliveryList.sellerSendAddress[0].areaName }}
              </div>
              <i
                class="fas fa-ellipsis-v hover-pointer pr-2 my-auto"
                @click="
                  state.displayDialog = true;
                  unit = 2;
                "
              ></i>
            </div>
            <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
              {{ $t("description") }} :
              {{ state.sellerDeliveryList.sellerSendAddress[0].description }}
            </div>
            <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
              {{ $t("sellerSendFreeKilo") }} :
              {{
                state.sellerDeliveryList.sellerSendAddress[0]
                  .pricePerHunderedMeter
              }}
            </div>
            <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
              {{ $t("pricePerHundredValue") }} :
              {{
                state.sellerDeliveryList.sellerSendAddress[0]
                  .sellerSendFreeMeters
              }}
            </div>
            <p class="mt-3 mb-1">{{ $t("phones") }}</p>
            <div
              v-for="phone in state.sellerDeliveryList.sellerSendAddress[0]
                .phones"
              :key="phone"
            >
              <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
                {{ $t("caption") }} : {{ phone.title }}
              </div>
              <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
                {{ $t("mobileNumber") }} : {{ phone.number }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-3">
      <div
        @click="growDiv(3)"
        class="
          d-flex
          justify-content-between
          align-content-center
          my-2
          hover-pointer
        "
      >
        <div class="d-flex align-content-center">
          <Button
            v-if="!state.buyerDeliveryList"
            @click="$function.goTo(`/deliverySetting/collectFromBuyer/create`)"
            :label="$t('addBuyerAddress')"
            class="bg-blue my-auto mr-2"
          />
          <div v-if="state.buyerDeliveryList" class="mr-5" />
          <h6
            class="user-select-none head-txt mr-3 my-auto"
            :class="isUp[3] ? 'text-blue' : ''"
          >
            {{ $t("buyerReceive") }}
          </h6>
        </div>
        <i
          class="fas fa-chevron-down text-blue chevron mx-3 my-auto"
          :class="isUp[3] ? 'down-chevron' : 'null'"
        ></i>
      </div>
      <div id="grow3">
        <div class="measuringWrapper3">
          <div
            v-if="!state.buyerDeliveryList"
            class="text-center text-sm mx-auto"
          >
            {{ $t("pleaseAddAddress") }}
          </div>
          <div v-else class="uper-card-1 m-2 p-3">
            <p class="text-sm" style="color: orange">
              {{ $t("stationMessage") }}
            </p>
            <Button
              class="w-100 bg-goh"
              @click="$function.goTo('/page/yourStations')"
            >
              <b>{{ $t("stations") }}</b>
            </Button>
            <div
              class="d-flex justify-content-between align-content-center my-2"
            >
              <div class="uper-card-1 p-2 px-3 w-auto first-card">
                {{ $t("area") }} : {{ state.buyerDeliveryList.areaName }}
              </div>
              <i
                class="fas fa-ellipsis-v hover-pointer pr-2 my-auto"
                @click="
                  state.displayDialog = true;
                  unit = 3;
                "
              ></i>
            </div>
            <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
              {{ $t("description") }} :
              {{ state.buyerDeliveryList.description }}
            </div>
            <p class="mt-3 mb-1">{{ $t("phones") }}</p>
            <div v-for="phone in state.buyerDeliveryList.phones" :key="phone">
              <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
                {{ $t("caption") }} : {{ phone.title }}
              </div>
              <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
                {{ $t("mobileNumber") }} : {{ phone.number }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-3">
      <div
        @click="growDiv(1)"
        class="
          d-flex
          justify-content-between
          align-content-center
          my-2
          hover-pointer
        "
      >
        <div class="d-flex align-content-center">
          <Button
            v-if="!state.uperDeliveryList"
            @click="$function.goTo(`/deliverySetting/uperDelivery/create`)"
            :label="$t('addUperAddress')"
            class="bg-blue my-auto mr-2"
          />
          <div v-if="state.uperDeliveryList" class="mr-5" />
          <h6
            class="user-select-none head-txt mr-3 my-auto"
            :class="isUp[1] ? 'text-blue' : ''"
          >
            {{ $t("sendByUper") }}
          </h6>
        </div>
        <i
          class="fas fa-chevron-down text-blue chevron mx-3 my-auto"
          :class="isUp[1] ? 'down-chevron' : 'null'"
        ></i>
      </div>
      <div id="grow1">
        <div class="measuringWrapper1">
          <p v-if="!state.uperDeliveryList" class="text-center text-sm mx-auto">
            {{ $t("pleaseAddAddress") }}
          </p>
          <div v-else class="uper-card-1 m-2 p-3">
            <div
              class="d-flex justify-content-between align-content-center my-2"
            >
              <div class="uper-card-1 p-2 px-3 w-auto first-card">
                {{ $t("area") }} : {{ state.uperDeliveryList.areaName }}
              </div>
              <i
                class="fas fa-ellipsis-v hover-pointer pr-2 my-auto"
                @click="
                  state.displayDialog = true;
                  unit = 1;
                "
              ></i>
            </div>
            <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
              {{ $t("description") }} :
              {{ state.uperDeliveryList.description }}
            </div>
            <p class="mt-3 mb-1">{{ $t("phones") }}</p>
            <div v-for="phone in state.uperDeliveryList.phones" :key="phone">
              <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
                {{ $t("caption") }} : {{ phone.title }}
              </div>
              <div class="uper-card-1 p-2 px-3 w-auto first-card my-2">
                {{ $t("mobileNumber") }} : {{ phone.number }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="state.displayDialog"
    :contentStyle="{ borderRadius: '7px' }"
    :header="false"
    :showHeader="false"
    class="edit-discount-dialog"
    dismissableMask
    modal
    style="width: 18rem; border-radius: 15px !important"
  >
    <div
      class="d-flex justify-content-between px-3 py-1 hover-pointer"
      @click="
        state.deleteAddress(unit);
        growDiv(unit);
      "
    >
      <p class="my-1 font-weight-100 mx-auto">
        <small>{{ $t("delete") }}</small>
      </p>
      <i class="fas fa-trash my-auto"></i>
    </div>
    <div
      class="d-flex px-3 py-1 justify-content-between hover-pointer"
      @click="goto(unit)"
    >
      <p class="my-1 font-weight-100 text-center mx-auto">
        <small>{{ $t("edit") }}</small>
      </p>
      <i class="fas fa-edit my-auto"></i>
    </div>
  </Dialog>
</template>

<script>
import { onMounted, ref } from "vue";
import { deliverySettingState } from "./deliverySettingState";
import headerAppScreen from "@/app/unit/shared/headerApp/headerAppScreen.vue";
import router from "@/core/router/router";

export default {
  components: { headerAppScreen },
  name: "follower",
  setup(props) {
    const state = ref(new deliverySettingState());
    const activeTabIsPost = ref(1);
    const isUp = ref([]);
    const unit = ref(0);

    onMounted(() => {
      state.value.getAllAddress();
    });
    const growDiv = (num) => {
      let growDiv = document.getElementById(`grow${num}`);
      if (growDiv.clientHeight) {
        growDiv.style.height = 0;
        isUp.value[num] = false;
      } else {
        var wrapper = document.querySelector(`.measuringWrapper${num}`);
        growDiv.style.height = wrapper.clientHeight + 10 + "px";
        isUp.value[num] = true;
      }
    };
    const goto = (unit) => {
      if (unit == 1) router.push(`/deliverySetting/uperDelivery/edit`);
      if (unit == 2) router.push(`/deliverySetting/sellerDelivery/edit`);
      if (unit == 3) router.push(`/deliverySetting/collectFromBuyer/edit`);
    };
    return {
      activeTabIsPost,
      growDiv,
      isUp,
      state,
      goto,
      unit,
    };
  },
};
</script>

<style scoped>
.uarrows-down:before {
  content: "\e843";
  font-size: 10px !important;
  margin: 0 10px 0 10px;
}

.slider-image {
  height: 250px;
  object-fit: cover !important;
}

.workPage-navbar {
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: #fefefe75;
  top: 0;
  z-index: 2;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.workPage-name {
  color: #000000;
  font-weight: 500;
}

.workPage-image {
  border-radius: 50%;
  width: 90px;
  height: 90px;
  border: 1px solid #808080;
}

.workPage-image-parent {
  width: 75px;
  height: 75px;
  top: -44px;
  z-index: 2;
  position: absolute;
}

body[dir="rtl"] .workPage-crown-icon {
  left: -15px;
  bottom: -11px;
}

body[dir="ltr"] .workPage-crown-icon {
  right: 0;
  bottom: 0;
}

.small-text {
  white-space: nowrap;
  font-size: 11px;
}

.wok-page-image {
  height: 100% !important;
  object-fit: cover !important;
}

.paganation-swiper {
  position: absolute;
  bottom: 41px;
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 10;
  align-items: center;
  height: 16px;
}

.pagination-dot {
  width: 8px;
  height: 8px;
  margin: 3px;
  border-radius: 50px;
  background-color: #ffffff;
  transition: all 0.15s ease-in-out;
}

.active-pagination-dot {
  width: 15px;
  height: 15px;
}

.workpage-nav {
  display: flex;
  width: 100%;
}

.workpage-nav-item {
  width: 50%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid transparent;
}

a {
  color: #000000;
}

.nav-item-active {
  border-bottom: 2px solid #3092db;
}

.show-video-border {
  border: 3px solid #efce8b;
}

.videos {
  width: 100%;
  height: 100%;
}

#grow1 {
  -moz-transition: height 0.3s;
  -ms-transition: height 0.3s;
  -o-transition: height 0.3s;
  -webkit-transition: height 0.3s;
  transition: height 0.3s;
  height: 0;
  overflow: hidden;
}
#grow2 {
  -moz-transition: height 0.3s;
  -ms-transition: height 0.3s;
  -o-transition: height 0.3s;
  -webkit-transition: height 0.3s;
  transition: height 0.3s;
  height: 0;
  overflow: hidden;
}
#grow3 {
  -moz-transition: height 0.3s;
  -ms-transition: height 0.3s;
  -o-transition: height 0.3s;
  -webkit-transition: height 0.3s;
  transition: height 0.3s;
  height: 0;
  overflow: hidden;
}

.chevron {
  transition: all 0.3s;
}

.down-chevron {
  transform: rotate(180deg);
}

.text-blue {
  color: #529dfc;
}

.head-txt {
  transition: all 0.3s;
}

.bg-blue {
  background: #599bfc;
  border: none;
}
button {
  font-size: 12px;
}
.first-card {
  width: 96% !important;
}
.bg-goh {
  background: #00796b !important;
  border: none !important;
}
</style>
