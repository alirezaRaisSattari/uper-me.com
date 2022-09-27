<template>
  as;lckal;skclwkqc;qkwp;k
  <div class="">

    <loading v-if="state.pageEventLoading" class="mt-4"/>
    <div v-if="state.mainEventPage!=null"
         class=" bg-light item  uper-card-1 smart-text-align d-flex justify-content-center ">
      <div class="col-4 px-0 smart-text-align">
        <img v-lazy="state.mainEventPage.profileImageUrl" class="img">
      </div>
      <div class="col-8 px-0" style="padding-block: 22px;">
        <div class="text">{{ state.mainEventPage.name }}</div>
      </div>
    </div>
    <div class="text-center my-4">{{ $t('planItems') }}</div>
    <div v-for="item in state.plans" :key="item.planId" class=" bg-light item  uper-card-1 smart-text-align  "
         @click="state.selectedPlan=item;showDialog=true">
      <div class=" px-0 smart-text-align mb-2">{{ $t('cost') }}:{{ item.cost }}
        <Currency :currencyId="item.currencyId" class="mb-1"></Currency>
      </div>
      <div class=" px-0 smart-text-align">{{ $t('stationNumber') }}:{{ item.place }}</div>
    </div>
    <div v-if=" state.plans.length==0" class="text-center mx-auto mt-4">
      <div class="blue">{{ $t('noResultsFound') }}</div>
    </div>
  </div>


  <!--  plan details modal-->
  <Dialog v-model:visible="showDialog" :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
          :contentStyle="{ background: 'rgb(255, 255, 255)'}" :dismissableMask="false"
          :modal="true" :showHeader="false"
          :style="{width: '35vw',background: 'rgb(255, 255, 255)', borderRadius: '12px'}"
          position="bottom">

    <div>
      <div class="col-12 smart-text-align">
        <i class="fas fa-times mb-4" @click="showDialog=false"></i>
      </div>
      <div class=" bg-light item  uper-card-1 smart-text-align  ">
        <div class=" px-0 smart-text-align mb-2">{{ $t('cost') }}:{{ state.selectedPlan.cost }}
          <Currency :currencyId="state.selectedPlan.currencyId" class="mb-1"></Currency>
        </div>
        <div class=" px-0 smart-text-align">{{ $t('stationNumber') }}:{{ state.selectedPlan.place }}</div>
      </div>

      <div class="d-flex mb-4">
        <div class="col-6 px-3 smart-text-align " style="padding-block: 5px;">{{ $t('selectAccount') }}</div>
        <div class="col-4 px-2 text-center">
          <div class="enhance-button uper-card-1">{{ $t('chargeAccount') }}</div>
        </div>
      </div>

      <div class="px-2">

        <getAccount :currencyId="1" @getInfo="accountDetails"/>
      </div>
    </div>

    <div class=" mb-4 mt-4 text-center">
      <div class="col-12 px-2 text-center">
        <div class="enhance-button uper-card-1" @click="showPassWord">{{ $t('confirm') }}</div>
      </div>
    </div>
  </Dialog>


  <!--  pass modal-->
  <Dialog v-model:visible="state.showPassWordModal" :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
          :contentStyle="{ background: 'rgb(255, 255, 255)'}" :dismissableMask="false"
          :modal="true" :showHeader="false"
          :style="{width: '35vw',background: 'rgb(255, 255, 255)', borderRadius: '12px'}"
          position="center">


    <Form
        v-slot="{ errors }"
        :validation-schema="pageNameSchema"
        class="w-100 mt-1 px-3"
        @submit="confirm"
    >
      <div>
        <div class="col-12 smart-text-align">
          <i class="fas fa-times mb-4" @click="state.showPassWordModal=false"></i>
        </div>


        <Field
            id="passWord"
            v-model="state.passWord"
            :class="errors.passWord ? 'border border-danger' : ''"
            :placeholder="$t('password')"
            autocomplete="new-password"
            class="form-control border-radius-10px py-3 inputs pass"
            name="passWord"
            type="password"
            @input=""

        />
        <div class="text-danger text-sm text-right w-100 my-1 px-2">
          {{ errors.passWord }}
        </div>

      </div>

      <div class=" mb-4 mt-4 text-center">
        <div class="col-12 px-2 text-center">
          <button class="btn enhance-button uper-card-1" type="submit" @click="">{{ $t('confirm') }}</button>
        </div>
      </div>

    </Form>
  </Dialog>

</template>

<script>
import {ref, onMounted} from 'vue'
import getAccount from "../getAccount/getAccount.vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import {upgradeProductState} from "./upgradeProductState.ts"
import {useRoute} from "vue-router";
import Currency from "@/app/public/shared/currency/Currency.vue";
import {ToastService} from "../../../../../core/service/toast.service";
import {i18n} from "../../../../../main";
import * as Yup from "yup";
import {Field, Form} from "vee-validate";
import router from "../../../../../core/router/router";
import {getSelectedPageId} from "@/core/service/utils.service"

export default {
  name: "upgradeProduct",
  components: {getAccount, Swiper, SwiperSlide, Currency, Field, Form},
  setup() {
    const showDialog = ref(false)
    const route = useRoute();
    const state = ref(new upgradeProductState())
    const eventPageId = ref(route.params.eventPageId)
    const productId = ref(route.params.productId)
    const pageId = ref(null)

    function accountDetails(item) {
      state.value.selectedAccount = item

    }

    const pageNameSchema = Yup.object().shape({
      passWord: Yup.string()
          .test(
              "len",
              i18n.global.tc("inputValidation", {min: 4, max: 16}),
              (val) => val.length >= 4 && val.length <= 16
          )
          .default(""),

    });
    const confirm = () => {


      state.value.CreateEventProduct()

      state.value.showPassWordModal = false
    }

    function showPassWord() {
      state.value.passWord = ''

      if (state.value.selectedAccount == null) {
        ToastService.getInstance().error(i18n.global.tc('chooseAccount'))
        return
      }


      if (state.value.selectedAccount.currencyId != state.value.selectedPlan.currencyId) {
        ToastService.getInstance().error(i18n.global.tc('CurrenciesAreNotTheSame'))
        return;
      }

      if (state.value.selectedAccount.originalCash < state.value.selectedPlan.cost) {
        ToastService.getInstance().error(i18n.global.tc('notEnoughMoney'))
        return;
      }
      state.value.showPassWordModal = true
    }

    onMounted(() => {
      pageId.value = Math.abs(getSelectedPageId())
      state.value.pageId = pageId.value

      state.value.productId = productId.value
      state.value.GetEventPagePlanItems(eventPageId.value)
    })

    return {
      showDialog,
      accountDetails,
      state,
      confirm,
      pageNameSchema,
      productId,
      showPassWord,
      pageId
    }
  }
}
</script>

<style scoped>


.blue {
  color: #436ad0;
}

.item {
  margin-block: 20px;
  margin-inline: auto;
  width: 93%;
  box-shadow: 0 0px 3px 4px #dfdfdf96;
  border-radius: 7px;
  padding-block: 10px;
  padding-inline: 10px;

}

.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  cursor: pointer !important;
}

.text {
  word-wrap: break-word
}

.pass {
  width: 97% !important;
  margin-inline: auto;
  border-radius: 9px;
}

.enhance-button {
  background-color: #eae7e7;
  height: 43px;
  width: 140px;
  padding-block: 11px;
  border-radius: 15px;
  margin-inline: auto;
  border: none !important;
}

.img {
  width: 63%;
  height: 94%;
  border-radius: 9px
}


</style>
