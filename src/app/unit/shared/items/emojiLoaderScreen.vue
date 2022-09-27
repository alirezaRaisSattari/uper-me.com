<template>
  <div class="emoji">
    <svg v-if="keyValue === 1" height="28.75" viewBox="0 0 28.75 28.75" width="28.75"
         xmlns="http://www.w3.org/2000/svg">
      <g id="Satisfied" transform="translate(0.375 0.375)">
        <path id="Path_6397" :stroke="color" d="M129.35,699.886a4.153,4.153,0,0,1-8.3,0"
              data-name="Path 6397" fill="none" fill-rule="evenodd" stroke-linecap="round"
              stroke-miterlimit="2.613" stroke-width="0.75" transform="translate(-111.316 -681.996)"/>
        <ellipse id="Ellipse_243" :stroke="color" cx="14" cy="14" data-name="Ellipse 243" fill="none"
                 rx="14" ry="14" stroke-miterlimit="2.613" stroke-width="0.75"
                 transform="translate(0 28) rotate(-90)"/>
        <path id="Path_6445" :fill="color"
              d="M64.749,692.978a1.274,1.274,0,1,1-1.274,1.273A1.274,1.274,0,0,1,64.749,692.978Z"
              data-name="Path 6445" fill-rule="evenodd" transform="translate(-46.162 -682.994)"/>
        <path id="Path_6446" :fill="color"
              d="M52.208,692.978a1.274,1.274,0,1,1-1.274,1.273A1.274,1.274,0,0,1,52.208,692.978Z"
              data-name="Path 6446" fill-rule="evenodd" transform="translate(-42.795 -682.994)"/>
      </g>
    </svg>
    <svg v-else-if="keyValue === 2" height="28.75" viewBox="0 0 28.75 28.75" width="28.75"
         xmlns="http://www.w3.org/2000/svg">
      <g id="normal" transform="translate(0.375 0.375)">
        <ellipse id="Ellipse_239" :stroke="color" cx="14" cy="14" data-name="Ellipse 239" fill="none"
                 rx="14" ry="14" stroke-miterlimit="2.613" stroke-width="0.75"
                 transform="translate(0 28) rotate(-90)"/>
        <path id="Path_6400" :fill="color"
              d="M64.749,692.978a1.274,1.274,0,1,1-1.274,1.273A1.274,1.274,0,0,1,64.749,692.978Z"
              data-name="Path 6400" fill-rule="evenodd" transform="translate(-46.162 -682.994)"/>
        <path id="Path_6401" :fill="color"
              d="M52.208,692.978a1.274,1.274,0,1,1-1.274,1.273A1.274,1.274,0,0,1,52.208,692.978Z"
              data-name="Path 6401" fill-rule="evenodd" transform="translate(-42.795 -682.994)"/>
        <line id="Line_665" :stroke="color" data-name="Line 665" fill="none" stroke-linecap="round"
              stroke-miterlimit="2.613" stroke-width="0.75" transform="translate(9.503 18.578)" x2="8.993"/>
      </g>
    </svg>
    <svg v-else-if="keyValue === 3" height="28.75" viewBox="0 0 28.75 28.75" width="28.75"
         xmlns="http://www.w3.org/2000/svg">
      <g id="Dissatisfied" transform="translate(0.375 0.375)">
        <path id="Path_6447" :stroke="color" d="M129.173,703.74a4.065,4.065,0,0,0-8.119,0"
              data-name="Path 6447" fill="none" fill-rule="evenodd" stroke-linecap="round"
              stroke-miterlimit="2.613" stroke-width="0.75" transform="translate(-111.15 -681.95)"/>
        <ellipse id="Ellipse_244" :stroke="color" cx="14" cy="14" data-name="Ellipse 244" fill="none"
                 rx="14" ry="14" stroke-miterlimit="2.613" stroke-width="0.75"
                 transform="translate(0 28) rotate(-90)"/>
        <path id="Path_6448" :fill="color"
              d="M64.749,692.978a1.274,1.274,0,1,1-1.274,1.273A1.274,1.274,0,0,1,64.749,692.978Z"
              data-name="Path 6448" fill-rule="evenodd" transform="translate(-46.162 -682.994)"/>
        <path id="Path_6449" :fill="color"
              d="M52.208,692.978a1.274,1.274,0,1,1-1.274,1.273A1.274,1.274,0,0,1,52.208,692.978Z"
              data-name="Path 6449" fill-rule="evenodd" transform="translate(-42.795 -682.995)"/>
      </g>
    </svg>
    <svg v-else-if="keyValue === 4" height="28.75" viewBox="0 0 28.75 28.75" width="28.75"
         xmlns="http://www.w3.org/2000/svg">
      <g id="Dissatisfied" transform="translate(0.375 0.375)">
        <path id="Path_6447" :stroke="color" d="M129.173,703.74a4.065,4.065,0,0,0-8.119,0"
              data-name="Path 6447" fill="none" fill-rule="evenodd" stroke-linecap="round"
              stroke-miterlimit="2.613" stroke-width="0.75" transform="translate(-111.15 -681.95)"/>
        <ellipse id="Ellipse_244" :stroke="color" cx="14" cy="14" data-name="Ellipse 244" fill="none"
                 rx="14" ry="14" stroke-miterlimit="2.613" stroke-width="0.75"
                 transform="translate(0 28) rotate(-90)"/>
        <path id="Path_6448" :fill="color"
              d="M64.749,692.978a1.274,1.274,0,1,1-1.274,1.273A1.274,1.274,0,0,1,64.749,692.978Z"
              data-name="Path 6448" fill-rule="evenodd" transform="translate(-46.162 -682.994)"/>
        <path id="Path_6449" :fill="color"
              d="M52.208,692.978a1.274,1.274,0,1,1-1.274,1.273A1.274,1.274,0,0,1,52.208,692.978Z"
              data-name="Path 6449" fill-rule="evenodd" transform="translate(-42.795 -682.995)"/>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import {onMounted} from 'vue'

export default {
  props: {
    color: String,
    keyValue: Number
  },
  setup(props) {
    return {}
  }
}
</script>

<style lang="scss" scoped>
svg {
  width: 20px;
  margin: 0 5px;
  padding-bottom: 5px;
  color: "red";
}
</style>
