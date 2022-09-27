<template>
  <div>
    <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
            :slides-per-view="'auto'" :space-between="15"
            class="slider">
      <swiper-slide v-for="item in tabs" :key="item" class="pt-2 mt-1" style="cursor: pointer">
        <router-link :to="item.path">
          <Button :class="item.path === route.path ? 'active-route':''" :label="item.label"
                  class="p-button-text p-button-plain no-shadow"/>
        </router-link>
      </swiper-slide>
    </swiper>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue'
import {i18n} from '@/main'
import {useRoute} from 'vue-router'

export default {
  setup() {
    const route = ref(useRoute());

    const tabs = ref([
      {label: i18n.global.tc('customProducts'), path: '/custom'},
      {label: i18n.global.tc('shoppingCart'), path: '/shoppingCart'},
      {label: i18n.global.tc('shoppingHistory'), path: '/shoppingHistory'},
      {label: i18n.global.tc('returnedHistory'), path: '/returnedHistory'},
      {label: i18n.global.tc('freeVouchers'), path: '/freeVouchers'},
    ]);
    return {tabs, route}
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  list-style: none;
  padding-right: 0;
  /*width: 506px !important;*/
}

.swiper-slide {
  width: auto !important;
  padding: 3px !important;
}

.active-route {
  border-radius: 0 !important;
  border-bottom: 2px solid #131313 !important;
}
</style>
