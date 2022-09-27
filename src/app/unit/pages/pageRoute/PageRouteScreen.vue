<template>
  <loading v-if="pageRouteState.loading"/>
  <template v-else>
    <div v-if="pageRouteState.userPageData != null">
      <component
          :is="
          !isNaN(pageRouteState.userPageData.mainPageId)
            ? 'MainPageScreen'
            : 'WorkPageScreen'
        "
          :userData="pageRouteState.userPageData"
      ></component>
    </div>
  </template>

  <div v-if="
      !pageRouteState.loading &&
      (pageRouteState.userPageData == null ||
        (pageRouteState.userPageData != null &&
          pageRouteState.userPageData.isHeBlocksMe))
    ">
    <br>
    <br>
    <br>
    <br>
    <ErrorScreen
        :title="'pageNotFound'"
    />
  </div>
</template>
<script lang="ts">
import MainPageScreen from "@/app/unit/pages/mainPage/MainPageScreen.vue";
import WorkPageScreen from "@/app/unit/pages/workPage/WorkPageScreen.vue";
import {defineComponent, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {PageRouteState} from "./PageRouteState";
import ErrorScreen from "@/app/public/shared/errorscreen/ErrorScreen.vue";

export default defineComponent({
  name: "PageRouteScreen",
  components: {
    MainPageScreen,
    WorkPageScreen,
    ErrorScreen,
  },
  setup() {
    const route = useRoute();
    const username = ref("");
    const pageRouteState = ref(new PageRouteState());

    watch(
        () => route.params,
        async (newParams) => {
          if (newParams.username) selectPageId(newParams.username);
        }
    );

    onMounted(() => {
      selectPageId(route.params.username);
    });

    function selectPageId(val) {
      pageRouteState.value.getFullPage(val.toLowerCase());
    }

    return {username, pageRouteState};
  },
});
</script>

<style scoped>
</style>
