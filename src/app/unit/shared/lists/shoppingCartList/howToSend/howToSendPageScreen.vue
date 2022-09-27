<template>
    <div>
        <Header :title="$t('sendMethod')" />
         <Dialog :showHeader="false" v-model:visible="showDialog" :style="{width: '350px'}" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span>{{$t('IfYouAreAtThePlaceAndYouWillReceiveYourGoodsInTheNextFewHoursUseTheOptionIAmInTheStoreOtherwiseUseTheOptionOfSendingByTheSeller')}}</span>
                <Button :label="$t('confirm')"  @click="showDialog = false" class="p-button-text" autofocus />
            </div>
         </Dialog>

        <div class="list-controller" v-if="!loading">
            <template v-if="!noRolls">
                <div class="controller" v-for="(item , index) of listData" :key="item.key" :class="!item.active ? 'd-active':null ">
                    <div class="item">
                        <div class="side">
                            <div class="child">
                                <RadioButton :id="item.key" name="item" :value="item" v-model="selectedItem" @click="index == 0 ? showDialog = true:null" :disabled="!item.active" />
                                <label :for="item.key">{{item.name}}</label>
                            </div>
                            <div class="child">
                                <i class="pi pi-info-circle"></i>
                            </div>
                        </div>
                        <div class="side">
                            <span class="smart-text-align">{{item.subTitle}}
                                <Currency v-if="index == 3"  :currencyId="currencyId"></Currency>
                            </span>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else >
                <span class="smart-text-align p-4 my-5">
                    {{$t('sellerDoesNotSetSendSetting')}}
                </span>
            </template>
        </div>
        <loading v-else />
          <div class="footer-controller" v-if="!noRolls">
             <Button @click="checkValidation()" :label="$t('continueTheProcess')" class="p-button-rounded" />
        </div>
    </div>
</template>

<script lang="ts">
import {ref , onMounted} from 'vue'
import { FactorRepository } from '@/core/repository/factor.repository'
import { useRoute } from 'vue-router'
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue'
import RadioButton from 'primevue/radiobutton';
import { i18n } from '@/main'
import { SendMethodModel } from '@/data/city/workpage/sellCart.model'
import { DataFormatterService } from '@/core/service/dataFormater.service'
import Loading from '@/app/public/shared/loading/Loading.vue';
import Currency from "@/app/public/shared/currency/Currency.vue";
import { ToastService } from '@/core/service/toast.service'
import router from '@/core/router/router'
import { LocalStorageService } from '@/core/service/localStorage.service'

