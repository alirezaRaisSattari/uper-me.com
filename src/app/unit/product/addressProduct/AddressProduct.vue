<template>
  <p class="text-right">{{ $t("available_product_address") }}</p>
  <div class="row justify-content-between align-items-center shadow-sm rounded border bg-white mx-0 p-3">
    <p class="mb-0">{{ $t("workPageAddress") }}</p>
    <Checkbox v-model="modelAddressWorkPage" :binary="true" @click="addressWorkPage"/>
  </div>
  <div v-if="objAddressProductModel.lengthInformation!==0" class="col shadow-sm rounded border bg-white p-3 my-2">
    <div class="row justify-content-around align-items-center p-2">
      <p class="mb-0">نام کشور : {{ objAddressProductModel.informationMap.countryName }}</p>
      <p class="mb-0"> نام استان : {{ objAddressProductModel.informationMap.provinceName }}</p>
    </div>
    <div class="row justify-content-around align-items-center p-2">
      <p class="mb-0"> نام شهر : {{ objAddressProductModel.informationMap.cityName }}</p>
      <p class="mb-0">نام ناحیه : {{ objAddressProductModel.informationMap.areaName }}</p>
    </div>
    <Checkbox v-model="objAddressProductModel.informationMap.isSelected" :binary="true"/>
  </div>
  <Button :label="$t('Add_new_address')" class="p-button-raised p-button-info my-2" @click="showSelectMap"/>

  <div class="d-flex justify-content-center align-items-center">
    <Button :label="$t('submitAddress')" class="p-button-raised p-button-danger my-3 " @click="btnSubmit"/>
  </div>

  <Dialog v-model:visible="objAddressProductModel.displaySelectedMap" :breakpoints="{'600px': '30vw'}"
          :dismissableMask="true"
          :header="$t('selectedMap')"
          :modal="true" :style="{width: '40vw'}">
    <SelectedMapProduct @passData="(value,resMap)=>passData(value,resMap)"/>
  </Dialog>
</template>

<script lang="ts">
import Dialog from 'primevue/dialog'
import Checkbox from 'primevue/checkbox';
import {ref} from 'vue'
import SelectedMapProduct from "./selectedMap/SelectedMapProduct.vue";
import {AddressProductModel} from "./AddressProductModel";
import {CacheService} from "@/core/service/cache.service";
import {getSelectedPageData} from "@/core/service/utils.service";

export default {
  name: "AddressProduct",
  components: {
    SelectedMapProduct,
    Checkbox,
    Dialog
  },
  emits: ['passData'],
  setup(props, {emit}) {
    const modelAddressWorkPage = ref(false);
    const displaySelectMap = ref(false)
    const objAddressProductModel = ref(new AddressProductModel());
    const model = ref({});

    function showSelectMap() {
      displaySelectMap.value = true;
      objAddressProductModel.value.displaySelectedMap = true;
      modelAddressWorkPage.value = false;
    }

    function passData(value, resMap) {
      objAddressProductModel.value.displaySelectedMap = value;
      objAddressProductModel.value.getLocation(resMap.areaName, resMap.areaId, resMap.cityId, resMap.provinceId, resMap.countryId);
    }

    function addressWorkPage() {
      modelAddressWorkPage.value = (modelAddressWorkPage.value === false)
      if (modelAddressWorkPage.value === true) {
        objAddressProductModel.value.lengthInformation = 0;
        let address = CacheService.getInstance().getCityById(getSelectedPageData().cityId);
        objAddressProductModel.value.informationMap = {
          areaId: AddressProductModel.areaId,
          cityId: address.id,
          provinceId: address.provinceId,
          countryId: address.countryId
        }
      }
    }

    function btnSubmit() {

      emit('passData', {
        step: 6,
        informationMap: {
          areaId: objAddressProductModel.value.informationMap.areaId,
          cityId: objAddressProductModel.value.informationMap.cityId,
          provinceId: objAddressProductModel.value.informationMap.provinceId,
          countryId: objAddressProductModel.value.informationMap.countryId
        }
      });
    }

    return {
      modelAddressWorkPage,
      displaySelectMap,
      objAddressProductModel,
      showSelectMap,
      passData,
      btnSubmit,
      addressWorkPage
    }
  }
}
</script>

<style scoped>

</style>