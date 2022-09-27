<template>
  <div>
    <div v-if="block" class="loading-block">
      <div class="text-center">
        <div class="snippet" data-title=".dot-spin">
          <div class="stage">
            <div class="dot-spin mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div v-if="windowSize > 991" class="w-25-box side-bar">
        <Tabbar />
        <Sidebar />
      </div>

      <div class="w-50-box">
        <div class="d-flex justify-content-center align-items-center">
          <div id="main-scroll" class="app-box">
            <div class="bg-white w-100 main-box">
              <div class="col-12 px-0 h-100">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Leftwidget v-if="windowSize > 991" />
    </div>
    <Bottombar v-if="windowSize <= 991" />

    <div class="app-download-div">
      <button
        class="app-download-button show-download"
        id="app-download-button"
      >
        <div class="d-flex align-items-center justify-content-center">
          <span class="px-2" @click="displayDownloadDetails = true"
            >دانلود اپلیکیشن</span
          >
          <LottieVue
            @click="displayDownloadDetails = true"
            path="https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/download-application.json"
            width="36"
            height="36"
          />
          <i
            class="fa fa-times close-icon-download hover-pointer"
            @click="hideDownloadButton()"
          ></i>
        </div>
      </button>
    </div>
  </div>
  <Dialog
    v-model:visible="displayDownloadDetails"
    :breakpoints="{
      '1000px': '52vw',
      '800px': '65vw',
      '600px': '91vw',
    }"
    :contentStyle="{ background: 'rgb(255, 255, 255)', borderRadius: '8px' }"
    :showHeader="false"
    :style="{ borderRadius: '100px' }"
    dismissableMask
    header=""
    modal
  >
    <div class="d-flex align-items-center ltr pr-2">
      <Button
        :label="$t('direct download')"
        class="p-button-text w-100 p-button-rounded m-2 mr-0"
        @click="openLink('http://uper-me.com/download-app')"
      />
      <img
        src="https://uper-me.com/favicon.png"
        width="28"
        height="28"
        class="icon-size iconOfDialog mr-2"
      />
    </div>
    <div class="d-flex align-items-center ltr pr-1">
      <Button
        :label="$t('downloadFromBazar')"
        class="p-button-text w-100 p-button-rounded m-2 mr-0"
        @click="
          openLink('http://cafebazaar.ir/app/?id=com.uper.mobile&ref=share')
        "
      />
      <img
        src="https://uper-cdn.s3.ir-thr-at1.arvanstorage.com/images/BazarIcon.png"
        width="28"
        height="28"
        class="icon-size iconOfDialog mr-2"
      />
    </div>

    <div class="d-flex align-items-center ltr pr-2">
      <Button
        :label="$t('downloadFromMyket')"
        class="p-button-text w-100 p-button-rounded m-2 mr-0"
        @click="openLink('https://myket.ir/app/com.uper.mobile')   "
      />
      <img
        src="https://uper-cdn.s3.ir-thr-at1.arvanstorage.com/images/MyketIcon.png"
        width="28"
        height="28"
        class="icon-size iconOfDialog mr-2"
      />
    </div>
    <div class="d-flex align-items-center ltr pr-2">
      <Button
        :label="$t('downloadFromGoogleStore')"
        class="p-button-text w-100 p-button-rounded m-2 mr-0"
        @click="openLinkLater"
      />
      <img
        src="https://uper-cdn.s3.ir-thr-at1.arvanstorage.com/images/GoogleStoreIcon.png"
        width="24"
        height="24"
        class="icon-size iconOfDialog mr-2"
      />
    </div>
  </Dialog>
</template>

<script>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Leftwidget from "@/app/unit/shared/leftwidget/LeftWidget.vue";
import Bottombar from "@/app/unit/shared/bottombar/BottomBar.vue";
import Sidebar from "@/app/unit/shared/sidebar/SideBar.vue";
import Tabbar from "@/app/unit/shared/tabbar/TabBar.vue";
import { PageStore } from "@/core/store/page.store";
import { WindowLoading } from "@/core/service/utils.service";
import router from "@/core/router/router";
import { useRoute } from "vue-router";
import LottieVue from "lottie-vue";
import { ToastService } from "@/core/service/toast.service";

