<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div
        class="w-100 d-flex align-items-center justify-content-between px-3 mt-4"
    >
      <p class="fit-content my-auto">
        {{ $t("select-folder-for-transfer") }}
      </p>
      <Button
          :label="$t('create')"
          class="p-button-secondary p-button-text shadow-sm w-25 p-button-rounded"
          @click="displayCreateNewFolderDialog = true"
      />
    </div>

    <loading v-if="state.foldersLoading" class="mx-auto"/>
    <div v-else id="scroll-follow-folder" class="row">
      <div
          v-for="item in state.followingFolderList"
          key="item"
          class="
          col-5
          mt-4
          pt-1
          px-1
          my-2
          mx-auto
          card
          uper-card-1
          hover-pointer
          fit-height
        "
          @click="moveFollowing(item.folderId)"
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
        <div v-else class="row m-auto mb-2">
          <div v-for="img in item.followings" key="img" class="col-6 p-0">
            <img
                v-lazy="img.profileImageUrl + '_sm.webp'"
                alt="img"
                class="resize-4img"
            />
          </div>
        </div>
        <p class="text-center mx-auto text-break card-txt pt-2">
          {{ item.folderTitle }}
        </p>
      </div>
      <div>
        <loading v-if="!state.repliesIsFinished"/>
      </div>
    </div>
  </div>

  <!--  create new folder -->
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
      <input v-model="newFolderText" type="text"/>
      <Button
          :label="$t('create')"
          class="p-button-secondary p-button-text shadow-sm w-25 p-button-rounded"
          @click="createFolderFunc"
      />
    </div>
  </Dialog>
</template>

<script>
import {followDialogState} from "./followDialogState";
import {onMounted, ref} from "vue";
import {PageStore} from "@/core/store/page.store";
import {BASE_TAKE} from "@/core/constant/constant";

export default {
  name: "followDialog",
  components: {
    followDialogState,
  },
  props: ["userPageId"],
  setup(props, {emit}) {
    const myPageId = PageStore().selectedPageId;
    const state = ref(new followDialogState());
    const displayCreateNewFolderDialog = ref(false);
    const newFolderText = ref("");
    // get folders
    const getFolders = () => {
      let model = {
        take: BASE_TAKE,
        pageId: myPageId,
      };
      state.value.GetFollowingFolder(model);
    };

    onMounted(() => {
      getFolders();
    });

    // create following folder
    const createFolderFunc = () => {
      let model = {
        title: newFolderText.value,
        pageId: myPageId,
        folderIsFollowing: true,
      };
      state.value.CreateFolder(model);
      newFolderText.value = "";
      displayCreateNewFolderDialog.value = false;
    };

    // move following to specify folder
    const moveFollowing = (targetFolderId) => {
      let model = {
        sourcePageId: myPageId,
        targetPageId: [props.userPageId],
        sourceFolderId: -1,
        targetFolderId: targetFolderId,
      };
      state.value.moveFollowings(model);
      emit("close");
    };

    return {
      displayCreateNewFolderDialog,
      state,
      newFolderText,
      createFolderFunc,
      moveFollowing,
    };
  },
};
</script>

<style scoped>
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

.empty-list {
  height: 135px;
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
</style>
