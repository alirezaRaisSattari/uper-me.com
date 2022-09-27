<template>
  <div>
    <div
      id="all"
      class="mt-3 d-flex justify-content-between align-items-center rtl"
    >
      <div class="d-flex">
        <p class="m-2">{{ $t("followings") }}</p>
        <p class="m-2 folder-name">{{ state.folderName }}</p>
      </div>
      <i
        v-if="!ellipsisClicked"
        class="hover-pointer m-2 fas fa-ellipsis-v ellipsis-size px-3 py-2"
        @click="displayDetails = true"
      ></i>
      <div v-if="ellipsisClicked">
        <i
          class="m-2 fas fa-times icon-size hover-pointer"
          @click="
            ellipsisClicked = false;
            untick();
          "
        ></i>
        <i
          :class="canTransfer === 0 ? 'p-disabled' : ''"
          class="m-2 fas fa-folder-plus icon-size hover-pointer"
          @click="displayAddFollowingToList = true"
        ></i>
      </div>
    </div>

    <br />
    <Dialog
      v-model:visible="displayAddFollowingToList"
      :breakpoints="{
        '1800px': '32vw',
        '1000px': '55vw',
        '1400px': '40vw',
        '1300px': '45vw',
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
      <AddFollowingToListDialog
        :displayAddFollowingToList="displayAddFollowingToList"
        :folderId="folderId"
        :selectedItem="state.folderInfoList"
        @displayAddFollowingToList="displayAddFollowingToList = false"
      />
    </Dialog>
    <div v-for="item in state.folderInfoList" :key="item" class="card d-flex">
      <div class="d-flex justify-content-between align-items-center rtl p-2">
        <i
          v-if="ellipsisClicked && item.select"
          class="far fa-check-square icon-size my-auto text-dark"
          @click="selectFunc(item)"
        ></i>
        <i
          v-if="ellipsisClicked && !item.select"
          class="far fa-square icon-size my-auto text-dark"
          @click="selectFunc(item)"
        ></i>
        <router-link
          :to="`/page/${item.username}`"
          class="text-decoration-none w-61"
        >
          <div class="d-flex">
            <img
              v-lazy="item.profileImageUrl + '_sm.webp'"
              alt=""
              class="profileImg m-2 my-auto"
            />
            <span class="ml-auto my-auto headOfComment">
              <p class="my-auto d-flex mt-2 text-sm text-dark">
                {{ item.name }}
              </p>
              <p class="my-auto username d-flex text-sm text-dark">
                {{ item.username }}
              </p>
            </span>
          </div>
        </router-link>
        <Button
          :label="$t('unFollow')"
          class="
            p-button-secondary p-button-text
            shadow-sm
            w-30
            p-button-rounded
          "
          @click="
            state.openConfirmDialog = true;
            pageIdForDelete = item.pageId;
          "
        />
      </div>
    </div>
    <div v-if="state.followingLoading">
      <loading />
    </div>
    <p v-else-if="state.folderInfoList.length === 0" class="text-center">
      {{ $t("emptyFolderList") }}
    </p>

    <Dialog
      v-model:visible="displayDetails"
      :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{ background: 'rgb(255, 255, 255)'}"
      :showHeader="false"
      :style="{ borderRadius: '100px' }"
      dismissableMask
      header=""
      modal
    >
      <div v-if="folderId > 0">
        <div class="d-flex align-items-center ltr pr-1">
          <Button
            :label="$t('edit')"
            class="p-button-text w-100 p-button-rounded m-2 mr-0"
            @click="displayEdit = true"
          />
          <i
            class="fas fa-edit icon-size iconOfDialog mr-2"
            @click="displayEdit = true"
          ></i>
        </div>

        <div class="d-flex align-items-center ltr pr-2">
          <Button
            :label="$t('delete')"
            class="p-button-text w-100 p-button-rounded m-2 mr-0"
            @click="deleteFolder()"
          />
          <i
            class="fas fa-trash icon-size iconOfDialog mr-2"
            @click="deleteFolder()"
          ></i>
        </div>
      </div>
      <div class="d-flex align-items-center ltr pr-2">
        <Button
          :label="$t('to-transfer-item')"
          class="p-button-text w-100 p-button-rounded m-2 mr-0"
          @click="transferItem()"
        />
        <i
          class="fas fa-folder-plus icon-size iconOfDialog mr-2"
          @click="transferItem()"
        ></i>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="displayEdit"
      :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{ background: 'rgb(255, 255, 255)'}"
      :showHeader="false"
      :style="{ borderRadius: '100px' }"
      dismissableMask
      header=""
      modal
      @hide="editedFolderName = ''"
    >
      <div
        class="
          d-flex
          flex-column
          align-items-center
          justify-content-around
          mt-4
        "
      >
        <p class="">
          <b>{{ $t("changeFolderName") }}</b>
        </p>
        <input
          v-model="editedFolderName"
          :placeholder="$t('changeFolderName')"
          class="w-75 h-custom form-control"
          maxlength="20"
          type="text"
        />
        <Button
          :label="$t('edit')"
          class="
            p-button-secondary p-button-text
            shadow
            w-25
            p-button-rounded
            my-4
          "
          @click="editItem"
        />
      </div>
    </Dialog>
  </div>
  <confirmDialog
    :header="$t('unfollow')"
    :icon="'fa fa-exclamation-triangle'"
    :text="$t('ensure unfollow')"
    :visible="state.openConfirmDialog"
    status="danger"
    @accept="unfollowFunc()"
    @reject="state.openConfirmDialog = false"
    @times="state.openConfirmDialog = false"
  />
  <div class="sm-botton-margin"></div>
