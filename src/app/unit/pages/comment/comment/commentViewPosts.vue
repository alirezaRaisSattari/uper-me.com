```
<template>
  <div>
    <!--    head-->
    <h5 class="header mt-3">{{ $t("comments") }}</h5>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg" />
    </div>
    <div
      v-if="!state.listComment"
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
    <div
      v-if="state.listComment.length === 0 && !state.infoCommentLoading"
      class="text-center"
    >
      {{ $t("emptyList") }}
    </div>
    <!--**************************************  confirm dialog for delete  ++++++++++++++++++++++++++++++++++++++++++-->
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
    <!--**********************************************  cards  ++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
    <loading v-if="state.infoCommentLoading" />
    <div
      v-for="(item, index) in state.listComment"
      v-else
      :key="index"
      class="mt-3"
    >
      <div v-if="!item.parentId">
        <!--**************************************  card head  ++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
        <div id="cards" class="smart-text-align mx-auto">
          <div
            class="
              d-flex
              justify-content-between
              align-items-center
              rtl
              px-2
              py-1
            "
          >
            <img
              :src="item.pageDetail.profileImageUrl + '_sm.webp'"
              alt="profileImg"
              class="profileImg m-2"
            />
            <span class="ml-auto headOfComment">
              <p class="my-auto d-flex mt-2">{{ item.pageDetail.name }}</p>
              <p class="username d-flex">{{ item.pageDetail.username }}</p>
            </span>
            <p>{{ timeDifference(item.createDate) }}</p>
          </div>
          <hr class="m-auto" />

          <!--******************************************  card main   +++++++++++++++++++++++++++++++++++++++++++++++-->
          <loading v-if="state.commentLoading" />
          <p v-else class="m-2 text-break">{{ item.text }}</p>

          <!--*******************************************  icons   ++++++++++++++++++++++++++++++++++++++++++++++++++-->
          <div class="d-flex justify-content-between icon-row rtl px-2">
            <div class="d-flex">
              <img
                v-if="item.isLike === false"
                :class="state.LikeAndDislikeLoading ? 'p-disable' : ''"
                alt=""
                class="hover-pointer ml-2 right-icon pt-3"
                src="@/assets/img/svg/Dislikered.svg"
                @click="likeCommentFunc(item.commentId, 0)"
              />
              <img
                v-else
                :class="state.LikeAndDislikeLoading ? 'p-disable' : ''"
                alt=""
                class="hover-pointer ml-2 right-icon pt-3"
                src="@/assets/img/svg/Dislikeline.svg"
                @click="likeCommentFunc(item.commentId, 0)"
              />

              <p class="ml-3 like-num pt-3">{{ item.numberOfDislikes }}</p>
              <img
                v-if="item.isLike === true"
                :class="state.LikeAndDislikeLoading ? 'p-disable' : ''"
                alt=""
                class="hover-pointer ml-2 right-icon"
                src="@/assets/img/svg/likegreen.svg"
                @click="likeCommentFunc(item.commentId, 1)"
              />
              <img
                v-else
                :class="state.LikeAndDislikeLoading ? 'p-disable' : ''"
                alt=""
                class="hover-pointer ml-2 right-icon"
                src="@/assets/img/svg/likeline.svg"
                @click="likeCommentFunc(item.commentId, 1)"
              />
              <p class="like-num pt-3">{{ item.numberOfLikes }}</p>
            </div>

            <div class="d-flex">
              <router-link
                :to="{
                  name: 'commentReply',
                  params: { commentId: item.commentId },
                }"
                class="mt-2"
              >
                <img
                  alt=""
                  class="hover-pointer left-icon mt-2 pt-2 reply-icon"
                  src="@/assets/img/svg/reply.svg"
                />
              </router-link>
              <div class="d-flex">
                <i
                    v-if="getSelectedPageId()!==item.pageDetail.pageId"
                  class="far fa-flag report-icon hover-pointer"
                  @click="displayReport = true"
                ></i>
              </div>
              <img
                v-if="viewerPageId === item.pageId"
                alt=""
                class="mr-3 hover-pointer left-icon"
                src="@/assets/img/svg/delete.svg"
                @click="
                  openConfirmDialog = true;
                  commentIdStore = item.commentId;
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--==========================================report modal======================================-->
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
  <!--******************************************  bottom textarea  ++++++++++++++++++++++++++++++++++++++++++++++++++-->
  <div class="d-flex w-100 ltr">
    <textarea
      v-model="inputTextOfNewComment"
      class="create-comment text-center"
      maxlength="1997"
    >
    </textarea>
    <div class="create-comment-btn" @click="postComment">
      <img alt="" class="post-icon" src="@/assets/img/svg/send.svg" />
    </div>
  </div>

  <br class="break-line" /><br
    class="break-line"
  /><br /><br /><br /><br /><br /><br /><br />
</template>


<script lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { commentViewPostsState } from "./commentViewPostsState";
import { useRoute } from "vue-router";
import { BASE_TAKE } from "@/core/constant/constant";
import { commentFilterType, reportType } from "@/core/enum/enums";
import { DateService } from "@/core/service/date.service";
import {
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";
import ConfirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import report from "@/app/public/shared/report/report.vue";
// import {getSelectedPageId} from '@/core/service/utils.service';
export default {
  components: { ConfirmDialog, report },
  setup() {
    const userData = ref(getSelectedPageData());
    const reportTypeItem = ref(reportType.Page);
    const displayReport = ref(false);
    const openReport = ref(false);
    const route = useRoute();
    const viewerPageId = getSelectedPageId();
    const state = ref(new commentViewPostsState());
    const postId = ref();
    const pageId = ref();
    const openConfirmDialog = ref(false);
    const username = ref();
    let commentList = []; // for delete
    const inputTextOfNewComment = ref(); // for comment post
    const ordering = reactive(commentFilterType);
    const filterType = ref(ordering.likeDescending);
    const commentIdStore = ref(0);

    function timeDifference(time) {
      return DateService.getInstance().timeDifference(time);
    }

    //*********************************************   get comments  ++++++++++++++++++++++++++++++++++++++++++++++++++++
    const getComments = () => {
      let model = {
        skip: state.value.listComment.length,
        take: BASE_TAKE,
        postId: parseInt(postId.value),
        parentId: null,
        myPageId: getSelectedPageId(),
        filterType: filterType.value,
        requestTime: new Date(),
      };
      state.value.getComment(model);
    };
    //************************************************  initial get  +++++++++++++++++++++++++++++++++++++++++++++++++//
    onMounted(() => {
      // route params
      postId.value = route.params.postId;
      pageId.value = route.params.pageId;
      username.value = route.params.username;
      getComments();
    });

    //********************************  refresh for filterType of ordering comments  +++++++++++++++++++++++++++++++++++
    watch(
      () => filterType.value,
      () => {
        getComments();
      }
    );
    //*******************************************  like and dislike  +++++++++++++++++++++++++++++++++++++++++++++++++++
    const likeCommentFunc = (commentId, pressLike) => {
      // find index
      let index;
      index = state.value.listComment
        .map(function (e) {
          return e.commentId;
        })
        .indexOf(commentId);
      //remove like or dislike
      if (pressLike === 1 && state.value.listComment[index].isLike === true) {
        state.value.listComment[index].isLike = null;
        let model = {
          commentId: commentId,
          pageId: parseInt(pageId.value),
          postId: parseInt(postId.value),
          isLike: true,
        };
        state.value.removeLikeOrDislike(model);
        state.value.listComment[index].numberOfLikes--;
        return;
      }

      if (pressLike == 0 && state.value.listComment[index].isLike === false) {
        state.value.listComment[index].isLike = null;
        let model = {
          commentId: commentId,
          pageId: getSelectedPageId(),
          postId: parseInt(postId.value),
          isLike: false,
        };
        state.value.removeLikeOrDislike(model);
        state.value.listComment[index].numberOfDislikes--;
        return;
      }

      if (pressLike) {
        if (state.value.listComment[index].isLike === false)
          state.value.listComment[index].numberOfDislikes--;
        state.value.listComment[index].isLike = true;
        state.value.listComment[index].numberOfLikes++;
      } else {
        if (state.value.listComment[index].isLike === true)
          state.value.listComment[index].numberOfLikes--;
        state.value.listComment[index].isLike = false;
        state.value.listComment[index].numberOfDislikes++;
      }

      let model = {
        commentId: commentId,
        pageId: getSelectedPageId(),
        postId: parseInt(postId.value),
        isLike: state.value.listComment[index].isLike,
      };
      state.value.likeAndDislike(model);
    };
    //******************************************  delete Comment  ++++++++++++++++++++++++++++++++++++++++++++++++++++//
    const deleteComment = () => {
      //confirm dialog
      let index;
      index = state.value.listComment
        .map(function (e) {
          return e.commentId;
        })
        .indexOf(commentIdStore.value);

      let model = {
        id: commentIdStore.value,
        postId: parseInt(postId.value),
        myPageId: getSelectedPageId(),
      };
      state.value.deleteComment(model);

      //create new array without specify element
      commentList = state.value.listComment;
      state.value.listComment = [];
      for (let x = 0; x < commentList.length; x++) {
        if (x != index) state.value.listComment.push(commentList[x]);
      }
      openConfirmDialog.value = false;
    };
    //*************************************   create new comment   +++++++++++++++++++++++++++++++++++++++++++++++++++++
    openReport.value = false;
    //================================ report comment ====================================================//
    const postComment = () => {
      if (inputTextOfNewComment.value.length < 2) return;
      if (inputTextOfNewComment.value.length > 1998) return;

      let model = {
        pageId: getSelectedPageId(),
        postId: parseInt(postId.value),
        text: inputTextOfNewComment.value,
        parentId: null,
        posterPageId: parseInt(pageId.value),
      };

      state.value.postComment(model);

      inputTextOfNewComment.value = "";
    };
    return {
      route,
      userData,
      reportTypeItem,
      inputTextOfNewComment,
      openConfirmDialog,
      viewerPageId,
      openReport,
      filterType,
      commentIdStore,
      displayReport,
      ordering,
      username,
      pageId,
      postId,
      state,
      likeCommentFunc,
      deleteComment,
      postComment,
      timeDifference,
      getSelectedPageId
    };
  },
};
</script>

<style scoped>
#cards {
  -webkit-box-shadow: 2px 1px 2px 11px rgba(0, 0, 0, 0),
    0 0 4px 0 rgba(97, 97, 97, 0.44);
  box-shadow: 2px 1px 2px 11px rgba(0, 0, 0, 0),
    0 0 4px 0 rgba(97, 97, 97, 0.44);
  background: #fafafa;
  border-radius: 10px;
}

body#tinymce {
  background: #ffffff;
}

.header {
  text-align: center;
  width: 100%;
  position: absolute;
}

.username {
  color: #bdbdbd;
}

.left-icon {
  width: 19px;
}

.right-icon {
  width: 23px;
}

.like-num {
  margin-top: 12px;
}

.icon-row {
  margin-top: -11px;
}

.reply-icon {
  width: 26px;
  margin-top: 7px;
}
.report-icon {
  padding: 28px 22px 8px 5px;
}

.create-comment {
  border: 2px solid #bdbdbd;
  overflow: hidden;
  position: fixed;
  bottom: 15px;
  height: 52px;
  min-width: 427px;
  max-width: 20%;
  border-radius: 7px;
  margin-left: 70px;
  padding: 10px 0px 10px 0px;
}

.create-comment-btn {
  position: fixed;
  bottom: 15px;
  background-color: #eeeeee;
  border: 2px solid #bdbdbd;
  overflow: hidden;
  width: 52px;
  height: 52px;
  border-radius: 7px;
  margin-left: 13px;
}

@media (max-width: 990px) {
  .create-comment {
    bottom: 100px;
  }

  .create-comment-btn {
    bottom: 100px;
  }

  .break-line {
    display: none;
  }
}

@media (max-width: 500px) {
  .create-comment {
    min-width: 380px;
  }
}

@media (max-width: 450px) {
  .create-comment {
    min-width: 330px;
  }
}

@media (max-width: 400px) {
  .create-comment {
    min-width: 280px;
  }
}

@media (max-width: 350px) {
  .create-comment {
    min-width: 230px;
  }
}

.post-icon {
  padding: 13px;
  width: 45px;
}

.header-shape {
  width: 288px;
}

.profileImg {
  width: 55px;
  border-radius: 55px;
  border: 2px solid #707070;
}

.headOfComment {
  margin-bottom: -15px;
}

.filter-div {
  width: fit-content;
  border-radius: 10px;
}

.filter-select {
  border-radius: 10px;
  border: none;
}
</style>
