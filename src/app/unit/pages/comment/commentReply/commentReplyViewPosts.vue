<template>
  <loading v-if="state.replyLoading" />
  <div v-else id="all">
    <!--**********************************************  header  +++++++++++++++++++++++++++++++++++++++++++++++++++++-->
    <h5 class="header mt-3">{{ $t("replies") }}</h5>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg" />
    </div>

    <!--*****************************************  confirm for delete  ++++++++++++++++++++++++++++++++++++++++++++++-->
    <confirm-dialog
      status="warning"
      :header="$t('warning')"
      :icon="'fa fa-exclamation-triangle'"
      :text="$t('delete?')"
      :visible="openConfirmDialog"
      @accept="deleteComment"
      @reject="openConfirmDialog = false"
      @times="openConfirmDialog = false"
    />
    <!--********************************************  main comment  +++++++++++++++++++++++++++++++++++++++++++++++++-->
    <div class="ltr">
      <div class="mt-4 card-height ml-3 mb-4">
        <div
          v-for="item in state.mainComment"
          :key="item"
          class="smart-text-align card-height cards"
        >
          <div class="d-flex justify-content-between align-items-center rtl">
            <img
              :src="item.pageDetail.profileImageUrl + '_sm.webp'"
              alt="prifileImg"
              class="profileImg m-2"
            />
            <span class="ml-auto headOfComment">
              <p class="my-auto d-flex mt-2">{{ item.pageDetail.name }}</p>
              <p class="username d-flex">{{ item.pageDetail.username }}</p>
            </span>

            <p class="m-2">{{ timeDiffrence(item.createDate) }}</p>
          </div>
          <hr class="m-auto" />
          <p class="mx-4 mt-2 mb-4 py-4 text-break">{{ item.text }}</p>
        </div>
      </div>

      <div v-if="state.replies.length === 0" class="text-center">
        {{ $t("emptyList") }}
      </div>

      <!--      drop down-->
      <div
        v-if="state.replies.length !== 0"
        class="d-flex flex-row ml-3 card filter-div fa-pull-left ltr"
      >
        <i class="fas fa-filter mt-2 p-2"></i>
        <select v-model="filterType" class="p-2 filter-select">
          <option :value="ordering.likeDescending" selected="selected">
            by like
          </option>
          <option :value="ordering.dislikeDescending">by dislike</option>
        </select>
      </div>
      <br /><br />

      <!--**********************************************  replies  ++++++++++++++++++++++++++++++++++++++++++++++++++-->
      <loading v-if="state.commentLoading" />
      <div
        v-for="(item, index) in state.replies"
        :key="index"
        class="mt-2 card-height ml-3"
      >
        <div class="smart-text-align card-height reply-card cards p-2">
          <div class="d-flex justify-content-between align-items-center rtl">
            <img
              :src="item.pageDetail.profileImageUrl + '_sm.webp'"
              alt="prifileImg"
              class="profileImg m-2"
            />
            <span class="ml-auto headOfComment">
              <p class="my-auto d-flex mt-2">{{ item.pageDetail.name }}</p>
              <p class="username d-flex">{{ item.pageDetail.username }}</p>
            </span>
            <p>{{ timeDiffrence(item.createDate) }}</p>
          </div>
          <hr class="m-auto" />

          <!--**************************************   main part of reply  ++++++++++++++++++++++++++++++++++++++++++-->
          <p class="m-2 text-break">{{ item.text }}</p>

          <!--*******************************************  icons  +++++++++++++++++++++++++++++++++++++++++++++++++++-->
          <div class="d-flex justify-content-between icon-row rtl">
            <div class="d-flex">
              <img
                v-if="item.isLike === false"
                :class="state.LikeAndDislikeLoading ? 'p-disable' : ''"
                alt=""
                class="hover-pointer ml-2 right-icon pt-3"
                src="@/assets/img/svg/Dislikered.svg"
                @click="likeFunc(item.commentId, 0)"
              />
              <img
                v-else
                :class="state.LikeAndDislikeLoading ? 'p-disable' : ''"
                alt=""
                class="hover-pointer ml-2 right-icon pt-3"
                src="@/assets/img/svg/Dislikeline.svg"
                @click="likeFunc(item.commentId, 0)"
              />

              <p class="ml-3 like-num pt-3">{{ item.numberOfDislikes }}</p>
              <img
                v-if="item.isLike === true"
                :class="state.LikeAndDislikeLoading ? 'p-disable' : ''"
                alt=""
                class="hover-pointer ml-2 right-icon"
                src="@/assets/img/svg/likegreen.svg"
                @click="likeFunc(item.commentId, 1)"
              />
              <img
                v-else
                :class="state.LikeAndDislikeLoading ? 'p-disable' : ''"
                alt=""
                class="hover-pointer ml-2 right-icon"
                src="@/assets/img/svg/likeline.svg"
                @click="likeFunc(item.commentId, 1)"
              />
              <p class="like-num pt-3">{{ item.numberOfLikes }}</p>
            </div>
            <div class="d-flex">
              <img
                alt=""
                class="mr-3 leftIcon"
                src="@/assets/img/svg/delete.svg"
                @click="
                  openConfirmDialog = true;
                  replyIdStore = item.commentId;
                "
              />
            </div>
          </div>
        </div>
      </div>
      <loading v-if="!state.repliesIsFinished" />
      <div v-else></div>
    </div>

    <!--************************************************  textarea  +++++++++++++++++++++++++++++++++++++++++++++++++-->
    <div class="d-flex w-100 ltr">
      <textarea v-model="inputText" class="createComment"> </textarea>
      <div class="createCommentBtn" @click="postReply">
        <img alt="" class="post-icon" src="@/assets/img/svg/send.svg" />
      </div>
    </div>

    <br class="break-line" /><br class="break-line" /><br
      class="break-line"
    /><br class="break-line" /><br /><br /><br /><br /><br />
  </div>
