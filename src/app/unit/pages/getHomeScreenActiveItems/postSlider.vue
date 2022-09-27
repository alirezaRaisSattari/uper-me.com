<template>
  <h6 v-if="postFiles" class="page-number m-2">
    &nbsp; {{ activeindex }}/{{ postFiles.length }}&nbsp;
  </h6>
  <!-- <span class="text-dark">{{ postFiles }}</span> -->
  <swiper
      :slides-per-view="1"
      :space-between="0"
      class="swiper"
      @slideChange="page1"
  >
    <swiper-slide v-for="(item, index) in postFiles" :key="item">
      <img v-if="item.isImage" v-lazy="item.fileUrl" alt="" class="main"/>
      <loading v-if="!item.isImage && videoLoading"/>
      <video
          v-if="!item.isImage"
          :id="`video${index}`"
          :src="`${item.fileUrl}`"
          autoplay
          class="videos"
          loop
          muted
          @click="playPause(`video${index}`)"
          @loadeddata="downloaded"
      ></video>
      <loading/>
    </swiper-slide>
  </swiper>
</template>

<script>
import "swiper/components/pagination/pagination.scss";
import "swiper/swiper.scss";
import {ref, onMounted} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  props: {
    postFiles: {
      type: Array
    }
  },
  components: {Swiper, SwiperSlide},
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
