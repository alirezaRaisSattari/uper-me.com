<template>
  <div>
    <div class="lottie-main-controller">
      <lottie-vue ref="lottieVue" :autoplay="true" :height="size ?? 120" :loop="true" :path="path" :width="size ?? 120"></lottie-vue>
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
import LottieVue from "lottie-vue";

export default {
  props: {
    path: String,
    title: String,
    size: Number
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
  padding: 30px 15px;
  span {
    font-size: 15px;
    @media (max-width:376px) {
      font-size: 13px;
    }
  }
}
</style>
