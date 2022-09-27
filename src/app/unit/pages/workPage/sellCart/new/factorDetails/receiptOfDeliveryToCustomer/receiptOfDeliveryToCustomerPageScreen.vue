<template>
 <div>
 <Dialog :showHeader="false" v-model:visible="state.penting.show"
          :style="{width: '100%' , height: '100%','max-width': '512px',overflow: hidden}" :contentStyle="{height: '100%'}">
     <PainTable @submit="(event)=> state.initPenting(event)" />
  </Dialog>
  <div class="main-controller">
   <div class="header">
    <div class="child">
     <span>{{$t('receiptOfDeliveryToCustomer')}}</span>
    </div>
   </div>
   <div class="body">
    <div class="child">
     <div class="controller">
      <span for="masterDescription">{{$t('masterDescription') + ` ${state.postData.isChecked ? $t('have') : $t('notHave')}`}}</span>
      <Checkbox class="mx-2" v-model="state.postData.isChecked" :binary="true" />
     </div>
      <InputText v-if="state.postData.isChecked" :placeholder="$t('masterDescription')" class="smart-text-align" type="text" v-model="state.postData.checkDescription" />
    </div>
     <div class="controller up">
      <span>{{$t('addSign')}}</span>
      <div class="box-sign" :style="{'background-image': `url(${state.penting.img})`}" @click="state.penting.show = true"></div>
     </div>
    <div class="controller">
     <div class="child">
      <span>{{$t('otherPhoto')}}</span>
     </div>
     <div class="child">
      <Button :label="$t('addPhoto')" @click="state.selectImages()"/>
       <input id="other-images" accept="image/*" hidden multiple type="file" @change="state.onSelect($event)"/>
     </div>
    </div>
    <div class="child">
     <div class="box-images">
       <div class="child" v-for="(img,index) in state.oderImages" :key="img" >
          <Button @click="state.oderImages.splice(index,1)" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" />
          <img :src="img.base64">
       </div>
     </div>
    </div>
   </div>
  </div>
  <div class="footer-controller">
     <div class="controll" >
          <Button @click="state.onSubmit()" :label="$t('deliverySendingToCustomer')" class="p-button-rounded" />
      </div>
  </div>
 </div>
</template>

<script lang="ts">
import { onMounted , ref} from 'vue';
import {receiptOfDeliveryToCustomerState} from './receiptOfDeliveryToCustomerState';
import Checkbox from 'primevue/checkbox';
import PainTable from '@/app/unit/shared/items/painTable/painTableScreen.vue'
export default {
 components:{
  Checkbox,
  PainTable
 },
 setup () {
  const state = ref(new receiptOfDeliveryToCustomerState());
  onMounted(() => {
   state.value.getData();
  })

  return {state}
 }
}
</script>

<style lang="scss" scoped>
 .main-controller {
  display: flex;
  flex-direction: column;
  padding: 35px 10px 40px;
  .header {
   display: flex;
   justify-content: center;
   position: relative;
   border: 2px solid #c9c9c9 ;
   border-radius: 3px;
   border-bottom: none;
   padding: 10px;
   height: 30px;
   width: 100%;
   .child {
    position: absolute;
    top: -20px;
    background: #fff;
    box-shadow: 0 0 5px #686868;
    padding: 10px;
    border-radius: 8px;
    font-size: 13px;
    color: #1f88e1; 
    font-weight: 800;
   }
  }
  .body {
    display: flex;
    flex-direction: column;
    padding: 10px;
    color: #303030;
    width: 100%;
   .child {
      font-size: 13px;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      width: 100%;

    .controller {
     display: flex;
     flex-direction: row;
     padding: 5px 0;
     justify-content: flex-start;
     width: 100%;
    }
    input {
     border: 1px solid #c9c9c9 !important;
     padding: 8px !important;
     color: #212121;
     font-size: 14px;
     margin: 5px 0;
     &:placeholder-shown {
      color: #c9c9c9;
     }
    }
   }

   .controller {
    display: flex;
    flex-direction: row;
    padding: 5px 0;
    font-size: 14px;
    justify-content: space-between;
    align-items: center;
    &.up {
     align-items: flex-start !important;
     span {
      &::after {
       content: "*";
       color: #bd2929;
       margin: 5px;
      }
     }
    }
    .box-sign {
     width: 70%;
     box-shadow: 0 0 3px #b5b5b5;
     border-radius: 8px;
     height: 120px;
     cursor: pointer;
     transition: .5s;
     background-position:center ;
     background-repeat: no-repeat;
     background-size: 200px;
     &:hover {
       background-color: #c9c9c9A4;
     }
    }

    &:last-child {
     align-items: center;
    }

    .child {
      span {
        &::after {
       content: "*";
       color: #bd2929;
       margin: 5px;
      }
      }
     button {
      background: #affffe;
      color: #08a9c5;
      font-size: 13px;
      border: none;
      padding: 5px 30px;
      box-shadow: none !important;
     }
    }
   }
     .box-images {
       box-shadow: 0 0 3px #b5b5b5;
       padding: 10px;
       min-height: 90px;
       border-radius: 8px;
       display: flex;
       flex-wrap: wrap;
       .child {
         width: 33%;
         padding: 5px;
         position: relative;
         button {
           transition: .5s;
           position: absolute;
           top: 10px;
           left: 10px;
           opacity: 0;
           color:#bd2929 !important;
           z-index:10;
            &:hover {
             opacity: 1;
            }

         }

         &:hover {
           button {
             opacity: 1;
           }
         }
         img {
           width: 100%;
           height: 120px;
           border-radius: 5px;
           cursor: pointer;
           transition: .6s;
           &:hover {
             opacity: 0.8;
           }
         }
       }
     }
  }

 }

 .footer-controller {
  display: flex;
  flex-direction: row;
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

 ::v-deep(.p-checkbox) {
  box-shadow: none !important;
  outline: none !important;
  border: none !important;
 }
</style>
