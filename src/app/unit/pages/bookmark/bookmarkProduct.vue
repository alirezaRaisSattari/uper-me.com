<template>
  <div
      id="scroll-follow-folder"
      class="d-flex flex-column align-items-center p-3 fit-width"
  >
    <Dialog
        v-model:visible="createNewFolderDialog"
        :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
        :contentStyle="{ background: 'rgb(255, 255, 255)'}"
        :showHeader="false"
        :style="{}"
        dismissableMask
        header=""
        modal
    >
      <div class="d-flex flex-column align-items-center p-3">
        <input
            v-model="newFolderName"
            :placeholder="$t('folder_name')"
            class="form-control"
            type="text"
        />
        <Button
            :label="$t('create')"
            class="my-3 p-button-rounded p-button-success px-3"
            @click="createFolder"
        />
      </div>
    </Dialog>
    <Button
        :label="$t('addFolder')"
        class="p-button-outlined p-button-success rounded-pill"
        @click="createNewFolderDialog = !createNewFolderDialog"
    />
    <loading v-if="state.loadingFolders && !state.isNull"/>

    <p v-if="state.isNull" class="my-2 text-Secondary">{{ $t("noItems") }}</p>
    <div
        v-if="state.allFolders != null"
        class="w-100 d-flex flex-wrap justify-content-between"
    >
      <confirmDialog
          :header="$t('to-transfer-item')"
          :icon="'fas fa-question'"
          :status="'success'"
          :text="$t('sureTransferItems')"
          :visible="bookmarkDialog"
          @accept="moveToFolder"
          @reject="bookmarkDialog = false"
      />
      <div
          v-for="folder in state.allFolders"
          :key="folder"
          class="mt-4 pt-1 px-1 my-2 mx-auto card uper-card-1 hover-pointer fit-height "
          @click="openConfirmDialog(folder.folderId)"
      >
        <div v-if="folder.products.length === 0">
          <div class="row">
            <div class="col-12 custom-padding">
              <i class="mx-auto fas fa-box-open empty-icon"></i>
            </div>
          </div>
        </div>

        <div v-if="folder.products.length >= 0">
          <div class="row m-auto mb-2">
            <div v-for="img in folder.products" :key="img" class="p-0 img-product">
              <img v-lazy="img.mainImageUrl + '_sm.webp'" alt="img" class="resize-4img"/>
            </div>
          </div>
        </div>
        <p class="text-center mx-auto text-break card-txt pt-2">
          {{ folder.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";
import {BookmarkProductState} from "./BookmarkProductState";
import {BASE_TAKE} from "@/core/constant/constant";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";

import {
  elementIdScrolledToBottom,
  getSelectedPageId,
} from "@/core/service/utils.service";

export default {
  name: "bookmarkProduct",
  components: {
    confirmDialog,
  },
  props: {
    Id: {
      type: Number,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, {emit}) {
    const state = ref(new BookmarkProductState());
    const createNewFolderDialog = ref(false);
    const bookmarkDialog = ref(false);
    const newFolderName = ref("");
    const folderId = ref();

    function getFolders() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        pageId: Math.abs(getSelectedPageId()),
      };
      state.value.GetBookMarkFolder(model);
    }

    onMounted(() => {
      getFolders();
      elementIdScrolledToBottom("scroll-follow-folder", () => {
        getFolders();
      });
    });

    function createFolder() {
      if (newFolderName.value.length > 0) {
        let model = {
          pageId: getSelectedPageId(),
          name: newFolderName.value,
        };
        state.value.CreateBookMarkFolder(model, () => {
          state.value.loadingFolders = false;
          state.value.foldersIsFinished = false;
          getFolders();
        });
        createNewFolderDialog.value = false;
      }
      newFolderName.value = "";
    }

    function openConfirmDialog(id) {
      bookmarkDialog.value = !bookmarkDialog.value;
      folderId.value = id;
    }

    const close = () => {
      emit("close");
    };
    function moveToFolder() {
      let model = {
        pageId: getSelectedPageId(),
        productId: props.Id,
        folderId: folderId.value,
      };
      state.value.bookmarkPost(model, () => {
        state.value.loadingFolders = false;
        state.value.foldersIsFinished = false;
        getFolders();
      });
      bookmarkDialog.value = false;
      close();
    }


    return {
      createNewFolderDialog,
      bookmarkDialog,
      newFolderName,
      state,
      openConfirmDialog,
      moveToFolder,
      createFolder,
    };
  },
};
</script>

<style scoped>
.fit-height {
  height: fit-content;
}

.resize-1img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
  height: 135px;
}

.resize-4img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
}

.img-product {
  width: 60px;
}

.empty-icon {
  font-size: 50px;
  color: black;
}

.fit-width {
  width: 100%;
}

.custom-padding {
  padding: 10px 40px 0 40px;
}

.uper-card-1 {
  width: 60%;
  padding: 10px 16px 0px 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
