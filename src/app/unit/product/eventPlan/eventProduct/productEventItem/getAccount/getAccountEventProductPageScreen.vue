<template>
  <Dialog v-model:visible="planDialog" :breakpoints="{'500px': '100vw' ,'960px': '75vw', '5000px':'512px'}"
          :contentStyle="{background: 'rgb(255, 255, 255)',borderRadius: '8px','-ms-overflow-style':'none', 'scrollbar-width':'none'}"
          :dismissableMask="true" :position="'bottom'"
          :showHeader="false" :style="{ margin: '0', border: 'none' }" modal>
    <div class="d-flex justify-content-start">
      <Button class="p-button-rounded p-button-plain p-button-text" icon="pi pi-times" @click="planDialog = false"/>
    </div>
    <div class="body-dialog-plans">
      <div class="head smart-text-align">
        <span class="title">{{ $t("selectedPlan") }}</span>
        <span class="sub-title">
        {{ plan.cost && plan.cost > 0 ? formatPriceNumber(plan.cost) : formatPriceNumber(plan.price) }}
        <currency :currencyId="plan.currencyId"></currency>
      </span>
        <span v-if="plan.days" class="sub-title">
        <span class="ml-2">{{ plan.days }}</span>
        <span>{{ $t("day") }}</span>
      </span>
        <span v-if="plan.planId" class="sub-title">
        <span class="ml-2">{{ $t("stationNumber") }} :</span>
        <span>{{ plan.planId }}</span>
      </span>
      </div>
      <div class="body">
        <div class="head-body">
          <span>{{ $t("selectAccount") }}</span>
          <Button :label="$t('chargeAccount')" class="btn-get-account p-button-raised p-button-text p-button-plain"
                  @click="chargeAccount()"/>
        </div>
        <loading v-if="state.loading"/>

        <div v-if="state.accounts != null" class="d-flex flex-wrap justify-content-between w-100">
          <swiper :direction="'horizontal'" :free-mode="false" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                  :slides-per-view="'auto'" :space-between="0" class="slider w-100">
            <swiper-slide v-for="(account, index) in state.accounts" :key="index" class="pt-2 d-flex w-100 px-1">
              <Button class="p-button-text item-get-account p-0" type="button" @click="selectedAccount(account, index)">
                <div class="header-item smart-text-align">
                  <span>
                    <i :class="selectStyle === index ? 'pi pi-check-circle' : ''"></i>
                    {{ account.title }}
                  </span>
                </div>
                <div class="body-item">
                  <span>{{ formatAccNumber(account.accountNumber) }}</span>
                </div>
                <div class="footer-item">
                  <span>{{ formatPriceNumber(account.originalCash) }}</span>
                  <currency :currencyId="account.currencyId"></currency>
                </div>
              </Button>
            </swiper-slide>
          </swiper>
        </div>
        <div class="w-100 text-center">
          <Button :label="$t('submit')" class="btn-get-account p-button-raised p-button-text p-button-plain"
                  @click="dialogPassword = true"/>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="dialogPassword"
          :contentStyle="{background: 'rgb(255, 255, 255)',width:'350px',borderRadius: '8px','-ms-overflow-style':'none', 'scrollbar-width':'none'}"
          :dismissableMask="true"
          :showHeader="false" :style="{ margin: '0', border: 'none' }" modal>
    <div class="password-controller">
      <InputText v-model="password" :placeholder="$t('enterPassword')" type="password"/>
      <div class="btn-control">
        <Button :label="$t('submit')" class=" p-button-raised p-button-text p-button-plain" @click="sendInfo()"/>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import currency from "@/app/public/shared/currency/Currency.vue";
import {getAccount} from "./getAccountEventProductState";
import {Swiper, SwiperSlide} from "swiper/vue";
import {onMounted, ref} from "vue";
import {accountNumberFormat, getSelectedPageId, priceFormat} from "@/core/service/utils.service";
import Ripple from 'primevue/ripple';
import {ToastService} from '@/core/service/toast.service';
import {i18n} from '@/main';
import {useRoute} from 'vue-router';
import router from '@/core/router/router';

