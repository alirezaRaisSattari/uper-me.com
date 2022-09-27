<template>
  <div class="footer mx-auto d-flex justify-content-center align-items-center" id="uper-form-footer">
    <slot></slot>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted } from "vue";
export default {
  name: "bottomBar",
  props: ['bgcolor'],
  setup(props) {
    onMounted(() => {
      let bottomBar = document.getElementById("uper-bottom-bar");
      if (bottomBar) {
        bottomBar.style.display = "none";
        bottomBar.style.visibility = "hidden";
        bottomBar.style.zIndex = '100';
      }
    });

    onBeforeUnmount(() => {
      let bottomBar = document.getElementById("uper-bottom-bar");
      if (bottomBar) {
        bottomBar.style.display = "flex";
        bottomBar.style.visibility = "visible";
        bottomBar.style.zIndex = '100';
      }
    });
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  z-index: 100 !important;
  left: calc(50% - 255px);
  background: #ffffff;
  border-radius: 42px 42px 0 0;
  box-shadow: 1px 1px 10px #58585887;
  height: 55px;
  max-width: 510px;
  min-width: 510px;
}

@media (max-width: 512px) {
  .footer {
    max-width: 98vw;
    min-width: 98vw;
    left: 2px;
  }
}
</style>
