<template>
  <div v-if="state.postInfo">
    <!--posts-->
    <div class="container p-2">
      <!--    header     -->
      <div
        class="d-flex justify-content-between align-items-center mt-2 pr-2 ltr"
      >
        <div class="p-2 hover-pointer" @click="openPanel()">
          <i class="icon-font u000 ml-3 text-dark"></i>
        </div>
        <span class="ml-auto mr-3">
          <span
            class="d-flex size-small smart-text-align justify-content-end text-sm"
            @click="$function.goTo(`/page/${pageId === userData.id ? userData.username : state.username}`)"
            >{{ pageId === userData.id ? userData.name : state.name }}</span
          >
          <span
            class="d-flex size-small smart-text-align justify-content-end text-sm"
            @click="$function.goTo(`/page/${pageId === userData.id ? userData.username : state.username}`)"
            >{{
              pageId === userData.id ? userData.username : state.username
            }}</span
          >
        </span>
        <img
          v-lazy="
            pageId == userData.id
              ? userData.profileUrl + '_sm.webp'
              : state.imgUrl+ '_sm.webp'
          "
          alt=""
          class="user-profile-image"
        />
      </div>

      <!--    slider     -->
      <div class="">
        <ratio :ratio="'1/1'" class="mt-2">
          <postSlider :state="state.postInfo" class="swiper" />
        </ratio>
      </div>

      <!--    icons   -->
      <div class="d-flex justify-content-between mt-2 ltr">
        <i
          v-if="!state.postInfo.bookMark"
          :class="state.disableBookmark ? 'p-disabled' : ''"
          class="far fa-bookmark size-medium mr-2 hover-pointer"
          @click="bookmarkFunc"
        ></i>
        <i
          v-else
          :class="state.disableBookmark ? 'p-disabled' : ''"
          class="icon-font ubookmark hover-pointer"
          @click="unBookMark()"
        ></i>
        <div class="d-flex">
          <i
            class="icon-font usend-45 mr-2 icon1 size-medium hover-pointer"
            @click="shareTo()"
          ></i>
          <router-link
            :to="`/page/comment/${username}/${pageId}/${state.postInfo.postId}`"
            ><i class="icon-font ucomment mr-2 size-medium text-dark"></i
          ></router-link>

          <!--  like project :/   -->
          <i
            v-if="!state.postInfo.like"
            :class="state.likeLoading ? 'p-disabled' : ''"
            class="far fa-heart mr-2 size-medium likeup hover-pointer"
            @click="likeFunc"
          ></i>

          <i
            v-else
            :class="state.likeLoading ? 'p-disabled' : ''"
            class="fas fa-heart  mr-2 size-medium  text-danger likeup  hover-pointer like-product"
            @click="likeFunc"
          ></i>

          <!--   /like    -->
        </div>
      </div>
      <div class="d-flex align-items-center info px-1 ltr">
        <p v-if="state.postInfo.mainFileIsImage"
          class="font mt-3 size-too-small hover-context-menu hover-pointer"
          @click="$function.goTo(`/viewlikes/${postId}`)"
        >
          {{ $t("like") }}
          {{ state.postInfo.numberOfLikes }}
        </p>
        <i v-else
          class="
            far
            fa-eye
            ml-3
            size-too-small
            color1
            eye-icon-color
            hover-context-menu
            eye-post
          "
        >
          &nbsp; {{ state.postInfo.numberOfViews }}
        </i>
      </div>
      <div class="smart-text-align">
        <p v-if="!clickedMore" class="long-caption caption mb-3">
          {{ state.postInfo.caption }}
        </p>

        <!--  caption -->
        <p v-if="clickedMore" class="caption mb-3">
          {{ state.postInfo.caption }}
        </p>
        <div v-if="state.postInfo.caption">
          <p
            v-if="state.postInfo.caption.length > 45 && !clickedMore"
            class="font size-too-small more-color pr-2 hover-pointer"
            @click="clickedMore = true"
          >
            {{ $t("more") }}
          </p>
        </div>
      </div>

      <!--  comment  -->
      <div class="d-flex align-items-center justify-content-between rtl">
        <div
          class="
            d-flex
            pr-2
            align-items-center
            justify-content-between
            text-aria-div
            w-100
          "
        >
          <img
            v-lazy="
              pageId === userData.id
                ? userData.profileUrl + '_sm.webp'
                : state.imgUrl + '_sm.webp'
            "
            alt=""
            class="main-postImg"
            src=""
          />
          <textarea
            v-model="inputText"
            :placeholder="$t('yourComment')"
            class="
              w-100
              text-break
              comment-input
              ml-auto
              font
              size-small
              mt-4
              mr-2
              smart-text-align
            "
            type="text"
          />
        </div>
        <i
          class="icon-font usend-45 last-icon text-danger hover-pointer"
          @click="createPost"
        ></i>
      </div>

      <!-- comment show  -->
      <loading v-if="state.commentLoading" />
      <div
        v-for="item in newcomments"
        v-else
        :key="item"
        class="w-100 smart-text-align"
      >
        <b>{{ myUser.name }}</b>
        <p class="mt-1 text-break">
          {{ item }}
        </p>
      </div>
      <br />
    </div>

    <Dialog
      v-model:visible="postDetails"
      :contentStyle="{ borderRadius: '7px' }"
      :dismissableMask="true"
      :header="false"
      :modal="true"
      :showHeader="false"
      style="width: 18rem; border-radius: 15px !important"
    >
      <div
        v-for="option in postOptions"
        :key="option"
        class="
          w-100
          d-flex
          align-items-center
          p-2
          hover-pointer hover-bg-primary
        "
        @click="option.click"
      >
        <i :class="option.class"></i>
        <span class="mx-2">{{ option.title }}</span>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="updateCaptionDialog"
      :breakpoints="{
        '2800px': '65vw',
        '1280px': '65vw',
        '1000px': '65vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
      }"
      :showHeader="false"
      :style="{ border: 'none' }"
      dismissableMask
      header=""
      modal
    >
      <div class="w-100 p-3 text-right header-shadow">
        {{ $t("updatePost") }}
      </div>
      <div class="px-2 mt-2 w-100">
        <input
          v-model="newCaption"
          :placeholder="$t('caption')"
          class="form-control"
          type="text"
        />
      </div>
      <div class="px-2 mt-2 w-100 d-flex justify-content-between mb-1">
        <span class="icon" @click="addHashtag">+</span>
        <input
          v-model="hashtag"
          :placeholder="$t('hashtagHint')"
          class="form-control w-75"
          type="text"
        />
        <span class="icon" @click="closeHashtag">X</span>
      </div>
      <p
        v-for="hashtag in captionHashtag"
        :key="hashtag"
        class="w-100 px-2 text-right"
      >
        {{ hashtag }}
      </p>
      <div class="w-100 px-3 d-flex justify-content-between align-items-center">
        <span>{{ $t("turnOffCommenting") }}</span>
        <div class="switch">
          <input
            id="index"
            v-model="commentStatus"
            class="input"
            type="checkbox"
          />
          <label class="slider" for="index"></label>
        </div>
      </div>
      <div class="w-100 text-center">
        <button class="w-25 my-3 p-2 submit-btn" @click="sendUpdatedInfo">
          {{ $t("submit") }}
        </button>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="displayBookmark"
      :breakpoints="{
        '1000px': '55vw',
        '1400px': '45vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{ background: 'rgb(255, 255, 255)' }"
      :showHeader="false"
      :style="{}"
      dismissableMask
      header=""
      modal
    >
      <bookmark :Id="postId" @bookmarked="bookmarked()" />
    </Dialog>
    <Dialog
      v-model:visible="displayReport"
      :contentStyle="{ borderRadius: '7px' }"
      :dismissableMask="true"
      :header="false"
      :modal="true"
      :showHeader="false"
      style="width: 18rem; border-radius: 15px !important"
    >
      <report
        :userData="userData"
        @closeReportModal="displayReport = false"
        :itemId="pageId"
        :itemType="reportTypeItem"
      />
    </Dialog>

    <ConfirmDialog></ConfirmDialog>
  </div>
  <div class="has-fixed-footer"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import report from "@/app/public/shared/report/report.vue";
