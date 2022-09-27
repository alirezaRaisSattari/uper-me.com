<template>
  <div v-if="selectedTab === 1" class="">
    <div
        v-for="product in state.allProducts"
        :key="product"
        class="bg-light d-flex p-2 product mt-3 uper-card-1"
    >
      <div>
        <img v-lazy="product.imageUrl + '_sm.webp'" class="product-img m-1" />
      </div>
      <div class="smart-text-align mx-2">
        <div>{{ product.name }}</div>
        <div class="d-flex smart-text-align my-1">
          <div class="green">{{ product.cost }}</div>
          <Currency :currencyId="product.currencyId" class="mx-2" />
        </div>
        <div>{{ $t("stationNumber") }} :{{ product.place }}</div>
        <div>
          {{
            DateService.getInstance().convertToJalali(
                product.createDate,
                true
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { UpgradedState } from "@/app/unit/product/upgraded/upgradedState";
import Currency from "@/app/public/shared/currency/Currency.vue";
import { DateService } from "@/core/service/date.service";

export default {
  components:{Currency},
  // name: storyproducts
  props: ["pageId"],
  setup(props){

    const selectedTab = ref(1);
    const state = ref(new UpgradedState());
    const storysId = ref();
    const storyDialog = ref(false);
    const setTime = ref();
    const barWidth = ref(1);

    function selectPostTab() {
      // products
      if (selectedTab.value != 1) {
        selectedTab.value = 1;
        state.value.skipProduct = 0;
        state.value.getForBuyer(false); // isScroll==false --> first time
      }
    }
    onMounted(() => {
      state.value.getForBuyer(false); // isScroll==false --> first time
    });
    return{
      selectedTab,
      storyDialog,
      barWidth,
      storysId,
      state,
      selectPostTab,
      DateService,
      // endShowSrory,
      // moveprogress,
    }

  }
}
</script>

<style scoped>

</style>