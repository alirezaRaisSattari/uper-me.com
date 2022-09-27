<template>
  <div id="all" class="container">
    <loading v-if="state.foldersLoading"/>
    <div v-else class="row">
      <div
          v-for="item in state.followersFolderList"
          :key="item"
          class="col-4 hover-pointer m-0 p-1"
      >
        <div class="card uper-card-1 w-100 h-100">
          <router-link
              :to="{
              name: 'followerFolder',
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
                v-if="item.followers.length === 0"
                class="empty-list d-flex align-items-center"
            >
              <i class="mx-auto fas fa-box-open empty-icon"></i>
            </div>
            <img
                v-if="item.followers.length === 1"
                v-lazy="item.followers[0].profileImageUrl + '_sm.webp'"
                alt="img"
                class="resize-1img"
            />
            <div
                v-else-if="item.followers.length === 2"
                class="row m-auto resize-2div"
            >
              <div v-for="img in item.followers" :key="img" class="col-6 p-0">
                <img
                    v-lazy="img.profileImageUrl + '_sm.webp'"
                    alt="img"
                    class="resize-2img"
                />
              </div>
            </div>
            <div v-else class="row m-auto">
              <div v-for="img in item.followers" :key="img" class="col-6 p-0">
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
import {followerState} from "./followerState";
import {onMounted, ref} from "vue";
import {PageStore} from "@/core/store/page.store";

export default {
  name: "follower",
  props: ["pageId"],
  setup(props) {
    const newFolderName = ref("");
    const state = ref(new followerState());
    const myPageId = PageStore().selectedPageId;

    // get folders
    const getFolders = () => {
      let model = {
        pageId: myPageId,
      };
      state.value.GetFollowerFolder(model);
    };

    onMounted(() => getFolders());
    return {
      newFolderName,
      state,
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
</style>
