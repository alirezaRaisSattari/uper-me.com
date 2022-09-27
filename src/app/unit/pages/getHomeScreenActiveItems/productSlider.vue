<template>
  <h6 v-if="state.postFiles" class="page-number m-2">
    {{ activeindex }}/{{ state.postFiles.length }};
  </h6>
    <swiper
        :slides-per-view="1"
        :space-between="0"
        class="swiper"
        @slideChange="page1"
    >
      <swiper-slide v-for="(item) in imgs" :key="item">
        <router-link
            :to="'/product/' + state.productId + '/' + state.workPageId"
        >
          <img v-lazy="item" alt="" class="main img" />
        </router-link>
      </swiper-slide>
    </swiper>
</template>

<script>
import "swiper/components/pagination/pagination.scss";
import "swiper/swiper.scss";
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  props: ["state"],
  components: { Swiper, SwiperSlide },
  setup(props) {
    const activeindex = ref(1);
    const videoLoading = ref(true);
    const imgs = ref([]);
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

    onMounted(() => {
      imgs.value.push(props.state.mainImageUrl + "_lg.webp");
      imgs.value.push(...props.state.otherImages);
    });

    return {
      isVideo,
      activeindex,
      downloaded,
      videoLoading,
      page1,
      playPause,
      imgs,
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

.img {
  position: relative;
}

.immidiate-badge {
  position: absolute;
  background-color: red;
  width: 10px;
  height: 10px;
}
</style>
