import {ToastService} from "@/core/service/toast.service";
import {i18n} from '@/main';
import {SettingRepository} from '@/core/repository/setting.repository'
import {WindowLoading} from "@/core/service/utils.service";

export class uperSellerSendState {
    isEdit = false;
    list = [];

    postDataUperSeller = {
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
        this.postDataUperSeller.latitude = data.lng;
        this.postDataUperSeller.longitude = data.lat;
        SettingRepository.getInstance().GetAreaWithPoint({
            body: {
                latitude: this.postDataUperSeller.latitude,
                longitude: this.postDataUperSeller.longitude
            },
            onReceive: (res) => {
                this.postDataUperSeller.areaId = res.areaId;
                this.postDataUperSeller.cityId = res.cityId;
                this.postDataUperSeller.provinceId = res.provinceId;
                this.postDataUperSeller.countryId = res.countryId;
                ToastService.getInstance().success(i18n.global.tc('verifiedSuccessful'))
                WindowLoading.value = false;
                this.callBack({dialog: false, data: this.postDataUperSeller})
            }
        })
    }


    editDetails(e) {
        this.list[e.index].title = e.title;
        this.list[e.index].number = e.number;
        this.postDataUperSeller.phones = this.list;
        this.callBack({dialog: false, data: this.postDataUperSeller})
    }

    deletePhone(e) {
        this.deleteId = e;
        this.list.splice(e, 1);
        this.postDataUperSeller.phones = this.list;
        this.callBack({dialog: false, data: this.postDataUperSeller})
    }

    pushPhone() {

        if (this.newPhone.title !== '' && this.newPhone.phone !== '') {
            this.list.push({title: this.newPhone.title, number: this.newPhone.phone});
            this.newPhone.title = '';
            this.newPhone.phone = '';
            this.postDataUperSeller.phones = this.list;
            this.callBack({dialog: false, data: this.postDataUperSeller})

        } else {
            ToastService.getInstance().error(i18n.global.tc('can_not_be_empty'))
        }
    }

    pushData(data) {
        if (data !== null) {
            this.postDataUperSeller.moneyType = data.moneyType;
            this.postDataUperSeller.provinceId = data.province;
            this.postDataUperSeller.cityId = data.cityId;
            this.postDataUperSeller.areaId = data.areaId;
            this.postDataUperSeller.textAddress = data.textAddress;
            this.postDataUperSeller.latitude = data.latitude;
            this.postDataUperSeller.longitude = data.longitude;
            this.postDataUperSeller.itsFree = data.itsFree;
            this.postDataUperSeller.sendRange = data.sendRange;
            this.postDataUperSeller.sendPrice = data.sendPrice;
            this.postDataUperSeller.phones = data.phones;
            this.list = data.phones;
            this.postDataUperSeller.countryId = data.countryId;
        }
        this.callBack({dialog: false, data: this.postDataUperSeller})
    }


}
