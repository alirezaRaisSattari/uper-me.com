<template>
  <div>
    <div v-if="state.posts.length !== 0">
      <Dialog v-model:visible="state.finalDialog" :breakpoints="{ '440px': '100vw' }" :contentStyle="{'border-radius':'10px'}" :dismissableMask="true" :modal="true" :position="'center'" :showHeader="false" :style="{width: '100%', 'max-width':'500px','border-radius':'10px'}">
          <div class="final-box">
              <SingleLottie :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/wallet.json'"/>
              <span v-if="state.reservedPrice > 0">{{$t('depositingUperToYourAccount',{price:state.reservedPrice})}}</span>
              <span v-else>{{$t('onDeposit')}}</span>
              <Button :label="$t('confirm')" @click="state.finalDialog = false" />
          </div>
      </Dialog>

      <Dialog v-model:visible="state.dialog" :breakpoints="{ '440px': '100vw' }" :contentStyle="{'border-radius':'10px'}" :dismissableMask="true" :modal="true" :position="'bottom'" :showHeader="false" :style="{width: '100%', 'max-width':'500px','border-radius':'10px'}">
        <div class="box-item-controller">
          <div class="btn-controller">
              <Button :label="$t('mine')" class="p-button-rounded no-shadow" @click="state.mineTransaction(state.selectedItem.reportId)"/>
          </div>
          <div v-ripple class="item p-ripple">
             <div class="controller">
              <div class="child">
                <img v-lazy="state.selectedItem.imageUrl" alt="Cover">
              </div>
              <div class="child">
                <span class="smart-text-align">{{ $filters.jalali(state.selectedItem.createDate , true) }}</span>
                <span class="smart-text-align">{{ $t('subject') }} : {{ state.findSubjectText(state.selectedItem.itemType) }}</span>
                <span v-if="state.selectedItem.answerText" class="smart-text-align"> {{ $t('reply') }} : {{ state.selectedItem.answerText }}  </span>
                <span class="smart-text-align">{{ $t('description') }} : {{ state.selectedItem.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <div class="list-controller">
        <div v-for="item in state.posts" :key="item" v-ripple class="item p-ripple"
             @click="state.dialog = true; state.selectedItem = item">
          <div class="controller">
            <div class="child">
              <img v-lazy="item.imageUrl" alt="Cover">
            </div>
            <div class="child">
              <span class="smart-text-align">{{ $filters.jalali(item.createDate , true) }}</span>
              <span class="smart-text-align">{{ $t('subject') }} : {{ state.findSubjectText(item.itemType) }}</span>
              <span v-if="item.answerText" class="smart-text-align"> {{ $t('reply') }} : {{ item.answerText }}  </span>
              <span class="smart-text-align">{{ $t('description') }} : {{ item.description }}</span>
            </div>
          </div>
        </div>
        <loading v-if="state.loading"/>
      </div>
    </div>
    <div v-else>
      <Lottie :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'"
              :title="$t('noResultsFound')"/>
    </div>
  </div>
</template>

<script lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {reportMiningPageState} from './reportMiningPageState'
import {ScrollController} from '@/core/service/scroll.service';
import {DateService} from '@/core/service/date.service';
import Ripple from 'primevue/ripple';
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";
import SingleLottie from "@/app/unit/shared/lottie/singleLottieScreen.vue";
import CountdownClock from "@/app/unit/shared/countdownClock/countdownClockScreen.vue";

export default {
  directives: {
    'ripple': Ripple
  },
  components: {
    Lottie,
    SingleLottie,
    CountdownClock
  },
  setup() {
    const state = ref(new reportMiningPageState());
    const selectedItem = ref(null);
    let scrollCtrl = new ScrollController(onScroll);

    function onScroll() {
      state.value.getAllPostMining();
    }

    onBeforeUnmount(() => {
      scrollCtrl.removeListen();
    });


    onMounted(() => {
      state.value.getAllPostMining();
      scrollCtrl.startListen();
    });


    const convertToJalali = (date) => {
      return DateService.getInstance().convertToJalali(date)
    }

    return {
      state,
      convertToJalali,
      selectedItem
    }
  }
}
</script>

<style lang="scss" scoped>
.box-mining-main-controller {
  display: flex;
  flex-direction: column;
  padding: 20px 15px 10px;
  justify-content: center;

  .box-controller {
    border-radius: 10px;
    border: 2px solid #00accc;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      position: relative;
      max-width: 150px;
      z-index: 2;
      top: -20px;
      font-size: 14px;
      padding: 8px 35px;
      background: #00accc;
      border: none;
    }

    img {
      width: 150px;
      height: 100px;
      position: relative;
      top: -8px;
    }

    span {
      font-size: 15px;
      padding: 8px 0;
      @media (max-width: 400px) {
        font-size: 14px;
      }

      &:nth-child(3) {
        padding-bottom: 0;
      }
    }
  }

  .box-controller.red {
    border-radius: 10px;
    box-shadow: 0 0 3 #b5b5b5;
    display: flex;
    flex-direction: column;
    align-items: center;

    h6 {
      color: red;
    }

    button {
      position: relative;
      max-width: 150px;
      z-index: 2;
      top: -20px;
      font-size: 14px;
      padding: 8px 35px;
      background: #00accc;
      border: none;
    }

    img {
      width: 150px;
      height: 100px;
      position: relative;
      top: -8px;
    }

    span {
      font-size: 15px;
      padding: 8px 0;
      color: #212121 !important;
    }
  }

}

.list-controller, .box-item-controller {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 60px;

  .btn-controller {
    padding: 0 0 10px;
    text-align: center;

    button {
      background: #00accc;
      border: none;
      font-size: 14px;
      padding: 8px 35px;
      background: #00accc;
      max-width: 150px;
      border: none;
    }
  }

  .item {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 5px #b5b5b5;
    margin-bottom: 8px;
    cursor: pointer;
    font-size: 14px;

    .controller {
      display: flex;
      flex-direction: row;

      .child {
        display: flex;
        flex-direction: column;

        &:last-child {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          span {
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:nth-child(2) {
              font-size: 14px;
            }

            &:nth-child(3) {
              padding-top: 5px;
            }
          }
        }

        padding: 10px;

        img {
          width: 120px;
          height: 120px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border-radius: 10px;
        }
      }
    }
  }
}

.panel-timer {
  background: #fff;
  box-shadow: 0 0 5px #b5b5b5;
  position: relative;
  z-index: 10;
  top: 14px;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  color: #595959;
}

.box-mining-item {
  display: flex;
  flex-direction: row;
  padding: 5px 20px 0;

  .child {
    width: 100%;

    span {
      width: 100%;
      display: flex;
      padding: 5px;
      align-items: center;
      height: 100%;
    }

    &:first-child {
      width: 60px;
    }

    img {
      border-radius: 5px;

      width: 50px;
      height: 50px;
    }
  }

}

.final-box {
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-items: center;
  span {
    margin: 10px 0;
  }

  button {
    background: #00accc !important;
    width: 150px;
    padding: 8px;
    border-radius: 10px;
    border: none;
  }
}
</style>
