<template>
  <div id="side-bar">
    <div class="w-100">
      <router-link
        v-for="icon in icons"
        :key="icon.icon"
        :to="icon.route"
        class="text-decoration-none"
        class-active="active"
      >
        <div
          v-if="icon.unit === 'page' && isLogin"
          class="
            py-2
            my-1
            hover-bg-primary
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <img
            :src="pageProfile + '_sm.webp'"
            class="rounded-circle"
            height="40"
            width="40"
          />
        </div>
        <template v-else>
          <i
            :class="icon.icon"
            class="
              text-muted-color
              fa-lg
              d-flex
              justify-content-center
              align-items-center
              py-4
              my-1
              hover-bg-primary
            "
          ></i>
        </template>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { getSelectedPageData } from "@/core/service/utils.service";
import { AuthStore } from "@/core/store/auth.store";
import { PageStore } from "@/core/store/page.store";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "Sidebar",
  setup() {
    const isLogin = ref(AuthStore().isLoggedIn);
    const pageProfile = ref("");
    let icons = ref([
      {
        route: isLogin.value
          ? `/page/${getSelectedPageData().username}`
          : "/login",
        icon: "uprofile",
        unit: "page",
      },
      {
        route: "/shopping-cart",
        icon: "uhayper",
        unit: "shopping-cart",
      },
      { route: "/wallet", icon: "u4", unit: "wallet" },
      { route: "/trello", icon: "udate", unit: "trello" },
      { route: "/qrcode", icon: "uqr", unit: "qrcode" },
      {
        route: "/voiceAssistant",
        icon: "u5",
        unit: "microphone",
      },
      {
        route: "/explore",
        icon: "userch",
        unit: "search",
      },

      { route: "/homescreen", icon: "uhome", unit: "home" },
      { route: "/setting", icon: "usettings", unit: "setting" },
    ]);

    watch(
      () => AuthStore().isLoggedIn,
      (newParams) => {
        isLogin.value = newParams;
        icons.value[0].route = newParams
          ? `/page/${getSelectedPageData().username}`
          : "/login";
      }
    );
    onMounted(() => {
      if (isLogin.value) {
        pageProfile.value = getSelectedPageData().profileUrl;
      }
    });

    watch(
      () => PageStore().selectedPageId,
      (newParams) => {
        icons.value[0].route = `/page/${getSelectedPageData().username}`;
        pageProfile.value = getSelectedPageData().profileUrl;
      }
    );

    return { icons, isLogin, pageProfile };
  },
});
</script>

<style scoped>
#side-bar {
  position: fixed;
  height: 100%;
  background-color: white;
  width: 60px;
  top: 0;
  box-shadow: 0 0 10px -2px #888888;
  display: flex;
  align-items: center;
  justify-content: center;
}

router-link > * {
  color: var(--text-muted-color);
}

.router-link-active > * {
  color: var(--icon-primary-color) !important;
}

.router-link-active img {
  border: 3px solid var(--icon-primary-color);
}
</style>
