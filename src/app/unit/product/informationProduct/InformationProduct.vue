<template>
  <div class="col shadow-sm border bg-white rounded">
    <div class="d-flex justify-content-between align-items-center p-2">
      <p class="mb-0">{{ $t("category") }}</p>
      <Button :label="$t('set_category')" class="p-button-raised p-button-info"
              @click="listCategory.value = [];productCategory.showDialog()"/>
    </div>
    <div class="p-2">
      <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
              :slider-per-view="'auto'"
              :space-between="0" class="swiper-container">
        <swiper-slide>
          <div class="row justify-content-start align-items-center p-2">
            <button v-for="item of listCategory" v-if="listCategory.length!==0"
                    class="btn btn-light shadow-sm rounded border m-2">{{ item.title }}
            </button>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <p class="mb-0 align-self-start">{{ $t("product_type") }}</p>
      <div class="row justify-content-center align-items-center my-2 border rounded">
        <button v-for="item of typeProduct" :class="[typeBtnProduct===item.type? ' btn-yellow ':' btn-gray','']"
                class="btn rounded-0 "
                @click="btnTypeProduct(item.type)">{{ item.name }}
        </button>
      </div>
    </div>
    <div v-if="checkUsedAndOriginalType" class="d-flex flex-column justify-content-center align-items-center my-2">
      <p class="align-self-start mb-0">{{ $t("usedType") }}</p>
      <div class="row justify-content-center align-items-center my-2 rounded">
        <button
            v-for="item of usedType"
            :class="[typeBtnUsedType===item.type? 'btn btn-yellow rounded-0':'btn btn-gray rounded-0','']"
            @click="btnUsedTyp(item.type)">
          {{ item.name }}
        </button>
      </div>
    </div>
    <div v-if="checkUsedAndOriginalType" class="d-flex flex-column justify-content-center align-items-center my-2">
      <p class="align-self-start mb-0">{{ $t("isProductOriginal") }}</p>
      <div class="row justify-content-center align-items-center my-2 border rounded">
        <button v-for="item of originalProduct"
                :class="[typeBtnOriginal===item.type? 'btn btn-yellow rounded-0':'btn btn-gray rounded-0']"
                @click="btnOriginalProduct(item.type)">{{
            item.name
          }}
        </button>
      </div>
    </div>
  </div>

  <div class="col shadow-sm border bg-white rounded my-3">
    <div class="d-flex flex-column justify-content-center align-items-center p-2">
      <p class="mb-0 align-self-start">{{ $t("ProductSpecifications") }}</p>
      <input v-for="item of inputBox" v-model="item.vmodel" :disabled="disableInputBox" :placeholder="item.placeHolder"
             class="form-control my-1" type="text">
    </div>
  </div>

  <div class="d-flex justify-content-center align-items-center ">
    <Button :label="$t('continue')" class="p-button-raised p-button-danger my-3 " @click="btnContinue"/>
  </div>

  <ProductCategoriesScreen ref="productCategory" :callback="getCategory"/>

  <Dialog v-model:visible="objInformationProduct.displayGeneralProduct" :breakpoints="{'600px': '30vw'}"
          :dismissableMask="true"
          :header="$t('generalProduct')"
          :modal="true" :style="{width: '40vw'}">
    <general-product :data="objInformationProduct.generalProductModel"
                     @passData="(value)=>getInfoGeneralProduct(value)"/>
  </Dialog>
</template>

