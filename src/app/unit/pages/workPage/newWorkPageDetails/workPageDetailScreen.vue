<template>
  <div class="clip-path"></div>
  <div class="workpage-name d-flex flex-column align-items-center w-100 pt-4" v-if="state.userPageData">
    <span class="z-index-10"
      ><b>{{ state.userPageData.username }}</b></span
    >
    <span class="z-index-10">{{ state.userPageData.name }}</span>
  </div>
  <div class="d-flex flex-column align-items-center w-100 mt-2" v-if="state.userPageData">
    <img
      v-lazy="state.userPageData.profileImageUrl + '_sm.webp'"
      class="profile-img z-index-10 rounded-circle"
    />
    <span class="text-muted">{{ $t("details") }}</span>
  </div>
  <hr class="horizontal-line mt-1" />
  <div class="uper-card-1 m-2 p-2">
    <div class="d-flex justify-content-center">
      <img class="img-header" src="@/assets/img/svg/border.svg" />
      <span class="position-absolute"> {{ $t("workTime") }}</span>
    </div>
    <div class="px-2">
      <loading v-if="state.timeLoading" />
      <div
        v-for="day in state.workTimeList"
        v-else-if="state.workTimeList.length != 0"
        :key="day"
        class="w-100 d-flex align-items-start my-2 mx-2"
      >
        <div class="w-100 d-flex">
          <span class="text-right w-50 text-sm"
            >{{ dayOfWeek[day.dayOfWeek].title }}
          </span>
          <span
            v-if="day.statusType === 2 || day.statusType === 3"
            class="text-center w-50 text-sm"
            >{{ workTime[day.statusType - 1] }}</span
          >

          <div v-if="day.times.length != 0" class="d-flex flex-column w-50">
            <div v-for="time in day.times" :key="time" class="text-center">
              <span
                v-if="time.startTime === '00:00' && time.endTime === '23:59'"
                class="text-sm"
              >
                {{ $t("dormitory") }}
              </span>
              <span
                v-if="time.startTime !== '00:00' && time.endTime !== '23:59'"
                class="text-sm"
                >{{ time.startTime }}&nbsp; _ &nbsp; {{ time.endTime }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr class="horizontal-line mt-4" />
  <div class="d-flex flex-column mt-3 px-2">
    <p class="w-100 text-right">
      <i class="mt-2 fas fa-align-justify"></i>
      <span class="mx-2 text-md-right">{{ $t("categories") }}</span>
    </p>
    <loading v-if="state.catLoading" />
    <Swiper
      v-else-if="state.categories.length != 0"
      :direction="'horizontal'"
      :free-mode="true"
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :slides-per-view="'auto'"
      :space-between="5"
    >
      <SwiperSlide
        v-for="category in state.categories"
        :key="category"
        @click="router.push(`/search/${category.categoryId}`)"
      >
        <span
          class="text-dark hover-pointer category-card text-center p-2 text-sm"
        >
          {{ category.title }}
        </span>
      </SwiperSlide>
    </Swiper>
  </div>
  <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
  <WorkPageFeatures
    v-if="state.features.length"
    :features="state.features"
  />
  <hr class="horizontal-line mt-3" />
  <loading v-if="state.addressLoading" />
  <Swiper
    v-else
    :direction="'horizontal'"
    :free-mode="true"
    :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
    :slides-per-view="'auto'"
    :space-between="5"
  >
    <SwiperSlide v-for="address in state.Address" :key="address" class="w-85">
      <div class="uper-card-1 w-100 hover-pointer p-2 smart-text-align m-1">
        <div class="d-flex">
          <div
            @click="
              showMap = true;
              latStore = address.location.lat;
              lanStore = address.location.long;
            "
            class="
              bg-lightblue
              p-1
              border-radius-10px
              d-flex
              flex-column
              justify-content-center
            "
          >
            <img
              class="map-svg mx-auto"
              src="@/assets/img/svg/pageAddressMarker.svg"
              alt=""
            />
            <p class="text-light text-sm-cus my-0 mx-auto">
              {{ $t("showOnMap") }}
            </p>
          </div>
          <div class="mr-2 mt-1">
            <p class="m-0">{{ address.addressTitle }}</p>
            <p v-if="address.area" class="text-muted m-0 mt-1">
              {{ address.area.countryName }}
            </p>
          </div>
        </div>
        <hr />
        <div class="d-flex mt-2">
          <p class="m-0 text-muted">{{ $t("address") }} :</p>
          <p class="m-0 mx-2">{{ address.textAddress }}</p>
        </div>
        <div
          v-for="phone in address.phone"
          :key="phone"
          class="d-flex flex-wrap"
        >
          <div class="py-1 phone-card p-2 text-center mt-2">
            <span class="text-dark">{{ phone.number }}</span>
            <i class="text-muted mx-1 fas fa-phone-alt"></i>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
  <div class="p-2 uper-card-1 m-2">
    <div class="d-flex justify-content-center">
      <img class="img-header" src="@/assets/img/svg/border.svg" />
      <span class="position-absolute"> {{ $t("introduceCode") }}</span>
    </div>
    <div class="d-flex align-items-center justify-content-around px-3">
      <p>
        <i class="fa fa-share-alt mx-1"></i>
        <span class="" v-if="state.userPageData">{{ state.userPageData.introduceCode }}</span>
      </p>
      <div>
        <QrCode></QrCode>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="showMap"
    :breakpoints="{
      '1400px': '484px',
      '950': '484px',
      '510px': '320px',
    }"
    :dismissableMask="true"
    :modal="true"
  >
    <MapPointer :latLan="[[latStore, lanStore]]" :locationName="getInfo" />
  </Dialog>
  <br />
  <br />
  <br />
