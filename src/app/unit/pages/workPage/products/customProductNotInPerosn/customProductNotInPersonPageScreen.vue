<template>
    <div class="has-fixed-footer">
        <Header :title="$t('customProductNotInPerson')"/>
        <productCategories  ref="pageCategory" :callback="onSelectCategory"/>

        <template v-if="!state.continue" >
            <div class="main">
                <div class="main-controller">
                    <div class="controller">
                        <div class="child">
                            <span>{{$t('select_product_category')}}</span>
                        </div>
                        <div class="child">
                            <Button :label="$t('select_product_category')" class="chose-btn" @click="openCategory()" />
                        </div>
                    </div>
                    <swiper :direction="'horizontal'" :free-mode="false" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                    :slides-per-view="'auto'" :space-between="0" class="slider w-auto">
                        <swiper-slide v-for="(item, index) in state.workPageDetails" :key="index" class="py-2 d-flex w-100 px-1">
                            <Button class="cate-item" :label="item.title" icon="pi pi-angle-left" iconPos="right"/>
                        </swiper-slide>
                    </swiper>
                    <div class="form smart-text-align">
                        <span>{{ $t('isProductOriginal') }}</span>
                        <div class="options">
                            <Button v-for="item in state.options.orginalType" :key="item" :class="item.value === state.productData.isOriginal ? 'selected':'un-selected'" :label="item.name" @click="state.productData.isOriginal = item.value"/>
                        </div>
                    </div>
                    <div class="form smart-text-align">
                        <span>{{ $t('usedType') }}</span>
                        <div class="options">
                            <Button v-for="item in state.options.usedType" :key="item" :class="item.value === state.productData.usedType ? 'selected':'un-selected'" :label="item.name" @click="state.productData.usedType = item.value"/>
                        </div>
                    </div>
                    <div class="input-controller">
                        <label class="smart-text-align" for="name">{{$t('name')}}</label>
                        <InputText id="name" type="text" v-model="state.productData.name" />
                    </div>
                    <div class="input-controller">
                        <label class="smart-text-align" for="details">{{$t('description')}}</label>
                        <InputText id="details" type="text" v-model="state.productData.description"  />
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="main-controller">
                    <div class="img-controller">
                        <div class="child">
                            <span>{{$t('mainImage')}}</span>
                        </div>
                        <div class="child">
                            <img v-lazy="state.productData.mainImageUrl+'_sm.webp'" >
                        </div>
                    </div>
                    <div class="multi-img-controller">
                        <div class="controller">
                            <div class="child">
                                <span>{{$t('addotherphotos')}}</span>
                            </div>
                            <div class="child">
                                <Button class="no-shadow" @click="selectImage" :label="$t('addotherphotos')" />
                                <input id="other-images" accept="image/*" hidden multiple type="file" @change="state.onSelect($event)"/>
                            </div>
                        </div>

                        <div class="img-controller">
                            <div class="img" v-for="(image,index) in state.imageList" :key="image">
                                <div class="item" :style="{'background-image':`url(${image.link ?? image.base64})`}">
                                    <Button @click="state.removeFromList(index)" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="main">
                <div class="main-controller">
                    <div class="controller mb-2">
                        <div class="child">
                            <span>{{$t('preparationTime')}}</span>
                        </div>
                    </div>
                    <div class="controller">
                        <Dropdown v-model="state.selectedPreparationTime" :options="state.listPreparationTime" optionLabel="label" optionValue="value"  />
                    </div>
                    <div class="form-controller">
                        <div class="controller">
                            <div class="child">
                                <label class="smart-text-align" for="price">{{$t('cost')}}</label>
                                <InputNumber inputClass="text-left" id="price" v-model="state.productData.price" :minFractionDigits="1" :maxFractionDigits="4" />
                            </div>
                            <div class="child ">
                                <Dropdown v-model="state.selectedCurrency" :options="state.currencyTypes" optionLabel="label" optionValue="value"  />
                            </div>
                        </div>
                        <div class="controller">
                            <div class="child">
                                <label class="smart-text-align" for="price">{{$t('count')}}</label>
                                <InputNumber inputClass="text-left" id="price" v-model="state.productData.number" />
                            </div>
                            <div class="child ">
                                <label class="smart-text-align" for="price">{{$t('Reference percentage')}}</label>
                                <InputNumber inputClass="text-left" id="price" v-model="state.productData.returnedPercent" :minFractionDigits="1" :maxFractionDigits="4" />
                            </div>
                        </div>
                          <div class="controller">
                            <div class="child">
                                <label class="smart-text-align" for="price">{{$t('packageWeightInKg')}}</label>
                                <InputNumber inputClass="text-left" id="price" v-model="state.productData.weight" :minFractionDigits="1" :maxFractionDigits="4"/>
                            </div>
                        </div>
                            <div class="controller">
                            <div class="child">
                                <label class="smart-text-align require" for="price">{{$t('maintenanceType')}}</label>
                                <Dropdown v-model="state.productData.usedType" :options="state.usedTypeList" optionLabel="label" optionValue="value"  />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-controller ">
                    <Button @click="viewRules()" :label="$t('viewRules')" />
                </div>
            </div>
        </template>
        <div class="footer-controller">
            <Button :loading="state.loading" @click="state.continue ? state.onSend() : state.continue = true " :label="state.continue ? $t('create') : $t('continue') " />
        </div>
    </div>
