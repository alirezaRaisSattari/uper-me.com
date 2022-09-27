<template>
  <h6 class="page-number m-2">
    &nbsp; {{ activeindex }}/{{ state.postFiles.length }}&nbsp;
  </h6>

  <swiper
    :pagination="{ clickable: true }"
    :slides-per-view="1"
    :space-between="0"
    @slideChange="page1"
    class="h-100 w-100 swiper-dir"
    style="border-radius: 6px; background-color: #ffffff"
    @activeIndexChange="getActiveIndex"
  >
    <swiper-slide v-for="(item, index) in state.postFiles" :key="item">
      <img v-if="item.isImage" v-lazy="item.fileUrl" alt="" class="main" />
      <loading v-if="!item.isImage && videoLoading" />
      <video
        v-if="!item.isImage"
        :id="`video${index}`"
        :src="`${item.fileUrl}`"
        autoplay
        class="videos"
        loop
        @click="playPause(`video${index}`)"
        @loadeddata="downloaded"
      ></video>
      <loading />
    </swiper-slide>
  </swiper>
</template>
<script>
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/swiper.scss";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  props: ["state"],
  components: { Swiper, SwiperSlide },
  setup(props) {
    const activeindex = ref(1);
    const videoLoading = ref(true);
    const page1 = (sw) => {
      activeindex.value = sw.activeIndex + 1;
    };
    const isVideo = false;
    const myVideo = ref();

    const downloaded = () => {
      videoLoading.value = false;
    };

    const playPause = (event) => {
      myVideo.value = document.getElementById(event);
      if (myVideo.value.paused) myVideo.value.play();
      else myVideo.value.pause();
    };

    return {
      videoLoading,
      activeindex,
      isVideo,
      downloaded,
      playPause,
      page1,
    };
  },
};
</script>
<style scoped>
.main {
  z-index: 4;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.videos {
  width: 100%;
  height: 100%;
}

.page-number {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  position: absolute;
  z-index: +5;
  color: #2d3748;
}

.swiper {
  border-radius: 10px;
  width: 100%;
}
.page-number {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  position: absolute;
  z-index: +5;
  color: #2d3748;
}

.swiper-slide {
  margin-left: 0 !important;
  margin-right: 0 !important;
  direction: rtl !important;
}

.max-size {
  max-width: 512px;
  max-height: 512px;
}
</style>
