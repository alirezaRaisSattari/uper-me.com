<template>
  <div class="w-100 d-flex justify-content-center align-items-center bringToFront" id="uper-bottom-bar">
    <div id="bottom-bar">

      <router-link class="text-decoration-none" class-active="active" to="/homescreen">
        <i class="icon-font text-muted-color fa-lg d-flex justify-content-center align-items-center py-4 my-1 uhome w-40"></i>
      </router-link>

      <router-link class="text-decoration-none" class-active="active" to="/explore">
        <i class="icon-font text-muted-color fa-lg d-flex justify-content-center align-items-center py-4 my-1 userch w-40"></i>
      </router-link>

      <div class="position-relative">
        
        <img alt="" class="radial-button rounded-circle hover-pointer" height="55" src="@/assets/img/uper.png"
          width="55" @click="toggleRadial" />
        <router-link class="text-decoration-none" class-active="active" to="/wallet">
          <div id="radial-item-1" class="radial-item">
            <i class="icon-font u4 text-muted-color"></i>
          </div>
        </router-link>

        <router-link class="text-decoration-none" class-active="active" to="/calendar">
          <div id="radial-item-2" class="radial-item">
            <i class="icon-font udate text-muted-color"></i>
          </div>
        </router-link>

        <router-link class="text-decoration-none" class-active="active" to="/">
          <div id="radial-item-3" class="radial-item">
            <i class="fas fa-th-large text-muted-color"></i>
          </div>
        </router-link>

        <router-link class="text-decoration-none" class-active="active" to="/qrcode">
          <div id="radial-item-4" class="radial-item">
            <i class="icon-font uqr text-muted-color"></i>
          </div>
        </router-link>

        <router-link class="text-decoration-none" class-active="active" to="/voiceAssistant">
          <div id="radial-item-5" class="radial-item">
            <i class="icon-font u5 text-muted-color"></i>
          </div>
        </router-link>

      </div>
      <router-link class="text-decoration-none" class-active="active" to="/shopping-cart">
        <i class="icon-font text-muted-color fa-lg d-flex justify-content-center align-items-center py-4 my-1 uhayper w-40"></i>
      </router-link>
      <router-link :to="userRoute" class="text-decoration-none" class-active="active">
        <div v-if="isLogin" class="py-2 my-1 d-flex justify-content-center align-items-center">
          <LongPress :on-click="navigateToUser" :on-long-press="onLongPressProfile">
            <button :style="{ backgroundImage: `url(${pageProfile + '_sm.webp'})` }"
              class="rounded-circle button-profile"></button>
          </LongPress>
        </div>
        <template v-else>
          <i
            class="text-muted-color fa-lg d-flex justify-content-center align-items-center py-4 my-1 fa fa-user w-40"></i>
        </template>
      </router-link>
    </div>
  </div>
  <div>
    <Dialog v-model:visible="showAccountsDialog" :breakpoints="{ '440px': '100vw' }" :dismissableMask="true"
      :modal="true" :position="'bottom'" :style="{ 'max-width': '19rem' }">
      <div class="modal__content">
        <div class="col-12 w-100 h-100 px-0 dialog-bar">
          <input type="text" class="form-control w-100 text-sm" placeholder="نام یا نام کاربری را وارد کنید" v-model="searchedText">
          <div v-for="page in pages" :key="page.id" class="user-profile d-flex bcard rounded hover-pointer hover-bg-primary mt-1 p-2"
            style="max-height: 100px" @click="selectPage(page.id)">
            <div class="d-flex no-gutters align-items-center">
              <div class="col-2 position-relative text-right">
                <img v-lazy="page.profileUrl + '_sm.webp'" alt="" class="rounded-circle img-fluid" height="42"
                  width="42" />
                <img v-if="page.creditLevel === 1" alt="" class="position-absolute crown-icon" height="20"
                  src="@/assets/img/ic_crown_golden.svg" width="20" />
                <img v-if="page.creditLevel === 2" alt="" class="position-absolute crown-icon" height="20"
                  src="@/assets/img/ic_crown_grey.svg" width="20" />
              </div>
              <div class="col-9 text-center text-sm-left">
                <p :title="page.name" class="px-1 m-0 direction-text">
                  <small class="span-column">{{ page.name }}</small>
                </p>
                <div class="d-flex align-content-start justify-content-between">
                  <p :title="page.username" class="px-1 m-0 mt-1 direction-text">
                    <small class="span-column text-muted">{{
                      page.username
                    }}</small>
                  </p>
                  <small v-if="page.userStatus===2" class=" span-column" style="font-size: 10px; padding-left: 20px">{{
                      $t('Check')
                    }}</small>
                </div>
              </div>
              <div class="col-1 user-profile">
                <RadioButton v-model="selectedPage" :value="page.id" class="mx-1 " name="account" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import {
  getSelectedPageData,
  getSelectedPageId,
} from "@/core/service/utils.service";
import { AuthStore } from "@/core/store/auth.store";
import { PageStore } from "@/core/store/page.store";
import { defineComponent, onMounted, ref, watch } from "vue";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { EnumKeys } from "@/core/constant/constant";
import router from "@/core/router/router";
import { UserStatus } from "@/core/enum/enums";
import { userStatusType } from "@/core/service/type.service";
import LongPress from "@/app/public/shared/longpress/LongPress.vue";
import { useRoute } from "vue-router";
import RadioButton from "primevue/radiobutton";
import SpeedDial from 'primevue/speeddial';
export default defineComponent({
  name: "Bottombar",
  components: {
    LongPress,
    RadioButton,
    SpeedDial
  },

  setup() {
    const isLogin = ref(AuthStore().isLoggedIn);
    const pageProfile = ref("");
    const userRoute = ref(getSelectedPageData().username == undefined ?'/login' : `/page/${getSelectedPageData().username}` );
    const showAccountsDialog = ref(false);
    const pages = ref(<any>[]);
    const _pages = ref(<any>[]);
    const selectedPage = ref(0);
    const route = useRoute();
    const searchedText = ref('');
   
    watch(
      () => AuthStore().isLoggedIn,
      (newParams) => {
        isLogin.value = newParams;
        if (newParams) {
          setPages();
        } else {
          pages.value = [];
          _pages.value = [];
          showAccountsDialog.value = false;
        }
      }
    );

    watch(
        () => searchedText.value,
        (newParams) => {
          if (newParams.length >= 3) {
            pages.value = pages.value.filter(value => value.name.includes(searchedText.value) || value.username.includes(searchedText.value))
          } else {
            pages.value = _pages.value;
          }
        }
    );

    watch(
      () => PageStore().selectedPageId,
      () => {
        userRoute.value = getSelectedPageData().username == undefined ?'/login' : `/page/${getSelectedPageData().username}`;
        pageProfile.value = getSelectedPageData().profileUrl;
      }
    );

    watch(
      () => route.path,
      () => {
        closeRadial();
      }
    );

    onMounted(() => {
      if (isLogin.value) {
        pageProfile.value = getSelectedPageData().profileUrl;
      }
      setPages();
      selectedPage.value = getSelectedPageId();

      let uperFooter = document.getElementById("uper-form-footer");
      if (uperFooter) {
        let bottomBar = document.getElementById("uper-bottom-bar");
        if (bottomBar) {
          bottomBar.style.display = "none";
          bottomBar.style.visibility = "hidden";
        }
      }
    });

    function onLongPressProfile() {
      showAccountsDialog.value = true;
    }

    function setPages() {
      let mainPageData = JSON.parse(
        String(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
      );
      let workPagesData = JSON.parse(
        String(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
      );
      if (mainPageData != null && typeof mainPageData === "object") {
        pages.value.push({
          profileUrl: mainPageData.profileImageUrl,
          name: mainPageData.name,
          username: mainPageData.username,
          creditLevel: mainPageData.creditLevel,
          id: Math.abs(mainPageData.mainPageId),
          userStatus: null,
        });_pages.value.push({
          profileUrl: mainPageData.profileImageUrl,
          name: mainPageData.name,
          username: mainPageData.username,
          creditLevel: mainPageData.creditLevel,
          id: Math.abs(mainPageData.mainPageId),
          userStatus: null,
        });
      }

      if (workPagesData != null && Array.isArray(workPagesData)) {
        workPagesData.forEach((e) => {
          if (e.pageId < 0)
            pages.value.push({
              profileUrl: e.profileImageUrl,
              name: e.name,
              username: e.username,
              creditLevel: e.creditLevel,
              id: -Math.abs(e.pageId),
              userStatus: e.userStatus,
            });_pages.value.push({
              profileUrl: e.profileImageUrl,
              name: e.name,
              username: e.username,
              creditLevel: e.creditLevel,
              id: -Math.abs(e.pageId),
              userStatus: e.userStatus,
            });
        });
      }
    }

    function selectPage(id) {
      showAccountsDialog.value = false;
      LocalStorageService.getInstance().setItem(EnumKeys.KeySelectedPageId, id);
      PageStore().selectedPageId = id;
      selectedPage.value = id;
      router.push({ path: `/page/${getSelectedPageData().username}` });
    }

    function getUserStatusType(type) {
      if (type !== UserStatus.Accepted && type != null) {
        return userStatusType(type);
      }
      return "";
    }

    function toggleRadial() {
      document
        .getElementById("radial-item-1")
        ?.classList.toggle("radial-item-1-active");
      document
        .getElementById("radial-item-2")
        ?.classList.toggle("radial-item-2-active");
      document
        .getElementById("radial-item-3")
        ?.classList.toggle("radial-item-3-active");
      document
        .getElementById("radial-item-4")
        ?.classList.toggle("radial-item-4-active");
      document
        .getElementById("radial-item-5")
        ?.classList.toggle("radial-item-5-active");
    }

    function closeRadial() {
      let radial1 = document.getElementById("radial-item-1")?.classList;
      let radial2 = document.getElementById("radial-item-2")?.classList;
      let radial3 = document.getElementById("radial-item-3")?.classList;
      let radial4 = document.getElementById("radial-item-4")?.classList;
      let radial5 = document.getElementById("radial-item-5")?.classList;
      if (radial1.contains("radial-item-1-active")) {
        radial1.remove("radial-item-1-active");
      }
      if (radial2.contains("radial-item-2-active")) {
        radial2.remove("radial-item-2-active");
      }
      if (radial3.contains("radial-item-3-active")) {
        radial3.remove("radial-item-3-active");
      }
      if (radial4.contains("radial-item-4-active")) {
        radial4.remove("radial-item-4-active");
      }
      if (radial5.contains("radial-item-5-active")) {
        radial5.remove("radial-item-5-active");
      }
    }

    function navigateToUser() {
      router.push({ path: userRoute.value });
    }

    return {
      toggleRadial,
      isLogin,
      pageProfile,
      userRoute,
      showAccountsDialog,
      setPages,
      selectPage,
      getUserStatusType,
      pages,
      selectedPage,
      searchedText,
      onLongPressProfile,
      navigateToUser,

    };
  },
});
</script>

<style scoped>
#bottom-bar {
  width: 100%;
  position: fixed;
  height: 60px;
  bottom: 0;
  background-color: #fff;
  max-width: 510px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  box-shadow: 0 0 4px 1px #b9b8b8;
  z-index: 30;
}

router-link > * {
  color: var(--text-muted-color);
}

.router-link-active * {
  color: #ffac07 !important;
}

.radial-button {
  transform: translateY(-30px);
  box-shadow: 0 -3px 4px -1px #b9b8b8;
  background-color: #6c757d8e;
}

.radial-item {
  border: 2px solid white;
  background-color: rgba(135, 142, 149, 0.56);
  position: absolute;
  transition: all 0.4s;
  z-index: -1;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

body[dir="rtl"] .radial-item {
  transform: translate(-6.5px, -79px);
}

body[dir="ltr"] .radial-item {
  transform: translate(6.5px, -79px);
}

body[dir="rtl"] .radial-item-1-active {
  transform: translate(-77px, -82px);
  opacity: 1;
}

body[dir="rtl"] .radial-item-2-active {
  transform: translate(-52px, -121px);
  opacity: 1;
}

body[dir="rtl"] .radial-item-3-active {
  transform: translate(-7px, -136px);
  opacity: 1;
}

body[dir="rtl"] .radial-item-4-active {
  transform: translate(37px, -121px);
  opacity: 1;
}

body[dir="rtl"] .radial-item-5-active {
  transform: translate(62px, -82px);
  opacity: 1;
}

body[dir="ltr"] .radial-item-1-active {
  transform: translate(77px, -82px);
  opacity: 1;
}

body[dir="ltr"] .radial-item-2-active {
  transform: translate(52px, -121px);
  opacity: 1;
}

body[dir="ltr"] .radial-item-3-active {
  transform: translate(7px, -136px);
  opacity: 1;
}

body[dir="ltr"] .radial-item-4-active {
  transform: translate(-37px, -121px);
  opacity: 1;
}

body[dir="ltr"] .radial-item-5-active {
  transform: translate(-62px, -82px);
  opacity: 1;
}

.router-link-active button {
  border: 3px solid #707070;
}

.w-40 {
  width: 40px;
}

.button-profile {
  width: 40px;
  height: 40px;
  background-size: 100%;
  border: 2px solid #707070;
}

.bcard {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
}

.dialog-bar{
  overflow-x: hidden;
}

.user-profile{
padding-left: 10px;
}
</style>
