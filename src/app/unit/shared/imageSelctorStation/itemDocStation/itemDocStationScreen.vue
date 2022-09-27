<template>
  <div>
    <ConfirmPopup></ConfirmPopup>
    <div class="d-flex flex-column align-items-center">
      <div class="hide-input">
        <input ref="InputImage" accept="image/*" type="file" @change="onFileChange($event)"/>
      </div>
      <img v-lazy="item.imageUrl" alt="main photo">
      <span v-if="!item.isNew" class="sub-image text-center">{{ item.title }}</span>
      <InputText v-else v-model="item.title" :placeholder="$t('documentName')" class="input-doc smart-text-align"
                 type="text"/>
      <div class="d-flex flex-row mt-1 w-100">
        <Button :icon="!item.isNew ?'pi pi-pencil' : 'pi pi-check'"
                class="p-button-raised p-button-text p-button-plain w-50"
                @click="!item.isNew ? pushPhoto() : addDoc(index)"/>
        <Button class="p-button-raised p-button-text p-button-plain w-50" icon="pi pi-trash"
                @click="deleteDoc($event,index)"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import {i18n} from '@/main';
import {useConfirm} from 'primevue/useconfirm';
import ConfirmPopup from 'primevue/confirmpopup';
import {convertFileTOBase64} from '@/core/service/utils.service';

export default {
  components: {
    ConfirmPopup
  },
  props: {
    index: Number,
    item: Object
  },
  emits: ['callBackImage', 'callBackDelete', 'addDocCall'],
  setup(props, {emit}) {
    const InputImage = ref();
    const confirm = useConfirm();

    function onFileChange(e) {
      if (e.target.files.length === 0) return;

      convertFileTOBase64(e.target.files[0], (base64) => {
        emit('callBackImage', base64);
      });
    }

    function addDoc(index) {
      emit('addDocCall', index)
    }


    function pushPhoto() {
      InputImage.value.click();
    }

    const deleteDoc = (event, index) => {
      confirm.require({
        target: event.currentTarget,
        message: i18n.global.tc('deleteStationMessage'),
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: i18n.global.tc('yes'),
        rejectLabel: i18n.global.tc('no'),
        accept: () => {
          emit('callBackDelete', index);
        },
      });
    }


    return {
      InputImage,
      pushPhoto,
      deleteDoc,
      onFileChange,
      addDoc
    }
  }
}
</script>

<style lang="scss" scoped>
.hide-input {
  height: 0px;
  width: 0px;
  overflow: hidden;
}

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

.input-doc {
  padding: 5px !important;
  box-shadow: 0 0 2px #212121 !important;
  margin: 5px 0 0;
  width: 100%;
  border-radius: 5px;

  &:focus {
    box-shadow: 0 0 2px #212121 !important;
  }
}

</style>
