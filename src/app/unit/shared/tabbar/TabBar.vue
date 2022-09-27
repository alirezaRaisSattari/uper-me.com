<template>
  <div id="tab-bar" class="bg-white">
    <div class="w-100 px-1">
      <router-link
          v-for="unit in units"
          :key="unit.title"
          :to="unit.route"
          class="text-decoration-none"
          class-active="active"
          exactwatchwatch
      >
        <div
            class="unit-card py-2 my-1 hover-bg-primary user-select-none
            d-flex align-items-center justify-content-start text-muted-color"
        >
          <div class="bg-font-icon mx-2">
            <i class="icon-font icon-primary-color" :class="unit.icon"></i>
          </div>
          {{ $t(unit.title) }}
        </div>
      </router-link>
    </div>


  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Tabbar",
  setup() {
    const units: any[] = [
      {title: "home", route: "/", icon: "uhome"},
      {title: "transport", route: "/transport", icon: "udriver-settings"},
      {
        title: "chat",
        route: `/mainChat`,
        icon: "uchat",
      },
      {title: "new", route: "/new", icon: "ua-new"},
      {title: "orderFood", route: "/food", icon: "uresturant--litlle"},
      {title: "mine", route: "/mining", icon: "ua-money"},
      {title: "consult", route: "/consult", icon: "uconsult5"},
    ];

    return {
      units,
    };
  },
});
</script>

<style scoped>
.router-link-active > * {
  color: var(--icon-primary-color) !important;
}

#tab-bar {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: calc(25% - 60px);
  box-shadow: -1px 0 5px 0 rgb(0 0 0 / 3%);
}

body[dir="ltr"] #tab-bar {
  left: 62px !important;
}

body[dir="rtl"] #tab-bar {
  right: 62px !important;
}

.unit-card {
  width: 100%;
  border-radius: 4px;
  /*box-shadow: 0px 0px 4px 1px #e3e3e3, inset 0px 0px 4px 1px #e3e3e3;*/
  padding: 5px;
  text-align: right;
}

.unit-card:hover {
  color: var(--icon-primary-color) !important;
}

.bg-font-icon {
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  border-radius: 8px;
}

.active-unit-card > * {
  color: #0b2e13;
}
</style>
