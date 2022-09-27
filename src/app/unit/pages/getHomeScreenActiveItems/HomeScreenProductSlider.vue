<template>
  <div class="container p-2">

    <Dialog
      v-if="productId === productItem.productId"
      v-model:visible="displayProductDetailes"
      :contentStyle="{ borderRadius: '7px' }"
      :dismissableMask="true"
      :header="false"
      :modal="true"
      :showHeader="false"
      style="width: 18rem; border-radius: 15px !important"
    >
      <div class="p-3">
        <div
          class="w-100 smart-text-align my-3 hover-pointer"
          @click="reportDialog"
        >
          {{ $t("report") }}
        </div>
        <div class="w-100 smart-text-align my-3 hover-pointer">
          {{ $t("share") }}
        </div>
      </div>
    </Dialog>

    <!-- header -->
    <!-- header  product -->
    <div
      class="d-flex justify-content-between align-items-center mt-2 pr-2 ltr"
      
    >
      <div @click="openProductDetails(productItem.productId)" class="p-2 hover-pointer">
        <i class="icon-font u000 text-dark"></i>
      </div>
      <span class="ml-auto mr-3">
        <span
          class="d-flex size-small smart-text-align justify-content-end text-sm"
          @click="
            $function.goTo(`/page/${productItem.pageDetails.sellerUsername}`)
          "
          >{{ productItem.pageDetails.sellerName }}</span
        >
        <span
          class="d-flex size-small smart-text-align justify-content-end text-sm"
          @click="
            $function.goTo(`/page/${productItem.pageDetails.sellerUsername}`)
          "
          >{{ productItem.pageDetails.sellerUsername }}</span
        >
      </span>
      <img
        v-lazy="productItem.pageDetails.sellerProfileImageUrl + '_sm.webp'"
        alt=""
        class="user-profile-image"
      />
    </div>
    <!--    slider     -->

    <!--slider post 2 -->

    <div class="reverse-smart-text-align">
      <ratio :ratio="'1/1'" class="mt-2">
          <productSlider :state="productItem" class="swiper" />
      </ratio>
    </div>
    <!-- icons -->
    <div class="d-flex justify-content-between mt-2 ltr">
      <!-- bookmark -->
      <i
        :class="
          productItem.isBookMark ? 'far fa-bookmark' : 'icon-font ubookmark '
        "
        class="size-medium mr-2"
        @click="bookmarkFunc(productItem.productId)"
      ></i>
      <!-- /bookmark -->
      <div class="d-flex">
        <i class="icon-font usend-45 mr-2 icon1 size-medium"></i>
        <router-link
          :to="`/page/productComment/${productItem.productId}/${productItem.workPageId}`"
          ><i class="icon-font ucomment mr-2 size-medium text-dark"></i
        ></router-link>

        <!--  like project :/   -->
        <i
          :id="productItem.productId"
          :class="productItem.isLike ? 'p-disabled uheart-fill' : 'uheart-line'"
          :style="productItem.isLike ? 'color:red' : ''"
          class="icon-font mr-2 size-medium ml-1 hover-pointer"
          @click="likeFunc(productItem.isLike)"
        ></i>

        <!--   /like    -->
      </div>
    </div>
    <div
      v-if="
        productItem.numberOfLikes != null && productItem.numberOfLikes !== 0
      "
      class="text-muted smart-text-align mt-1 text-sm"
    >
      {{ productItem.numberOfLikes }} {{ $t("like") }}
    </div>
    <div class="smart-text-align mt-3">
      <p
        v-if="productItem.caption != null && !clickedMore"
        class="long-caption caption"
      >
        {{ productItem.caption }}
      </p>
  <div class="smart-text-align mt-0 text-sm">{{ productItem.name }}</div>
    <div class="reverse-smart-text-align text-sm">
      <span v-if="!productItem.isOriginal" class="ufake"></span>
      <template v-else-if="productItem.currencyId !== null">
        <template v-if="productItem.offPercent > 0" >
          <div class="currency-box-controller">
            <div class="child">
              <Currency :currencyId="productItem.currencyId"></Currency>
              <span class="mx-1">{{$filters.currency(productItem.defaultPrice * (1 - productItem.offPercent / 100) , productItem.currencyId == 0)}}</span>
            </div>
            <div class="child">
              <span class="off-badge">{{ productItem.offPercent }}%</span>
              <span class="text-muted mx-1">{{ $filters.currency(productItem.defaultPrice , productItem.currencyId == 0) }}</span>
            </div>
          </div>
          <div class="d-flex">
          </div>
          <div class="d-flex mx-2">
          </div>
        </template>
        <template v-else >
          <Currency :currencyId="productItem.currencyId"></Currency>
          <div class="mx-1 green">{{ productItem.defaultPrice }}</div>
        </template>
      </template>
      <div v-else-if="productItem.productType != 14 &&
          productItem.productType != 5 && productItem.productType != 6 &&
          productItem.productType != 7 && productItem.productType != 8">
         <span class="utavafogi"></span>
      </div>
    </div>
    <div class="time-controller smart-text-align" v-if="productItem.productType != 14 ">
      <span>{{`${$filters.timeDifference(productItem.ladderedAt)} ${productItem.areaName}`}}</span>
    </div>
    <!-- ////////show comment -->
    <loading v-if="State.commentLoading" />
    <div
      v-for="item in productItem.commentList"
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
    :breakpoints="{
      '1000px': '90vw',
      '800px': '70vw',
      '600px': '90vw',
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
    <Report :postId="productId" @close="closeDialog"></Report>
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
    <!-- <bookmark :Id="productId"/> -->
    <bookmarkProduct :Id="productId" />
  </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import Currency from "@/app/public/shared/currency/Currency.vue";
