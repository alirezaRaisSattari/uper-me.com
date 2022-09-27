<template>
  <Header :title="$t('amazingPlans')"/>
  <div class="amazing-card">
  <div class="amazing-plan-card hover-pointer" v-for="item in state.list">
    <p class="title-price" @click="selectPlan()">{{item.title}} : {{item.amzingplanid}} </p>
    <p class="title-icon" @click="selectPlan()">{{item.price}} :  <currency :currencyId="item.currencyId"></currency> </p>
  </div>
  </div>
  <template v-if="planDetails.plan">
    <GetAccount :plan="planDetails.plan" :planDialog="planDetails.planDialog" :plansId="planDetails.plansId"
                @done="(event)=> planDetails.planDialog = true" v-if="planDetails.planDialog"  />
  </template>
</template>
<script>
import {onMounted, ref} from "vue";
import {ProductAmazingPropsScreen} from "@/app/unit/pages/workPage/products/amazingProps/productAmazingPropsScreen";
import Header from "@/app/unit/shared/headerApp/headerAppScreen.vue";
import currency from "@/app/public/shared/currency/Currency"
import GetAccount from "@/app/public/shared/getAccount/GetAccount";
import router from "@/core/router/router";
export default {
  components:{Header,currency,GetAccount},
  setup() {
    const state = ref(new ProductAmazingPropsScreen());
    state.value.AmazingPops()
    const planDetails = ref({
       plansId:'',
       planDialog: false,
       plan: null
    });

    function selectPlan() {
      planDetails.value.plan = state.value.currencyId;
      planDetails.value.plansId = state.value.amzingplanid;
      planDetails.value.planDialog = !planDetails.value.planDialog;
    }
    return {
      planDetails,
      GetAccount,
      selectPlan,
      router,
      state,
    }
  }
}
</script>

<style lang="scss" scoped>
p{margin-bottom: 0px !important;}

.amazing-plan-card{
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 4px rgb(0 0 0 / 25%);
  justify-content: space-between;
  border-radius: 8px;
  margin: 15px 5px 5px 5px;}
.title-price{
  padding: 6px 8px 7px 5px;}
.title-icon{
  padding:  6px 8px 7px 5px;}
</style>
