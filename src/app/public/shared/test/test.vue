<template>
  <input type="button" @click="growDiv()" value="Read more" id="more-button" />

  <div id="grow">
    <div class="measuringWrapper">
      <div class="text">
        Here is some more text: Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Vestibulum vitae urna nulla. Vivamus a purus mi. In hac
        habitasse platea dictumst. In ac tempor quam. Vestibulum eleifend
        vehicula ligula, et cursus nisl gravida sit amet. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const growDiv = () => {
      let growDiv = document.getElementById("grow");
      if (growDiv.clientHeight) {
        growDiv.style.height = 0;
      } else {
        var wrapper = document.querySelector(".measuringWrapper");
        growDiv.style.height = wrapper.clientHeight + "px";
      }
    };
    return {
      growDiv,
    };
  },
};
</script>

<style lang="scss" scoped>
#more-button {
  border-style: none;
  background: none;
  font: 16px Serif;
  margin: 0 0 10px 0;
}

#grow {
  -moz-transition: height 0.5s;
  -ms-transition: height 0.5s;
  -o-transition: height 0.5s;
  -webkit-transition: height 0.5s;
  transition: height 0.5s;
  height: 0;
  overflow: hidden;
}
</style>