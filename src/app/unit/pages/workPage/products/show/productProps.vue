<template>
  <ConfirmDialog></ConfirmDialog>
  <div class="d-flex justify-content-between align-items-center mt-2">
    <Button
      v-if="isMine"
      :label="$t('addProp')"
      class="p-button-sm p-button-raised p-button-danger p-button-rounded"
      @click="() => {}"
    />
    <Button
        :label="$t('showAll')"
        class="p-button-sm p-button-raised p-button-danger p-button-rounded"
    />
  </div>

  <div class="card-align">
    <Swiper
      :direction="'horizontal'"
      :free-mode="true"
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :slides-per-view="'auto'"
      :space-between="12"
    >
      <SwiperSlide v-for="(prop, index) in propList" :key="prop">

        <productPropItem :item="propList[index]" :sellType="sellType" :workPageDetailes="creator" />

      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang='ts'>
import Currency from "@/app/public/shared/currency/Currency.vue";
import productPropItem from "./productPropItem.vue";
import { reactive, ref } from "vue";
import ConfirmDialog from "primevue/confirmdialog";
import { Swiper, SwiperSlide } from "swiper/vue";
import { getSelectedPageId } from "@/core/service/utils.service";

export default {
  components: {
    ConfirmDialog,
    Currency,
    productPropItem,
    Swiper,
    SwiperSlide,
  },
  name: "slider",
  props: {
    propList: Array,
    creator: Object,
    wpId: Number,
    sellType:Number
  },
  setup(props) {
    const propList = reactive(props.propList);
    const creator = reactive(props.creator);
    const isMine = ref(props.creator.workPageId == getSelectedPageId());

    return {
      propList,
      creator,
      isMine,
    };
  },
};
</script>

<style lang="scss">
</style>