import { HomeScreenProductSliderState } from "./HomeScreenProductSliderState.ts";
import productSlider from "./productSlider.vue";
import Report from "./ReportProblem.vue";
import ratio from "@/app/public/shared/ratio/ratio.vue";
import bookmark from "@/app/unit/pages/bookmark/bookmark.vue";

const displayProductDetailes = ref(false);
import bookmarkProduct from "@/app/unit/pages/bookmark/bookmarkProduct.vue";
import {
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";

export default {
  name: "homeProductsSlider",
  components: {
    Report,
    ratio,
    productSlider,
    Currency,
    bookmarkProduct,
    bookmark,
  },
  props: {
    productItem: {
      type: Object,
    },
  },
  setup(props) {
    const productId = ref(-1);
    const displayBookmark = ref(false);
    const displayPostDetailes = ref(false);
    const clickedMore = ref(false);
    const myUser = ref(getSelectedPageData());
    const State = ref(new HomeScreenProductSliderState());
    const reportVisible = ref(false);

    function openPostDetails(id) {
      productId.value = id;
      displayPostDetailes.value = !displayPostDetailes.value;
    }

    const bookmarkFunc = (id) => {
      displayBookmark.value = true;
      productId.value = id;
    };

    function openProductDetails(id) {
      productId.value = id;
      displayProductDetailes.value = !displayProductDetailes.value;
    }

    function createComment(posterId, productId) {
      if (props.productItem.newComment.length < 2) return;
      if (props.productItem.newComment.length > 1998) return;
      let model = {
        productId: productId,
        posterPageId: posterId,
        parentId: null,
        pageId: getSelectedPageId(),
        text: props.productItem.newComment,
      };
      State.value.postComment(model);
      props.productItem.commentList.push(props.productItem.newComment);
      props.productItem.newComment = "";
    }

    const likeFunc = (isLiked) => {
      let model = {
        myPageId: getSelectedPageId(),
        targetPageId: props.productItem.workPageId,
        productId: props.productItem.productId,
      };
      if (isLiked) {
        State.value.unlikePost(model, () => {
          props.productItem.isLike = false;
        });
      } else {
        State.value.likePost(model, () => {
          props.productItem.isLike = true;
        });
      }
    };
    const reportDialog = () => {
      reportVisible.value = !reportVisible.value;
    };
    const closeDialog = () => {
      reportVisible.value = false;
      displayProductDetailes.value = false;
    };

    return {
      State,
      productId,
      displayProductDetailes,
      openProductDetails,
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
    };
  },
};
</script>
<style lang="scss" scoped>
.caption {
  word-break: break-word;
  margin-top: -13px;
}

.long-caption {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
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

.off-badge {
  background-color: #e82828;
  color: white;
  height: 28px;
  padding-top: 3px;
  padding-inline: 10px;
  border-radius: 7px;
}

.green {
  color: #49b549;
}
.text-aria-div {
  border: 1px solid rgb(220, 220, 220);
  border-radius: 10px;
  margin-left: 10px;
  height: 63px;
  z-index: 10;
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

.currency-box-controller {
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  font-size: 14px;
  padding: 10px 10px 0;
  justify-content: flex-start;
  direction: ltr;
  .child {
    &:last-child {
      margin: 0 5px;
    }
  }
}
</style>
