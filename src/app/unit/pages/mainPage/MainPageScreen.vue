<template>
  <div class="w-100">
    <!--PageDetails-->
    <div class="d-flex align-items-center justify-content-between p-2">
      <!--ProfilePhoto-->
      <div class="col-3 text-right p-0">
        <div class="d-flex position-relative">
          <img
            v-lazy="userData.profileImageUrl + '_sm.webp'"
            alt=""
            class="rounded-circle img-fluid profile-size-checker"
          />
          <img
            v-if="userData.creditLevel === 1"
            alt=""
            class="position-absolute  crown-icon-profile"
            height="25"
            src="@/assets/img/ic_crown_golden.svg"
            width="25"
          />
          <img
            v-if="userData.creditLevel === 2"
            alt=""
            class="position-absolute crown-icon-profile"
            height="25"
            src="@/assets/img/ic_crown_grey.svg"
            width="25"
          />
        </div>
      </div>
      <!--Pages-->
      <div class="col-7 text-center">
        <div class="d-flex align-items-center justify-content-center">
          <div class="mr-2">
            <p class="my-0">
              <small class="span-column font-weight-bold">{{
                userData.name
              }}</small>
            </p>
            <p class="my-0">
              <small class="span-column">{{ userData.username }}</small>
            </p>
          </div>
        </div>
      </div>
      <!--Icon : more-->
      <div class="col-2 p-0">
        <div v-if="isMine && requestPage!==0" class="request-number"> {{requestPage}} <i class="fas fa-plus request-number-icon"></i></div>
        <Button
          class="p-button-rounded p-button-text p-button-secondary"
          icon="fas fa-ellipsis-v fa-lg"
          @click="showOptionModal = true"
        >
        </Button>
      </div>
    </div>
    <!--Bio-->
    <p class="px-2">{{ userData.bio }}</p>
    <!--PageCountDetails-->
    <div class="d-flex align-items-center justify-content-between">
      <div class="col-4 text-center">
        <p class="p-0 m-0">{{ userData.postCount }}</p>
        <p class="p-0 m-0">
          <small class="no-warp">{{ $t("posts") }}</small>
        </p>
      </div>
      <div class="col-4 text-center hover-pointer" @click="urlToFollow(1)">
        <p class="p-0 m-0">
          {{ userData.followerCount }}
        </p>
        <small class="no-warp">{{ $t("followers") }}</small>
      </div>
      <div class="col-4 text-center hover-pointer" @click="urlToFollow(2)">
        <p class="p-0 m-0">
          {{ userData.followingCount }}
        </p>
        <small class="no-warp">{{ $t("followings") }}</small>
      </div>
    </div>
    <!--buttons-->
    <div class="d-flex align-items-center justify-content-around mt-4 hover">
      <div v-if="mainPageState.isChangingFollowStatus" class="col-6">
        <loading />
      </div>
      <Button
        v-if="!mainPageState.isChangingFollowStatus"
        :class="mainPageState.followRequestLoading ? 'p-disabled' : ''"
        :label="followText()"
        class="page-action-button f-10 btn-label"
        @click="rightClickAction"
      />
      <Button
        :label="$t('chat')"
        class="page-action-button f-10 btn-label"
        @click="navigateToChat"
      />
    </div>
  </div>

  <!--  dialog of follow  -->
  <Dialog
    v-model:visible="displayFollowModal"
    :breakpoints="{
      '1000px': '52vw',
      '800px': '65vw',
      '600px': '91vw',
    }"
    :contentStyle="{ background: 'rgb(255, 255, 255)' }"
    :showHeader="false"
    :style="{}"
    dismissableMask
    header=""
    modal
  >
    <followDialog
      :userPageId="userData.mainPageId"
      @close="closeFollowDialogFunc"
    ></followDialog>
  </Dialog>

  <template v-if="!userData.isIFollowHim && !userData.isPublic && !isMine">
    <div class="text-private">
      <div class="icon-lock"><i class="fas fa-lock"></i></div>
      <div class="lock-text">
      <p class=" mt-5">
      {{ $t("privateAccount") }}
      </p>
      <p class="text-1">
      {{$t("privateMainAccountMessage")}}
      </p>
      </div>
    </div>
  </template>

  <template v-else>
    <MainPageStories :pageId="userData.mainPageId" :isWork="false" />
    <MainPagePosts :page-id="userData.mainPageId" :userData="userData" />
  </template>

  <!--option menu modal-->
  <Dialog
    v-model:visible="showOptionModal"
    :contentStyle="{ borderRadius: '7px' }"
    :dismissableMask="true"
    :header="false"
    :modal="true"
    :showHeader="false"
    style="width: 18rem; border-radius: 15px !important"
  >
    <div class="d-flex justify-content-center align-items-center text-right">
      <div class="col-12 w-100 h-100 px-0">
        <ul class="list-group m-0 p-0">
          <li
            v-for="(item,index) in options"
            :key="item.text"
            :class="mainPageState.blockLoading ? 'p-disabled' : ''"
            class="
              list-group-item
              border-0
              p-0
              hover-pointer hover-bg-primary
              user-select-none
            "
            @click="item.tap()"
          >
            <div class="d-flex align-items-center justify-content-start">
              <div
                class="d-flex align-items-center justify-content-center"
                style="height: 42px; width: 42px"
              >
                <i class="m-2 icon-font" :class="item.icon"></i>
              </div>
              <small>{{ $t(item.text) }}</small>
            </div>
            <div v-if="index===6 && isMine && requestPage"  class="request-number num-icon"> {{requestPage}} <i class="fas fa-plus request-number-icon"></i></div>
          </li>
        </ul>
      </div>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="displayQrCode"
    :contentStyle="{ background: 'rgb(255, 255, 255)' }"
    :showHeader="false"
    :style="{}"
    dismissableMask
    header=""
    modal
  >
    <QrCode />
    <p class="text-center">{{ getSelectedPageData().introduceCode }}</p>
  </Dialog>

  <Dialog
    v-model:visible="displayReportDialog"
    :contentStyle="{ borderRadius: '7px' }"
    :dismissableMask="true"
    :header="false"
    :modal="true"
    :showHeader="false"
    style="width: 18rem; border-radius: 15px !important"
  >
    <report
      :userData="userData"
      @closeReportModal="displayReportDialog = false"
      :itemId="userData.mainPageId"
      :itemType="reportTypeItem"
    />
  </Dialog>
  <Dialog
    v-model:visible="showMineOptionDialog"
    :contentStyle="{ borderRadius: '7px' }"
    :dismissableMask="true"
    :header="false"
    :modal="true"
    :showHeader="false"
    style="width: 18rem; border-radius: 15px !important"
  >
    <div class="d-flex justify-content-center align-items-center text-right">
      <div class="col-12 w-100 h-100 px-0">
        <ul class="list-group m-0 p-0">
          <li
            class="list-group-item border-0 p-0 hover-pointer hover-bg-primary"
            @click="routToCreatePost()"
          >
            <div class="d-flex align-items-center justify-content-start">
              <div
                class="d-flex align-items-center justify-content-center"
                style="height: 42px; width: 42px"
              >
                <span class="icon-font">f3</span>
              </div>
              <small>{{ $t("createPost") }}</small>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="createWorkPageAlert"
    :contentStyle="{
      background: 'rgb(255, 255, 255)',
      borderRadius: '4px',
    }"
    :showHeader="false"
    :style="{ padding: '0 !important', border: 'none', width: '350px' }"
    dismissableMask
    header=""
    modal
  >
    <p class="rtl text-right p-3 m-auto">{{ $t("addWorkPageMessage") }}</p>
  </Dialog>
