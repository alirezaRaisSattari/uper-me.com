<template>
  <div class="body-controller pb-5 mb-2">
    <div class="item" v-for="item in state.list" :key="item" >
      <div class="head" @click="$function.goTo(`/factorDetails/${item.factorId}`)">
        <div class="controller">
          <div class="child w-auto">
            <img v-lazy="`${item.profileImageUrl}_sm.webp`" >
            <img class="creditLevel" v-if="item.creditLevel == 1 || item.creditLevel == 2" v-lazy="item.creditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : item.creditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
          </div>
          <div class="child smart-text-align">
            <span>{{item.name}}</span>
            <span>{{item.username}}</span>
          </div>
        </div>
        <div class="controller">
          <div class="child">
            <span>{{$filters.jalali(item.modifiedAt)}}</span>
            <span>{{`UF_${item.factorId}`}}</span>
            <span>{{`${$t('totalPrice')} : ${$filters.currency(item.finalPrice , item.currencyId == 0)}`}} <currency :currencyId="item.currencyId" /></span>
          </div>
        </div>
      </div>
      <div class="footer" @click="$function.goTo(`/factorDetails/${item.factorId}`)">
        <div class="child">
          <div class="img-controller" v-for="image in item.imageUrls" :key="image" :style="{'background-image':`url(${image}_sm.webp)`}"></div>
        </div>
        <div class="child flex-column ">
          <span class="smart-text-align"> {{`${$t('cartType')} : ${state.checkProduct(item.productType )}`}}</span>
          <span class="smart-text-align"> {{`${$t('sendType')} : ${state.sellerTransferCheck(item.sellerAddressType)}`}}</span>
        </div>
      </div>
    </div>
    <loading v-if="state.loading"/>
  </div>
</template>

<script lang="ts">
import { ref , onMounted , onBeforeUnmount } from "vue"
import {newsSellCartPageState} from './newSellCartPageState'
import {ScrollController} from '@/core/service/scroll.service';
import currency from "@/app/public/shared/currency/Currency.vue";
export default {
  components : {
    currency
  },
  setup () {
    const state = ref(new newsSellCartPageState());
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      if (!state.value.loading && !state.value.endList) {
        state.value.getData();
      }
    }

    onMounted(() => {
      scrollCtrl.startListen();
      state.value.getData();
    })

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    return {state}
  }
}
</script>

<style lang="scss" scoped>
.body-controller {
  display: flex;
  flex-direction: column;
  padding: 5px 10px 10px;
  .item {
    display: flex;
    flex-direction: column;
    padding: 8px;
    background: #fff;
    margin-bottom: 8px;
    box-shadow: 0 0 5px #b5b5b5;
    border-radius: 8px;
    cursor: pointer;
    .head {
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #b5b5b5;
      padding-bottom: 8px;
      .controller {
        width: 50%;
        display: flex;
        &:last-child {
          justify-content: flex-end;
          text-align: left;
        }
        .child {
          display: flex;
          flex-direction: column;
          padding: 0 5px;
          width: 100%;
          img {
            width: 45PX;
            height: 45PX;
            border-radius: 50%;
            border: 1px solid #686868;
            &.creditLevel {
              position: absolute;
              width: 20px;
              height: 20px;
              margin-top: 30px;
              margin-right: 25px;
              background-color: #fff;
            }
          }
          .controller {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .child {
              display: flex;
              flex-direction: column;
              width: 100%;
            }
          }
          span {
            color:#303030;
            font-size: 14px;
          }
        }
      }
    }
    .footer {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      padding: 8px 0 0;
      .child {
        display: flex;
        flex-direction: row;
        overflow: hidden;

        .img-controller {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          width: 30px;
          height: 30px;
          border-radius: 5px;
          margin: 5px;
          cursor: pointer;
        }

        span {
          font-size: 14px;
          color:#303030;
        }
      }
    }

  }
}
</style>
