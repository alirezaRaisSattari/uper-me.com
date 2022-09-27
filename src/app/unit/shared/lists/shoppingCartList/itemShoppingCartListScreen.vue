<template>
  <Dialog v-model:visible="dialogGift" :contentStyle="{ 'border-radius': '10px' }" :dismissableMask="true" :modal="true" :position="'bottom'" :showHeader="false" :style="{ width: '100%', 'max-width': '500px', 'border-radius': '10px' }">
      <div class="header-product-props-dialog">
        <svg height="46.5" viewBox="0 0 246.667 46.5" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs></defs>
          <path id="Path_2" class="bg" d="M345.333,201.167l-246.667-.5,7.507,5,7.827,6L118.333,218,122,224l6.667,10.5L134,239.833l7.333,4.333,9.667,3H296.667l7.5-1.583,4.333-1.417,8.5-6.333,1.667-2,4.667-6.5L328,218l4-5.167,4.667-4.333L341,204.167Z" data-name="Path 2" transform="translate(-98.667 -200.667)"/>
        </svg>
        <div class="title">{{ `${$t("porductGifts")}` }}</div>
      </div>
      <div class="body-dialog-gift">
        <span class="title smart-text-align">
          {{ $t("freeVoucher") }}
        </span>
        <div class="main-body-controller">
          <div class="right-side">
            <i class="fas fa-gift"></i>
          </div>
          <div class="left-side">
            <div class="default-price">
              <span class="label"> {{ $t("cost") }} : </span>
              <span class="value mx-1">
                {{ $filters.currency(data.giftCardCost) }}
              </span>
              <Currency :currency-id="data.currencyId" />
            </div>
            <div class="default-price">
              <span class="label"> {{ $t("expire_Days") }} : </span>
              <span class="value">{{`${ data.giftCardExpiredDays < 0 ? $t("expired") : `${data.giftCardExpiredDays} ${$t("day")}` } `}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="p-5"></div>
    </Dialog>

    <div class="item-controller" v-if="data"  :class="(productType == 2 || productType == 3 || productType == 4) ? 'has-header' : null">
      <div class="header" v-if="(data.endReserveTime)">
          <img :src="require('@/assets/img/svg/borderred.svg')" >
            <span>
              {{`${$filters.jalali(data.startReserveTime)} ${$t('from')} ${$filters.getHours(data.startReserveTime)} ${$t('to')} ${$filters.getHours(data.endReserveTime)}`}}
            </span>
        </div>
        <div class="base-controller">
            <div class="child">
                <img v-lazy="data.mainImageUrl+'_sm.webp'" >
                <div class="text-control">
                    <span>{{$filters.currency(data.price - (data.price * data.offPercent) / 100)}}</span>
                    <currency class="mr-2" :currencyId="currencyId"></currency>
                </div>
                <div class="add-to-cart">
                    <Button icon="pi pi-plus" class="p-button-rounded p-button-success p-button-outlined no-shadow"  @click="productCount < 99 ? changeCount(1) : null"/>
                    <span>{{productCount}}</span>
                    <Button :icon="productCount == 1 ? 'pi pi-trash':'pi pi-minus'" class="p-button-rounded p-button-plain p-button-outlined no-shadow"  @click="productCount > 0 ? changeCount(2) : null"/>
                </div>
            </div>
            <div class="child smart-text-align">
                <span class="large">{{data.name}}</span>
                <span>{{data.description}}</span>
                <hr>
                <div class="text-controller">
                    <span>{{$t('preparationTime')}}</span> : <span>{{`${data.prepareTime > 0  ? $t('hour' , {index:data.prepareTime / 60}) : $t('ready')}`}}</span>
                </div>
                <div class="text-controller justify-content-between">
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row" v-if="data.returnedPercent > 0">
                            <span>{{$t('Reference percentage')}}</span> : <span>{{data.returnedPercent}} %</span>
                        </div>
                        <div class="d-flex flex-row" v-if="data.offPercent > 0">
                            <span>{{$t('off_Percent')}}</span> : <span>{{data.offPercent}} % </span>
                        </div>
                    </div>
                    <div class="d-flex flex-column">
                         <Button v-if="data.giftCardCost > 0" class="gift-product-props-item no-shadow" icon="fas fa-gift font-22" @click="!dialogGift ? (dialogGift = true) : (dialogGift = false)"/>
                    </div>
                </div>
                <div class="total-controller">
                    <div class="controller">
                        <span>{{$t('total')}} :</span>
                    </div>
                    <div class="controller">
                        <span>{{$filters.currency((data.price - (data.price * data.offPercent) / 100) * productCount)}}</span>
                        <currency class="mr-2" :currencyId="currencyId"></currency>
                    </div>
                </div>
                <span></span>
            </div>
        </div>
        <div class="footer-controller" v-if="data.activityOffCodePercent > 0 && checkExpire(data.activityOffCodeExpiredAt) && currencyId !== 0">
          <div class="img-controller" >
              <img :src="require('@/assets/img/svg/fotterListShopping.svg')" :style="postDataActivity.price <= 0 ? {height: '65px'} : {height: 'auto'}">
              <template v-if="!postDataActivity.loading">
                <template v-if="postDataActivity.price <= 0">
                  <div class="child">
                    <span>{{$t('activityDiscount')}}</span>
                  </div>
                  <div class="child">
                    <Button :label="$t('computing')"  @click="CalculateActivityLevel()"/>
                  </div>
                </template>
                <template v-else >
                  <div class="controller">
                    <div class="child">
                      <span>{{$t('dependingOnYourActivityLevel')}} {{$filters.currency(postDataActivity.price)}}<currency class="mx-2" :currencyId="currencyId"></currency> {{$t('thereIsADiscount')}}</span>
                    </div>
                    <div class="child">
                      <span>{{$t('finalAmount')}}</span>
                      <span>{{$filters.currency(data.numbers * (data.price - (data.price * data.offPercent) / 100) - postDataActivity.price)}}</span>
                      <currency class="mx-2" :currencyId="currencyId"></currency>
                      <Button :label="postDataActivity.used ? $t('used') : $t('use')"  @click="initPush()"/>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <loading />
              </template>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import {ref} from 'vue';
import currency from "@/app/public/shared/currency/Currency.vue";
import { ProductRepository } from '@/core/repository/product.repository';
import { ShoppingCartUpdateItemsModel } from '@/data/city/product/product.model';
import { getSelectedPageId } from '@/core/service/utils.service';
import { LocalStorageService } from '@/core/service/localStorage.service';
import { ToastService } from '@/core/service/toast.service';
import { i18n } from '@/main';
import { DataFormatterService } from '@/core/service/dataFormater.service';
import { FactorRepository } from '@/core/repository/factor.repository';

export default {
    components:{
        currency,
    },
    props:{
        data:Object,
        currencyId:Number,
        productType:Number
    },
    emits:['changeItems' ,
           'pushActivityLevelCode' ,
           'deleteActivityLevelCode'
    ],setup (props,{emit}) {
      const dialogGift = ref(false);
      const selectedData = ref(JSON.parse(LocalStorageService.getInstance().getItem('selectedData')))
      const productCount = ref(props.data.numbers);
      const postDataActivity = ref({
        loading:false,
        price:0,
        total:0,
        used:false
      })

      function changeCount(key) {
        if (key == 1) {
          updateCard(true);
        } else {
          updateCard(false);
        }
		  }

      function updateCard(type:boolean) {
        if (props.data.volumePerFactor !== -1 && (props.data.volumePerFactor <= props.data.numbers && type)) return ToastService.getInstance().warning(i18n.global.tc('max' , {index:props.data.volumePerFactor}));
         if (type) productCount.value++;
          else productCount.value--;

        ProductRepository.getInstance().ShoppingCartUpdateItems({
          body: <ShoppingCartUpdateItemsModel>{
            sellerWorkPageId: Number(selectedData.value.sellerWorkPageId),
            buyerPageId: getSelectedPageId(),
            propId: Number(props.data.propId),
            numbers: productCount.value,
            currencyId: Number(selectedData.value.currencyId)
          },onReceive:(res)=> {
            let data = {}
            if (res && res.message) {
              const max = res.data.quantity !== -1 ? (res.data.quantity - res.data.selledNumbers) : props.data.volumePerFactor;
              ToastService.getInstance().warning(i18n.global.tc('max',{index:max}));
              if (!type) productCount.value++;
               else productCount.value--;
               return;
            }
              data = {
                  number : productCount.value,
                  productId: props.data.productId
              }
              emit('changeItems', data);
            
          } , onError:(err)=>{
            console.log(err);
          }
        })
        if (postDataActivity.value.price > 0) {
          CalculateActivityLevel();
        }
      }

      const checkExpire = (date) => {
        return DataFormatterService.getInstance().expireDate(date) !== null ? true : false;
      }


      const CalculateActivityLevel = () => {
          postDataActivity.value.loading = true;
          FactorRepository.getInstance().CalculateActivityLevelDiscount({
            body:{
              pageId: getSelectedPageId(),
              price: (props.data.price * productCount.value),
              activityOffPercent: props.data.activityOffCodePercent
            },onReceive:(res)=>{
              postDataActivity.value = {
                loading:false,
                price:res.discountValue,
                total:res.totalDiscountValue,
                used:false
              }
            },onError:(err)=>{
              console.log(err);
              postDataActivity.value.loading = false;
            }
        })
        const data = {
            code :  props.data.propId,
            fPrice: 0
          }
        emit('deleteActivityLevelCode' , data);
      }

      const initPush = () => {
        if (postDataActivity.value.total > postDataActivity.value.price && !postDataActivity.value.used) {
          postDataActivity.value.used = true;
          const data = {
            code :  props.data.propId,
            fPrice: props.data.numbers * (props.data.price - (props.data.price * props.data.offPercent) / 100) - postDataActivity.value.price
          }
          emit('pushActivityLevelCode', data );
        } else postDataActivity.value.used = false;
      }

        return {
            dialogGift,
            productCount,
            changeCount,
            checkExpire,
            postDataActivity,
            CalculateActivityLevel,
            initPush
        }
    }
}
</script>

<style lang="scss" scoped>
.item-controller {
    padding: 10px;
    position: relative;
    &.has-header {
      margin-top: 30px;
    }
    .header {
			display: flex;
			position: absolute;
			top: -20px;
			justify-content: center;
			width: 100%;
      left: 0;
      span {
				position: relative;
				z-index: 99;
				top: 4px;
				color: #fff;
				direction: rtl;
			}
        img {
          position: absolute;
          top: 0;
          width: 100%;
          height: 30px;
          }
      }
    .base-controller {
        display: flex;
        flex-direction: row;
        padding: 10px;
        box-shadow:  0 0 4px #b5b5b5;
        border-radius: 8px;
       
        .child {
             
            overflow: hidden;
            &:last-child {
                width: 65%;
                justify-content: space-between;
                 @media (min-width:476px) {
                    width: 75%;
                }
                padding: 10px;
                display: flex;
                flex-direction: column;

               span {
                    font-size: 14px;
                    &.large {
                        overflow: hidden;
                        width: 100%;
                        text-overflow: ellipsis;
                    }
                   
                }

                .text-controller {
                    display: flex;
                    flex-direction: row;
                    span {
                        &:first-child {
                            color: #686868;
                            margin-left: 5px;
                        }
                        &:last-child {
                            margin: 0 5px;

                        }
                    }
                }

                .total-controller {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .controller {
                        font-size: 14px;
                        &:first-child {
                            span {
                                color: #686868;
                            }
                        }
                        &:last-child {
                            display: flex;
                            direction: ltr;
                            flex-direction: row-reverse;
                            span {
                                color: #3CC42F;
                            }
                        }
                    }
                }
            }
            &:first-child {
              width: 35%;
              @media (min-width:476px) {
                  width: 25%;
                }
                padding: 8px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                border: 1px solid#b5b5b5;
                @media (max-width:400px) {
                  border-left: 2px solid #b5b5b5  ;
                }
                 img {
                    width: 110px;
                    height: 110px;
                    margin-bottom: 10px;
                }
                .text-control {
                    display: flex;
                    flex-direction: row;
                    color: #686868;
                    justify-content: flex-end;
                    width: 100%;
                }
                span {
                    font-size: 14px;
                }

                .add-to-cart {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    @media (min-width:476px) {
                      padding: 10px;
                    }
                    button {
                        width: 25px;
                        height: 25px;
                        font-size: 11px;
                    }
                    
                }
            }
        }
    }

    .footer-controller {
      display: flex;
      justify-content: center;
      .img-controller {
        width: 90%;
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        position: relative;
        img {
          width: 100%;
          position: absolute;
          top: 0;
        }
        .child {
          position: relative;
          z-index: 2;
          button {
            background: #ec0807;
            border: none;
            border-radius: 14px;
          }
        }

        .controller {
          display: flex;
          flex-direction: column;
          padding: 10px;
          font-size: 14px;
          @media (max-width:476px) {
            font-size: 10px;
          }
          .child {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            &:last-child {
              margin-top: 5px;
              justify-content: space-evenly;
              font-size: 13px;
              button {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
}

.gift-product-props-item {
  color: #FFBC2D !important;
  background: transparent !important;
  border: none;
}

.header-product-props-dialog {
  display: flex;
  width: 100%;
  position: absolute;
  left: 0%;
  top: 0;
  z-index: 10;

  .bg {
    fill: #fadadd;
  }

  .title {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
}

.body-dialog-gift {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 40px;
  padding: 10px 20px;

  span {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .main-body-controller {
    display: flex;
    flex-direction: row;
    padding: 10px;
    box-shadow: 0 0 5px #b5b5b5;
    border-radius: 10px;

    .right-side {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex: 15%;

      i {
        border: 2px solid #b5b5b5;
        border-radius: 10px;
        font-size: 40px;
        padding: 15px;
        color: green;
      }
    }

    .left-side {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      flex: 85%;

      .default-price {
        display: flex;
        flex-direction: row;
        flex: 50%;
        padding: 10px 8px 5px;

        .label {
          font-size: 13px;
          color: #686868;
        }

        .value {
          color: #212121;
          font-size: 14px;
          margin: 0 5px;
        }
      }
    }
  }
}


</style>
