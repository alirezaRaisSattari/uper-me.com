<template>
  <div v-if="state.productDetails" class="py-5">
    <div class="header-product-props">
      <svg height="46.5" viewBox="0 0 246.667 46.5" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
        </defs>
        <path id="Path_2" class="bg"
              d="M345.333,201.167l-246.667-.5,7.507,5,7.827,6L118.333,218,122,224l6.667,10.5L134,239.833l7.333,4.333,9.667,3H296.667l7.5-1.583,4.333-1.417,8.5-6.333,1.667-2,4.667-6.5L328,218l4-5.167,4.667-4.333L341,204.167Z"
              data-name="Path 2"
              transform="translate(-98.667 -200.667)"/>
      </svg>
      <div class="title">{{ $t('createReserveProp') }}</div>
    </div>
    <div class="main-form">
      <div class="header-form">
        <div class="left-side smart-text-align">
          <img v-lazy="state.productDetails.mainImageUrl+'_sm.webp'" alt="PImage">
        </div>
        <div class="right-side smart-text-align">
          <span>{{ state.productDetails.name }}</span>
          <div class="d-flex flex-row justify-content-center align-items-end h-100">
            <Button
                :label="state.postData.reservePropItems[0].startReserveTime === '' ? $t('start') : state.getTime(state.postData.reservePropItems[0].startReserveTime)"
                class="p-button-raised p-button-secondary no-shadow  mx-auto"
                @click="state.showDialog(0)"/>
            <Button
                :label="state.postData.reservePropItems[0].endReserveTime === '' ? $t('end') : state.getTime(state.postData.reservePropItems[0].endReserveTime)"
                class="p-button-raised p-button-secondary no-shadow mx-auto"
                @click="state.showDialog(1)"/>
            <SingleDateTimePicker :show="state.listDisplay[0]"
                                  @callBackDate="(date) => state.choseDateControl(date , 0)"/>
            <SingleDateTimePicker :show="state.listDisplay[1]"
                                  @callBackDate="(date) => state.choseDateControl(date , 1)"/>
          </div>
        </div>
      </div>
      <div class="body-form">
        <InputNumber v-model="state.postData.reservePropItems[0].defaultPrice" :placeholder="$t('cost')"
                     inputClass="no-shadow"/>
        <InputText v-model="state.postData.reservePropItems[0].description" :placeholder="$t('specifications')"
                   class="no-shadow my-2"
                   type="text"/>
        <div class="sub-body">
          <div class="right-side">
            <span>{{ $t('off_Percent') }} <span class="text-danger w-auto mx-1">*</span></span>
          </div>
          <div class="left-side">
            <Dropdown v-model="state.selectedPercent"
                      :options="state.percents" optionLabel="value" optionValue="value"
                      @change="($event) => state.postData.reservePropItems[0].offPercent = $event.value"/>
          </div>
        </div>
        <p>{{ $t('cancelPercentDefault') }}</p>
      </div>
    </div>
    <div class="gift-form">
      <Accordion :multiple="true" @tab-open="changeTab($event.index , true )"
                 @tab-close="changeTab($event.index , false)">
        <AccordionTab>
          <template #header>
                    <span class="smart-text-align w-100 d-flex">{{ $t('gift_Product') }}
                      <i :class="!tabControl[0] ? 'pi pi-plus' : 'pi pi-trash'"
                         class="d-flex smart-mx-auto align-items-center"
                         @click="test()"></i>
                    </span>
          </template>
          <div class="gift">
            <div class="level1">
              <div class="image-selector">
                <SingleImageSelector @callBack="(base64) => state.giftImage = base64"/>
              </div>
              <InputText v-model="state.postData.reservePropItems[0].giftProductName" :placeholder="$t('title')"
                         class="title  my-2"
                         type="text"/>
            </div>
            <div class="level2">
              <InputNumber v-model="state.postData.defaultPrice" :placeholder="$t('cost')" inputClass="price "/>
              <div class="mr-2">
                <InputText :disabled="true" :value="$t('toman')" class="title" type="text"/>
              </div>
            </div>
          </div>
        </AccordionTab>
        <AccordionTab>
          <template #header>
                    <span class="smart-text-align w-100 d-flex">{{ $t('giftCart') }}
                      <i :class="!tabControl[1] ? 'pi pi-plus' : 'pi pi-trash'"
                         class="d-flex smart-mx-auto align-items-center"></i>
                    </span>
          </template>
          <div class="gift-cart">
            <span class="smart-text-align">{{ $t('expireDate') }}  <span class="text-danger w-auto mx-1">*</span></span>
            <Dropdown v-model="state.selectedGiftDate" :options="state.giftDates" :placeholder="$t('select')"
                      optionLabel="value" optionValue="value"/>
            <div class="my-2">
              <InputNumber v-model="state.postData.defaultPrice" :placeholder="$t('giftCartCost')" inputClass="price "/>
            </div>
          </div>
        </AccordionTab>
      </Accordion>

    </div>
    <div class="second-form mb-5">
      <div class="child">
        <span class="smart-text-align">{{ $t('maxNumberSellInSite') }}<span
            class="text-danger w-auto mx-1">*</span></span>
        <Dropdown v-model="state.maxNumberSellInSiteSelected" :options="state.maxNumberSellInSiteList"
                  :placeholder="$t('select')" optionLabel="value" optionValue="value"/>
      </div>
      <div class="child">
        <span class="smart-text-align">{{ $t('max_Number_Sell_Per_Factor') }}<span
            class="text-danger w-auto mx-1">*</span></span>
        <Dropdown v-model="state.max_Number_Sell_Per_FactorSelected" :options="state.max_Number_Sell_Per_FactorList"
                  :placeholder="$t('select')" optionLabel="value" optionValue="value"/>
      </div>
      <div class="child">
        <span class="smart-text-align">{{ $t('wagePercent') }}<span class="text-danger w-auto mx-1">*</span></span>
        <Dropdown v-model="state.selectedWage" :options="state.wageList" :placeholder="$t('select')" optionLabel="title"
                  optionValue="wageId"/>
      </div>
      <div class="child justify-content-center align-items-center">
        <Button class="box no-shadow smart-text-align" type="button" @click="calculateWage()">
          {{
            uperValue > 0 ? $t("By buying this product you will get uper", {uper: uperValue}) : $t("How much uper do I get if I buy this product?")
          }}
        </Button>
      </div>
    </div>
    <div class="submit-form">
      <Button :label="$t('submit')" class="p-button-rounded p-button-danger"
              @click="state.onCreate()"/>
    </div>
  </div>
