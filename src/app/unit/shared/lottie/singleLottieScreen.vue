<template>
  <div>
    <div class="lottie-main-controller">
      <lottie-vue ref="lottieVue" :autoplay="true" :height="120" :loop="true" :path="path" :width="120"></lottie-vue>
    </div>
  </div>
</template>

<script>
import LottieVue from "lottie-vue";

export default {
  props: {
    path: String,
  },
  components: {
    LottieVue
  },
}
</script>

<style lang="scss" scoped>
.lottie-main-controller {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
}
</style>
