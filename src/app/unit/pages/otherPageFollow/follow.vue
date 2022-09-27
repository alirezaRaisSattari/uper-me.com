<template>
  <ul class="nav nav-justified nav-tabs text-center p-0">
    <li class="nav-item hover-pointer" @click="changeUnit(1)">
      <div :class="unit == 1 ? 'active' : ''" class="nav-link text-sm">
        {{ $t("followers") }}
      </div>
    </li>
    <li class="nav-item hover-pointer" @click="changeUnit(2)">
      <div :class="unit == 2 ? 'active' : ''" class="nav-link text-sm">
        {{ $t("followings") }}
      </div>
    </li>
  </ul>
  <div v-show="unit == 2">
    <following :pageId="pageId"></following>
  </div>
  <div v-show="unit == 1">
    <follower :pageId="pageId"></follower>
  </div>
</template>

<script>
import follower from "./follower/follower.vue";
import following from "./following/following";
import router from "../../../../core/router/router";
import {useRoute} from "vue-router";
import {ref} from "vue";

export default {
  name: "follow",
  components: {following, follower},
  setup() {
    const changeUnit = (unitPage) => {
      unit.value = unitPage
      router.push(`/otherFollow/${route.params.username}/${unitPage}/${route.params.pageId}`)
    }

    const route = useRoute();
    const unit = ref(1)
    const pageId = ref(1)
    unit.value = route.params.followerOrFollowing;
    pageId.value = route.params.pageId;
    return {
      unit,
      pageId,
      changeUnit
    }
  }
}

</script>

<style scoped>

</style>