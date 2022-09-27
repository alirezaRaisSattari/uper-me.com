<template>
  <h5 class="header-title mt-3" v-if="!showCheckBox">{{ folderName }}</h5>
  <div class="d-flex justify-content-center"  v-if="!showCheckBox">
    <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
  </div>
  <div class="w-100 px-2 d-flex justify-content-between content-post">
    <span >{{ $t("posts") }}</span>
    <i
        v-if="!showCheckBox"
        class="fas fa-ellipsis-v text-dark hover-pointer text-center-"
        @click="showOptionModal = !showOptionModal"
    ></i>
    <div v-else class="d-flex transfer-items">
      <span class="mx-1 hover-pointer p-2 hover-bg-primary" @click="showFolders">{{
          $t("transfer")
        }}</span>
      <span class="mx-1 hover-pointer p-2 hover-bg-primary" @click="showCheckBox = false">{{
          $t("cancel")
        }}</span>
    </div>
  </div>
  <p
      v-if="State.allItems.length == 0 && !State.loading"
      class="my-2 text-Secondary w-100 text-center"
  >
    {{ $t("noItems") }}
  </p>

  <loading v-if="State.loading"/>
  <div v-else class="d-flex flex-wrap my-4 justify-content-around px-2">
    <ratio
        v-for="post in State.allItems"
        :key="post"
        :ratio="'1/1'"
        class="post-cover my-3 hover-pointer"
    >
      <img
          v-lazy="post.coverImageUrl"
          alt=""
          class="mx-auto rounded"
          @click="showPost(post.pageDetails.pageId, post.postId , post.pageDetails.name)"
      />
      <input
          v-model="post.selectPost"
          :class="showCheckBox ? 'show' : ''"
          class="selecting-checkbox"
          type="checkbox"
      />
    </ratio>
  </div>
  <Dialog
      v-model:visible="showOptionModal"
      :contentStyle="{ borderRadius: '7px' }"
      :dismissableMask="true"
      :header="false"
      :modal="true"
      :showHeader="false"
      style="width: 18rem; border-radius: 15px !important"
  >
    <div class="p-3 d-flex flex-column">
      <p
          class="w-100 my-2 text-right hover-pointer"
          @click="openUpdateNameDialog"
      >
        <i class="far fa-edit ml-2"></i>
        <span>{{ $t("editFolderName") }}</span>
      </p>
      <p class="w-100 my-2 text-right hover-pointer" @click="openConfirm">
        <i class="fas fa-folder-minus ml-2"></i>
        <span>{{ $t("deleteFolder") }}</span>
      </p>
      <p class="w-100 my-2 text-right hover-pointer" @click="movingItems">
        <i class="fas fa-suitcase-rolling ml-2"></i>
        <span>{{ $t("transferItems") }}</span>
      </p>
    </div>
  </Dialog>
  <Dialog
      v-model:visible="updateFolderName"
      :contentStyle="{ borderRadius: '7px' }"
      :dismissableMask="true"
      :header="false"
      :modal="true"
      :showHeader="false"
      style="width: 18rem; border-radius: 15px !important"
  >
    <div class="w-10 p-3">
      <input
          v-model="foldersNewName"
          :placeholder="folderName"
          class="form-control"
          type="text"
      />
      <button
          class="btn w-100 mt-2 btn-color text-dark"
          @click="confirmFolderName"
      >
        {{ $t("submit") }}
      </button>
    </div>
  </Dialog>
  <confirm-dialog
      :header="$t('delete')"
      :icon="'fa fa-trash'"
      :status="'danger'"
      :text="$t('sureDelete')"
      :visible="openConfirmDialog"
      @accept="deleteFolder"
      @reject="openConfirmDialog = false"
      @times="openConfirmDialog = false"
  />
  <Dialog
      v-model:visible="displayFolders"
      :breakpoints="{
      '1000px': '52vw',
      '800px': '65vw',
      '600px': '91vw',
    }"
      :contentStyle="{
      background: 'rgb(255, 255, 255)',
      borderRadius: '12px',
    }"
      :showHeader="false"
      :style="{}"
      dismissableMask
      header=""
      modal
  >
    <div class="container">
      <p
          v-if="State.allFolders.length == 0 && !State.loadingFolders"
          class="my-2 text-Secondary w-100 text-center"
      >
        {{ $t("noItems") }}
      </p>
      <!--  cards -->
      <div v-else id="scroll-follow-folder hover-pointer" class="row">
        <div
            v-for="folder in State.allFolders"
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
            @click="moveToThisFolder(folder.folderId)"
        >
          <div class="height100">
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
                <img v-lazy="img.coverImageUrl" alt="img" class="resize-2img"/>
              </div>
            </div>
            <div v-else class="row m-auto">
              <div v-for="img in folder.posts" :key="img" class="col-6 p-0">
                <img v-lazy="img.coverImageUrl" alt="img" class="resize-4img"/>
              </div>
            </div>
          </div>
          <p class="text-center mx-auto mt-auto text-break card-txt">
            {{ folder.name }}
          </p>
        </div>
      </div>
    </div>
    <loading v-if="State.loadingFolders"/>
  </Dialog>
  <confirm-dialog
      :header="$t('transfer')"
      :icon="'fas fa-truck-moving'"
      :text="$t('sureTransferItems')"
      :visible="confirmMovingDialog"
      @accept="confirmMoveItem"
      @reject="confirmMovingDialog = false"
      @times="confirmMovingDialog = false"
  />