</template>


<script lang="ts">
import { MainPageState } from "@/app/unit/pages/mainPage/MainPageState";
import { defineComponent, onMounted, ref } from "vue";
import MainPageStories from "@/app/unit/pages/story/storyScreen.vue";
import MainPagePosts from "./posts/MainPagePosts.vue";
import router from "@/core/router/router";
import {
  getMainPageId,
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";

import followDialog from "./followDialog/followDialog.vue";
import QrCode from "@/app/public/shared/QrCode/QrCode.vue";
import { i18n } from "@/main";
import { GetRecentStoryModel } from "@/data/city/mainpage/story.model";
import report from "@/app/public/shared/report/report.vue";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { EnumKeys } from "@/core/constant/constant";
import { reportType } from "@/core/enum/enums";
import { ToastService } from "@/core/service/toast.service";
export default defineComponent({
  name: "MainPageScreen",
  props: {
    userData: null,
  },
  components: {
    report,
    QrCode,
    followDialog,
    MainPageStories,
    MainPagePosts,
  },
  setup(props) {
    const displayQrCode = ref(false);
    const displayReportDialog = ref(false);
    const myPageId = ref(getSelectedPageData().id);
    const mainPageState = ref(new MainPageState());
    const reportTypeItem = ref(reportType.Page);
    const userData = ref(props.userData);
    const showOptionModal = ref(false);
    const user = ref(getSelectedPageData().username);
    const displayFollowModal = ref(false);
    const isMine = ref(myPageId.value === userData.value.mainPageId);
    const isChangingFollowStatus = ref(false);
    const creditLevel = props.userData.creditLevel;
    const showMineOptionDialog = ref(false);
    const createWorkPageAlert = ref(false);
    const requestPage = props.userData.followRequest;

    const data = {
      title: "uper Share",
      text: "Learn web development on MDN!",
      url: `http://web.upermall.ir/page/${userData.value.username}`,
    };
    const options = ref([
      {
        text: i18n.global.tc("addWorkPage"),
        check: () => isMine.value,
        icon: "uadd-page-work",
        tap: () => {
          haveWorkPage()
            ? (createWorkPageAlert.value = true)
            : router.push("/page/create-work-page");
        },
      },
      {
        text: "introduceCode",
        icon: "ucode-moaref",
        check: () => creditLevel < 3 && isMine.value,
        tap: () => (displayQrCode.value = true),
      },
      {
        text: "share",
        icon: "ushare",
        check: () => true,
        tap: () => {

          if (navigator.share) {
            navigator.share(data);
          } else alert(i18n.global.tc("your site must be have SSL permision"));
        },
      },
      {
        text: "bookmarks",
        icon: "umarked",
        check: () => isMine.value,
        tap: () => {
          router.push("/my-bookmarks");
        },
      },
      {
        text: "myAddresses",
        icon: "ushopping-address-list",
        check: () => isMine.value,
        tap: () =>
          router.push(`/page/address/${getSelectedPageData().username}`),
      },
      {
        text: "myArchives",
        icon: "uarchived",
        check: () => isMine.value,
        tap: () => router.push("/my-archives"),
      },
      {
        text: "myRequests",
        icon: " udocument",
        check: () => isMine.value && !userData.value.isPublic,
        tap: () =>
          router.push(`/page-request/${getSelectedPageData().username}`),
      },
      {
        text: "editProfile",
        icon: "uedit-user",
        check: () => isMine.value,
        tap: () => router.push(`/page/edit/${getSelectedPageData().username}`),
      },
      {
        text: "blockedUsers",
        icon: "ublocked-users",
        check: () => isMine.value,
        tap: () => router.push("/page/main-page-block-list"),
      },
      {
        text: "report",
        icon: "ureport-bugs",
        check: () => !isMine.value,
        tap: () => {
          displayReportDialog.value = true;
        },
      },
      {
        text: "block",
        icon: "ublocked-users",
        check: () => !isMine.value,
        tap: () => blockFunc(),
      },
    ]);

    const haveWorkPage = () => {
      let values = false;
      JSON.parse(
        String(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
      ).forEach((element) => {
        if (element.managerId == getMainPageId() || (element.pageId == getMainPageId()&& element.managerId != null)) values = true;
      });



      return values;
    };

    const closeFollowDialogFunc = () => {
      displayFollowModal.value = false;
    };

    const navigateToChat = () => {
      ToastService.getInstance().info(
        "توی ورژن آینده میتونی چت کنی الان داریم روش کار میکنیم :)"
      );
    };

    const blockFunc = () => {
      userData.value.isIBlockHim = true;
      options.value.splice(
        options.value.findIndex((e) => e.text === "block"),
        1
      );

      let model = {
        sourcePageId: myPageId.value,
        targetPageId: userData.value.mainPageId,
      };
      mainPageState.value.block(userData.value);
    };

    const requestPrivateAccFollowFunc = () => {
      userData.value.isRequested = true;
      let model = {
        sourcePageId: myPageId.value,
        targetPageId: userData.value.mainPageId,
      };
      mainPageState.value.followRequest(model);
    };

    const urlToFollow = (num) => {
      if (myPageId.value === userData.value.mainPageId && num === 1)
        router.push(
          `/myFollow/${user.value}/${num}/${userData.value.mainPageId}`
        );
      if (myPageId.value === userData.value.mainPageId && num === 2)
        router.push(
          `/myFollow/${user.value}/${num}/${userData.value.mainPageId}`
        );
      if (myPageId.value !== userData.value.mainPageId && num === 1)
        router.push(
          `/otherFollow/${user.value}/${num}/${userData.value.mainPageId}`
        );
      if (myPageId.value !== userData.value.mainPageId && num === 2)
        router.push(
          `/otherFollow/${user.value}/${num}/${userData.value.mainPageId}`
        );
    };

    const routToCreatePost = () => {
      router.push("/createNewPost");
    };

    onMounted(() => {
      options.value = options.value.filter((m) => m.check() === true);
    });

    function followText() {
      if (isMine.value) {
        return i18n.global.tc("new");
      }
      if (userData.value.isIBlockHim) {
        return i18n.global.tc("unBlock");
      }
      if (userData.value.isPublic) {
        if (userData.value.isIFollowHim) {
          return i18n.global.tc("unFollow");
        } else {
          return i18n.global.tc("follow");
        }
      } else {
        if (userData.value.isIFollowHim) {
          return i18n.global.tc("unFollow");
        } else if (userData.value.isRequested) {
          return i18n.global.tc("requested");
        } else {
          return i18n.global.tc("followRequest");
        }
      }
    }

    function rightClickAction() {
      if (isMine.value) {
        showMineOptionDialog.value = true;
      } else {
        if (userData.value.isIBlockHim) {
          mainPageState.value.unblock(userData.value);
        } else if (userData.value.isPublic) {
          if (userData.value.isIFollowHim) {
            mainPageState.value.unFollow(userData.value);
          } else {
            mainPageState.value.newFollow(userData.value);
          }
        } else {
          if (userData.value.isIFollowHim) {
            mainPageState.value.unFollow(userData.value);
          } else if (userData.value.isRequested) {
            mainPageState.value.cancelRequest(userData.value);
          } else {
            mainPageState.value.followRequest(userData.value);
          }
        }
      }
    }

    return {
      requestPrivateAccFollowFunc,
      isChangingFollowStatus,
      closeFollowDialogFunc,
      showMineOptionDialog,
      createWorkPageAlert,
      displayReportDialog,
      getSelectedPageData,
      displayFollowModal,
      rightClickAction,
      routToCreatePost,
      showOptionModal,
      reportTypeItem,
      navigateToChat,
      mainPageState,
      displayQrCode,
      haveWorkPage,
      urlToFollow,
      requestPage,
      followText,
      myPageId,
      userData,
      options,
      isMine,
      user,
    };
  },
});
</script>

<style lang="scss" scoped>
.black {
  color: black;
}


.profile-size-checker {
  max-width: 86px;
  min-width: 72px;
  max-height: 86px;
  min-height: 72px;
}


@media (max-width: 440px) {
.btn-label{
  font-size: 12px;
}
}
@media (min-width:900px) {
  .crown-icon-profile {
    bottom: -4px !important;
    width: 40px;
    height: 40px;
    right: 53px;
  }
}

.crown-icon-profile {
  bottom: -4px !important;
  width: 40px;
  height: 40px;
}

body[dir="rtl"] .crown-icon-profile {
  left: -4px !important;
}

body[dir="ltr"] .crown-icon-profile {
  right: -4px !important;
}

@media (max-width: 700px) {
  .f-13 {
    font-size: 13px;
  }
}
.text-private{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.icon-lock{
  font-size:80px;
  padding: 18px 9px 0px 0px;
}

@media (max-width: 440px) {
  .icon-lock{
    font-size: 40px;
  }
  .lock-text{
    font-size: 12px;
  }
  .text-1{
    margin-top: 15px;
  }
}
.text-1{
  margin-top: 25px;
}
.request-number{
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 23px;
  text-align: center;
  font-size: 12px;
  padding: 2px;
  position: absolute;
  right: -9px;
  bottom: 23px;
  &-icon{
   font-size: 8px;
    }
  }
.posation-dialog{
           position: relative;
           bottom: 115px;
           right: 248px;
}

.num-icon{
  position: absolute;
  right: 200px;
  bottom: 10px;
}
</style>
