<template>
  <h6
    class="page-number m-2 p-1 px-2 hover-context-menu"
    v-if="state.postFiles"
  >
    {{ activeindex }}/{{ state.postFiles.length }}
  </h6>

  <swiper
    :slides-per-view="1"
    :space-between="0"
    class="swiper user-select-none"
    @slideChange="page1"
  >
    <swiper-slide v-for="(item, index) in state.postFiles" :key="item">
      <img
        v-if="item.isImage"
        v-lazy="item.fileUrl"
        alt=""
        class="main user-select-none"
      />
      <loading v-if="!item.isImage && videoLoading" />
      <video
        v-if="!item.isImage"
        :id="`video${index}`"
        class="videos"
        loop
        @click="playPause(`video${index}`)"
        @loadeddata="downloaded"
      >
        <source :src="`${item.fileUrl}`" type="video/mp4" />
      </video>
      <loading />
    </swiper-slide>
  </swiper>
</template>
<script>
import "swiper/components/pagination/pagination.scss";
import "swiper/swiper.scss";
import { ref, onMounted, onBeforeMount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  props: ["state"],
  components: { Swiper, SwiperSlide },
  setup(props) {
    const activeindex = ref(1);
    const videoLoading = ref(true);
    const myVideo = ref();
    const otherMyVideo = ref();
    const page1 = (sw) => {
      otherMyVideo.value = document.getElementsByTagName(`video`);
      otherMyVideo.value.forEach((e) => {
        e.pause();
      });
      myVideo.value = document.getElementById(`video${sw.activeIndex}`);
      if (myVideo.value) myVideo.value.play();
      activeindex.value = sw.activeIndex + 1;
    };
    const isVideo = false;

    const downloaded = () => {
      videoLoading.value = false;
      myVideo.value = document.getElementById(`video${0}`);
      myVideo.value.muted = true;
      myVideo.value.play();
    };
    const playPause = (event) => {
      myVideo.value = document.getElementById(event);
      if (myVideo.value.muted) myVideo.value.muted = false;
      else myVideo.value.muted = true;
    };

    return {
      isVideo,
      activeindex,
      downloaded,
      videoLoading,
      page1,
      playPause,
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
</style>
