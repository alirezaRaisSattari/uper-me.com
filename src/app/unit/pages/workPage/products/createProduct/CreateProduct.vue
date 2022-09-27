<template>
  <div class="animate__animated animate__fadeIn">
    <div>
      <div class="d-flex justify-content-center align-items-center">
        <h5 class="header-title m-0 shape-text">{{ $t("createProduct") }}</h5>
        <img
            alt=""
            class="header-shape-page"
            src="@/assets/img/svg/appbarShape.svg"
        />
      </div>
      <div class="d-flex justify-content-center w-100 mt-1 fix-top">
        <swiper
            :free-mode="true"
            :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
            :space-between="0"
            class="slider"
            direction="horizontal"
            slides-per-view="auto"
        >
          <swiper-slide>
            <div class="main-list-selected">
              <div
                  v-for="(item, index) of tabList"
                  :key="index"
                  class="main-select-page"
              >
                <div
                    :class="state.stepProgress > index ? '' : 'p-disabled'"
                    class="number-text"
                >
                  <div
                      :class="[{ 'active-select': state.step == item.id }, '']"
                      class="item-select-page"
                      @click="state.step = item.id"
                  >
                    <span>{{ item.id }}</span>
                  </div>
                  <span class="d-block text-center">{{ item.text }}</span>
                </div>
                <div
                    v-if="item.id !== 5"
                    class="d-flex align-items-center space-line-select-page p-0"
                >
                  <span class="line-select-page"></span>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <keep-alive>
        <ProductMainInformation
            v-if="state.step == 1"
            :model="state.createModel"
            @updateStepOne="upModel"
        />
      </keep-alive>
      <keep-alive>
        <ProductSelectImages
            v-if="state.step == 2"
            :preImages="state.preImage"
            @updateStepTwo="upModel"
        />
      </keep-alive>
      <keep-alive>
        <ProductSelectFeatureAndAnswers
            v-if="state.step == 3"
            :model="state.createModel"
            @updateStepThree="upModel"
        />
      </keep-alive>
      <keep-alive>
        <ProductStatuses
            v-if="state.step == 4"
            :model="state.createModel"
            @updateStepFour="upModel"
        />
      </keep-alive>
      <keep-alive>
        <SelectLocation
            v-if="state.step == 5"
            :model="state.createModel"
            @updateStepFive="upModel"
        />
      </keep-alive>
    </div>
    <Dialog
        v-model:visible="state.showModalCreating"
        :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
        padding: '0px !important',
      }"
        :dismissableMask="false"
        :showHeader="false"
        header=""
        modal
    >
      <p class="text-center my-3">{{ $t("Sending") }}</p>
      <div class="progress border-radius-0px">
        <div
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow="100"
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style="width: 100%"
        ></div>
      </div>
      <hr class="w-100 my-1"/>
      <p class="smart-text-align p-2">
        <span v-if="state.creatingState == 1">{{ $t("uploadingImages") }}</span>
        <span v-if="state.creatingState == 2">{{
            $t("creatingFeatures")
          }}</span>
        <span v-if="state.creatingState == 3">{{
            $t("creatingWorkPage")
          }}</span>
      </p>
      <div class="d-flex w-100 justify-content-center">
        <div class="progress w-50">
          <div
              :style="{ width: state.averageUploadImagPercent + '%' }"
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow="100"
              class="
              progress-bar progress-bar-striped progress-bar-animated
              bg-success
            "
              role="progressbar"
          ></div>
        </div>
      </div>
      <p class="text-center my-2">{{ state.averageUploadImagPercent }} %</p>
      <p class="text-center">
        <button @click="state.showModalCreating = false">بستن</button>
      </p>
    </Dialog>
  </div>
</template>

<script lang="ts">
import ProductMainInformation from "./step1/ProductMainInformation.vue";
import ProductSelectImages from "./step2/ProductSelectImages.vue";
import {CreateProductState} from "./CreateProductState";
import ProductStatuses from "./step4/ProductStatuses.vue";
import SelectLocation from "./step5/SelectLocation.vue";
import ProductSelectFeatureAndAnswers from "./step3/ProductSelectFeatureAndAnswers.vue";

import {ref} from "vue";
import {i18n} from "@/main";
import {Swiper, SwiperSlide} from "swiper/vue";
import {getBase64FromUrl} from "@/core/service/utils.service";