</template>

<script lang="ts">
import {createSunFoldersState} from './createSubFoldersPageState';
import {onMounted, ref} from "vue"
import {useRoute} from 'vue-router';
import {ToastService} from '@/core/service/toast.service';
import {i18n} from '@/main';
import router from '@/core/router/router';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import SingleDateTimePicker from '@/app/unit/shared/dateTimePicker/singleDateAndTimePickerScreen.vue'
import SingleImageSelector from '@/app/unit/shared/imageSelctorStation/singleImage/singleImageSelctorScreen.vue'

export default {
  components: {
    Dropdown,
    InputNumber,
    Accordion,
    AccordionTab,
    SingleDateTimePicker,
    SingleImageSelector
  },
  setup() {
    const route = ref(useRoute());
    const state = ref(new createSunFoldersState());

    const tabControl = ref([false, false]);
    onMounted(() => {
      if (route.value.query.fId === undefined) {
        ToastService.getInstance().error(i18n.global.tc('folderIdIsEmpty'));
        setTimeout(() => {
          router.back();
        }, 1000);
      } else {
        state.value.getProductDetails(route.value.params.pId, route.value.query.wpId);
      }
    });

    function changeTab(position, value) {
      tabControl.value[position] = value;
    }

    return {
      state,
      changeTab,
      tabControl,
    }
  }
}
</script>

<style lang="scss" scoped>

.header-product-props {
  display: flex;
  width: 100%;
  position: fixed;
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
    font-size: 14px;
  }

}

