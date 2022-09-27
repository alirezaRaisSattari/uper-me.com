<template>
    <div>
        <Header :title="$t('pay')" />
         <Dialog v-model:visible="state.showPasswordDialog" :breakpoints="{'500px': '100vw' ,'960px': '75vw', '5000px':'512px'}"
            :contentStyle="{background: 'rgb(255, 255, 255)','min-height':'300px',borderRadius: '8px','-ms-overflow-style':'none', 'scrollbar-width':'none'}"
            :dismissableMask="true" :position="'bottom'"
            :showHeader="false" :style="{ margin: '0', border: 'none' }" modal>
            <div class="dialog-controller">
                <div class="send-password-controller" v-if="state.dialogType">
                    <Password :placeholder="$t('password')" v-model="state.postData.password" :feedback="false" toggleMask></Password>
                    <Button :label="$t('apply')" @click="state.onSend()" :loading="state.loading"/>
                </div>
                <div v-else class="send-password-controller">
                    <span>{{$t('chargeAccount')}}</span>
                    <InputNumber :class="!state.charge.inValid && state.charge.value < 100 ? 'p-invalid':''"  v-model="state.charge.value" :placeholder="$t('price2')" />
                    <small v-if="!state.charge.inValid && state.charge.value < 100">{{$t('priceMinLen')}}</small>
                    <Button :label="$t('apply')" @click="state.chargeAccount()" :loading="state.loading"/>
                </div>
            </div>
         </Dialog>
        
         <Dialog v-model:visible="state.selectSendTime.dialog" :breakpoints="{'500px': '100vw' ,'960px': '75vw', '5000px':'512px'}"
            :contentStyle="{background: 'rgb(255, 255, 255)',borderRadius: '8px','-ms-overflow-style':'none', 'scrollbar-width':'none'}"
            :dismissableMask="true" :position="'bottom'"
            :showHeader="false" :style="{ margin: '0', border: 'none' }" modal>
            <div class="box-selectSendTime" v-if="!state.selectSendTime.loading">
                <div class="px-2">
                    <div class="box">
                        <template v-if="state.selectedData.sellerAddressType == 4" >
                            <p class="text-center m-2">{{$t('sellerDeliverYourCartAt',{date: $t('wednesday') +' '+ $filters.jalali(state.selectSendTime.selectedTime)})}}</p>
                        </template>
                        <template v-else >
                            <span>{{state.selectedSendType === 1 ? $t('normalSending') : `${$t('send')} ${$t('immediate')}`}}</span>
                            <template v-if="state.selectSendTime.status !== 0" >
                                <template v-if="state.selectSendTime.status == 1">
                                    <div class="days-controller">
                                        <div class="swiper-controller m-2">
                                            <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                                                    :slides-per-view="'auto'" :space-between="15"
                                                    class="slider">
                                                <swiper-slide v-for="(item , index) in state.selectSendTime.times" :key="item" class="pt-2 mt-1 day-controller" style="cursor: pointer">
                                                <div class="day-item" @click="state.selectSendTime.selectedTime = state.selectSendTime.times[index]" :class="state.selectSendTime.selectedTime == item ? 'active':null">
                                                    <span>{{item.dayLabel}}</span>
                                                    <span>{{Number(item.dayNumber)}}</span>
                                                </div>
                                                </swiper-slide>
                                            </swiper>
                                        </div>
                                        <div class="child ">
                                            <div class="side" v-for="item in state.selectSendTime.selectedTime.times" :key="item">
                                                <RadioButton id="tomorrow"  :value="item" v-model="state.selectSendTime.selectedHour" />
                                                <label for="tomorrow">{{state.convertToRageHour(item)}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="state.selectSendTime.status == 2">
                                    <div class="child">
                                        <div class="side">
                                            <RadioButton id="today" :value="true" v-model="state.selectSendTime.isToday" />
                                            <label for="today">{{$t('today')}}</label>
                                        </div>
                                        <div class="side">
                                            <RadioButton id="tomorrow"  :value="false" v-model="state.selectSendTime.isToday" />
                                            <label for="tomorrow">{{$t('tomorrow')}}</label>
                                        </div>
                                    </div>
                                    <div class="child">
                                        <Dropdown v-if="state.selectSendTime.isToday" v-model="state.selectSendTime.selectedTime" @change="state.changTimeLabel($event)" :options="state.selectSendTime.todayList"  :placeholder="$t('selectTime')" optionLabel="value" optionValue="value"/>
                                        <Dropdown v-else v-model="state.selectSendTime.selectedTime" :options="state.selectSendTime.tomorrowList" @change="state.changTimeLabel($event)"  :placeholder="$t('selectTime')" optionLabel="value" optionValue="value"/>
                                    </div>
                                </template>
                                <template v-else-if="state.selectSendTime.status == 3" >
                                    <div class="child">
                                        <span>{{$t('chooseTheTimeForToday')}}</span>
                                    </div>
                                    <div class="child">
                                        <Dropdown v-model="state.selectSendTime.selectedTime" :options="state.selectSendTime.times"  :placeholder="$t('selectTime')" optionLabel="value" optionValue="value"/>
                                    </div>
                                </template>
                            </template>
                        </template>
                    </div>
                </div>
               <Footer :isFixed="false" class="mt-2">
                    <div class="footer-controller">
                        <Button class="submit-btn" @click="state.checkSendTime()" :label="$t('confirm')"/>
                    </div>
                </Footer>
            </div>
            <div class="box-selectSendTime" v-else>
                <loading />
            </div>
         </Dialog>

         <ConfirmDialog :icon="state.selectedData.productType == 12 ? 'pi pi-info-circle' : 'fas fa-exclamation-triangle'" :text="state.selectedData.productType !== 12 ? $t('acceptAndWaitingAnswer'):$t('successMassage')" :textSize="'18px'" :visible="state.doneDialog"
            :acceptLabel="$t('confirm')"  :showReject="false" @accept="$function.goTo('/shopping-cart')" :status="state.selectedData.productType !== 12 ? 'warning':'success'" @times="$function.goTo('/shopping-cart')"/>

        <div class="main-payment-controller has-fixed-footer">
            <div class="item-controller">
                <div class="item" >
                    <div class="head" >
                        <div class="controller">
                            <div class="child">
                                <img v-lazy="`${state.selectedData.sellerProfileImageUrl}_sm.webp`" >
                                <img class="creditLevel" v-if="state.selectedData.sellerCreditLevel == 1 || state.selectedData.sellerCreditLevel == 2" v-lazy="state.selectedData.sellerCreditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : state.selectedData.sellerCreditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
                            </div>
                            <div class="child smart-text-align">
                                <span>{{state.selectedData.sellerName}}</span>
                                <span>{{state.selectedData.sellerUsername}}</span>
                            </div>
                        </div>
                        <div class="controller">
                            <div class="child star-controller">
                                <i class="pi pi-star"></i>
                                <span>{{state.selectedData.sellerAverage}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="middle">
                        <div class="child text-right">
                            <span>{{$t('shoppingType')}} : <span class="font-13">{{(state.getProductType(state.selectedData.productType))}}</span></span>
                        </div>
                        <div class="child text-left">
                            <span>{{$t('totalPrice')}} : <span>{{$filters.currency(state.purchaseAmount)}} <currency class="mx-1" :currencyId="state.selectedData.currencyId"></currency></span></span>
                        </div>
                    </div>
                    <div class="footer" >
                        <div class="child">
                        </div>
                        <div class="child">
                            <img v-for="image in state.imageList" :key="image" v-lazy="image+'_sm.webp'" >
                        </div>
                    </div>
                </div>
            </div>
            <div class="controller" v-if="state.sendPrice >= 0 && state.selectedData.productType !== 12">
                <div class="pay-box">
                    <span>{{$t('sendPrice')}} : </span>
                    <span>{{state.sendPrice > 0 ? $filters.currency(state.sendPrice , state.selectedData.currencyId == 0) : $t('free')}}</span>
                    <span v-if="state.purchaseAmount > 0 && state.selectedData.currencyId == 1 && state.sendPrice > 0" class="icon-font utooman-black"></span>
                    <currency v-if="state.purchaseAmount > 0 && state.selectedData.currencyId == 0 && state.sendPrice > 0"  class="mx-1" :currencyId="0"></currency>
                </div>
                <div class="pay-box" v-if="state.purchaseAmount > 0">
                    <Dropdown v-model="state.selectedSendType" @change="state.getSendPrice(state.selectedSendType)" :options="state.sendTypeList" optionLabel="name" optionValue="value" />
                </div>
            </div>
            <div class="controller">
                <div class="pay-box">
                    <span>{{$t('purchaseAmount')}} : </span>
                    <span>{{state.purchaseAmount > 0 ? $filters.currency(state.purchaseAmount) : $t('free')}}</span>
                    <span v-if="state.purchaseAmount > 0 && state.selectedData.currencyId == 1" class="icon-font utooman-black"></span>
                    <currency v-if="state.purchaseAmount > 0 && state.selectedData.currencyId == 0"  class="mx-1" :currencyId="0"></currency>
                </div>
                <div class="pay-box green" v-if="state.purchaseAmount > 0">
                     <span>{{$t('totalPrice')}} : </span>
                    <span>{{$filters.currency(state.selectedData.totalPrice , state.selectedData.currencyId == 0)}}</span>
                    <span v-if="state.selectedData.currencyId == 1" class="icon-font utooman-black"></span>
                    <currency  v-else  class="mx-1" :currencyId="0"></currency>
                </div>
            </div>
            <div class="swiper-controller" v-if="state.accountList.length > 0">
                <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }" :slides-per-view="'auto'" :space-between="15" class="slider">
                    <swiper-slide v-for="item in state.accountList" :key="item" class="pt-2 mt-1" style="cursor: pointer">
                        <div class="account-box">
                            <div class="child">
                                <RadioButton :value="item" v-model="state.selectedAccount" />
                                <span>{{item.title}}</span>
                            </div>
                            <div class="child">
                                <span>{{item.accountNumber}}</span>
                            </div>
                             <div class="child">
                                <span>{{$filters.currency(item.originalCash , state.selectedData.currencyId == 0)}}</span>
                                <span v-if="state.selectedData.currencyId == 1" class="icon-font utooman-black"></span>
                                <currency  v-else  class="mx-1" :currencyId="0"></currency>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <loading  v-else />
            <div class="controller" v-if="(!state.selectSendTime.label || (state.postData.buyerWillReceiveFactor !== null && (state.selectedData.sellerAddressType == 1 || state.selectedData.sellerAddressType == 2 || state.selectedData.sellerAddressType == 4) )) && state.selectedData.productType !== 12 ">
                 <Button icon="pi pi-angle-down"  iconPos="right" @click="state.getTimes()" :label="state.selectSendTime.label ? $filters.jalali(state.selectSendTime.label , true) : (state.checkStatus() != 1 || state.checkStatus() != 2) ? $t('selectSendTime') : state.checkStatus() == 1 ? $t('selectSendTime') : $filters.jalali(state.postData.buyerWillReceiveFactor)" />
            </div>
            <div class="controller">
                <Textarea v-model="state.postData.buyerDescription"  :autoResize="true" rows="1" cols="10" :placeholder="$t('description')"  />
            </div>
        </div>
        <Footer>
            <div class="footer-controller">
                <Button @click="state.initChargeAccount()" v-if="state.selectedData.currencyId == 1" :label="$t('chargeAccount')"/>
                <Button :label="$t('pay')" @click="state.checkBeforeSend()"/>
            </div>
        </Footer>
    </div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import Footer from '@/app/unit/shared/footerApp/fixedFooterScreen.vue'
import { onMounted, ref } from 'vue';
import { shoppingCardPaymentPageState } from "./shoppingCardPaymentPageState"
import currency from "@/app/public/shared/currency/Currency.vue";
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import Password from 'primevue/password';
import ConfirmDialog from '@/app/public/shared/confirmDialog/ConfirmDialog.vue';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
export default {
    components:{
        Header,
        Footer,
        RadioButton,
        currency,
        Textarea,
        Password,
        ConfirmDialog,
        InputNumber,
        Dropdown
    },
    setup () {
        const state = ref(new shoppingCardPaymentPageState())
        onMounted(() => {
            state.value.initData();
        })

        return {state}
    }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  list-style: none;
  padding-right: 0;
  /*width: 506px !important;*/
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}

.main-payment-controller {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .controller {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding: 0 10px;
        margin-bottom: 10px;

        button {
            width: 100%;
            font-size: 14px;
            background: #fff;
            border-radius: 8px;
            color: #212121;
            border-color: #b5b5b5 !important;

        }
        textarea {
            width: 100%;
            padding: 10px;
            font-size: 14px;
            background: #f8f7f3;
            border-radius: 10px;
            min-height: 40px !important;
            text-align: right;
            padding: 10px !important;
        }

        .pay-box {
            width: 50%;
            span {
                &:last-child {
                    margin: 0 5px;
                    &::before {
                        font-size: 15px;
                    }
                }
            }
            &.green {
                background: #068a00;
                border-radius: 10px;
                padding: 10px;
                color: #fff;
                text-align: center;
            }
        }
    }

    .item-controller {
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
            justify-content: space-between;
                    border-bottom: 1px solid #b5b5b5;
                    padding-bottom: 8px;
    
            .controller {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              .child {
                display: flex;
                flex-direction: column;
                padding: 0 5px;
                &.star-controller {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    i {
                      color:#ff9900;
                      margin: 0 10px;
                    }
                  }
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
                  }
                }
                span {
                  color:#303030;
                  font-size: 14px;
                }
              }
            }
                }
                .middle {
                    display: flex;
                    flex-direction: row;
            margin-top: .5rem;
                    .child {
                        font-size: 14px;
                        display: flex;
                        flex-direction: column;
                        width: 50%;
                        
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
                        img {
                            width: 30px;
                            height: 30px;
                            border-radius: 5px;
                            margin: 5px;
                            cursor: pointer;
                            object-fit: scale-down; /* or object-fit: contain; */
                        }
                        span {
                            color:#686868;
                            font-size: 14px;
                            &:nth-child(2){
                                color:#303030;
                            }
                        }
                    }
                }
    
            }
    }

    .swiper-controller {
        padding: 10px;
        .account-box {
            width: 150px;
            display: flex;
            flex-direction: column;
            background: #fff;
            box-shadow: 0 0 3px #b5b5b5;
            border-radius: 8px;
            .child {
                padding: 5px;
                display: flex;
                flex-direction: row;
                font-size: 14px;
                align-items: center;
                span {
                    margin: 0 5px;
                }
                &:first-child {
                    background: #e0f2ff;
                    display: flex;
                    flex-direction: row;
                    padding: 10px ;
                }
                &:nth-child(2) {
                    padding-top: 8px;
                    justify-content: center;
                    span {
                        padding-bottom: 8px;
                        display: flex;
                        width: 98%;
                        justify-content: center;
                        border-bottom: 1px solid #b5b5b5;
                    }
                }
                &:nth-child(3) {
                   justify-content: flex-end;
                }
            }
        }
    }
}
.footer-controller {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    button {
        font-size: 14px;
        padding: 8px 15px;
        border-radius: 30px;
        color:#fff;
        border: none;
        &:first-child {
            background: #ef5e68;
        }
        &:last-child {
            background: #43a3ab;
        }
    }
}
::v-deep(.utooman-black::before) {
    font-size: 14px;
}

