<template>
  <div class="con">
    <div class="d-flex justify-content-center align-items-center">
      <h5 class="header-title m-0 shape-text">{{ $t("comments") }}</h5>
      <img
          alt=""
          class="header-shape-page"
          src="@/assets/img/svg/appbarShape.svg"
      />
    </div>

    <div
        v-if="!(state.numberOfCalls < 1 && state.allComments.length < 3)"
        class="d-flex mt-3"
    >
      <div class="col-6 text-center">
        <select
            id="likeSelect"
            v-model="state.filterType"
            class="select-box w-100 smart-text-align p-1"
            name="likeSelect"
            @change="likeSelectChange"
        >
          <option value="1">{{ $t("likeNumberAscending") }}</option>
          <option value="2">{{ $t("dislikeAscending") }}</option>
        </select>
      </div>

      <div class="col-6 text-center">
        <select
            id="ideaSelect"
            v-model="state.faceScore"
            class="select-box w-100 smart-text-align p-1"
            name="ideaSelect"
            @change="faceScoreFilterChange"
        >
          <option :value="null">{{ $t("all") }}</option>
          <option value="1">{{ $t("Isuggest") }}</option>
          <option value="2">{{ $t("noIdea") }}</option>
          <option value="3">{{ $t("IDontsuggest") }}</option>
          <option value="4">{{ $t("iHaveQuestion") }}</option>
        </select>
      </div>
    </div>

    <loading v-if="state.scoreLoading == true"/>

    <div
        v-if="state.scoreLoading == false"
        class="bg-white smart-text-align uper-card-1 m-2 mt-4 p-2"
    >
    
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <i class="far fa-user"></i>
          <div v-if="state.fullPage != null" class="mx-2">
            {{ state.fullPage.scoreItems.vote }}
          </div>
        </div>
        <div class="d-flex">
          <ratingStars
              v-if="state.fullPage != null"
              :rate="state.fullPage.scoreItems.average"
              class="mx-4"
          />

          <div @click="openFlash = !openFlash">
            <i v-if="openFlash == false" class="fas fa-angle-down"></i>
            <i v-if="openFlash == true" class="fas fa-angle-up"></i>
          </div>
        </div>
      
      </div>
      <div v-if="openFlash == true" class="mt-4">
        <div class="d-flex justify-content-between mt-2">
          <div class="mx-2">{{ state.scoreItemsDetail.title1 }}</div>
          <ratingStars :rate="state.scoreItemsDetail.scoreItem1" class="mx-4"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
          <div class="mx-2">{{ state.scoreItemsDetail.title2 }}</div>
          <ratingStars :rate="state.scoreItemsDetail.scoreItem2" class="mx-4"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
          <div class="mx-2">{{ state.scoreItemsDetail.title3 }}</div>
          <ratingStars :rate="state.scoreItemsDetail.scoreItem3" class="mx-4"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
          <div class="mx-2">{{ state.scoreItemsDetail.title4 }}</div>
          <ratingStars :rate="state.scoreItemsDetail.scoreItem4" class="mx-4"/>
        </div>
        <div class="d-flex justify-content-between mt-2">
          <div class="mx-2">{{ state.scoreItemsDetail.title5 }}</div>
          <ratingStars :rate="state.scoreItemsDetail.scoreItem5" class="mx-4"/>
        </div>
      </div>
    </div>

    <div v-if="state.allComments.length != 0" class="p-0 m-0">
      <div v-for="comment in state.allComments">
        <comment-cart
            :comment="comment"
            :countOfReplies="comment.numberOfReplies"
            :creditLevel="comment.pageDetail.creditLevel"
            :isReply="false"
            :isReplyHeader="false"
            :showCount="true"
            :targetPageId="state.fullPage.id"
            :userName="userName"
            @deleteCompleted="deleteCompleted"
        ></comment-cart>
      </div>
    </div>

    <loading v-if="state.commentsLoading == true"/>
    <div v-else-if="state.allComments.length == 0" class="text-center">
      <div class="blue">{{ $t("emptyList") }}</div>
    </div>
    <float-btn :text="$t('submit comment')" icon="fas fa-comment"></float-btn>
  </div>
</template>

