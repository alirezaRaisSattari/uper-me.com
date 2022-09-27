<template>
  <div>
    <div class="main-header-controller">
      <div class="left-side">
        <ActivityLevel :value="state.activityLevelValue" />
      </div>
      <div class="right-side">
        <div class="child">
          <span>{{ profile.name }}</span>
          <span>{{ profile.username }}</span>
        </div>
        <div class="child">
          <img v-lazy="profile.profileUrl+'_sm.webp'" alt="avart">
          <img class="creditLevel" v-if="profile.creditLevel == 1 || profile.creditLevel == 2" v-lazy="profile.creditLevel == 1 ? require('@/assets/img/ic_crown_golden.svg') : profile.creditLevel == 2 ? require('@/assets/img/ic_crown_grey.svg') : null">
        </div>
      </div>
    </div>
    <div class="main-sub-header-controller smart-text-align">
      <span>{{ $t('miningUperFromYourActivities') }}</span>
      <swiper :direction="'horizontal'" :free-mode="true" :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
            :slides-per-view="'auto'" :space-between="15"
            class="d-none">
      </swiper>
    </div>
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
    <router-view/>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import {mainControllerPageState} from './mainControllerPageState'
import {getSelectedPageData, getSelectedPageId} from '@/core/service/utils.service';
import {useRoute} from 'vue-router';
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";
import {i18n} from '@/main';
import ActivityLevel from '@/app/unit/shared/icons/activityLevel/activityLevelScreen.vue'

export default {
  components: {
    Lottie,
    ActivityLevel
  },
  setup() {
    const profile = ref(getSelectedPageData());
    const state = ref(new mainControllerPageState());
    const route = ref(useRoute());

    const tabs = ref([
     
    ]);

    onMounted(() => {
      if (getSelectedPageId() > 0) {
        tabs.value = [
          {label: i18n.global.tc('myPosts'), path: '/myPost'},
          {label: i18n.global.tc('favoriteForPostComment'), path: '/postCommentMining'},
          {label: i18n.global.tc('favoriteForProductComment'), path: '/favoriteForProductComment'},
          {label: i18n.global.tc('favoriteForPageComment'), path: '/pageCommentMining'},
          {label: i18n.global.tc('BugsOperatorReport'), path: '/reportMining'},
        ];
      } else {
         tabs.value = [
          {label: i18n.global.tc('myPosts'), path: '/myPost'},
          {label: i18n.global.tc('my_products'), path: '/myProductsMining'},
          {label: i18n.global.tc('favoriteForPostComment'), path: '/postCommentMining'},
          {label: i18n.global.tc('favoriteForProductComment'), path: '/favoriteForProductComment'},
          {label: i18n.global.tc('favoriteForPageComment'), path: '/pageCommentMining'},
          {label: i18n.global.tc('BugsOperatorReport'), path: '/reportMining'},
        ];
      }
      state.value.getActivityLevel();
    });

  

    return {
      profile,
      state,
      tabs,
      route
    }
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

.main-header-controller {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: 0 0 5px #b5b5b5;
  padding: 10px;

  .right-side {
    display: flex;
    flex-direction: row-reverse;

    .child {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      position: relative;
      &:nth-child(1) {
        margin-right: 15px;
      }

      span {
        text-align: center;

        &:first-child {
          padding: 3px 5px 0px;
          text-align: right;
        }

        &:last-child {
          padding-top: 5px;
        }
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

  }

  .left-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
      text-align: center;

      &:first-child {
        background: #ffab08;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: #212121;
        border-radius: 50%;
        padding-top: 3px;
        position: relative;
        top: -6px;
      }

      &:last-child {
        font-size: 13px;
      }
    }
  }
}

.main-sub-header-controller {
  padding: 5px;

  span {
    padding: 10px 5px;
    font-size: 13px;
    width: 100%;
    display: block;
    border-bottom: 1px solid #c4c4c4;
  }
}

Button {
  font-size: 14px;
}

.creditLevel {

  margin-top: 8px;
  margin-right: 10px;
  position: absolute !important;
  width: 30px !important;
  height: 30px !important;
  background: transparent !important;
  top: 20px !important;
  right: 20px !important;
}
</style>
