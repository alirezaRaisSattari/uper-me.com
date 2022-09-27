<template>
  <div class="position-relative">
    <div class="triangle-right"></div>
  </div>
  <img alt="" class="top-icon" src="@/assets/img/svg/icon_Judiciary.svg"/>
  <span class="cort-text">قوه قضاییه</span>
  <div
      class="
      w-100
      h-100
      d-flex
      flex-column
      align-items-center
      justify-content-center
      items-holder
    "
  >
    <div class="w-50 d-flex flex-wrap justify-content-between my-2">
      <div
          v-for="i in 4"
          :key="i"
          class="
          items
          d-flex
          flex-column
          align-items-center
          hover-pointer
          py-1
          my-2
        "
      >
        <img class="item-img" src="@/assets/img/svg/icon_Judiciary.svg"/>
        <span class="mt-2">{{ $t("cort") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.triangle-right {
  width: 100%;
  height: 294px;
  background: hsl(354deg 58% 86%);
  -webkit-clip-path: polygon(100% 0, 100% 19%, 0 68%, 0 0);
  clip-path: polygon(100% 0, 100% 29%, 0 100%, 0 0);
  position: absolute;
  top: 0;
}

.top-icon {
  position: absolute;
  width: 139px;
  z-index: 100;
  left: 38px;
  top: 40px;
}

.items {
  width: 45%;
  background: #fff;
  border-radius: 36px 36px 18px 18px;
  box-shadow: 0 0 4px 1px #f1bdc2;
}

.item-img {
  width: 80px;
}

.cort-text {
  position: absolute;
  right: 47px;
  font-size: 31px;
  top: 37px;
  color: #fff;
}

.items-holder {
}
</style>
