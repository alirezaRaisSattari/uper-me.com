<template>
  <date-picker v-model="date" :editable="true" :show="show"
               compact-time element="my-custom-editable-input" type="datetime" @close="onClose"></date-picker>
</template>

<script lang="ts">
import DatePicker from 'vue3-persian-datetime-picker'
import {ref} from 'vue';

export default {
  props: {
    show: Boolean
  },
  emits: ['callBackDate'],
  components: {DatePicker},
  setup(props, {emit}) {
    const date = ref('')

    function onClose(picker) {
      emit('callBackDate', date.value)
    }

    return {onClose, date}
  }
}
</script>

<style lang="scss">

</style>
