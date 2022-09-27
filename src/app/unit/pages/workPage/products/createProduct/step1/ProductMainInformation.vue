<template>
  <div class="animate__animated animate__fadeIn">
    <!-- check MainInfoOfWorkPage component-->
    <div class="main-container">
      <Form
          v-slot="{ errors }"
          :validation-schema="pageNameSchema"
          class="w-100 mt-1 px-3"
          @submit="nextStepFunc"
      >
        <div class="row category-box bg-light uper-card-1 mt-2">
          <div class="col-12 d-flex justify-content-between mt-2">
            <div class="smart-text-align">{{ $t("category") }}</div>
            <div
                class="cat-button text-center"
                style="cursor: pointer !important"
                @click="showCategory.showDialog"
            >
              {{ $t("selectCategory") }}
            </div>
            <ProductCategoriesScreen
                ref="showCategory"
                :callback="getCategory"
                @passData="showCategory.hideDialog = false"
            />
          </div>

          <div class="col-12 category-swiper p-1 mt-2">
            <swiper
                :direction="'horizontal'"
                :free-mode="true"
                :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                :slides-per-view="'auto'"
                :space-between="10"
                class="slider"
            >
              <swiper-slide
                  v-for="item in categoryTiltles"
                  :key="item"
                  class="pt-2"
              >
                <div
                    class="
                    d-flex
                    justify-content-center
                    align-content-center
                    bg-light
                    border-radius-10px
                    uper-card-1
                    py-2
                  "
                >
                  <p class="m-auto m-2 pr-2">{{ item }}</p>
                  <i
                      :class="lang ? 'fa-chevron-left' : 'fa-chevron-right'"
                      class="fas m-2"
                  ></i>
                </div>
              </swiper-slide>
            </swiper>
          </div>

          <div class="col-12 used-type mt-2 mb-2">
            <!--mahsool -->
            <div class="smart-text-align mb-2 mt-2">
              {{ $t("productType") }}
            </div>
            <div class="text-center">
              <div
                  class="
                  d-flex
                  justify-content-center
                  align-content-center
                  w-75
                  mx-auto
                  rtl
                "
              >
                <button
                    :class="state.productType == 1 ? 'selected' : ''"
                    class="
                    button button-right
                    py-2
                    width33
                    presenceBtn
                    right-border
                  "
                    type="button"
                    @click="chooseProductType(1)"
                >
                  {{ $t("offer") }}
                </button>
                <button
                    :class="state.productType == 2 ? 'selected' : ''"
                    class="
                    button button-left
                    py-2
                    width33
                    presenceBtn
                    left-border
                  "
                    type="button"
                    @click="chooseProductType(2)"
                >
                  {{ $t("request") }}
                </button>
              </div>
            </div>
          </div>
          <div v-if="showGroupBotton" class="col-12 product-type mt-0 mb-4">
            <div class="smart-text-align mb-2 mt-2">
              {{ $t("ware_type") }}
            </div>
            <div class="text-center">
              <div
                  class="
                  d-flex
                  justify-content-center
                  align-content-center
                  w-75
                  mx-auto
                  rtl
                "
              >
                <button
                    :class="model.usedType == 1 ? 'selected' : ''"
                    class="
                    button button-right
                    py-2
                    width33
                    presenceBtn
                    right-border
                  "
                    type="button"
                    @click="model.usedType = 1"
                >
                  {{ $t("new") }}
                </button>
                <button
                    :class="model.usedType == 2 ? 'selected' : ''"
                    class="
                    button button-left
                    py-2
                    width33
                    presenceBtn
                    left-border
                  "
                    type="button"
                    @click="model.usedType = 2"
                >
                  {{ $t("secondhand") }}
                </button>
              </div>
            </div>
          </div>
          <div
              v-if="showGroupBotton && state.productType == 1"
              class="animate__animated animate__fadeIn w-100 mb-3"
          >
            <div class="col-12 product-type mt-2 w-100">
              <div class="smart-text-align mb-2 mt-2">
                {{ $t("isProductOriginal") }}
              </div>
              <div class="col-12 product-type mt-2">
                <div class="text-center">
                  <div
                      class="
                      d-flex
                      justify-content-center
                      align-content-center
                      w-75
                      mx-auto
                      rtl
                    "
                  >
                    <button
                        :class="model.isOriginal == true ? 'selected' : ''"
                        class="
                        button button-right
                        py-2
                        width33
                        presenceBtn
                        right-border
                      "
                        type="button"
                        @click="model.isOriginal = true"
                    >
                      {{ $t("yes") }}
                    </button>
                    <button
                        :class="model.isOriginal == false ? 'selected' : ''"
                        class="
                        button button-left
                        py-2
                        width33
                        presenceBtn
                        left-border
                      "
                        type="button"
                        @click="model.isOriginal = false"
                    >
                      {{ $t("no") }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="smart-text-align mb-2 mt-3">
                {{ $t("sellTypee") }}
              </div>
              <div class="text-center">
                <div
                    class="
                    d-flex
                    justify-content-center
                    align-content-center
                    w-80
                    mx-auto
                    rtl
                  "
                >
                  <button
                      :class="model.sellType == 1 ? 'selected' : ''"
                      class="
                      button button-right
                      py-2
                      width33
                      presenceBtn
                      right-border
                    "
                      type="button"
                      @click="model.sellType = 1"
                  >
                    {{ $t("actual") }}
                  </button>
                  <button
                      :class="model.sellType == 2 ? 'selected' : ''"
                      class="button button-left py-2 width33 presenceBtn"
                      type="button"
                      @click="model.sellType = 2"
                  >
                    {{ $t("virtual") }}
                  </button>
                  <button
                      :class="model.sellType == 3 ? 'selected' : ''"
                      class="
                      button button-left
                      py-2
                      width33
                      presenceBtn
                      left-border
                    "
                      type="button"
                      @click="model.sellType = 3"
                  >
                    {{ $t("both") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="category-box bg-light uper-card-1 mt-2">
          <div class="col-12 d-flex justify-content-between mt-4">
            <div class="smart-text-align mt-2">
              {{ $t("ProductSpecifications") }}
            </div>
          </div>

          <div class="justify-content-center">
            <Field
                id="persianName"
                v-model="model.productDetails.name"
                :class="errors.persianName ? 'border border-danger' : ''"
                :disabled="state.disable"
                :placeholder="$t('persianName')"
                class="form-control border-radius-10px py-3 inputs costum-input"
                name="persianName"
                type="text"
            />
            <div class="text-danger text-sm text-right w-100 my-1 px-2">
              {{ errors.persianName }}
            </div>
          </div>

          <div class="justify-content-center">
            <Field
                id="latinName"
                v-model="model.productDetails.latinName"
                :class="errors.latinName ? 'border border-danger' : ''"
                :disabled="state.disable"
                :placeholder="$t('latinName')"
                class="form-control border-radius-10px py-3 inputs costum-input"
                name="latinName"
                type="text"
            />
            <div class="text-danger text-sm text-right w-100 my-1 px-2">
              {{ errors.latinName }}
            </div>
          </div>

          <div class="justify-content-center">
            <Field
                id="description"
                v-model="model.productDetails.description"
                :class="errors.description ? 'border border-danger' : ''"
                :disabled="state.disable"
                :placeholder="$t('specifications')"
                class="form-control border-radius-10px py-3 inputs costum-input"
                name="description"
                type="text"
            />
            <div class="text-danger text-sm text-right w-100 my-1 px-2">
              {{ errors.description }}
            </div>
          </div>

          <div
              class="col-auto p-0"
              style="margin-top: 14px; margin-inline: auto; width: 96%"
          >
            <div class="input-group">
              <Field
                  id="privateBarcode"
                  v-model="model.privateBarcode"
                  :class="errors.privateBarcode ? 'border border-danger' : ''"
                  :disabled="state.disable"
                  :placeholder="$t('privateBarcode')"
                  class="form-control py-3 inputs"
                  name="privateBarcode"
                  style="
                  height: 46px;
                  border-top-right-radius: 7px !important;
                  border-bottom-right-radius: 7px !important;
                  border-bottom-left-radius: 0 !important;
                "
                  type="text"
              />

              <div
                  class="input-group-prepend"
                  style="
                  height: 46px;
                  border-top-right-radius: 0 !important;
                  border-bottom-right-radius: 0 !important;
                  border-bottom-left-radius: 7px !important;
                "
              >
                <div class="input-group-text">
                  <i class="fas fa-qrcode fa-2x"></i>
                </div>
              </div>
            </div>

            <div class="text-danger text-sm text-right w-100 my-1 px-2">
              {{ errors.privateBarcode }}
            </div>
          </div>

          <div
              class="col-auto p-0"
              style="margin-top: 14px; margin-inline: auto; width: 96%"
          >
            <div class="input-group">
              <Field
                  id="publicBarcode"
                  v-model="model.productDetails.publicBarcode"
                  :class="errors.publicBarcode ? 'border border-danger' : ''"
                  :disabled="state.disable"
                  :placeholder="$t('publicBarcode')"
                  class="form-control py-3 inputs mb-3"
                  name="publicBarcode"
                  style="
                  height: 46px;
                  border-top-right-radius: 7px !important;
                  border-bottom-right-radius: 7px !important;
                  border-bottom-left-radius: 0 !important;"
                  type="text"
              />

              <div
                  class="input-group-prepend"
                  style="
                  height: 46px;
                  border-top-right-radius: 0 !important;
                  border-bottom-right-radius: 0 !important;
                  border-bottom-left-radius: 7px !important;"
              >
                <div class="input-group-text">
                  <i class="fas fa-qrcode fa-2x"></i>
                </div>
              </div>
            </div>

            <div class="text-danger text-sm text-right w-100 my-1 px-2">
              {{ errors.publicBarcode }}
            </div>
          </div>
        </div>
        <bottomBar>
          <button
              class="btn btn-danger text-light rounded-pill px-5 py-1"
              type="submit"
          >
            {{ $t("submit") }}
          </button>
        </bottomBar>
      </Form>

      <Dialog
          v-model:visible="state.showDialog"
          :breakpoints="{
          '1500px': '52vw',
          '1000px': '52vw',
          '800px': '65vw',
          '600px': '91vw',
        }"
          :contentStyle="{
          background: 'rgb(255, 255, 255)',
          borderRadius: '12px',
        }"
          :modal="true"
          :showHeader="false"
          :style="{
          width: '30vw',
          background: 'rgb(255, 255, 255)',
          borderRadius: '12px',
        }"
      >

        <div class="d-flex justify-content-around">
          <button
              class="btn box-icon btn-danger create-button mx-2"
              @click="
                state.showDialog = false;
                model.CreateProductDetails.categoryId =
                  state.generalProductModel.categoryId;
              "
          >
            {{ $t("createNewProduct") }}
          </button>
          <button
              class="btn box-icon btn-danger create-button mx-2"
              @click="selectProduct"
          >
            {{ $t("selectProduct") }}
          </button>
        </div>

        <div v-if="state.loading">
          <div class="col-12 text-center no-result">
            <div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>

        <div v-else-if="state.generalProductModel.length != 0" class="m-2">
          <div
              v-for="item in state.generalProductModel"
              :key="item.detailId"
              class="
              col-12
              text-center
              d-flex
              justify-content-center
              uper-card-1
              py-2 my-2
            "
              @click="state.selectedProduct = item"
          >
            <div class="col-4 p-0">
              <div class="img-wrap w-100">
                <img v-lazy="item.mainImageUrl + '_sm.webp'" class="img-item"/>
              </div>
            </div>
            <div class="col-8">
              <div class="mx-0 mainName text-one-line mt-2" style="font-size: 13px">{{ item.name }}</div>
              <div class="smart-text-align mt-1 text-one-line" style="font-size: 13px">{{ item.latinName }}</div>
              <div class="smart-text-align mt-1 d-flex" style="font-size: 13px">
                <i class="fas fa-store"></i>
                <div class="mx-2">{{ $t("sellersCount") }}:0</div>
              </div>
            </div>

            <i
                v-if="state.selectedProduct == item"
                class="fas fa-check"
                style="color: #11b311; margin-inline: 2px"
            ></i>
          </div>


        </div>

        <div v-else>
          <div class="col-12 text-center no-result">
            {{ $t("thereAreNoResults") }}
          </div>
          <div class="d-flex justify-content-around">
            <button
                class="btn box-icon btn-danger create-button mx-2"
                @click="
                state.showDialog = false;
                model.CreateProductDetails.categoryId =
                  state.generalProductModel.categoryId;
              "
            >
              {{ $t("createNewProduct") }}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperSlide} from "swiper/vue";
