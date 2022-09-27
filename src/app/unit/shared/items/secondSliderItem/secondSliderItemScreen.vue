<template>
  <div>
    <div class="full-card ml-2">
      <div class="header-secondSliderItem">
        <div class="half-right">
          <img v-lazy="workPageDetailes.workPageProfileImageUrl + '_sm.webp'" alt="image">
          <div class="d-flex flex-column justify-content-center">
                            <span class="head-title">
                                {{ workPageDetailes.workPageName }}
                            </span>
            <span class="sub-title">
                                {{ workPageDetailes.workPageUserName }}
                            </span>
          </div>
        </div>
        <div class="half-left">
          <Button aria-controls="overlay_menu" aria-haspopup="true"
                  class="p-button-rounded p-button-text p-button-plain no-shadow" icon="pi pi-ellipsis-v"
                  @click="toggle"/>
          <Menu id="overlay_menu" ref="menu" :model="items" :popup="true"/>
        </div>
      </div>
      <div class="body smart-align-items">
        <span class="description">{{ item.description }}</span>
        <span>{{ `${$t('preparationTime')} ${dayFormat(item.prepareTime)}` }}</span>
        <div class="middle">
          <Button class="box no-shadow smart-text-align" type="button" @click="calculateWage()">
            {{
              uperValue > 0 ? $t("By buying this product you will get uper", {uper: uperValue}) : $t("How much uper do I get if I buy this product?")
            }}
          </Button>
          <p :class="item.offPercent > 0 ? 'text-line' :''" class="price">{{ formatPriceNumber(item.defaultPrice) }}</p>
          <p class="off">{{ item.offPercent }} %</p>
        </div>
        <div class="footer">
          <div class="percent">
            {{ `${$t('Reference percentage')} : ${item.returnedPercent}` }}
          </div>
          <div class="price">
            <div class="label">{{ $t('cost') }} :</div>
            <div class="value">{{ calculator() }}</div>
            <Currency :currency-id="1"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {priceFormat, WindowLoading} from "@/core/service/utils.service";
import {onMounted, ref} from "vue";
import Currency from "@/app/public/shared/currency/Currency.vue";
import {DateService} from '@/core/service/date.service';
import Menu from 'primevue/menu';
import {i18n} from '@/main';
import {secondSliderItemState} from './secondSliderItemState'

export default {
  components: {
    Currency,
    Menu,
  },
  emits: ['deleteSecondSliderItem'],

  props: {
    item: Object,
    workPageDetailes: Object,
  },
  setup(props, {emit}) {
    const state = ref(new secondSliderItemState());
    const menu = ref();
    const items = ref([]);
    const uperValue = ref(0);

    onMounted(() => {
      if (props.workPageDetailes) {
        items.value.push({
          label: 'Options',
          items: [{
            label: i18n.global.tc('update'),
            icon: 'fas fa-pencil-alt',
            command: () => {
            }
          },
            {
              label: i18n.global.tc('delete'),
              icon: 'far fa-trash-alt',
              command: () => {
                emit('deleteSecondSliderItem', {
                  data: {
                    workPageId: props.workPageDetailes.workPageId,
                    propId: props.item.propId
                  }
                })
              }
            },
            {
              label: i18n.global.tc('makeAmazing'),
              icon: 'fas fa-gift',
              command: () => {

              }
            }
          ]
        })
      }
    })


    const toggle = (event) => {
      menu.value.toggle(event);
    };

    function calculator() {
      return priceFormat((props.item.defaultPrice ?? 0) - (((props.item.defaultPrice ?? 0) / 100) * (props.item.offPercent ?? 0)));
    }

    const formatPriceNumber = (value) => {
      return priceFormat(value);
    };

    const dayFormat = (hour) => {
      return DateService.getInstance().hoursTodays(hour);
    };


    function calculateWage() {
      WindowLoading.value = true;
      let model = {
        wageId: props.item.defaultWagePlanId,
        value: props.item.defaultPrice,
        type: 1,
        isBuyer: true,
      };
      state.value.calculateWage(model, (val) => {
        WindowLoading.value = false;
        uperValue.value = val;
      });
    }


    return {
      formatPriceNumber,
      calculator,
      dayFormat,
      items,
      menu,
      toggle,
      state,
      uperValue,
      calculateWage,
    };
  },
};
</script>

<style lang="scss" scoped>

.full-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 5px;
  max-width: 450px;
  padding: 5px;
  color: #212121;
  box-shadow: 0 0 3px #b5b5b5;
  margin: 10px 0;

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
    }

    span {
      color: #686868;
      font-size: 14px;
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
        padding: 8px 5px;
        border-radius: 8px;
        font-size: 14px;
        display: flex;
        flex: 65%;
      }

      .price {
        font-size: 16px;
        color: #b5b5b5;
        display: flex;
        flex: 20%;
        margin-right: 5px;
        justify-content: center;
        align-items: center;
        margin-bottom: 0;
      }

      .text-line {
        text-decoration: line-through;
      }

      .off {
        background: #da3343;
        color: #fff;
        border-radius: 8px;
        padding: 5px;
        display: flex;
        flex: 10%;
        margin: 0;
      }

    }

    .footer {
      display: flex;
      flex-direction: row;
      margin: 10px 0 8px;
      width: 100%;
      padding: 5px;

      .percent {
        font-size: 16px;
        color: #212121;
        display: flex;
        flex: 50%


      }

      .price {
        display: flex;
        flex-direction: row;
        flex: 50%;

        .label {
          font-size: 14px;
          color: #686868;
        }

        .value {
          color: #04aa6d;
          font-size: 16px;
          margin: auto;
        }
      }

    }

  }
}
</style>
