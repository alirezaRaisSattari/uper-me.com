<template>
  <div style="margin-bottom: 30px">
    <div class="d-flex justify-content-center align-items-center">
      <h5 class="header-title m-0 shape-text">{{ $t("comments") }}</h5>
      <img
        alt=""
        class="header-shape-page"
        src="@/assets/img/svg/appbarShape.svg"
      />
    </div>

    <loading v-if="state.mainCommentLoading == true" />

    <div v-if="state.mainComment != null && state.mainCommentLoading == false">
      <comment-cart
        :comment="state.mainComment"
        :isReply="false"
        :isReplyHeader="true"
        :productId="productId"
        :workPageId="workPageId"
      ></comment-cart>
    </div>

    <div class="p-0 m-0">
      <div
        v-if="state.allReplies.length != 0"
        class="all-comment-replies-workPage-con"
      >
        <comment-cart
          v-for="reply in state.allReplies"
          :key="reply"
          :comment="reply"
          :isReply="true"
          :isReplyHeader="false"
          :productId="productId"
          :workPageId="workPageId"
          @deleteCompleted="deleteCompleted"
        ></comment-cart>
        <!--        <comment-cart :comment="comment" :productId="productId" :workPageId="workPageId" :isReply="false" :isReplyHeader="false"   @deleteCompleted="deleteCompleted" ></comment-cart>-->
      </div>
      <div
        v-if="state.allReplies.length == 0 && state.first == false"
        class="text-center"
      >
        <div class="blue">{{ $t("noReplies") }}</div>
      </div>
    </div>

    <loading v-if="state.allRepliesLoading == true" />

    <div class="width-96 mt-4 text-center footer-rep">
      <div class="d-flex mt-1 justify-content-between">
        <input
          v-model="state.yourReply"
          :placeholder="$t('yourComment')"
          class="form-control cus-input"
        />
        <div
          class="grey-cell"
          @click="state.createReply(state.yourReply), (state.yourReply = '')"
        >
          <i class="fas fa-paper-plane"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ReplyCommentState } from "./ReplyCommentState.ts";
import commentCart from "../producCommentCart/commentCart";
import { windowScrolledToBottom } from "@/core/service/utils.service";

export default {
  name: "replyComment",
  components: { commentCart },
  setup(props) {
    const route = useRoute();
    const userName = ref(route.params.userName);
    const commentId = ref(route.params.commentId);
    const productId = ref(route.params.productId);
    const workPageId = ref(route.params.workPageId);
    const state = ref(new ReplyCommentState());
    state.value.TPageId = route.params.workPageId;

    function deleteCompleted(deletedCommentId) {
      let deletedIndex = state.value.allReplies.findIndex(
        (e) => e.commentId == deletedCommentId
      );
      state.value.allReplies.splice(deletedIndex, 1);
    }

    onMounted(() => {
      state.value.productId = productId.value;
      state.value.workPageId = workPageId.value;
      state.value.commentId = commentId.value;

      state.value.getProductById();
      windowScrolledToBottom(() => {
        state.value.GetAllReplies();
      });
    });

    return {
      state,
      deleteCompleted,
      productId,
      workPageId,
    };
  },
};
</script>

<style scoped>
.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.shape-text {
  position: absolute;
  top: 10px;
  font-size: 16px;
}

.cus-input {
  width: 84%;
  height: 45px;
  border-radius: 8px;
}

.grey-cell {
  background-color: #e1e2e2;
  width: 15%;
  padding-block: 12px;
  border: 1px solid #c2c5c5;
  border-radius: 8px;
  height: 45px;
}

.width-96 {
  width: 96%;
  margin-inline: auto;
}

.blue {
  color: #436ad0;
}

.footer-rep {
  position: fixed;
  bottom: 0;
  z-index: 100;
  left: calc(50% - 255px);
  height: 55px;
  max-width: 510px;
  min-width: 510px;
}
</style>
