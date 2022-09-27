<template>
 <div v-if="data">
    <Dialog :showHeader="false" v-model:visible="state.showDialog" :style="{width: '50vw','max-width':'512px' }" modal>
            <div class="details-input" v-if="state.detailsType == 1">
               <InputText type="text" v-model="state.postDataDelete.description" :placeholder="$t('description')" />
                <Button :label="$t('submit')"  @click="state.cancelAccsept()" autofocus />
            </div>
            <div class="details-input" v-if="state.detailsType == 2 || state.detailsType == 3">
                <span >{{$t('pleaseSendAVideoOfHowToPrepareTheProduct')}}</span>
                <FileUpload v-if="!state.videoLoading" id="addVideo" :chooseLabel="$t('addVideo')" :customUpload="true" @uploader="(e) => state.myUploader(e)" :auto="true" :maxFileSize="100000000" mode="basic" name="video"  accept="video/*" />
                  <div v-else  class="box-loading">
                    <loading  />
                    <span class="p-2">{{$t('sending_1')}}</span>
                  </div>
            </div>
    </Dialog>

      <ConfirmDialog :icon="'fas fa-exclamation-triangle'" :text="$t('yourSettlementTime' , {data:$filters.jalali(state.clearingDate)})" :textSize="'18px'" :visible="state.showClearingDialog"
            :acceptLabel="$t('confirm')" :showReject="false" @accept="$function.goBack()" :status="'warning'" @times="$function.goBack()"/>
   <div class="footer-controller" v-if="showFooter" >
    <template  v-if="!state.loading">
      <div class="control" v-if="data.factor.factorStatus == 2">
        <template v-if="!state.isExpired" >
           <Button @click="state.submitFactor()" :label="$t('submitFactor')" class="p-button-rounded" />
           <Button @click="cancelConfirm()" :label="$t('cancelFactor')" class="p-button-rounded" />
        </template>
      </div>
      <div class="control" v-else-if="data.factor.factorStatus == 3 && !state.isExpired">
          <div class="items">
            <Button v-if="data.factor.productType == 3 || data.factor.productType == 4" @click="state.preparing()" :label="$t('delivery_alt')" class="p-button-rounded delivery" />
            <Button v-else-if="data.factor.productType == 1" @click="state.initDialog(2)" :label="$t('preparing')" class="p-button-rounded delivery" />
            <Button @click="cancelConfirm()" :label="$t('cancelFactor')" class="p-button-rounded" />
          </div>
      </div>
      <div class="control" v-else-if="data.factor.factorStatus == 4 && (data.factor.sellerAddressType === 3 || data.factor.sellerAddressType === 4)">
            <Button v-if="data.factor.sellerAddressType == 3" @click="state.initDialog(3)" :label="$t('deliveryToCustomer')" class="p-button-rounded " />
            <Button v-else-if="data.factor.sellerAddressType == 4" @click="state.sendTheShipment()" :label="$t('sendTheShipmentToTheCustomer')" class="p-button-rounded" />
            <Button @click="cancelConfirm()" :label="$t('cancelFactor')" class="p-button-rounded" />
      </div>
      <div class="control"  v-else-if="( data.factor.factorStatus == 3 && data.factor.productType == 2) || data.factor.factorStatus == 8">
            <Button @click="state.clearing()" :label="$t('clearing')" class="p-button-rounded" />
      </div>
       <div class="control" v-else-if="( data.factor.factorStatus == 7 && data.factor.productType == 1) && data.factor.sellerAddressType == 4">
          <Button @click="state.initDialog(3)" :label="$t('deliveryToCustomer')" class="p-button-rounded " />
      </div>
    </template>
    <template class="control" v-else>
        <loading v-if="state.loading"/>

    </template>

   </div>
 </div>
</template>

<script lang="ts">
import { onMounted , ref } from 'vue';
import {fotterFactorDetailsForterSellCart} from './factorDetailsForterSellCartPageState';
import FileUpload from 'primevue/fileupload';
import ConfirmDialog from '@/app/public/shared/confirmDialog/ConfirmDialog.vue';

export default {
 props:{
  data:Object
 },
 components:{
   FileUpload,
   ConfirmDialog
 },
 setup (props) {
    const state = ref(new fotterFactorDetailsForterSellCart());
    const videoLength = ref([]);
    const showFooter = ref(true);
   onMounted(() => {
     state.value.init(props.data);
     if (!(props.data.factor.factorStatus == 2 || (props.data.factor.factorStatus == 3 && !state.value.isExpired) || 
           (props.data.factor.factorStatus == 4 && (props.data.factor.sellerAddressType === 3 || props.data.factor.sellerAddressType === 4)) || 
          ( props.data.factor.factorStatus == 7 && props.data.factor.sellerAddressType == 4) || (props.data.factor.factorStatus == 3 && props.data.factor.productType == 2) ||
          props.data.factor.factorStatus == 8 )) return showFooter.value = false;
   });

   const cancelConfirm = () => {
     state.value.postDataDelete.description = '';
     state.value.detailsType = 1;
     state.value.showDialog = true;
   }

   const checkExpired = () => {
     let isExpired = false;
     for (let i = 0; i < props.data.details.length; i++) {
       const item = props.data.details[i];
        if (item.hashToken == 'expired') {
          isExpired = true;
          break;
       }
     }
     return isExpired;
   }


   

    return {
      checkExpired,
      cancelConfirm,
      state,
      videoLength,
      showFooter
    }
 }
}
</script>

<style lang="scss" scoped>
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
  .control {
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
   margin: 0 10px;
  }
}

.details-input {
  display: flex;
  flex-direction: column;
  padding: 50px 20px;
  span {
    font-size: 16px;
    color:#686868;
    margin-bottom: 15px;
    display: block;
    text-align: center;
  }

  input {
    width: 100% !important;
    padding: 10px !important;
    border-radius: 5px;
    border: 1px solid #b5b5b5 !important;
    margin-bottom: 10px;
    &::placeholder {
      color: #686868;
    }
  }
  button , .btn-upload {
    background: #c2e1e4 !important;
    box-shadow: none !important;
    border: none;
    padding: 10px;
    font-size: 14px;
    color:#212121 !important;
    border-radius: 8px;
  }
}

::v-deep(.p-fileupload) {
  .p-button {
    background: #c2e1e4 !important;
    box-shadow: none !important;
    border: none;
    padding: 10px;
    font-size: 14px;
    color:#212121 !important;
    border-radius: 8px;
    width: 100%;
  }
}

.box-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 14px;
}

.delivery {
  background: #46a9b4;
}
</style>