</template>

<script>
import { ref } from "@vue/reactivity";
import { workPageDetailsState } from "./workPageDetailsState";
import {
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";
import { i18n } from "@/main";
import { onMounted } from "@vue/runtime-core";
import Chip from "primevue/chip";
import QrCode from "@/app/public/shared/QrCode/QrCode.vue";
import productFeatures from "@/app/unit/pages/workPage/products/show/productFeatures.vue";
import MapPointer from "@/app/public/shared/map/mapPointer.vue";
import router from "@/core/router/router";
import WorkPageFeatures from "./WorkPageFeatures.vue";
import {useRoute} from "vue-router";

export default {
  components: {
    Chip,
    MapPointer,
    QrCode,
    productFeatures,
    WorkPageFeatures,
  },
  setup() {
    const state = ref(new workPageDetailsState());
    const route = ref(useRoute())
    const showMap = ref(false);
    const lanStore = ref(0);
    const latStore = ref(0);

    const dayOfWeek = ref([
      {
        title: i18n.global.tc("saturday"),
      },
      {
        title: i18n.global.tc("sunday"),
      },
      {
        title: i18n.global.tc("monday"),
      },
      {
        title: i18n.global.tc("tuesday"),
      },
      {
        title: i18n.global.tc("wednesday"),
      },
      {
        title: i18n.global.tc("thursday"),
      },
      {
        title: i18n.global.tc("friday"),
      },
    ]);
    const workTime = ref([
      i18n.global.tc("open"),
      i18n.global.tc("closed"),
      i18n.global.tc("unknown"),
    ]);

    function getWorkPageAddress() {
      let model = {
        skip: 0,
        take: 100,
        workPageId: Math.abs(route.value.params.id),
      };
      state.value.pageAddress(model);
    }

    onMounted(() => {
      state.value.getFullPage(route.value.params.username)
      state.value.getWorkTime(Math.abs(route.value.params.id));
      getWorkPageAddress();
      state.value.getCategories(Math.abs(route.value.params.id));
      state.value.getAllFeatureByWorkPageIdInDetails(
        Math.abs(route.value.params.id)
      );
    });
    return {
      state,
      dayOfWeek,
      showMap,
      workTime,
      router,
      latStore,
      lanStore,
    };
  },
};
</script>

<style>
.img-header {
  margin-top: -14px;
}
.clip-path {
  height: 33%;
  clip-path: ellipse(69% 31% at 50% 0%);
  background: rgb(216, 216, 216);
  width: 100%;
  position: absolute;
}
.z-index-10 {
  z-index: 10;
}
.profile-img {
  width: 95px;
  height: 95px;
  border: 6px solid white;
}
.horizontal-line {
  background: black;
  height: 1px;
  width: 96%;
}
.category-card {
  border-radius: 8px;
  background: #ebebeb;
}
.swiper-container {
  width: 100%;
  height: auto;
  direction: rtl;
  padding-bottom: 15px !important;
  margin-top: 10px;
}

.swiper-slide {
  width: auto;
  padding: 3px;
}

::v-deep(.p-chip-text) {
  font-size: 12px;
}

::v-deep(.p-chip) {
  background-color: #ffffff;
  border-radius: 11px;
  box-shadow: 1px 0px 7px rgb(0 0 0 / 28%);
}
.map-svg {
  width: 55px;
}
.text-sm-cus {
  font-size: 9px;
}
.bg-lightblue {
  background-color: #43a9b5;
  width: fit-content;
}
.w-85 {
  width: 85%;
}
.phone-card {
  border-radius: 8px;
  background: #f8f7f2;
  border: 2px solid #d9d8d3;
}
</style>