</template>

<script>
import {ref, onMounted, onBeforeUnmount} from "vue";
import {useRoute} from "vue-router";
import {BASE_TAKE} from "@/core/constant/constant";
import {getSelectedPageId} from "@/core/service/utils.service";
import {folderItemState} from "./postFolderItemState";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import router from "@/core/router/router";
import {ScrollController} from "@/core/service/scroll.service";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export default {
  components: {ratio, confirmDialog},
  setup() {
    let scrollCtrl = new ScrollController(onScroll);
    const State = ref(new folderItemState());
    const route = useRoute();
    const folderId = ref(route.params.folderId);
    const folderName = ref(route.params.folderName);
    const showOptionModal = ref(false);
    const openConfirmDialog = ref(false);
    const updateFolderName = ref(false);
    const showCheckBox = ref(false);
    const displayFolders = ref(false);
    const foldersNewName = ref("");
    const selectedPosts = ref([]);
    const confirmMovingDialog = ref(false);
    const selectedFolder = ref();

    function getItems() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        pageId: getSelectedPageId(),
        folderId: folderId.value,
      };
      State.value.getItems(model);
    }

    function onScroll() {
      getItems();
    }

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });
    onMounted(() => {
      getItems();
      scrollCtrl.startListen();
    });

    function showPost(pageId, postId, name) {
      router.push(`/post/mp/${pageId}/${postId}/${name}`);
    }

    function openConfirm() {
      openConfirmDialog.value = !openConfirmDialog.value;
      showOptionModal.value = !showOptionModal.value;
    }

    function deleteFolder() {
      State.value.deleteBookmarkFolder(folderId.value, () => {
        router.back();
      });
    }

    function openUpdateNameDialog() {
      showOptionModal.value = false;
      updateFolderName.value = !updateFolderName.value;
    }

    function confirmFolderName() {
      if (
          foldersNewName.value.length > 3 &&
          foldersNewName.value.length <= 20
      ) {
        let model = {
          pageId: getSelectedPageId(),
          name: foldersNewName.value,
          folderId: folderId.value,
        };
        State.value.updateFolderName(model, () => {
          folderName.value = foldersNewName.value;
          updateFolderName.value = false;
          foldersNewName.value = "";
        });
      } else {
        ToastService.getInstance().error(
            i18n.global.tc("foldersNameInvalidatin", {min: 4, max: 20})
        );
        foldersNewName.value = "";
      }
    }

    function movingItems() {
      showCheckBox.value = !showCheckBox.value;
      showOptionModal.value = false;
    }

    function getFolders() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        pageId: getSelectedPageId(),
      };
      State.value.GetBookMarkFolder(model);
    }

    function showFolders() {
      State.value.allItems.forEach((e) => {
        if (e.selectPost) selectedPosts.value.push(e.postId);
      });
      if (selectedPosts.value.length > 0) {
        displayFolders.value = !displayFolders.value;
        getFolders();
      } else
        ToastService.getInstance().error(i18n.global.tc("noItemsSelected"));
    }

    function moveToThisFolder(id) {
      confirmMovingDialog.value = !confirmMovingDialog.value;
      selectedFolder.value = id;
    }

    function confirmMoveItem() {
      let model = {
        pageId: getSelectedPageId(),
        sourceFolderId: folderId.value,
        targetFolderId: selectedFolder.value,
        postIds: selectedPosts.value,
      };
      State.value.MovePostBetweenFolders(model, () => {
        showCheckBox.value = false
        confirmMovingDialog.value = false
        displayFolders.value = false
        State.value.itemsIsFinished = false
        selectedPosts.value.forEach((e) => {
          State.value.allItems.forEach((i) => {
            if (i.postId == e) {
              var index = State.value.allItems.indexOf(i);
              State.value.allItems.splice(index, 1)
            }
          })
        })
      })
    }

    return {
      State,
      folderName,
      showPost,
      showOptionModal,
      openConfirmDialog,
      openConfirm,
      deleteFolder,
      updateFolderName,
      openUpdateNameDialog,
      foldersNewName,
      confirmFolderName,
      movingItems,
      showCheckBox,
      displayFolders,
      showFolders,
      confirmMovingDialog,
      moveToThisFolder,
      confirmMoveItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.transfer-items {
  flex-wrap: wrap;
  span {
    font-size: 14px;
  }

  @media screen and (max-width: 375px){
    flex-direction: column;
    text-align: center;
  }
}

.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}

.post-cover {
  width: 31%;
  border-radius: 10px;
  position: relative;
}

.btn-color {
  background: #7262ab;
  color: #fff !important;
}

.selecting-checkbox {
  position: absolute;
  top: -16px;
  display: none;
}

.show {
  display: block;
}

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

.content-post {
  position: relative;
  top: 0px;
}

.text-center- {
  margin-left: 15px;
}

</style>
