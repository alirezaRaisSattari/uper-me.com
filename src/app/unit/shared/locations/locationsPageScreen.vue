<template>
    <div>
        <Header :title="$t('stations')" />
        <div class="list-controller has-fixed-footer" v-if="!state.loading">
        <Dialog v-model:visible="state.showDialog" :contentStyle="{ 'border-radius': '10px' }" :dismissableMask="true" :modal="true" :position="'bottom'" :showHeader="false" :style="{ width: '100%', 'max-width': '500px', 'border-radius': '10px' }">
            <div class="chose-controller">
                <div class="child">
                    <span>{{state.selectedStation.title}}</span>
                </div>
                <div class="child">
                    <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                        :slides-per-view="'auto'" :space-between="15"
                        class="slider">
                    <swiper-slide  class="pt-2 mt-1" style="cursor: pointer">
                        <img v-lazy="state.selectedStation.mainImageUrl" >
                    </swiper-slide>
                    <swiper-slide v-for="image in state.selectedStation.otherImageUrls" :key="image" class="pt-2 mt-1" style="cursor: pointer">
                        <img v-lazy="image+'_sm.webp'" >
                    </swiper-slide>
                    </swiper>
                </div>
                <div class="child">
                    <span>{{`${$t('specifications')} : ${state.selectedStation.description}`}}</span>
                </div>
                <div class="child">
                    <Button @click="state.onSelectLocation()" :label="$t('select')" class="p-button-rounded" />
                </div>
            </div>
        </Dialog>
            <div class="item-controller" v-for="item in state.list" :key="item" @click="state.showDialog = true;state.selectedStation = item">
                <div class="child">
                    <div class="controller">
                        <span>{{$t('stationType')}}</span>
                        <span>{{state.typeStatus(item.type)}}</span>
                    </div>
                    <div class="controller">
                        <span>{{$t('locationType')}}</span>
                        <span>{{item.title}}</span>
                    </div>
                    <div class="controller">
                        <span>{{$t('no.')}}</span>
                        <span>{{item.plateNumber ?? 0}}</span>
                    </div>
                    <div class="controller">
                        <span>{{$t('specifications')}}</span>
                        <span>{{item.description ?? $t('noCaption')}}</span>
                    </div>
                </div>
                <div class="child">
                    <img v-lazy="item.mainImageUrl" alt="">
                </div>
            </div>
            <div class="scanner-controller">
                <Button @click="state.showQrReader = true" icon="fas fa-qrcode mx-2" iconPos="right"  :label="$t('scanStation')" class="p-button-rounded" />
                <QrReader v-if="state.showQrReader" :show="state.showQrReader" @onDecode="(data) => state.onDecode(data)" />
            </div>
        </div>
        <loading v-else />
        
    </div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import {ref , onMounted} from 'vue';
import {locationsPageState} from './locationsPageState';
import QrReader from '@/app/unit/shared/qrReader/qrReaderScreen.vue'
export default {
    components:{
        Header,
        QrReader
    },
    setup () {

        const state = ref(new locationsPageState());
        onMounted(() => {
            state.value.getData();
        })

        return {state}
    }
}
</script>

<style lang="scss" scoped>
    .list-controller {
        display: flex;
        flex-direction: column;
        padding: 10px;
        position: relative;
        .item-controller {
            display: flex;
            flex-wrap: wrap;
            box-shadow: 0 0 5px #b5b5b5;
            border-radius: 8px;
            padding: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            background: #fff;
            transition: .6s;
            &:hover {
                background: #eee;
            }
            .child {
                width: 60%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 14px; 
                @media (max-width:400px) {
                    width: 65%;
                }
                .controller {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    @media (max-width:400px) {
                        font-size: 12px;
                    }
                    span {
                        &:first-child {
                            color: #686868;
                            &::after {
                                content: ' : ';
                            }
                        }
                    }
                }
                
                &:nth-child(2) {
                    width: 40%;
                    @media (max-width:400px) {
                        width: 35%;
                    }
                    align-items: flex-end;
                }
    
                img {
                    width: 120px;
                    @media (max-width:400px) {
                        width: 100px;
                    }
                    min-height: 100px;
                    max-height: 120px;
                    border-radius: 10px;
                }
            }
        }
    }
    .scanner-controller {
       position: fixed;
        bottom: 24px;
        @media (max-width:990px) {
            bottom: 80px;
        }
        left: calc(50% - 233px);
        @media (max-width:476px) {
            left: 2%;
        }
        color: #fff;
        border-radius: 50px;
        text-align: center;
        z-index: 999;
    }

.swiper-container {
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    list-style: none;
    padding-right: 0;
    width: 100% !important;
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}

.chose-controller {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .child {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-size: 14px;
        width: 100%;
        margin-bottom: 10px;
        img {
            width: 250px;
            height: 150px;
            border-radius: 8px;
        }
        &:last-child {
            align-items: center;
            justify-content: center;
            width: 100%;
            button {
                background: #be3535;
                border: none;
                padding: 8px 40px;
                font-size: 14px;
            }
        }
    }
}

::v-deep(.p-button-icon) {
    margin: 0 5px !important;
}

</style>
