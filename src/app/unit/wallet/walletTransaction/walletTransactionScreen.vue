<template>
  <div class="mx-4 mb-5 ">
    <Dialog
        v-model:visible="detailes"
        :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
        :contentStyle="{ background: 'rgb(255, 255, 255)'}"
        :showHeader="false"
        :style="{}"
        dismissableMask
        header=""
        modal
    >
      <div class="p-2">
        <div
            class="w-100 pb-2 text-right p-2 hover-pointer"
            @click="editTitleDialog"
        >
          <i class="fa fa-edit"></i>
          <span class="mx-2">{{ $t("editTitle") }}</span>
        </div>
        <div
            class="w-100 pb-2 text-right p-2 hover-pointer"
            @click="editPasswordDialog"
        >
          <i class="fa fa-unlock-alt"></i>
          <span class="mx-2">{{ $t("editPassword") }}</span>
        </div>
        <div
            v-if="
            transactions.transactionInfo[0].accountType === 1 &&
            transactions.transactionInfo[0].currencyId !== 0
          "
        >
          <div
              class="w-100 pb-2 text-right p-2 hover-pointer"
              @click="openMonyTransferDialog"
          >
            <i class="fa fa-unlock-alt"></i>
            <span class="mx-2">{{ $t("transferMoney") }}</span>
          </div>
          <div
              class="w-100 pb-2 text-right p-2 hover-pointer"
              @click="openChargeAccount"
          >
            <i class="fa fa-unlock-alt"></i>
            <span class="mx-2">{{ $t("chargeAccount") }}</span>
          </div>
          <div
              class="w-100 pb-2 text-right p-2 hover-pointer"
              @click="openShowQrDialog"
          >
            <i class="fa fa-unlock-alt"></i>
            <span class="mx-2">{{ $t("showQr") }}</span>
          </div>
        </div>
      </div>
    </Dialog>
    <Dialog
        v-model:visible="editTitle"
        :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
        :contentStyle="{ background: 'rgb(255, 255, 255)'}"
        :showHeader="false"
        :style="{}"
        dismissableMask
        header=""
        modal
    >
      <Form
          v-slot="{ errors }"
          :validation-schema="titleSchema"
          class="w-100"
          @submit="onSubmitLogin"
      >
        <div class="w-100 px-2 my-2">
          <Field
              id="title"
              v-model="transactionTitle"
              :placeholder="$t('editTitle')"
              class="px-2 form-control"
              name="title"
              type="text"
          />
          <div class="text-danger text-sm w-100 text-center">
            {{ errors.title }}
          </div>
        </div>
        <div class="w-100 px-2 my-2">
          <Field
              id="password"
              v-model="transactionPassword"
              :placeholder="$t('password')"
              class="px-2 form-control"
              name="password"
              type="text"
          />
          <div class="text-danger text-sm">{{ errors.password }}</div>
        </div>
        <div class="w-100 text-center mb-2">
          <Button
              :label="$t('submit')"
              :loading="loading"
              class="
              w-50
              btn
              mt-2
              rounded-pill
              py-1
              color-light
              bg-success
              text-light
              mt-2
            "
              @click="updateTitle"
          />
        </div>
      </Form>
    </Dialog>
    <Dialog
        v-model:visible="editPassword"
        :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
        :contentStyle="{ background: 'rgb(255, 255, 255)'}"
        :showHeader="false"
        :style="{}"
        dismissableMask
        header=""
        modal
    >
      <div class="w-100 text-center my-2">{{ $t("changePassword") }}</div>
      <Form
          v-slot="{ errors }"
          :validation-schema="passWordSchema"
          class="w-100"
          @submit="onSubmitLogin"
      >
        <Field
            id="currentPassword"
            :placeholder="$t('newPassword')"
            class="form-control px-2 my-2 w-90"
            name="currentPassword"
            type="text "
        />
        <div class="text-danger text-sm">{{ errors.currentPassword }}</div>

        <Field
            id="newPassword"
            :placeholder="$t('confirm_password')"
            class="form-control px-2 my-2 w-90"
            name="newPassword"
            type="text "
        />
        <div class="text-danger text-sm">{{ errors.newPassword }}</div>

        <Field
            id="confirmPassword"
            :placeholder="$t('enterPassword')"
            class="form-control px-2 my-2 w-90"
            name="confirmPassword"
            type="text "
        />
        <div class="text-danger text-sm">{{ errors.confirmPassword }}</div>

        <div class="w-100 text-center my-2">
          <Button
              :label="$t('submit')"
              :loading="loading"
              class="
              submit-btn
              btn
              mt-2
              rounded-pill
              py-1
              color-light
              bg-success
              text-light
              mt-2
            "
              @click="changePassword"
          />
        </div>
      </Form>
    </Dialog>
    <div class="d-flex justify-content-center pb-60">
    <h5 class="header-title mt-3 text-sm">{{ $t("mainAccountType") }}</h5>
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
    </div>

    <div
        v-for="i in transactions.transactionInfo"
        v-if="transactions.transactionInfo"
        :key="i"
    >
      <div class="w-100 mt-2 mb-1 px-1 d-flex justify-content-between">
        <div class=" d-flex">
          <span class="text-secondary text-sm">{{ $t("walletName") }} : </span>
          <span class="mx-4 text-sm">{{ i.title }}</span>
        </div>
        <i class="p-2 fa fa-ellipsis-v" @click="openDetailsDialog"></i>
      </div>
      <p class="w-100 d-flex align-items-center px-1">
        <span class="text-secondary ml-3 text-sm">{{ $t("currency_") }}:</span>
        <span class="mr-4 ml-2 text-sm ltr ">{{ formatPriceNumber(i.orginalCash,i.currencyId) }}</span>
        <currency :currencyId="i.currencyId"></currency>
      </p>
      <p class="w-100 d-flex align-items-center px-1">
        <span class="text-secondary text-sm">{{ $t("value-amount") }}:</span>
        <span class="mr-4 ml-2 text-sm ltr">{{ formatPriceNumber(i.balanceCash, i.currencyId) }}</span>
        <currency :currencyId="i.currencyId"></currency>
      </p>
      <p class="w-100 d-flex align-items-center px-1">
        <span class="text-secondary text-sm  ">{{ $t("expireDate") }}:</span>
        <span class="mr-4 ml-2 text-sm">{{
            date.convertToJalali(i.expiredTime, false)
          }}</span>
      </p>
      <hr/>
    </div>

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
      <div class="text-center">
        <p>تاریخ شروع</p>
        <datePicker v-model="dateFrom" class="p-2 submit-btn my-1 w-100"/>
      </div>
      <div class="text-center">
        <p>تاریخ پایان</p>
        <datePicker v-model="dateSince" class="p-2 submit-btn my-1 w-100"/>
      </div>
    </div>

    <div class="w-100 my-2 text-center">
      <button class="btn rounded py-2 time-btn text-sm" @click="transactionsByDate">
        {{ $t("ApllyTimeFilter") }}
      </button>
    </div>
    <p v-if="transactions.isNull" class="w-100 text-center mt-5 text-sm">
      {{ $t("noItem") }}
    </p>
    <div
        v-for="transaction in transactions.allTransactions"
        :key="transaction"
        class="w-100 main-cards d-flex flex-column mb-5 "
    >
      <div
          class="
          w-100
          d-flex
          p-2
          align-items-center
          justify-content-between
          card-top
        "
      >
        <span class="w-50 text-right text-sm">{{
            date.dayOfweek(transaction.createDate)
          }}</span>
        <div class="d-flex justify-content-end align-items-center w-50 d-flex">
          <span class="text-sm">{{ date.convertToJalali(transaction.createDate, false) }}</span>
          <span class="mx-2 text-sm">{{
              date.getJalaliTime(transaction.createDate, false)
            }}</span>
          <i class="far fa-clock"></i>
        </div>
      </div>
      <div class="d-flex flex-column pt-2">
        <div class="w-100 d-flex align-items-center">
          <div class="w-50 text-right px-2">
            <span class="text-sm"  :class="accountNumber == transaction.receiverAccountNumber ? 'text-success' : 'text-danger'">{{ $t(accountNumber == transaction.receiverAccountNumber ? 'deposit' : 'pay') }}:</span>
            <span class="mx-2 text-sm">{{ formatPriceNumber(transaction.value,transaction.currencyId) }}</span>
            <currency :currencyId="transaction.currencyId"></currency>
          </div>
          <div class="w-50 text-left">
            <span class="text-secondary text-sm">{{ $t("document") }}:</span>
            <span class="mx-2 text-sm">{{ transaction.itId }}</span>
          </div>
        </div>
        <div class="w-100 d-flex mt-2 px-2">
        <div class="col px-1">
          <span class="text-secondary text-sm">{{ $t("for") }}:</span>
          <span class="mx-2 text-sm">{{ transaction.description }}</span>
        </div>
          <a @click="$event.preventDefault();$function.goTo('/showFactorDetails/'+transaction.factorId)" v-if="transaction.factorId != null" class="text-sm">{{ $t('factorNumber') }}&nbsp;:&nbsp;{{ 'UF_'+transaction.factorId  }}</a>
        </div>
      </div>
      <div
          class="w-100 d-flex justify-content-center svg-holder p-0 text-center"
      >
        <img alt="" class="w-75" src="@/assets/img/svg/Path1000.svg"/>
        <div class=" text d-flex justify-content-between">
          <span class="w-50 text-sm text-sm">{{ $t("remaining") }} :</span>
            <span class="mx-2 text-sm text-sm">{{
                formatPriceNumber(accountNumber == transaction.receiverAccountNumber ? transaction.receiverRemainingValue : transaction.depositorRemainingValue, transaction.currencyId)
                }}

            </span>
            <currency :currencyId="transaction.currencyId"></currency>
        </div>
      </div>
    </div>

    <transferMony
        v-if="transactions.transactionInfo.length > 0 && monyTransfer"
        :accountNumber="transactions.transactionInfo[0].accountNumber"
        :callBack="updateTransaction"
        :currencyId="transactions.transactionInfo[0].currencyId"
        :show="monyTransfer"
    />
    <chargeAccount
        v-if="transactions.transactionInfo.length > 0 && chargeAccount"
        :show="chargeAccount"
        :account-id="transactions.transactionInfo[0].accountNumber"
    />
    <Dialog
        v-model:visible="showQrDialog"
        :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
        :contentStyle="{ background: 'rgb(255, 255, 255)'}"
        :showHeader="false"
        :style="{}"
        dismissableMask
        header=""
        modal
    >
      <h5 class="header-title mt-3 text-sm">{{ $t("showQr") }}</h5>
      <div class="d-flex justify-content-center">
        <img
            alt=""
            class="header-shape"
            src="@/assets/img/svg/appbarShape.svg"
        />
      </div>
      <div class="p-5">
        <qrCode :code="transactions.transactionInfo[0].accountNumber"/>
      </div>
    </Dialog>
  </div>
