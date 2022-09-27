import {i18n} from '@/main';
import {FactorRepository} from "@/core/repository/factor.repository";
import {WindowLoading} from "@/core/service/utils.service";
import {SellerSendAddress} from "@/data/city/mainpage/factor.modal";

export class settingWorkPageState {
    mainDialog = false;
    workPageId = 0;
    loading = false;
    dataList = [
        {data: null},
        {data: null},
        {data: null},
    ]

    laterReceiveOption = [
        {label: 1 + ' ' + i18n.global.tc('minute'), value: 1},
        {label: 2 + ' ' + i18n.global.tc('minute'), value: 2},
        {label: 3 + ' ' + i18n.global.tc('minute'), value: 3},
        {label: 4 + ' ' + i18n.global.tc('minute'), value: 4},
        {label: 5 + ' ' + i18n.global.tc('minute'), value: 5},
        {label: 6 + ' ' + i18n.global.tc('minute'), value: 6},
        {label: 1 + ' ' + i18n.global.tc('hour'), value: (1 * 60)},
        {label: 2 + ' ' + i18n.global.tc('hour'), value: (2 * 60)},
        {label: 3 + ' ' + i18n.global.tc('hour'), value: (3 * 60)},
        {label: 4 + ' ' + i18n.global.tc('hour'), value: (4 * 60)},
        {label: 5 + ' ' + i18n.global.tc('hour'), value: (5 * 60)},
    ]

    constructor(private callBack: any) {
    }

    saveData(data) {
        const step = data.step - 1;
        this.dataList[step].data = data.postData;
        this.mainDialog = false;
    }

    clearData(position) {
        this.dataList[position].data = null;
    }

    pushData(id) {
        this.workPageId = id;
    }

    onSubmitAll() {

        if (this.dataList[0].data !== null) {
            WindowLoading.value = true;
            FactorRepository.getInstance().UperSendAddress(
                {
                    body: {
                        areaId: this.dataList[0].data.areaId,
                        cityId: this.dataList[0].data.cityId,
                        description: this.dataList[0].data.description,
                        locations:
                            {
                                latitude: this.dataList[0].data.latitude,
                                longitude: this.dataList[0].data.longitude
                            },
                        pageId: 279,
                        phones: this.dataList[0].data.phones,
                        uperTellNumber: 0,
                    },
                    onReceive: (data) => {
                        WindowLoading.value = false;
                    },
                    onError: (msg) => {
                        WindowLoading.value = false;
                    }
                });
        } else if (this.dataList[1].data !== null) {
            WindowLoading.value = true;
            if (this.dataList[1].data[0].data !== null) {
                FactorRepository.getInstance().SellerSendAddress(
                    {
                        body: <SellerSendAddress>{
                            currencyId: 1,
                            areaId: this.dataList[1].data[0].data.areaId,
                            cityId: this.dataList[1].data[0].data.cityId,
                            description: this.dataList[1].data[0].data.textAddress,
                            isFree: this.dataList[1].data[0].data.isFree,
                            locations:
                                {
                                    latitude: this.dataList[1].data[0].data.latitude,
                                    longitude: this.dataList[1].data[0].data.longitude
                                },
                            pageId: 257,
                            phones: this.dataList[1].data[0].data.phones,
                            pricePerHundredMeter: this.dataList[1].data[0].data.sendPrice,
                            sellerSendFreePerMeter: this.dataList[1].data[0].data.sendRange,
                            uperTellNumber: 0,
                        },
                        onReceive: (data) => {
                            WindowLoading.value = false;
                        },
                        onError: (msg) => {
                            WindowLoading.value = false;
                        }
                    });
            } else {
                FactorRepository.getInstance().SellerSendAddress(
                    {
                        body: <SellerSendAddress>{
                            currencyId: 0,
                            areaId: this.dataList[1].data[1].data.areaId,
                            cityId: this.dataList[1].data[1].data.cityId,
                            description: this.dataList[1].data[1].data.textAddress,
                            isFree: this.dataList[1].data[1].data.isFree,
                            locations:
                                {
                                    latitude: this.dataList[1].data[1].data.latitude,
                                    longitude: this.dataList[1].data[1].data.longitude
                                },
                            pageId: 257,
                            phones: this.dataList[1].data[1].data.phones,
                            pricePerHundredMeter: this.dataList[1].data[1].data.sendPrice,
                            sellerSendFreePerMeter: this.dataList[1].data[1].data.sendRange,
                            uperTellNumber: 0,
                        },
                        onReceive: (data) => {
                            WindowLoading.value = false;
                        },
                        onError: (msg) => {
                            WindowLoading.value = false;
                        }
                    });
            }
        } else if (this.dataList[2].data !== null) {
            WindowLoading.value = true;
            FactorRepository.getInstance().BuyerReceiveAddress(
                {
                    body: {},
                    onReceive: (data) => {
                        WindowLoading.value = false;
                    },
                    onError: (msg) => {
                        WindowLoading.value = false;
                    }
                });
        }
    }

}
