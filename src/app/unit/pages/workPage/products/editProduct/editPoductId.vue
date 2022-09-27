<template>
<header-app-screen :title="$t('updateSellProp')"/>
<!--  <div class="main-bar" v-for="item in state.list" :key=item>-->
<!--    <img v-lazy="" style="width: 100px; height: 100px">-->
<!--    <h3 class="main-h3"></h3>-->
<!--    <p class="main-p"></p>-->
<!--  </div>-->
  <div class="details" v-for="item in state.list" :key="item">
    <div class="d-flex ready-time">
    <p class="text-right mt-4">{{$t('preparationTime')}}</p>
    </div>
    <Dropdown v-model="selectedCity1" :options="cities" optionLabel="name" optionValue="code" placeholder="دو ساعت" />
    <div class="d-flex ready-time">
      <p class="text-right mt-4">{{$t('cost')}}</p>
    </div>
    <div class="p-field p-col-12 p-md-3">
      <InputNumber v-model="item.buyerSupervisorPercentOfWage" mode="decimal" :minFractionDigits="2" :maxFractionDigits="2" />
    </div>
    <div class="d-flex ready-time">
      <p class="text-right mt-4">{{$t('selectWage')}}</p>
    </div>
    <Dropdown v-model="item.wage" :options="selectWeg" optionLabel="name" optionValue="code" placeholder="دو ساعت" />
  </div>
</template>

<script>
import HeaderAppScreen from "@/app/unit/shared/headerApp/headerAppScreen";
import {editProductIdState} from "./editProductId";
import {onMounted, ref} from "vue"
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import {i18n} from "@/main";
export default {
  name: "editPoductId",
  components: {HeaderAppScreen, Dropdown,InputNumber},
  setup(){
    const state =  ref(new editProductIdState);
    const selectedCity1 = ref();
    const cities = ref([
      {name: i18n.global.tc('one_hour'), code: 'NY'},
      {name: i18n.global.tc('two_hours'), code: 'RM'},
    ]);
    const selectWeg = ref([
      {name: i18n.global.tc('one_hour'), code: 'NY'},
      {name: i18n.global.tc('two_hours'), code: 'RM'},
    ]);
    onMounted(() => state.value.editproductId(),state.value.list);
    return{
      selectedCity1,
      selectWeg,
      cities,
      state
    }
  }
}
</script>
titled
<style lang="scss" scoped>
.p-dropdown {
  width: 470px;
  padding: 15px 0px 15px 0px;
  border: 1px solid #ced4da;
  background-color:#eceff2;
}
.country-item {

img {
  width: 17px;
  margin-right: 0.5rem;
}
}
.details{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 18%);
  border-radius: 8px;
  margin: 0px 7px;
}

.ready-time{
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  p{
    padding-right: 20px;
    font-size: 14px;
  }
}
.cost-input{
  width: 470px;
  padding: 15px 0px 15px 0px;
  border-radius: 8px;
  border: 1px solid gray;
  &:focus{
    border-color: #007bff;
  }
}

</style>
