<template>
  <loading v-if="state.foldersLoading" />
  <div v-else>
    <div
      v-for="item in state.followings"
      :key="item"
      class="card d-flex mt-2 hover-pointer"
      @click="$function.goTo(`/page/${item.username}`)"
    >
      <div class="d-flex justify-content-between align-items-center rtl p-2">
        <i
          v-if="ellipsisClicked && item.select"
          class="far fa-check-square icon-size"
          @click="selectFunc(item)"
        ></i>
        <i
          v-if="ellipsisClicked && !item.select"
          class="far fa-square icon-size"
          @click="selectFunc(item)"
        ></i>
        <img
          v-lazy="item.profileImageUrl + '_sm.webp'"
          alt=""
          class="profileImg m-2 my-auto"
        />
        <span class="ml-auto my-auto headOfComment">
          <p class="my-auto d-flex mt-2 text-sm">{{ item.name }}</p>
          <p class="my-auto username d-flex text-sm">{{ item.username }}</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { followingState } from "./followingState";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getSelectedPageId } from "@/core/service/utils.service";
import Loading from "@/app/public/shared/loading/Loading.vue";

export default {
  name: "follower",
  setup() {
    const state = ref(new followingState());
    const route = useRoute();
    const pageId = route.params.pageId;
    let model = {
      myPageId: getSelectedPageId(),
      pageId: pageId,
      skip: 0,
      take: 1000,
    };
    state.value.getFollowing(model);

    return {
      state,
    };
  },
};
</script>
<style scoped>
.profileImg {
  width: 55px;
  border-radius: 55px;
  border: 2px solid #707070;
}

.icon-size {
  font-size: 30px;
}
</style>
