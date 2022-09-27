<template>
  <div class="py-4">
    <ConfirmDialog></ConfirmDialog>
    <div class="main-header-controller">
      <svg height="46.5" viewBox="0 0 246.667 46.5" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
        </defs>
        <path id="Path_2" class="bg"
              d="M345.333,201.167l-246.667-.5,7.507,5,7.827,6L118.333,218,122,224l6.667,10.5L134,239.833l7.333,4.333,9.667,3H296.667l7.5-1.583,4.333-1.417,8.5-6.333,1.667-2,4.667-6.5L328,218l4-5.167,4.667-4.333L341,204.167Z"
              data-name="Path 2"
              transform="translate(-98.667 -200.667)"/>
      </svg>
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: String
  },
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>

.main-header-controller {
  display: flex;
  width: 100%;
  position: fixed;
  left: 0%;
  top: 0;
  z-index: 10;

  .bg {
    fill: #fadadd;
  }

  .title {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    font-size: 15px;
  }

}
</style>
