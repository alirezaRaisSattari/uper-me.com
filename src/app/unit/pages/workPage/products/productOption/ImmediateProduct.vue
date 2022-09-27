<template>
  <div>
    <h6 class="header mt-3">{{ $t("addImmediateTag") }}</h6>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
    </div>

    <template v-if="plansState.allplans != null">
      <div v-for="(plan, index) in plansState.allplans" :key="index"
           class="d-flex flex-column plan-card bg-white my-3 text-right p-2 hover-pointer hover-bg-primary"
           @click="selectedplan(plan)">
        <div class="w-100">
          {{ formatPriceNumber(plan.price) }}
          <currency :currencyId="plan.currencyId" class="mb-1"></currency>
        </div>
        <div class="w-100">
          <p>
            {{ $t('immediateTagDescriptionPart1') }} {{ plan.days }} {{ $t('immediateTagDescriptionPart2') }}
          </p>
        </div>
        <GetAccount v-if="currentPlan && currentPlan.id === plan.id" :plan="plan" :planDialog="planDialog" :plansId="plansId" @done="(event)=> planDialog = false"/>
      </div>
    </template>
    <template v-else>
      <Lottie :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'" :title="$t('emptyPlans')"/>
    </template>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from "vue";
import {ImmediatePlans} from "./ImmediateProductState";
import {useRoute} from "vue-router";
import {BASE_TAKE} from "@/core/constant/constant";
import {priceFormat, windowScrolledToBottom,} from "@/core/service/utils.service";
import currency from "@/app/public/shared/currency/Currency.vue";
import GetAccount from "@/app/public/shared/getAccount/GetAccount.vue";
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";

export default {
  name: "plans",
  components: {
    currency,
    GetAccount,
    Lottie
  },
  setup() {
    const plansState = ref(new ImmediatePlans());
    const route = useRoute();
    const categoryId = ref(route.params.categoryId);
    const planDialog = ref(false);
    const AccountInfo = ref({});
    const plansId = ref();
    const currentPlan = ref();
    const formatPriceNumber = (value) => {
      return priceFormat(value);
    };

    function getAllPlans() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        categoryId: categoryId.value,
        countryId: 1,
        currencyId: null,
      };
      plansState.value.getPlans(model);
    }

    function selectedplan(plan) {
      plansId.value = plan.id;
      currentPlan.value = plan;
      planDialog.value = !planDialog.value;

    }

    function accountDetails(item) {
      AccountInfo.value = {...item};
    }

    onMounted(() => {
      getAllPlans();
      windowScrolledToBottom(() => {
        getAllPlans();
      });
    });


    return {
      plansState,
      planDialog,
      plansId,
      accountDetails,
      selectedplan,
      formatPriceNumber,
      currentPlan,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}

.plan-card {
  box-shadow: 1px 1px 4px #80808052;
  border-radius: 10px;
  font-size: 14px;
  margin: 0 25px;
}

.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

</style>
