<template>
  <Dialog
      v-model:visible="targetAccountDialog"
      :breakpoints="{
      '950px': '60vw',
      '1200px': '45vw',
      '320px': '100vw',
      '450px': '85vw',
    }"
      :contentStyle="{ background: 'rgb(255, 255, 255)'}"
      :showHeader="false"
      :style="{}"
      dismissableMask
      header=""
      modal
  >
    <div class="px-2">
      <h5 class="header-title mt-3">{{ $t("transferMoney") }}</h5>
      <div class="d-flex justify-content-center">
        <img
            alt=""
            class="header-shape"
            src="@/assets/img/svg/appbarShape.svg"
        />
      </div>
      <p class="w-100 text-right m-0 mt-3 text-muted">
        {{ $t("sourceAccountNumber") }}
      </p>
      <input
          v-model="accountNumber"
          class="form-control m-0"
          disabled
          type="number"
      />
      <input
          v-model="targetAccountNumber"
          :placeholder="$t('targetAccountNumber')"
          class="form-control mt-3"
          type="number"
      />
      <input
          v-model="price"
          :placeholder="$t('price2')"
          class="form-control mt-3"
          type="number"
      />
      <input
          v-model="description"
          :placeholder="$t('description')"
          class="form-control mt-3"
          type="text"
      />
      <div class="w-100 text-center my-3">
        <button class="w-25 mt-3 p-2 submit-btn" @click="apply">
          {{ $t("submit") }}
        </button>
      </div>
    </div>
  </Dialog>
  <Dialog
      v-model:visible="transferDialog"
      :breakpoints="{
      '950px': '60vw',
      '1200px': '45vw',
      '320px': '100vw',
      '450px': '85vw',
    }"
      :contentStyle="{ background: 'rgb(255, 255, 255)'}"
      :showHeader="false"
      :style="{}"
      dismissableMask
      header=""
      modal
  >
    <div v-if="State.targetAccountInfo != null" class="p-3">
      <div class="w-100 d-flex align-items-center">
        <img
            v-lazy="State.targetAccountInfo.pageDetails.profileImageUrl + '_sm.webp'"
            alt="img"
            class="profileImg"
        />
        <p class="mx-2 text-right">
          <span>{{ State.targetAccountInfo.pageDetails.username }}</span>
          <br/>
          <span>{{ State.targetAccountInfo.pageDetails.name }}</span>
        </p>
      </div>
      <p class="my-2 w-100 text-right smart-text-align">
        <span> {{ $t("targetAccountNumber") }} :</span>
        <span class="mx-2">{{ targetAccountNumber }}</span>
      </p>
      <div
          class="
          my-3
          w-100
          d-flex
          align-items-center
          justify-content-center
          smart-text-align
        "
      >
        <span class="mx-2">{{ $t("price2") }}</span> :
        <span class="mx-2">{{ price }}</span>
        <currency :currencyId="currencyId" :scale="2" class="mx-3"></currency>
      </div>
      <input
          v-model="walletPassword"
          :placeholder="$t('password')"
          class="form-control my-3"
          type="password"
      />
      <div class="w-100 text-center my-3">
        <button class="w-25 mt-3 p-2 submit-btn" @click="transfer">
          {{ $t("submit") }}
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import {ref, onMounted} from "vue";
import {monyTransfer} from "./walleTransferMonyDialogState";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import Currency from "@/app/public/shared/currency/Currency.vue";
import {
  accountNumberFormat,
  getSelectedPageId,
  priceFormat,
} from "@/core/service/utils.service";

export default {
  components: {Currency},
  name: "transferMony",
  props: {
    currencyId: {
      type: Number,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
    callBack: Function,
  },
  setup(props) {
    const targetAccountNumber = ref();
    const State = ref(new monyTransfer());
    const price = ref();
    const description = ref("");
    const transferDialog = ref(false);
    const walletPassword = ref("");
    const targetAccountDialog = ref(props.show);
    const formatAccNumber = (value) => {
      return accountNumberFormat(value);
    };
    const formatPriceNumber = (value) => {
      return priceFormat(value);
    };

    function apply() {
      if (targetAccountNumber.value && price.value && description.value != "") {
        let model = {accountNumber: targetAccountNumber.value};
        State.value.getByAccountNumber(model, () => {
          targetAccountDialog.value = false;
          transferDialog.value = !transferDialog.value;
        });
      } else ToastService.getInstance().error(i18n.global.tc("invalidInfo"));
    }

    function transfer() {
      if (walletPassword.value.length >= 4) {
        let model = {
          currencyId: props.currencyId,
          value: parseInt(price.value),
          depositePageId: getSelectedPageId(),
          depositeAccountNumber: props.accountNumber,
          receiverPageId: State.value.targetAccountInfo.pageId,
          receiverAccountNumber: State.value.targetAccountInfo.accountNumber,
          description: description.value,
          password: walletPassword.value,
        };
        State.value.TransferMoney(model, () => {
          props.callBack(true);
        });
        transferDialog.value = false;
      } else ToastService.getInstance().error(i18n.global.tc("enterPassword"));
    }

    return {
      State,
      targetAccountNumber,
      apply,
      formatAccNumber,
      transfer,
      formatPriceNumber,
      description,
      price,
      transferDialog,
      targetAccountDialog,
      walletPassword,
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

.profileImg {
  width: 65px;
  height: 65px;
  border-radius: 50%;
}
</style>