.main-form {
  max-width: 90%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 0 5px #b6b6b6;
  border-radius: 10px;
  margin: 15px auto;

  .header-form {
    padding: 5px;
    display: flex;
    flex-direction: row-reverse;

    .left-side {
      display: flex;
      flex-direction: column;
      flex: 40%;
      align-items: flex-end;

      img {
        width: 120px;
        height: 120px;
        border-radius: 5px;
      }
    }

    .right-side {
      display: flex;
      flex-direction: column;
      flex: 60%;

      button {
        background: #c5e4e7;
        border: none;
        color: #212121;
        font-size: 14px;
        padding: 8px 35px !important;
      }
    }


  }

  .body-form {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    padding: 0 10px;

    .sub-body {
      display: flex;
      flex-direction: row;

      .left-side {
        display: flex;
        flex: 70%;
      }

      .right-side {
        display: flex;
        align-items: center;
        color: #212121;
        font-size: 14px;
        margin: 0 5px;
        flex: 30%;
      }

    }

    p {
      color: #da9f3a;
      font-size: 15px;
      display: block;
      text-align: center;
      margin: 10px 0 0;
    }
  }
}

.gift-form {
  max-width: 90%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 0 5px #b6b6b6;
  border-radius: 10px;
  margin: 15px auto;

  .gift {
    display: flex;
    flex-direction: column;
    padding: 10px;

    .level1 {
      display: flex;
      flex-direction: row;
      padding: 0 10px;
      align-items: flex-end;

      .image-selector {
        flex: 30%;
        width: 100%;
        height: 100%;
        max-height: 120px;
        cursor: pointer;
      }

      .title {
        flex: 55%;
        max-height: 60px;
      }
    }

    .level2 {
      display: flex;
      flex-direction: row;
      padding: 0 10px;

      .price {
        flex: 50%;
      }

      .dropDown {
        flex: 50%;
      }
    }
  }

  .gift-cart {
    display: flex;
    flex-direction: column;
    padding: 10px;

    span {
      display: flex;
      margin-bottom: 5px;
      font-size: 14px;
      max-height: 46px;
    }
  }
}

.second-form {
  max-width: 90%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 0 5px #b6b6b6;
  border-radius: 10px;
  margin: 15px auto;

  .child {
    display: flex;
    flex-direction: column;
    margin: 6px 0;

    span {
      display: flex;
      width: 100%;
      font-size: 14px;
      margin-bottom: 5px;
    }

    .box {
      background: #eeee !important;
      color: #212121 !important;
      border: 2px solid #a9a9a9 !important;
      padding: 8px 5px;
      border-radius: 8px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 70%;
    }
  }
}

input, .p-inputnumber, .p-inputtext {
  margin: 5px 0 15px !important;
  color: #212121;
  box-shadow: 0 0 3px #b5b5b5 !important;
  width: 100%;
  background: #fff;
  padding: 10px !important;

  &:focus, &:hover {
    box-shadow: 0 0 3px #b5b5b5 !important;
  }
}

.submit-form {
  width: 508px;
  position: fixed;
  bottom: -32px;
  display: flex;
  justify-content: center;
  background: #fadadd;
  border-radius: 50px;
  box-shadow: 0 -4px 5px #a9a9a9 !important;
  padding: 20px 10px 42px;
  @media screen and (max-width: 993px) {
    z-index: 100;
  }
  @media screen and (max-width: 500px) {
    left: 0;
    width: 100%;
    bottom: -26px;
  }

  button {
    padding: 13px 70px;
  }
}

::v-deep(.p-dropdown) {
  box-shadow: none !important;
}

::v-deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
  text-decoration: none !important;
  box-shadow: none !important;
  background: transparent;
}

::v-deep(.p-accordion .p-accordion-header .p-accordion-header-link .p-accordion-toggle-icon) {
  display: none;
}

::v-deep(.p-accordion .p-accordion-tab:last-child .p-accordion-header:not(.p-highlight) .p-accordion-header-link) {
  border: none;
}

::v-deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
  border-top: none;
  border-left: none;
  border-right: none;
}

::v-deep(.p-accordion .p-accordion-content) {
  padding: 0;
  background: transparent;
  border: none;
}
</style>
