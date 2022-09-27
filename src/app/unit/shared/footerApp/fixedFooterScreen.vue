<template>
    <div>
        <div class="footer-controller" :style="{'border-bottom-left-radius':borderBottom , 'border-bottom-right-radius':borderBottom}" :class="!isFixed ? 'relative':null">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
  props:{
    borderBottom:{
      type:String,
      required:false,
      default:"0px"
    },
    isFixed:{
      type: Boolean,
      required: false,
      default:true
    }
  },
  setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
 .footer-controller {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 25px 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: #fadadd;
  position: fixed;
  bottom: 0;
  z-index: 99;
  height: 90px;
  box-shadow: 0 0 4px #b5b5b5;
  width: 512px;
  &.relative {
    position: relative;
  }
  @media (max-width:512px) {
    width: 100%;
  }
  .controll {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .items {
       display: flex;
       flex: 50%;
       justify-content: center;
    }
  }
  button {
   background: #f45868 !important;
   border: none !important;
   padding: 8px 30px;
   box-shadow: none !important;
  }
 
}

</style>