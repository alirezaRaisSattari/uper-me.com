<template>
  <div class="animate__animated animate__fadeIn rtl">
    <loading v-if="state.loading"/>
    <div v-else-if="state.posts.length == 0" class="text-center mt-4">
      {{ $t("noItem") }}
    </div>
    <div
        v-for="post in state.posts"
        v-else
        :key="post"
        class="uper-card-1 rtl p-2"
    >
      <div class="d-flex align-content-center">
        <img v-lazy="post.coverImageUrl" alt="" class="rtl cover-img"/>
        <div>
          <p class="text-right p-2 pt-3">{{ post.caption }}</p>
          <div class="d-flex mt-2">
            <img
                v-lazy="`${post.profileImageUrl}_sm`"
                alt=""
                class="profile-img rounded-pill"
            />
            <div class="rtl mr-2">
              <p class="text-right">{{ post.name }}</p>
              <p class="text-right">{{ post.username }}</p>
              <div class="d-flex">{{ post.createDate }} {{ post.time }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- {{ post }} -->
      <div class="w-100 d-flex justify-content-between my-2 mt-4">
        <span>{{ $t("usefulPhotoCaptions") }}</span>
        <ratingStar :rate="post.score1" style="cursor: pointer !important"/>
      </div>
      <div class="w-100 d-flex justify-content-between my-2">
        <span>{{ $t("patient") }}</span>
        <ratingStar :rate="post.score2" style="cursor: pointer !important"/>
      </div>
      <div class="w-100 d-flex justify-content-between my-2">
        <span>{{ $t("contributeToContentProduction") }}</span>
        <ratingStar :rate="post.score3" style="cursor: pointer !important"/>
      </div>
      <div class="w-100 d-flex justify-content-between my-2">
        <span>{{ $t("punctuality") }}</span>
        <ratingStar :rate="post.score4" style="cursor: pointer !important"/>
      </div>
      <div class="w-100 d-flex justify-content-between my-2">
        <span>{{ $t("description") }}</span>
        <ratingStar :rate="post.score5" style="cursor: pointer !important"/>
      </div>
      <div class="w-100 d-flex justify-content-between my-2">
        <span>{{ $t("feedback") }}</span>
        <ratingStar :rate="post.score6" style="cursor: pointer !important"/>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "@vue/reactivity";
import {productState} from "./productState";
import {onBeforeUnmount, onMounted} from "@vue/runtime-core";
import {useRoute} from "vue-router";
import {ScrollController} from "@/core/service/scroll.service";
import ratingStar from "@/app/public/shared/ratinstar/ratingStars.vue";

export default {
  components: {ratingStar},
  setup() {
    const state = ref(new productState());
    const route = useRoute();
    state.value.supporterPageId = route.params.supporterId;

    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      state.value.getPosts();
    }

    onMounted(() => {
      state.value.getPosts();
      scrollCtrl.startListen();
    });
    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });
    return {
      state,
    };
  },
};
</script>

<style>
.cover-img {
  width: 139px;
  height: 139px;
}

.profile-img {
  width: 60px;
  height: 60px;
}
</style>
