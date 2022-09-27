<template>
  <div class="container p-2">
    <!-- ditals Dialog -->
    <Dialog
      v-if="postId === postItem.postId"
      v-model:visible="displayPostDetailes"
      :contentStyle="{ borderRadius: '7px' }"
      :dismissableMask="true"
      :header="false"
      :modal="true"
      :showHeader="false"
      style="width: 18rem; border-radius: 15px !important"
    >
      <div class="px-2">
        <div
          class="w-100 smart-text-align my-3 hover-pointer d-flex"
          @click="reportDialog"
        >
          <i class="fa fa-flag my-auto mx-1"></i>
          <span> {{ $t("report") }} </span>
        </div>
        <div class="w-100 smart-text-align my-3 hover-pointer d-flex">
          <i class="fa fa-share-alt mx-1 my-auto"></i>
          <span>{{ $t("share") }}</span>
        </div>
      </div>
    </Dialog>
    <!-- /ditals Dialog -->

    <!-- header -->
    <!-- header  post -->
    <div
      class="d-flex justify-content-between align-items-center mt-2 pr-2 ltr"
    >
      <div class="p-2 hover-pointer">
        <i
          class="icon-font u000 text-dark"
          @click="openPostDetails(postItem.postId)"
        ></i>
      </div>
      <span class="ml-auto mr-3">
        <span
          class="d-flex size-small smart-text-align justify-content-end text-sm"
          @click="$function.goTo(`/page/${postItem.pageDetails.username}`)"
          >{{ postItem.pageDetails.name }}</span
        >
        <span
          class="d-flex size-small smart-text-align justify-content-end text-sm"
          @click="$function.goTo(`/page/${postItem.pageDetails.username}`)"
          >{{ postItem.pageDetails.username }}</span
        >
      </span>
      <img
        v-lazy="postItem.pageDetails.profileImageUrl + '_sm.webp'"
        alt=""
        class="user-profile-image"
      />
    </div>
    <!--    slider     -->

    <!--slider post 2 -->

    <div class="reverse-smart-text-align">
      <ratio :ratio="'1/1'" class="mt-2">
        <postSlider :postFiles="postItem.postFiles" class="swiper" />
      </ratio>
    </div>
    <!-- icons -->
    <div class="d-flex justify-content-between mt-2 ltr">
      <!-- bookmark -->
      <i
        :class="
          postItem.isBookMark ? 'far fa-bookmark' : 'icon-font ubookmark '
        "
        class="size-medium mr-2"
        @click="bookmarkFunc(postItem.postId)"
      ></i>
      <!-- /bookmark -->
      <div class="d-flex">
        <i class="icon-font usend-45 mr-2 icon1 size-medium"></i>
        <router-link
          :to="`/page/comment/${myUser.username}/${myUser.id}/${postItem.postId}`"
          ><i class="icon-font ucomment mr-2 size-medium text-dark"></i
        ></router-link>

        <!--  like project :/   -->
        <i
          :id="postItem.postId"
          :class="postItem.like ? 'uheart-fill' : 'uheart-line'"
          :style="postItem.like ? 'color:red' : ''"
          class="icon-font  mr-2 size-medium ml-1 hover-pointer"

          @click="
            likeFunc(
              postItem.like,
              postItem.pageDetails.pageId,
              postItem.postId
            )
          "
        ></i>
      </div>
    </div>

    <div
        v-if="postItem.mainFileIsImage "
        class="text-muted smart-text-align mt-1 text-sm"
    >
      {{ postItem.numberOfLikes }} {{ $t("like") }}
    </div>
    <div
       v-else
        class="text-muted smart-text-align mt-1 text-sm"
    >
      {{ postItem.numberOfViews }} {{ $t("view") }}
    </div>

    <div class="smart-text-align mt-3">
      <p v-if="postItem.caption != null && !clickedMore" class="long-caption caption mb-0" >
        {{ postItem.caption }}
      </p>
       <Button :label="$t('more')" @click="clickedMore = true" v-if="postItem.caption != null && postItem.caption.length > 50 && !clickedMore" class="p-button-text p-button-plain more" />
      <!--  caption   -->
      <p v-if="postItem.caption != null && clickedMore" class="caption  mb-0">
        {{ postItem.caption }}
      </p>
     
      <br />
      <!-- hashtags -->
      <p v-if="postItem.postHashtags != null" class="w-100 d-flex flex-wrap">
        <span
          v-for="hash in postItem.postHashtags"
          :key="hash.hashtagId"
          class="mx-1 text-sm"
          >#{{ hash.title }}</span
        >
      </p>
    </div>
    <!-- ////////comment -->
    <div class=" d-flex align-items-center justify-content-between px-2 rtl text-aria-div " >
      <img v-lazy="myUser.profileUrl + '_sm.webp'" alt="" class="main-postImg" />
      <InputText v-model="postItem.newComment" :placeholder="$t('yourComment')" class=" text-break comment-input ml-auto font size-small  mr-2 smart-text-align text-sm" type="text"/>
      <i class="icon-font uadd last-icon" @click="createComment(postItem.pageDetails.pageId, postItem.postId)" ></i>
    </div>
    <div class="time-controller smart-text-align">
      <span>{{`${$filters.timeDifference(postItem.createdAt)}`}}</span>
    </div>
    <!-- ////////show comment -->
    <loading v-if="State.commentLoading" />
    <div
      v-for="item in postItem.commentList"
      v-else
      :key="item"
      class="w-100 smart-text-align"
    >
      <b>{{ myUser.name }}</b>
      <p class="mt-1 text-break">
        {{ item }}
      </p>
    </div>
  </div>
  <Dialog
    v-model:visible="reportVisible"
    :contentStyle="{ borderRadius: '7px' }"
    :dismissableMask="true"
    :header="false"
    :modal="true"
    :showHeader="false"
    style="width: 18rem; border-radius: 15px !important"
  >
    <Report :postId="postId" @close="closeDialog"></Report>
  </Dialog>
  <Dialog
    v-model:visible="displayBookmark"
    :breakpoints="{
      '1000px': '52vw',
      '800px': '65vw',
      '600px': '91vw',
    }"
    :contentStyle="{
      background: 'rgb(255, 255, 255)',
      borderRadius: '12px',
    }"
    :showHeader="false"
    :style="{}"
    dismissableMask
    header=""
    modal
  >
    <bookmark :Id="postId" />
  </Dialog>