</template>


<script lang="ts">
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { commentReplyState } from "./commentReplyViewPostsState";
import { PageStore } from "@/core/store/page.store";
import { BASE_TAKE } from "@/core/constant/constant";
import {
  elementRemoveEventListener,
  getSelectedPageData,
  getSelectedPageId,
  windowScrolledToBottom,
} from "@/core/service/utils.service";
import { commentFilterType } from "@/core/enum/enums";
import { DateService } from "@/core/service/date.service";
import ConfirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";

export default {
  components: { ConfirmDialog },
  name: "commentReply",
  setup() {
    const replyIdStore = ref(0);
    const openConfirmDialog = ref(false);
    const likerPageId = PageStore().selectedPageId;
    const state = ref(new commentReplyState());
    const route = useRoute();
    const postId = ref();
    const pageId = ref();
    const username = ref();
    const commentId = ref();
    const likeReply = ref([]);
    let replyList = [];
    const inputText = ref("");
    const ordering = reactive(commentFilterType);
    const filterType = ref(ordering.likeDescending);

    function timeDiffrence(time) {
      return DateService.getInstance().timeDifference(time);
    }

    //**********************************************   GET REPLY   +++++++++++++++++++++++++++++++++++++++++++++++++++//
    const getReply = () => {
      let model = {
        take: BASE_TAKE,
        postId: parseInt(postId.value),
        parentId: parseInt(commentId.value),
        myPageId: getSelectedPageId(),
        filterType: filterType.value,
        requestTime: new Date(),
      };
      state.value.getCommentReply(model);
    };
    //******************************************   INITIAL GET REPLY   +++++++++++++++++++++++++++++++++++++++++++++++//
    onMounted(() => {
      postId.value = route.params.postId;
      pageId.value = route.params.pageId;
      username.value = route.params.username;
      commentId.value = route.params.commentId;
      getReply();
      //SCROLL EVENT FOR TAKE NEW COMMENTS
      windowScrolledToBottom(() => {
        getReply();
      });
    });
    //*************************************   REFRESH REPLY FOR ORDERING   +++++++++++++++++++++++++++++++++++++++++++//
    watch(
      () => filterType.value,
      () => {
        state.value.replies = [];
        state.value.skipNum = 0;
        state.value.loadingReply = false;
        state.value.repliesIsFinished = false;
        getReply();
      }
    );
    //****************************************   GET REFERENCE COMMENT   ++++++++++++++++++++++++++++++++++++++++++++++//
    onMounted(() => {
      let model = {
        commentId: parseInt(commentId.value),
        postId: parseInt(postId.value),
        myPageId: getSelectedPageId(),
      };
      state.value.getMainComment(model);
    });
    //*****************************************   CREATE NEW REPLY   +++++++++++++++++++++++++++++++++++++++++++++++++//
    const postReply = () => {
      if (inputText.value.length < 2) return;
      if (inputText.value.length > 1998) return;

      let model = {
        pageId: likerPageId,
        postId: parseInt(postId.value),
        text: inputText.value,
        parentId: parseInt(commentId.value),
        posterPageId: parseInt(pageId.value),
      };

      state.value.postReply(model);

      inputText.value = "";
    };
    //*****************************************   LIKE AND DISLIKE   +++++++++++++++++++++++++++++++++++++++++++++++++//
    const likeFunc = (commentId, pressLike) => {
      // find index
      let index;
      index = state.value.replies
        .map(function (e) {
          return e.commentId;
        })
        .indexOf(commentId);

      //remove like or dislike
      if (pressLike == 1 && state.value.replies[index].isLike === true) {
        state.value.replies[index].isLike = null;
        let model = {
          commentId: commentId,
          pageId: getSelectedPageId(),
          postId: parseInt(postId.value),
          isLike: true,
        };
        state.value.removeLikeOrDislike(model);
        state.value.replies[index].numberOfLikes--;
        return;
      }

      if (pressLike == 0 && state.value.replies[index].isLike === false) {
        state.value.replies[index].isLike = null;
        let model = {
          commentId: commentId,
          pageId: parseInt(pageId.value),
          postId: parseInt(postId.value),
          isLike: false,
        };
        state.value.removeLikeOrDislike(model);
        state.value.replies[index].numberOfDislikes--;
        return;
      }

      if (pressLike) {
        if (state.value.replies[index].isLike === false)
          state.value.replies[index].numberOfDislikes--;
        state.value.replies[index].isLike = true;
        state.value.replies[index].numberOfLikes++;
      } else {
        if (state.value.replies[index].isLike === true)
          state.value.replies[index].numberOfLikes--;
        state.value.replies[index].isLike = false;
        state.value.replies[index].numberOfDislikes++;
      }

      let model = {
        commentId: commentId,
        pageId: parseInt(pageId.value),
        postId: parseInt(postId.value),
        isLike: state.value.replies[index].isLike,
      };
      state.value.likeAndDislike(model);
    };
    //**********************************************   DELETE REPLY   ++++++++++++++++++++++++++++++++++++++++++++++++//
    const deleteComment = () => {
      let index;
      index = state.value.replies
        .map(function (e) {
          return e.commentId;
        })
        .indexOf(replyIdStore.value);

      let model = {
        id: replyIdStore.value,
        postId: parseInt(postId.value),
        myPageId: getSelectedPageId(),
      };
      state.value.deleteReply(model);

      //create new array without specify element
      replyList = state.value.replies;
      state.value.replies = [];
      for (let x = 0; x < replyList.length; x++) {
        if (x != index) state.value.replies.push(replyList[x]);
      }
      openConfirmDialog.value = false;
    };
    //****************************************   REMOVE SCROLL EVENT    ++++++++++++++++++++++++++++++++++++++++++++++//
    onUnmounted(() => {
      elementRemoveEventListener("all");
    });

    return {
      openConfirmDialog,
      replyIdStore,
      filterType,
      likeReply,
      commentId,
      inputText,
      ordering,
      state,
      deleteComment,
      postReply,
      likeFunc,
      timeDiffrence,
    };
  },
};
</script>

