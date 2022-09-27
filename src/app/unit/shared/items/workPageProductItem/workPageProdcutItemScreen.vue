<template>
  <div>
    <Dialog
      v-model:visible="state.dialog"
      :contentStyle="{ 'border-radius': '10px' }"
      :modal="true"
      :showHeader="false"
      :style="{ width: '400px', 'max-width': '500px' }"
      dismissableMask
    >
      <div class="main-product-title-menu">
        <div
          v-for="item in menu"
          :key="item"
          v-ripple
          class="item-menu p-ripple"
          @click="item.command"
        >
          <span class="smart-text-align">
            <i :class="item.icon" class="smart-text-align"></i>
            {{ item.label }}
          </span>
        </div>
      </div>
    </Dialog>
    <div class="main-item-controller">
      <div class="img-controller">
        <Button v-if="menu.length && product.productStatus !== 3" class="p-button-rounded p-button-text p-button-plain"
          icon="pi pi-ellipsis-v" @click="state.dialog = true" />
            <img v-lazy="product.mainImageUrl + '_sm.webp'" @click="goToPreviewProduct()" alt="" src="" />
            <div v-if="product.productStatus === 2" class="modified-at checking">
          <span>{{ $t("checking") }}</span>
        </div>
        <div v-if="product.productStatus === 3" class="modified-at expired">
          <span>{{DateService.getInstance().dayTimeDifference(product.modifiedAt)}}{{ $t("daysToRemove") }}</span>
        </div>
      </div>
      <div class="title smart-text-align" @click="goToPreviewProduct()">
        <span>{{ product.name }}</span>
      </div>
      <div class="footer" @click="goToPreviewProduct()">
        <div class="right-side">
          <i class="pi pi-star"></i>
          <span>{{
            product.average ? formatChange(product.average) : 2.5
          }}</span>
        </div>
        <div class="left-side">
          <template v-if="product.defaultPrice > 0">
            <!-- اگر مبلغ وجود داشت -->
            <div v-if="product.offPercent > 0" class="off">
              <!-- اگر تخفیف وجود داشت -->
              <span>{{ formatCurrency(product.defaultPrice) }}</span>
              <span>{{ product.offPercent }} %</span>
            </div>
            <div class="price">
              <span>{{ formatCurrency(calculator()) }}</span>
              <Currency :currencyId="product.currencyId" />
            </div>
          </template>
          <template v-else>
            <template v-if="product.productType > 4">
              <Advertise :type="1" />
            </template>
            <template v-else>
              <Advertise :type="2" />
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Currency from "@/app/public/shared/currency/Currency.vue";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { DateService } from "@/core/service/date.service";
import Advertise from "@/app/unit/shared/items/svgItemControllerScreen.vue";
import { useConfirm } from "primevue/useconfirm";
import { i18n } from "@/main";
import {getSelectedPageId, slugify} from "@/core/service/utils.service";
import { WorkPageProductItem } from "./workPageProductItemState";
import Ripple from "primevue/ripple";
import { onMounted, ref } from "vue";
import router from "@/core/router/router";

export default {
  components: {
    Currency,
    Advertise,
  },
  directives: {
    ripple: Ripple,
  },
  props: {
    product: Object,
    workPage: Number,
  },
  emit: ["refresh"],
  setup(props, { emit }) {
    const confirm = useConfirm();
    const state = ref(new WorkPageProductItem());
    const dateService = ref(new DateService());
    const formatCurrency = (value) => {
      return DataFormatterService.getInstance().formatCurrency(value);
    };

    const menu = ref([]);
    onMounted(() => {
      menu.value = [
        {
          icon: "pi pi-trash",
          label: i18n.global.tc("delete"),
          check: () => true,
          command: () => {
            removeProduct(props.product.productId);
          },
        },
      ];
    });
    const formatChange = (value) => {
      let fixNumber: any = value;
      return Math.round((fixNumber + Number.EPSILON) * 10) / 10;
    };

    function calculator() {
      return (
        (props.product.defaultPrice ?? 0) -
        ((props.product.defaultPrice ?? 0) / 100) *
          (props.product.offPercent ?? 0)
      );
    }

    const goToPreviewProduct = () => {
      if (props.workPage) {
        router.push(
          `/product/${props.product.productId}/${Math.abs(props.workPage)}/${slugify(props.product.name)}`
        );
      }
    };

    const getExpire = (date) => {
      return DataFormatterService.getInstance().expireDate(date);
    };
    //todo: in check beshe
    const removeProduct = (Id) => {
      confirm.require({
        message: i18n.global.tc("deleteProducttMessage"),
        // header: i18n.global.tc("delete"),
        icon: "pi pi-exclamation-triangle",
        acceptLabel: i18n.global.tc("yes"),
        rejectLabel: i18n.global.tc("cancel"),
        accept: () => {
          state.value.deleteProduct(Id, Math.abs(getSelectedPageId()), () => {
            emit("refresh", true);
          });
        },
      });
    };

    return {
      formatChange,
      formatCurrency,
      getExpire,
      calculator,
      removeProduct,
      state,
      menu,
      goToPreviewProduct,
      DateService,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-item-controller {
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 0 5px #b5b5b5;
  border-radius: 8px;

  .img-controller {
    display: flex;

    img {
      width: 100%;
      max-height: 240px;
      border-radius: 8px 8px 0 0;
    }

    button {
      position: absolute;
      z-index: 20;
      top: 2px;
      right: 10px;
      background: transparent !important;
      transition: 0.5s;
      color: #686868 !important;
      box-shadow: none !important;

      &:hover {
        border: 1px solid #b5b5b5b5;
        transition: 0.5s;
      }
    }

    .expired {
      background: #eb0706;
    }

    .checking {
      background: #1564c0 !important;
    }

    .modified-at {
      position: absolute;
      z-index: 2;
      padding: 6px;
      width: 90%;
      color: #fff;
      text-align: center;
      font-size: 13px;
      border-radius: 8px;
      right: 5%;
      top: 45%;

      @media (min-width: 360px) and (max-width: 420px) {
        top: 50%;
      }

      @media (min-width: 420px) {
        top: 58%;
      }
    }
  }

  .title {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding: 10px 10px 0;
  }

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 10px 10px;

    .right-side {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 50%;

      i {
        color: #ffd600;
        padding: 10px 5px 10px 10px;
        font-size: 20px;
      }

      span {
        color: #686868b2;
        margin-right: 4px;
        font-size: 14px;
      }
    }

    .left-side {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;

      .off {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        span {
          &:last-child {
            background: #f44336;
            padding: 5px;
            color: #fff;
            font-size: 13px;
            text-align: center;
            border-radius: 10px;
            height: 26px;
            width: 42px;
            direction: ltr;
          }

          &:first-child {
            padding: 5px;
            color: #b5b5b5;
            -webkit-text-decoration-line: line-through; /* Safari */
            text-decoration-line: line-through;
            font-size: 13px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .price {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        font-size: 14px;
        color: #212121;
        margin-top: 5px;
      }
    }
  }
}

.main-product-title-menu {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;

  .item-menu {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    cursor: pointer;

    span {
      display: flex;

      i {
        display: flex;
        font-size: 20px;
        position: relative;
        top: 2px;
        margin: 0 5px;
        width: 100%;
      }
    }
  }
}

::v-deep(.price) {
  img {
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
}
</style>
