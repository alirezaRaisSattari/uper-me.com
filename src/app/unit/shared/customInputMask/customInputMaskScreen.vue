<template>
  <div :style="{'background':color,'border-radius':'5px'}" class="d-flex flex-row w-100 overflow-hidden">
    <template v-for="item in list" :key="item.id">
      <div :style="{width:item.id === null ? '50%' :'','padding-bottom':item.id === null ?'40px':''}">
        <div v-if="item.option == 9" class="d-flex flex-column">
          <label :class="item.label !== '' ? 'pt-2': 'py-3'" :for="id + item.id"
                 class="text-center">{{ item.label }}</label>
          <input v-if="item.id !== null" :id="id + item.id" v-model="item.value" class="input-style" placeholder="-"
                 type="number" @input="checkValue(item)">
        </div>
        <div v-else class="d-flex flex-column">
          <label :class="item.label !== '' ? 'pt-2': 'py-3'" :for="id+ item.id"
                 class="text-center">{{ item.label }}</label>
          <input v-if="item.id !== null" :id="id+ item.id" v-model="item.value" class="input-style" placeholder="-"
                 type="text" @input="checkValue(item)">
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import InputNumber from 'primevue/inputnumber';
import {InputMaskModel} from '@/data/city/workpage/inputMask.model';

export default {
  components: {
    InputNumber
  },
  emits: ['callBackMask'],
  props: ['maskList', 'color', 'id'],
  setup(props, {emit}) {

    const list = ref(<InputMaskModel[]>[])
    onMounted(() => {
      list.value = props.maskList;
    })

    function checkValue(item: InputMaskModel) {
      if (item.option == 9) {
        list.value[item.id].value = Number(item.value)
        if (Number(item.value) <= 9 && Number(item.value) >= 0) {
          if (Number(item.value) === 0) {
            list.value[item.id].value = 0;
            return;
          }

        } else {
          list.value[item.id].value = 0;
          return
        }
      } else {
        if (item.value >= 0 || item.value < 0) {
          list.value[item.id].value = '';
          return;
        } else {

          if (String(item.value).length > 1 && String(item.value) !== 'الف') {
            list.value[item.id].value = String(item.value).charAt(0);
            return;
          }
        }

      }

      if (props.maskList.length - 1 != Number(item.id)) {
        const newId = Number(item.id) + 1;
        document.getElementById(props.id + newId).focus();
      } else {
        const newId = Number(item.id);
        document.getElementById(props.id + newId).blur();
      }

      emit('callBackMask', list.value)
    }


    return {checkValue, list}
  }
}
</script>

<style lang="scss" scoped>
.input-style {
  width: 100% !important;
  height: 40px !important;
  font-size: 20px !important;
  color: #212121;
  text-align: center;
  text-decoration: none;
  background: transparent;
  border: none;
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
