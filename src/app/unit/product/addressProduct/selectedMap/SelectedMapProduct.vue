<template>

  <SelectLocationOnMap :callback="getMap" style="width: 100%;height: 500px"/>
</template>

<script lang="ts">
import SelectLocationOnMap from "../../../../public/shared/mapComponent/SelectLocationOnMap.vue";
import {AddressProductModel} from "../AddressProductModel";
import {ref} from "vue";
import Dialog from 'primevue/dialog'

export default {
  name: "SelectedMapProduct",
  components: {SelectLocationOnMap, Dialog},
  emits: ['passData'],
  setup(props, {emit}) {
    const objAddressProductModel = ref(new AddressProductModel())

    function getMap(latLng) {
      objAddressProductModel.value.getInfoMap(latLng.lng, latLng.lat, item => {
        if (item !== null) {
          emit("passData", objAddressProductModel.value.displaySelectedMap, item);
        }
      });
    }

    return {
      getMap,
      objAddressProductModel
    }
  }

}
</script>

<style scoped>

</style>