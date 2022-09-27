<template>
  <div>
    <Dialog
      v-model:visible="newItemsDialog"
      :breakpoints="{
        '1000px': '52vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{ background: '#ffffff', borderRadius: '12px' }"
      :showHeader="false"
      :style="{}"
      dismissableMask
      header=""
      modal
    >
      <div class="w-100 p-3">
        <router-link
          class="text-decoration-none text-dark"
          to="/new-create-product"
        >
          <div class="w-100 text-right my-2 hover-pointer">
            {{ $t("createProduct") }}
          </div>
        </router-link>
        <router-link class="text-decoration-none text-dark" to="/createNewPost">
          <div class="w-100 text-right my-2 hover-pointer">
            {{ $t("createPost") }}
          </div>
        </router-link>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="displayBasic"
      :contentStyle="{ borderRadius: '7px' }"
      :header="false"
      :showHeader="false"
      class="edit-discount-dialog"
      dismissableMask
      modal
      style="width: 18rem; border-radius: 15px !important;  "
    >
      <template #header></template>
      <div class="d-flex flex-column" >
        <div v-for="(i,index) in itemList" :key="i">
          <router-link :to="i.rout" class="text-decoration-none text-dark">
            <div class="d-flex py-2 hover-pointer hover-bg" @click="i.function">
              <i :class="i.class" class="mt-1 mx-4 fa-lg"></i>
              <p class="my-1 font-weight-100">
                <small>{{ i.title }}</small>
              </p>
