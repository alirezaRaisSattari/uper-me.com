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
      <div class="col-6 text-center" v-if="state.allComments.length !== 0">
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

      <div class="col-6 text-center" v-if="state.allComments.length !== 0">
        <select
          id="ideaSelect"
          v-model="state.faceScore"
          class="select-box w-100 smart-text-align"
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

    <loading
      v-if="state.scoreLoading === true && state.allComments.length !== 0"
    />

    <div
      v-if="state.scoreLoading === false"
      class="bg-white smart-text-align uper-card-1 m-2 mt-4 p-2"
    >
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <i class="far fa-user"></i>
          <div v-if="state.fullProduct != null" class="mx-2">
            {{ state.fullProduct.scoreItem.vote }}
          </div>
        </div>
        <div class="d-flex">
          <ratingStars
            v-if="state.fullProduct != null"
            :rate="state.fullProduct.scoreItem.average"
            class="mx-4"
          />
          <div @click="openFlash = !openFlash">
            <i v-if="openFlash === false" class="fas fa-angle-down"></i>
            <i v-if="openFlash === true" class="fas fa-angle-up"></i>
          </div>
        </div>
      </div>
      <div v-if="openFlash === true" class="mt-4">
        <div class="d-flex justify-content-between mt-2">
          <div class="mx-2">{{ state.scoreItemsDetail.title1 }}</div>
          <ratingStars :rate="state.scoreItemsDetail.scoreItem1" class="mx-4" />
        </div>
        <div class="d-flex justify-content-between mt-2">
          <div class="mx-2">{{ state.scoreItemsDetail.title2 }}</div>
          <ratingStars :rate="state.scoreItemsDetail.scoreItem2" class="mx-4" />
        </div>
        <div class="d-flex justify-content-between mt-2">
          <div class="mx-2">{{ state.scoreItemsDetail.title3 }}</div>
          <ratingStars :rate="state.scoreItemsDetail.scoreItem3" class="mx-4" />
        </div>
        <div class="d-flex justify-content-between mt-2">
          <div class="mx-2">{{ state.scoreItemsDetail.title4 }}</div>
          <ratingStars :rate="state.scoreItemsDetail.scoreItem4" class="mx-4" />
        </div>
        <div class="d-flex justify-content-between mt-2">
          <div class="mx-2">{{ state.scoreItemsDetail.title5 }}</div>
          <ratingStars :rate="state.scoreItemsDetail.scoreItem5" class="mx-4" />
        </div>
      </div>
    </div>

    <p v-if="state.allComments.length === 0" class="text-center py-5">
      {{ $t("emptyList") }}
    </p>

    <div v-if="state.allComments.length !== 0" class="p-0 m-0">
      <div v-for="comment in state.allComments">
              <comment-cart :comment="comment" :targetPageId="state.fullPageLoading" :isReply="false" :isReplyHeader="false"  :userName="userName" @deleteCompleted="deleteCompleted" ></comment-cart>
        <comment-cart
          :comment="comment"
          :isReply="false"
          :isReplyHeader="false"
          :productId="productId"
          :workPageId="workPageId"
          @deleteCompleted="deleteCompleted"
        ></comment-cart>
      </div>
    </div>

    <loading v-if="state.commentsLoading === true" />
    <button
      class="
        btn btn-danger
        comment-btn-workPage
        mx-3
        mb-2
        mt-4
        reverse-smart-text-align
      "
      @click="submitComment"
    >
      ثبت نظر
    </button>
  </div>
</template>

<script>
import ratingStars from "@/app/public/shared/ratinstar/ratingStars.vue";
import { onMounted, ref } from "vue";
import commentCart from "./producCommentCart/commentCart";
import { productCommentState } from "./productCommentState.ts";
import router from "@/core/router/router";
import { useRoute } from "vue-router";
import { windowScrolledToBottom } from "@/core/service/utils.service";

export default {
  name: "productComments",
  components: { ratingStars, commentCart },
  setup() {
    const openFlash = ref(false);
    const showMore = ref(false);
    const route = useRoute();
    const likeSelectSelected = ref(1);
    const userName = ref(route.params.userName);
    const productId = ref(route.params.productId);
    const workPageId = ref(Math.abs(Number(route.params.workPageId)));
    const state = ref(new productCommentState());

    function deleteCompleted(deletedCommentId) {
      let deletedIndex = state.value.allComments.findIndex((e) => {
        return e.commentId === deletedCommentId;
      });
      state.value.allComments.splice(deletedIndex, deletedIndex + 1);
      state.value.fullProduct.scoreItem.vote--;
    }

    function submitComment() {
      router.push(
        `/page/productSubmitComment/${productId.value}/${workPageId.value}`
      );
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
      //  state.value.userName=userName.value
      state.value.productId = productId.value;
      state.value.productType = productId.value;
      state.value.workPageId = workPageId.value;
      state.value.getProductById();
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
      productId,
      workPageId,
    };
  },
};
</script>

<style scoped>

.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  cursor: pointer !important;
}

.con {
  position: relative;
}

.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

@media only screen and (min-width: 786px) {
}

@media only screen and (min-width: 1200px) {
}

@media only screen and (min-width: 1400px) {
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
</style>
