<template>
  <div v-if="selectedTab == 2" class="text-center mt-3">
    <div class="text-center w-50 mx-auto">
      <select
          id="storySelect"
          v-model="state.storyType"
          class="select-box w-100 smart-text-align"
          name="storySelect"
          @change="storySelectChange"
      >
        <option :value="null">{{ $t("all") }}</option>
        <option value="1">{{ $t("consultHome") }}</option>
        <option value="2">{{ $t("cityHome") }}</option>
        <option value="3">{{ $t("productSearch") }}</option>
        <option value="4">{{ $t("pageSearch") }}</option>
        <option value="5">{{ $t("hashtagSearch") }}</option>
      </select>
    </div>
    <div
        v-for="(story, index) in state.allStories"
        class="bg-light d-flex p-2 product mt-3 uper-card-1"
        @click="openStory(index)"
    >
      <div>
        <img v-lazy="story.fileUrl" class="story-img m-1" />
        <div>{{ story.caption }}</div>
      </div>
      <div class="smart-text-align mx-2">
        <div>{{ returnStoryTypeText(story.type) }}</div>
        <div>sara</div>
      </div>
    </div>
  </div>


</template>

<script>
 import { ref, onMounted } from "vue";
 import { UpgradedState } from "@/app/unit/product/upgraded/upgradedState";
 import Currency from "@/app/public/shared/currency/Currency.vue";
 import { DateService } from "@/core/service/date.service";
 // import { i18n } from "../../../../main";
export default {

  name: "storypage",
  setup(){
    const selectedTab = ref(1);
    const state = ref(new UpgradedState());
    const storysId = ref();
    const storyDialog = ref(false);
    const setTime = ref();
    const barWidth = ref(1);
  return{
    selectedTab,
    state,
    storysId,
    storyDialog,
    setTime,
    barWidth,
  }
  }


}
</script>

<style scoped>

</style>