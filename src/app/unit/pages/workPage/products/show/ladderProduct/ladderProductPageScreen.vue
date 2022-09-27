<template>
  <div class="py-4">
    <Header :title="$t('ladderPlans')"/>
    <div v-for="item in state.plans" :key="item" v-ripple class="box-plan smart-text-align p-ripple"
         @click="state.confirmAccount(item)">
      <span>{{ state.currencyFormatter(item.price) }}</span>
      <currency :currencyId="item.currencyId"></currency>
    </div>
    <GetAccount v-if="state.selectedPlan" :plan="state.selectedPlan" @onClose="state.dialogAccount = false" :planDialog="state.dialogAccount" />
  </div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import currency from "@/app/public/shared/currency/Currency.vue";
import GetAccount from "./landerAccountDialog/landerAccountDialogScreen.vue";
import {onMounted, ref} from 'vue';
import {ladderProductPageState} from './ladderProductPageState';
import Ripple from 'primevue/ripple';

export default {
  components: {
    Header,
    currency,
    GetAccount
  },
  directives: {
    'ripple': Ripple
  },
  setup() {
    const state = ref(new ladderProductPageState());
    onMounted(() => {
      state.value.getAllLadder();
    })

    const onFinish = () => {
      state.value.dialogAccount = false;
    }

    return {state, onFinish}
  }
}
</script>

<style lang="scss" scoped>
.box-plan {
  width: 90%;
  box-shadow: 0 0 5px #b5b5b5;
  padding: 10px;
  border-radius: 10px;
  color: #303030;
  cursor: pointer;

  span {
    margin: 0 5px;
  }
}
</style>