</template>

<script>
import { ref } from "vue";
import { postItemsState } from "./HomeScreenPostSliderState";
import Report from "./ReportProblem.vue";
import postSlider from "./postSlider.vue";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import bookmark from "@/app/unit/pages/bookmark/bookmark.vue";
import {
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";
import {set} from "vue3-qr-reader";

export default {
  name: "posts",
  components: { postSlider, Report, ratio, bookmark },
  props: {
    postItem: {
      type: Object,
    },
  },
  setup(props) {
    const postId = ref();
    const displayBookmark = ref(false);
    const displayPostDetailes = ref(false);
    const clickedMore = ref(false);
    const myUser = ref(getSelectedPageData());
    const State = ref(new postItemsState());
    const reportVisible = ref(false);

    function openPostDetails(id) {
      postId.value = id;
      displayPostDetailes.value = !displayPostDetailes.value;
    }

    const bookmarkFunc = (id) => {
      displayBookmark.value = true;
      postId.value = id;
    };

    function createComment(posterId, postId) {
      if (props.postItem.newComment.length < 2) return;
      if (props.postItem.newComment.length > 1998) return;
      let model = {
        postId: postId,
        posterPageId: posterId,
        parentId: null,
        pageId: getSelectedPageId(),
        text: props.postItem.newComment,
      };
      State.value.postComment(model);
      props.postItem.commentList.push(props.postItem.newComment);
      props.postItem.newComment = "";
    }
    const likeFunc = (isLiked, posterId, postId) => {
      setTimeout(() => {
        let model = {
          pageId: posterId,
          postId: postId,
          likerPageId: getSelectedPageId(),
        };
        if (isLiked) {
          State.value.unlikePost(model, () => {
            props.postItem.like = false;
          });
        } else {
          State.value.likePost(model, () => {
            props.postItem.like = true;
          });
        }
      }, 3000);
    };


    const reportDialog = () => {
      reportVisible.value = !reportVisible.value;
    };
    const closeDialog = () => {
      reportVisible.value = false;
      displayPostDetailes.value = false;
    };

    return {
      State,
      postId,
      openPostDetails,
      bookmarkFunc,
      myUser,
      clickedMore,
      createComment,
      likeFunc,
      reportDialog,
      reportVisible,
      closeDialog,
      displayBookmark,
      displayPostDetailes,
    };
  },
};
</script>
<style lang="scss" scoped>
.caption {
  word-break: break-word;
  margin-top: -13px;
  white-space: pre;
}

.long-caption {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  white-space: pre;
}

.main-postImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.comment-input {
  background-color: transparent;
  border: none;
  width: 85%;
  color: black;
}

.comment-input:focus {
  outline: none;
}

.user-profile-image {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}

.text-aria-div {
  border: 1px solid rgb(220, 220, 220);
  border-radius: 10px;
  margin-left: 10px;
  height: 63px;
  z-index: 10;
}

.more {
  font-size: 13px;
  box-shadow: none !important;
  color: #686868 !important;
}

.time-controller {
 padding: 10px;
 width: 100%;
 display: block;
 font-size: 14px;
 color:#686868;
 span {
   width: 100%;
   display: block;
 }
}
</style>
