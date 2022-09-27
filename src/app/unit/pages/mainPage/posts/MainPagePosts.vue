<template>
  <div>
    <p
      v-if="state.posts.length === 0 && !state.loading"
      class="text-center mt-5"
    >
      {{ $t("noPosts") }}
    </p>

    <!--posts-->
    <div class="row mt-2 mx-2 p-0">
      <div
        v-for="post in state.posts"
        :key="post"
        class="col-4 m-0 p-0 hover-pointer no-gutters"
        @click="toDisplayPost(post.postId)"
      >
        <div class="px-1">
          <ratio :ratio="'1/1'">
            <img
              v-lazy="post.coverImageUrl"
              alt=""
              class="main mx-auto border-radius"
            />
          </ratio>
        </div>
      </div>
      <loading v-if="state.loading" />
    </div>
  </div>
  <div class="has-fixed-footer"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import { MainPagePostsState } from "./MainPagePostsState";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import { getSelectedPageData } from "@/core/service/utils.service";
import router from "@/core/router/router";
import { ScrollController } from "@/core/service/scroll.service";

export default defineComponent({
  name: "MainPagePosts",
  props: {
    pageId: Number,
    userData: Object,
  },
  components: {
    ratio,
  },
  setup(props) {
    const username = getSelectedPageData().username;
    const state = ref(new MainPagePostsState());
    const pageId = ref(props.pageId);
    const myUser = ref(getSelectedPageData());
    const postDetails = ref();

    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      state.value.getRecentMainPagePost(pageId.value);
    }

    onMounted(() => {
      state.value.getRecentMainPagePost(pageId.value);
      scrollCtrl.startListen();
    });
    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });

    // start showing dialog
    const clickedMore = ref(false);
    const toDisplayPost = (postId) => {
      router.push(
        `/post/mp/${pageId.value}/${postId}/${props.userData.username}`
      );
    };

    return {
      username,
      clickedMore,
      state,
      pageId,
      myUser,
      postDetails,
      toDisplayPost,
    };
  },
});
</script>

<style scoped>
.m-1px {
  margin-top: 1px;
}

.border-radius-2px {
  border-radius: 2px;
}

@media (min-width: 990px) {
  .close-btn {
    display: none;
  }
}

.close-btn {
  width: fit-content;
}

.user-profile-image {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}

.main-postImg {
 width: 25px;
  height: 25px;
  border-radius: 25px;
}

.comment-input {
  background-color: rgb(255, 255, 255);
  border: none;
  width: 85%;
  color: black;
}

.comment-input:focus {
  outline: none;
}

.size-too-small {
  font-size: 13px;
}

.size-small {
  font-size: 14px;
}

.size-medium {
  font-size: 22px;
}

.last-icon {
  font-size: 19px;
}

.eye-icon-color {
  color: rgb(100, 100, 100);
}

.more-color {
  color: rgb(120, 120, 120);
  margin-top: -14px;
}

::placeholder {
  color: rgb(0, 0, 0);
  opacity: 1;
}

.info {
  margin-top: -7px;
}

.caption {
  word-break: break-word;
  margin-top: -13px;
  text-justify: inter-word;
}

.long-caption {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.header-shadow {
  box-shadow: 0px 1px 9px #d0cfcfd4;
}

.icon {
  border: 1px solid black;
  border-radius: 50%;
  padding: 3px 10px;
  font-size: 20px;
}

.switch {
  display: block;
  margin-top: 24px;
}

.switch .slider {
  position: relative;
  display: inline-block;
  height: 11px;
  width: 32px;
  border-radius: 8px;
  cursor: pointer;
  background: #c5c5c5;
  transition: all 0.2s ease;
}

.switch .slider:after {
  background: #eeeeee;
  position: absolute;
  left: -8px;
  top: -8px;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  content: "";
  transition: all 0.2s ease;
}

.switch label {
  margin-right: 7px;
}

.switch .input {
  display: none;
}

.switch .input ~ .label {
  margin-left: 8px;
}

.switch .input:checked ~ .slider:after {
  left: 16px;
}

.switch .input:checked ~ .slider {
  background: #4cd27ba6;
}

.switch .input:checked ~ .slider:after {
  background: #4cd27b;
}

.submit-btn {
  border-radius: 11px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

.main {
  z-index: 4;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.border-radius {
  /* box-shadow: 0 0 3px 1px rgb(205 207 208); */
  border-radius: 8px;
}
</style>