<script>
import {ref} from "vue";
import {TypeProduct, UsedType} from "../../../../core/enum/enums";
import Dialog from 'primevue/dialog'
import {i18n} from "../../../../main";
import {ToastService} from "../../../../core/service/toast.service";
import ProductCategoriesScreen from "../../shared/productCategory/productCategoriesScreen";
import {ProductStore} from "../../../../core/store/product.store";
import {InformationProductModel} from "./InformationProductModel";
import GeneralProduct from "./generalProduct";
import {ImageProductModel} from "../imagesProduct/ImageProductModel";
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  name: "InformationProduct",
  components: {GeneralProduct, ProductCategoriesScreen, Dialog, Swiper, SwiperSlide},
  emits: ['passData', 'insertLevel'],
  setup(props, {emit}) {
    const objInformationProduct = ref(new InformationProductModel())
    const productCategory = ref(null);
    const disableInputBox = ref(false);
    const usedType = ref([
      {type: UsedType.NewProduct, name: i18n.global.tc("new")},
      {type: UsedType.StockProduct, name: i18n.global.tc("stock")},
      {type: UsedType.FastSendProduct, name: i18n.global.tc("fastSend")},
      {type: UsedType.HotFoodProduct, name: i18n.global.tc("hotFood")}
    ])
    const originalProduct = ref([
      {type: true, name: i18n.global.tc("yes")},
      {type: false.NoProduct, name: i18n.global.tc("no")}
    ]);
    const typeProduct = ref([
      {type: TypeProduct.OfferProduct, name: i18n.global.tc('offer')},
      {type: TypeProduct.RequestProduct, name: i18n.global.tc('request')}
    ])
    const inputBox = ref([
      {id: 1, placeHolder: i18n.global.tc("persianName"), vmodel: ''},
      {id: 2, placeHolder: i18n.global.tc("latinName"), vmodel: ''},
      {id: 3, placeHolder: i18n.global.tc("description"), vmodel: ''},
      {id: 4, placeHolder: i18n.global.tc("privateBarcode"), vmodel: ''},
      {id: 5, placeHolder: i18n.global.tc("publicBarcode"), vmodel: ''},
    ])
    const listCategory = ref([]);
    const detailId = ref()
    const typeBtnUsedType = ref(1);
    const typeBtnProduct = ref(2)
    const typeBtnOriginal = ref(true)
    const checkUsedAndOriginalType = ref(false);

    function btnTypeProduct(type) {
      typeBtnProduct.value = type;
      if (listCategory.value.length !== 0)
        checkUsedAndOriginalType.value = type !== 1;
    }

    function btnUsedTyp(type) {
      typeBtnUsedType.value = type;
    }

    function btnOriginalProduct(type) {
      typeBtnOriginal.value = type;
    }

    function btnContinue() {
      if (ProductStore().categoryId === null) {
        ToastService.getInstance().error("دسته بندی را انتخاب کنید");
        return;
      }
      if (disableInputBox.value === false)
        for (const item of inputBox.value) {
          if (item.vmodel === '') {
            ToastService.getInstance().error(`${item.placeHolder} را ابتدا کامل کنید مجدد امتحان کنید`);
            return;
          }
        }
      if (disableInputBox.value === false) {
        objInformationProduct.value.informationProduct = {
          detailId: null,
          categoryId: ProductStore().categoryId,
          productType: typeBtnProduct.value,
          usedType: typeBtnUsedType.value,
          productOriginal: typeBtnOriginal.value,
          name: inputBox.value[0].vmodel,
          latinName: inputBox.value[1].vmodel,
          description: inputBox.value[2].vmodel,
          barcodePublic: inputBox.value[3].vmodel,
          barcodePrivate: inputBox.value[4].vmodel,
        }
        emit('passData', {step: 2, informationProduct: objInformationProduct.value.informationProduct});
      } else {
        emit('passData', {
          step: 2, informationProduct: {
            productDetail: null, detailId: detailId.value, productType: typeBtnProduct.value,
            usedType: typeBtnUsedType.value, productOriginal: typeBtnOriginal.value, isGeneral: true
          }
        });
      }

    }

    function getCategory(item) {
      listCategory.value.push({catName1: item.postData.catName1.categoryId, title: item.postData.catName1.title},
          {catName2: item.postData.catName2.categoryId, title: item.postData.catName2.title},
          {catName3: item.postData.catName3.categoryId, title: item.postData.catName3.title},
          {catName4: item.postData.catName4.categoryId, title: item.postData.catName4.title},
          {catName5: item.selectedLevel.categoryId, title: item.selectedLevel.title},)
      if (listCategory.value.length !== 0) {
        ProductStore().categoryId = item.selectedLevel.categoryId;
      }
      if (ProductStore().categoryId !== null) {
        objInformationProduct.value.generalProductGetAll(ProductStore().categoryId);
      }

      checkUsedAndOriginalType.value = typeBtnProduct.value !== 1;
    }

    function getInfoGeneralProduct(value) {
      detailId.value = value.detailId;
      let general = objInformationProduct.value.generalProductModel.find(i => i.detailId === value.detailId);
      ProductStore().images = {
        mainPhoto: general.mainImageUrl,
        otherImages: general.otherImage
      };
      if (value.detailId)
        disableInputBox.value = true;
      objInformationProduct.value.displayGeneralProduct = value.display;
    }


    return {
      usedType,
      checkUsedAndOriginalType,
      typeBtnUsedType,
      originalProduct,
      typeProduct,
      typeBtnProduct,
      typeBtnOriginal,
      inputBox,
      listCategory,
      objInformationProduct,
      disableInputBox,
      btnUsedTyp,
      btnTypeProduct,
      btnOriginalProduct,
      btnContinue,
      getCategory,
      getInfoGeneralProduct,
      productCategory
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-yellow {
  background-color: #ffa000;
}

.btn-gray {
  background-color: #eeeeee;
}
</style>
