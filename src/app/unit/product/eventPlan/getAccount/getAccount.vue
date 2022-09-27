<template>
  <loading v-if="state.loading" class="mt-4"/>
  <div
      v-if="state.accounts != null"
      class="d-flex flex-wrap justify-content-between"
  >
    <swiper
        :direction="'horizontal'"
        :free-mode="false"
        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
        :slides-per-view="'auto'"
        :space-between="0"
        class="slider w-100"
    >
      <swiper-slide
          v-for="(account, index) in state.accounts"
          :key="index"
          class="pt-2 d-flex justify-content-center px-4"
      >
        <div
            :class="selectStyle === index ? 'selected' : ''"
            class="d-flex flex-column p-3 main-card width48 my-2"
            @click="selectedAccount(account, index)"
        >
          <div class="d-flex justify-content-center">
            <p
                v-if="selectStyle === index"
                class="
                rounded-circle
                text-light
                d-flex
                align-items-center
                justify-content-center
                px-2
                bg-color
              "
            >
              <i class="fas fa-check"></i>
            </p>
            <p class="btn rounded text-light mx-1 bg-color">
              {{ account.title }}
            </p>
            <span class="mt-2">{{ $t("mainAccountType") }}</span>
          </div>
          <p class="w-100 text-center ltr">
            {{ formatAccNumber(account.accountNumber) }}
          </p>
          <div class="w-100 text-right">
            {{ formatPriceNumber(account.originalCash) }}
            <currency :currencyId="account.currencyId" class="mb-1"></currency>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import currency from "@/app/public/shared/currency/Currency.vue";
import {getAccount} from "./getAccountState";
import {Swiper, SwiperSlide} from "swiper/vue";
import {ref, onMounted, watch} from "vue";
import {
  accountNumberFormat,
  getSelectedPageId,
  priceFormat,
} from "@/core/service/utils.service";

export default {
  props: {
    currencyId: {
      type: Number,
      required: true,
    },
  },
  emits: ["getInfo"],
  components: {currency, Swiper, SwiperSlide},
  setup(props, {emit}) {
    const state = ref(new getAccount());
    const selectedAccountInfo = ref({});
    const selectStyle = ref();
    const formatAccNumber = (value) => {
      return accountNumberFormat(value);
    };
    const formatPriceNumber = (value) => {
      return priceFormat(value);
    };

    function getAccounts() {
      let model = {
        pageId: getSelectedPageId(),
        accountType: null,
        currencyId: props.currencyId,
      };
      state.value.getAccount(model);
    }

    function selectedAccount(obj, index) {
      selectedAccountInfo.value = {...obj};
      selectStyle.value = index;
      emit("getInfo", selectedAccountInfo.value);
    }

    watch(
        () => state.value.selectSelected,
        (e) => {
          if (e == true) {
            selectedAccount(state.value.accounts[0], 0);
          }
        }
    );

    onMounted(() => {
      getAccounts();
    });
    return {
      state,
      formatAccNumber,
      formatPriceNumber,
      selectedAccount,
      selectStyle,
    };
  },
};
</script>

<style scoped>
.width48 {
  width: 300px;
}

.main-card {
  box-shadow: 1px 1px 4px #80808052;
  border-radius: 10px;
}

.bg-color {
  background: #1264bd;
}

.selected {
  border: 2px solid #1264bd;
}
</style>
