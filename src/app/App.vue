<template>
  <div id="app-main">
    <MainApp />
  </div>
</template>

<script>
import MainApp from "@/app/unit/shared/mainapp/MainApp.vue";
import { changeAppDirection } from "@/core/service/utils.service";
import { i18n } from "@/main";
import { CacheService } from "@/core/service/cache.service";
import router from "@/core/router/router";

export default {
  components: {
    MainApp,
  },
  mounted() {
    changeAppDirection(i18n.global.locale);
    CacheService.getInstance().getCache();
  },
  setup() {
    // window.addEventListener("popstate", () => {
    //   router.forward();
    // });
  },
};
</script>

<style scoped>
</style>