export default {
    components:{
        Header,
        RadioButton,
        Loading,
        Currency
    },
    setup () {
        const selectedItem = ref(null);
        const currencyId = ref(null);
        const loading = ref(false);
        const showDialog = ref(false);
        const noRolls = ref(false)
        const selectedData = ref(JSON.parse(LocalStorageService.getInstance().getItem('selectedData')) ?? router.back())
        const listData = ref([
            {
                name: i18n.global.tc('iAmInStore'),
                subTitle: i18n.global.tc('scanStationOrChooseStation'),
                active: true,
                key: 1
            }, {
                name: i18n.global.tc('buyerGetShoppingCartWithDelay'),
                subTitle: i18n.global.tc('storeDoesNotGaveShoppingCartInPlace'),
                active: true,
                key: 2
            }, {
                name: i18n.global.tc('sendShoppingCartByUper'),
                subTitle: i18n.global.tc('calculateSendPriceBasedOnTotalShoppingPriceAndYourDistanceAndSellerSettings'),
                active: true,
                key: 3
            }, {
                name: i18n.global.tc('sendShoppingCartBySeller'),
                subTitle: i18n.global.tc('calculateSendPriceBasedOnTotalShoppingPriceAndYourDistanceAndSellerSettings'),
                active: true,
                key: 4
            }
        ]);

        onMounted(() => {

            loading.value = true;
            if (!selectedData.value) return router.back();
            FactorRepository.getInstance().FactorGetAllSellAddress({
                urlContent:`${selectedData.value.sellerWorkPageId}/${selectedData.value.currencyId}`,
                onReceive:(res)=>{
                    const data:SendMethodModel = res[0];
                    currencyId.value = data.currencyIdSellerSend ? data.currencyIdSellerSend : 0;
                    loading.value = false;
                    if (!data.hasGetByBuyyer && !data.hasGetByBuyyerWithDelay && !data.hasUperSending && !data.hasSendByBuyyer) return noRolls.value = true;

                    if (data.hasGetByBuyyer) {
                        listData.value[0].subTitle = i18n.global.tc('scanStationOrChooseStation');
                        listData.value[0].active = true;
                    } else {
                        listData.value[0].subTitle = i18n.global.tc('storeDoesNotGaveShoppingCartInPlace')
                        listData.value[0].active = false;
                    }

                    if (data.hasGetByBuyyerWithDelay) {
                        listData.value[1].subTitle = i18n.global.tc('sellerAndUperDoesNotSendShoppingCart');
                        listData.value[1].active = true;
                    } else {
                        listData.value[1].subTitle = i18n.global.tc('sellerDoesNotKeepYourShoppingCart');
                        listData.value[1].active = false;
                    }

                    if (data.hasUperSending) {
                        listData.value[2].subTitle = i18n.global.tc('calculateSendPriceBasedOnTotalShoppingPriceAndYourDistanceAndSellerSettings');
                        listData.value[2].active = true;
                    } else {
                        listData.value[2].subTitle = i18n.global.tc('basedOnSellerSettingsShoppingCartDoesNotSendByUper');
                        listData.value[2].active = false;
                    }
                    
                    if (data.hasSendByBuyyer) {
                        listData.value[3].active = true;
                        listData.value[3].subTitle = data.hasSendByBuyyerFreeAll ? i18n.global.tc('sendingIsFree') : i18n.global.tc('pricePerHundredMeters',{price:DataFormatterService.getInstance().formatCurrency(data.pricePerHunderedMeter)});
                    } else {
                        listData.value[3].active = false;
                        listData.value[3].subTitle = i18n.global.tc('sellerDoesNotHaveSending');
                    }

                },onError:(err)=> {
                    console.log(err);
                    loading.value = false;
                }
                
            })
        })
       
       const checkValidation = () => {
            if (selectedItem.value == null) return ToastService.getInstance().error(i18n.global.tc('sendMethodDoesNotSelected'));
            let item = selectedData.value;
            
            switch (selectedItem.value.key) {
                case 1:
                    item.sellerAddressType = 3;
                    LocalStorageService.getInstance().setItem("selectedData", JSON.stringify(item));
                    router.push(`/locations`);
                    break;
                case 2:
                    item.sellerAddressType = 1;
                    LocalStorageService.getInstance().setItem("selectedData", JSON.stringify(item))
                    break;
                case 3:
                    item.sellerAddressType = 2;
                    LocalStorageService.getInstance().setItem("selectedData", JSON.stringify(item));
                    router.push(`/shoppingCartChoseAddress`);
                    break;
                case 4:
                    item.sellerAddressType = 4;
                    LocalStorageService.getInstance().setItem("selectedData", JSON.stringify(item))
                    router.push(`/shoppingCartChoseAddress`);
                    break;
            }
        }
        return {
            listData,
            selectedItem,
            currencyId,
            checkValidation,
            loading,
            showDialog,
            noRolls
        }
    }
}
</script>

<style lang="scss" scoped>
.list-controller {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .controller {
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 5px #b5b5b5;
        border-radius: 8px;
        margin-bottom: 10px;
        &.d-active {
            opacity: .5;
        }
        .side {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            &:first-child {
                border-bottom: 1px solid #b5b5b5;
            }
            .child {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                padding: 8px;
                i {
                    color: #EBCA0F;
                    font-size: 20px;
                }
                label {
                    margin: 0 10px 0 !important;
                }

            }
            &:last-child {
                padding: 8px;
                font-size: 14px;
            }
        }
    }
}
.footer-controller {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 0 -1px 5px #b5b5b5;
  background: #fadadd;
  padding: 24px 10px;
  position: fixed;
  bottom: 0;
  z-index: 99;
  align-items: center;
  width: 512px;
  font-size: 14px;
  border-radius: 40px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  @media (max-width: 512px) {
    width: 100%;
  }

  button {
    background: #f15968 !important;
    border-radius: 25px;
    box-shadow: none !important;
    border: none;
    padding: 8px 50px !important;
  }
}

.confirmation-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    i { 
        color: #eece1c;
        margin-bottom: 10px;
    }

    span {
        text-align: center;
        font-size: 14px;
        margin-bottom: 10px;
    }

    button {
        background: #c5e4e7 !important;
        font-size: 14px;
        width: 80%;
        box-shadow: none !important;
    }
}
</style>
