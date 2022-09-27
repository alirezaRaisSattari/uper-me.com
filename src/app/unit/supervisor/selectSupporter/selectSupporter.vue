<template>
  <div class="d-flex justify-content-center align-items-center">
    <h6 class="header-title m-0 shape-text">{{ $t("members") }}</h6>
    <img
        alt=""
        class="header-shape-page"
        src="@/assets/img/svg/appbarShape.svg"
    />
  </div>
  <div
      v-for="supporter in state.supporters"
      :key="supporter"
      class="uper-card-1 my-3 p-2 py-0"
  >
    <router-link
        :to="`/supervisor/${supporter.pageId}/0`"
        class="text-decoration-none text-dark d-flex w-75"
    >
      <div class="d-flex justify-content-center">
        <img
            v-lazy="supporter.profileImageUrl + '_sm.webp'"
            class="image-style rounded-circle border"
        />

        <div class="px-2 h-100 my-auto pt-1 text-right">
          <span class="media-controller mt-1">{{ supporter.name }}</span>
          <br/>
          <span class="media-controller my-auto">{{ supporter.username }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {selectSupporterState} from "./selectSupporterState";

export default {
  setup() {
    const state = ref(new selectSupporterState());
    onMounted(() => {
      state.value.getSupporterInfo();
    });
    return {
      state,
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

.select-box {
  height: 48px;
  border-radius: 58px;
  outline: none !important;
}

select {
  border: 2px solid #c2c2c2 !important;
}

.image-icon {
  position: absolute;
  right: 22%;
  top: 23%;
  font-size: 54px;
  color: #fff;
  /* z-index: 99; */
}

.image-style {
  width: 55px;
  height: 55px;
}

.img-style {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  z-index: 8;
}
</style>