</template>

<script>
import { followingFolderState } from "./followingFolderState";
import { useRoute } from "vue-router";
import { onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";
import { PageStore } from "@/core/store/page.store";
import { BASE_TAKE } from "@/core/constant/constant";
import AddFollowingToListDialog from "./addTooAnotherFolder/addTooAnotherFolder.vue";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import { i18n } from "@/main";
import { ToastService } from "@/core/service/toast.service";
import { ScrollController } from "@/core/service/scroll.service";

export default {
  name: "followingFolder",
  components: {
    confirmDialog,
    AddFollowingToListDialog,
  },
  setup() {
    const displayAddFollowingToList = ref(false);
    const pageIdForDelete = ref(0);
    const displayDetails = ref(false);
    const isSelected = ref(true);
    const ellipsisClicked = ref(false);
    const myPageId = ref(PageStore().selectedPageId);
    const route = useRoute();
    const folderId = ref();
    const displayEdit = ref(false);
    folderId.value = route.params.folderId;
    const state = ref(new followingFolderState());
    state.value.folderName = route.params.folderName;
    const editedFolderName = ref("");
    let scrollCtrl = new ScrollController(onScroll);
    const canTransfer = ref(0);
    const getFolders = () => {
      let model = {
        pageId: myPageId.value,
        skip: 0,
        take: BASE_TAKE,
        folderId: parseInt(folderId.value),
      };
      state.value.GetFollowingFolderInfo(model);
    };

    function onScroll() {
      getFolders();
    }

    onMounted(() => {
      getFolders();
      scrollCtrl.startListen();
    });

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    const unfollowFunc = () => {
      ToastService.getInstance().warning(i18n.global.tc("unfollowing"));
      let index = state.value.folderInfoList
        .map(function (e) {
          return e.pageId;
        })
        .indexOf(pageIdForDelete.value);

      let model2 = {
        sourcePageId: myPageId.value,
        targetPageId: pageIdForDelete.value,
      };
      state.value.unFollow(model2);
      state.value.indexForDelete = index;
    };
    const transferItem = () => {
      ellipsisClicked.value = true;
      displayDetails.value = false;
    };

    const deleteFolder = () => {
      if (state.value.folderInfoList.length !== 0) {
        showError();
        return;
      }
      ToastService.getInstance().warning(i18n.global.tc("deleting"));
      state.value.deleteFolder(folderId.value, myPageId.value);
    };

    const showError = () => {
      ToastService.getInstance().warning(
        i18n.global.tc("first empty this folder")
      );
    };

    const editItem = () => {
      if (editedFolderName.value.length == 0) {
        ToastService.getInstance().warning(i18n.global.tc("input_is_empty"));
        return;
      }
      let model = {
        id: folderId.value,
        title: editedFolderName.value,
      };
      ToastService.getInstance().warning(i18n.global.tc("editing"));
      state.value.editFolder(model);
      displayEdit.value = false;
    };

    const selectFunc = (item) => {
      if (item.select) {
        canTransfer.value++;
      } else {
        canTransfer.value--;
      }
      item.select = !item.select;
    };
    onUnmounted(() => {
      window.addEventListener(
        "scroll",
        function (event) {
          event.stopImmediatePropagation();
        },
        true
      );
    });

    function untick() {
      state.value.folderInfoList.forEach((element) => {
        element.select = false;
      });
    }

    return {
      displayAddFollowingToList,
      ellipsisClicked,
      displayDetails,
      editedFolderName,
      canTransfer,
      isSelected,
      myPageId,
      folderId,
      displayEdit,
      state,
      getFolders,
      pageIdForDelete,
      deleteFolder,
      selectFunc,
      editItem,
      untick,
      transferItem,
      unfollowFunc,
    };
  },
};
</script>

<style scoped>
.profileImg {
  width: 55px;
  border-radius: 55px;
  border: 2px solid #707070;
}

.icon-size {
  font-size: 23px;
}

.ellipsis-size {
  font-size: 20px;
}

.folder-name {
  text-shadow: 0px 0px black;
  font-size: 17px;
}

.h-custom {
  height: 43px;
}

.w-61 {
  width: 61%;
}

.w-30 {
  width: 30%;
}
</style>
