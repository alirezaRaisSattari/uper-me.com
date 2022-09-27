<template>
  <!-- <h4>inside story component</h4> -->
  <swiper
      :direction="'horizontal'"
      :free-mode="true"
      :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
      :slides-per-view="'auto'"
      :space-between="3"
      class="mySwiper"
      @reachEnd="getNewStories"
  >
    <swiper-slide v-for="(i,index) in storyList" :key="i.storyId" @click="openStory(index)">
      <img
          v-lazy="i.fileUrl"
          alt="Girl in a jacket"
          class="img rounded-circle image"
          style="object-fit: cover"
      />
      <p>{{ i.caption }}</p>
    </swiper-slide>
  </swiper>

  <Dialog
      v-if="storyList[storysId]"
      v-model:visible="storyDialog"
      :breakpoints="{
        '2000px': '30vw',
        '1000px': '40vw',
        '800px': '60vw',
        '600px': '90vw',
      }"
      :contentStyle="{
        background: 'rgb(255, 255, 255)',
        borderRadius: '12px',
      }"
      :showHeader="false"
      :style="{ padding: '10px', border: 'none', width: 'auto' }"
      dismissableMask
      header=""
      modal
  >

    <div class="w-100 bg-light m-2">
      <div id="myBar" :style="{ width: `${barWidth}%` }" class="bg-secondary color-secondary">‎‎‎</div>
    </div>
    <div class="w-100 d-flex justify-content-between">
      <div class="w-50 text-right px-3">
        <img
            v-lazy="
              storyList[0].pageDetails.profileImageUrl +
              '_sm.webp'
            "
            class="profile-style rounded-circle"
        />
        <span class="mx-2">{{
            storyList[0].pageDetails.username
          }}</span>
      </div>

    </div>

    <img
        v-lazy="storyList[storysId].fileUrl"
        alt=""
        class="object-fit-cover mx-auto story-style w-100"
    />
  </Dialog>

</template>
<script>
import {Swiper, SwiperSlide} from "swiper/vue";
import {onMounted, ref} from "vue";

import "swiper/swiper.scss";

export default {
  name: "Story",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["storyList"],
  emits: ["getNewStoriesEvent"],
  setup(props, {emit}) {
    const storyDialog = ref(false);
    const setTime = ref();
    const barWidth = ref(1)
    const storysId = ref();

    function getNewStories() {
      emit("getNewStoriesEvent");
    }

    function openStory(Id) {
      barWidth.value = 0
      moveprogress();
      storysId.value = Id;
      let duration = 15000;
      storyDialog.value = !storyDialog.value;
      setTime.value = setInterval(() => {
        moveprogress();
        storysId.value += 1;
        if (storysId.value == props.storyList.length) {
          endShowSrory()
        }
      }, duration);
    }

    function moveprogress() {
      var i = 0;
      if (i == 0) {
        i = 1;
        var width = 0;
        barWidth.value = 0

        var id = setInterval(() => {
          if (barWidth.value >= 100) {
            clearInterval(id);
            i = 0;
          } else {
            barWidth.value = barWidth.value + 0.44;

          }
        }, 67);
      }
    }

    function endShowSrory() {
      storyDialog.value = false
      clearInterval(setTime.value);
    }

    onMounted(() => {
      const swiper = document.querySelector(".mySwiper").swiper;
    });
    return {
      getNewStories,
      openStory,
      barWidth,
      storyDialog,
      storysId
    };
  },
};
</script>
<style scoped>
app {
  height: 100%;
}

html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

swiper-container {
  width: 100%;
  height: 44px;
  direction: rtl;
  padding-bottom: 15px !important;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}

/* .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
.swiper-slide img {
  /* width: 100%; */
  /* height: 100%; */
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 22px;
}

.image {
  border: 3px solid white;
  box-shadow: 0 0 5px -1px #575c62;
}

.mySwiper {
  direction: rtl;
}

#myBar {
  height: 1px;
}

.profile-style {
  widows: 45px;
  height: 45px;
}

.story-style {
  height: 450px;
}

</style>
