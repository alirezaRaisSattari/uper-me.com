import {ToastService} from "@/core/service/toast.service";
import {i18n} from '@/main';

export class sellerSendState {
    mainDialog = false;
    loading = false;
    position = 1;
    dataList = [
        {
            data:
                {
                    moneyType: 1,
                    provinceId: 0,
                    cityId: 0,
                    areaId: 0,
                    textAddress: '',
                    latitude: 0,
                    longitude: 0,
                    itsFree: false,
                    sendRange: 0,
                    sendPrice: 0,
                    phones: [],
                    countryId: 0
                }
        },
        {
            data: {
                moneyType: 2,
                provinceId: 0,
                cityId: 0,
                areaId: 0,
                textAddress: '',
                latitude: 0,
                longitude: 0,
                itsFree: false,
                sendRange: 0,
                sendPrice: 0,
                phones: [],
                countryId: 0
            }
        },
    ]

    isReady = false;

    constructor(private callBack: any) {
    }

    saveData(data) {
        const step = data.step;
        this.dataList[step].data = data.postData;
        this.mainDialog = false;
    }

    clearData(position) {
        this.dataList[position].data = null;
    }

    onSubmitAll() {
        this.loading = true;
        if (
            this.dataList[0].data !== null &&
            this.dataList[0].data.areaId !== 0 &&
            this.dataList[0].data.phones.length > 0 &&
            this.dataList[0].data.textAddress !== '' &&
            (
                this.dataList[0].data.itsFree == true ||
                this.dataList[0].data.sendRange > 0 &&
                this.dataList[0].data.sendPrice > 0
            ) ||
            this.dataList[1].data !== null &&
            this.dataList[1].data.areaId !== 0 &&
            this.dataList[1].data.phones.length > 0 &&
            this.dataList[1].data.textAddress !== '' &&
            (
                this.dataList[1].data.itsFree == true ||
                this.dataList[1].data.sendRange > 0 &&
                this.dataList[1].data.sendPrice > 0
            )) {
            ToastService.getInstance().success(i18n.global.tc('submit'));
            this.loading = false;
            this.callBack(this.dataList);
        } else if (this.dataList[0].data.phones.length <= 0 && this.dataList[1].data.phones.length <= 0) {
            ToastService.getInstance().error(i18n.global.tc('please_enter_at_least_one_phoneNumber'));
            this.loading = false;
        } else {
            ToastService.getInstance().error(i18n.global.tc('enterAddressAndInputs'));
            this.loading = false;
        }
    }

    pushData(data) {
        if (data !== null) {
            this.dataList[0].data = data[0].data;
            this.dataList[1].data = data[1].data;
            this.isReady = true;
        } else {
            this.isReady = true;
        }
    }

}
