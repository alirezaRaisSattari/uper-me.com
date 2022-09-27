<template>
    <div>
        <Header :title="$t('chooseAddress')" />
        <Dialog v-model:visible="state.gift.dialog" :breakpoints="{ '440px': '100vw' }" :contentStyle="{'border-radius':'10px','height':'300px' , 'overflow':'hidden' , 'width':'100%','max-width':'512px'}" :dismissableMask="true" :modal="true" :position="'bottom'" :showHeader="false" :style="{width: '100%', 'max-width':'512px','border-radius':'10px'}">
            <template v-if="!state.gift.type">
                <loading v-if="state.gift.loading" />
                <template v-else>
                    <Header :title="$t('freeVouchers')" />
                    <template v-if="state.gift.list.length > 0">
                        <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }" :slides-per-view="'auto'" :space-between="15" class="slider smart-text-align px-2">
                            <swiper-slide v-for="item in state.gift.list" :key="item" class="pt-2 mt-1" style="cursor: pointer">
                               <div class="gift-list-item">
                                    <div class="item-controller" :class="state.gift.selectedGif == item ? 'active':''" @click="state.gift.selectedGif = item">
                                        <div class="controller">
                                            <div class="child-controller">
                                                <div class="child">
                                                    <img v-lazy="state.selectedData.sellerProfileImageUrl + '_sm.webp'" alt="">
                                                </div>
                                                <div class="child">
                                                    <span>{{state.selectedData.sellerName}}</span>
                                                    <span>{{state.selectedData.sellerUsername}}</span>
                                                </div>
                                            </div>
                                            <div class="child-controller">
                                                <Button :label="$t('usable')" />
                                                <div class="child">
                                                    <span class="px-2">{{'UFG_'+item.giftId}}</span>
                                                    <div class="d-flex flex-row">
                                                        <span>{{$t('price2')}} : </span>
                                                        <span>{{$filters.currency(item.cost , item.currencyId == 0)}}</span>
                                                        <currency class="mx-2" :currencyId="item.currencyId"></currency>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="controller">
                                            <div class="child">
                                                <span>{{$t('expire_Days')}} : </span>
                                                <span>{{$filters.jalali(item.expiredAt)}}</span>
                                            </div>
                                            <div class="child">
                                                <Button :label="`UF_${item.factorId} : ${$t('factorNumber')}`" class="p-button-link no-shadow" />
                                            </div>
                                        </div>
                                    </div>
                               </div>
                            </swiper-slide>
                        </swiper>
                        <Footer >
                            <Button @click="state.onSelectGiftCard()" class="btn-footer" :label="$t('submit')"/>
                        </Footer>
                    </template>
                    <Lottie v-else :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'" :title="$t('thereIsNoGiftCardToBuyFromThisPage')"/>
                </template>
            </template>
            <template v-else >
                <div class="box-code">
                    <div class="input-controller smart-text-align">
                        <label for="code">{{$t('offCode')}}</label>
                        <InputText id="code" type="text" v-model="state.gift.code" :placeholder="$t('offCode')" />
                    </div>
                    <Button  :label="state.gift.percentFromCode > 0 ? $t('cancel') : $t('submit')" @click="state.gift.percentFromCode > 0 ? state.cancelGiftCode() : state.checkIsValid()" :loading="state.gift.giftCodeLoading" />
                </div>
            </template>
        </Dialog>

        <Dialog v-model:visible="state.selectedMap.dialog" :breakpoints="{ '1400px': '484px', '950': '484px', '510px': '320px', }" :dismissableMask="true" :modal="true">
            <MapPointer :latLan="[[state.selectedMap.lat , state.selectedMap.lan]]" :locationName="state.selectedMap.name" />
        </Dialog>

        <div class="main-controller has-fixed-footer">
            <div class="head">
                <div class="item-controller">
                    <div class="item">
                        <span>{{$t('uperScore')}}</span>
                        <span >{{$filters.currency(state.selectedData.uperScore , true)}}</span>
                        <currency class="mx-2" :currencyId="0"></currency>
                    </div>
                    <div class="item">
                        <span>{{$t('productCount')}}</span>
                        <span>{{$filters.currency(state.itemCont)}}</span>
                    </div>
                </div>
                <div class="item-controller">
                    <div class="item">
                        <span>{{$t('totalPrice')}}</span>
                        <span>{{$filters.currency(state.selectedData.totalPrice , state.selectedData.currencyId == 0)}}</span>
                        <currency class="mx-2" :currencyId="state.selectedData.currencyId"></currency>
                    </div>
                    <div class="item">
                       <Button v-if="state.selectedData.productType !== 12" @click="$function.goTo('/addAddressGlobal')" :label="$t('addAddress')"/>
                    </div>
                </div>
            </div>
            <div class="code-box-controller" v-if="state.gift.percentFromCode > 0">
                <div class="box">
                    <div class="controller">
                        <span>{{$t('off_Percent')}} :</span>
                        <span>{{state.gift.percentFromCode}} %</span>
                    </div>
                    <div class="controller">
                        <span>{{$t('finalPrice')}} :</span>
                        <span>{{$filters.currency(state.gift.finalPrice , state.selectedData.currencyId == 0)}}</span>
                        <currency :currencyId="state.selectedData.currencyId"></currency>
                    </div>
                    <div class="controller">
                        <span>{{$t('offCode')}} :</span>
                        <span>{{state.gift.code}}</span>
                    </div>
                </div>
            </div>
            <div class="list-controller" v-if="!state.loading && state.list && state.selectedData.productType !== 12" >
                <div class="item-controller" v-for="item in state.list" :key="item" >
                    <div class="child">
                        <div class="controller">
                             <div class="img">
                                 <img @click="state.showOnMap(item)" src="@/assets/img/svg/pageAddressMarker.svg" alt="" srcset="">
                                 <span>{{$t('showOnMap')}}</span>
                             </div>
                        </div>
                        <div class="controller smart-align-items" @click="state.selectedAddress = item">
                            <span>{{item.title}}</span>
                            <span v-if="item.area">{{`${item.area.countryName} ، ${item.area.provinceName}  ، ${item.area.cityName} ، ${item.area.areaName}`}}</span>
                        </div>
                        <div class="controller" @click="state.selectedAddress = item">
                            <RadioButton :id="item" name="category" :value="item" v-model="state.selectedAddress"  />
                        </div>
                    </div>
                    <div class="child" @click="state.selectedAddress = item">
                        <div class="controller">
                            <span class="smart-text-align">{{$t('address')}} : </span>
                            <span class="smart-text-align">{{item.address}}</span>
                        </div>
                        <div class="controller">
                            <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }" :slides-per-view="'auto'" :space-between="15" class="slider smart-text-align">
                                <swiper-slide v-for="item in item.phones" :key="item" class="pt-2 mt-1" style="cursor: pointer">
                                    <Button :label="item.number" icon="pi pi-phone" iconPos="right" class="p-button-text p-button-plain "/>
                                </swiper-slide>
                            </swiper>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="list-controller">
                    <div class="box-controller">
                        <div class="box-code">
                        <div class="input-controller smart-text-align">
                            <label for="code">{{$t('offCode')}}</label>
                            <InputText id="code" type="text" v-model="state.gift.code" :placeholder="$t('offCode')" />
                        </div>
                        <Button  :label="state.gift.percentFromCode > 0 ? $t('cancel') : $t('submit')" @click="state.gift.percentFromCode > 0 ? state.cancelGiftCode() : state.checkIsValid()" :loading="state.gift.giftCodeLoading" />
                    </div>
                </div>
                <div class="box-controller">
                     <Header :title="$t('freeVouchers')" />
                    <template v-if="state.gift.list.length > 0">
                        <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }" :slides-per-view="'auto'" :space-between="15" class="slider smart-text-align px-2">
                            <swiper-slide v-for="item in state.gift.list" :key="item" class="pt-2 mt-1" style="cursor: pointer">
                               <div class="gift-list-item">
                                    <div class="item-controller" :class="state.gift.selectedGif == item ? 'active':''" @click="state.gift.selectedGif = item">
                                        <div class="controller">
                                            <div class="child-controller">
                                                <div class="child">
                                                    <img v-lazy="state.selectedData.sellerProfileImageUrl + '_sm.webp'" alt="">
                                                </div>
                                                <div class="child">
                                                    <span>{{state.selectedData.sellerName}}</span>
                                                    <span>{{state.selectedData.sellerUsername}}</span>
                                                </div>
                                            </div>
                                            <div class="child-controller">
                                                <Button :label="$t('usable')" />
                                                <div class="child">
                                                    <span class="px-2">{{'UFG_'+item.giftId}}</span>
                                                    <div class="d-flex flex-row">
                                                        <span>{{$t('price2')}} : </span>
                                                        <span>{{$filters.currency(item.cost , item.currencyId == 0)}}</span>
                                                        <currency class="mx-2" :currencyId="item.currencyId"></currency>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="controller">
                                            <div class="child">
                                                <span>{{$t('expire_Days')}} : </span>
                                                <span>{{$filters.jalali(item.expiredAt)}}</span>
                                            </div>
                                            <div class="child">
                                                <Button :label="`UF_${item.factorId} : ${$t('factorNumber')}`" class="p-button-link no-shadow" />
                                            </div>
                                        </div>
                                    </div>
                               </div>
                            </swiper-slide>
                        </swiper>
                        <Footer >
                            <Button @click="state.onSelectGiftCard()" class="btn-footer" :label="$t('submit')"/>
                        </Footer>
                    </template>
                    <Lottie v-else :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'" :title="$t('thereIsNoGiftCardToBuyFromThisPage')"/>
                </div>
            </div>
            <div class="list-controller justify-content-center align-items-center" v-if="state.loading">
                <loading v-if="state.loading" />
            </div>
        </div>
        <div class="animations-controller" v-if="state.selectedData.productType !== 12">
            <Button v-if="!(state.addressData.factorOffCode)" @click="state.getAllGiftCard();state.gift.dialog = true" :class="state.showOptions ? 'active' : 'false'" class="p-button-raised" :label="$t('freeVouchers')"/>
            <Button v-if="!state.addressData.giftCardId" @click="state.gift.type = true;state.gift.dialog = true" :class="state.showOptions ? 'active' : 'false'" class="p-button-raised" :label="$t('offCode')"/>
        </div>
        {{(state.addressData.giftCardId && state.addressData.factorOffCode)}}
        <Button v-if="state.selectedData.productType !== 12 &&
                        !(state.selectedData.propBuyWithActivity && state.selectedData.propBuyWithActivity.length > 0)" @click="state.showOptions = !state.showOptions" class="p-button-text p-button-plain no-shadow float-btn" icon="pi pi-plus" />
        <Footer>
            <Button @click="state.onSubmit()" class="btn-footer" :label="$t('continueTheProcess')"/>
        </Footer>
    </div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import Footer from '@/app/unit/shared/footerApp/fixedFooterScreen.vue';