import {ref, onMounted, watch} from "vue";
import Chip from "primevue/chip";
import {ProductMainInformationState} from "./ProductMainInformationState";
import {i18n} from "@/main";
import * as Yup from "yup";
import {Field, Form} from "vee-validate";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import ProductCategoriesScreen from "@/app/unit/shared/productCategory/productCategoriesScreen";

import {ToastService} from "@/core/service/toast.service";
import _ from "lodash";
import {
  getLanguageFromCache,
  getProductTypeById,
} from "@/core/service/utils.service";

export default {
  name: "fvds",
  components: {
    Swiper,
    SwiperSlide,
    Chip,
    Form,
    Field,
    bottomBar,
    ProductCategoriesScreen,
  },
  props: {
    model: Object,
  },
  setup(props, {emit}) {
    const state = ref(new ProductMainInformationState());
    const showCategory = ref(null);
    const category = ref(null);
    const categoryTiltles = ref([]);
    const lang = ref(getLanguageFromCache());
    const showGroupBotton = ref(false);
    const chooseProductType = (productType) => {
      state.value.productType = productType;
    };

    const confirm = () => {
      if (props.model.productType == null) {
        ToastService.getInstance().error(i18n.global.tc("catNotSelected"));
      }
    };

    const pageNameSchema = Yup.object().shape({
      persianName: Yup.string()
          .test(
              "len",
              i18n.global.tc("persianNameIsInvalid", {min: 3, max: 100}),
              (val) => val.length >= 3 && val.length <= 100
          )
          .default(""),
      latinName: Yup.string()
          .test(
              "len",
              i18n.global.tc("latinNameIsInvalid", {min: 3, max: 100}),
              (val) => val.length >= 3 && val.length <= 100
          )
          .default(""),
      description: Yup.string()
          .test(
              "len",
              i18n.global.tc("descriptionIsInvalid", {min: 1, max: 1998}),
              (val) => val.length >= 3 && val.length <= 1998
          )
          .default(""),
      privateBarcode: Yup.string()
          .test(
              "len",
              i18n.global.tc("privateBarcodeIsTooLong", {min: 0, max: 20}),
              (val) => val.length >= 0 && val.length <= 20
          )
          .default(""),
      publicBarcode: Yup.string()
          .test(
              "len",
              i18n.global.tc("publicBarcodeIsTooLong", {min: 0, max: 20}),
              (val) => val.length >= 0 && val.length <= 20
          )
          .default(""),
    });

    function getCategory(item) {
      props.model.productDetails.categoryId = item.selectedLevel.categoryId;
      showGroupBotton.value = true;
      category.value = item;
      let ads = false;
      let consult = false;
      if (state.value.productType == 2) ads = true;
      props.model.productType = getProductTypeById(
          item.postData.catName1.categoryId,
          ads,
          consult
      );
      categoryTiltles.value[0] = item.postData.catName1.title;
      categoryTiltles.value[1] = item.postData.catName2.title;
      categoryTiltles.value[2] = item.postData.catName3.title;
      categoryTiltles.value[3] = item.postData.catName4.title;
      if (item.postData.catName5 != null)
        categoryTiltles.value[4] = item.postData.catName5.title;
      state.value.showDialog = true;
      state.value.generalProductGetAll(item.selectedLevel.categoryId);
    }

    onMounted(() => {
      props.model.usedType = 1;
      props.model.isOriginal = true;
      props.model.sellType = 3;
    });

    function selectProduct() {
      if (!state.value.selectedProduct) {
        ToastService.getInstance().error(i18n.global.tc("productNotSelected"));
      } else {
        state.disable = true

        props.model.productDetails.categoryId =
            state.value.selectedProduct.categoryId;
        props.model.detailId = state.value.selectedProduct.detailId;
        props.model.productDetails.name = state.value.selectedProduct.name;
        props.model.productDetails.latinName =
            state.value.selectedProduct.latinName;
        props.model.productDetails.description =
            state.value.selectedProduct.description;
        props.model.productDetails.publicBarcode =
            state.value.selectedProduct.publicBarcode ?? "";
        props.model.productDetails.mainImageUrl = state.value.selectedProduct.mainImageUrl ?? '';
        props.model.productDetails.otherImages = state.value.selectedProduct.otherImages ?? [];
        console.log('this is product');
        console.log(props.model.productDetails);
        state.value.showDialog = false;
        state.value.disable = true;
      }
    }

    function nextStepFunc() {
      if (props.model.productDetails.categoryId) {
        if (state.value.disable) {
          emit("updateStepOne", props.model);
        } else if (
            props.model.productDetails.name != "" &&
            props.model.productDetails.latinName != "" &&
            props.model.productDetails.description != ""
        ) {
          props.model.productType = state.value.productType;
          emit("updateStepOne", props.model);
        } else
          ToastService.getInstance().error(i18n.global.tc("catNotSelected"));
      } else ToastService.getInstance().error(i18n.global.tc("catNotSelected"));
    }

    watch(
        () => {
          showGroupBotton;
        },
        () => {
        }
    );


    watch(
        () => props.model.isOriginal,
        (newValue) => {
          if (state.value.selectedProduct == null) return  state.value.disable = false;
            state.value.disable = newValue === true;
        }
    );

    watch(
        () => props.model.usedType,
        (newValue) => {
          if (state.value.selectedProduct == null) return state.value.disable = false;
          state.value.disable = newValue === 1;
        }
    );

    return {
      state,
      confirm,
      chooseProductType,
      pageNameSchema,
      showCategory,
      getCategory,
      category,
      categoryTiltles,
      nextStepFunc,
      selectProduct,
      showGroupBotton,
      lang,
    };
  },
};
</script>