<style>
.header {
  text-align: center;
  width: 100%;
  position: absolute;
}

.cards {
  -webkit-box-shadow: 2px 1px 2px 11px rgba(0, 0, 0, 0),
    0 0 4px 0 rgba(97, 97, 97, 0.44);
  box-shadow: 5px 5px 28px 11px rgba(0, 0, 0, 0),
    0 0 4px 0 rgba(97, 97, 97, 0.44);
  background: #fafafa;
  border-radius: 6px;
}

.reply-card {
  width: 98% !important;
}

.profileImg {
  width: 55px;
  border-radius: 55px;
  border: 2px solid #707070;
}

.username {
  color: #bdbdbd;
}

.headOfComment {
  margin-bottom: -15px;
}

.leftIcon {
  width: 19px;
}

.like-num {
  margin-top: 12px;
}

.icon-row {
  margin-top: -11px;
}

.createComment {
  overflow: hidden;
  position: fixed;
  height: 52px;
  min-width: 427px;
  max-width: 20%;
  border-radius: 7px;
  bottom: 15px;
  margin-left: 70px;
  border: 2px solid #bdbdbd;
}

.createCommentBtn {
  position: fixed;
  background-color: #eeeeee;
  border: 2px solid #bdbdbd;
  overflow: hidden;
  width: 52px;
  height: 52px;
  border-radius: 7px;
  bottom: 15px;
  margin-left: 13px;
}

@media (max-width: 990px) {
  .createComment {
    bottom: 100px;
  }

  .createCommentBtn {
    bottom: 100px;
  }

  .break-line {
    display: none;
  }
}

.post-icon {
  padding: 13px;
  width: 45px;
}

.header-shape {
  width: 288px;
}

.right-icon {
  width: 23px;
}
</style>