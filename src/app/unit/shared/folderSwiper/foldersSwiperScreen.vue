<template>
  <Dialog v-model:visible="dialogNewFolder"
          :contentStyle="{background: 'rgb(255, 255, 255)',width:'350px',borderRadius: '8px','-ms-overflow-style':'none', 'scrollbar-width':'none'}"
          :dismissableMask="true"
          :showHeader="false" :style="{ margin: '0', border: 'none' }" modal>
    <div class="name-controller smart-text-align">
      <InputText v-model="folderName" :placeholder="$t('folder_name')" type="text"/>
      <div class="btn-control">
        <Button :label="$t('submit')" class=" p-button-raised p-button-text p-button-plain" @click="createFolder()"/>
      </div>
    </div>
  </Dialog>

  <div class="folder-controller">
    <div class="header">
      <span>{{ $t('folders') }}</span>
      <Button :label="$t('addFolder')" class="p-button-raised p-button-plain" icon="fas fa-folder-plus mx-2"
              iconPos="left" @click="dialogNewFolder = true"/>
    </div>
    <div v-if="folders" class="body">
      <swiper :direction="'horizontal'" :free-mode="false" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
              :slides-per-view="'auto'" :space-between="0" class="slider w-100">
        <swiper-slide v-for="(folder, index) in folders" :key="index" class="pt-2 d-flex w-auto px-1">
          <Item :folder="folder" :selected="selectedFolder" @callBack="(event)=> ChangeFolder(event)"/>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import Item from './folderItemScreen.vue';
import {ref} from 'vue';
import {ProductRepository} from '@/core/repository/product.repository';
import {getSelectedPageId} from '@/core/service/utils.service';
import {ToastService} from '@/core/service/toast.service';
import {i18n} from '@/main';
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  props: {
    folders: Array,
    selectedFolder: Number
  },
  emits: ['changeFolder', 'addFolder'],
  components: {
    Item, Swiper, SwiperSlide
  },
  setup(props, {emit}) {

    const dialogNewFolder = ref(false);
    const folderName = ref('');

    function ChangeFolder(folderId) {
      emit('changeFolder', folderId)
    }

    function createFolder() {
      if (folderName.value.length && folderName.value.length <= 20) {
        ProductRepository.getInstance().CreateNewFolders({
          body: {
            name: folderName.value,
            workPageId: Math.abs(getSelectedPageId()),
          },
          onReceive: (res) => {
            ToastService.getInstance().success(i18n.global.tc('successMassage'));
            emit('addFolder', true)
          }, onError: (err) => {
          }
        })
      } else {
        ToastService.getInstance().warning(i18n.global.tc("foldersNameInvalidatin", {min: 1, max: 20,}));
      }
    }

    return {
      ChangeFolder,
      dialogNewFolder,
      folderName,
      createFolder
    }
  }
}
</script>

<style lang="scss" scoped>
.folder-controller {
  padding: 10px;
  box-shadow: 0 0 5px #b5b5b5;
  border-radius: 8px;

  .header {
    display: flex;
    align-items: center;
    color: #212121;
    justify-content: space-between;

    button {
      background: #c3e5e7;
      color: #212121 !important;
      border: none;
      padding: 10px 20px;
      font-size: 14px;

      &:hover {
        background: #C3E5E796;
      }
    }
  }
}

.name-controller {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
  width: 100%;

  input {
    border: 2px solid #b5b5b5 !important;
    border-radius: 5px;
    color: #212121;
    padding: 10px 20px !important;
    margin-bottom: 10px;
    font-size: 14px;
    text-align: left;
    width: 100%;

    &:focus {
      border: 2px solid #b5b5b5 !important;
    }
  }

  .btn-control {
    display: block;
    text-align: center;
    width: 100%;

    button {
      font-size: 13px;
      border-radius: 8px;
      margin-right: auto;
      padding: 10px 35px;
      box-shadow: 0 1px 5px #b5b5b5;
      width: 100%;
      background: #c5e4e7;
    }
  }
}
</style>
