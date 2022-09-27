<template>
 <div v-if="data">
    <Dialog :showHeader="false" v-model:visible="state.showDialog" :style="{width: '50vw','max-width':'512px' }" modal>
            <div class="details-input" >
               <InputText type="text" v-model="state.postDataDelete.description" :placeholder="$t('description')" />
                <Button :label="$t('submit')"  @click="state.cancelAccsept()" autofocus />
            </div>
            <div class="details-input" v-if="state.detailsType == 2 || state.detailsType == 3">
                <span >{{$t('pleaseSendAVideoOfHowToPrepareTheProduct')}}</span>
                <FileUpload id="addVideo" :chooseLabel="$t('addVideo')" :customUpload="true" @uploader="state.myUploader" :auto="true" :maxFileSize="10000000" mode="basic" name="video" url="./upload" accept="video/*" />
            </div>
    </Dialog>

      <ConfirmDialog :icon="'fas fa-exclamation-triangle'" :text="$t('yourSettlementTime' , {data:$filters.jalali(state.clearingDate)})" :textSize="'18px'" :visible="state.showClearingDialog"
            :acceptLabel="$t('confirm')" :showReject="false" @accept="$function.goBack()" :status="'warning'" @times="$function.goBack()"/>

   <div class="footer-controller" >
    <template  v-if="!state.loading">
      <div class="control"  >
          <Button @click="state.clearing()" :label="$t('clearing')" class="p-button-rounded" />
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

   onMounted(() => {
     state.value.init(props.data);
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
</style>
