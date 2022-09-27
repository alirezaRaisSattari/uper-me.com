<template>
  <h1 @click="showMultiImageVeiwer = true">temp</h1>
  <div id="zoom-img" ref="zoomimg" class="zoom-img">
    <img src=@/assets/img/uper.png>
  </div>

  <multiImageVeiwer
      :header="$t('logOut')"
      :icon="'fa fa-exclamation-triangle'"
      :text="$t('log-out-of-your-account')"
      :visible="showMultiImageVeiwer"
      @times="showMultiImageVeiwer = false"
  />
</template>

<script lang="ts">
import multiImageVeiwer from "./multiImageVeiwer.vue";
import {ref} from "vue";

export default {
  components: {multiImageVeiwer},
  setup() {
    const showMultiImageVeiwer = ref(false);
    const zoomimg = ref(null);

    // CREDITS TO https://www.cssscript.com/image-zoom-pan-hover-detail-view/
    // var addZoom = function (target) {
    //   // (A) FETCH CONTAINER + IMAGE
    //   var container = document.getElementById(target),
    //       imgsrc = (container ).style || window.getComputedStyle(container as Element, null),
    //       // imgsrc = imgsrc.backgroundImage.slice(4, -1).replace(/"/g, ""),
    //       img = new Image();

    //   // (B) LOAD IMAGE + ATTACH ZOOM
    //   img.src = imgsrc;
    //   img.onload = function () {
    //     var imgWidth = img.naturalWidth,
    //         imgHeight = img.naturalHeight,
    //         ratio = imgHeight / imgWidth,
    //         percentage = ratio * 100 + '%';

    //     // (C) ZOOM ON MOUSE MOVE
    //     container.onmousemove = function (e) {
    //       var boxWidth = container.clientWidth,
    //           rect = e.target.getBoundingClientRect(),
    //           xPos = e.clientX - rect.left,
    //           yPos = e.clientY - rect.top,
    //           xPercent = xPos / (boxWidth / 100) + "%",
    //           yPercent = yPos / ((boxWidth * ratio) / 100) + "%";

    //       Object.assign(container.style, {
    //         backgroundPosition: xPercent + ' ' + yPercent,
    //         backgroundSize: imgWidth + 'px'
    //       });
    //     };

    //     // (D) RESET ON MOUSE LEAVE
    //     container.onmouseleave = function (e) {
    //       Object.assign(container.style, {
    //         backgroundPosition: 'center',
    //         backgroundSize: 'cover'
    //       });
    //     };
    //   }
    // };

    // window.addEventListener("load", function(){
    //   addZoom("zoom-img");
    // });

    return {
      showMultiImageVeiwer,
      zoomimg,
    };
  },
};
</script>

<style scoped>
#zoom-img {
  width: 600px;
  height: 338px;
  /* background: url("@/assets/img/uper.png"); */
  background-position: center;
  background-size: cover;
}
</style>