<script>
import ratingStars from "@/app/public/shared/ratinstar/ratingStars.vue";
import Rating from "primevue/rating";
import {ref, onMounted} from "vue";
import commentCart from "./commentCart/commentCart";
import {workPageCommentState} from "./workPageCommentState.ts";
import router from "@/core/router/router";
import {useRoute} from "vue-router";
import {windowScrolledToBottom} from "@/core/service/utils.service";
import FloatBtn from "@/app/public/shared/floatBtn/floatBtn.vue";

export default {
  name: "workPageComments",
  components: {Rating, ratingStars, commentCart, FloatBtn},
  setup() {
    const openFlash = ref(false);
    const showMore = ref(false);
    const route = useRoute();
    const likeSelectSelected = ref(1);
    const userName = ref(route.params.userName);
    const state = ref(new workPageCommentState());

    function deleteCompleted(deletedCommentId) {
      let deletedIndex = state.value.allComments.findIndex((e) => {
        return e.commentId == deletedCommentId;
      });
      state.value.allComments.splice(deletedIndex, deletedIndex + 1);
      state.value.fullPage.scoreItems.vote--;
    }

    function submitComment() {
      router.push(`/page/workPageSubmitComment/${userName.value}`);
    }

    function likeSelectChange() {
      state.value.skip = 0;
      state.value.take = 10;
      state.value.allCommentsLoading = false;
      state.value.commentsFinished = false;

      state.value.getAllComments(true);
    }

    function faceScoreFilterChange() {
      state.value.skip = 0;
      state.value.take = 10;
      state.value.allCommentsLoading = false;
      state.value.commentsFinished = false;

      state.value.getAllComments(true);
    }

    onMounted(() => {
      state.value.userName = userName.value;
      state.value.getFullPage();
      windowScrolledToBottom(() => {
        state.value.getAllComments(false);
      });
    });
    return {
      openFlash,
      showMore,
      userName,
      state,
      deleteCompleted,
      submitComment,
      likeSelectSelected,
      likeSelectChange,
      faceScoreFilterChange,
    };
  },
};
</script>

<style scoped>
.opinion-card {
  margin-inline: auto;
  margin-block: 20px;
  padding-inline: 9px;
  padding-block: 18px;
  width: 96%;
  box-shadow: 0 0px 2px 2px #dfdfdf66;
  border-radius: 7px;

}

.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  cursor: pointer !important;
}

.con {
  position: relative;
  padding-bottom: 60px;
}

.green {
  color: #49b549;
}

.yellow {
  color: rgba(245, 205, 11, 0.84);
}

.red {
  color: #d41e1e;
}

.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.float-btn {
  border-radius: 30px !important;
  width: 114px !important;
  background-color: #fe2f2f !important;
  cursor: pointer !important;
  position: fixed;
  left: 126px;
  bottom: 85px;
}

@media only screen and (min-width: 786px) {
  .comment-btn-workPage {
    border-radius: 30px;
    width: 114px;
    background-color: #fe2f2f !important;
    cursor: pointer !important;
    position: fixed;
    left: 300px;
    bottom: 85px;
  }
}

@media only screen and (max-width: 500px) {
  .comment-btn-workPage {
    border-radius: 30px;
    width: 114px;
    background-color: #fe2f2f !important;
    cursor: pointer !important;
    position: fixed;
    left: 21px;
    bottom: 80px;
  }
}

@media only screen and (min-width: 1200px) {
  .comment-btn-workPage {
    border-radius: 30px;
    width: 114px;
    background-color: #fe2f2f !important;
    cursor: pointer !important;
    position: fixed;
    left: 350px;
    bottom: 20px;
  }
}

@media only screen and (min-width: 1400px) {
  .comment-btn-workPage {
    border-radius: 30px;
    width: 114px;
    background-color: #fe2f2f !important;
    cursor: pointer !important;
    position: fixed;
    left: 510px;
    bottom: 20px;
  }
}

.shape-text {
  position: absolute;
  top: 10px;
  font-size: 16px;
}

.select-box {
  height: 48px;
  border-radius: 58px;
  outline: none !important;
}

select {
  border: 2px solid #c2c2c2 !important;
}

.blue {
  color: #436ad0;
}
</style>