export default {
  name: "MainApp",
  mounted() {},
  components: {
    Leftwidget,
    Bottombar,
    Sidebar,
    Tabbar,
    LottieVue,
  },
  setup() {
    const block = ref(false);
    const windowSize = ref(window.innerWidth);
    const displayDownloadDetails = ref(false);
    const pageStore = PageStore();
    const route = useRoute();

    function showDownloadButton() {
      let x = document.getElementById("app-download-button");
      if (x && !x.classList.contains("show-download")) {
        x.classList.remove("hide-download");
        setTimeout(() => {
          x.classList.add("show-download");
        }, 100);
      }
    }

    function hideDownloadButton() {
      let x = document.getElementById("app-download-button");
      if (x && x.classList.contains("show-download")) {
        x.classList.remove("show-download");
        setTimeout(() => {
          x.classList.add("hide-download");
        }, 200);
      }
    }

    watch(
      () => WindowLoading.value,
      () => {
        block.value = WindowLoading.value;
      }
    );

    watch(
      () => route.path,
      () => {
        showDownloadButton();
      }
    );

    function openLink(link) {
      window.open(link , '_blank');
    }

    function openLinkLater() {
      ToastService.getInstance().success("بزودی توی این مارکت ها هم میایم :)");
    }

    onMounted(() => {
      addEventListener("resize", () => (windowSize.value = innerWidth));
      window.addEventListener("keydown", onKeyDown, false);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", onKeyDown, false);
    });

    function onKeyDown(event) {
      if (event.ctrlKey && event.shiftKey) {
        router.push("/search");
      }
    }

    return {
      displayDownloadDetails,
      windowSize,
      pageStore,
      block,
      hideDownloadButton,
      openLink,
      openLinkLater,
    };
  },
};
</script>

<style scoped>
.app-download-div {
  position: fixed;
  right: 100px;
  bottom: 60px;
  z-index: 999 !important;
}

.app-download-button {
  background: #04b6ff;
  border: 2px solid #ffffff;
  border-radius: 64px;
  padding: 4px 4px 4px 4px;
  box-shadow: 0 0 8px -3px #59636f;
  color: #ffffff;
  position: relative;
  -webkit-animation: scale-down-18cdd5cb 1s linear 0s infinite alternate;
  animation: scale-down-18cdd5cb 1s linear 0s infinite alternate;
  transition: opacity 0.2s ease-in-out;
  outline: none;
}

.close-icon-download {
  padding: 9px;
}

