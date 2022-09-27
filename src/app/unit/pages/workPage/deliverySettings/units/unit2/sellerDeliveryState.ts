import { FactorRepository } from "@/core/repository/factor.repository";
import { SettingRepository } from "@/core/repository/setting.repository";
import router from "@/core/router/router";
import { CacheService } from "@/core/service/cache.service";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { seller } from "@/data/city/workpage/delivery.model";
import { delivery } from "@/data/city/workpage/workPage.model";
import { i18n } from "@/main";

export class sellerDeliveryState {
    deliveryList: seller = { phones: [{ number: "", title: "" }], isFree: false }
    initialList: seller
    isFreeDel = false
    areaName = ''
    aria = { lat: 0, long: 0 }
    validation = true
    btnLoading = false
    dropDownList = [{ label: i18n.global.tc('toman'), value: 1 }]
    selectedDropDown = 1

    addPhone() {
        this.validation = true
        console.log(this.deliveryList);

        if (this.deliveryList.phones.length > 0) {
            const res = this.deliveryList.phones.find(item => item.number == '' || item.title == '');
            if (res) return ToastService.getInstance().warning(i18n.global.tc('input_is_empty'));
            return this.deliveryList.phones.push({ number: "", title: "" })
        } else {
            this.deliveryList.phones.push({ number: "", title: "" })
        }
    }

    getArea() {
        SettingRepository.getInstance().GetAreaWithPoint({
            body: {
                longitude: this.aria.lat,
                latitude: this.aria.long
            },
            onReceive: (res) => {
                if (!res) return ToastService.getInstance().warning(i18n.global.tc('noResultsFound'));
                this.deliveryList.areaId = res.areaId;
                this.deliveryList.cityId = res.cityId;
                const cityList = CacheService.getInstance().getCities();
                const cityName = cityList.find(item => item.id == res.cityId)
                this.areaName = `${cityName.cityName} , ${res.areaName}`;
            }
        })
    }

    getAddress() {
        FactorRepository.getInstance().GetOneSellerSendAddress({
            urlContent: {
                pageId: -getSelectedPageId()
            },
            onReceive: (res) => {
                this.initialList = { ...res[0] }
                this.deliveryList = res[0]
                if (this.deliveryList) {
                    let x = this.deliveryList.location.replace('POINT(', '').replace(')', '').split(' ')
                    this.aria.long = Number(x[0])
                    this.aria.lat = Number(x[1])
                    const cityList = CacheService.getInstance().getCities();
                    const cityName = cityList.find(item => item.id == res[0].cityId)
                    this.areaName = `${cityName.cityName} , ${res[0].areaName}`;
                }
            }
        })
    }

    createAddress() {
        FactorRepository.getInstance().CreateSellerSendAddress({
            body: {
                pageId: -getSelectedPageId(),
                locations: {
                    latitude: this.aria.lat,
                    longitude: this.aria.long
                },
                currencyId: 1,
                cityId: this.deliveryList.cityId,
                areaId: this.deliveryList.areaId,
                description: this.deliveryList.description,
                uperTellNumber: this.deliveryList.uperTellNumber,
                phones: this.deliveryList.phones
            },
            onReceive: () => {
                ToastService.getInstance().warning(i18n.global.tc('updateSuccessfully'));
                this.initialList = this.deliveryList
                router.back()
            },
            onLoadChange: () => { this.btnLoading = true }
        })
    }

    UpdateAddress() {
        FactorRepository.getInstance().UpdateSellerSendAddress({
            body: {
                pageId: this.deliveryList.pageId,
                locations: {
                    latitude: this.aria.lat,
                    longitude: this.aria.long
                },
                cityId: this.deliveryList.cityId,
                currencyId: 1,
                areaId: this.deliveryList.areaId,
                description: this.deliveryList.description,
                uperTellNumber: this.deliveryList.uperTellNumber,
                phones: this.deliveryList.phones
            },
            onReceive: () => {
                ToastService.getInstance().warning(i18n.global.tc('updateSuccessfully'));
                this.initialList = this.deliveryList
                router.back()
            },
            onLoadChange: () => { this.btnLoading = true }
        })
    }

    onSend() {
        this.validation = false
        if (this.deliveryList.phones.filter(e => e.number.length !== 11).length) return
        if (!this.deliveryList.areaId) {
            ToastService.getInstance().warning(i18n.global.tc('addressNotSelected'));
            return
        }
        if (!this.deliveryList.description.length) {
            return
        }
        if (this.deliveryList.pricePerHunderedMeter <= 0) {
            return
        }
        if (this.deliveryList.sellerSendFreePerMeter <= 0) {
            return
        }
        if (this.initialList) { this.UpdateAddress() }
        else { this.createAddress() }

    }
}
