<template>
  <div>
    <div class=" bg-white smart-text-align m-2 p-2 uper-card-1">
      <div class="d-flex justify-content-between px-2"><!--   first line -->
        <div class="d-flex">
          <div class="img-con">
            <img v-lazy="comment.pageDetail.profileImageUrl + '_sm.webp'" class="img">
            <img
                v-if="creditLevel === 1 && creditLevel!= null"
                alt="My5 SVG"
                class="m-svg"
                src="@/assets/img/ic_crown_golden.svg"
            />
            <img
                v-if="creditLevel === 2 && creditLevel!= null"
                alt="My5 SVG"
                class="m-svg"
                src="@/assets/img/ic_crown_grey.svg"
            />
          </div>
          <div class="my-3 mx-2">
            <div>{{ comment.pageDetail.name }}</div>
            <div class="text-muted">{{ comment.pageDetail.username }}</div>
          </div>
        </div>

        <div v-if="isReply===false" class="mt-3 mx-2">
          <div class="d-flex justify-content-between ">
            <div class="mx-2">
              <div v-if="comment.faceScore===1" class="green">{{ $t('Isuggest') }}</div>
              <div v-else-if="comment.faceScore===2" class="yellow">{{ $t('noIdea') }}</div>
              <div v-else-if="comment.faceScore===3" class="red">{{ $t('noIdea') }}</div>
              <div v-else-if="comment.faceScore===4">{{ $t('iHaveQuestion') }}</div>
            </div>
            <div>
              <i v-if="comment.faceScore===1" class="far fa-smile-beam icon-size-23 green"></i>
              <i v-else-if="comment.faceScore===2" class="far fa-meh icon-size-23 yellow"></i>
              <i v-else-if="comment.faceScore===3" class="far fa-frown icon-size-23 red"></i>
              <i v-else-if="comment.faceScore===4" class="fas fa-question icon-size-23"></i>
            </div>

          </div>
          <div class="text-muted text-center mt-2">
            {{ DateService.getInstance().timeDifference(comment.createDate) }}
          </div>
        </div>
      </div>
      <hr class="mx-0">
      <div class="px-2"> <!--  second line -->
        <div class="mt-0">{{ comment.text }}</div>
        <div class="d-flex justify-content-between mt-3">  <!--  icons line -->
          <div class="d-flex justify-content-between"> <!--  likes -->
            <div class="d-flex justify-content-between" @click="Like"> <!--  like -->
              <i :class="state.liked===true||comment.isLike===true?'green':''" class="fas fa-thumbs-up "></i>
              <div class="mx-2">{{ comment.numberOfLikes }}</div>
            </div>
            <div class="d-flex justify-content-between mx-4" @click="desLike"> <!--  dislike -->
              <i :class="state.disliked===true||comment.isLike===false?'red':''" class="fas fa-thumbs-down"></i>
              <div class="mx-2">{{ comment.numberOfDislikes }}</div>
            </div>
          </div>
          <div v-if="isReplyHeader===false">
            <div class="d-flex justify-content-between">
              <i v-if="isReply===false" class="fas fa-reply mx-4" @click="showReplies"></i>
              <i v-if="comment.pageDetail.pageId===pageId" class="far fa-trash-alt"
                 @click="showDeleteCommentDialog=true"></i>
              <i v-else-if="isReply===false" class="far fa-flag mx-2" @click="displayReport=true"></i>
              <confirmDialog
                  v-if="isReply===false"
                  :header="$t('deleteCommentConfirmHeader')"
                  :icon="'fa fa-exclamation-triangle'"
                  :text="$t('deleteCommentConfirmBody')"
                  :visible="showDeleteCommentDialog"
                  @accept="logOut"
                  @reject="showDeleteCommentDialog = false"
                  @times="showDeleteCommentDialog = false"
              />
              <confirmDialog
                  v-if="isReply===true"
                  :header="$t('deleteReplyConfirmHeader')"
                  :icon="'fa fa-exclamation-triangle'"
                  :text="$t('deleteReplyConfirmBody')"
                  :visible="showDeleteCommentDialog"
                  @accept="logOut"
                  @reject="showDeleteCommentDialog = false"
                  @times="showDeleteCommentDialog = false"
              />
            </div>
          </div>
        </div>
        <div v-if="showCount===true && countOfReplies != null && countOfReplies !== 0" class="mt-1" @click="showReplies">
          {{ $t('showReplies') }} ({{ countOfReplies }})
        </div>
        <div v-if="showMore===false && isReply===false" class=" mt-3 more-workPage-comment px-2" @click="showMore=true">
          <div
              v-if="!(comment.positivePoints.length===1  && comment.positivePoints===''&&comment.negativePoints.length===1  && comment.negativePoints==='')">
            {{ $t('more') }}
          </div>
        </div>
      </div>
      <hr v-if="showMore===true" class="mx-0">

      <div v-if="showMore===true" class="px-2">
        <div>
          <div class=" mb-3 mx-1 green">{{ $t('positivePoints') }}</div>
          <div v-if="comment.positivePoints.length===1  && comment.positivePoints===''" class="d-flex mx-3">
            {{ $t('thereAreNoResults') }}
          </div>
          <div v-else>
            <div v-for="pos in comment.positivePoints" class="d-flex mx-3">
              <div><i class="fas fa-plus green"></i></div>
              <div class="mx-4">{{ pos }}</div>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <div class=" mb-3 mx-1 red">{{ $t('negativePoints') }}</div>
          <div v-if="comment.negativePoints.length===1  && comment.negativePoints===''" class="d-flex mx-3">
            {{ $t('thereAreNoResults') }}
          </div>
          <div v-else>
            <div v-for="neg in comment.negativePoints" class="d-flex mx-3">
              <div><i class="fas fa-minus red"></i></div>
              <div class="mx-4">{{ neg }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <!--==========report modal==============-->
  <Dialog
      v-model:visible="displayReport"
      :contentStyle="{ borderRadius: '7px' }"
      :dismissableMask="true"
      :header="false"
      :modal="true"
      :showHeader="false"
      style="width: 18rem; border-radius: 15px !important"
  >
    <report :userData="userData" @closeReportModal="displayReport = false" :itemId="pageId" :itemType="reportTypeItem"/>
  </Dialog>

</template>

<script>
import report from "@/app/public/shared/report/report.vue"
import ratingStars from "@/app/public/shared/ratinstar/ratingStars.vue";
import {ref, onMounted} from 'vue'
import {getSelectedPageData, getSelectedPageId} from "@/core/service/utils.service"
import {DateService} from "@/core/service/date.service";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import {commentCartState} from "./commentCartState.ts"
import {PageCommentRepository} from "@/core/repository/pageComment.repository";
import router from "../../../../../../core/router/router";
import {reportType} from "@/core/enum/enums";

export default {
  name: "commentCard",
  components: {ratingStars, confirmDialog,report},
  props: {
    comment: Object,
    targetPageId: Number,
    userName: String,
    isReply: Boolean,
    showCount: Boolean,
    isReplyHeader: Boolean,
    countOfReplies: Number,
    creditLevel: Number
  },
  setup(props, {emit}) {
    const userData = ref(getSelectedPageData());
    const reportTypeItem = ref(reportType.Page);
    const displayReport = ref(false);
    const openFlash = ref(false)
    const showMore = ref(false)
    const pageId = ref(false)
    const showDeleteCommentDialog = ref(false)
    const state = ref(new commentCartState())

    function logOut() {
      deleteComment()
      showDeleteCommentDialog.value = false;

    }

    function Like() {
      state.value.liked = !state.value.liked;

      if (props.comment.isLike && state.value.liked) return
      if (props.comment.isLike === false) {
        state.value.disliked = false
        props.comment.numberOfDislikes--
      }

      if (state.value.liked) {
        state.value.isLike = true;
        props.comment.isLike = true
        state.value.LikeOrDisLike()
        props.comment.numberOfLikes++
      } else if (!state.value.liked) {
        state.value.isLike = true;
        state.value.RemoveLikeOrDisLike()
        state.value.isLike = null;
        props.comment.isLike = null
        props.comment.numberOfLikes--
      }
    }

    function desLike() {
      state.value.disliked = !state.value.disliked;

      if (props.comment.isLike === false && state.value.disliked === true) return
      if (props.comment.isLike === true) {
        state.value.liked = false
        props.comment.numberOfLikes--
      }


      if (state.value.disliked) {
        state.value.isLike = false;
        props.comment.isLike = false
        state.value.LikeOrDisLike()
        props.comment.numberOfDislikes++
      } else if (!state.value.disliked) {
        state.value.isLike = false
        state.value.RemoveLikeOrDisLike()
        state.value.isLike = null;
        props.comment.isLike = null
        props.comment.numberOfDislikes--
      }
    }

    function showReplies() {
      router.push(`/page/workPageReplyComment/${props.userName}/${props.comment.commentId}`)
    }

    function deleteComment() {

      PageCommentRepository.getInstance().deleteComment({
        body: {
          commentId: props.comment.commentId,
          targetPageId: state.value.targetPageId,
          sourcePageId: state.value.sourcePageId
        },
        onReceive: (res) => {
          emit('deleteCompleted', props.comment.commentId)
        }
      })
    }

    onMounted(() => {

      pageId.value = getSelectedPageId()
      state.value.targetPageId = Math.abs(props.targetPageId)
      state.value.commentId = props.comment.commentId
      state.value.comment = props.comment
      if (props.comment.isLike == null) {
        state.value.liked = null/// false   true    null
        state.value.disliked = null/// false   true    null
      } else {
        state.value.liked = props.comment.isLike/// false   true    null
        state.value.disliked = !props.comment.isLike/// false   true    null
      }
    })
    return {
      userData,
      reportTypeItem,
      displayReport,
      openFlash,
      showMore,
      pageId,
      DateService,
      showDeleteCommentDialog,
      logOut,
      state,
      deleteComment,
      Like,
      desLike,
      showReplies
    }

  }
}
</script>

<style scoped>


.uper-card-1:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25), 0 3px 5px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  cursor: pointer !important;
}