.dialog-controller {
    display: flex;
    justify-content: center;
    .send-password-controller {
        display: flex;
        flex-direction: column;
        padding: 10px;
        justify-content: center;
        height: 300px;
        width: 80%;
        align-items: center;
        small {
            text-align: right;
            color: #ef5e68;
            width: 100%;
        }
    
        span {
            margin-bottom: 10px;
        }
    
        button {
            margin-top: 10px;
            background: #c5e4e9 !important;
            width: 100%;
            color: #212121;
            border: none;
    
        }
    }
}

::v-deep(.p-password) {
    width: 100%;
}

::v-deep(.p-inputtext) {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    padding: 10px !important;
    padding-left: 30px !important;
}

::v-deep(.p-input-icon-right > i:last-of-type) {
    left: 0.75rem;
    right: unset;
}
::v-deep(.p-inputnumber) {
    width: 100%;
    .p-inputtext {
        padding: 10px;
    }
}


::v-deep(.p-dropdown-item) {
		font-size: 14px;
        height: 40px;
}
::v-deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight) {
		background: #7D7D7D7A !important;
}
::v-deep(.p-dropdown) {
	box-shadow: none !important;
	border-radius: 5px;
    .p-inputtext {
        padding: 0 !important;
    }
    height: 40px;
	border: 1px solid #7d7d7d !important;
	.p-dropdown-label , .p-dropdown-item {
		font-size: 12px;
	}

}

