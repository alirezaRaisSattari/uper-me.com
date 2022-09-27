<template>
  <div class="mx-0 px-0 my-0 py-0">
    <h5 class="header mt-3">{{ $t("stationSelection") }}</h5>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
    </div>

    <div v-for="(item , index) in state.stationsArray"
         class="w-100 pt-2 smart-text-align bg-light uper-card-1 station-wrapper">
      <div class="d-flex justify-content-between">
        <div class="col-8">
          <div class="mb-2">نوع جایگاه: {{ item.type }}</div>
          <div class="mb-2">نام مکان: {{ item.name }}</div>
          <div class="mb-2">پلاک: {{ item.tableNum }}</div>
        </div>
        <div class="col-4 mb-2 img-wrapper">
          <img class="img" src="https://picsum.photos/512/512/">
        </div>
      </div>
      <div class="mb-2 mx-2 px-2">توضیحات: {{ item.description }}</div>

    </div>
    <div class="QR-button"></div>
  </div>
</template>

<script>
import {chooseStationState} from './chooseStationState.ts'
import {ref} from 'vue'

export default {
  name: "chooseStation.vue",
  setup() {
    const state = ref(new chooseStationState())
    return {
      state
    }
  }
}
</script>

<style scoped>

.header {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}

.station-wrapper {
  height: 147px;
  margin-block: 37px;
  border-radius: 8px;
  box-shadow: 0px 0px 7px 8px #dfdfdfba;
}


.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
}

.img-wrapper {
}

.img {
  width: 147px;
  height: 99px;
  padding-top: 3px;
  padding-inline: 3px;
  border-radius: 10px;
}

@media only screen and (max-width: 989px) {
  .QR-button {
    position: fixed;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #a4d9f2;
    bottom: 73px;
    left: 170px;
  }
}

@media only screen and (min-width: 989px) {
  .QR-button {
    position: fixed;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #a4d9f2;
    bottom: 73px;
    left: 281px;
  }
}

@media only screen and (min-width: 1126px) {
  .QR-button {
    position: fixed;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #a4d9f2;
    bottom: 73px;
    left: 365px;
  }
}

@media only screen and (min-width: 1300px) {
  .QR-button {
    position: fixed;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #a4d9f2;
    bottom: 73px;
    left: 450px;
  }
}


</style>