</template>

<script>
import DatePicker from "@/app/unit/shared/datePicker/datePickerPageScreen";
import currency from "@/app/public/shared/currency/Currency.vue";
import {ref, onMounted, watch, onBeforeUnmount} from "vue";
import {i18n} from "@/main";
import {useRoute} from "vue-router";
import {TransactionState} from "./walletTransactionState.ts";
import {BASE_TAKE} from "@/core/constant/constant";
import {
  getSelectedPageId,
  accountNumberFormat,
  priceFormat,
} from "@/core/service/utils.service";
import {windowScrolledToBottom} from "@/core/service/utils.service";
import {DateService} from "@/core/service/date.service";
import {Field, Form} from "vee-validate";
import * as Yup from "yup";
import transferMony from "./walleTransferMonyDialog.vue";
import {ToastService} from "@/core/service/toast.service";
import qrCode from "./qrCode.vue";
import chargeAccount from "./chargeAccount.vue";
import { ScrollController } from "@/core/service/scroll.service";


export default {
  components: {
    currency,
    DatePicker,
    Form,
    Field,
    transferMony,
    qrCode,
    chargeAccount,
  },
  setup() {
    const route = useRoute();
    const date = ref(new DateService());
    const detailes = ref(false);
    const editTitle = ref(false);
    const editPassword = ref(false);
    const dateFrom = ref();
    const dateSince = ref();
    const transactionPassword = ref();
    const newPassword = ref();
    const confirmPassword = ref();
    const accountNumber = ref(route.params.accountNumber);
    const transactions = ref(new TransactionState());
    const transactionTitle = ref();
    const moneyTransfer = ref(false);
    const showQrDialog = ref(false);
    const chargeAccount = ref(false);
    const isFiltered = ref(false);
    const accountType = ref([
      i18n.global.tc("mainAccountType"),
      i18n.global.tc("systemAccountType"),
      i18n.global.tc("rentalAccountType"),
      i18n.global.tc("payInPlaceAccountType"),
      i18n.global.tc("supporter"),
    ]);
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      if (isFiltered.value)
        transactionsByDate();
      else
        getTransactions();
    }
    const formatAccNumber = (value) => {
      return accountNumberFormat(value);
    };

    function openDetailsDialog() {
      detailes.value = !detailes.value;
    }

    function editTitleDialog() {
      detailes.value = false;
      editTitle.value = !editTitle.value;
    }

    function editPasswordDialog() {
      detailes.value = false;
      editPassword.value = !editPassword.value;
    }

    function getTransactions() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        pageId: getSelectedPageId(),
        orderByDescending: true,
        accountNumber: parseInt(accountNumber.value.toString()),
        startDate: null,
        endDate: null,
      };
      transactions.value.getAllTransactions(model, false);
    }

    function transactionsByDate() {
      isFiltered.value = true;
      let model2 = {
        skip: 0,
        take: BASE_TAKE,
        pageId: getSelectedPageId(),
        orderByDescending: true,
        accountNumber: parseInt(accountNumber.value.toString()),
        startDate: DateService.getInstance().convertJalaliToGregorian(
            dateFrom.value
        ).replace('Z', ''),
        endDate: DateService.getInstance().convertJalaliToGregorian(
            dateSince.value
        ).replace('Z', ''),
      };
      transactions.value.loadingTransactions = false;
      transactions.value.transactionsFinished = false;
      transactions.value.getAllTransactions(model2, true);
    }

    function getTransactionInfo() {
      transactions.value.getInfoByAccountNumber(parseInt(accountNumber.value.toString()));
    }

    onMounted(() => {
      getTransactionInfo();
      getTransactions();
      scrollCtrl.startListen();
    });

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    function updateTitle() {
      let titleModel = {
        pageId: getSelectedPageId(),
        accountNumber: parseInt(accountNumber.value.toString()),
        password: transactionPassword.value,
        title: transactionTitle.value,
        description: null,
        newPassword: null,
      };
      transactions.value.updateTransaction(titleModel);
      editTitle.value = false;
      getTransactionInfo();
      transactionPassword.value = "";
    }

    function changePassword() {
      if (newPassword.value === confirmPassword.value) {
        let passwordModel = {
          pageId: getSelectedPageId(),
          accountNumber: parseInt(accountNumber.value.toString()),
          password: transactionPassword.value,
          title: null,
          description: null,
          newPassword: newPassword.value,
        };
        transactions.value.updateTransaction(passwordModel);
        getTransactionInfo();
      }
      getTransactions();
      transactionPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
      editPassword.value = false;
    }

    watch(
        () => transactions.value.transactionInfo.length,
        () => {
          transactionTitle.value = transactions.value.transactionInfo.title;
        }
    );
    const passWordSchema = Yup.object().shape({
      password: Yup.string()
          .test(
              "len",
              i18n.global.tc("passwordInvalidatin", {
                min: 4,
                max: 14,
              }),
              (val) => val.length >= 4 && val.length <= 14
          )
          .default(""),
      title: Yup.string()
          .test(
              "len",
              i18n.global.tc("userNameInvalidatin", {
                min: 4,
                max: 40,
              }),
              (val) => val.length >= 4 && val.length <= 40
          )
          .default(""),
    });
    const titleSchema = Yup.object().shape({
      currentpassword: Yup.string()
          .test(
              "len",
              i18n.global.tc("passwordInvalidatin", {
                min: 4,
                max: 14,
              }),
              (val) => val.length >= 4 && val.length <= 14
          )
          .default(""),
      newPassword: Yup.string()
          .test(
              "len",
              i18n.global.tc("passwordInvalidatin", {
                min: 4,
                max: 14,
              }),
              (val) => val.length >= 4 && val.length <= 14
          )
          .default(""),
      confirmPassword: Yup.string()
          .test(
              "len",
              i18n.global.tc("passwordInvalidatin", {
                min: 4,
                max: 14,
              }),
              (val) => val.length >= 4 && val.length <= 14
          )
          .default(""),
    });

    function openMoneyTransferDialog() {
      if (transactions.value.transactionInfo[0].status !== 3) {
        moneyTransfer.value = !moneyTransfer.value;
        detailes.value = !detailes.value;
      } else
        ToastService.getInstance().success(i18n.global.tc("permissionDenied"));
    }
    const formatPriceNumber = (value, cid) => {
      if (cid !== 0) {
        return priceFormat(Math.floor(value));
      } else{
        return priceFormat(value);
      }
    };

    function openChargeAccount() {
      chargeAccount.value = !chargeAccount.value;
      detailes.value = !detailes.value;
    }

    function openShowQrDialog() {
      detailes.value = false;
      showQrDialog.value = !showQrDialog.value;
    }

    function updateTransaction() {
      transactions.value.loadingTransactions = false;
      transactions.value.transactionsFinished = false;
      getTransactions();
    }

    return {
      detailes,
      openDetailsDialog,
      editTitle,
      editTitleDialog,
      editPassword,
      editPasswordDialog,
      dateFrom,
      dateSince,
      transactions,
      formatAccNumber,
      formatPriceNumber,
      date,
      transactionsByDate,
      updateTitle,
      transactionPassword,
      transactionTitle,
      changePassword,
      confirmPassword,
      newPassword,
      titleSchema,
      passWordSchema,
      acccountType: accountType,
      openMonyTransferDialog: openMoneyTransferDialog,
      monyTransfer: moneyTransfer,
      showQrDialog,
      openShowQrDialog,
      chargeAccount,
      openChargeAccount,
      updateTransaction,
      accountNumber,
    };
  },
};
</script>

<style scoped>
.header-title {
  text-align: center;
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
  width: 45%;
  background: transparent;
}

.time-btn {
  background: #c2e1e3;
}

.main-cards {
  border: 2px solid #008a87;
  border-radius: 10px;
  position: relative;
}

.card-top {
  background: #fdddde;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.svg-holder {
  position: absolute;
  top: 100%;
}

.text {
  position: absolute;
  top: 5px;
  color: #fff;
}

.submit-btn input {
  background: transparent;
}

@media only screen and (max-width: 500px) {
  .text {
    top: 0;
    font-size: 14px;
  }
}

@media only screen and (max-width: 360px) {
}
.w-90{
  width: 94%;
  margin-right: 10px;
}
</style>
