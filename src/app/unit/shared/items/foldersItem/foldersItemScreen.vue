<template>
  <div>
    <ConfirmPopup></ConfirmPopup>
    <div class="main-item-control">

      <div v-ripple class="p-button-raised p-button-text p-button-plain no-shadow p-ripple">
        <div class="right-side smart-text-align" @click="showDetails()">
               <span class="label">
                   {{ $t('specifications') }} :
                   <span class="value">
                       {{ item.title }}
                   </span>
               </span>
          <span class="label">
                   {{ $t('itemCount') }} :
                   <span class="value">
                       {{ item.usageCount }}
                   </span>
               </span>
        </div>
        <div class="left-side">
          <Button class="p-button-rounded p-button-text p-button-plain ml-2" icon="pi pi-pencil"
                  @click="update(item.id)"/>
          <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-trash"
                  @click="deleteConfirm($event)"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Ripple from 'primevue/ripple';
import router from '@/core/router/router';
import {useConfirm} from "primevue/useconfirm";
import ConfirmPopup from 'primevue/confirmpopup';
import {ToastService} from '@/core/service/toast.service';
import {ProductRepository} from '@/core/repository/product.repository';
import {PageStore} from '@/core/store/page.store';
import {i18n} from '@/main';
import {WindowLoading} from '@/core/service/utils.service';

export default {
  components: {
    ConfirmPopup
  },
  directives: {
    'ripple': Ripple
  },
  props: {
    item: Object,
    pId: Number
  },
  emits: [
    "update",
    "deleteCallBack"
  ],
  setup(props, {emit}) {
    const confirm = useConfirm();

    function showDetails() {
      router.push(`/product/propFolder/${props.pId}?id=${props.item.id}&wId=${props.item.workPageId}`)
    }

    const update = (id) => {
      emit('update', {title: props.item.title, id: id})
    };


    const deleteConfirm = (event) => {
      confirm.require({
        target: event.currentTarget,
        message: i18n.global.tc('deleteFolderMessage'),
        icon: 'pi pi-info-circle',
        acceptLabel: i18n.global.tc('yes'),
        rejectLabel: i18n.global.tc('no'),
        acceptClass: 'p-button-danger',
        accept: () => {
          deleteFolder(props.item.id, props.item.usageCount)
        },
      });
    }

    function deleteFolder(folderId: number, usageCount: number) {
      if (usageCount !== 0) {
        ToastService.getInstance().warning(i18n.global.tc('pleaseRemoveAllSubFolders'));
        return;
      }
      WindowLoading.value = true;
      ProductRepository.getInstance().deleteFolderReserve({
        body: {
          workPageId: PageStore().selectedPageId * -1,
          folderId: folderId
        },
        onReceive: res => {
          ToastService.getInstance().success(i18n.global.tc('deletePostSuccessful'));
          WindowLoading.value = false;
          emit('deleteCallBack', folderId);
        }
      });
    }

    return {showDetails, update, deleteConfirm}
  }
}
</script>

<style lang="scss" scoped>

.main-item-control {
  max-width: 450px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;

  .p-button-plain {
    box-shadow: 0 0 3px #b5b5b5 !important;
    display: flex;
    align-items: center;
    cursor: pointer;


    .left-side {
      display: flex;
      flex: 20%;

      .p-button {
        position: relative;
        z-index: 20;
      }
    }

    .right-side {
      display: flex;
      flex-direction: column;
      flex: 80%;
      padding: 10px;
      position: relative;
      z-index: 1;

      span.label {
        margin-bottom: 10px;
        color: #686868;

        span.value {
          color: #212121;
        }
      }

    }
  }


  .head-title-folder {
    fill: #f55;
  }
}

</style>
