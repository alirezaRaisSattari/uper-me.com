<template>
    <div class="main-item-controller">
        <div class="item-controller">
            <div class="controller">
                <div class="child">
                    <img v-lazy="data.mainImageUrl+'_sm.webp'">
                </div>
                <div class="child">
                    <div class="text-controller">
                        <span>{{$t('name')}} : </span>
                        <span>{{data.name}}</span>
                    </div>
                    <div class="text-controller">
                        <span>{{$t('preparationTime')}} : </span>
                        <span>{{$filters.getDayOrHours(data.prepareTime)}}</span>
                    </div>
                    <div class="text-controller">
                        <span>{{$t('cost')}} : </span>
                        <div class="currency-controller">
                            <span>{{$filters.currency(data.price)}}</span>
                            <currency class="mr-2" :currencyId="data.currencyId"></currency>
                        </div>
                    </div>
                </div>
            </div>
            <div class="controller">
                 <div class="child">
                    <div class="text-controller">
                        <span>{{$t('maintenanceType')}} : </span>
                        <span>{{cargoTypeCheck()}}</span>
                    </div>
                    <div class="text-controller">
                        <span>{{$t('ware_type')}} : </span> 
                        <span>{{data.usedType == 1 ? $t('new') : $t('secondhand')}}</span>
                    </div>
                    <div class="text-controller">
                        <span>{{$t('numbers')}} : </span>
                        <span>{{$filters.currency(data.number)}}</span>
                    </div>
                    <div class="text-controller">
                        <span>{{$t('packageWeightInKg')}} : </span>
                        <span>{{data.weight}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-footer">
             <div class="header-product-props-dialog" @click="deleteShoppingCart()">
                <svg height="46.5" viewBox="0 0 246.667 46.5" width="100%" xmlns="http://www.w3.org/2000/svg">
                <defs></defs>
                <path id="Path_2" class="bg" d="M345.333,201.167l-246.667-.5,7.507,5,7.827,6L118.333,218,122,224l6.667,10.5L134,239.833l7.333,4.333,9.667,3H296.667l7.5-1.583,4.333-1.417,8.5-6.333,1.667-2,4.667-6.5L328,218l4-5.167,4.667-4.333L341,204.167Z" data-name="Path 2" transform="translate(-98.667 -200.667)"/>
                </svg>
                <loading class="position-absolute" v-if="loading"/>
                <div v-else class="title position-absolute">{{ `${$t("delete")}` }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import currency from "@/app/public/shared/currency/Currency.vue";
import { i18n } from '@/main';
import { ProductRepository } from '@/core/repository/product.repository';
import { getSelectedPageId } from '@/core/service/utils.service';
import {ref} from 'vue';
import router from '@/core/router/router';

export default {
    props:{
        data:Object,
        mainData:Object
    },
    components:{
        currency
    },
    setup (props) {
        const loading = ref(false);
        const cargoTypeCheck = () => {
            switch (props.data.cargoType) {
                case 1:
                    return i18n.global.tc('normal');
                case 2:
                    return i18n.global.tc('sensitive');
                case 3:
                    return i18n.global.tc('glacier');
                case 4:
                    return i18n.global.tc('expressDelivery');
                case 5:
                    return i18n.global.tc('expressDelivery');
            }
        }

        const deleteShoppingCart = () =>{
            loading.value = true;
            ProductRepository.getInstance().ShoppingCartDeleteCustomFromShoppingCart({
                body:{
                    shoppingCartId: props.mainData.id,
                    buyerPageId: getSelectedPageId(),
                    customId: props.data.customId
                },onReceive:(res)=>{
                    loading.value = false;
                    router.back();
                },onError:(err)=> {
                    console.log(err)
                    loading.value = false;
                }
            })
        }

        return {
            cargoTypeCheck,
            deleteShoppingCart,
            loading
        }
    }
}
</script>

<style lang="scss" scoped>
.main-item-controller {
    padding: 10px;

    .item-controller {
        display: flex;
        flex-wrap: wrap;
        box-shadow: 0 0 5px #b5b5b5;
        border-radius: 8px;
        .controller {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            &:last-child {
                .child {
                    padding: 8px 10px;
                    width: 100% !important;
                    .text-controller {
                        span {
                            width: 50%;
                            display: block;
                            text-align: right;
                            &:first-child {
                                color: #686868;
                                font-size: 13px;
                            }
                        }
                    }
                }
            }
            
            .child {
                display: flex;
                flex-direction: column;
                font-size: 14px;
                justify-content: space-evenly;
                &:first-child {
                    width: 20%;
                    align-items: center;
                }
                &:nth-child(2) {
                    width: 80%;
                    padding: 0 10px;
                    span {
                        &:first-child {
                            color: #686868;
                            font-size: 13px;
                        }
                    }
                }
               
                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 15px;
                    padding: 10px;
                }
                .text-controller {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 100%;
                }
            }
        }
    }
}

.currency-controller {
    display: flex;
    flex-direction: row;
    span {
        color: #212121 !important;
    }
}

.item-footer {
    display: flex;
    justify-content: center;
    position: relative;
    .header-product-props-dialog {
      display: flex;
      width: 100%;
      position: absolute;
      left: 0%;
      top: 0;
      z-index: 10;
      cursor: pointer;
      transition: .6s;
      &:hover {
          opacity: .9;
      }
    
      .bg {
        fill: #E7152A;
      }
    
      .title {
        position: absolute;
        top: 10px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #fff;
        
      }
    }

}
</style>
