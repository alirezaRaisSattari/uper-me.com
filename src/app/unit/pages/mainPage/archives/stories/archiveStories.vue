<template>
  <loading v-if="state.loadingStories" />
  <div v-else class="d-flex flex-wrap mt-5 p-0 w-100">
    <p
      v-if="!state.storiesList.length && !state.loadingPosts"
      class="w-100 text-center mt-5"
    >
      {{ $t("noItem") }}
    </p>
    <div
      v-for="(story, index) in state.storiesList"
      :key="story"
      class="col-4 m-0 p-0 hover-pointer no-gutters"
    >
      <div class="px-1">
        <ratio :ratio="'1/1'">
          <img
            v-lazy="story.fileUrl"
            alt=""
            class="main mx-auto border-radius"
            @click="
              displayDetails = true;
              itemNum = index;
              storyId = story.storyId;
            "
          />
        </ratio>
      </div>
    </div>
  </div>
  <div><loading v-if="state.loadingPosts" /></div>

  <Dialog
    v-model:visible="displayDetails"
    :breakpoints="{
      '1000px': '52vw',
      '800px': '65vw',
      '600px': '91vw',
    }"
    :contentStyle="{ background: 'rgb(255, 255, 255)' }"
    :showHeader="false"
    :style="{ borderRadius: '100px' }"
    dismissableMask
    header=""
    modal
  >
    <div v-if="state.storiesList.length">
      <div class="d-flex align-items-center ltr pr-2">
        <Button
          :class="state.deleteLoading ? 'p-disabled' : ''"
          :label="$t('deleteStory')"
          class="p-button-text w-100 p-button-rounded m-2 mr-0"
          @click="deleteStory()"
        />
        <i class="fas fa-trash icon-size iconOfDialog mr-2"></i>
      </div>

      <div>
        <loading v-if="state.deleteLoading" />
      </div>
    </div>
  </Dialog>
</template>

<script>
import { ref } from "@vue/reactivity";
import { archiveStoriesState } from "./archiveStoriesState";
import { ScrollController } from "@/core/service/scroll.service";
import { onBeforeUnmount, onMounted, watch } from "@vue/runtime-core";
import { Constant } from "@/core/constant/constant";
import { getSelectedPageId } from "@/core/service/utils.service";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import Loading from "@/app/public/shared/loading/Loading.vue";

export default {
  components: { ratio, Loading },
  setup() {
    const state = ref(new archiveStoriesState());
    const postDialog = ref(false);
    const displayDetails = ref(false);
    const itemNum = ref(-1);
    const storyId = ref(1);

    function getAllDeletedStories() {
      let model = {
        skip: 0,
        take: Constant.TAKE_20,
        pageId: getSelectedPageId(),
      };
      state.value.deletedStories(model);
    }

    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      getAllDeletedStories();
    }

    onMounted(() => {
      getAllDeletedStories();
      scrollCtrl.startListen();
    });
    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    const deleteStory = () => {
      state.value.deleteStory(storyId.value, getSelectedPageId(), () => {
        state.value.storiesList.splice(itemNum.value, 1);
        displayDetails.value = false;
      });
    };

    return {
      displayDetails,
      postDialog,
      itemNum,
      storyId,
      state,
      deleteStory,
    };
  },
};
</script>

<style>
.img {
  width: 23%;
  height: 100px;
}

.post-image {
  width: 100%;
  height: 170px;
  object-fit: contain;
  border-radius: 8px;
}

.image-style {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

@media (min-width: 990px) {
  .close-btn {
    display: none;
  }
}

.close-btn {
  width: fit-content;
}

.caption {
  word-break: break-word;
  margin-top: -13px;
}

.show-post {
  background: red;
  height: 400px;
}

.image-holder {
  width: 32%;
  height: auto;
  margin: 0;
}

.border-radius {
  border-radius: 8px;
}

.main {
  z-index: 4;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
