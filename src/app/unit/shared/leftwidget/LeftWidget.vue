<template>
  <div id="left-widget" class="py-2 px-2">
    <div class="uper-card-1 bg-white scroll">
      <h2
        v-if="state.pages.length === 0 && state._pages.length === 0"
        class="w-100 text-center center-vertical"
      >
        {{ $t("welcome") }}
      </h2>
      <div v-else class="col-12 w-100 px-1 py-1" :key="state.buffer">
        <input type="text" class="form-control w-100 text-sm" placeholder="نام یا نام کاربری را وارد کنید" v-model="searchedText">
        <div
          v-for="page in state.pages"
          :key="page.id"
          class="hover-pointer hover-bg-primary p-2 w-100 max-height"
          @click="selectPage(page.id)"
        >
          <div class="d-flex no-gutters align-items-center">
            <div class="col-2 position-relative text-right">
              <img
                :src="page.profileUrl + '_sm.webp'"
                alt=""
                class="rounded-circle img-fluid"
                height="52"
                width="52"
              />
              <img
                v-if="page.creditLevel === 1"
                alt=""
                class="position-absolute crown-icon"
                height="20"
                src="@/assets/img/ic_crown_golden.svg"
                width="20"
              />
              <img
                v-if="page.creditLevel === 2"
                alt=""
                class="position-absolute crown-icon"
                height="20"
                src="@/assets/img/ic_crown_grey.svg"
                width="20"
              />
            </div>
            <div class="col-9 text-center text-sm-left mt-1">
              <p :title="page.name" class="px-1 m-0 direction-text">
                <small class="span-column">{{ page.name }}</small>
              </p>
              <div class="d-flex align-content-start justify-content-between">
                <small
                  :title="page.username"
                  class="span-column text-muted px-1 m-0 mt-1"
                  >{{ page.username }}</small
                >
                <small class="span-column" style="font-size: 10px; padding-left: 20px;">{{
                  getUserStatusType(page.userStatus)
                }}</small>
              </div>
            </div>
            <div class="col-1">
              <RadioButton
                v-model="state.selectedPage"
                :value="page.id"
                class="mx-1"
                name="account"
              />
            </div>
          </div>
        </div>
        <div
          class="
            card
            rounded
            hover-pointer hover-bg-primary
            mt-1
            p-2
            w-100
            max-height
          "
          @click="
            haveWorkPage() ? (createWorkPageAlert = true) : createNewWorkPage()
          "
        >
          <div class="d-flex no-gutters align-items-center">
            <div class="col-2 position-relative text-center">
              <div class="plus-icon-wrapper rounded-circle">
                <i class="fas fa-plus"></i>
              </div>
            </div>
            <div class="col-9 text-center text-sm-left">
              <div
                class="d-flex align-content-start justify-content-between mx-3"
              >
                {{ $t("addWorkPage") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    <div class="text-center p-2">
      <Button class="w-50 mt-3 p-2 submit-btn bg-custom ticket" @click="ticket()" :label="$t('continue')" />
    </div>

  </Dialog>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { EnumKeys } from "@/core/constant/constant";
import router from "@/core/router/router";
import { userStatusType } from "@/core/service/type.service";
import { UserStatus } from "@/core/enum/enums";
import { PageStore } from "@/core/store/page.store";
import { AuthStore } from "@/core/store/auth.store";
import {
  getMainPageId,
  getSelectedPageData,
} from "@/core/service/utils.service";
import RadioButton from "primevue/radiobutton";
import { leftWidgetState } from "./leftWidgetState";

export default defineComponent({
  name: "LeftWidget",
  components: {
    RadioButton,
  },
  setup() {
    const state = ref(leftWidgetState.getInstance());
    const createWorkPageAlert = ref(false);
    const searchedText = ref('');

    function ticket() {
      router.push('/ticket/create');
       createWorkPageAlert.value = false

    }


    onMounted(() => {
      state.value.setPages();
    });

    watch(
      () => AuthStore().isLoggedIn,
      (newParams) => {
        if (newParams) {
          state.value.setPages();
        } else state.value.pages = [];
      }
    );

    watch(
        () => searchedText.value,
        (newParams) => {
          if (newParams.length >= 3) {
            state.value.pages = state.value.pages.filter(value => value.name.includes(searchedText.value) || value.username.includes(searchedText.value))
          } else {
            state.value.pages = state.value._pages;
          }
        }
    );

    function selectPage(id) {
      LocalStorageService.getInstance().setItem(EnumKeys.KeySelectedPageId, id);
      PageStore().selectedPageId = id;
      state.value.selectedPage = id;
      router.push({ path: `/page/${getSelectedPageData().username}` });
    }

    function createNewWorkPage() {
      router.push({ path: `/page/create-work-page` });
    }

    function getUserStatusType(type) {
      if (type !== UserStatus.Accepted && type != null) {
        return userStatusType(type);
      }
      return "";
    }

    const haveWorkPage = () => {
      let values = false;
      console.log(JSON.parse(
          String(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
      ))
      JSON.parse(
        String(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
      ).forEach((element) => {
        if (element.managerId == getMainPageId() || (element.pageId == getMainPageId() && element.managerId != null)) values = true;
      });
      return values;
    };

    return {
      createWorkPageAlert,
      createNewWorkPage,
      getUserStatusType,
      haveWorkPage,
      selectPage,
      state,
      searchedText,
      ticket
    };
  },
});
</script>

<style scoped>
#left-widget {
  height: 100%;
  max-height: 100vh;
  position: fixed;
  top: 0;
  width: 25%;
}

body[dir="ltr"] #left-widget {
  right: 0px !important;
}

body[dir="rtl"] #left-widget {
  left: 0px !important;
}

.center-vertical {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.plus-icon-wrapper {
  height: 44px;
  width: 44px;
  padding-block: 10px;
  border: 2px solid black;
}

.scroll {
  max-height: 98vh;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.max-height {
  height: 64px;
}
.ticket{
  background-color: #c1e1e5;
  border: none;
}
.ticket:hover{
  background-color:#c1e1e5 !important;
}

</style>
