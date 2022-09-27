<template>
  <h5 class="header-title mt-3">{{ folderName }}</h5>
  <div class="d-flex justify-content-center" :class="{'d-none' : !showCheckBox}">
    <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
  </div>
  <div class="w-100 px-2 d-flex justify-content-between">
    <span class="mar-top">{{ $t("products") }}</span>
    <i
        v-if="!showCheckBox"
        class="fas fa-ellipsis-v text-dark hover-pointer mar-left pointer-cursor"
        @click="showOptionModal = !showOptionModal"
    ></i>
    <div v-else class="d-flex">
      <span class="mx-2 hover-pointer" @click="showFolders">{{
          $t("transfer")
        }}</span>
      <span class="mx-2 hover-pointer" @click="showCheckBox = false">{{
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
  <div v-else class="d-flex flex-wrap my-4 px-2 base">
    <ratio
        v-for="product in State.allItems"
        :key="product"
        :ratio="'1/1'"
        class="post-cover my-3 hover-pointer"
    >
      <img
          v-lazy="product.mainImageUrl + '_sm.webp'"
          alt=""
          class="mx-auto rounded markPic"
          @click="gotoProduced(product.productId)"
      />
      <input
          v-model="product.selectPost"
          :class="showCheckBox ? 'show' : ''"
          class="selecting-checkbox"
          type="checkbox"
      />
      <div
          class="w-100 text-left bookmark-icon "
          @click="unbookmark(product.productId)"
      >
        <p class="des">
          {{ product.productName }}
        </p>
        <i class="icon-font ubookmark"></i>
      </div>
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
      <div v-else id="scroll-follow-folder hover-pointer" class="row extra-height">
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
                v-if="folder.products.length === 0"
                class="empty-list d-flex align-items-center"
            >
              <i class="mx-auto fas fa-box-open empty-icon"></i>
            </div>
            <img
                v-if="folder.products.length === 1"
                v-lazy="folder.products[0].coverImageUrl"
                alt="img"
                class="resize-1img"
            />
            <div
                v-else-if="folder.products.length === 2"
                class="row m-auto resize-2div"
            >
              <div v-for="img in folder.products" :key="img" class="col-6 p-0">
                <img v-lazy="img.coverImageUrl" alt="img" class="resize-2img"/>
              </div>
            </div>
            <div v-else class="row m-auto">
              <div v-for="img in folder.products" :key="img" class="col-6 p-0">
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
  <confirm-dialog
      :header="$t('deleteItem')"
      :icon="'fa fa-trash'"
      :text="$t('deleteProducttMessage')"
      :visible="confirmUnbookmarkDialog"
      @accept="confirmUnbookmark"
      @reject="confirmUnbookmarkDialog = false"
      @times="confirmUnbookmarkDialog = false"
      :status="'danger'"
  />

</template>

<script>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getSelectedPageId, slugify} from "@/core/service/utils.service";
import {productItemsState} from "./productFolderItemsState";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import {BASE_TAKE} from "@/core/constant/constant";
import router from "@/core/router/router";
import bookmarkProductVue from './bookmarkProduct.vue';

export default {
  components: {ratio, confirmDialog},
  setup() {
    const State = ref(new productItemsState());
    const route = useRoute();
    const folderName = ref(route.params.name);
    const folderId = ref(route.params.folderId);
    const showCheckBox = ref(false);
    const showOptionModal = ref(false);
    const updateFolderName = ref(false);
    const foldersNewName = ref("");
    const openConfirmDialog = ref(false);
    const selectedPosts = ref([]);
    const displayFolders = ref(false);
    const confirmMovingDialog = ref(false);
    const confirmUnbookmarkDialog = ref(false);
    const productId = ref();
    const selectedFolder = ref();

    function getItems() {
      State.value.getItems(getSelectedPageId(), folderId.value);
    }

    onMounted(() => {
      getItems();
    });

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

    function openConfirm() {
      openConfirmDialog.value = !openConfirmDialog.value;
      showOptionModal.value = !showOptionModal.value;
    }

    function deleteFolder() {
      if (State.value.allItems.length == 0) {
        State.value.deleteBookmarkFolder(folderId.value, () => {
          router.back();
        });
      } else {
        ToastService.getInstance().warning(i18n.global.tc("folderNotEmpty"));
        openConfirmDialog.value = false;
      }
    }

    function movingItems() {
      showCheckBox.value = !showCheckBox.value;
      showOptionModal.value = false;
    }

    function getProductsFolders() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        pageId: Math.abs(getSelectedPageId()),
      };
      State.value.GetProductsFolder(model);
    }

    function showFolders() {
      State.value.allItems.forEach((e) => {
        if (e.selectPost) selectedPosts.value.push(e.productId);
      });
      if (selectedPosts.value.length > 0) {
        displayFolders.value = !displayFolders.value;
        getProductsFolders();
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
        sourceFolderId: parseInt(folderId.value),
        targetFolderId: selectedFolder.value,
        productIds: selectedPosts.value,
      };
      State.value.MovePostBetweenFolders(model, () => {
        showCheckBox.value = false;
        confirmMovingDialog.value = false;
        displayFolders.value = false;
        State.value.itemsIsFinished = false;
        selectedPosts.value.forEach((e) => {
          if (selectedPosts.value.length === State.value.allItems.length) {
            router.back();
          } else {
            State.value.allItems.forEach((i) => {
              if (i.productId == e) {
                var index = State.value.allItems.indexOf(i);
                State.value.allItems.splice(index, 1);
              }
            });
          }
        });
      });
    }

    function unbookmark(id) {
      productId.value = id;
      confirmUnbookmarkDialog.value = !confirmUnbookmarkDialog.value;
    }

    function confirmUnbookmark() {
      let model = {
        pageId: getSelectedPageId(),
        productId: productId.value,
      };
      State.value.unBookmarkProduct(model, () => {
        State.value.allItems.forEach((item) => {
          if (item.productId === productId.value) {
            var index = State.value.allItems.indexOf(item)
            State.value.allItems.splice(index, 1)
          }
          confirmUnbookmarkDialog.value = false
        })
      })
    }
    function gotoProduced(productId){
      router.push(`/product/${productId}/${null}/${slugify(product.name)}`)
    }

    return {
      State,
      folderName,
      showCheckBox,
      showOptionModal,
      openUpdateNameDialog,
      updateFolderName,
      foldersNewName,
      confirmFolderName,
      openConfirm,
      openConfirmDialog,
      deleteFolder,
      movingItems,
      showFolders,
      displayFolders,
      moveToThisFolder,
      confirmMovingDialog,
      confirmMoveItem,
      unbookmark,
      confirmUnbookmarkDialog,
      confirmUnbookmark,
      gotoProduced
    };
  },
};
</script>

<style scoped>
.base {
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.mar-left {
  margin-left: 15px !important;
}

.mar-top {
  margin-top: -30px !important;
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
  width: 35%;
  border-radius: 10px;
  position: relative;
  margin: 25px;
}

.des {
  max-width: 200px;
  max-height: 70px;
  margin: 0;
  overflow: hidden;
  text-align: right;
  padding-right: 20px;
}

.btn-color {
  background: #7262ab;
  color: #fff !important;
}
.fa-bookmark {
  padding-right:15px;
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

.bookmark-icon {
  position: absolute;
  bottom: 30px;
  left: 9px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.extra-height {
  height: 300px !important;
}

.markPic {
  padding: 10px !important;
  width: 100%;
  height: 60%;
}
.pointer-cursor{cursor: pointer;
  position: relative;
  top: -34px;}
</style>
