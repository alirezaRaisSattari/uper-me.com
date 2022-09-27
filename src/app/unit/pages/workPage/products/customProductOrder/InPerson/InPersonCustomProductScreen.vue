<template>
    <div>
        <Header :title="$t('InPersonCustomProduct')" />
        <ChoseProductCategories ref="showCategory" :callback="(data) => state.getCategory(data)" @passData="state.choseCategoryDialog = false" />
        <!-- start reserve -->
            <div class="main-base-controller" v-if="state.product && state.product.result.productType != 1">
                <template v-if="!state.continue" >
                    <div class="box category-controller">
                        <div class="controller">
                            <div class="child">
                                <span>{{$t('selectCategories')}}</span>
                            </div>
                            <div class="child">
                                <Button :label="$t('selectCategories')" @click="showCategory.showDialog" class="p-button-info" />
                            </div>
                        </div>
                        <div class="controller">
                            <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                                    :slides-per-view="'auto'" :space-between="15"
                                    class="slider">
                                <swiper-slide v-for="item in state.childrenOfCategory" :key="item" class="pt-2 mt-1" style="cursor: pointer">
                                    <Button :label="item.title" icon="pi pi-angle-left" iconPos="right" class="p-button-text p-button-plain category-item"/>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div class="controller">
                            <div class="input-controller w-100">
                                <label for="persianName">{{$t('persianName')}}</label>
                                <InputText id="persianName" :placeholder="$t('persianName')" type="text" v-model="state.postData.name" />
                            </div>
                        </div>
                        <div class="controller">
                            <div class="input-controller w-100">
                                <label for="description">{{$t('description')}}</label>
                                <InputText id="description" :placeholder="$t('description')" type="text" v-model="state.postData.description" />
                            </div>
                        </div>
                    </div>
                    <div class="box image-controller">
                        <SelectImageGlobal :data="state.imageTabData" :type="1"
                                    @images="(event) => state.callbackImage(event)"/>
                    </div>
                </template>
                <template v-else >
                    <div class="box input-controller">
                         <div class="controller">
                            <div class="input-controller">
                                <label for="price">{{$t('price2')}}</label>
                                <InputNumber id="price" :placeholder="$t('price2')" type="text" v-model="state.postData.price" />
                            </div>
                            <div class="input-controller">
                                <label for="price">{{$t('currency')}}</label>
                                <Dropdown v-model="state.postData.currencyId" :options="state.currencyList" optionLabel="label" optionValue="value" />
                            </div>
                        </div>
                         <div class="controller">
                            <div class="input-controller">
                                <label for="count">{{$t('count')}}</label>
                                <InputNumber id="count" :placeholder="$t('count')" type="text" v-model="state.postData.number" />
                            </div>
                            <div class="input-controller">
                                <label for="Reference">{{$t('Reference percentage')}}</label>
                                <InputNumber id="Reference" :placeholder="$t('Reference percentage')" type="text" v-model="state.postData.returnedPercent" />
                            </div>
                        </div>
                    </div>
                    <div class="reverse-smart-text-align">
                         <Button :label="$t('viewRules')" @click="state.showRolls()" class="p-button-raised p-button-info" />
                    </div>
                </template>
            </div>
            <!-- end reserve -->
            <!-- start sell product -->
            <div class="main-base-controller" v-else>
                
            </div>
            <!-- end sell product -->
            <Footer>
                <Button :label="!state.continue ? $t('continue') : $t('create')" class="btn-create" @click="!state.continue ? state.beforeContinue() : state.onSubmit()" />
            </Footer>
    </div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import {InPersonCustomProductState} from './InPersonCustomProductState';
import {onMounted, ref} from 'vue';
import ChoseProductCategories from "@/app/unit/shared/productCategory/productCategoriesScreen.vue";
import SelectImageGlobal from "@/app/unit/shared/imageSelctorStation/selectImageGlobalScreen.vue";
import Footer from '@/app/unit/shared/footerApp/fixedFooterScreen.vue';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
export default {
    components:{
        Header,
        ChoseProductCategories,
        SelectImageGlobal,
        Footer,
        Dropdown,
        InputNumber
    },
    setup () {
        const state = ref(new InPersonCustomProductState());
        const showCategory = ref(null);

        onMounted(() => {
            state.value.getProductDetails();
        });

        return {
            state,
            showCategory,
        }
    }
}
</script>

<style lang="scss" scoped>
.main-base-controller {
    display: flex;
    flex-direction: column;
    padding: 8px ;
    .box {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 0 5px #b5b5b5;
        margin-bottom: 10px;

        .controller {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            .child {
                font-size: 14px;
                button {
                    font-size: 14px;
                    background: #c5e4e9;
                    border: none !important;
                    color:#212121;
                }
                span {
                    &::after {
                        content: ' * ';
                        color:red;
                    }
                }
            }

            .category-item {
                font-size: 14px;
                box-shadow: 0 0 5px #b5b5b5 !important;
                margin: 10px 0 5px 5px ;
            }

        }

        .image-controller {
            width: 100%;
        }
    }
}


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

.active-route {
  border-radius: 0 !important;
  border-bottom: 2px solid #131313 !important;
}

.input-controller {
    display: flex;
    flex-direction: column;
    padding: 5px;
    min-width: 50%;

    label {
        width: 100%;
        margin-bottom: 5px;
        font-size: 14px;
    }

    input {
        height: 40px;
        padding: 0 5px !important;
        font-size: 14px;
        color:#212121;
        width: 100%;
    }
}

.btn-create {
    background: #ef5e68 !important;
    width: 150px;
    border-radius: 8px;
    padding: 8px;
    font-size: 14px;
    border: none;
}
::v-deep(.p-dropdown.p-component.p-inputwrapper.p-inputwrapper-filled) {
    height: 40px;
    font-size: 14px;
}

::v-deep(.p-dropdown .p-dropdown-label) {
    text-align: right;
}

.p-button-info {
    margin: 10px 0  ;
    background: #1380df ;
}

::v-deep(.p-inputnumber-input) {
    width: 100%;
    height: 40px;
    font-size: 14px;
    padding: 5px !important;
}
</style>