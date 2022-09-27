<template>
  <div class="d-flex flex-wrap mt-5 p-0 w-100">
    <p
      v-if="!state.postsList.length && !state.loadingPosts"
      class="w-100 text-center mt-5"
    >
      {{ $t("noItem") }}
    </p>
    <div
      v-for="(post, index) in state.postsList"
      :key="post"
      class="col-4 m-0 p-0 hover-pointer no-gutters"
    >
      <div class="px-1">
        <ratio :ratio="'1/1'">
          <img
            v-lazy="post.coverImageUrl"
            alt=""
            class="main mx-auto border-radius"
            @click="
              postDialog = true;
              itemNum = index;
            "
          />
        </ratio>
      </div>
    </div>
  </div>
  <div><loading v-if="state.loadingPosts" /></div>
  <Dialog
    v-model:visible="postDialog"
    :breakpoints="{
      '1960px': '50vw',
      '1360px': '60vw',
      '960px': '75vw',
      '640px': '95vw',
      '240px': '95vw',
    }"
    :contentStyle="{
      borderRadius: '7px',
      width: '95vw',
      maxWidth: '500px',
      margin: 'auto',
    }"
    :dismissableMask="true"
    :header="false"
    :modal="true"
    :showHeader="false"
    :style="{ border: 'none' }"
  >
    <div v-if="state.postsList.length">
      <ratio :ratio="'1/1'" class="mt-2">
        <postSlider :state="state.postsList[itemNum]" class="swiper" />
      </ratio>
    </div>
  </Dialog>
</template>

<script>
import { ref } from "@vue/reactivity";
import { archivePostsState } from "./archivePostsState";
import { ScrollController } from "@/core/service/scroll.service";
import { onBeforeUnmount, onMounted, watch } from "@vue/runtime-core";
import { BASE_TAKE, Constant } from "@/core/constant/constant";
import { getSelectedPageId } from "@/core/service/utils.service";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import postSlider from "./postSlider.vue";
import Loading from "@/app/public/shared/loading/Loading.vue";
import { PostStatus } from "@/core/enum/enums";

export default {
  components: { ratio, postSlider, Loading },
  setup() {
    const state = ref(new archivePostsState());
    const postDialog = ref(false);
    const itemNum = ref(-1);

    function getAllDeletedPosts() {
      let model = {
        skip: 0,
        take: Constant.TAKE_20,
        pageId: getSelectedPageId(),
        postStatus: PostStatus.Deleted,
      };
      state.value.deletedPosts(model);
    }

    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      getAllDeletedPosts();
    }

    onMounted(() => {
      getAllDeletedPosts();
      scrollCtrl.startListen();
    });
    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });
    return {
      state,
      postDialog,
      itemNum,
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
  object-fit: cover !important;
}
</style>
