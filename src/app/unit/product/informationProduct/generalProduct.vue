<template>
  <div v-for="item of data" v-if="data!==null"
       class="d-flex justify-content-between align-items-center box-hover p-2" @click="itemGeneralProduct(item)">
    <div class="d-flex justify-content-end align-items-center">
      <img v-lazy="item.mainImageUrl" alt="photo" class="rounded-circle border" style="width: 50px;height: 50px">
      <p class="mb-0 mx-2">{{ item.name }}</p>
    </div>
    <Checkbox v-model="item.vmodel" :binary="true"/>
  </div>
  <div v-else class="row justify-content-center align-items-center border shadow-sm p-3 m-2">
    <p class="mb-0">محصول همگانی وجود ندارد</p>
  </div>
</template>

<script lang="ts">
import Checkbox from 'primevue/checkbox';
import {ref} from "vue";
import {InformationProductModel} from "@/app/unit/product/informationProduct/InformationProductModel";

export default {
  name: "generalProduct",
  components: {
    Checkbox
  },
  props: ['data'],
  emits: ['passData'],
  setup(props, {emit}) {
    const objInformationProduct = ref(new InformationProductModel())

    function itemGeneralProduct(itemGeneralProduct) {
      itemGeneralProduct.vmodel = true;
      emit('passData', {display: false, detailId: itemGeneralProduct.detailId});
    }

    return {
      itemGeneralProduct
    }

  }
}
</script>

<style lang="scss" scoped>
.box-hover:hover {
  transition: 0.3s ease-in;
  box-shadow: 0 0 10px 1px lightgray;
  border-radius: 5px;
  cursor: pointer;
  background-color: #a4beff;
}
</style>