<template>
  <div class="mx-0 px-0 my-0 py-0">
    <!-- header -->
    <div class="header bg-light w-100s smart-text-align d-flex justify-content-center">
      <div class="col-8 d-flex ">
        <div class="col-3">
          <img class="img" src="https://picsum.photos/512/512/">
          <img class="crown" src="@/assets/img/ic_crown_golden.svg">
          <i></i>
        </div>
        <div class="col-6 mx-4 px-0 mt-3">
          <div class="">مهدی عنبر سوز</div>
          <div class="text-muted">mahfihayper</div>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-between reverse-smart-text-align pt-4 px-4">
        جایگاه های شما
      </div>
    </div>

    <div class="temp" style="overflow-y: scroll;
     margin-bottom: 100px;
}">

      <!-- type of station -->
      <div class="mt-2">
        <div class="smart-text-align mt-2 pt-4 mb-2 mx-2">نوع جایگاه</div>
        <div class="px-1 d-flex text-muted ">
          <div class="d-flex justify-content-between mx-3">
            <input id="place" v-model="state.selectedStationType" class="mt-1" name="stationType" type="radio"
                   value="place">
            <label class="mx-2" for="place">مکان</label><br>
          </div>
          <div class="d-flex justify-content-between mx-3">
            <input id="table" v-model="state.selectedStationType" class="mt-1" name="stationType" type="radio"
                   value="table">
            <label class="mx-2" for="table">میز</label><br>
          </div>
          <div class="d-flex justify-content-between mx-3">
            <input id="chair" v-model="state.selectedStationType" class="mt-1" name="stationType" type="radio"
                   value="chair">
            <label class="mx-2" for="chair">صندلی</label><br>
          </div>
          <div class="d-flex justify-content-between mx-3">
            <input id="vehicle" v-model="state.selectedStationType" class="mt-1" name="stationType" type="radio"
                   value="vehicle">
            <label class="mx-2" for="vehicle">وسیله نقلیه</label><br>
          </div>

        </div>
      </div>

      <!-- tabs -->


      <!-- place -->
      <div v-if="state.selectedStationType=='place'">
        <noneVehicleSection></noneVehicleSection>
      </div>

      <!-- table -->
      <div v-if="state.selectedStationType=='table'">
        <noneVehicleSection></noneVehicleSection>
      </div>

      <!-- chair -->
      <div v-if="state.selectedStationType=='chair'">
        <noneVehicleSection></noneVehicleSection>
      </div>

      <!-- vehicle -->
      <div v-if="state.selectedStationType=='vehicle'">
        <vehicleSection></vehicleSection>
      </div>

      <!-- confirm button -->
      <div class="footer-button col-12 d-flex justify-content-center align-items-center">
        <button class="btn confirm-button">{{ $t('confirm') }}</button>
      </div>


    </div>


  </div>

</template>

<script>
import {ref} from 'vue'
import {mainCreateStationState} from "./mainCreateStationState";
import noneVehicleSection from './noneVehicleSection/noneVehicleSection.vue'
import vehicleSection from './vehicleStation/vehicleSection.vue'

export default {
  name: "mainCreateStation",
  components: {

    noneVehicleSection,
    vehicleSection
  },
  setup() {
    const state = ref(new mainCreateStationState())

    return {
      state,

    }
  }
}
</script>

<style scoped>

.header {
  height: 96px;
  padding-block: 5px;
  border-bottom-right-radius: 53px;
  border-bottom-left-radius: 53px;
  box-shadow: 0px 0px 6px 4px #d3d0d0e8;
}


.img {
  width: 79px;
  height: 79px;
  padding-top: 3px;
  padding-inline: 3px;
  border-radius: 50%;
  position: relative;
}

.confirm-button {
  background-color: #0f6674;
  background-color: #27aad1;
  width: 121px;
  height: 41px;
  border-radius: 22px;
}

.crown {
  position: absolute;
  width: 27px;
  top: 7vh;
  right: 60px;
}

.footer-button {
  width: 505px;
  height: 65px;
  padding-block: 5px;
  border-top-right-radius: 53px;
  border-top-left-radius: 53px;
  box-shadow: 0px 0px 6px 4px #d3d0d0e8;
  position: fixed;
  bottom: 0px;
  background-color: #bcdee8;

}

</style>