import {selectAddressState} from './selectAddressState';
import {ref , onMounted , onBeforeUnmount} from 'vue';
import currency from "@/app/public/shared/currency/Currency.vue";
import { ScrollController } from '@/core/service/scroll.service';
import RadioButton from 'primevue/radiobutton';
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";
import MapPointer from "@/app/public/shared/map/mapPointer.vue";


export default {
    components:{
        Header,
        Footer,
        currency,
        RadioButton,
        Lottie,
        MapPointer
    },
    setup () {
        const state = ref(new selectAddressState());
        let scrollCtrl = new ScrollController(onScroll);

        function onScroll() {
            state.value.getAddress();
        }
        onMounted(() => {
            state.value.getAddress();
            scrollCtrl.startListen();
            state.value.reGetUperScore();
            state.value.getTotalPrice();
        });
        onBeforeUnmount(() => {
            state.value.list = [];
            state.value.endList = false;
            state.value.loading = false;
        });
        return {state}
    }
}
</script>

<style lang="scss" scoped>
.main-controller {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 30px;
    position: relative;
    .head {
        display: flex;
        flex-direction: column;
        padding: 10px;
        .item-controller {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 10px;
            .item {
                font-size: 14px;
                button {
                    background: #fe5252 !important;
                    border-radius: 30px;
                    border: none;
                    font-size: 13px;
                    padding: 8px;
                }
                span {
                    &:first-child {
                        color: #686868;
                        &::after {
                            content: " : ";
                        }
                    }
                    
                }
            }
        }
    }
    .list-controller {
        display: flex;
        flex-direction: column;
        padding: 10px;
        .box-controller {
            .py-4 {
                display: none !important;
            }
            box-shadow: 0 0 5px #b5b5b5;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            padding: 5px;
            transition: .6s;
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            z-index: 1;
        }
        .item-controller {
            box-shadow: 0 0 5px #b5b5b5;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            padding: 5px;
            transition: .6s;
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            z-index: 1;
            &:hover {
                background: #eeeeeeA4;
            }
            .child {
                display: flex;
                flex-direction: column;
                font-size: 14px;
                padding: 5px;
                width: 100%;

                &:first-child {
                    flex-direction: row;
                    justify-content: space-between;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 5px;
                    position: relative;
                    .controller {
                        display: flex;
                        flex-direction: column;
                        padding: 5px;
                        &:nth-child(1) {
                            width: 30%;
                        }
                        &:nth-child(2) {
                            width: 70%;
                            span {
                                &:first-child {
                                    margin-bottom: 10px;
                                }
                                &:last-child {
                                    color: #686868;
                                    font-size: 13px;
                                    @media (max-width:476px) {
                                        font-size: 11px;
                                    }
                                }
                            }
                        }

                        &:last-child {
                            position: absolute;
                            left: 10px;

                        }
                        .img {
                            background-color: #44aab7;
                            padding: 5px;
                            border-radius: 5px;
                            font-size: 8px;
                            display: flex;
                            flex-direction: column;
                            color: #fff;
                            align-items: center;
                            position: relative;
                            z-index: 10;
                            span {
                                display: block;
                                text-align: center;
                            }
                        }
                    }
                }
                &:last-child {
                    .controller {
                        span {
                            &:first-child {
                                color: #686868;
                            }
                        }
                    }
                }
                button {
                    font-size: 14px;
                    background: #f8f7f0;
                    color: #92928f !important;
                    border: 2px solid #c0bfbb;
                }
            }
        }
    }
}

