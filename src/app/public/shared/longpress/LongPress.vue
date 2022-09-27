<template>

  <div class="longpress-button"
       @mouseup="cancel()"
       @touchend="cancel()"
       @touchstart.prevent="triggerCount()"
       @touchstart="onClick()"
       @mousedown.prevent="triggerCount()"
  >
    <div @click="onClick()">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted} from "vue";

export default defineComponent({
  name: 'LongPress',
  props: ['onLongPress', 'onClick'],
  setup(props) {
    let counter = 0
    let duration = 500
    let timer = null;

    onMounted(() => {
      document.addEventListener('mouseup', () => cancel());
    })
    onUnmounted(() => {
      document.removeEventListener('mouseup', () => cancel());
    })

    function onClick() {
      props.onClick()
    }

    function triggerCount() {
      countAndConfirm();
    }

    function countAndConfirm() {
      timer = setTimeout(() => {
        props.onLongPress()
        reset();
      }, 500);
    }

    function reset() {
      cancel();
    }

    function cancel() {
      counter = 0;
      clearTimeout(timer);
    }

    return {counter, triggerCount, cancel, reset, countAndConfirm, duration, onClick}
  },


})
</script>


<style scoped>
.longpress-button {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

}


</style>
