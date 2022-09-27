<template>
  <div class="container pb-5">
    <div class="card mt-3 border-radius-10px head-card w-100">
      <div class="d-flex justify-content-between align-items-center py-4 px-2">
        <div class="d-flex justify-content-between align-items-center">
          <img
              alt=""
              class="crown-icon"
              src="@/assets/img/ic_crown_golden.svg"
          />
          <div class="mr-2">
            <p class="text-center m-0 p-0 gray">{{ $t("credit") }}</p>
            <p v-if="user.creditLevel === 1" class="text-center m-0 p-0">
              {{ $t("goldCreditLevel") }}
            </p>
            <p v-if="user.creditLevel === 2" class="text-center m-0 p-0">
              {{ $t("silverCreditLevel") }}
            </p>
            <p v-if="user.creditLevel === 3" class="text-center m-0 p-0">
              {{ $t("bronzeCreditLevel") }}
            </p>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <div class="mr-2">
            <p class="text-center m-0 p-0 gray">{{ $t("activity") }}</p>
            <p class="text-center m-0 p-0">{{walletState.activityLevelValue / 1.0}}</p>
          </div>
          <img alt="" class="crown-icon" src="@/assets/img/sathefaaliat.svg"/>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <Button
          :label="'محاسبه مجدد سطح فعالیت'"
          class="calculate-button p-button-sm mx-auto border-radius"
          icon="pi pi-check"
          @click="calculateActivity"
      />
    </div>
    <loading v-if="walletState.activityLevelLoading" class="mt-3"/>

    <loading v-if="walletState.loading" class="mt-3"/>
    <div
        v-for="item in walletState.objectList"
        :key="item"
        class="w-100 d-flex-flex-column"
    >
      <div
          class="d-flex justify-content-center align-items-center head-of-cards"
      >
        <currency :currencyId="item[0].currencyId" :scale="2"></currency>
      </div>
      <div class="card mt-3 border-radius-10px head-card w-100">
          <div class="text-center">
            <div
                v-for="account in item"
                :key="account"
                class=" my-4 card m-2 border-radius-10px"
            >
              <router-link
                  :to="'/wallet/transaction/' + account.accountNumber"
                  class="text-dark  text-decoration-none"
              >
                <div class="d-flex blue justify-content-center">
                  <p class="p-2 m-0 text-center">{{ account.title }}</p>
                </div>
                <div class="d-flex justify-content-center">
                  <p class="p-2 m-0 text-center" style="direction: ltr">
                    {{ formatAccNumber(account.accountNumber) }}
                  </p>
                </div>
                <hr class="p-0 m-0"/>
                <div class="p-1">
                  {{ formatPriceNumber(account.originalCash, account.currencyId,) }} &nbsp;
                  <currency :currencyId="account.currencyId"></currency>
                </div>
              </router-link>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  accountNumberFormat,
  getSelectedPageId,
  priceFormat,
} from "@/core/service/utils.service";
import currency from "@/app/public/shared/currency/Currency.vue";
import {ref, onMounted} from "vue";
import {wallet} from "./walletScreenState";
import {getSelectedPageData} from "@/core/service/utils.service";

export default {
  name: "mainPageWallet",
  components: {
    currency,
  },
  setup() {
    const walletState = ref(new wallet());
    const user = ref(getSelectedPageData());
    const formatAccNumber = (value) => {
      return accountNumberFormat(value);
    };
    const formatPriceNumber = (value, cid) => {
      if (cid !== 0) {
        return priceFormat(Math.floor(value));
      } else{
        return priceFormat(value);
      }
    };

    function getWorkAccounts() {
      let model = {
        pageId: getSelectedPageId(),
        accountType: null,
      };
      walletState.value.getWorkAccounts(model);
    }

    function calculateActivity() {
      let pageId = getSelectedPageId();
      walletState.value.activityLevel(pageId);
    }

    onMounted(() => {
      getWorkAccounts();
    });
    return {
      walletState,
      formatPriceNumber,
      formatAccNumber,
      calculateActivity,
      user,
    };
  },
};
</script>

<style scoped>
.head-card {
  border: 2px solid #0077dd;
}

.crown-icon {
  width: 45px;
}

.gray {
  color: #757575;
}

.calculate-button {
  margin-top: -14px;
}

.blue {
  background-color: #e0f2ff;
}

.border-radius {
  border-radius: 16px;
}

.head-of-cards {
  padding-left: 2px;
  border-radius: 10000px;
  height: 45px;
  top: 39px;
  z-index: 9;
  position: relative;
  text-align: center;
  width: 100%;
}

::v-deep(.scale-2in1) {
  background: #fff;
  border: solid 1px royalblue;
  border-radius: 50%;
}
</style>
