<template>
  <Dialog v-model:visible="displayReport" :contentStyle="{ borderRadius: '7px' }" :dismissableMask="true"
    :header="false" :modal="true" :showHeader="false" style="width: 18rem; border-radius: 15px !important">
    <report :userData="userData" @closeReportModal="displayReport = false" :itemId="productid" :prop-id="propid"
      :itemType="reoprtItem" />
  </Dialog>
  <Dialog v-model:visible="customCostDialog" :contentStyle="{ borderRadius: '7px' }" :dismissableMask="true"
    :header="false" :modal="true" :showHeader="false" style="width: 18rem; border-radius: 15px !important">
    <div class="box-chose">
        <Button @click="$function.goTo(`/faceToFaceCustomProduct/${Math.abs(workPageDetailes.workPageId)}`)" icon="uproduct-here" :label="$t('verbalCustom')" class="p-button-text p-button-plain" />
        <Button @click="$function.goTo(`/inPersonCustomProduct?proId=${item.propId}&pId=${item.productId}&wId=${Math.abs(workPageDetailes.workPageId)}`)" icon="uproduct-online" :label="$t('offlineOrder')" class="p-button-text p-button-plain" />
    </div>
  </Dialog>
  <Dialog v-model:visible="dialogGift" :contentStyle="{ 'border-radius': '10px' }" :dismissableMask="true"
    :modal="true" :position="'bottom'" :showHeader="false"
    :style="{ width: '100%', 'max-width': '500px', 'border-radius': '10px' }">
      <div class="header-product-props-dialog">
        <svg height="46.5" viewBox="0 0 246.667 46.5" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs></defs>
          <path id="Path_2" class="bg"
            d="M345.333,201.167l-246.667-.5,7.507,5,7.827,6L118.333,218,122,224l6.667,10.5L134,239.833l7.333,4.333,9.667,3H296.667l7.5-1.583,4.333-1.417,8.5-6.333,1.667-2,4.667-6.5L328,218l4-5.167,4.667-4.333L341,204.167Z"
            data-name="Path 2" transform="translate(-98.667 -200.667)" />
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
                {{ formatPriceNumber(item.giftCardCost) }}
              </span>
              <Currency :currency-id="item.currencyId" />
            </div>
            <div class="default-price">
              <span class="label"> {{ $t("expire_Days") }} : </span>
              <span class="value">
                {{
                  `${ item.giftCardExpiredDays < 0 ? $t("expired") : `${item.giftCardExpiredDays} ${$t("day")}` } `
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="p-5"></div>
    </Dialog>
    <Dialog v-model:visible="dialogChooseCurrency" :contentStyle="{ 'border-radius': '10px', overflow: 'hidden' }"
      :modal="true" :showHeader="false" :style="{ 'max-width': '350px' }" dismissableMask>
      <div class="main-choose-currency-controller">
        <p>{{ $t("choaseCurrencyMsg") }}</p>
        <div class="controller">
          <div class="child" @click="addToCart(0)">
            <div class="right-side">
              <Currency :currency-id="0" :scale="1.5" />
            </div>
            <div class="left-side">
              <div class="price">
                <span>{{ $filters.currency(item.uperPrice , true) }}</span>
              </div>
              <div class="label">
                <span>{{ $t("addToCard") }}</span>
              </div>
            </div>
          </div>
          <div class="child" @click="addToCart(1)">
            <div class="left-side">
              <div class="price">
                <span>{{ $filters.currency(item.defaultPrice , false) }}</span>
              </div>
              <div class="label">
                <span>{{ $t("addToCard") }}</span>
              </div>
            </div>
            <div class="right-side">
              <Currency :currency-id="1" :scale="1.5" />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  <div class="main-prop-item-controller">
      <div :class="!isBuyer ? 'border-bottom-r-0' : '' " class="full-card ml-2 uper-card-1">
        <div v-if="item.productType < 5 && item.productType > 1" class="main-item-control">
         <div class="header" v-if="(item.endReserveTime)">
          <img :src="require('@/assets/img/svg/borderred.svg')" >
            <span>
              {{`${$filters.jalali(item.startReserveTime)} ${$t('from')} ${$filters.getHours(item.startReserveTime)} ${$t('to')} ${$filters.getHours(item.endReserveTime)}`}}
            </span>
         </div>
        </div>
        <div class="header-secondSliderItem">
          <div class="report-bar w-100 d-flex">
            <div class="half-right">
              <img v-lazy="workPageDetailes.workPageProfileImageUrl + '_sm.webp'" alt="image" src="" />
              <img class="creditLevel" v-if="workPageDetailes.creditLevel == 1 || workPageDetailes.creditLevel == 2" v-lazy="workPageDetailes.creditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : workPageDetailes.creditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
              <div class="d-flex flex-column justify-content-center">
                <span class="head-title">
                  {{ workPageDetailes.workPageName }}
                </span>
                <span class="sub-title">
                  {{ workPageDetailes.workPageUserName }}
                </span>
              </div>
              <!-- <i class="far fa-flag chat-icon"></i> -->
            </div>
            <i class="pl-2 far fa-flag report-icon " @click="displayReport=true"></i>
          </div>
          <div v-if="selectedPageId === Math.abs(workPageDetailes.workPageId)" class="half-left">
            <Button aria-controls="overlay_menu" aria-haspopup="true" class="p-button-rounded p-button-text p-button-plain no-shadow" icon="pi pi-ellipsis-v" @click="toggle" />
            <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
          </div>
        </div>
        <div class="body smart-align-items">
          <p class="description w-100 smart-align-items text-one-line">
            {{ item.description }}
          </p>
          <span v-if="item.financialValue > 0">{{`${ $t('valueOfCommodity')} : ${$filters.currency(item.financialValue , item.currencyId == 0)}`}} <currency class="mx-2" :currencyId="item.currencyId" /> </span>
          <span class="smart-text-align preparation-time">
            <template v-if="item.productType != 3">
              {{`${$t("preparationTime")} : ${dayFormat(item.prepareTime) === ""? $t("ready"): dayFormat(item.prepareTime)}`}}
            </template>
            <Button v-if="item.giftCardCost > 0" class="gift-product-props-item no-shadow" icon="fas fa-gift font-22"
              @click="!dialogGift ? (dialogGift = true) : (dialogGift = false)" />
          </span>
          <div class="middle">
            <Button class="box no-shadow smart-text-align" type="button" @click="calculateWage()">
              <template v-if="isBuyer">
                <template v-if="item.productType == 3" > 
                  {{ uperValue > 0 ? $t("byRentingThisProductIWillGetUpers", { uper: uperValue, }) : $t("howMuchUperDoIGetByRentingThisProduct_seller")}}
                </template>
                <template v-else >
                  {{ uperValue > 0 ? $t("bySellingThisProductIWillGetUpers", { uper: uperValue, }) : $t("howMuchUperDoIGetBySellingThisProduct")}}
                </template>
              </template>
              <template v-else >
                <template v-if="item.productType == 3" > 
                  {{ uperValue > 0 ? $t("byRentingThisProductYouWillGetUpers", { uper: uperValue, }) : $t("howMuchUperDoIGetByRentingThisProduct")}}
                </template>
                <template v-else >
                  {{ uperValue > 0 ? $t("By buying this product you will get uper", { uper: uperValue, }) : $t("How much uper do I get if I buy this product?")}}
                </template>
              </template>
            </Button>
            <div class="left-side">
              <div class="d-flex flex-row">
                <template v-if="item.offPercent !== 0">
                  <p :class="item.offPercent > 0 ? 'text-line' : ''" class="price">
                    {{ $filters.currency(item.defaultPrice) }}
                  </p>
                  <p class="off">{{ item.offPercent }} %</p>
                </template>
              </div>
              <div class="d-flex flex-column">
                <div v-if="item.productType === 12" class="default-price">
                  <span>
                    <div class="label">{{ $t("cost") }} :</div>
                  </span>
                  <span>
                    <div class="value mx-1">{{ calculator() }}</div>
                  </span>
                  <span>
                    <Currency :currency-id="1" />
                  </span>
                </div>
                <div v-if="item.productType === 12 && item.uperPrice > 0" class="default-price">
                  <span>
                    <div class="label">{{ $t("costUper") }} :</div>
                  </span>
                  <span>
                    <div class="value mx-1">{{ calculatorUper() }}</div>
                  </span>
                  <span>
                    <Currency :currency-id="0" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="item.productType !== 12" class="footer">
            <div v-if="item.productType !== 1" class="percent">
              <span>
                {{
                `${$t("Reference percentage")} : % ${
                  item.returnedPercent ? item.returnedPercent : 0
                } `
              }}
              </span>
            </div>
            <div class="price-controller">
              <div v-if="item.defaultPrice > 0" class="price">
                <span>
                  <div class="label">{{ $t("cost") }} :</div>
                </span>
                <span>
                  <div class="value mx-1">{{ calculator() }}</div>
                </span>
                <Currency :currency-id="1" />
              </div>
              <div v-if="item.uperPrice > 0" class="price">
                <span>
                  <div class="label">{{ $t("costUper") }} :</div>
                </span>
                <span>
                  <div class="value mx-1">
                    {{ $filters.currency(item.uperPrice , true) }}
                  </div>
                </span>
                <Currency :currency-id="0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="workPageDetailes.workPageId" class="under-footer">
        <div v-if="selectedPageId !== Math.abs(workPageDetailes.workPageId)" class="cart-controller">
          <Button v-if="defaultNumber <= 0" :label="item.productType == 3 ? $t('rentProduct') :  item.productType == 4 ? $t('serviceRequest') : $t('buyProduct')" class="right-side no-shadow" @click="beforeAddToCard()" />
          <div v-else class="right-side">
            <div class="count-controller">
              <Button :disabled="defaultNumber === inventory(item)" class="p-button-rounded p-button-text no-shadow" icon="pi pi-plus" @click=" defaultNumber++; changeCont();" />
              <div class="input-controller">
                <span v-if="defaultNumber === inventory(item)">{{$t("maxReached")}}</span>
                <InputNumber id="propItemHorizontal" v-model="defaultNumber" :max="inventory(item)" @input="changeCont()" />
              </div>
              <Button :icon="defaultNumber === 1 ? 'pi pi-trash' : 'pi pi-minus'" class="p-button-rounded p-button-text no-shadow" @click="defaultNumber--; changeCont(); " />
              <div class="currency">
                <Currency :currency-id="item.currencyId" />
              </div>
            </div>
          </div>
          <div class="left-side p-ripple" v-ripple>
            <template v-if="isBuyer">
              <span>{{`${$t("originalCash")} : ${inventory(item)} ${$t("pieces")}`}}</span>
            </template>
            <template v-else>
              <template v-if="!item.defaultNumber && !item.uperNumber && defaultNumber == 0">
                  <span class="cp" @click="agreementPrice()">{{$t('agreementPrice')}}</span>
              </template>
              <template v-else >
                <span>{{`${$t("originalCash")} : ${inventory(item)} ${$t("pieces")}`}}</span>
              </template>
            </template>
          </div>
        </div>
        <div v-else class="header-product-props">
          <svg height="46.5" viewBox="0 0 246.667 46.5" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <path id="Path_2" class="bg"
              d="M345.333,201.167l-246.667-.5,7.507,5,7.827,6L118.333,218,122,224l6.667,10.5L134,239.833l7.333,4.333,9.667,3H296.667l7.5-1.583,4.333-1.417,8.5-6.333,1.667-2,4.667-6.5L328,218l4-5.167,4.667-4.333L341,204.167Z"
              data-name="Path 2" transform="translate(-98.667 -200.667)" />
          </svg>
          <div class="title">
            {{ `${$t("originalCash")} : ${inventory(item)} ${$t("pieces")}` }}
          </div>
          <div class="sub-title">
            {{`${$t("countSelledProduct")} ${item.selledNumbers} ${$t("pieces")}`}}
          </div>
        </div>
      </div>
      </div>
</template>

<script lang="ts">
import report from "@/app/public/shared/report/report.vue";
import {onMounted, reactive, ref} from "vue";
import Currency from "@/app/public/shared/currency/Currency.vue";
import { DateService } from "@/core/service/date.service";
import Menu from "primevue/menu";
import { i18n } from "@/main";
import { ProductState } from "@/app/unit/pages/workPage/products/show/state";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { PropRepository } from "@/core/repository/prop.repository";
import {getSelectedPageData, getSelectedPageId, WindowLoading} from "@/core/service/utils.service";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import router from "@/core/router/router";
import InputNumber from "primevue/inputnumber";
import { ProductRepository } from "@/core/repository/product.repository";
import { ShoppingCartUpdateItemsModel } from "@/data/city/product/product.model";
import {reportType} from "@/core/enum/enums";
import {useRoute} from "vue-router";
import Ripple from 'primevue/ripple';

export default {
  components: {
    report,
    Currency,
    Menu,
    ConfirmDialog,
    InputNumber,
  },
  directives: {
    'ripple': Ripple
  },
  props: {
    item: Object,
    workPageDetailes: Object,
    sellType:Number
  },
  setup: function (props,) {
    const route = reactive(useRoute());
    const productid = ref(route.params.productId)
    const propid = ref(props.item.propId);
    const reportTypeItem = ref(reportType.Page);
    const displayReport = ref(false);
    const userData = ref(getSelectedPageData());
    const state = ref(new ProductState());
    const menu = ref();
    const items = ref([]);
    const uperValue = ref(0);
    const dialogGift = ref(false);
    const confirm = useConfirm();
    const defaultNumber = ref(0);
    const selectedCurrencyType = ref(-1);
    const selectedPageId = ref(Math.abs(getSelectedPageId()));
    const dialogChooseCurrency = ref(false);
    const reoprtItem = ref(reportType.Prop);
    const isBuyer = ref(false)
    const customCostDialog = ref(false);

    onMounted(() => {
      if (props.item.defaultNumber) {
        defaultNumber.value = props.item.defaultNumber;
        selectedCurrencyType.value = 1;
      } else if (props.item.uperNumber) {
        defaultNumber.value = props.item.uperNumber;
        selectedCurrencyType.value = 0;
      }
      isBuyer.value = (getSelectedPageData().id == props.workPageDetailes.workPageId);
      console.log(props.item);
      
      if (props.workPageDetailes) {
        items.value.push({
          label: "Options",
          items: [
            {
              label: i18n.global.tc("delete"),
              icon: "far fa-trash-alt",
              command: () => {
                deleteConfirm();
              },
            },
            {
              label: i18n.global.tc("makeAmazing"),
              icon: "fas fa-gift",
              command: () => {
                router.push("/product/amazingProps");
              },
            },
            {
              label: i18n.global.tc("edit"),
              icon: "fas fa-edit",
              command: () => {
                router.push("/product/editproduct");
              },
            },
          ],
        });
      }
    });

    const deleteProp = () => {
      WindowLoading.value = true;
      PropRepository.getInstance().deleteProp({
        urlContent: {
          workPageId: -getSelectedPageId(),
          propId: props.item.propId,
        },
        onReceive: () => {
          WindowLoading.value = false;
        },
        onError: () => {
          WindowLoading.value = false;
        },
      });
    };

    const deleteConfirm = () => {
      confirm.require({
        message: i18n.global.tc("delete?"),
        icon: "fas fa-info-circle m-2",
        acceptLabel: i18n.global.tc("yes"),
        rejectLabel: i18n.global.tc("no"),
        acceptClass: "p-button-danger",
        accept: () => {
          deleteProp();
        },
      });
    };

    const getJalali = (date) => {
      return DateService.getInstance().convertToJalali(date, false);
    };

    const toggle = (event) => {
      menu.value.toggle(event);
    };
    
    function calculator() {
      return currencyFormat(
          formatPriceNumber(
              (props.item.defaultPrice ?? 0) - ((props.item.defaultPrice ?? 0) / 100) * (props.item.offPercent ?? 0)
          )
      );
    }
    function calculatorUper() {
      return currencyFormat(
          formatPriceNumber( (props.item.uperPrice ?? 0) - ((props.item.uperPrice ?? 0) / 100) * (props.item.offPercent ?? 0)),true
      );
    }

    const formatPriceNumber = (value) => {
      return DataFormatterService.getInstance().formatCurrency(value);
    };

    const dayFormat = (minute) => {
      return DateService.getInstance().secondsToString(minute * 60);
    };

    function getTime(date: Date) {
      if (date) {
        return String(date).split("T")[1].replace(":00", "");
      } else {
        return date;
      }
    }

    const currencyFormat = (value , decimalDigits = false) => {
      return DataFormatterService.getInstance().formatCurrency(value , decimalDigits);
    };

    function calculateWage() {
      let model = {
        wageId: props.item.defaultWagePlanId,
        value: props.item.defaultPrice,
        type: 1,
        isBuyer: true,
      };
      state.value.calculateWage(model, (val) => {
        uperValue.value = val;
      });
    }

    const inventory = (item) => {
      return Math.min(
          item.volumePerFactor == -1 ? 10000 : item.volumePerFactor,
          (item.quantity == -1 ? 10000 : item.quantity) - item.selledNumbers
      );
    };

    function beforeAddToCard() {
      
      defaultNumber.value = 0;
      if (props.item.uperPrice > 0 && props.item.defaultPrice > 0) {
        dialogChooseCurrency.value = true;
      } else if (props.item.uperPrice > 0 && (props.item.defaultPrice == null || props.item.defaultPrice == 0)) {
        defaultNumber.value = 1;
        selectedCurrencyType.value = 0;
        changeCont();
      } else if ((props.item.uperPrice == null || props.item.uperPrice == 0) && props.item.defaultPrice > 0) {
        defaultNumber.value = 1;
        selectedCurrencyType.value = 1;
        changeCont();
      }
    }

    const addToCart = (CurrencyType) => {
      defaultNumber.value = 1;
      selectedCurrencyType.value = CurrencyType;
      dialogChooseCurrency.value = false;
      changeCont();
    }

    const agreementPrice = () => {
      switch (props.sellType) {
        case 1:
           router.push(`/faceToFaceCustomProduct/${Math.abs(props.workPageDetailes.workPageId)}`);
          break;
        case 2:
           router.push(`/inPersonCustomProduct?proId=${props.item.propId}&pId=${props.item.productId}&wId=${Math.abs(props.workPageDetailes.workPageId)}`);
          break;
        case 3:
          customCostDialog.value = true;
          break;
      }
    }

    function changeCont() {
      ProductRepository.getInstance().ShoppingCartUpdateItems({
        body: <ShoppingCartUpdateItemsModel>{
          sellerWorkPageId: Number(Math.abs(props.workPageDetailes.workPageId)),
          buyerPageId: getSelectedPageId(),
          propId: Number(props.item.propId),
          numbers: defaultNumber.value,
          currencyId: selectedCurrencyType.value,
        },
      });
    }

    return {
      reoprtItem,
      productid,
      propid,
      displayReport,
      reportTypeItem,
      userData,
      formatPriceNumber,
      calculator,
      dayFormat,
      items,
      menu,
      toggle,
      state,
      uperValue,
      calculatorUper,
      calculateWage,
      inventory,
      dialogGift,
      getTime,
      getJalali,
      deleteConfirm,
      currencyFormat,
      isBuyer,
      defaultNumber,
      changeCont,
      selectedPageId,
      beforeAddToCard,
      addToCart,
      dialogChooseCurrency,
      agreementPrice,
      customCostDialog
    };
  },
};
</script>

<style lang="scss" scoped>
.report-bar{display:flex;
flex-direction: row;
  justify-content: space-around;
}
.main-prop-item-controller {
  padding: 30px 0 49px;
}

.full-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  min-height: 240px;
  max-width: 100%;
  padding: 5px;
  color: #212121;
  margin: 8px 2px 0;
  position: relative;
  .header {
    display: flex;
    position: absolute;
    top: -40px;
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
  .header-secondSliderItem {
    display: flex;
    flex-direction: row;
    box-shadow: 0 2px 0 #eee;
    padding: 5px 0;

    .half-right {
      display: flex;
      flex-direction: row;
      flex: 80%;

      img {
        border-radius: 50%;
        width: 45px;
        height: 45px;
        
      }

      img {
        width: 45px;
        height: 45px;
        border-radius: 30px;
        margin: 0 5px;
         &.creditLevel {
              position: absolute;
              width: 20px;
              height: 20px;
              margin-top: 30px;
              margin-right: 30px;
              background-color: #fff;
            }
      }

      .head-title {
        font-size: 14px;
        display: block;
        overflow: hidden;
        margin-bottom: 4px;
      }

      .sub-title {
        font-size: 13px;
        display: block;
        overflow: hidden;
        margin-bottom: 4px;
      }
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    padding: 8px;

    .description {
      color: #212121 !important;
      font-size: 15px;
      text-align: start;
    }

    span {
      color: #686868;
      font-size: 14px;
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    .preparation-time {
      display: flex;
      min-height: 38px;
      width: 100%;
    }

    .middle {
      display: flex;
      flex-direction: row;
      margin: 20px 0 8px;
      width: 100%;
      align-items: center;

      .box {
        background: #eeee;
        color: #212121;
        border: 2px solid #a9a9a9;
        padding: 3px 5px;
        border-radius: 8px;
        font-size: 14px;
        display: flex;
        flex: 100%;
      }

      .left-side {
        display: flex;
        flex-wrap: wrap;
        flex: 50%;
        justify-content: space-between;
        @media (max-width: 576px) {
          flex: 100%;
        }

        .price {
          color: #b5b5b5;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          font-size: 14px;
          max-height: 25px;
        }

        .text-line {
          text-decoration: line-through;
        }

        .off {
          background: #da3343;
          color: #fff;
          border-radius: 7px;
          padding: 1px 5px;
          font-size: 14px;
          display: flex;
          margin: 0 10px 0 0;
          justify-content: center;
          direction: ltr;
          max-height: 25px;
        }
      }

      .default-price {
        display: flex;
        flex-direction: row;
        flex: 50%;
        padding: 0 8px 5px;
        align-items: flex-end;

        .label {
          font-size: 13px;
          color: #686868;
        }

        .value {
          color: #686868;
          font-size: 14px;
          margin: auto;
        }
      }
    }

    .footer {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding: 5px;

      .percent {
        font-size: 16px;
        color: #212121;
        display: flex;
        flex: 50%;
      }

      .price-controller {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex: 50%;

        .price {
          display: flex;
          flex-direction: row;
          flex: 50%;

          .label {
            font-size: 14px;
            color: #686868;
          }

          .value {
            color: #212121;
            font-size: 14px;
            margin: auto;
          }

          img {
            width: 18px;
          }
        }
      }
    }
  }
}

p {
  font-size: 14px !important;
}

span {
  font-size: 14px !important;
}
.report{    padding: 6px 250px 12px 10px}
//.chat-icon{}
.report-icon{
  font-size: 22px;
  margin:6px;
  cursor:pointer;
}
.header-product-props {
  display: flex;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 3px;
  z-index: 10;

  .bg {
    fill: #fadadd;
  }

  .title {
    position: absolute;
    top: 2px;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }

  .sub-title {
    position: absolute;
    top: 24px;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
}

.header-product-props-dialog {
  display: flex;
  width: 100%;
  position: absolute;
  left: 0;
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

.main-item-control {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 470px;
  position: absolute;
  width: 100%;
  top: 11px;

  @media (max-width: 500px) {
    max-width: 360px;
  }

  .date {
    position: absolute;
    font-size: 13px;
    color: #fafafa;
    left: 57% !important;
    padding-top: 5px;
  }

  .from {
    position: absolute;
    left: 53% !important;
    padding-top: 2px !important;
  }

  .startTime {
    position: absolute;
    font-size: 13px;
    color: #fafafa;
    left: 43%;
    padding-top: 5px;
  }

  .to {
    position: absolute;
    left: 37% !important;
    padding-top: 2px !important;
  }

  .endTime {
    right: 65%;
  }

  .p-button-plain {
    background: #fff;
    box-shadow: 0 0 3px #b5b5b5 !important;

    .left-side {
      display: flex;
      flex: 20%;

      .p-button {
        position: relative;
        z-index: 10;
      }
    }

    .right-side {
      display: flex;
      flex-direction: column;
      flex: 80%;
      padding: 10px;

      span.label {
        margin-bottom: 10px;
        color: #686868;
        font-size: 14px;

        span.value {
          color: #212121;
          font-size: 14px;
          margin: 0 5px;
        }
      }
    }
  }

  .head-title-folder {
    fill: #f55;
  }
}

.cart-controller {
  display: flex;
  flex-direction: row;
  padding: 0 2px 0 8px;
  height: 43px;
  max-height: 43px;

  .right-side {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-radius: 0 0 8px 0;
    background: #43a9b5;
    color: #fff;
    width: 50%;
    padding: 2px 0;
    border: none;

    .count-controller {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .input-controller {
        width: 40%;
        display: flex;
        flex-direction: column;
        color: #fff;

        span {
          text-align: center;
          font-size: 12px !important;
        }
      }

      img {
        width: 20%;
      }

      button {
        color: #fff !important;
        width: 20%;
      }
    }
  }

  .left-side {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-bottom-left-radius: 8px;
    background: #ffbc2d;
    color: #212121;
    width: 50%;
    padding: 10px;
  }
}

::v-deep(.p-dialog-content) {
  border-radius: 10px !important;
}

::v-deep(.p-button.p-component.p-button-icon-only.p-inputnumber-button.p-inputnumber-button-up.p-button-success) {
  background: transparent !important;
  border: none;
  color: #fff;
  position: relative;
  left: 20px;
}

::v-deep(.p-button.p-component.p-button-icon-only.p-inputnumber-button.p-inputnumber-button-down.p-button-danger) {
  background: transparent;
  border: none;
  position: relative;
  right: 20px;
}

.gift-product-props-item {
  color: #ffbc2d !important;
  background: transparent !important;
  border: none;
}

.border-bottom-r-0 {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.main-choose-currency-controller {
  display: flex;
  flex-direction: column;

  p {
    padding: 20px 10%;
    font-size: 16px !important;
    text-align: center;
  }

  .controller {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;

    .child {
      display: flex;
      flex-direction: row;
      cursor: pointer;
      border-radius: 5px 45% 45% 5px;
      background: #1ebe8d;
      width: 45%;
      margin-left: 10px;
      padding: 10px 18px 10px 10px;
      max-height: 70px;

      .left-side {
        .price {
          color: #fff;
          text-align: center;
        }

        .label {
          text-align: center;
          font-size: 13px;
        }
      }

      .right-side {
        display: flex;
        align-items: center;
        position: relative;
        left: 8px;
      }

      &:last-child {
        border-radius: 45% 5px 5px 45%;
        background: #47a6e0;
        width: 45%;
        padding: 10px 10px 10px 15px;
        max-height: 70px;

        .right-side {
          position: relative;
          left: -8px !important;
        }
      }

      &:hover {
        &:first-child {
          background: #1ebe8ea4;
        }

        &:last-child {
          background: #47a5e0a4;
        }
      }
    }
  }
}

.creditLevel {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-top: 30px;
    margin-right: 25px;
    background-color: #fff;
  }

.cp {
  position: relative;
  z-index: 2;
}

.box-chose {
  display: flex;
  flex-direction: column;
  width: 100%;
  button {
    width: 100%;
    font-size: 14px;
  }
  .p-button-label {
    text-align: right;
  }
}
</style>