.icon-size-23 {
  font-size: 23px;
}

.green {
  color: #469b46 !important;
}

.yellow {
  color: rgba(245, 205, 11, 0.84);
}

.blue {
  color: #436ad0;
}

.red {
  color: #d41e1e !important;
}

.white {
  color: white;
}

.img {
  width: 73px;
  height: 73px;
  padding-top: 3px;
  padding-inline: 3px;
  border-radius: 50%;
  position: relative;
}

.main-card {
  margin-inline: auto;
  margin-block: 20px;

  padding-block: 10px;
  width: 96%;
  box-shadow: 0 0px 2px 2px #dfdfdf66;
  border-radius: 7px;
}

select {
  border: 2px solid #c2c2c2 !important;
}

.img-con {
  position: relative;
}


@media only screen and (max-width: 425px) {
  .m-svg {
    position: absolute;
    bottom: 0;
    left: 4vw;
    width: 20px;
    height: 20px;
  }
}

@media only screen and (min-width: 425px) {
  .m-svg {
    position: absolute;
    bottom: 0;
    left: 6vw;
    width: 20px;
    height: 20px;
  }
}

@media only screen and (min-width: 768px) {
  .m-svg {
    position: absolute;
    bottom: 5px;
    left: 4vw;
    width: 20px;
    height: 20px;
  }
}

@media only screen and (min-width: 1024px) {
  .m-svg {
    position: absolute;
    bottom: 3px;
    left: 4vw;
    width: 20px;
    height: 20px;
  }
}

@media only screen and (min-width: 1440px) {
  .m-svg {
    position: absolute;
    bottom: 4px;
    left: 3vw;
    width: 20px;
    height: 20px;
  }
}


</style>
