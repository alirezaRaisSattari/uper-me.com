<template>
  <div>
    <video
        :autoplay="autoplay"
        :controls="controls"
        :height="height"
        :width="width"
    >
      <source :src="src" type="video/mp4"/>
    </video>
  </div>
</template>

<script>
export default {
  name: "videoPlayer",
  props: {
    src: {
      type: String,
      required: true,
    },
    autoplay: {
      type: Boolean,
      default: false,
      required: false,
    },
    controls: {
      type: Boolean,
      default: true,
      required: false,
    },
    width: {
      type: Number,
      required: false,
      default: 320,
    },
    height: {
      type: Number,
      required: false,
      default: 240,
    },
  },
};
</script>

<style lang="scss">
</style>