</template>

<script lang="ts">
import {customProductNotInPersonState} from './customProductNotInPersonPageState'
import { onMounted , ref } from 'vue';
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import productCategories from "@/app/unit/shared/productCategory/productCategoriesScreen.vue";

export default {
    components:{
        Header,
        Textarea,
        Dropdown,
        InputNumber,
        productCategories
    },
    setup () {
        const state = ref(new customProductNotInPersonState());
        const pageCategory = ref(null);

         function onSelectCategory(e) {
             state.value.workPageDetails = []
             let list = [];
             for (let i = 0; i < 5; i++) {
                 if (e.postData['catName'+(i+1)]) list.push(e.postData['catName'+(i+1)])
             }
             state.value.workPageDetails.push(...list);
             state.value.workPageDetails = state.value.workPageDetails.reverse()
        }

        function openCategory() {
            pageCategory.value.showDialog();
        }


        onMounted(()=>{
            state.value.getData();

        })
        const viewRules = () => {
          Object.assign(document.createElement('a'), {
            target: '_blank',
            href: 'https://uper-me.com/rules',
          }).click();
        }
        function selectImage() {
          document.getElementById("other-images")?.click();
        }

        return {
            state,
            selectImage,
            pageCategory,
            onSelectCategory,
            openCategory,
            viewRules
        }
    }
}
</script>

