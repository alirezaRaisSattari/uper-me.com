<template>
  <div class="d-flex h-100 w-100 align-content-center justify-content-center">
    <div class="bg-transparent w-100">
      <div class="smart-text-align header bg-light w-100">{{ $t('filter') }}</div>
      <div class="px-1">
        <div class="smart-text-align filters uper-card-1 bg-light hover-pointer"
             @click="showCategory.showDialog">{{ chipsArray[0] }}
          <div v-if="state.selectedCategories.length!=0" class="mt-2 discription">
            {{ state.selectedCategoriesTiltles.join(',') }}
          </div>
        </div>
        <div v-if="state.selectedCities.length==1"
             class="smart-text-align filters uper-card-1 bg-light hover-pointer"
             @click="state.clickOnAreaFilrter">{{ chipsArray[1] }}
          <div v-if="state.selectedAreas_name.length!=0" class="mt-2 discription">
            {{ state.selectedAreas_name.join(',') }}
          </div>
        </div>
        <div class="smart-text-align filters uper-card-1 bg-light hover-pointer"
             @click="state.openProductTypeDialog">{{ chipsArray[2] }}
          <div v-if="state.showProductTypeMsg" class="mt-2 discription">{{ state.ProductTypeMsg }}</div>
        </div>
        <div class="smart-text-align filters uper-card-1 bg-light hover-pointer " @click="state.openCreditLevelDialog">
          {{ chipsArray[3] }}
          <div v-if="state.showCreditLevelMsg" class="mt-2 discription">{{ state.creditLevelMsg }}</div>
        </div>
        <div class="smart-text-align filters uper-card-1 bg-light hover-pointer" @click="state.showMahsolDialog=true">{{
            chipsArray[4]
          }}
          <div v-if="state.selectedMahsol!=null" class="mt-2 discription">{{ state.selectedMahsol }}</div>
        </div>
        <div class="smart-text-align filters uper-card-1 bg-light hover-pointer d-flex justify-content-between">
          {{ chipsArray[5] }}
          <div class="switch">
            <input
                id="flowersState"

                v-model="state.immediate"
                checked
                class="input"

                type="checkbox"
            />
            <label class="slider" for="flowersState"></label>
          </div>
        </div>

      </div>
      <div class="text-center mb-3">
        <button class="btn btn-outline-secondary button-confirmm" type="button" @click="callFilterAPI">
          {{ $t('confirm') }}
        </button>
      </div>
      <!--   product type -->
      <Dialog v-model:visible="state.showProductTypeModal"
              :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }" :contentStyle="{ background: '#ffffff', borderRadius: '12px' }"
              :dismissableMask="true" :modal="true" :showHeader="false"
              :style="{width: '25vw',background: '#ffffff', borderRadius: '12px'}">
        <div v-for="(item,index) in state.productTypeArray"
             :style="index==state.productTypeArray.length-1?'border:none;':''"
             class="col-12 text-center  uper-card-1 productType " @click="state.selectedProductType=item">
          {{ item.name }}
          <!--        <div class="col-12 text-center  productType" style="border: none;" @click="state.selectedProductType=$t('secondhand')">
                    {{ $t('secondhand') }}-->
          <i v-if="state.selectedProductType!=null&&state.selectedProductType.name===item.name"
             class="fas fa-check mx-3"
             style="color: #2bc64b; font-size: 20px"></i>
        </div>
        <div class="col-12 text-center  confirmm uper-card-1" @click="state.closeProductTypeDialog">{{
            $t('confirm')
          }}
        </div>

      </Dialog>
      <!--   area -->


      <Dialog v-model:visible="state.areaModal" :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }" :contentStyle="{ background: '#ffffff', borderRadius: '12px', maxHeight: '600px'}"
              :dismissableMask="true" :modal="true" :showHeader="false"
              :style="{width: '25vw',background: '#ffffff', borderRadius: '12px'}">

        <div id="areaDialog" class="areaDialog-style">
          <div v-if="!state.noArea">
            <div v-for="(item) in state.areaArray" :key="item" class="col-12 text-center  areaType uper-card-1"
                 @click="state.selectArea(item)">{{ item.areaName }}
              <i v-if="state.selectedAreas_id.indexOf(item.id)!==-1" class="fas fa-check mx-3"
                 style="color: #2bc64b; font-size: 20px"></i>
            </div>
            <div class="col-12 text-center  confirmm uper-card-1" @click="state.closeAreaModel">{{
                $t('confirm')
              }}
            </div>
          </div>
          <div v-else>
            <div class="col-12 text-center no-result">{{ $t('thereAreNoResults') }}</div>
          </div>
        </div>

      </Dialog>
      <!--      </div>-->

      <!--   creditLevel -->
      <Dialog v-model:visible="state.showCreditLevelModal"
              :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }" :contentStyle="{ background: '#ffffff', borderRadius: '12px' }"
              :dismissableMask="true" :modal="true" :showHeader="false"
              :style="{width: '25vw',background: '#ffffff', borderRadius: '12px'}">

        <div v-for="(item) in state.creditLevelArray" :key="item"
             class="col-12 text-center  areaType d-flex justify-content-center uper-card-1"
             @click="state.selectedCreditLevel=item">
          {{ item.name }}
          <i v-if="state.selectedCreditLevel!=null&&state.selectedCreditLevel.name===item.name"
             class="fas fa-check mx-3"
             style="color: #2bc64b; font-size: 20px"></i>
        </div>
        <div class="col-12 text-center  confirmm uper-card-1" @click="state.closeCreditLevelDialog">{{
            $t('confirm')
          }}
        </div>
      </Dialog>


      <!--   mahsoolType -->
      <Dialog v-model:visible="state.showMahsolDialog"
              :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }" :contentStyle="{ background: '#ffffff', borderRadius: '12px' }"
              :dismissableMask="true" :modal="true" :showHeader="false"
              :style="{width: '25vw',background: '#ffffff', borderRadius: '12px'}">

        <div v-for="(item) in state.mahsoollTypeArray" :key="item"
             class="col-12 text-center  areaType d-flex justify-content-center uper-card-1"
             @click="state.selectedMahsol=item">
          {{ item }}
          <i v-if="state.selectedMahsol===item" class="fas fa-check mx-3" style="color: #2bc64b; font-size: 20px"></i>
        </div>
        <div class="col-12 text-center  confirmm uper-card-1" @click="state.showMahsolDialog=false">{{
            $t('confirm')
          }}
        </div>

      </Dialog>


      <ProductCategoriesScreen ref="showCategory" :callback="getCategory"
                               @passData="showCategory.hideDialog=false"/>


    </div>
  </div>
