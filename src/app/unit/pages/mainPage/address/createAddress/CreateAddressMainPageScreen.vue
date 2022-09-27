<template>
  <div class="p-3">
    <input v-model="addressTitleModel"  :placeholder="$t('addressTitle')" class="form-control my-2" type="text" >
    <div class=" d-flex flex-column justify-content-start shadow-sm border rounded p-2">
      <Button :label="$t('editLocation')" class="p-button-raised p-button-info my-2" @click="showSelectLocation=true"/>
      <div class="d-flex justify-content-between align-items-center">
        <p class="mx-1">{{ $t('area') }} : </p>
        <p v-if="objCreateAddressState.infoMap.areaName!==''">{{ objCreateAddressState.infoMap.areaName }}</p>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <p class="mx-1">{{ $t('city') }} : </p>
        <p v-if="objCreateAddressState.infoMap.cityName!==''">{{ objCreateAddressState.infoMap.cityName }}</p>
      </div>
    </div>

    <div class="d-flex flex-column justify-content-center align-items-center shadow-sm border rounded p-2 my-2">
      <input v-model="textAddressModel" :placeholder="$t('text_address')" class="form-control my-1" type="text">
      <input v-model="codePostalModel" :placeholder="$t('postalCode')" class="form-control my-1" type="text">
      <div class="d-flex justify-content-between align-items-center container-fluid my-2">
        <p class="mb-0">{{ $t('phones') }}</p>
        <Button class="p-button-rounded p-button-warning plus-phone " icon="fas fa-plus"
                @click="objCreateAddressState.addPhone()"/>
      </div>
      <div v-for="(item,index) of objCreateAddressState.listPhones"
           v-if="objCreateAddressState.listPhones.length!==0"
           :key="index" class="container d-flex flex-column justify-content-center border rounded p-2 my-2">
        <Button class="align-self-end p-button-raised p-button-rounded p-button-danger m-1" icon="fas fa-trash-alt"
                @click="objCreateAddressState.deletePhone(index)"/>
        <input v-model="item.title" :placeholder="$t('phone_title')" class="form-control my-1" type="text">
        <input v-model="item.number" :placeholder="$t('phone_number')" class="form-control my-1" type="text">
        <Button class="align-self-end p-button-raised p-button-rounded p-button-success m-1" icon="fas fa-check"
                @click="objCreateAddressState.recordPhone"/>
      </div>
    </div>
    <Button :label="(values.model===true)?$t('submit'):$t('edit')" class="col p-button-raised p-button-success"
            @click="createAddress"/>
  </div>
  <Dialog v-model:visible="showSelectLocation"
          :breakpoints="{'1400px': '50vw','950':'70vw','500px':'90vw'}" :dismissableMask="true" :modal="true">
    <SelectLocationOnMap :callback="getMap" style="width: 100%;height: 500px"/>
  </Dialog>
</template>

<script>
import {onMounted, ref} from "vue";
import {CreateAddressMainPageState} from "./CreateAddressMainPageState";
import SelectLocationOnMap from "../../../../../public/shared/mapComponent/SelectLocationOnMap";
import {CacheService} from "@/core/service/cache.service";
import {getSelectedPageId} from "@/core/service/utils.service";
import {ToastService} from "@/core/service/toast.service";
import addAddressGlobal from "@/app/unit/shared/addAddressGlobal/addAddressGlobalPageScreen"
export default {
  name: "CreateAddressMainPageScreen",
  components: {SelectLocationOnMap,addAddressGlobal},
  props: {
    values: Object
  },
  emits: ['passData'],
  setup(props, {emit}) {
    const addressTitleModel = ref()
    const textAddressModel = ref();
    const codePostalModel = ref();
    const showSelectLocation = ref(false);
    const objCreateAddressState = ref(new CreateAddressMainPageState())
    if (textAddressModel.value===null){

    }
    function createAddress() {
      let x = 0
      objCreateAddressState.value.listPhones.forEach((e)=>{
        if(!e.title.length || !e.number.length){
          ToastService.getInstance().warning("ابتدا بقیه ی فیلد ها را پر کنید");
          x = 1
        }
      })
      if(x)return

      if (props.values.model === true) {
        objCreateAddressState.value.createAddress(addressTitleModel.value, textAddressModel.value, codePostalModel.value)
        emit('passData', {
          response: {
            id: objCreateAddressState.value.productAddressId,
            pageId: getSelectedPageId(),
            title: addressTitleModel.value,
            address: textAddressModel.value,
            postalCode: codePostalModel.value,
            cityId: objCreateAddressState.value.infoMap.cityId,
            areaId: objCreateAddressState.value.infoMap.areaId,
            latitude: objCreateAddressState.value.infoMap.lat,
            longitude: objCreateAddressState.value.infoMap.lng,
            phones: objCreateAddressState.value.listPhones
          },
          show: false
        })
      } else {
        objCreateAddressState.value.updateAddressFavorite(addressTitleModel.value, textAddressModel.value, codePostalModel.value, props.values.item.addressId)
        emit('passData', {
          response: {
            addressId: props.values.item.addressId,
            pageId: getSelectedPageId(),
            title: addressTitleModel.value,
            address: textAddressModel.value,
            postalCode: codePostalModel.value,
            cityId: objCreateAddressState.value.infoMap.cityId,
            areaId: objCreateAddressState.value.infoMap.areaId,
            latitude: objCreateAddressState.value.infoMap.lat,
            longitude: objCreateAddressState.value.infoMap.lng,
            phones: objCreateAddressState.value.listPhones
          },
          show: false
        })
      }

    }

    onMounted(() => {
      if (props.values.model === false) {
        objCreateAddressState.value.listPhones = props.values.item.phones;
        addressTitleModel.value = props.values.item.title;
        textAddressModel.value = props.values.item.address;
        codePostalModel.value = props.values.item.postalCode;
        objCreateAddressState.value.infoMap = {
          cityName: CacheService.getInstance().getCityById(props.values.item.cityId).cityName,
          cityId: props.values.item.cityId,
          areaId: props.values.item.areaId,
        }
        objCreateAddressState.value.getAreaName(props.values.item.areaId);
      }
    })

    function getMap(item) {
      showSelectLocation.value = false;
      objCreateAddressState.value.getInfoMap(item.lng, item.lat)
    }

    return {
      addAddressGlobal,
      addressTitleModel,
      textAddressModel,
      codePostalModel,
      objCreateAddressState,
      showSelectLocation,
      getMap,
      createAddress
    }
  }
}
</script>

<style scoped>
.box-shadow {
  box-shadow: 0 0 8px 1px lightgray;
}
 .plus-phone{color: white;}


</style>