export default {
  components: {
    ProductSelectImages,
    ProductMainInformation,
    ProductStatuses,
    SelectLocation,
    ProductSelectFeatureAndAnswers,
    Swiper, SwiperSlide,
  },

  setup() {
    const state = ref(new CreateProductState());

    const tabList = ref([
      {id: 1, text: i18n.global.tc("information")},
      {id: 2, text: i18n.global.tc("photos")},
      {id: 3, text: i18n.global.tc("features")},
      {id: 4, text: i18n.global.tc("status")},
      {id: 5, text: i18n.global.tc("address")},
    ]);

    const upModel = (e) => {
      switch (state.value.step) {
        case 1:
          state.value.createModel.productType = e.productType;
          state.value.createModel.usedType = e.usedType;
          state.value.createModel.sellType = e.sellType;
          state.value.createModel.privateBarcode = e.privateBarcode;
          state.value.createModel.isOriginal = e.isOriginal;
          state.value.createModel.productDetails.categoryId =
              e.productDetails.categoryId;
          state.value.createModel.productDetails.description =
              e.productDetails.description;
          state.value.createModel.productDetails.categoryId =
              e.productDetails.categoryId;
          state.value.createModel.productDetails.latinName =
              e.productDetails.latinName;
          state.value.createModel.productDetails.name = e.productDetails.name;
          if (e.productDetails.mainImageUrl != '') {
             getBase64FromUrl(e.productDetails.mainImageUrl+ '_sm.webp').then(e => state.value.preImage.mainImage.base64 = e.toString() );
          }
          if (e.productDetails.otherImages.length != 0) {
            e.productDetails.otherImages.map(e => {
              getBase64FromUrl(e).then(res => state.value.preImage.otherImages.push({base64: res.toString()}));
            });
          }
          state.value.step++;
          if (state.value.step - 1 == state.value.stepProgress)
            state.value.stepProgress++;
          break;
        case 2:
          state.value.preImage = e;
          state.value.step++;
          if (state.value.step - 1 == state.value.stepProgress)
            state.value.stepProgress++;
          break;
        case 3:
          e.forEach((element) => {
            if (element.disable == false) {
              element.answer = element.answer.filter((a) => {
                return a.isSelected === true;
              });
              element.answer.forEach((answer) => {
                state.value.createModel.productFeatures.push({
                  featureId: element.id,
                  answerId: answer.id,
                  isShowOuted: answer.isShowOuted,
                });
              });
            }
          });

          state.value.step++;
          if (state.value.step - 1 == state.value.stepProgress)
            state.value.stepProgress++;
          break;
        case 4:
          state.value.createModel.isShow = e.isShow;
          state.value.createModel.folderId = e.folderId;
          state.value.createModel.productDetails.cargoType =
              e.productDetails.cargoType;
          state.value.step++;
          if (state.value.step - 1 == state.value.stepProgress)
            state.value.stepProgress++;
          break;
        case 5:
          state.value.createModel.countryId = e.countryId;
          state.value.createModel.cityId = e.cityId;
          state.value.createModel.areaId = e.areaId;
          state.value.showModalCreating = true;
          state.value.createProduct({
            error: () => {
              // 00000000
            },
            success: () => {
              // 00000000
            },
          });
          if (state.value.step - 1 == state.value.stepProgress)
            state.value.stepProgress++;
          break;
      }
    };

    return {
      state,
      upModel,
      tabList,
    };
  },
};
</script>

<style scoped>

div, p, span, button, input {
  font-size: 13px;
}



.fix-top {
  max-width: 463px;
}

.swiper-container {
  width: 100%;
  padding-bottom: 5px !important;
}

.swiper-slide {
  width: auto !important;
}

.item-select-page {
  width: 40px;
  background: #ffffff;
  color: #212121;
  border-radius: 50%;
  height: 40px;
  margin-bottom: 5px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px;
  margin-right: 20px;
  padding: 8px 10px;
  cursor: pointer;
  transition: 0.3s;
}

.item-select-page.active-select {
  background: var(--bg-orange-color);
  color: #fff;
  box-shadow: 0 0 5px var(--bg-orange-color);
}

.main-select-page {
  font-size: 14px;
  display: flex;
}

.space-line-select-page {
  display: block;
}

.line-select-page {
  width: 35px;
  background: #a9a9a9;
  height: 3px;
  margin-bottom: 20px;
  margin-right: 5px;
}

.main-list-selected {
  display: flex;
  overflow: hidden;
  padding: 5px 0;
}

.number-text {
  width: 70px;
}

.shape-text {
  position: absolute;
  top: 10px;
  font-size: 16px;
}

.border-radius-0px {
  border-radius: 0px !important;
}

.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}
</style>