<!--              <div v-if=" i.title === $t('myRequests') && isMine && requestPage!==0 " class="request-number num-icon"> {{requestPage}} <i class="fas fa-plus request-number-icon"></i></div>-->
            </div>
          </router-link>
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="displayEdit"
      :style="{ width: '30vw' }"
      class="edit-discount-dialog"
      dismissableMask
      modal
      style="width: 510px; height: auto"
    >
      <div class="d-flex flex-column">
        <div v-for="i in editList" :key="i">
          <router-link :to="i.route" class="text-decoration-none text-dark">
            <div class="d-flex py-1" @click="i.function">
              <i :class="i.class" class="mt-1 mx-2"></i>
              <p>{{ i.title }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </Dialog>

    <div class="position-relative">
      <div class="workPage-navbar">
        <div class="d-flex align-items-center h-100">
          <Button
            class="p-button-rounded p-button-secondary p-button-text mx-1"
            icon="icon-font ucomment"
          />
          <div class="col text-center">
            <div class="d-flex align-items-center justify-content-center" >

              <div class="mr-2">
                <p class="my-1 workPage-name">
                  <small class="span-column">{{
                    userDataModel.username
                  }}</small>
                </p>
                <p class="my-1 workPage-name">
                  <small class="span-column">{{ userDataModel.name }}</small>
                </p>
              </div>
              <i class="icon-font uarrows-down" >
              </i>

            </div>
          </div>
          <Button
            class="p-button-rounded p-button-secondary p-button-text mx-1"
            icon="fas fa-ellipsis-v"
            @click="openOption"
          />
          <div v-if="isMine && requestPage!==0" class="request-number plus-icon"> {{requestPage}} <i class="fas fa-plus request-number-icon"></i></div>
        </div>
      </div>
      <swiper
        :slides-per-view="1"
        :space-between="0"
        class="h-100 w-100 swiper-dir"
        style="background-color: #ffffff"
        @slideChange="onSwiper"
      >
        <swiper-slide
          v-if="
            userDataModel.images == null || userDataModel.images.length === 0
          "
          class="m-0 p-0"
        >
          <img
            :alt="$t('workPageImage')"
            class="w-100 slider-image"
            src="@/assets/img/svg/empty_images.svg"
          />
        </swiper-slide>
        <swiper-slide
          v-for="item in userDataModel.images"
          :key="item.id"
          @click="openMultiImageVeiwer"
        >
          <img
            :alt="$t('workPageImage')"
            v-lazy="item.imageUrl"
            class="w-100 slider-image"
          />
        </swiper-slide>
        <div v-if="userDataModel.images.length > 1" class="paganation-swiper">
          <div
            v-for="(i,_index) in userDataModel.images"
            :key="_index"
            class="pagination-dot"
            :class="{
              'active-pagination-dot': _index === activeSwiperIndex,
            }"
          ></div>
        </div>
      </swiper>
    </div>
    <div class="d-flex justify-content-between position-relative pt-2">
      <div class="col text-center px-1">
        <div
          class="position-relative workPage-image-parent"
          @click="
            userDataModel.movieUrl != null
              ? (displayPageMovie = !displayPageMovie)
              : () => {}
          "
        >
          <img
            :class="userDataModel.movieUrl != null ? 'show-video-border' : ''"
            v-lazy="userDataModel.profileImageUrl + '_sm.webp'"
            alt=""
            class="workPage-image"
          />
          <img
            v-if="userDataModel.creditLevel === 1"
            class="position-absolute workPage-crown-icon"
            height="25"
            src="@/assets/img/ic_crown_golden.svg"
            width="25"
          />
          <img
            v-if="userDataModel.creditLevel === 2"
            class="position-absolute workPage-crown-icon"
            height="25"
            src="@/assets/img/ic_crown_grey.svg"
            width="25"
          />
        </div>
      </div>
      <div
        class="col text-center px-1"
        style="cursor: pointer !important"
        @click="openWorkPageComment"
      >
        <div
          v-if="userDataModel.scoreItems != null"
          class="d-flex justify-content-center"
        >
          <i class="fa fa-star text-warning"></i>
          {{ userDataModel.scoreItems.average }}
        </div>
        <p v-else class="p-0 m-0 text-sm">
          {{ $t("emptyList") }}
        </p>
        <small class="small-text">{{ $t("scoreAndComments") }}</small>
      </div>
      <router-link
        :to="
          isMine
            ? `/myFollow/${user}/${2}/${myPageId}`
            : `/otherFollow/${user}/${2}/${myPageId}`
        "
        class="text-decoration-none"
      >
        <div class="col text-center px-1">
          <div class="d-flex justify-content-center text-dark">
            {{ userDataModel.followingCount }}
          </div>
          <small class="small-text text-dark">{{ $t("followings") }}</small>
        </div>
      </router-link>
      <div class="col text-center px-1">
        <router-link
          class="text-decoration-none text-dark"
          :to= goToDetail()
        >
          <div class="d-flex justify-content-center my-1">
            <i class="far fa-address-card fa-lg"></i>
          </div>
          <small class="small-text">{{ $t("detailsAndAddress") }}</small>
        </router-link>
      </div>
    </div>
    <p class="bio mx-2 text-sm">
      {{ userDataModel.bio }}
    </p>
    <!--buttons-->
    <div class="d-flex align-items-center justify-content-around mt-4 hover">
      <div v-if="workPageState.isChangingFollowStatus" class="col-6">
        <loading />
      </div>
      <Button
        v-if="!workPageState.isChangingFollowStatus"
        :label="rightButtonText()"
        class="page-action-button"
        @click="onRightClick()"
      />
      <Button
        v-if="!userDataModel.isIBlockHim"
        :label="setSecondButtonText()"
        class="page-action-button"
        @click="onSecondButtonClick"
      />
    </div>

    <WorkPageStories :pageId="-userDataModel.id" :isWork="true" />

    <div class="workpage-nav my-2 user-select-none">
      <div
        :class="activeTabIsPost === false ? 'nav-item-active' : ''"
        class="workpage-nav-item hover-pointer"
        @click="activeTabIsPost = false"
      >
        <small class="user-select-none">{{ $t("products") }}</small>
      </div>
      <div
        :class="activeTabIsPost === true ? 'nav-item-active' : ''"
        class="workpage-nav-item hover-pointer"
        @click="activeTabIsPost = true"
      >
        <small class="user-select-none">{{ $t("posts") }}</small>
      </div>
      <div
        v-if="userDataModel.pageType === 2"
        class="workpage-nav-item hover-pointer"
        @click="goTo(`/hyper/${userDataModel.id}`)"
      >
        <small class="user-select-none">{{ $t("hyper") }}</small>
      </div>
    </div>

    <template v-if="!userData.isIFollowHim && !userData.isPublic && !isMine">
      <p class="text-center mt-5">
        {{ $t("privateAccount") }}
      </p>
    </template>
    <template v-else>
      <keep-alive>
        <WorkPagePosts
          v-if="activeTabIsPost === true"
          :page-id="userDataModel.id"
          :userData="userDataModel"
        />
      </keep-alive>

      <keep-alive>
        <WorkPageProducts
          v-if="activeTabIsPost === false"
          :page-id="userDataModel.id"
        />
      </keep-alive>
    </template>
    <Dialog
      v-model:visible="rightButtonDialog"
      :contentStyle="{ borderRadius: '7px' }"
      :header="false"
      :showHeader="false"
      class="edit-discount-dialog"
      dismissableMask
      modal
      style="width: 18rem; border-radius: 15px !important"
    >
      <div class="d-flex flex-column">
        <router-link
          :to="
            userDataModel.pageType === 3 ? '/createConsult' : '/createProduct'
          "
          class="text-decoration-none text-dark"
        >
          <div class="d-flex py-2 hover-pointer hover-bg">
            <i class="mt-1 mx-4 fa-lg"></i>
            <p class="my-1 font-weight-100">
              <small>{{
                  $t(
                      userDataModel.pageType === 3
                          ? "createConsultProduct"
                          : "createProduct"
                  )
                }}</small>
            </p>
          </div>
        </router-link>
        <router-link class="text-decoration-none text-dark" to="/createNewPost">
          <div class="d-flex py-2 hover-pointer hover-bg">
            <i class="mt-1 mx-4 fa-lg"></i>
            <p class="my-1 font-weight-100">
              <small>{{ $t("createPost") }}</small>
            </p>
          </div>
        </router-link>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="displayPageMovie"
      :breakpoints="{
        '2800px': '65vw',
        '1280px': '65vw',
        '1000px': '65vw',
        '800px': '65vw',
        '600px': '91vw',
      }"
      :contentStyle="{
        background: '#ffffff',
        borderRadius: '12px',
      }"
      :showHeader="false"
      :style="{ border: 'none' }"
      dismissableMask
      header=""
      modal
    >
      <div
        class="
          container
          p-2
          d-flex
          flex-column
          align-items-center
          justify-content-center
        "
      >
        <loading v-if="videoLoading" />
        <video
          :src="`${userDataModel.movieUrl}`"
          autoplay
          class="videos"
          controls
          loop
          muted
          @loadeddata="downloaded"
        ></video>
      </div>
    </Dialog>
  </div>
  <confirmDialog
    :header="$t('warning')"
    :icon="'fa fa-exclamation-triangle'"
    :text="$t('unFollowPrivatePage')"
    :visible="visibleUnfollowPrivatePage"
    @accept="workPageState.unFollow(userDataModel)"
    @reject="visibleUnfollowPrivatePage = false"
    @times="visibleUnfollowPrivatePage = false"
  />
  <scroll-to-top-float-btn></scroll-to-top-float-btn>
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
import { defineComponent, onMounted, ref } from "vue";
import { WorkPageState } from "./WorkPageState";
import WorkPageStories from "@/app/unit/pages/story/storyScreen.vue";
import WorkPagePosts from "./posts/WorkPagePosts.vue";
import WorkPageProducts from "./products/WorkPageProducts.vue";
import Skeleton from "primevue/skeleton";
import { i18n } from "@/main";
import router from "@/core/router/router";
import {
  getMainPageId,
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";
import { UserStatus } from "@/core/enum/enums";
import { ToastService } from "@/core/service/toast.service";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import ScrollToTopFloatBtn from "@/app/public/shared/scrollToTopFloatBtn/scrollToTopFloatBtn.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { EnumKeys } from "@/core/constant/constant";

export default defineComponent({
  name: "WorkPageScreen",
  props: ["userData"],
  components: {
    WorkPageStories,
    WorkPagePosts,
    WorkPageProducts,
    Skeleton,
    confirmDialog,
    ScrollToTopFloatBtn,
    Swiper,
    SwiperSlide,
  },
  setup(props) {
    const workPageState = ref(new WorkPageState());
    const userDataModel = ref(props.userData);
    const pageType = props.userData.pageType;
    const isPublic = props.userData.isPublic;
    const pageStatus = props.userData.pageStatus;
    const myPageId = ref(getSelectedPageData().id);
    const activeTabIsPost = ref(false);
    const displayBasic = ref(false);
    const displayEdit = ref(false);
    const newItemsDialog = ref(false);
    const displayPageMovie = ref(false);
    const activeSwiperIndex = ref(0);
    const isMine = ref(getSelectedPageId() === -userDataModel.value.id);
    const user = ref(getSelectedPageData().username);
    const rightButtonDialog = ref(false);
    const visibleUnfollowPrivatePage = ref(false);
    const videoLoading = ref(true);
    const createWorkPageAlert = ref(false);
    const requestPage = props.userData.followRequest;

    const haveWorkpage = () => {
      var values = false;
      JSON.parse(
        String(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
      ).forEach((element) => {
        if (element.managerId == getMainPageId() || (element.pageId == getMainPageId()&& element.managerId != null)) values = true;
      });
      return values;
    };
    const goTo = (path) => {
      router.push(path);
    };
    const data = {
      title: "uper Share",
      text: "Learn web development on MDN!",
      url: `http://web.upermall.ir/page/${user.value}`,
    };

    function goToDetail() {
      return '/work-page-details/' + userDataModel.value.username + '/' + userDataModel.value.id;
    }

    const openEditDialog = () => {
      displayBasic.value = false;
      displayEdit.value = true;
    };

    const itemList = ref([
      {
        title: i18n.global.tc("addWorkPage"),
        check: () => pageType !== 3 && pageStatus < 2 && isMine.value,
        function: () => {
          haveWorkpage()
            ? (createWorkPageAlert.value = true)
            : router.push("/page/create-work-page");
        },
        class: "uadd-page-work user-select-none",
        rout: "",
      },
      {
        title: i18n.global.tc("offCodes"),
        check: () => pageType !== 3 && pageStatus < 2 && isMine.value,
        function: null,
        class: "udiscount-code user-select-none",
        rout: "/rebate-code",
      },
      {
        title: i18n.global.tc("employees"),
        check: () => isMine.value,
        function: null,
        class: "upage-staff user-select-none",
        rout: "/work-page-employee",
      },
      {
        title: i18n.global.tc("editProfile"),
        check: () => isMine.value,
        function: () => openEditDialog(),
        class: "uedit-user user-select-none",
        rout: "",
      },
      {
        title: i18n.global.tc("sendSetting"),
        check: () => pageType !== 3 && pageStatus < 2 && isMine.value,
        function: null,
        class: "upost-settings user-select-none",
        rout: "/deliverySetting",
      },
      {
        title: i18n.global.tc("stations"),
        check: () => pageType !== 3 && pageStatus < 2 && isMine.value,
        function: null,
        class: "ulocations user-select-none",
        rout: "yourStations",
      },
      {
        title: i18n.global.tc("share"),
        check: () => pageStatus < 2,
        function: () => {
          navigator.share(data);
        },
        class: "ushare user-select-none",
        rout: "",
      },
      {
        title: i18n.global.tc("update prop price"),
        check: () => pageStatus < 2 && isMine.value,
        function: null,
        class: "uedit-product user-select-none",
        rout: "/updatePropPrice",
      },
      {
        title: i18n.global.tc("followings"),
        check: () => true,
        function: null,
        class: "ufollowers user-select-none",
        rout: isMine.value
          ? `/myFollow/${user.value}/${2}/${myPageId.value}`
          : `/otherFollow/${user.value}/${2}/${myPageId.value}`,
      },
      {
        title: i18n.global.tc("blockUser"),
        check: () => !isMine.value,
        function: null,
        class: "fa fa-network-wired user-select-none",
        rout: `/blockedUsers`,
      },
      {
        title: i18n.global.tc("shoppingAddressList"),
        check: () => pageType !== 3 && pageStatus < 2 && isMine.value,
        function: null,
        class: "ushopping-address-list user-select-none",
        rout: "/address-list",
      },
      {
        title: i18n.global.tc("myArchives"),
        check: () => pageStatus < 2 && isMine.value,
        function: null,
        class: "uarchived user-select-none",
        rout: "/my-archives",
      },
      {
        title: i18n.global.tc("bookmarks"),
        check: () => pageStatus < 2 && isMine.value,
        function: null,
        class: "umarked user-select-none",
        rout: "/my-bookmarks",
      },
      {
        title: i18n.global.tc("blockedUsers"),
        check: () => pageStatus < 2 && isMine.value,
        function: null,
        class: "ublocked-users user-select-none",
        rout: "/page/work-page-block-list",
      },
      {
        title: i18n.global.tc("myRequests"),
        check: () => !isPublic && pageStatus < 2 && isMine.value,
        function: null,
        class: "ufollowers user-select-none",
        rout: `/page-request/${getSelectedPageData().username}`,
      },
      {
        title: i18n.global.tc("makeOnline"),
        check: () => pageType === 6 && pageStatus < 2 && isMine.value,
        function: null,
        class: "fas fa-warehouse user-select-none",
        rout: "",
      },
      {
        title: i18n.global.tc("inventory"),
        check: () => pageType === 4 && pageStatus < 2 && isMine.value,
        function: null,
        class: "fas fa-warehouse user-select-none",
        rout: "",
      },
      {
        title: i18n.global.tc("report"),
        check: () => !isMine.value,
        function: null,
        class: "fas fa-warehouse user-select-none",
        rout: "",
      },
    ]);

    const editList = ref([
      {
        title: i18n.global.tc("updateWorkPageTime"),
        class: "far fa-clock user-select-none",
        route: `/work-page-time/${userDataModel.value.id}/${userDataModel.value.username}`,
      },
      {
        title: i18n.global.tc("updateWorkPageDetails"),
        class: "fas fa-user-edit user-select-none",
        route: "/edit-workPage-details",
      },
      {
        title: i18n.global.tc("updateWorkPageImages"),
        class: "fa fa-images user-select-none",
        route: "/update-images",
      },
    ]);

    function openOption() {
      displayBasic.value = true;
    }

    function toNewProduct() {
      router.push("/create-product");
    }

    function openWorkPageComment() {
      router.push(`/page/workPageComment/${userDataModel.value.username}`);
    }

    function rightButtonText() {
      if (isMine.value) {
        return i18n.global.tc("new");
      }
      if (userDataModel.value.isIBlockHim) {
        return i18n.global.tc("unBlock");
      }
      if (userDataModel.value.isPublic) {
        if (userDataModel.value.isIFollowHim) {
          return i18n.global.tc("unFollow");
        } else {
          return i18n.global.tc("follow");
        }
      }
      if (userDataModel.value.isIFollowHim) {
        return i18n.global.tc("unFollow");
      } else if (userDataModel.value.isRequested) {
        return i18n.global.tc("requested");
      } else {
        return i18n.global.tc("followRequest");
      }
    }

    function onSwiper(swiper) {
      activeSwiperIndex.value = swiper.activeIndex;
    }

    function setSecondButtonText() {
      if (isMine.value) {
        return i18n.global.tc("sellCards");
      }
      return i18n.global.tc("customProduct");
    }

    function onSecondButtonClick() {
      if (
        isMine.value &&
        userDataModel.value.pageStatus === UserStatus.Accepted
      ) {
        router.push("/salesBaskets");
      } else {
        ToastService.getInstance().success("به سختی داریم کار میکنیم که این قسمت آماده بشه :)");
      }
    }
    onMounted(() => {
      itemList.value = itemList.value.filter((m) => m.check() === true);
    });

    function onRightClick() {
      if (
        isMine.value &&
        userDataModel.value.pageStatus === UserStatus.Accepted
      ) {
        rightButtonDialog.value = true;
      } else {
        if (userDataModel.value.isIBlockHim) {
          workPageState.value.unblock(userDataModel.value);
        } else if (userDataModel.value.isRequested) {
          workPageState.value.cancelRequest(userDataModel.value);
        } else if (userDataModel.value.isIFollowHim) {
          if (userDataModel.value.isPublic) {
            workPageState.value.unFollow(userDataModel.value);
          } else {
            visibleUnfollowPrivatePage.value = true;
          }
        } else if (
          userDataModel.value.isPublic &&
          !userDataModel.value.isIFollowHim
        ) {
          workPageState.value.newFollow(userDataModel.value);
        } else if (
          !userDataModel.value.isPublic &&
          !userDataModel.value.isRequested
        ) {
          workPageState.value.followRequest(userDataModel.value);
        }
      }
    }

    const downloaded = () => {
      videoLoading.value = false;
    };
    return {
      newItemsDialog,
      userDataModel,
      workPageState,
      activeTabIsPost,
      openOption,
      displayBasic,
      itemList,
      displayEdit,
      openEditDialog,
      editList,
      toNewProduct,
      openWorkPageComment,
      onSwiper,
      activeSwiperIndex,
      rightButtonText,
      isMine,
      onSecondButtonClick,
      createWorkPageAlert,
      setSecondButtonText,
      onRightClick,
      myPageId,
      user,
      rightButtonDialog,
      displayPageMovie,
      downloaded,
      videoLoading,
      goTo,
      goToDetail,
      requestPage
    };
  },
});
</script>

<style lang="scss" scoped>

.bio{
  display: flex;
  justify-content: flex-start;
}
.uarrows-down:before {
  content: '\e843';
  font-size: 10px !important;
  margin: 0 10px 0 10px;
}

.slider-image {
  height: 250px;
  object-fit: cover !important;
}

.workPage-navbar {
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: #fefefe75;
  top: 0;
  z-index: 2;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.workPage-name {
  color: #000000;
  font-weight: 500;
}

.workPage-image {
  border-radius: 50%;
  width: 90px;
  height: 90px;
  border: 1px solid #808080;
}

.workPage-image-parent {
  width: 75px;
  height: 75px;
  top: -44px;
  z-index: 2;
  position: absolute;
}

body[dir="rtl"] .workPage-crown-icon {
  left: -15px;
  bottom: -11px;
}

body[dir="ltr"] .workPage-crown-icon {
  right: 0;
  bottom: 0;
}

.small-text {
  white-space: nowrap;
  font-size: 11px;
}

.wok-page-image {
  height: 100% !important;
  object-fit: cover !important;
}

.paganation-swiper {
  position: absolute;
  bottom: 41px;
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 10;
  align-items: center;
  height: 16px;
}

.pagination-dot {
  width: 8px;
  height: 8px;
  margin: 3px;
  border-radius: 50px;
  background-color: #ffffff;
  transition: all 0.15s ease-in-out;
}

.active-pagination-dot {
  width: 15px;
  height: 15px;
}

.workpage-nav {
  display: flex;
  width: 100%;
}

.workpage-nav-item {
  width: 50%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid transparent;
}

a {
  color: #000000;
}

.nav-item-active {
  border-bottom: 2px solid #000000;
}

.show-video-border {
  border: 3px solid #efce8b;
}

.videos {
  width: 100%;
  height: 100%;
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
.plus-icon{
  position: relative !important;
  top: -10px;
  left: 13px !important;
  right: -50px;
}
</style>
