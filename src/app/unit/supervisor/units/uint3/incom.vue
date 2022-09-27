<template>
  <loading v-if="state.factorsLoading"/>
  <div
      v-for="factor in state.factors"
      :key="factor"
      class="uper-card-1 my-3 py-0"
  >
    <div class="d-flex align-content-center justify-content-between p-2">
      <p class="my-auto">{{ factor.createDate }}</p>
      <div class="d-flex align-content-center my-auto">
        <i class="far fa-clock my-auto"></i>
        <p class="my-auto mr-3">{{ factor.time }}</p>
      </div>
      <p class="my-auto">{{ $t("document") }} : {{ factor.itId }}</p>
    </div>
    <div class="d-flex px-2">
      <p class="my-auto">
        {{ $t("cost") }} : {{ factor.value }}
        <Currency :currency-id="factor.currencyId"/>
      </p>
      <p class="my-auto mr-3">{{ $t("for") }} : {{ factor.description }}</p>
    </div>
    <hr class="mt-1 mb-0"/>
    <p class="text-center py-2 my-auto">
      {{ $t("remaining") }} : {{ factor.receiverRemainingValue }}
      <Currency :currency-id="factor.currencyId"/>
    </p>
  </div>
</template>
<script>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {incomeState} from "./incomeState";
import Currency from "@/app/public/shared/currency/Currency.vue";
import {ScrollController} from "@/core/service/scroll.service";
import {useRoute} from "vue-router";

export default {
  components: {
    Currency,
  },
  setup() {
    const state = ref(new incomeState());
    const route = useRoute();
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      state.value.getFactors(route.params.supporterId);
    }

    onMounted(() => {
      state.value.getFactors(route.params.supporterId);
      scrollCtrl.startListen();
    });
    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    return {
      state,
    };
  },
};
</script>

<style>
</style>
