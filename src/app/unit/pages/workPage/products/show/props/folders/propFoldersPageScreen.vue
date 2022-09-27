<template>
  <div class="py-5">
    <div class="header-product-props">
      <svg height="46.5" viewBox="0 0 246.667 46.5" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs></defs>
        <path id="Path_2" class="bg" d="M345.333,201.167l-246.667-.5,7.507,5,7.827,6L118.333,218,122,224l6.667,10.5L134,239.833l7.333,4.333,9.667,3H296.667l7.5-1.583,4.333-1.417,8.5-6.333,1.667-2,4.667-6.5L328,218l4-5.167,4.667-4.333L341,204.167Z" data-name="Path 2" transform="translate(-98.667 -200.667)"/>
      </svg>
      <div class="title">{{ $t("reserveFolderList") }}</div>
    </div>

    <Dialog v-model:visible="state.postData.showDialog" :header="state.postData.type ? $t('create') : $t('update')" :modal="true" :style="{ width: '100%', 'max-width': '377px' }" position="bottom">
      <div class="form-folder-control">
        <InputText v-model="state.postData.title" :placeholder=" state.postData.type ? $t('addFolder') : $t('folderName') " class="no-shadow" type="text"/>
        <Button :label="$t('submit')" autofocus class="p-button-raised p-button-secondary" icon="pi pi-check" @click="state.postData.type ? state.create() : state.update()"/>
      </div>
    </Dialog>

    <div class="pt-3">
      <template v-if="state.listFolder.length > 0">
        <div v-for="item in state.listFolder" :key="item" class="col-12 my-1">
          <FolderItem :item="item" :pId="pId" @deleteCallBack="(event) => removeFolder(event)" @update="(event) => initUpdate(event)"/>
        </div>
      </template>
      <template v-else>
        <div class="col-12 my-1">
          <loading />
        </div>
      </template>
      <Button class="p-button-text p-button-plain no-shadow float-btn" icon="pi pi-plus" @click="folderOption(1, 0)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { propFolderPageState } from "./propFoldersPageState";
import { onMounted, ref } from "vue";
import FolderItem from "@/app/unit/shared/items/foldersItem/foldersItemScreen.vue";
import { PageStore } from "@/core/store/page.store";
import { useRoute } from "vue-router";

export default {
  components: {
    FolderItem,
  },
  setup() {
    const state = ref(new propFolderPageState());
    const pId = ref(0);
    const route = ref(useRoute());
    onMounted(() => {
      state.value.getFolders();
      pId.value = Number(route.value.params.pId);
    });

    function folderOption(key, folderId) {
      switch (key) {
        case 1:
          state.value.postData = {
            type: true,
            workPageId: Number(PageStore().selectedPageId * -1),
            title: "",
            folderId: 0,
            showDialog: true,
          };
          break;
        case 2:
          state.value.postData = {
            type: false,
            workPageId: Number(PageStore().selectedPageId * -1),
            title: state.value.postData.title,
            folderId: folderId,
            showDialog: true,
          };
          break;
        default:
          break;
      }
    }

    const initUpdate = (data) => {
      folderOption(2, data.id);
      state.value.postData.title = data.title;
    };

    const removeFolder = (id) => {
      state.value.listFolder = state.value.listFolder.filter((val) => val.id !== id);
    };

    return {
      state,
      folderOption,
      initUpdate,
      removeFolder,
      pId
    };
  },
};
</script>

<style lang="scss" scoped>
.header-product-props {
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
  }
}

.btn-create {
  position: fixed;
}

.form-folder-control {
  display: flex;
  flex-direction: column;
  padding: 20px !important;

  input {
    margin: 5px 0 15px !important;
    color: #212121;
    box-shadow: 0 0 5px #b5b5b5 !important;
    padding: 10px !important;

    &:focus {
      box-shadow: 0 0 5px #b5b5b5 !important;
    }
  }
}
</style>