</template>

<script>
import {i18n} from "@/main";
import ProductCategoriesScreen from "../../shared/productCategory/productCategoriesScreen";
import {FilterPageRecentProducts} from './FilterPageRecentProducts'
import {onMounted, watch} from "vue";

import {ref} from 'vue'
import {ToastService} from "@/core/service/toast.service";

export default {
  name: "filterPageRecentProducts",
  components: {
    ProductCategoriesScreen
  },
  props: {
    selectedCities: Array,
    getFound_productsByFilterAPI: Function,
    selectedChip: Number

  },
  setup(props, {emit}) {
    const state = ref(new FilterPageRecentProducts())
    const chipsArray = ref([i18n.global.tc('category'), i18n.global.tc('area'), i18n.global.tc('ware_type'), i18n.global.tc('CreditLevel'), i18n.global.tc('productType'), i18n.global.tc('immediate')])
    const areaArray = ref()
    const creditLevelArray = ref()
    const switchChecked = ref(false);
    const creditLevelModal = ref(false)
    const productTypeModal = ref(false)
    const areaModal = ref(false)
    const showCategory = ref(null)

    function passData_ProductCat(value) {
      state.value.showProductsCategory = false
    }

    function getCategory(item) {

      let duplicateCat = false;
      if (state.value.selectedCategories.length != 0) {
        state.value.selectedCategories.forEach(e => {
          if (e.selectedLevel.title == item.selectedLevel.title) {
            duplicateCat = true
          }
        })
      }

      if (duplicateCat) {
        ToastService.getInstance().error(i18n.global.tc("is-Repetitious"));
        return;
      }

      if (state.value.selectedCategories.length == 3) {
        ToastService.getInstance().error(i18n.global.tc("max-selection"));
        return;
      }

      state.value.selectedCategories.push(item)
      state.value.selectedCategoriesTiltles.push(item.selectedLevel.title)


    }

    function callFilterAPI() {


      state.value.found_productsByFilterAPI = []

      let categoryIds = state.value.selectedCategories.map((e) => {
        if (e.postData.step == 4) {
          return -e.selectedLevel.categoryId
        } else if (e.postData.step == 5) {
          return e.selectedLevel.categoryId
        }
      })
      let filterModel = {
        skip: 0,
        take: 2,
        name: null,
        requestTime: new Date(),
        cityIds: state.value.selectedAreas_id.length == 0 ? state.value.selectedCities.map((e) => e.id) : null,
        areaIds: state.value.selectedAreas_id.length != 0 ? state.value.selectedAreas_id : null,
        // usedType: this.selectedProductType.usedType || null,  ////???????
        usedType: state.value.selectedProductType != null ? state.value.selectedProductType.usedType : null,
        productType: null,
        categoryIds: categoryIds,
        creditLevels:
            state.value.selectedCreditLevel != null ? [state.value.selectedCreditLevel.id] : null
        ,
        isImmediate: state.value.immediate
      }
      emit('closeFilterPage', filterModel)

    }


    onMounted(() => {
      state.value.selectedCities = props.selectedCities
      // if(props.selectedChip!=null){
      //   let temp = chipsArray.value[0];
      //   chipsArray.value[0]= chipsArray.value[props.selectedChip]
      //   chipsArray.value[props.selectedChip]=temp
      // }

    })
    return {
      chipsArray,
      switchChecked,
      productTypeModal,
      areaModal,
      areaArray,
      creditLevelModal,
      creditLevelArray,
      state,
      passData_ProductCat,
      getCategory,
      callFilterAPI,
      showCategory
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  padding-block: 10px;
  padding-inline: 11px;
  box-shadow: 0 4px 3px 0 #ced6dc96
}

.filters {
  margin-block: 20px;
  height: 73px;
  padding-top: 12px;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 0px !important;
  width: 100%;
  box-shadow: 0 0px 3px 4px #dfdfdf96;
  border-radius: 7px;
}

.productType {
  height: 51px;
  padding-inline: 100px;
  padding-top: 10px;
  border-bottom: 1px solid #bbb0b052;
}

.productType:hover {
  height: 51px;
  padding-inline: 100px;
  padding-top: 10px;
  background-color: #f1f2f2;
  cursor: pointer !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
}

.areaType {
  height: 51px;
  padding-inline: 100px;
  padding-top: 10px;
  border-bottom: 1px solid #bbb0b052;
  cursor: pointer;
}

.areaType:hover {
  height: 51px;
  padding-inline: 100px;
  padding-top: 10px;

  background-color: #f1f2f2;
  border-radius: 8px;
}

.no-result {
  height: 51px;
  padding-inline: 100px;
  padding-top: 10px;

  background-color: rgba(234, 171, 191, 0.56);
  border-radius: 8px;
}

.confirmm {
  height: 51px;
  padding-inline: 100px;
  padding-top: 10px;
  margin-top: 18px;
  background-color: #abdfea8f;
  border-radius: 8px;
}

.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  cursor: pointer !important;
}

.areaDialog-style {
  overflow-y: scroll;
  max-height: 600px;

}

.button-confirmm {
  width: 141px;
  border: none !important;
  border-radius: 19px;
  box-shadow: 0 0px 3px 3px #c7c7c796;
}

.switch {
  display: block;
  margin-top: 12px;
  margin-inline: 22px;
}

.discription {
  color: #ffa500d4;
  font-size: 14px;
}

.switch .slider {
  position: relative;
  display: inline-block;
  height: 11px;
  width: 32px;
  border-radius: 8px;
  cursor: pointer;
  background: #c5c5c5;
  transition: all 0.2s ease;
}

.switch .slider:after {
  background: #eeeeee;
  position: absolute;
  left: -8px;
  top: -8px;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  content: "";
  transition: all 0.2s ease;
}

.switch label {
  margin-right: 7px;
}

.switch .input {
  display: none;
}

.switch .input ~ .label {
  margin-left: 8px;
}

.switch .input:checked ~ .slider:after {
  left: 16px;
}

.switch .input:checked ~ .slider {
  background: #c1e1e5;
}

.switch .input:checked ~ .slider:after {
  background: #74bdc6;
}
</style>
