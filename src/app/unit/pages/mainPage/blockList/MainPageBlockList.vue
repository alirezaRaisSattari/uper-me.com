<template>
  <div class="container p-0">
    <div id="blocklist" class="mx-auto p-1">
      <div class="d-flex align-items-center justify-content-center">
        <span class="position-absolute">{{ $t('blockedUsers') }}</span>
        <img alt="" class="appbar" src="../../../../../assets/img/appbarShape.svg">
      </div>
      <div>
        <loading v-if="mainPageBlockListState.loading"></loading>
      </div>
      <div class="text-center mt-5">
        <span
            v-if="
            mainPageBlockListState.users.length === 0 &&
            mainPageBlockListState.loading === false
          "
        >
        {{$t('No blocked user')}}
        </span>
      </div>
      <div
          v-for="(user, index) in mainPageBlockListState.users"
          id="contain"
          :key="user.pageId"
          class="m-2 d-flex align-items-center"
      >
        <div class="d-flex justify-content-center">
          <img
              id="profailImag"
              v-lazy="user.profileImageUrl + '_sm.webp'"
              alt="profile"
              class="rounded-circle my-1"
          />
        </div>
        <div class="col">
          <div class="row">
            <div class="col-12 d-flex justify-content-start">
              <span id="username">{{ user.name }}</span>
            </div>
            <div class="col-12 d-flex justify-content-start">
              <span>{{ user.username }}</span>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end p-2">
          <loading
              v-if="
              mainPageBlockListState.loadinUnBlock &&
              mainPageBlockListState.selectedPageId === user.pageId
            "
          ></loading>
          <Button
              v-if="
              !(
                mainPageBlockListState.loadinUnBlock &&
                mainPageBlockListState.selectedPageId === user.pageId
              )
            "
              id="block-btn"
              class="p-button-rounded p-button-secondary"
              @click="unBlockUser(index, user.pageId)"
          >
            {{ $t('unBlock') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import Button from "primevue/button";
import {MainPageBlockListState} from "./MainPageBlockListState";
import {getSelectedPageData} from "@/core/service/utils.service";

export default {
  name: "blockUser",
  components: {
    Button,
  },
  setup() {
    const sorcePage = ref({});
    const mainPageBlockListState = ref(new MainPageBlockListState());

    onMounted(() => {
      sorcePage.value = getSelectedPageData();
      mainPageBlockListState.value.getBlockList();
    });

    function unBlockUser(index, pageId) {
      mainPageBlockListState.loadinUnBlock = true;
      var check = confirm(
          "آیا حذف این مخاطب از لیست مسدود شدگان را تایید می کنید؟"
      );
      if (check === 1) {
        mainPageBlockListState.value.unblockUser(index, pageId);
      }
    }

    return {
      sorcePage,
      unBlockUser,
      mainPageBlockListState,
    };
  },
};
</script>

<style scoped>
#profailImag {
  width: 50px;
  height: 50px;
}

#block-btn {
  border: 2px solid #ececec;
  background-color: #ffff;
  color: #050505 !important;
  font-size: 12px;
}

#blocklist {
  padding: 3px;
}

#contain {
  border: 1px solid #9b9b97;
  border-radius: 1em;
  padding-right: 10px;
}

#username {
  font-weight: 700;
}

.appbar {
  width: 250px;
  margin-top: -4px;
}
</style>



