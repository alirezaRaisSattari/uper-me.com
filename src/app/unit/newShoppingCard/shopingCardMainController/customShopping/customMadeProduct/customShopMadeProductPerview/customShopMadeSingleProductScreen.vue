<template>
  <div class="pb-5">
    <Header :title="$t('customProduct')" />
    <div v-if="productList.length > 0">
      <div class="img-controller" v-if="imgSrc">
        <img :src="`${imgSrc}_sm.webp`" />
      </div>
      <div class="d-flex flex-column pb-5">
        <div class="controller" v-for="item in productList" :key="item">
          <span class="smart-text-align">{{ item.label }} :</span>
          <p class="smart-text-align text-overflow-two-line">
            {{ item.details }}
          </p>
        </div>
      </div>
        <div class="footer-controller" v-if="chackStatus() === 1">
          <Button :loading="loading" @click="callApi(1)" :label="$t('simulation')" />
        </div>
        <div class="footer-controller" v-else-if="chackStatus() === 2">
          <Button :loading="loading" @click="callApi(2)" :label="$t('addToCard')" />
        </div>
        <div class="footer-controller" v-else-if="chackStatus() === 3">
          <Button :loading="loading" @click="callApi(1)" :label="$t('update')" />
          <Button :loading="loading" @click="callApi(6)" :label="$t('delete')" />
        </div>
        <div class="footer-controller" v-else-if="chackStatus() === 4">
          <Button :loading="loading" @click="callApi(3)" :label="$t('confirm')" />
          <Button :loading="loading" @click="callApi(7)" :label="$t('reject')" />
        </div>
        <div class="footer-controller" v-else-if="chackStatus() === 5">
          <Button :loading="loading" @click="callApi(3)" :label="$t('confirm')" />
          <Button :loading="loading" @click="callApi(1)" :label="$t('update')" />
          <Button :loading="loading" @click="callApi(7)" :label="$t('reject')" />
        </div>
    </div>
    <div v-else>
      <loading class="mt-5" />
    </div>
  </div>
</template>