@keyframes scale-down {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.app-box {
  max-width: 510px !important;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  justify-content: space-between;
  /*border-right: 1px solid black;*/
  /*border-left: 1px solid black;*/
  /*padding-bottom: 65px;*/
}

.w-25-box {
  width: 25%;
}

@media (max-width: 991px) {
  .w-50-box {
    width: 100%;
  }
}

@media (min-width: 992px) {
  .w-50-box {
    width: 50%;
  }
}

.dot-spin {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: transparent;
  color: transparent;
  box-shadow: 0 -18px 0 0 #ffffff, 13px -13px 0 0 #ffffff, 18px 0 0 0 #ffffff,
    13px 13px 0 0 rgba(152, 128, 255, 0), 0 18px 0 0 rgba(152, 128, 255, 0),
    -13px 13px 0 0 rgba(152, 128, 255, 0), -18px 0 0 0 rgba(152, 128, 255, 0),
    -13px -13px 0 0 rgba(152, 128, 255, 0);
  -webkit-animation: dot-spin 1.5s infinite linear;
  animation: dot-spin 1.5s infinite linear;
}

@-webkit-keyframes dot-spin {
  0%,
  100% {
    box-shadow: 0 -18px 0 0 #ffffff, 13px -13px 0 0 #ffffff, 18px 0 0 0 #ffffff,
      13px 13px 0 -5px rgba(152, 128, 255, 0),
      0 18px 0 -5px rgba(152, 128, 255, 0),
      -13px 13px 0 -5px rgba(152, 128, 255, 0),
      -18px 0 0 -5px rgba(152, 128, 255, 0),
      -13px -13px 0 -5px rgba(152, 128, 255, 0);
  }
  12.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 13px -13px 0 0 #ffffff,
      18px 0 0 0 #ffffff, 13px 13px 0 0 #ffffff,
      0 18px 0 -5px rgba(152, 128, 255, 0),
      -13px 13px 0 -5px rgba(152, 128, 255, 0),
      -18px 0 0 -5px rgba(152, 128, 255, 0),
      -13px -13px 0 -5px rgba(152, 128, 255, 0);
  }
  25% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
      13px -13px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 0 #ffffff,
      13px 13px 0 0 #ffffff, 0 18px 0 0 #ffffff,
      -13px 13px 0 -5px rgba(152, 128, 255, 0),
      -18px 0 0 -5px rgba(152, 128, 255, 0),
      -13px -13px 0 -5px rgba(152, 128, 255, 0);
  }
  37.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
      13px -13px 0 -5px rgba(152, 128, 255, 0),
      18px 0 0 -5px rgba(152, 128, 255, 0), 13px 13px 0 0 #ffffff,
      0 18px 0 0 #ffffff, -13px 13px 0 0 #ffffff,
      -18px 0 0 -5px rgba(152, 128, 255, 0),
      -13px -13px 0 -5px rgba(152, 128, 255, 0);
  }
  50% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
      13px -13px 0 -5px rgba(152, 128, 255, 0),
      18px 0 0 -5px rgba(152, 128, 255, 0),
      13px 13px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 0 #ffffff,
      -13px 13px 0 0 #ffffff, -18px 0 0 0 #ffffff,
      -13px -13px 0 -5px rgba(152, 128, 255, 0);
  }
  62.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
      13px -13px 0 -5px rgba(152, 128, 255, 0),
      18px 0 0 -5px rgba(152, 128, 255, 0),
      13px 13px 0 -5px rgba(152, 128, 255, 0),
      0 18px 0 -5px rgba(152, 128, 255, 0), -13px 13px 0 0 #ffffff,
      -18px 0 0 0 #ffffff, -13px -13px 0 0 #ffffff;
  }
  75% {
    box-shadow: 0 -18px 0 0 #ffffff, 13px -13px 0 -5px rgba(152, 128, 255, 0),
      18px 0 0 -5px rgba(152, 128, 255, 0),
      13px 13px 0 -5px rgba(152, 128, 255, 0),
      0 18px 0 -5px rgba(152, 128, 255, 0),
      -13px 13px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 0 #ffffff,
      -13px -13px 0 0 #ffffff;
  }
  87.5% {
    box-shadow: 0 -18px 0 0 #ffffff, 13px -13px 0 0 #ffffff,
      18px 0 0 -5px rgba(152, 128, 255, 0),
      13px 13px 0 -5px rgba(152, 128, 255, 0),
      0 18px 0 -5px rgba(152, 128, 255, 0),
      -13px 13px 0 -5px rgba(152, 128, 255, 0),
      -18px 0 0 -5px rgba(152, 128, 255, 0), -13px -13px 0 0 #ffffff;
  }
}