<style lang="scss" scoped>
.swiper-container {
    width: 100% !important;
}
.swiper-slide {
    width: auto !important;
}
.main {
    padding: 10px;
     &:last-child {
            margin-bottom: 100px;
    }
    .main-controller {
        display: flex;
        flex-direction: column;
        box-shadow:  0 0 5px #b5b5b5;
        border-radius: 8px;
        padding: 8px;
       
        .img-controller {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 10px;
            .child {
                font-size: 14px;
                span {
                    &::after {
                        content: '*';
                        color:red;
                        margin: 0 5px;
                    }
                }
                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 8px;
                }
            }
        }
        .form-controller {
            display: flex;
            flex-direction: column;
            .controller {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 10px 0;
                .child {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 66.8px;
                    padding: 0 10px;
                    justify-content: flex-end;
                    span {
                        width: 100%;
                    }
                    label {
                        margin-bottom: 5px;
                        width: 100%;
                        &.require {
                            &::after {
                                content: '*';
                                color: red;
                                margin: 0 5px;
                            }
                        }
                    }
                }
            }
         
            
        }
        .multi-img-controller {
            display: flex;
            flex-direction: column;
            .img-controller {
                display: flex;
                flex-wrap: wrap;
                .img {
                    width: 33%;
                    height: 130px;
                    padding: 8px;
                    border-radius: 8px;
                    .item {
                        border-radius: 8px;
                        position: relative;
                        width: 100%;
                        height: 100%;
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-color: #eee;
                        button {
                            position: absolute;
                            top: 0;
                            right: 0;
                            color: #df1e1e !important;
                            transition: .6s;
                            &:hover{
                                background: #eeeeee52;
                            }
                        }
                    }
                }

            }
        }

        .input-controller {
            display: flex;
            flex-direction: column;
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            label {
                font-size: 13px;
            }
            input {
                width: 100%;
                font-size: 14px;
                box-shadow: 0 0 5px #b5b5b5 !important;
                padding: 8px !important;
            }
        }
        .controller {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .child {
                display: flex;
                align-items: center;
                font-size: 14px;
                button {
                    background: #c5e4e7;
                    border: none;
                    color: #212121;
                    font-size: 14px;
                }

                span {
                    font-size: 14px;
                    &::after {
                        content: '*';
                        color: red;
                        margin: 0 5px ;
                    }
                }
            }
        }

        .form {
            padding: 10px 0;
            font-size: 14px;
            .options {
                padding: 15px 10px;
                display: flex;
                justify-content: center;
                align-items: center;

                button {
                    border: 1px solid #b5b5b5;
                    color: #212121;
                    font-size: 14px;
                    padding: 12px 20px;
                    box-shadow: none !important;
                    border-radius: 0;
                    width: 30%;

                    &:first-child {
                        border-top-right-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }

                    &:last-child {
                        border-top-left-radius: 8px;
                        border-bottom-left-radius: 8px;
                    }
                }

                .selected {
                    background: #ff9f00;

                }

                .un-selected {
                    background: #eeeeee;
                    color: #9c9c9c;
                }
            }
        }

        .cate-item {
            color: #303030;
            background: #fff;
            font-size: 14px;
            border-radius: 8px;
            border: none;
            box-shadow: 0 0 3px #b5b5b5;
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
  width: 512px;
  border-radius: 40px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  @media (max-width: 512px) {
    width: 100%;
  }

  button {
    background: #686868 !important;
    border-radius: 25px;
    box-shadow: none !important;
    border: none;
    padding: 8px 50px !important;
  }
}

::v-deep(.pi-angle-left) {
    color: #b5b5b5;
}

.chose-btn {
    box-shadow: none !important;
}

.btn-controller {
    text-align: left;
    padding: 10px 0;
    width: 100%;
    display: block;
    button {
        background: #c5e4e7 !important;
        border: none;
        color: #212121 !important;
        font-size: 14px;
        box-shadow: none !important;
    }
}

::v-deep(.p-fileupload) {
  .p-button {
    background: #c2e1e4 !important;
    box-shadow: none !important;
    border: none;
    padding: 10px;
    font-size: 14px;
    color:#212121 !important;
    border-radius: 8px;
    width: 100%;
  }
}

::v-deep(.p-button-icon.p-button-icon-left.pi.pi-plus) {
    display: none;
}

::v-deep(.p-dropdown.p-component.p-inputwrapper.p-inputwrapper-filled) {
    box-shadow: none;
}

::v-deep(.p-dropdown-label.p-inputtext) {
    text-align: right;
}

::v-deep(.p-dropdown-item) {
    text-align: right;
}

::v-deep(.p-inputnumber.p-component.p-inputwrapper.p-inputwrapper-filled) {
    box-shadow: 0 0 5px #b5b5b5;
    padding: 8px;
    border-radius: 5px;
    &::after{
        display: none;
    }
}
</style>