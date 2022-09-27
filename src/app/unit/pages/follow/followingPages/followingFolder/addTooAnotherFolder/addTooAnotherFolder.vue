<template>
  <div class="container">
    <!--  header  -->

    <div
        class="w-100 d-flex align-items-center justify-content-between px-3 mt-4"
    >
      <p class="fit-content my-auto smart-text-align">
        {{ $t("select-folder-for-transfer") }}
      </p>
      <i
          class="fas fa-folder-plus font-size-custom"
          @click="displayCreateNewFolderDialog = true"
      ></i>
    </div>

    <!--  cards -->
    <loading v-if="state.foldersLoading"/>
    <div v-else id="scroll-follow-folder" class="row">
      <div
          v-for="item in state.followingFolderList"
          key="item"
          class="
          col-5
          mt-4
          p-1
          my-2
          mx-auto
          card
          uper-card-1
          hover-pointer
          fit-height
        "
      >
        <div
            class="height100"
            @click="transferToAnotherFolderFunc(item.folderId)"
        >
          <div
              v-if="item.followings.length === 0"
              class="empty-list d-flex align-items-center"
          >
            <i class="mx-auto fas fa-box-open empty-icon"></i>
          </div>
          <img
              v-if="item.followings.length === 1"
              v-lazy="item.followings[0].profileImageUrl + '_sm.webp'"
              alt="img"
              class="resize-1img"
          />
          <div
              v-else-if="item.followings.length === 2"
              class="row m-auto resize-2div"
          >
            <div v-for="img in item.followings" key="img" class="col-6 p-0">
              <img
                  v-lazy="img.profileImageUrl + '_sm.webp'"
                  alt="img"
                  class="resize-2img"
              />
            </div>
          </div>
          <div v-else class="row m-auto">
            <div v-for="img in item.followings" key="img" class="col-6 p-0">
              <img
                  v-lazy="img.profileImageUrl + '_sm.webp'"
                  alt="img"
                  class="resize-4img"
              />
            </div>
          </div>
          <p class="text-center mx-auto mt-auto text-break card-txt">
            {{ item.folderTitle }}
          </p>
        </div>
      </div>
      <div v-if="!state.repliesIsFinished" class="col-12 mx-auto">
        <loading/>
      </div>
    </div>
  </div>

  <!--  create new folder (dialog) -->
  <Dialog
      v-model:visible="displayCreateNewFolderDialog"
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
    <div class="d-flex align-items-center justify-content-around mt-4">
      <input
          v-model="newFolderName"
          :placeholder="$t('createNewFolder')"
          class="input-style px-2 border-radius-10px form-control w-100 mx-3"
          maxlength="20"
          type="text"
      />
    </div>
    <div class="d-flex align-items-center justify-content-around mt-3 mb-1">
      <Button
          :label="$t('apply')"
          class="
          mx-auto
          p-button-secondary p-button-text
          shadow-sm
          w-50
          bg-custom
        "
          @click="createFolderFunc"
      />
    </div>
  </Dialog>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from "vue";
import {addTooAnotherFolderState} from "./addTooAnotherFolderState";
import {PageStore} from "@/core/store/page.store";
import {BASE_TAKE} from "@/core/constant/constant";
import {
  elementRemoveEventListener,
  windowScrolledToBottom,
} from "@/core/service/utils.service";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export default {
  name: "addTooAnotherFolder",
  props: ["displayAddFollowingToList", "selectedItem", "folderId"],
  setup(props, {emit}) {
    const myPageId = PageStore().selectedPageId;
    const state = ref(new addTooAnotherFolderState());
    const displayCreateNewFolderDialog = ref(false);
    const displayAddFollowingToList = ref();
    const newFolderName = ref();
    var pagesId = [];

    watch(
        () => props.displayAddFollowingToList,
        () => {
          displayAddFollowingToList.value = props.displayAddFollowingToList;
        }
    );
    const getFolders = () => {
      let model = {
        take: BASE_TAKE,
        pageId: myPageId,
      };
      state.value.GetFollowingFolder(model);
    };

    onMounted(() => {
      getFolders();
      windowScrolledToBottom(() => {
        getFolders();
      });
    });

    const createFolderFunc = () => {
      if (!newFolderName.value) {
        ToastService.getInstance().warning(i18n.global.tc("input_is_empty"));
      } else {
        ToastService.getInstance().warning(i18n.global.tc("creating"));
        let model = {
          title: newFolderName.value,
          pageId: myPageId,
          folderIsFollowing: true,
        };
        state.value.CreateFolder(model);
        newFolderName.value = "";
        displayCreateNewFolderDialog.value = false;
      }
    };

    props.selectedItem.forEach(function (e) {
      if (e.select === true) pagesId.push(e.pageId);
    });
    const transferToAnotherFolderFunc = (targetFolderId) => {
      if (targetFolderId == props.folderId) {
        ToastService.getInstance().error(i18n.global.tc("same folder"));
        return;
      }
      if (pagesId.length == 0) {
        ToastService.getInstance().error(
            i18n.global.tc("not selected following")
        );
        return;
      }
      ToastService.getInstance().success(i18n.global.tc("in sending"));
      let model = {
        sourcePageId: myPageId,
        targetPageId: pagesId,
        sourceFolderId: props.folderId,
        targetFolderId: targetFolderId,
      };
      state.value.moveFollowings(model);

      for (let i = 0; i < pagesId.length; i++)
        props.selectedItem.splice(
            props.selectedItem.findIndex((e) => e.select === true),
            1
        );
      pagesId = [];
      props.selectedItem.forEach(function (e) {
        e.select = false;
      });
      emit("displayAddFollowingToList");
    };

    onUnmounted(() => {
      elementRemoveEventListener("scroll-follow-folder");
    });
    return {
      displayCreateNewFolderDialog,
      displayAddFollowingToList,
      newFolderName,
      state,
      createFolderFunc,
      transferToAnotherFolderFunc,
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

#scroll-follow-folder {
  overflow-y: auto !important;
  height: 70vh;
}

.fit-height {
  height: fit-content;
}

.bg-custom {
  background-color: rgb(197, 228, 231) !important;
}

.font-size-custom {
  font-size: 29px;
}
</style>