export default {
  props: ['plan', 'planDialog', 'plansId'],
  directives: {
    'ripple': Ripple
  },
  emits: ["done"],
  components: {currency, Swiper, SwiperSlide},
  setup(props, {emit}) {
    const route = ref(useRoute());
    const state = ref(new getAccount());
    const selectedAccountInfo = ref(null);
    const password = ref('');
    const dialogPassword = ref(false);
    const selectStyle = ref();

    const formatAccNumber = (value) => {
      return accountNumberFormat(value);
    };

    const formatPriceNumber = (value) => {
      return priceFormat(value);
    };

    function getAccounts() {
      let model = {
        pageId: getSelectedPageId(),
        accountType: 1,
        currencyId: props.plan.currencyId,
      };
      state.value.getAccount(model, () => {
        selectedAccount(state.value.accounts[0], 0);
      });
    }

    function selectedAccount(obj, index) {
      selectedAccountInfo.value = {...obj};
      selectStyle.value = index;
    }

    const chargeAccount = () => {
      ToastService.getInstance().warning(i18n.global.tc('impossibleMsg'))
    };

    function sendInfo() {
      if (route.value.query.pId) {
        let model = {
          eventPageId: Number(route.value.params.eventPageId),
          buyerWorkPageId: Math.abs(getSelectedPageId()),
          currencyId: props.plan.currencyId,
          accountNumber: selectedAccountInfo.value.accountNumber,
          place: props.plan.place,
          planId: props.plansId,
          productId: Number(route.value.query.pId),
          password: password.value,
        };
        state.value.addTag(model, () => {
          dialogPassword.value = false;
          password.value = "";
          emit('done', true);
        });
      } else {
        router.back();
      }
    }

    onMounted(() => {
      getAccounts();
    });


    return {
      state,
      formatAccNumber,
      formatPriceNumber,
      selectedAccount,
      selectStyle,
      chargeAccount,
      dialogPassword,
      sendInfo,
      password
    };
  },
};
</script>

<style lang="scss" scoped>

.body-dialog-plans {
  display: flex;
  flex-direction: column;

  .head {
    display: flex;
    flex-direction: column;
    flex: 85%;
    margin: 10px 15px;
    box-shadow: 0 0 3px #b5b5b5;
    color: #212121;
    padding: 10px;
    border-radius: 8px;

    .title {
      font-size: 14px;
    }

    .sub-title {
      font-size: 12px;
    }
  }

  .body {
    padding: 10px 15px;
    display: flex;
    flex-direction: column;

    .head-body {
      display: flex;
      width: 100%;
      flex-direction: row;
      align-items: center;

      span {
        font-size: 15px;
      }
    }

    .item-get-account {
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 5px #b5b5b5;
      margin: 10px 0;
      border-radius: 8px;
      cursor: pointer;
      border: none;

      .header-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #e0f2ff;
        color: #212121;
        padding: 5px 10px;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        width: 100%;
        font-size: 14px;

        i {
          margin: 0 5px;
          color: #0daacd;
          position: relative;
          top: 3px;
        }
      }

      .body-item {
        font-size: 13px;
        margin: 10px;
        padding: 0 10px 5px;
        border-bottom: 1px solid #b5b5b5;
      }

      .footer-item {
        font-size: 13px;
        padding: 0 10px 8px;
        width: 100%;
        text-align: left;

        span {
          position: relative;
          top: 2px;
          margin: 0 5px;
        }
      }

    }

    .btn-get-account {
      font-size: 13px;
      border-radius: 20px;
      margin-right: auto;
      padding: 8px 35px;
      box-shadow: 0 1px 5px #b5b5b5;
    }
  }
}

.password-controller {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
  width: 100%;

  input {
    border: 2px solid #b5b5b5 !important;
    border-radius: 5px;
    color: #212121;
    padding: 10px 20px !important;
    margin-bottom: 10px;
    font-size: 14px;
    text-align: left;
    width: 100%;

    &:focus {
      border: 2px solid #b5b5b5 !important;
    }
  }

  .btn-control {
    display: block;
    text-align: center;
    width: 100%;

    button {
      font-size: 13px;
      border-radius: 8px;
      margin-right: auto;
      padding: 10px 35px;
      box-shadow: 0 1px 5px #b5b5b5;
      width: 100%;
      background: #c5e4e7;
    }
  }
}

</style>
