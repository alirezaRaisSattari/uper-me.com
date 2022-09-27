<template>
  <div>
    <mainSupporter/>
    <p v-if="awardState.isNull" class="w-100 text-center mt-2">
      {{ $t("noItem") }}
    </p>
    <div class="reward-card w-100 d-flex flex-column my-3">
      <div class="w-100 d-flex justify-content-between text-align-center">
        <span>1400/1/11</span>
        <div class="d-flex">
          <i class="far fa-clock" style="font-size: 15px"></i>
          <span class="px-1">10:50</span>
        </div>
        <span>{{ $t("document") }}:608</span>
      </div>
      <div class="w-100 d-flex align-items-center my-1">
        <span>{{ $t("cost") }} : 0.20</span>

        <Currency class="mx-2" currencyId="0"/>

        <span class="">بابت واریزی آپری جهت ساخت پست</span>
      </div>
      <div class="line my-2"></div>
      <div class="w-100 d-flex justify-content-center align-items-center p-0">
        <p>
          <span> {{ $t("remaining") }}" 0.06 </span>
          <Currency class="mx-2" currencyId="0"/>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import mainSupporter from "./mainSupporter.vue";
import Currency from "@/app/public/shared/currency/Currency.vue";
import {onMounted, ref} from "vue";
import {supporterAward} from "./awardState.ts";
import {BASE_TAKE} from "@/core/constant/constant";
import {windowScrolledToBottom} from "@/core/service/utils.service";

export default {
  name: "supporterReward",
  components: {
    mainSupporter,
    Currency,
  },
  setup() {
    const awardState = ref(new supporterAward());

    function getAllAwards() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
      };
      awardState.value.getAward(model);
    }

    onMounted(() => {
      getAllAwards;
      windowScrolledToBottom(() => {
        getAllTickets();
      });
    });
    return {
      awardState,
    };
  },
};
</script>

<style scoped>
.reward-card {
  font-size: 14px;
  border-radius: 10px;
  width: calc(100% - 40px);
  padding: 10px;
  margin: 10px;
  box-shadow: 1px 2px 10px #afadad;
}

.line {
  width: 100%;
  height: 1px;
  background: #bdb2b2;
}
</style>
