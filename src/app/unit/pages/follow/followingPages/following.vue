<template>
  <div id="all" class="container">
    <loading v-if="state.foldersLoading" />

    <div v-else class="row">
      <div
        v-for="item in state.followingFolderList"
        :key="item"
        class="col-4 hover-pointer m-0 p-1"
      >
        <div class="card uper-card-1 w-100 h-100">
          <router-link
            :to="{
              name: 'followingFolder',
              params: { folderName: item.folderTitle, folderId: item.folderId },
            }"
            class="
              d-flex
              flex-column
              align-content-around
              text-decoration-none
              height100
            "
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
              <div v-for="img in item.followings" :key="img" class="col-6 p-0">
                <img
                  v-lazy="img.profileImageUrl + '_sm.webp'"
                  alt="img"
                  class="resize-2img"
                />
              </div>
            </div>
            <div v-else class="row m-auto">
              <div v-for="img in item.followings" :key="img" class="col-6 p-0">
                <img
                  v-lazy="img.profileImageUrl + '_sm.webp'"
                  alt="img"
                  class="resize-4img"
                />
              </div>
            </div>
            <p
              class="
                smart-text-align
                mx-auto
                mt-auto
                text-break
                card-txt
                w-75
                text-one-line
              "
            >
              {{ item.folderTitle }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="sm-botton-margin"></div>
</template>

<script>
import ratio from "../../../../public/shared/ratio/ratio";
import { PageStore } from "@/core/store/page.store";
import { followingState } from "./followingState";
import { onMounted, onUnmounted, ref } from "vue";
import { elementRemoveEventListener } from "@/core/service/utils.service";

export default {
  name: "following",
  components: {
    ratio,
  },
  props: ["pageId"],
  setup(props) {
    const displayCreateNewFolderDialog = ref(false);
    const myPageId = ref(PageStore().selectedPageId);
    const state = ref(new followingState());
    const newFolderName = ref("");

    // get folders
    const getFolders = () => {
      let model = {
        pageId: myPageId.value,
      };
      state.value.GetFollowingFolder(model);
    };
    onMounted(() => {
      getFolders();
    });

    onUnmounted(() => {
      elementRemoveEventListener("all");
    });

    return {
      state,
      newFolderName,
    };
  },
};
</script>

<style scoped>
.resize-1img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
  height: 158px;
}

.resize-2img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
  height: 50%;
}

.resize-2div {
  height: 158px;
}

.resize-4img {
  width: 100%;
  padding: 3px;
  border-radius: 7px;
}

@media (max-width: 510px) {
  .resize-1img {
    height: 110px !important;
  }

  .resize-2div {
    height: 110px !important;
  }

  .empty-list {
    height: 130px !important;
  }

  .empty-icon {
    font-size: 40px !important;
  }
}

.empty-list {
  height: 158px;
}

.height100 {
  height: 100%;
}

.empty-icon {
  font-size: 60px;
  color: black;
}

.input-style {
  border: 2px solid deepskyblue;
  outline: none;
}
</style>