<script lang="ts">
import Header from "@/app/unit/shared/headerApp/headerAppScreen.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ProductRepository } from "@/core/repository/product.repository";
import { getSelectedPageId } from "@/core/service/utils.service";
import { i18n } from "@/main";
import { DateService } from "@/core/service/date.service";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { customShopMadeModel } from '@/data/city/mainpage/factor.modal';
import router from '@/core/router/router';
import { LocalStorageService } from '@/core/service/localStorage.service';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';
export default {
  components: {
    Header,
    ConfirmDialog
  },
  setup() {
    const route = ref(useRoute());
    const productList = ref([]);
    const imgSrc = ref(null);
    const customStatus = ref(0);
    const loading = ref(false);
    const confirm = useConfirm();
    const resData = ref(<customShopMadeModel> null);
    onMounted(() => {
      ProductRepository.getInstance().GetByIdCustomProduct({
        body: {
          myPageId: getSelectedPageId(),
          isBuyer: true,
          customId: Number(route.value.params.customId),
        },
        onReceive: (res:customShopMadeModel) => {
          resData.value = res;
          imgSrc.value = res.mainImageUrl;
          productList.value = [
            { label: i18n.global.tc("name"), details: res.name },
            { label: i18n.global.tc("description"), details: res.description },
            {
              label: i18n.global.tc("status"),
              details: res.customStatus == 1 ? i18n.global.tc("notCheck") : res.customStatus == 2 ? i18n.global.tc("accepted") : i18n.global.tc("notAccepted"),
            },
            {
              label: i18n.global.tc("preparationTime"),
              details: DateService.getInstance().timeDifference(
                res.prepareTime
              ),
            },
            {
              label: i18n.global.tc("cost"),
              details: DataFormatterService.getInstance().formatCurrency(res.price),
            },
            {
              label: i18n.global.tc("maintenanceType"),
              details: statusChecker(res.customStatus),
            },
            {
              label: i18n.global.tc("usedType"),
              details: usedTypeCheck(res.usedType),
            },
            { label: i18n.global.tc("count"), details: res.number },
            {
              label: i18n.global.tc("weightTo", {
                symbol: i18n.global.tc("kg"),
              }),
              details: res.weight,
            },
          ];
          customStatus.value = res.customStatus;
        },
      });
    });
    
    const chackStatus =  () => {
      const cs = customStatus.value;
      const data = resData.value;
      const owner = data.buyerCreator ? data.buyerPageId == getSelectedPageId() : data.workPageId == getSelectedPageId() * -1;
      
      if (cs == 3) {
        return 1;
      } else if (cs == 2) {
        return 2;
      } else if (cs == 1) {
        const rejectedProduct =  data.buyerCreator == false && data.workPageId != Math.abs(getSelectedPageId())
        if (rejectedProduct) {
          return 5;
        } else {
          if (owner) {
            return 3;
          } else {
            return 4;
          }
        }
      }
    }

    const callApi = (key) => {
      const data = resData.value;
      loading.value = true;
      switch (key) {
        case 1:
          LocalStorageService.getInstance().setItem('productData', JSON.stringify(data));
          router.push(`/customProductNotInPerson/${data.customId}`);
          break;
        case 2:
          ProductRepository.getInstance().AddCustomToShoppingCart({
            body:{
              customId: data.customId,
              buyerPageId: data.buyerPageId,
              sellerPageId: data.workPageId
            },onReceive:(res)=>{
              router.back();
              loading.value = false;
            },onError:(err)=>{
              loading.value = false;
            }
          })
          break;
        case 3:
           ProductRepository.getInstance().CustomProductAccept({
                body:{
                    myPageId: getSelectedPageId(),
                    customId: data.customId,
                    modifiedAt: data.modifiedAt
                },onError:(err)=>{
                  loading.value = false;
                },onReceive:(res)=>{
                  loading.value = false;
                  router.back();
                }
              })
          break;
        case 6:
            loading.value = false;
            //todo: in check beshe
            confirm.require({
              // target: event.currentTarget,
              message: i18n.global.tc('deleteStationMessage'),
              icon: 'pi pi-info-circle mx-2',
              acceptClass: 'p-button-danger',
              acceptLabel: i18n.global.tc('yes'),
              rejectLabel: i18n.global.tc('no'),
              accept: () => {
                  ProductRepository.getInstance().CustomProductDelete({
                    body:{
                        myPageId: getSelectedPageId(),
                        isBuyerCreator: data.buyerCreator,
                        customId: data.customId
                    },onError:(err)=>{
                      loading.value = false;
                    },onReceive:(res)=>{
                      loading.value = false;
                      router.back();
                    }
                  })
                }
            });
          break;
        case 7:
            ProductRepository.getInstance().CustomProductReject({
                body:{
                    myPageId: getSelectedPageId(),
                    customId: data.customId,
                    modifiedAt: data.modifiedAt
                },onError:(err)=>{
                  loading.value = false;
                },onReceive:(res)=>{
                  loading.value = false;
                  router.back();
                }
              })
          break;
      }
    }

    

    const usedTypeCheck = (key) => {
      switch (key) {
        case 1:
          return i18n.global.tc("new");
        case 2:
          return i18n.global.tc("stock");
        case 3:
          return i18n.global.tc("fastSend");
        case 4:
          return i18n.global.tc("hotFood");
      }
    };
    const statusChecker = (key) => {
      switch (key) {
        case 1:
          return i18n.global.tc("normal");
        case 2:
          return i18n.global.tc("sensitive");
        case 3:
          return i18n.global.tc("glacier");
        case 4:
          return i18n.global.tc("fastSend");
        case 5:
          return i18n.global.tc("hotFood");
      }
    };

    const accsept = () => {
      ProductRepository.getInstance().CustomProductAccept({
        body: {
          myPageId: getSelectedPageId(),
          customId: Number(route.value.params.customId),
          modifiedAt: new Date().getTime(),
        },
      });
    };

    const reject = () => {
      ProductRepository.getInstance().CustomProductReject({
        body: {
          myPageId: getSelectedPageId(),
          customId: Number(route.value.params.customId),
          modifiedAt: new Date().getTime(),
        },
      });
    };

    return {
      route,
      productList,
      imgSrc,
      accsept,
      reject,
      customStatus,
      chackStatus,
      callApi,
      loading
    };
  },
};
</script>

<style lang="scss" scoped>
.img-controller {
  display: flex;
  width: 100%;
  justify-content: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    margin-top: 10px;
  }
}
.controller {
  display: flex;
  flex-direction: row;
  padding: 8px 10px 0;
  span {
    color: #686868;
    font-size: 14px;
    display: flex;
    white-space: nowrap !important;
    align-items: center;
  }
  p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 50px;
    margin: 0 0 5px;
    font-size: 14px;
    padding: 0 8px;
    text-align: center;
  }
}

.footer-controller {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 0 -1px 5px #b5b5b5;
  background: #fadadd;
  padding: 24px 10px;
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 512px;
  border-radius: 40px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  @media (max-width: 512px) {
    width: 100%;
  }

  button {
    background: #686868 !important;
    border-radius: 25px;
    box-shadow: none !important;
    border: none;
    padding: 8px 25px;
  }
}
</style>