import { displayPostsState } from "./displayPostState";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import postSlider from "./postSlider.vue";
import { PageStore } from "@/core/store/page.store";
import {
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";
import bookmark from "../../../bookmark/bookmark.vue";
import { i18n } from "@/main";
import { useConfirm } from "primevue/useconfirm";
import { useRoute } from "vue-router";
import { reportType } from "@/core/enum/enums";
import router from "@/core/router/router";

export default defineComponent({
  name: "MainPagePosts",
  components: {
    bookmark,
    ratio,
    postSlider,
    report,
  },
  setup() {
    const reportTypeItem = ref(reportType.Page);
    const displayReport = ref(false);
    const route = useRoute();
    const userData = ref(getSelectedPageData());
    const username = getSelectedPageData().username;
    const displayPostModal = ref(false);
    const state = ref(new displayPostsState());
    const likerPageId = PageStore().selectedPageId;
    const postnumber = ref(0);
    const myUser = ref(getSelectedPageData());
    const likeCounter = ref(0);
    const isLikeBeforeMount = ref(false);
    const displayBookmark = ref(false);
    const postDetails = ref();
    const confirm = useConfirm();
    const updateCaptionDialog = ref(false);
    const hashtag = ref("");
    const newCaption = ref("");
    const commentStatus = ref();
    const captionHashtag = ref([]);
    const inputText = ref("");
    const newcomments = ref([]);
    const pageId = ref(route.params.pageId);
    const postId = ref(route.params.postId);
    const isMine = pageId.value == userData.value.id;

    const postOptions = ref([
      {
        class: "fa fa-trash-alt",
        title: i18n.global.tc("deletePost"),
        check: () => isMine,
        click: function run() {
          confirmDelete();
        },
      },
      {
        class: "far fa-edit",
        check: () => isMine,
        title: i18n.global.tc("update"),
        click: function run() {
          updateCaption();
        },
      },
      {
        class: "fa fa-share-alt",
        check: () => true,
        title: i18n.global.tc("share"),
        click: "",
      },
      {
        class: "fa fa-file",
        check: () => isMine && !state.value.postInfo.postExtraFile,
        title: i18n.global.tc("addFile"),
        click: () =>{
            router.push(`/addFileFromPost/${postId.value}`)
        },
      },
      {
        class: "fa fa-file",
        check: () => isMine && state.value.postInfo.postExtraFile,
        title: i18n.global.tc("deleteFile"),
        click: "",
      },
      {
        class: "fa fa-file",
        check: () => !isMine,
        title: i18n.global.tc("report"),
        click: () => {
          displayReport.value = true;
        },
      },
    ]);
    if (route.params.pageId !== getSelectedPageId()) {
      state.value.getProfileImage(route.params.pageId, route.params.username);
    }
    onMounted(() => {
      postOptions.value = postOptions.value.filter((m) => m.check() === true);
    });

    const confirmDelete = () => {
      confirm.require({
        message: i18n.global.tc("deletePostMessage"),
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        acceptLabel: i18n.global.tc("yes"),
        rejectLabel: i18n.global.tc("cancel"),
        accept: () => {
          let model = {
            postId: route.params.postId,
            pageId: getSelectedPageId(),
          };
          state.value.deletePost(model);
          displayPostModal.value = false;
          postDetails.value = false;
          state.value.posts.splice(postnumber.value, 1);
        },
      });
    };

    function addHashtag() {
      captionHashtag.value.push("#" + hashtag.value);
      hashtag.value = "";
    }

    function closeHashtag() {
      hashtag.value = "";
    }

    function updateCaption() {
      displayPostModal.value = false;
      postDetails.value = false;
      updateCaptionDialog.value = !updateCaptionDialog.value;
    }

    function sendUpdatedInfo() {
      let model = {
        caption: newCaption.value,
        postId: route.params.postId,
        pageId: getSelectedPageId(),
      };
      state.value.updatePostCaption(model);
      let commentModel = {
        turnOffCommenting: commentStatus.value,
        postId: route.params.postId,
        pageId: getSelectedPageId(),
      };
      state.value.postInfo.caption = newCaption.value;
      state.value.updateCommentStatus(commentModel);

      updateCaptionDialog.value = false;
      state.value.getRecentMainPagePost(
        route.params.pageId,
        route.params.postId
      );
    }

    onBeforeMount(() => {
      state.value.getRecentMainPagePost(
        route.params.pageId,
        route.params.postId
      );
    });

    function openPanel() {
      postDetails.value = !postDetails.value;
    }

    // bookmark API is
    const bookmarkFunc = () => {
      displayBookmark.value = true;
    };

    //like
    const likeFunc = () => {
      if (likeCounter.value === 0)
        state.value.postInfo.isLiked = state.value.postInfo.like;

      if (state.value.postInfo.like && likeCounter.value === 0)
        isLikeBeforeMount.value = true;

      let model = {
        pageId: route.params.pageId,
        postId: state.value.postInfo.postId,
        likerPageId: likerPageId,
      };

      if (isLikeBeforeMount.value) {
        if (likeCounter.value % 2 === 0) {
          state.value.postInfo.numberOfLikes--;
          state.value.unlikePost(model);
        }
        if (likeCounter.value % 2 === 1) {
          state.value.postInfo.numberOfLikes++;
          state.value.likePost(model);
        }
      }

      if (!isLikeBeforeMount.value) {
        if (likeCounter.value % 2 === 0) {
          state.value.postInfo.numberOfLikes++;
          state.value.likePost(model);
        }
        if (likeCounter.value % 2 === 1) {
          state.value.unlikePost(model);
          state.value.postInfo.numberOfLikes--;
        }
      }

      likeCounter.value += 1;

      state.value.postInfo.like = !state.value.postInfo.like;
    };
    // like

    // post comment
    const createPost = () => {
      if (inputText.value.length < 2) return;
      if (inputText.value.length > 1998) return;
      let model = {
        postId: state.value.postInfo.postId,
        posterPageId: route.params.pageId,
        parentId: null,
        pageId: likerPageId,
        text: inputText.value,
      };
      state.value.postComment(model);
      newcomments.value.push(inputText.value);
      inputText.value = "";
    };
    // post comment

    // start showing dialog
    const clickedMore = ref(false);

    // start showing dialog

    onBeforeUnmount(() => {
      clickedMore.value = false;
    });

    function bookmarked() {
      state.value.postInfo.bookMark = true;
      displayBookmark.value = false;
    }

    function unBookMark() {
      const model = {
        pageId: likerPageId,
        postId: route.params.postId,
      };
      state.value.UnBookMarkFunc(model, () => {
        state.value.postInfo.bookMark = false;
      });
    }

    function shareTo() {
      if (navigator.share) {
        navigator.share({
          url: route.fullPath,
        });
      } else alert(i18n.global.tc("your site must be have SSL permision"));
    }

    return {
      updateCaptionDialog,
      displayPostModal,
      displayBookmark,
      displayReport,
      reportTypeItem,
      captionHashtag,
      commentStatus,
      newcomments,
      clickedMore,
      postOptions,
      postDetails,
      newCaption,
      postnumber,
      inputText,
      username,
      userData,
      hashtag,
      postId,
      myUser,
      pageId,
      state,
      sendUpdatedInfo,
      confirmDelete,
      updateCaption,
      bookmarkFunc,
      closeHashtag,
      bookmarked,
      addHashtag,
      createPost,
      unBookMark,
      openPanel,
      likeFunc,
      shareTo,
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
  border-radius: 8px;
}

.comment-input {
  margin-top: 16px !important;
  border: none;
  outline: none !important;
}

.text-aria-div {
  border: 1px solid rgb(220, 220, 220);
  border-radius: 10px;
  margin-left: 10px;
  height: 63px;
  z-index: 10;
}

.uheart-line:before { color: red !important; } /* '' */

.likeup{
  padding-top: 5px;
}
.eye-post{
  margin-bottom: 20px;
}
</style>
