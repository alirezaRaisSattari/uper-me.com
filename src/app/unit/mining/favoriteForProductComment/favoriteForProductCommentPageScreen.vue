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
            <template v-if="state.miningDetails && state.miningDetails.commentId">
                <template v-if="state.selectedItem.commentId !== state.miningDetails.commentId">
                    <p>{{$t('otherItemMining')}}</p>
                </template>
                <template v-else-if="state.selectedItem.commentId == state.miningDetails.commentId">
                  <p>{{$t('Extracting')}}</p>
                </template>
              </template>
              <template v-else>
                    <Button :label="$t('mine')" class="p-button-rounded no-shadow" @click="state.createMining(state.selectedItem.commentId)"/>
              </template>
          </div>
          <div v-ripple class="item p-ripple">
            <div class="controller">
              <div class="child">
                <img v-lazy="state.selectedItem.mainImageUrl+'_sm.webp'" alt="Cover">
              </div>
              <div class="child">
                <span class="smart-text-align">{{ convertToJalali(state.selectedItem.createdAt) }}</span>
                <span class="smart-text-align">{{$t('notMinedLike', {index: state.selectedItem.numberOfLikes,})}}</span>
                <span class="smart-text-align">{{ $t('product') }} : {{state.selectedItem.name}}</span>
                <span class="smart-text-align">{{ $t('yourComment:') }}{{state.selectedItem.commentText }}</span>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <div v-if="state.time === null && state.onFinish" class="box-mining-main-controller">
        <div class="box-controller">
          <Button :label="$t('depositToAccount')" class="p-button-rounded no-shadow" @click="state.mineTransaction(state.miningDetails.commentId)"/>
          <img src="@/assets/img/svg/miningGetUper.svg"/>
          <span>{{ $t('miningDone') }}</span>
          <span>{{ $t('depositToAccountUper') }}</span>
        </div>
      </div>
      <div v-if="state.time !== null && !state.onFinish" class="box-mining-main-controller">
        <div class="panel-timer">
          {{ state.time }}
        </div>
        <div class="box-controller red">
          <SingleLottie :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/wallet.json'"/>
          <h6>{{ $t('Extracting') }}</h6>
          <span>{{ $t('pleaseWaitToCompleteMining') }}</span>
        </div>
      </div>
      <div v-if="state.miningDetails && state.miningDetails.commentText" class="box-mining-item">
        <div class="child">
          <img v-lazy="state.getLinkMining()" alt="Cover">
        </div>
        <div class="child">
          <span
              class="smart-text-align">{{state.miningDetails.commentText ? state.miningDetails.commentText : $t('noCaption')}}</span>
        </div>
      </div>

      <div class="list-controller">
        <div v-for="item in state.posts" :key="item" v-ripple class="item p-ripple"
             @click="state.dialog = true; state.selectedItem = item">
          <div class="controller">
            <div class="child">
              <img v-lazy="item.mainImageUrl + '_sm.webp'" alt="Cover">
            </div>
            <div class="child">
              <span class="smart-text-align">{{ convertToJalali(item.createdAt) }}</span>
              <span class="smart-text-align">{{$t('notMinedLike', {index: item.numberOfLikes,})}}</span>
              <span class="smart-text-align">{{ $t('product') }} : {{item.name}}</span>
              <span class="smart-text-align">{{ $t('yourComment:') }}{{item.commentText }}</span>
            </div>
          </div>
        </div>
        <loading v-if="state.loading"/>
      </div>
    </div>
    <div v-else>
      <loading v-if="state.loading"/>
      <Lottie v-else :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'" :title="$t('postsNotExist')"/>
    </div>
  </div>
</template>

<script lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {favoriteForProductCommentState} from './favoriteForProductCommentPageState'
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
    const state = ref(new favoriteForProductCommentState());
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
      state.value.getPageMiningTime()
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
      font-size: 13px;
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
      font-size: 14px;
      padding: 8px 0;
      @media (max-width: 400px) {
        font-size: 13px;
      }

      &:nth-child(3) {
        color: #31932e !important;
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
      font-size: 13px;
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
      font-size: 13px;
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
              font-size: 15px;
              color: #5fb365;
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
