<template>
  <div class="px-3">
    <h6 class="header-title mt-3 mx-auto">{{ $t("amazingPlans") }}</h6>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg" />
    </div>
    <loading v-if="State.loadingPlans" />
    <div v-if="State.allPlans == null" class="mt-5">
      <div class="d-flex justify-content-center mt-5">
        <i class="fas fa-box-open fa-6x mt-5"></i>
      </div>
      <p class="text-center mt-5">{{ $t("emptyFolderList") }}</p>
    </div>
    <div v-if="State.allPlans != null" class="d-flex flex-column mt-3">
      <div
        v-for="(plan, index) in State.allPlans"
        :key="index"
        class="bg-white uper-card-1 my-2 py-1 hover-pointer"
        @click="openChargeAccountDialog(index, plan.amazingPlanId)"
      >
        <p class="w-100 smart-text-align px-3 m-0">
          <span>{{ $t("cost") }} :</span>
          <span class="mx-1">{{ plan.price }} </span>
          <currency :currencyId="plan.currencyId" class="mb-1 mx-1" />
        </p>
        <p class="w-100 smart-text-align px-3 m-0 pt-1">
          <span>{{ $t("caption") }} :</span>
          <span class="mx-1">{{ plan.title }}</span>
        </p>
        <Dialog
          v-if="selectedPlan == index"
          v-model:visible="chargeAccountDialog"
          :breakpoints="{
            '950px': '60vw',
            '1200px': '45vw',
            '320px': '100vw',
            '450px': '85vw',
          }"
          :modal="true"
          :style="{ width: '30vw' }"
        >
          <div class="p-3">
            <div class="bg-white uper-card-1 my-2 py-1 hover-pointer">
              <p class="w-100 smart-text-align px-3 m-0">
                <span>{{ $t("cost") }} :</span>
                <span class="mx-1">{{ plan.price }} </span>
                <currency :currencyId="plan.currencyId" class="mb-1 mx-1" />
              </p>
              <p class="w-100 smart-text-align px-3 m-0 pt-1">
                <span>{{ $t("caption") }} :</span>
                <span class="mx-1">{{ plan.title }}</span>
              </p>
            </div>
            <GetAccount
              :currencyId="plan.currencyId"
              @getInfo="accountDetails"
            />
            <div
              class="
                w-100
                px-4
                my-2
                d-flex
                align-items-center
                justify-content-between
                datePicker
              "
            >
              <datePicker
                v-model="dateFrom"
                :placeholder="$t('From')"
                class="p-2 submit-btn my-1"
              />
              <datePicker v-model="dateSince" class="p-2 submit-btn my-1" />
            </div>
            <div class="w-100 text-center">
              <button
                class="w-25 mt-3 p-2 submit-btn"
                @click="openPasswordDialog"
              >
                {{ $t("submit") }}
              </button>
            </div>
          </div>
        </Dialog>
        <Dialog
          v-model:visible="passwordDialog"
          :breakpoints="{
            '2000px': '50vw',
            '1000px': '60vw',
            '800px': '70vw',
            '600px': '100vw',
          }"
          :contentStyle="{
            background: 'rgb(255, 255, 255)',
            borderRadius: '12px',
          }"
          :showHeader="false"
          :style="{ padding: '10px', border: 'none' }"
          dismissableMask
          header=""
          modal
        >
          <div class="p-3">
            <input
              v-model="password"
              :placeholder="$t('enterPassword')"
              class="form-control"
              type="password"
            />
            <div class="w-100 text-center">
              <button
                class="w-auto mt-3 py-2 px-5 submit-btn"
                @click="createPageAmazingProp"
              >
                {{ $t("submit") }}
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { plansState } from "./propAmazingPlansState";
import { ref, onMounted } from "vue";
import { BASE_TAKE } from "@/core/constant/constant";
import {
  getSelectedPageId,
  priceFormat,
  windowScrolledToBottom,
} from "@/core/service/utils.service";
import currency from "@/app/public/shared/currency/Currency.vue";
import GetAccount from "@/app/public/shared/getAccount/GetAccount.vue";
import DatePicker from "@/app/unit/shared/datePicker/datePickerPageScreen";
import { useRoute } from "vue-router";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import { DateService } from "@/core/service/date.service";

export default {
  components: { currency, GetAccount, DatePicker },
  setup() {
    const route = useRoute();
    const propId = ref(route.params.propId);
    const productId = ref(route.params.productId);
    const productType = ref(route.params.productType);
    const State = ref(new plansState());
    const chargeAccountDialog = ref(false);
    const passwordDialog = ref(false);
    const password = ref("");
    const dateFrom = ref();
    const dateSince = ref();
    const selectedPlan = ref();
    const AccountInfo = ref();
    const planId = ref();
    const formatPriceNumber = (value) => {
      return priceFormat(value);
    };

    function getAllPlans() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        currencyId: null,
      };
      State.value.getAllPlans(model);
    }

    onMounted(() => {
      getAllPlans();
      windowScrolledToBottom(() => {
        getAllPlans();
      });
    });

    function openChargeAccountDialog(index, id) {
      planId.value = id;
      selectedPlan.value = index;
      chargeAccountDialog.value = !chargeAccountDialog.value;
    }

    function accountDetails(item) {
      AccountInfo.value = { ...item };
    }

    function openPasswordDialog() {
      if (AccountInfo.value) {
        passwordDialog.value = !passwordDialog.value;
      } else ToastService.getInstance().warning(i18n.global.tc("pleasePay"));
    }

    function createPageAmazingProp() {
      if (password.value.length >= 4) {
        let model = {
          depositorPageId: Math.abs(getSelectedPageId()),
          depositorAccountNumber: AccountInfo.value.accountNumber,
          password: password.value,
          productType: parseInt(productType.value),
          productId: parseInt(productId.value),
          propId: parseInt(propId.value),
          endAmazingTime: DateService.getInstance().convertJalaliToGregorian(
            dateSince.value
          ),
          startShowTime: DateService.getInstance().convertJalaliToGregorian(
            dateFrom.value
          ),
          planId: planId.value,
        };
        State.value.createPageAmazingProp(model, () => {});
        password.value = "";
      } else
        ToastService.getInstance().warning(
          i18n.global.tc("passwordInvalidatin", {
            min: 4,
            max: 14,
          })
        );
      passwordDialog.value = false;
      chargeAccountDialog.value = false;
    }

    return {
      State,
      formatPriceNumber,
      openChargeAccountDialog,
      chargeAccountDialog,
      selectedPlan,
      accountDetails,
      dateFrom,
      dateSince,
      passwordDialog,
      password,
      createPageAmazingProp,
      openPasswordDialog,
    };
  },
};
</script>

<style scoped>
.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}

.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}
</style>
