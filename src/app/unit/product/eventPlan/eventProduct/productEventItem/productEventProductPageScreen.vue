<template>
  <div>
    <div class="main-controller">
      <div v-if="state.selectedEvent[0]" class="head-controller smart-text-align">
        <div :style="{'background-image':`url(${state.selectedEvent[0].profileImageUrl})`}" class="img"></div>
        <span>{{ state.selectedEvent[0].name }}</span>
      </div>
      <div v-if="state.eventLists.length > 0" class="main-list-controller">
        <span class="header-text">{{ $t('planItems') }}</span>
        <div class="list-controller">

          <div v-for="item in state.eventLists" :key="item" v-ripple class="item p-ripple" @click="selectPlan(item)">
            <div class="child">
              <span>{{ $t('cost') }} :</span>
              <span>{{ currency(item.cost) }}
                            <currency :currencyId="item.currencyId" class="mb-1"></currency>
                            </span>
            </div>
            <div class="child">
              <span>{{ $t('stationNumber') }} :</span>
              <span>{{ item.place }}
                            </span>
            </div>
          </div>
          <template v-if="planDetails.plan">
            <GetAccount :plan="planDetails.plan" :planDialog="planDetails.planDialog" :plansId="planDetails.plansId"
                        @done="(event)=> planDetails.planDialog = false"/>
          </template>
        </div>
      </div>
      <template v-else>
        <Lottie :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'"
                :title="$t('emptyPlans')"/>
      </template>
    </div>

  </div>
</template>

<script lang="ts">
import {productEventPageState} from './productEventProductPageState';
import {onMounted, ref} from 'vue';
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";
import currency from "@/app/public/shared/currency/Currency.vue";
import {DataFormatterService} from '@/core/service/dataFormater.service';
import GetAccount from "./getAccount/getAccountEventProductPageScreen.vue";
import Ripple from 'primevue/ripple';
import router from '@/core/router/router';

export default {
  components: {
    Lottie,
    currency,
    GetAccount
  },
  directives: {
    'ripple': Ripple
  },
  setup() {
    const state = ref(new productEventPageState());
    const planDetails = ref({
      plansId: '',
      planDialog: false,
      plan: null
    });

    onMounted(() => {
      if (state.value.route.query.pId) {
        state.value.getSelectedPlan();
      } else {
        router.back();
      }
    });

    const currency = (value) => {
      return DataFormatterService.getInstance().formatCurrency(value);
    }

    function selectPlan(plan) {
      planDetails.value.plan = plan;
      planDetails.value.plansId = plan.planId;
      planDetails.value.planDialog = !planDetails.value.planDialog;
    }

    return {
      state,
      currency,
      planDetails,
      selectPlan
    }
  }
}
</script>

<style lang="scss" scoped>

.main-controller {
  display: flex;
  flex-direction: column;
  padding: 20px 10px 10px;
  color: #212121;

  .head-controller {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    box-shadow: 0 0 5px #b5b5b5;
    border-radius: 10px;
    background-color: #fff;

    .img {
      width: 60px;
      height: 60px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 10px;
    }

    span {
      padding: 0 10px;
      font-size: 14px;
      font-weight: bold;
    }
  }

  .main-list-controller {
    padding: 10px;
    display: flex;
    flex-direction: column;

    .header-text {
      padding: 20px 0;
      font-size: 15px;
      font-weight: bold;
      text-align: center;
    }

    .list-controller {
      display: flex;
      flex-direction: column;

      .item {
        box-shadow: 0 0 5px #b5b5b5;
        background-color: #fff;
        border-radius: 10px;
        padding: 10px;
        color: #212121;
        cursor: pointer;
        margin: 10px 0;

        .child {
          display: flex;
          flex-direction: row;
          font-size: 14px;

          span {
            &:last-child {
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>
