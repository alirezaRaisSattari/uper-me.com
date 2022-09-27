import {ToastService} from "@/core/service/toast.service";
import {i18n} from '@/main';
import {SettingRepository} from '@/core/repository/setting.repository'
import {WindowLoading} from "@/core/service/utils.service";

export class tomanSellerSendState {
    isEdit = false;
    list = [];

    postDataTomanSeller = {
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

    newPhone = {
        title: '',
        phone: ''
    }

    editPhone = {
        id: 0,
        title: '',
        phone: ''
    }

    userDetails = null;

    deleteId = 0;

    constructor(private callBack: any) {

    }

    getLocationByLatLon(data) {
        WindowLoading.value = true;
        this.postDataTomanSeller.latitude = data.lng;
        this.postDataTomanSeller.longitude = data.lat;
        SettingRepository.getInstance().GetAreaWithPoint({
            body: {
                latitude: this.postDataTomanSeller.latitude,
                longitude: this.postDataTomanSeller.longitude
            },
            onReceive: (res) => {
                this.postDataTomanSeller.areaId = res.areaId;
                this.postDataTomanSeller.cityId = res.cityId;
                this.postDataTomanSeller.provinceId = res.provinceId;
                this.postDataTomanSeller.countryId = res.countryId;
                ToastService.getInstance().success(i18n.global.tc('verifiedSuccessful'))
                WindowLoading.value = false;
                this.callBack({dialog: false, data: this.postDataTomanSeller})
            }
        })
    }


    editDetails(e) {
        this.list[e.index].title = e.title;
        this.list[e.index].number = e.number;
        this.postDataTomanSeller.phones = this.list;
        this.callBack({dialog: false, data: this.postDataTomanSeller})
    }

    deletePhone(e) {
        this.deleteId = e;
        this.list.splice(e, 1);
        this.postDataTomanSeller.phones = this.list;
        this.callBack({dialog: false, data: this.postDataTomanSeller})
    }

    pushPhone() {

        if (this.newPhone.title !== '' && this.newPhone.phone !== '') {
            this.list.push({title: this.newPhone.title, number: this.newPhone.phone});
            this.newPhone.title = '';
            this.newPhone.phone = '';
            this.postDataTomanSeller.phones = this.list;
            this.callBack(true)
            this.callBack({dialog: false, data: this.postDataTomanSeller})
        } else {
            ToastService.getInstance().error(i18n.global.tc('can_not_be_empty'))
        }
    }

    pushData(data) {
        if (data !== null) {
            this.postDataTomanSeller.moneyType = data.moneyType;
            this.postDataTomanSeller.provinceId = data.province;
            this.postDataTomanSeller.cityId = data.cityId;
            this.postDataTomanSeller.areaId = data.areaId;
            this.postDataTomanSeller.textAddress = data.textAddress;
            this.postDataTomanSeller.latitude = data.latitude;
            this.postDataTomanSeller.longitude = data.longitude;
            this.postDataTomanSeller.itsFree = data.itsFree;
            this.postDataTomanSeller.sendRange = data.sendRange;
            this.postDataTomanSeller.sendPrice = data.sendPrice;
            this.postDataTomanSeller.phones = data.phones;
            this.list = data.phones;
            this.postDataTomanSeller.countryId = data.countryId;
        }
        this.callBack({dialog: false, data: this.postDataTomanSeller})
    }

}
