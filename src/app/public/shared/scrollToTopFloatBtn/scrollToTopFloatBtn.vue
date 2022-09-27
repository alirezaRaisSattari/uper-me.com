<template>
  <div
      :class="'animate__animated ' + (!scrollToTopDisply ? 'animate__fadeOut' : 'animate__fadeIn')"
      class="
      float-btn
      d-flex
      justify-content-center
      align-content-center
      hover-pointer
    "
      @click="scrollToTopFunc()"
  >
    <i class="fas fa-chevron-up m-auto"></i>
  </div>
</template>

<script>
import {scrollToTop} from "@/core/service/scroll.service";
import {onUnmounted} from "@vue/runtime-core";
import {ref} from "vue";

export default {
  setup() {
    const scrollToTopDisply = ref(false);
    window.addEventListener("scroll", displyFunc);

    function displyFunc() {
      if (
          document.documentElement.scrollTop > 300 ||
          window.scrollY > 300 ||
          document.body.scrollTop > 300
      ) {
        scrollToTopDisply.value = true;
      }
      if (
          (document.documentElement.scrollTop < 299 &&
              document.documentElement.scrollTop != 0) ||
          (window.scrollY < 299 && window.scrollY != 0) ||
          (document.body.scrollTop < 299 && document.body.scrollTop != 0)
      ) {
        scrollToTopDisply.value = false;
      }
    }

    onUnmounted(() => {
      window.removeEventListener("scroll", displyFunc);
    });

    function scrollToTopFunc() {
      scrollToTop();
    }

    return {
      scrollToTopFunc,
      scrollToTopDisply,
    };
  },
};
</script>

<style>
.height {
  height: 2000px;
}
</style>
