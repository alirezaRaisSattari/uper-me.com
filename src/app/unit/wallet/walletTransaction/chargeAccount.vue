<template>
  <Dialog
      v-model:visible="chargeAccount"
      :breakpoints="{
      '950px': '60vw',
      '1200px': '45vw',
      '320px': '100vw',
      '450px': '85vw',
    }"
      :contentStyle="{ background: 'rgb(255, 255, 255)'}"
      :style="{}"
      dismissableMask
      header=""
      modal
  >
    <div class="p-3">
      <p class="text-center">{{$t('chargeAccount')}}</p>
      <InputNumber v-model="priceVal" class="w-100 px-2 my-2" style="height: 48px !important;" :placeholder="$t('price2')" mode="decimal" />
      <div class="w-100 text-center my-3">
        <Button class="p-button-raised p-button-secondary w-100" @click="getPaymentGateway">
          {{ $t("submit") }}
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import {ref} from "vue";
import {Field, Form} from "vee-validate";
import * as Yup from "yup";
import {i18n} from "@/main";
import {AccountingRepository} from "@/core/repository/accountingRepository";
import {getSelectedPageId} from "@/core/service/utils.service";
import {DateService} from "@/core/service/date.service";
import {DataFormatterService} from "@/core/service/dataFormater.service";
import {now} from "lodash";
import InputNumber from 'primevue/inputnumber';

export default {
  name: "chargeAccount",
  components: {Field, Form, InputNumber},
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    accountId: Number
  },
  setup(props) {
    const chargeAccount = ref(props.show);
    const priceVal = ref('')
    const priceSchema = Yup.object().shape({
      price: Yup.string()
          .test("len", i18n.global.tc("priceMinLen"), (val) => val >= 100)
          .default(""),
    });

    const getPaymentGateway = () => {
      AccountingRepository.getInstance().GetPaymentGateWay(
          {
            body: {
              "pageId": getSelectedPageId(),
              "amount": priceVal.value,
              "currencyId": 1,
              "gatewayType": 1,
              "invoiceDate": DateService.getInstance().convertToJalali(new Date().toISOString()),
              "accountId": props.accountId
            },
            onReceive:res => {
                openInNewTab(res.webPayingAddress + res.token);
            }
          }
      );
    }

    function openInNewTab(href) {
      Object.assign(document.createElement('a'), {
        target: '_blank',
        href: href,
      }).click();
    }

    return {
      chargeAccount,
      priceSchema,
      priceVal,
      getPaymentGateway
    };
  },
};
</script>

<style scoped>
.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}
</style>
