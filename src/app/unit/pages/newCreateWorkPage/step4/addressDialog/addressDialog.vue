<template>
    <div>
        <Header :title="$t('Add_new_address')"/>
        <div class="main-address-controller has-fixed-footer">
            <div class="controller">
                <div class="child smart-text-align">
                    <span class="title">{{$t('selectedMap')}}</span>
                </div>
                <div class="child text-left map-controller">
                    <Button @click="state.showMap = true" icon="icon-font uedit-address-sayar" :label="state.areaName ? $t('edit-location') : $t('selectedMap')"/>
                    <span class="f-15" v-if="state.areaName">{{state.areaName}}</span>
                    <Dialog modal dismissableMask :showHeader="false" v-model:visible="state.showMap" :style="{width: '100%' , 'max-width':'512px'}">
                        <Map :show="state.showMap" @latLan="(data)=> state.initLatLong(data)"  @onClose="state.showMap = false"/>
                    </Dialog>
                </div>
            </div>
            <div class="controller">
                <div class="child smart-text-align">
                    <span class="title">
                        {{$t('addressAndDescription')}}
                    </span>
                </div>
                <div class="child">
                    <InputText type="text" maxlength="50" :class="!state.validation && state.postData.title.length < 4  ? 'p-invalid':''" v-model="state.postData.title"  :placeholder="$t('addressTitle')"/>
                    <small v-if="!state.validation && state.postData.title.length < 4">{{state.postData.title.length > 0 ? $t('invalid') : $t('inputEmptyValidation')}}</small>
                </div>
                <div class="child">
                    <InputText type="text" maxlength="80" :class="!state.validation && state.postData.address.length < 4  ? 'p-invalid':''" v-model="state.postData.address" :placeholder="$t('text_address')" />
                    <small v-if="!state.validation && state.postData.address.length < 4">{{state.postData.address.length > 0 ? $t('invalid') : $t('inputEmptyValidation')}}</small>
                </div>
                <div class="child">
                    <InputText type="text" maxlength="10"  v-model="state.postData.postalCode" :placeholder="$t('postalCode')" />
                </div>
                <div class="phone-list-controller">
                    <div class="header">
                        <span>{{$t('phones')}}</span>
                        <Button @click="state.addPhone()" icon="fas fa-phone-alt" class="p-button-rounded p-button-text p-button-plain" />
                    </div>
                    <template v-if="state.postData.phones &&state.postData.phones.length > 0">
                        <div class="box-number" v-for="(item,index) in state.postData.phones" :key="item">
                            <div class="child">
                                <Button icon="pi pi-trash" @click="state.postData.phones.splice(index,1)" class="p-button-rounded p-button-text p-button-plain" />
                                <InputText type="text" maxlength="30" :class="state.postData.phones[index].title.length < 4 && !state.validation ? 'p-invalid':null" v-model="state.postData.phones[index].title" :placeholder="$t('phone_title')" />
                                <small v-if="state.postData.phones[index].title.length < 4 && !state.validation">{{$t('invalid')}}</small>
                                <InputText type="text" maxlength="11" :class="state.postData.phones[index].number.length !== 11 && !state.validation ? 'p-invalid':null" v-model="state.postData.phones[index].number" :placeholder="$t('mobileNumber')" />
                                <small v-if="state.postData.phones[index].number.length !== 11 && !state.validation">{{$t('invalid')}}</small>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <Footer :borderBottom="'12px'">
            <Button class="footer-btn" :label="$t('submit')" @click="onSend()"/>
            <Button class="footer-btn" :label="$t('cancel')" @click="onClose()"/>
        </Footer>
    </div>
</template>

<script lang="ts">
import Header from "@/app/unit/shared/headerApp/headerAppScreen.vue";
import Footer from "@/app/unit/shared/footerApp/fixedFooterScreen.vue";
import {addAddressDialogState} from './addressDialogState';
import { onMounted, ref } from 'vue';
import Map from '@/app/public/shared/map/selectLocationMap.vue'
export default {
    components:{
        Header,
        Footer,
        Map
    },
    props:{
      addressData:Object
    },
    emits:['onCreate' , 'onUpdate' , 'onClose' ],
    setup (props,{emit}) {
        const state = ref(new addAddressDialogState());
        onMounted(() => {
          console.log(props.addressData);
          
          if (props.addressData.data) {
            state.value.postData = {
              pageId:props.addressData.data.pageId,
              title:props.addressData.data.title,
              address:props.addressData.data.address,
              postalCode:props.addressData.data.postalCode , 
              cityId:props.addressData.data.cityId ,
              areaId:props.addressData.data.areaId ,
              latitude:props.addressData.data.latitude ,
              longitude:props.addressData.data.longitude , 
              phones:props.addressData.data.phones
            }
            const data = {
              lat:props.addressData.data.latitude ,
              lng:props.addressData.data.longitude , 
            }
            state.value.initLatLong(data);

          }
        })
        const onSend = () => {
          state.value.onSend((data)=>{
            if (props.addressData.data) return emit('onUpdate' , data);
            emit('onCreate' , data)
          });
        }

        const onClose = () => {
          emit('onClose')
        }
        return {state , onSend , onClose}
    }
}
</script>

<style lang="scss" scoped>
.main-address-controller {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .controller {
        display: flex;
        flex-direction: column;
        padding: 10px;
        font-style: 14px;
        width: 100%;
        box-shadow: 0 0 5px #b5b5b5;
        margin-bottom: 10px;
        border-radius: 8px;
        &:first-child {
            button {
                background: #c5e4e7;
                border: none;
                color: #212121;
                font-size: 13px;
                width: 130px;
                padding: 5px;
            }
        }

        .span {
            &.title {
                font-style: 15px;
                font-weight: bolder;
            }  
        }
        .child {
            padding: 5px 0;
            &.map-controller {
                display: flex;
                flex-direction: row-reverse;
                justify-content: space-between;
                align-items: center;
            }
            input {
                border: 1px solid #c9c9c9 ;
                font-size: 14px;
                padding: 10px !important;
                width: 100%;
                color: #212121;
            }
        }
        .phone-list-controller {
            display: flex;
            flex-direction: column;
            .header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                span {
                    font-size: 13px;
                }
            }
            .box-number {
                display: flex;
                flex-direction: column;
                border: 1px solid #c9c9c9;
                border-radius: 8px;
                align-items: flex-end;
                padding: 10px;
                margin-bottom: 10px;
                .child {
                    width: 100%;
                }
                &:first-child {
                    margin-bottom: 0;
                }
                text-align: left;
                input {
                    border: 1px solid #c9c9c9 ;
                    font-size: 14px;
                    padding: 10px !important;
                    width: 100%;
                    color: #212121;
                    margin-bottom: 8px;
                }

                small {
                    color: #dc3545;
                    display: flex;
                    margin-bottom: 5px;
                }
            }
        }
    }
}

.footer-btn {
    background: #fe5252 !important;
    border-radius: 30px;
    border: none;
    font-size: 13px;
    padding: 8px 40px;
}

::v-deep(.p-invalid) {
    border-color: #dc3545 !important;
}
</style>