<style scoped>

div, p, span, button, input {
  font-size: 13px;
}
.noClick {
  pointer-events: none;
}

.box-icon::before {
  content: "\f466" !important;
  font-family: "Font Awesome 5 Free",serif;
  font-weight: 600;
  margin-inline: 12px;
}

.create-button {
  width: 200px;
  border-radius: 26px;
  margin-top: 36px;
  font-size: 12px;
}

.no-result {
  height: 51px;
  padding-inline: 100px;
  padding-top: 10px;

  background-color: white;
  border-radius: 8px;
}

.img-item {
  width: 96px;
  height: 96px;
  object-fit: cover;
}

.mainName {
  text-align: justify;
  -moz-text-align-last: center;
  text-align-last: center;
}

.swiper-container {
  margin-left: auto;
  overflow: hidden;
  list-style: none;
  padding-right: 14px;
  margin-inline: 0;
  padding-inline: 0;
  width: 100%;
}

.header {
  height: 50px;
  padding-block: 10px;
  padding-inline: 11px;
  box-shadow: 0 4px 3px 0 #ced6dc96;
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}

.p-chip {
  background-color: white;
  position: relative;
  color: #212529;
  border-radius: 16px;
  width: 135px;
  height: 29px;
  padding: 0 0.75rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 18%);
  /*box-shadow: 0 0px 3px 4px #dfdfdf96;*/
}

