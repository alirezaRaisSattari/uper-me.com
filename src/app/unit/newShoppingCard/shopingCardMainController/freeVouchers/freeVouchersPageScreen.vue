<template>
  <div class="mt-2 has-fixed-footer">
    <ConfirmDialog  :icon="'fas fa-exclamation-triangle'" :text="$t('thisFreeBinCanNotBeUsedUntil' , {date:$filters.jalali(selectedDate)})" :textSize="'14px'" :visible="showDialog"
        :acceptLabel="$t('confirm')" :showReject="false" @accept="showDialog = false" :status="'warning'" @times="showDialog = false"/>

    <div class="gift-list-item" v-for="item in list" :key="item">
        <div class="item-controller" >
            <div class="controller">
                <div class="child-controller justify-content-start" @click="$function.goTo(`/page/${item.pageUtilsSeller.username}`)">
                    <div class="child">
                        <img v-lazy="item.pageUtilsSeller.profileImageUrl + '_sm.webp'" >
                    </div>
                    <div class="child mx-2">
                        <span>{{item.pageUtilsSeller.name}}</span>
                        <span>{{item.pageUtilsSeller.username}}</span>
                    </div>
                </div>
                <div class="child-controller">
                    <Button :class="item.used == 3 ? 'red' : item.used == 2 ? 'green': 'orange'"  @click="item.used == 1 ? initDialog(item) :null" :label="item.used == 3 ?  $t('used') : item.used == 2 ? $t('usable') : $t('impossibilityOfUse')" />
                    <div class="child">
                        <span class="px-2">{{'UFG_'+item.giftId}}</span>
                        <div class="d-flex flex-row">
                            <span>{{$t('cost-alt')}} : </span>
                            <span>{{$filters.currency(item.cost)}}</span>
                            <currency class="mx-2" :currencyId="item.currencyId"></currency>
                        </div>
                    </div>
                </div>
            </div>
            <div class="controller">
                <div class="child">
                    <span>{{$t('expire_Days')}} : </span>
                    <span>{{$filters.jalali(item.expiredAt)}}</span>
                </div>
                <div class="child">
                    <Button :label="`UF_${item.factorId} : ${$t('factorNumber')}`" @click="$function.goTo(`/factorDetails/${item.factorId}`)" class="p-button-link no-shadow" />
                </div>
            </div>
        </div>
    </div>
    <loading v-if="loading" />
    <Lottie v-if="(!list || list.length == 0) && !loading" :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'" :title="$t('emptyList')"/>
  </div>
</template>

<script lang="ts">
import { ref , onMounted } from "vue";
import { FactorRepository } from '@/core/repository/factor.repository';
import { getSelectedPageId } from '@/core/service/utils.service';
import currency from "@/app/public/shared/currency/Currency.vue";
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";
import { DateService } from '@/core/service/date.service';
import ConfirmDialog from '@/app/public/shared/confirmDialog/ConfirmDialog.vue';

export default {
  components:{
    currency,
    Lottie,
    ConfirmDialog
  },
  setup() {
    const list = ref([]);
    const loading = ref(false);
    const selectedDate = ref(null)
    const showDialog = ref(false)
    onMounted(() => {
        loading.value = true;
        FactorRepository.getInstance().GiftCardGetMyGiftCards({
            urlContent:getSelectedPageId(),
            onReceive:(res)=>{
                loading.value = false;
                list.value = res;
                list.value.map(item => convertUsedType(item));
            },onError:(err)=>{
                loading.value = false;
                console.log(err);
            }
        })
    });

    const initDialog = (item) => {
        showDialog.value = true;
        selectedDate.value = item.expiredAt;
        console.log(selectedDate.value);
        
    }

    const convertUsedType = (item) => {
      if (item.factorStatus == 8) {
        if ((DateService.getInstance().dayTimeDifference(item.factorModifiedAt))) {
          item.used = 1;
        }
      } else if (item.factorStatus != 12) {
        item.used = 1;
      }
      return item;
    }

    return {
        list,
        loading,
        selectedDate,
        showDialog,
        initDialog
    }
  }
}
</script>

<style lang="scss" scoped>
.gift-list-item {
    min-width: 320px;
    padding: 0 10px;
    margin-bottom: 10px;
    .item-controller {
        display: flex;
        flex-direction: column;
        border-radius: 8px ;
        box-shadow: 0 0 5px #b5b5b5;
        padding: 5px;
        cursor: pointer;
        transition: .6s;
        background: #fff;
        position: relative;
        z-index: 9;
       
        &:hover {
            background: #eee;
        }
        .controller {
            display: flex;
            flex-direction: row;
            &:last-child {
                padding: 10px;
                font-size: 13px;
                border-top: 1px solid #b5b5b5;
                justify-content: space-between;
                .child {
                    span {
                        &:first-child {
                            color: #686868;
                        }
                    }
                    button {
                        font-size: 13px;
                        padding: 0;
                        direction: ltr;
                        text-decoration: underline;
                    }
                }
            }
            .child-controller {
                display: flex;
                flex-direction: row;
                width: 50%;
                justify-content: space-evenly;
                height: 80px;
                align-items: center;
                padding-top: 10px;

                &:last-child {
                    justify-content: flex-end;
                    text-align: left;
                    position: relative;
                    align-items: center;
                    button {
                        border-top-left-radius: 8px;
                        border: none;
                        position: absolute;
                        top: -4px;
                        left: -4px;
                        font-size: 13px;
                        padding: 3px 15px;
                        &.green {
                          background: #098800;
                        }
                        &.red {
                          background: #f45967;
                        }
                        &.orange {
                          background: #ffa000;
                        }
                    }
                }
                .child {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    font-size: 14px;
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
</style>
