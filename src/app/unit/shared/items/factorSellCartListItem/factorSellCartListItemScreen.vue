<template>
  <div>
    <div class="list-controller" v-if="list">
      <div class="item" v-for="item in list" :key="item">
        <div class="head" @click="(item.factorStaus !== 6 && item.factorStaus !== 5 && item.factorStaus !== 12) ? $function.goTo(`/factorDetailsDeliveredFactors/${item.factorId}`) : null">
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
          <div class="controller ">
            <div class="child align-items-end">
              <span>{{$filters.jalali(item.modifiedAt , true)}}</span>
              <span>{{`UF_${item.factorId}`}}</span>
            </div>
          </div>
          <div class="controller">
            <div class="child align-items-end">
              <span>{{`${$t('totalPrice')} : ${$filters.currency(item.finalPrice , item.currencyId == 0)}`}} <currency :currencyId="item.currencyId" /></span>
            </div>
          </div>
        </div>
        <div class="footer" @click="(item.factorStaus !== 6 && item.factorStaus !== 5 && item.factorStaus !== 12) ? $function.goTo(`/factorDetailsDeliveredFactors/${item.factorId}`) :`/customMadeProduct/${item.buyerPageId}`">
          <div class="child">
            <div class="img-controller" v-for="image in item.imageUrls" :key="image" :style="{'background-image':`url(${image}_sm.webp)`}"></div>
          </div>
          <div class="child flex-column ">
            <span class="smart-text-align"> {{`${$t('cartType')} : ${checkProduct(item.productType )}`}}</span>
            <span class="smart-text-align"> {{`${$t('sendType')} : ${sellerTransferCheck(item.sellerAddressType)}`}}</span>
          </div>
        </div>
      </div>
    </div>
    <loading v-if="loading"/>
    <template v-if="!loading && list.length == 0">
      <div class="emty-controller">
        <span>{{$t('noNewFactors')}}</span>
        <img class="img-emty" :src="require('@/assets/img/svg/emptyFactor.svg')" >
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { i18n } from '@/main';
import currency from "@/app/public/shared/currency/Currency.vue";

export default {
  components:{
    currency
  },
  props:{
    list:Array,
    loading:Boolean
  },
  setup () {

    const checkProduct = (key) => {
      switch (key) {
        case 1:
          return i18n.global.tc('sell');
        case 2:
          return i18n.global.tc('reserve');
        case 3:
          return i18n.global.tc('fare');
        case 4:
          return i18n.global.tc('service');
        case 12:
          return i18n.global.tc('virtualProduct');
        default:
          return i18n.global.tc('product');
      }
    }

    const sellerTransferCheck = (key) => {
      switch (key) {
        case 1:
          return i18n.global.tc('hasNotDelivery');
        case 2:
          return i18n.global.tc('uperSend');
        case 3:
          return i18n.global.tc('inPlaceOfStore');
        case 4:
          return i18n.global.tc('sellerSend');
      }
    }

    return {sellerTransferCheck , checkProduct}
  }
}
</script>

<style lang="scss" scoped>
.list-controller {
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
      flex-wrap: wrap;
      border-bottom: 1px solid #b5b5b5;
      padding-bottom: 8px;
      .controller {
        width: 50%;
        display: flex;
        &:last-child {
          width: 100%;
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

.emty-controller {
  .img-emty {
    width: 120px;
    height: 120px;
  }
  span {
    font-size: 14px;
    margin-bottom: 10px;
  }
  display: flex;
  justify-content: center;
  flex-direction:column;
  align-items: center;
  height: 200px;
}
</style>
