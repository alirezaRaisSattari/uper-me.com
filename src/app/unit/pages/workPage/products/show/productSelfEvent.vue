<template>
  <div
    class="d-flex justify-content-center align-items-center position-relative"
  >
    <img
      alt="path-frame"
      class="text-center path-frame"
      src="@/assets/img/svg/PathFrame.svg"
    />
    <div
      class="
        d-flex
        justify-content-between
        align-items-center
        position-absolute
        w-75
        px-3
      "
    >
      <div class="text-center" @click="data['likeCallBack']" v-if="isLogin">
        <i
          v-if="!productInfo.like"
          :class="state.likeLoading ? 'p-disabled' : ''"
          class="far fa-heart mr-2 size-medium ml-1 hover-pointer like-product"
          @click="likeFunc"
        ></i>

        <i
          v-else
          :class="state.likeLoading ? 'p-disabled' : ''"
          class=" fas fa-heart  mr-2 size-medium ml-1 text-danger likeup  hover-pointer like-product"
          @click="likeFunc"
        ></i>
        <p class="txt-small" >
          {{ productInfo.numberOfLikes }} {{ $t("like") }}
        </p>
      </div>
      <div class="text-center" @click="data['seenCallBack']">
        <i :class="'text-white'" class="fas fa-eye"></i>
        <p class="txt-small">{{ data["seenCount"] }} {{ $t("view") }}</p>
      </div>
      <div class="text-center" @click="data['commentCallBack']">
        <ratingStar
          :rate="data['ratingValue']"
          style="cursor: pointer !important"
        />
        <p class="txt-small">
          {{ $t("view") }}
          {{ data["commentCount"] ? data["commentCount"] : $t("without") }}
          {{ $t("comment") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ratingStar from "@/app/public/shared/ratinstar/ratingStars.vue";
import { ProductState } from "./state";
import {
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";
import {AuthStore} from "@/core/store/auth.store";

export default {
  components: {
    ratingStar,
  },
  props: {
    pageId: Number,
    productId: Number,
    likeCount: Number,
    commentCount: Number,
    seenCount: Number,
    ratingValue: Number,
    likeCallBack: Function,
    seenCallBack: Function,
    commentCallBack: Function,
    liked: Boolean,
  },
  setup(props) {
    const likeCounter = ref(0);
    const isLikeBeforeMount = ref(false);
    const state = ref(new ProductState());
    const productInfo = ref({
      like: props.liked,
      isLiked: false,
      numberOfLikes: props.likeCount,
    });
    const isLogin = ref(AuthStore().isLoggedIn);
    const data = ref({
      likeCount: props.likeCount,
      seenCount: props.seenCount,
      commentCount: props.commentCount,
      ratingValue: props.ratingValue,
      likeCallBack: props.likeCallBack,
      seenCallBack: props.seenCallBack,
      commentCallBack: props.commentCallBack,
    });

    const likeFunc = () => {
      if (likeCounter.value === 0)
        productInfo.value.isLiked = productInfo.value.like;

      if (productInfo.value.like && likeCounter.value === 0)
        isLikeBeforeMount.value = true;

      let model = {
        myPageId: getSelectedPageId(),
        targetPageId: props.pageId,
        productId: props.productId,
      };

      if (isLikeBeforeMount.value) {
        if (likeCounter.value % 2 === 0) {
          productInfo.value.numberOfLikes--;
          state.value.unLike(model);
        }
        if (likeCounter.value % 2 === 1) {
          productInfo.value.numberOfLikes++;
          state.value.like(model);
        }
      }

      if (!isLikeBeforeMount.value) {
        if (likeCounter.value % 2 === 0) {
          productInfo.value.numberOfLikes++;
          state.value.like(model);
        }
        if (likeCounter.value % 2 === 1) {
          state.value.unLike(model);
          productInfo.value.numberOfLikes--;
        }
      }

      likeCounter.value++;

      productInfo.value.like = !productInfo.value.like;
    };

    return {
      productInfo,
      state,
      data,
      likeFunc,
      isLogin
    };
  },
};
</script>
<style lang="scss" scoped>
.uheart-line:before {
  content: '\e8f8';
  font-size: 14px!important;
}
.product-image-profile {
  width: 48px;
  height: 48px;
  border: 2px solid #707070;
}

p {
  padding: 0;
  margin: 0;
}

i {
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

@media screen and (max-width: 400px) {
  i {
    font-size: 10px;
  }
  .txt-small {
    font-size: 6px;
  }
  .like-product{
    font-size: 10px;
  }
}
.uheart-line:before { color: red !important; } /* '' */
@media screen and (max-width: 360px) {
  i {
    font-size: 9px;
  }
  .txt-small {
    font-size: 6px;
  }
}

.path-frame {
  width: 90%;
  margin-top: calc(-0.5%);
}

.txt-small {
  font-size: 10px;
}
.likeup{
  font-size: 17px !important;
}
</style>
