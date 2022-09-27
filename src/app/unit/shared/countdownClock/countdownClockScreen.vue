<template>
  <div>
    <Vue3CountdownClock/>
  </div>
</template>

<script lang="ts">
import Vue3CountdownClock from 'vue3-clock-countdown'
import {onMounted, provide, ref} from 'vue'
import moment from "moment";

export default {
  components: {
    Vue3CountdownClock
  },
  props: {
    time: String
  },
  setup(props) {
    const date = ref((moment(props.time).format('YYYY/MM/DD HH:mm:ss')))
    const deadLine = ref();
    onMounted(() => {
      deadLine.value = date.value + ' GMT-0200';
      provide('deadline', new Date(deadLine.value))
    })

    const timerStyle = ref({
      'text-align': 'center',
      'font-family': 'sans-serif',
      'font-weight': 100
    })
    provide('timerStyle', timerStyle)

    const h1Style = ref({
      color: '#396',
      'font-weight': 100,
      'font-size': '40px',
      margin: '40px 0px 20px'
    })
    provide('h1Style', h1Style)

    const clockdiv = ref({
      'font-family': 'sans-serif',
      color: '#fff',
      display: 'inline-block',
      'font-weight': 100,
      'text-align': 'center',
      'font-size': '30px'
    })
    provide('clockdiv', clockdiv)

    const clockdivDiv = ref({
      padding: '10px',
      'border-radius': '3px',
      background: '#00BF96',
      display: 'inline-block',
      margin: '1px'
    })
    provide('clockdivDiv', clockdivDiv)

    const clockdivDivSpan = ref({
      padding: '15px',
      'border-radius': '3px',
      background: '#00816A',
      display: 'inline-block'
    })
    provide('clockdivDivSpan', clockdivDivSpan)

    const styleEndTime = ref({
      color: '#fff'
    })
    provide('styleEndTime', styleEndTime)

    const smalltext = ref({
      'padding-top': '5px',
      'font-size': '16px'
    })
    provide('smalltext', smalltext)

    const titleDays = ref('Days')
    provide('titleDays', titleDays)

    const titleHours = ref('Hours')
    provide('titleHours', titleHours)

    const titleMinutes = ref('Minutes')
    provide('titleMinutes', titleMinutes)

    const titleSeconds = ref('Seconds')
    provide('titleSeconds', titleSeconds)

    const titleEndTime = ref('End Time!')
    provide('titleEndTime', titleEndTime)

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>