.box-selectSendTime {
    width: 100%;
    padding: 10px 0 0;
    display: flex;
    flex-direction: column;
    .box {
        border: 1px solid #686868;
        border-radius: 8px;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        width: 100%;
        .child {
            display: flex;
            align-items: center;
            width: 50%;
            padding: 10px;
            flex-direction: row;
            justify-content: space-evenly;
            .side {
                display: flex;
                align-items: center;
                label {
                    margin: 0 5px;
                }
            }
        }
        span {
            display: block;
            text-align: center;
            width: 100%;
            font-size: 14px;
            
        }
    }
}
.days-controller {
    width: 100%;
    padding: 20px 0;
    .child {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        width: 100% !important;
        font-size: 14px;
        .side {
            max-width: 50%;
        }
    }
    @media (max-width:400px) {
        padding: 20px 55px;
    }
    .day-item {
        display: flex;
        flex-direction: column;
        padding: 10px;
        justify-content: center;
        align-items: center;
        background: #eee;
        border-radius: 6px;
        border: 1px solid #686868;
        min-width: 65px;
        transition: .6s;
        &.active {
            background: #fadadd;
        }
    }


}


.day-controller {
   &:last-child {
            display: none;
    }
}

.submit-btn {
    background: #ef5e68 !important;
    padding: 8 20px !important;
    min-width: 120px !important;
}
</style>