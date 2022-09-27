<template>
  <div>
    <div class="row m-0">
      <div class="col-6  my-2">
        <Button
            :class="[{ 'active-btn': seller.position === 0 }, '']"
            :icon="seller.position === 0 ? 'fas fa-check' : ''"
            :label="$t('toman')"
            class="p-button-raised p-button-secondary w-100" iconPos="right"
            @click="onSend(0)"/>
      </div>
      <div class="col-6  my-2">
        <Button
            :class="[{ 'active-btn': seller.position === 1 }, '']"
            :icon="seller.position === 1 ? 'fas fa-check' : ''"
            :label="$t('uper')"
            class="p-button-raised p-button-secondary w-100" iconPos="right"
            @click="onSend(1)"/>
      </div>
      <div class="col-12">
        <p class="text-center mt-2 mb-1">{{ $t('sellerParagraphDialog') }}</p>
      </div>
      <template v-if="seller.isReady === true">
        <div class="col-12">
          <template v-if="seller.position === 0">
            <toman :data="seller.dataList[1].data" @sendData="(event) =>seller.saveData(event)"/>
          </template>
          <template v-else-if="seller.position === 1">
            <uper :data="seller.dataList[0].data" @sendData="(event) =>seller.saveData(event)"/>
          </template>
          <div v-if="seller.dataList[1].data !== null || seller.dataList[0].data !== null"
               class="col-12 text-center dl  my-2 px-0">
            <Button :label="$t('submitAll')" :loading="seller.loading"
                    class="col-4 p-button-raised p-button-success " @click="seller.onSubmitAll()"/>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

import {onMounted, ref} from 'vue';
import toman from './toman/tomanSellerSendScreen';
import uper from './uper/uperSellerSendScreen';
import {sellerSendState} from './sellerSendState';

export default {
  components: {
    toman,
    uper,
  },
  props: {
    data: Object,
  },
  emits: ['sendData'],
  setup(props, {emit}) {

    onMounted(() => {
      seller.value.pushData(props.data);
    });

    const seller = ref(new sellerSendState((newItem) => {
      emit('sendData', {step: 2, postData: newItem});
    }));

    function onSend(position) {
      seller.value.position = position;
      seller.value.mainDialog = true;
    }

    return {
      seller,
      onSend,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>