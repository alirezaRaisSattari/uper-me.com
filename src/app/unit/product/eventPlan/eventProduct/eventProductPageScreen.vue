<template>
  <div>
    <Header :title="$t('UpgradeTheProductToOccasion')"/>
    <div v-if="state.eventList.length > 0" class="list-controller">
      <div v-for="item in state.eventList" :key="item" v-ripple class="item p-ripple" @click="goTo(item.eventPageId)">
        <div :style="{'background-image':`url(${item.profileImageUrl})`}" class="img"></div>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <template v-else>
      <Lottie :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'" :title="$t('emptyPlans')"/>
    </template>
  </div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import {onMounted, ref} from 'vue';
import {eventProductPageScreen} from './eventProductPageState';
import Ripple from 'primevue/ripple';
import router from '@/core/router/router';
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";

export default {
  components: {
    Header,
    Lottie
  },
  directives: {
    'ripple': Ripple
  },
  setup() {
    const state = ref(new eventProductPageScreen());
    onMounted(() => {
      if (state.value.route.query.pId) {
        state.value.getAllEvents();
      } else {
        router.back();
      }
    })

    const goTo = (path) => {
      router.push(`/eventPagePlanItem/${path}?pId=${state.value.route.query.pId}`);
    }

    return {state, goTo}
  }
}
</script>

<style lang="scss" scoped>
.list-controller {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px;
  margin: 10px 0;

  .item {
    padding: 10px;
    box-shadow: 0 0 5px #b5b5b5;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    min-height: 160px;
    max-height: 160px;
    overflow: hidden;
    width: 50%;
    max-width: 50%;
    border-radius: 10px;
    cursor: pointer;

    .img {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      min-height: 100px;
      max-height: 150px;
      border-radius: 10px;
    }

    span {
      padding: 10px 0;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      overflow: hidden;
    }
  }
}
</style>