.float-btn {
    margin-bottom: 30px !important;
}

.btn-footer {
    background: #fe5252 !important;
    padding: 8px 40px;
    border-radius: 30px;
    border: none;
    font-size: 14px;
}

::v-deep(.swiper-slide) {
    padding: 10px 0 !important;
}

.animations-controller {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    bottom: 150px !important;
    z-index: 10;
    left: 0;
    @media (min-width:510px) {
        left: calc(50% - 243px) !important;
    }
    align-items: flex-end;
    button {
        background: #ff9700;
        color: #fff;
        font-size: 14px;
        width: 120px;
        border: none;
        border-radius: 20px;
        transition: .8s;
        transition-delay: .5s;
        margin-bottom: 10px;
        left: 512px;
        opacity: 0;
        &.active {
            left: 10px;
            opacity: 1;
        }
        &:last-child {
            width: 100px;
            transition: .9s;
            transition-delay: .5s;
        }

    }
}
.gift-list-item {
    min-width: 320px;
    padding: 0 10px;
    .item-controller {
        display: flex;
        flex-direction: column;
        border-radius: 8px ;
        box-shadow: 0 0 5px #b5b5b5;
        padding: 5px;
        cursor: pointer;
        transition: .6s;
        background: #fff;
        position: relative;
        z-index: 9;
        &.active {
         box-shadow: 0 0 6px #009425;
        }
        &:hover {
            background: #eee;
        }
        .controller {
            display: flex;
            flex-direction: row;
            &:last-child {
                padding: 10px;
                font-size: 13px;
                justify-content: space-between;
                .child {
                    span {
                        &:first-child {
                            color: #686868;
                        }
                    }
                    button {
                        font-size: 13px;
                        padding: 0;
                        direction: ltr;
                        text-decoration: underline;
                    }
                }
            }
            .child-controller {
                display: flex;
                flex-direction: row;
                width: 50%;
                justify-content: space-evenly;
                height: 80px;
                align-items: center;
                padding-top: 10px;

                &:last-child {
                    justify-content: flex-end;
                    text-align: left;
                    position: relative;
                    align-items: center;
                    button {
                        border-top-left-radius: 8px;
                        background: #009425;
                        border: none;
                        position: absolute;
                        top: -4px;
                        left: -4px;
                        font-size: 13px;
                        padding: 3px 15px;
                    }
                }
                .child {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    font-size: 14px;
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}

.box-code {
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: center;
    justify-content: center;
    height: 100%;
    .input-controller {
        width: 90%;
        display: flex;
        flex-direction: column;
        label {
            font-size: 14px;
            width: 100%;
        }
        input {
            box-shadow: 0 0 5px #b5b5b5 !important;
            border-radius: 8px;
            color:#212121;
            height: 45px;
            margin-bottom: 10px;
            padding: 10px !important;
        }
    }

    button {
        background: #c5e4e7;
        color: #212121;
        padding: 10px 30px;
        border: none;
        font-size: 14px;
        width: 70%;
    }
}
::v-deep(.float-btn) {
    width: 50px !important;
    height: 50px !important;
    background: #ff9700 !important;
    color: #fff !important;
    @media (min-width:576px) {
        bottom: 70px !important;
    }
}
::v-deep(.p-inputtext:enabled:focus) {
    box-shadow: 0 0 5px #b5b5b5 !important;
}

.code-box-controller {
    padding: 10px;
    .box {
        padding: 10px;
        display: flex;
        flex-direction: column;
        background: #fff;
        box-shadow: 0 0 5px #b5b5b5;
        font-size: 14px;
        border-radius: 10px;
        .controller {
            margin: 5px;
            span {
                margin-left: 5px;
            }
        }
    }
}
</style>
