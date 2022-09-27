
<template>
  <div class="d-flex justify-content-center align-items-center">
    <p class="position-absolute mt-2">{{ $t("myRequests") }}</p>
    <img alt="" class="appbar" src="../../../../../assets/img/svg/appbarShape.svg">
  </div>
  <br>
  <loading v-if="state.foldersLoading"/>
  <div v-else>
    <p v-if="!state.requests" class="text-center">{{ $t('emptyList') }}</p>
    <div
        v-for="(req, index) in state.requests"
        v-else
        :key="index"
        class="d-flex m-2 p-2 uper-card-1 "
    >
      <img v-lazy="req.profileImageUrl + '_sm.webp'" alt="" class="imgstyle"/>
      <div class="d-flex flex-column mr-2">
        <span> {{ req.name }} </span>
        <span>{{ req.username }}</span>
      </div>
      <div class="btn-sm btn-group w-50 mr-auto border-radius-10px">
        <button
            class="mx-2 py-0 px-2 btn btn-primary btn-sm rounded"
            type="button"
            @click="acceptRequest(req.pageId)"
        >
          {{ $t("accept") }}
        </button>
        <button
            class="mx-2 py-0 px-2 btn btn-danger btn-sm rounded"
            type="button"
            @click="RejectRequest(req.pageId)"
        >
          {{ $t("reject") }}
        </button>
      </div>
    </div>
  </div>
  <div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {getSelectedPageId, windowScrolledToBottom,} from "@/core/service/utils.service";
import {defineComponent, onMounted, ref} from "vue";
import {followingState} from "./PageRequestState";
import {BASE_TAKE} from "@/core/constant/constant";

export default defineComponent({
  name: "PageRequestScreen",

  setup() {
    const state = ref(new followingState());
    let requests = ref([]);
    let pages = ref([]);
    console.log(state,'ss')

    onMounted(() => {
      GetRequests();
      windowScrolledToBottom(() => {
        GetRequests();
      });
    });

    function acceptRequest(targetPageId) {
      state.value.acceptRequest({
        sourcePageId: getSelectedPageId(),
        targetPageId: targetPageId,
      });
    }

    function RejectRequest(targetPageId) {
      state.value.RejectRequest({
        sourcePageId: getSelectedPageId(),
        targetPageId: targetPageId,
      });
    }

    function GetRequests() {
      state.value.GetRequests({
        requestTime: new Date(),
        pageId: getSelectedPageId(),
        take: BASE_TAKE
      });
    }

    return {
      requests,
      pages,
      state,
      RejectRequest,
      acceptRequest,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-bar {
  -webkit-border-bottom-right-radius: 15px;
  -webkit-border-bottom-left-radius: 15px;
  -moz-border-radius-bottomright: 15px;
  -moz-border-radius-bottomleft: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  -webkit-box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.5);
}

.btn-style {
  border-radius: 20px;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 14px;
  padding-bottom: 14px;
  border: none;
  box-shadow: 0 0 10px #bcb5b9;
}

.btn-style-r {
  border-radius: 20px;
  padding-right: 37px;
  padding-left: 33px;
  padding-top: 14px;
  padding-bottom: 14px;
  border: none;
  box-shadow: 0 0 10px #bcb5b9;
}

.imgstyle {
  height: 54px;
  width: 53px;
  border-radius: 49px;
}

.appbar {
  width: 250px;
  margin-top: -4px;
}
</style>
