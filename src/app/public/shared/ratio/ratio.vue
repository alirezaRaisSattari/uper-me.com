<template>
  <div
      :class="
        ratioNum === 1
          ? 'wrapperOne'
          : ratioNum === 2
          ? 'wrapperTwo'
          : ratioNum === 3
          ? 'wrapperTree'
          : ratioNum === 4
          ? 'wrapperTree'
          : ''


      "
      class="spacialCard"
  >
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";

export default {
  props: ["ratio"],
  setup(props) {
    const ratioNum = ref(null);
    switch (props.ratio) {
      case "1/1":
        ratioNum.value = 1;
        break;
      case "16/9":
        ratioNum.value = 2;
        break;
      case "4/3":
        ratioNum.value = 3;
        break;
      case "3/2":
        ratioNum.value = 4;
        break;
    }
    return {ratioNum};
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}

.wrapperOne {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
}

.wrapperOne:after {
  padding-top: 100%;
  display: block;
  content: "";
}

.wrapperTwo {
  width: 100%;
  display: inline-block;
  position: relative;
}

.wrapperTwo:after {
  padding-top: 56.25%;
  display: block;
  content: "";
}

.wrapperTree {
  width: 100%;
  display: inline-block;
  position: relative;
}

.wrapperTree:after {
  padding-top: 75%;
  display: block;
  content: "";
}

.wrapperFour {
  width: 100%;
  display: inline-block;
  position: relative;
}

.wrapperFour:after {
  padding-top: 62.5%;
  display: block;
  content: "";
}
.spacialCard{
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
