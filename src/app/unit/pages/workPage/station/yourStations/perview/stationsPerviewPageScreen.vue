<template>
  <div>
    <ConfirmPopup></ConfirmPopup>
    <div class="header-station smart-text-align">
      <div class="half-right">
        <img v-lazy="state.userData.profileUrl + '_sm.webp'" alt="profile">
        <div class="d-flex flex-column justify-content-center">
                    <span class="username">
                        {{ state.userData.name }}
                    </span>
          <span class="sub-username">
                        {{ state.userData.username }}
                    </span>
        </div>
      </div>
      <div class="half-left">
                <span>
                    {{ $t('preview') }}
                </span>
      </div>
    </div>

    <div v-if="state.data" class="main-body">

      <div class="d-flex flex-column w-100">
        <div class="half-right">
          <span class="label">{{ $t('stationType') }} :</span>
          <span class="value">{{ state.typeChecker() }}</span>
        </div>
        <div v-if="state.data.type > 3" class="half-right">
          <span class="label">{{ $t('vehicleType') }} :</span>
          <span class="value">{{ state.data.type === 5 ? $t('car') : 'motor' }}</span>
        </div>
        <div class="half-right">
          <span class="label">{{ state.data.type > 3 ? $t('vehicleName') : $t('title') }} :</span>
          <span class="value">{{ state.data.title }}</span>
        </div>

      </div>
      <div v-if="state.data.stationStatus !== 4" class="half-left">
        <Button class="p-button-raised p-button-text p-button-plain" icon="pi pi-pencil" @click="state.goToUpdate()"/>
        <Button class="p-button-raised p-button-text p-button-plain" icon="pi pi-trash" @click="deleteStation($event)"/>
      </div>
    </div>
    <div v-if="state.data" class="full smart-text-align">
      <span class="label">{{ $t('noDetails') }} :</span>
      <span v-if="state.data.type <= 3" class="value">{{ state.data.plateNumber }}</span>
      <div v-else class="plate-number">
        <div v-if="state.data.type === 5" class="h-r">
          <div v-if="state.data.type === 5">
            <div class="d-flex flex-row">
              <div class="d-flex flex-column">
                <label for="iran">iran</label>
                <span id="iran" class="mx-3">{{ state.plateNumber.hl.charAt(1) }}</span>
              </div>
              <div class="d-flex flex-column">
                <label for="ir">IR</label>
                <span id="ir" class="mx-3">{{ state.plateNumber.hl.charAt(0) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="state.data.type === 5" class="h-l">
          <span class="mx-1">{{ state.plateNumber.hr.charAt(5) }}</span>
          <span class="mx-1">{{ state.plateNumber.hr.charAt(4) }}</span>
          <span class="mx-1">{{ state.plateNumber.hr.charAt(3) }}</span>
          <span class="mx-5">{{ state.plateNumber.hr.charAt(2) }}</span>
          <span class="mx-1">{{ state.plateNumber.hr.charAt(1) }}</span>
          <span class="mx-1">{{ state.plateNumber.hr.charAt(0) }}</span>
        </div>
        <div v-else-if="state.data.type === 4" class="w-100">
          <div class="d-flex flex-row">
            <div class="h-r text-white">
              <span class="mx-2">IR</span>
              <span class="mx-2">iran</span>
            </div>
            <div class="h-l">
              <span class="mx-2">{{ state.plateNumber.hr.charAt(7) }}</span>
              <span class="mx-2">{{ state.plateNumber.hr.charAt(6) }}</span>
              <span class="mx-2">{{ state.plateNumber.hr.charAt(5) }}</span>
              <span class="mx-2">{{ state.plateNumber.hr.charAt(4) }}</span>
              <span class="mx-2">{{ state.plateNumber.hr.charAt(3) }}</span>
              <span class="mx-2">{{ state.plateNumber.hr.charAt(2) }}</span>
              <span class="mx-2">{{ state.plateNumber.hr.charAt(1) }}</span>
              <span class="mx-2">{{ state.plateNumber.hr.charAt(0) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="control">
        <span class="label">{{ $t('specifications') }} :</span>
        <span class="value">{{ state.data.description !== '' ? state.data.description : $t('empty') }}</span>
      </div>
      <div class="image-control">
        <span>{{ $t('mainPhoto') }}</span>
        <div class="d-flex justify-content-end my-2">
          <img v-lazy="state.data.mainImageUrl" alt="main photo">
        </div>
      </div>
      <div v-if="state.data.otherImageUrls && state.data.otherImageUrls.length > 0" class="image-control">
        <span>{{ $t('otherPhoto') }}</span>
        <div class="d-flex justify-content-end my-2">
          <img v-for="item in state.data.otherImageUrls" :key="item"
               :class="state.data.otherImageUrls.length > 1 ? 'mx-auto' :'mr-auto'"
               v-lazy="item" alt="main photo">
        </div>
      </div>
      <div v-if="state.data.type > 3" class="main-body">
        <div class="half-right">
          <span>{{ $t('document') }}</span>
        </div>
        <div class="half-left mx-0 my-2">
          <Button :label="$t('addDocument')" class="p-button-raised p-button-text p-button-plain"
                  @click="pushPhoto(2)"/>
        </div>
      </div>
      <div class="hide-input">
        <input ref="InputDocs" accept="image/*" type="file" @change="onFileChange($event, 0 , 2)"/>
      </div>
      <div v-if="state.data.documents && state.data.documents.length > 0" class="image-control">
        <div class="d-flex flex-row">
          <div v-if="!state.changeDoc" class="row mx-0 w-100">
            <div v-for="(item,index) in state.data.documents" :key="item"
                 :class="state.data.documents.length > 1 ? 'mx-auto' :'mr-auto'"
                 class="col-4 my-2 p-2">
              <ItemDocStation :index="index" :item="item" @addDocCall="(event) => state.addDoc(index)"
                              @callBackDelete="(event) => callBackDeleteDoc(index)"
                              @callBackImage="(event) => callBackUpdateImage(event,index)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from '@vue/runtime-core';
import {stationsPreview} from './stationsPreviewPageState';
import ConfirmPopup from 'primevue/confirmpopup';
import {useConfirm} from "primevue/useconfirm";
import {i18n} from '@/main';
import {convertFileTOBase64} from '@/core/service/utils.service';
import ItemDocStation from '@/app/unit/shared/imageSelctorStation/itemDocStation/itemDocStationScreen.vue'

export default {
  components: {
    ConfirmPopup,
    ItemDocStation
  },
  setup() {
    const confirm = useConfirm();
    const state = ref(new stationsPreview());
    const InputDocs = ref();
    const imgBase64 = ref("");
    onMounted(() => {
      state.value.getDetails();
    });

    function onFileChange(e, index, key) {
      if (e.target.files.length === 0) return;
      switch (key) {

        case 2:
          convertFileTOBase64(e.target.files[0], (base64) => {
            const item = {
              title: '',
              imageUrl: base64,
              isNew: true
            }
            state.value.data.documents.push(item);
          });
          break;
      }
    }


    function callBackUpdateImage(base64, index) {
      state.value.changeDoc = true;
      state.value.data.documents[index].imageUrl = base64;
      state.value.uploadImages(index);

    }

    function callBackDeleteDoc(index) {
      state.value.changeDoc = true;

      if (!state.value.data.documents[index].isNew) {
        state.value.changeDoc = false;
        state.value.deleteDoc(index);
      } else {
        let list = [];
        for (let i = 0; i < state.value.data.documents.length; i++) {
          if (i !== index) {
            list.push(state.value.data.documents[i]);
          }
        }
        state.value.data.documents = list;
        state.value.changeDoc = false;
      }
    }


    function pushPhoto(key) {
      switch (key) {
        case 2:
          InputDocs.value.click();
          break;
      }
    }


    const deleteStation = (event) => {
      confirm.require({
        target: event.currentTarget,
        message: i18n.global.tc('deleteStationMessage'),
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: i18n.global.tc('yes'),
        rejectLabel: i18n.global.tc('no'),
        accept: () => {
          state.value.deleteStation();
        },
      });
    }


    return {
      state,
      deleteStation,
      onFileChange,
      imgBase64,
      pushPhoto,
      InputDocs,
      callBackDeleteDoc,
      callBackUpdateImage,
    }
  }
}
</script>

<style lang="scss" scoped>
.header-station {
  display: flex;
  flex-direction: row;
  background: #fff;
  box-shadow: 0 2px 5px #686868;
  border-radius: 50px;
  padding: 43px 10px 12px;
  position: relative;
  top: -33px;

  .half-right {
    display: flex;
    flex-direction: row;
    flex: 70%;

    img {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      margin: 0 5px;
    }

    .username {
      font-size: 14px;
      display: block;
      overflow: hidden;
      margin-bottom: 4px;
    }

    .sub-username {
      font-size: 13px;
      display: block;
      overflow: hidden;
      margin-bottom: 4px;
    }
  }

  .half-left {
    display: flex;
    flex-direction: column;
    flex: 30%;
    height: 45px;
    justify-content: center;
    align-items: center;

    span {
      font-size: 15px;
    }
  }

}

.main-body {
  display: flex;
  flex-direction: row;

  .half-right {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    flex: 50%;
    margin: 5px 10px;

    .label {
      color: #686868;
      margin: 0 5px;
    }

    .value {
      color: #212121;
    }
  }

  .half-left {
    display: flex;
    flex-direction: row;
    flex: 50%;
    align-items: flex-start;
    justify-content: flex-end;
    margin: 0 20px;

    .p-button-plain {
      margin: 0 5px;
    }
  }

}

.full {

  .label {
    font-size: 14px;
    padding: 5px 15px 0;
  }

  .plate-number {
    display: flex;
    flex-direction: row;
    margin: 10px;
    border-radius: 5px;

    .h-r {
      display: flex;
      flex: 20%;
      background: #007bff;
      color: #212121;
      padding: 10px;
      justify-content: center;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      letter-spacing: 3px;

      label {
        font-size: 14px;
        text-align: center;
        color: #fff;
      }
    }

    .h-l {
      display: flex;
      flex: 80%;
      background: #fff;
      color: #212121;
      padding: 10px;
      justify-content: center;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      align-items: center;
      border: 1px solid #a9a9a9;
    }

  }
}

.control {
  display: flex;
  flex-direction: row;
  font-size: 14px;

  .label {
    color: #686868;
    margin: 0 5px;
  }

  .value {
    color: #212121;
    font-size: 14px;
    padding-top: 4px;
  }
}

.image-control {
  margin: 10px;
  display: flex;
  flex-direction: column;

  span {
    font-size: 14px;
    color: #212121;
    margin: 0 10px;
  }

  img {
    max-width: 125px;
    max-height: 100px;
    border-radius: 5px;
  }

  .sub-image {
    background: #a9a9a96e;
    padding: 5px;
    text-align: center;
    width: 100%;
    margin: 0 !important;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}


.hide-input {
  height: 0px;
  width: 0px;
  overflow: hidden;
}


</style>
