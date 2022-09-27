<template>
  <confirmDialog
    :header="$t('to-transfer-item')"
    :icon="'fas fa-question'"
    :status="'success'"
    :text="$t('sureTransferItems')"
    :visible="bookmarkDialog"
    @accept="moveToFolder"
    @reject="bookmarkDialog = false"
  />
  <div id="scroll-follow-folder">
    <Dialog
      v-model:visible="createNewFolderDialog"
      :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{ background: 'rgb(255, 255, 255)' }"
      :showHeader="false"
      :style="{}"
      dismissableMask
      header=""
      modal
      @hide="refreshFolderName()"
    >
      <div class="d-flex flex-column align-items-center p-3">
        <input
          v-model="newFolderName"
          :placeholder="$t('folder_name')"
          class="form-control"
          maxlength="20"
          type="text"
        />
        <Button
          :label="$t('create')"
          class="my-3 p-button-rounded p-button-success px-3"
          @click="createFolder"
        />
      </div>
    </Dialog>
    <div class="container">
      <!--  header  -->
      <div
        class="
          w-100
          d-flex
          align-items-center
          justify-content-between
          px-3
          mt-4
        "
      >
        <p class="fit-content my-auto smart-text-align">
          {{ $t("select-folder") }}
        </p>
        <div
          class="hover-pointer"
          @click="createNewFolderDialog = !createNewFolderDialog"
        >
          <i class="fas fa-folder-plus font-size-custom"></i>
        </div>
      </div>

      <p v-if="state.isNull" class="my-2 text-Secondary">{{ $t("noItems") }}</p>

      <!--  cards -->
      <loading v-if="state.loadingFolders && !state.isNull" />
      <div v-else id="scroll-follow-folder" class="row">
        <div
          v-for="folder in state.allFolders"
          :key="folder"
          class="
            col-5
            p-1
            mt-4
            my-2
            mx-auto
            card
            uper-card-1
            hover-pointer
            fit-height
            mb-auto
          "
        >
          <div class="height100" @click="openConfirmDialog(folder.folderId)">
            <div
              v-if="folder.posts.length === 0"
              class="empty-list d-flex align-items-center"
            >
              <i class="mx-auto fas fa-box-open empty-icon"></i>
            </div>
            <img
              v-if="folder.posts.length === 1"
              v-lazy="folder.posts[0].coverImageUrl"
              alt="img"
              class="resize-1img"
            />
            <div
              v-else-if="folder.posts.length === 2"
              class="row m-auto resize-2div"
            >
              <div v-for="img in folder.posts" :key="img" class="col-6 p-0">
                <img v-lazy="img.coverImageUrl" alt="img" class="resize-2img" />
              </div>
            </div>
            <div v-else class="row m-auto">
              <div v-for="img in folder.posts" :key="img" class="col-6 p-0">
                <img v-lazy="img.coverImageUrl" alt="img" class="resize-4img" />
              </div>
            </div>
          </div>
          <p class="text-center mx-auto mt-auto text-break card-txt">
            {{ folder.name }}
          </p>
        </div>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { bookmarkState } from "./bookmarkState";
import { BASE_TAKE } from "@/core/constant/constant";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";

import {
  elementIdScrolledToBottom,
  getSelectedPageId,
} from "@/core/service/utils.service";

export default {
  name: "bookmark",
  components: {
    confirmDialog,
  },
  props: {
    Id: {
      type: Number,
      required: true,
    },
  },

  setup(props, { emit }) {
    const state = ref(new bookmarkState());
    const createNewFolderDialog = ref(false);
    const bookmarkDialog = ref(false);
    const newFolderName = ref("");
    const folderId = ref();

    function getFolders() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        pageId: getSelectedPageId(),
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
        state.value.CreateBookMarkFolder(model);
        createNewFolderDialog.value = false;
      }
    }

    function refreshFolderName() {
      newFolderName.value = "";
    }

    function openConfirmDialog(id) {
      bookmarkDialog.value = !bookmarkDialog.value;
      folderId.value = id;
    }

    function moveToFolder() {
      let model = {
        pageId: getSelectedPageId(),
        postId: props.Id,
        folderId: folderId.value,
      };
      state.value.bookmarkPost(model, () => {
        state.value.loadingFolders = false;
        state.value.foldersIsFinished = false;
        emit("bookmarked");
      });
      bookmarkDialog.value = false;
    }

    return {
      state,
      createNewFolderDialog,
      newFolderName,
      createFolder,
      moveToFolder,
      openConfirmDialog,
      refreshFolderName,
      bookmarkDialog,
    };
  },
};
</script>

<style scoped>
.resize-1img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
  height: 201px;
}

.resize-2img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
  height: 50%;
}

.resize-2div {
  height: 201px;
}

.resize-4img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
  height: 100px;
}

@media (max-width: 430px) {
  .resize-1img {
    width: 100%;
    padding: 3px;
    border-radius: 7px;
    height: 140px;
  }

  .resize-2img {
    width: 100%;
    padding: 3px;
    border-radius: 7px;
    height: 50%;
  }

  .resize-2div {
    height: 140px;
  }

  .resize-4img {
    width: 100%;
    padding: 3px;
    border-radius: 7px;
    height: 70px;
  }

  .empty-list {
    height: 140px !important;
  }
}

.empty-list {
  height: 201px;
}

.height100 {
  height: 100%;
}

.empty-icon {
  font-size: 50px;
  color: black;
}

.fit-height {
  height: fit-content;
}

.font-size-custom {
  font-size: 29px;
}

.bg-custom {
  background-color: rgb(197, 228, 231) !important;
}
</style>
