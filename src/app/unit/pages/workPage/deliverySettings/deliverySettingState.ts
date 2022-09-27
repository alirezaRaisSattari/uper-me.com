import { FactorRepository } from "@/core/repository/factor.repository";
import { SettingRepository } from "@/core/repository/setting.repository";
import { CacheService } from "@/core/service/cache.service";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { sellerAddress } from "@/data/city/workpage/workPage.model";
import { i18n } from "@/main";

export class deliverySettingState {
    isSendByUper = false;
    isSellerSend = true;
    isBuyerReceive = true;
    uperDeliveryList
    sellerDeliveryList
    buyerDeliveryList
    displayDialog = false
    loadingNum = 0
    loading = true

    loadingFunc() {
        if (this.loadingNum === 3) this.loading = false
    }

    getAllAddress() {
        this.loading = true
        FactorRepository.getInstance().GetUperSendAddress({
            urlContent: {
                pageId: -getSelectedPageId()
            },
            onReceive: (res) => {
                this.loadingNum++
                this.loadingFunc()
                this.uperDeliveryList = res
                if (this.uperDeliveryList) {
                    const cityList = CacheService.getInstance().getCities();
                    const cityName = cityList.find(item => item.id == res.cityId)
                    // this.uperDeliveryList.areaName = `${cityName.cityName} , ${res.areaName}`;
                }
            }
        })

        FactorRepository.getInstance().GetSellerSendAddress({
            urlContent: {
                pageId: -getSelectedPageId()
            },
            onReceive: (res) => {
                this.loadingNum++
                this.loadingFunc()
                this.sellerDeliveryList = res
                if (this.sellerDeliveryList) {
                    const cityList = CacheService.getInstance().getCities();
                    const cityName = cityList.find(item => item.id == res.cityId)
                    // this.sellerDeliveryList.areaName = `${cityName.cityName} , ${res.areaName}`;
                } else {
                    this.sellerDeliveryList = { sellerSendAddress: null }
                }
            }
        })

        FactorRepository.getInstance().GetBuyerReceiveAddress({
            urlContent: {
                pageId: -getSelectedPageId()
            },
            onReceive: (res) => {
                this.loadingNum++
                this.loadingFunc()
                this.buyerDeliveryList = res
                if (this.buyerDeliveryList) {
                    const cityList = CacheService.getInstance().getCities();
                    const cityName = cityList.find(item => item.id == res.cityId)
                    // this.buyerDeliveryList.areaName = `${cityName.cityName} , ${res.areaName}`;
                }
            }
        })
    }
    deleteAddress(num) {
        console.log(num);

        if (num == 2) {
            FactorRepository.getInstance().DeleteSellerSendAddress({
                urlContent: {
                    pageId: -getSelectedPageId()
                },
                onReceive: () => {
                    this.sellerDeliveryList.sellerSendAddress = null
                    this.displayDialog = false
                }
            })
        }
        if (num == 3) {
            FactorRepository.getInstance().DeleteBuyerReceiveAddress({
                urlContent: {
                    pageId: -getSelectedPageId()
                },
                onReceive: () => {
                    this.buyerDeliveryList = null
                    this.displayDialog = false
                }
            })
        }
        if (num == 1) {
            FactorRepository.getInstance().DeleteUperSendAddress({
                urlContent: {
                    pageId: -getSelectedPageId()
                },
                onReceive: () => {
                    this.uperDeliveryList = null
                    this.displayDialog = false
                }
            })
        }
    }
}
