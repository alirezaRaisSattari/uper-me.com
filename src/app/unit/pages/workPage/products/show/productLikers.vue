<template>
  <h5 class="header-title mt-3">{{ $t("mainAccountType") }}</h5>
  <div class="d-flex justify-content-center">
    <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
  </div>
  <div class="p-3">
    <loading v-if="State.loadingLikers"></loading>
    <div v-if="State.isNull" class="mt-5">
      <div class="d-flex justify-content-center mt-5">
        <i class="fas fa-box-open fa-6x mt-5"></i>
      </div>
      <p class="text-center mt-5">{{ $t("emptyFolderList") }}</p>
    </div>
    <div
        v-for="(user, index) in State.allLikers"
        :key="index"
        class="d-flex uper-card-1 my-2 bg-light"
    >
      <router-link
          :to="'/page/' + user.username"
          class="text-decoration-none text-dark d-flex p-2 w-75"
      >
        <div class="d-flex">
          <img
              v-lazy="user.profileImageUrl + '_sm.webp'"
              class="image-style rounded-circle border"
          />

          <div class="px-2 h-100 py-auto text-right">
            <span>{{ user.username }}</span>
            <br/>
            <span>{{ user.name }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {GetLikers} from "./productLikers";
import {ref, onMounted} from "vue";
import {BASE_TAKE} from "@/core/constant/constant";
import {useRoute} from "vue-router";
import {windowScrolledToBottom} from "@/core/service/utils.service";

export default {
  setup() {
    const route = useRoute();
    const State = ref(new GetLikers());
    const workPageId = ref(route.params.workPageId);
    const productId = ref(route.params.productId);

    function getLikers() {
      let model = {
        skip: 0,
        take: BASE_TAKE,
        workPageId: parseInt(workPageId.value),
        productId: parseInt(productId.value),
        requestTime: new Date(),
      };
      State.value.getLikers(model);
    }

    onMounted(() => {
      getLikers();
      windowScrolledToBottom(() => {
        getLikers();
      });
    });
    return {State};
  },
};
</script>

<style scoped>
.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}

.image-style {
  width: 55px;
  height: 55px;
}
</style>
