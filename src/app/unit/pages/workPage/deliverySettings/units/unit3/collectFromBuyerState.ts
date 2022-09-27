import { FactorRepository } from "@/core/repository/factor.repository";
import { SettingRepository } from "@/core/repository/setting.repository";
import router from "@/core/router/router";
import { CacheService } from "@/core/service/cache.service";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { buyer, seller } from "@/data/city/workpage/delivery.model";
import { delivery } from "@/data/city/workpage/workPage.model";
import { i18n } from "@/main";

export class collectFromBuyerState {
    deliveryList: buyer = { phones: [{ number: "", title: "" }], isFree: false }
    initialList: buyer
    isFreeDel = false
    areaName = ''
    aria = { lat: 0, long: 0 }
    validation = true
    btnLoading = false
    dropDownList = [
        { label: i18n.global.tc('1minute'), value: 1 },
        { label: i18n.global.tc('2minute'), value: 2 },
        { label: i18n.global.tc('3minute'), value: 3 },
        { label: i18n.global.tc('4minute'), value: 4 },
        { label: i18n.global.tc('5minute'), value: 5 },
        { label: i18n.global.tc('6minute'), value: 6 },
        { label: i18n.global.tc('1hour'), value: 7 },
        { label: i18n.global.tc('2hour'), value: 8 },
        { label: i18n.global.tc('3hour'), value: 9 },
        { label: i18n.global.tc('4hour'), value: 10 },
        { label: i18n.global.tc('5hour'), value: 11 },
        { label: i18n.global.tc('6hour'), value: 12 },
    ]
    selectedDropDown = 1

    addPhone() {
        this.validation = true
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
        FactorRepository.getInstance().GetBuyerReceiveAddress({
            urlContent: {
                pageId: -getSelectedPageId()
            },
            onReceive: (res) => {
                this.initialList = { ...res }
                this.deliveryList = res
                if (this.deliveryList) {
                    let x = this.deliveryList.location.replace('POINT(', '').replace(')', '').split(' ')
                    this.aria.long = Number(x[0])
                    this.aria.lat = Number(x[1])
                    const cityList = CacheService.getInstance().getCities();
                    const cityName = cityList.find(item => item.id == res.cityId)
                    this.areaName = `${cityName.cityName} , ${res.areaName}`;
                }
            }
        })
    }

    createAddress() {
        FactorRepository.getInstance().CreateBuyerReceiveAddress({
            body: {
                pageId: -getSelectedPageId(),
                locations: {
                    latitude: this.aria.lat,
                    longitude: this.aria.long
                },
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
        FactorRepository.getInstance().UpdateBuyerReceiveAddress({
            body: {
                pageId: this.deliveryList.pageId,
                locations: {
                    latitude: this.aria.lat,
                    longitude: this.aria.long
                },
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
        if (this.initialList) { this.UpdateAddress() }
        else { this.createAddress() }

    }
}