@keyframes dot-spin {
  0%,
  100% {
    box-shadow: 0 -18px 0 0 #ffffff, 13px -13px 0 0 #ffffff, 18px 0 0 0 #ffffff,
      13px 13px 0 -5px rgba(152, 128, 255, 0),
      0 18px 0 -5px rgba(152, 128, 255, 0),
      -13px 13px 0 -5px rgba(152, 128, 255, 0),
      -18px 0 0 -5px rgba(152, 128, 255, 0),
      -13px -13px 0 -5px rgba(152, 128, 255, 0);
  }
  12.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 13px -13px 0 0 #ffffff,
      18px 0 0 0 #ffffff, 13px 13px 0 0 #ffffff,
      0 18px 0 -5px rgba(152, 128, 255, 0),
      -13px 13px 0 -5px rgba(152, 128, 255, 0),
      -18px 0 0 -5px rgba(152, 128, 255, 0),
      -13px -13px 0 -5px rgba(152, 128, 255, 0);
  }
  25% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
      13px -13px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 0 #ffffff,
      13px 13px 0 0 #ffffff, 0 18px 0 0 #ffffff,
      -13px 13px 0 -5px rgba(152, 128, 255, 0),
      -18px 0 0 -5px rgba(152, 128, 255, 0),
      -13px -13px 0 -5px rgba(152, 128, 255, 0);
  }
  37.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
      13px -13px 0 -5px rgba(152, 128, 255, 0),
      18px 0 0 -5px rgba(152, 128, 255, 0), 13px 13px 0 0 #ffffff,
      0 18px 0 0 #ffffff, -13px 13px 0 0 #ffffff,
      -18px 0 0 -5px rgba(152, 128, 255, 0),
      -13px -13px 0 -5px rgba(152, 128, 255, 0);
  }
  50% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
      13px -13px 0 -5px rgba(152, 128, 255, 0),
      18px 0 0 -5px rgba(152, 128, 255, 0),
      13px 13px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 0 #ffffff,
      -13px 13px 0 0 #ffffff, -18px 0 0 0 #ffffff,
      -13px -13px 0 -5px rgba(152, 128, 255, 0);
  }
  62.5% {
    box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
      13px -13px 0 -5px rgba(152, 128, 255, 0),
      18px 0 0 -5px rgba(152, 128, 255, 0),
      13px 13px 0 -5px rgba(152, 128, 255, 0),
      0 18px 0 -5px rgba(152, 128, 255, 0), -13px 13px 0 0 #ffffff,
      -18px 0 0 0 #ffffff, -13px -13px 0 0 #ffffff;
  }
  75% {
    box-shadow: 0 -18px 0 0 #ffffff, 13px -13px 0 -5px rgba(152, 128, 255, 0),
      18px 0 0 -5px rgba(152, 128, 255, 0),
      13px 13px 0 -5px rgba(152, 128, 255, 0),
      0 18px 0 -5px rgba(152, 128, 255, 0),
      -13px 13px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 0 #ffffff,
      -13px -13px 0 0 #ffffff;
  }
  87.5% {
    box-shadow: 0 -18px 0 0 #ffffff, 13px -13px 0 0 #ffffff,
      18px 0 0 -5px rgba(152, 128, 255, 0),
      13px 13px 0 -5px rgba(152, 128, 255, 0),
      0 18px 0 -5px rgba(152, 128, 255, 0),
      -13px 13px 0 -5px rgba(152, 128, 255, 0),
      -18px 0 0 -5px rgba(152, 128, 255, 0), -13px -13px 0 0 #ffffff;
  }
}

.loading-block {
  position: fixed;
  right: 0;
  z-index: 1102;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  background-color: #00000061;
  transition: all 0.5s linear;
}

.main-box {
  background-color: white;
  box-shadow: 0 0 13px -7px grey;
  padding-bottom: 130px;
}
.profileImg {
  width: 55px;
  border-radius: 55px;
  border: 2px solid #707070;
}

.icon-size {
  font-size: 23px;
}

.ellipsis-size {
  font-size: 20px;
}

.folder-name {
  text-shadow: 0px 0px black;
  font-size: 17px;
}

.h-custom {
  height: 43px;
}

.w-61 {
  width: 61%;
}

.w-30 {
  width: 30%;
}
.hide-download {
  display: none;
}
</style>