.uper-card-1 {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
}

.category-box {
  width: 96%;
  margin-inline: auto;
  /*height: 299px;*/
}

.border-radius-10px {
  border-radius: 10px;
}

.cat-button {
  background-color: #b8d9e8;
  width: 178px;
  height: 42px;
  padding-block: 8px;
  border-radius: 7px;
}

.information-box {
  width: 96%;
  margin-inline: auto;
  /*height: 314px;*/
  margin-bottom: 10px;
}

.main-container {
  overflow-y: scroll;
  margin-bottom: 70px;
}

.width33 {
  width: 33%;
}

.costum-input {
  width: 96%;
  height: 46px;
  border-radius: 7px;
  margin-top: 14px;
  margin-inline: auto;
}

.footer-button {
  width: 505px;
  height: 65px;
  padding-block: 5px;
  border-top-right-radius: 53px;
  border-top-left-radius: 53px;
  box-shadow: 0 0 6px 4px #d3d0d0e8;
  position: fixed;
  bottom: 0;
  background-color: #f0d3d9;
}

.confirm-button {
  color: white;
  background-color: #e15a5a;
  width: 121px;
  height: 41px;
  border-radius: 22px;
}

.qrCode {
  position: absolute;
  top: 20px;
  left: 18px;
}

.fa-qrcode:before {
  content: "\f029";
  color: blue !important;
}



.presenceBtn {
  background-color: rgb(238, 238, 238);
  color: rgb(133, 133, 133);
  border: 1px solid rgb(183, 183, 183);
  width: 140px;
}

body[dir="rtl"] .catIcon::before {
  content: "\f104" !important;
  font-family: "Font Awesome 5 Free", serif;
  font-weight: 900;
  /* left: 8px; */
  /* top: 5px; */
}

body[dir="ltr"] .catIcon::before {
  content: "\f105" !important;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  /* left: 123px; */
  /* top: 5px; */
}

.selected {
  background-color: rgb(255, 159, 0);
  color: black;
  text-shadow: 0 0 black;
}

button:focus {
  outline: none;
  /* outline: 5px auto -webkit-focus-ring-color; */
}

.right-border {
  border-radius: 0 8px 8px 0;
}

.left-border {
  border-radius: 8px 0 0 8px;
}
</style>
