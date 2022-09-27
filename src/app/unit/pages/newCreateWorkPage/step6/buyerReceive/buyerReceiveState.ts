import {ToastService} from "@/core/service/toast.service";
import {i18n} from '@/main';
import {SettingRepository} from '@/core/repository/setting.repository'
import {WindowLoading} from "@/core/service/utils.service";

export class buyerReceiveState {
    loading = [false, false]
    isEdit = false;
    list = [];
    postDataUpper = {
        provinceId: 0,
        cityId: 0,
        areaId: 0,
        textAddress: '',
        latitude: 0,
        longitude: 0,
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
        this.postDataUpper.latitude = data.lng;
        this.postDataUpper.longitude = data.lat;
        SettingRepository.getInstance().GetAreaWithPoint({
            body: {
                latitude: this.postDataUpper.latitude,
                longitude: this.postDataUpper.longitude
            },
            onReceive: (res) => {
                this.postDataUpper.areaId = res.areaId;
                this.postDataUpper.cityId = res.cityId;
                this.postDataUpper.provinceId = res.provinceId;
                this.postDataUpper.countryId = res.countryId;
                ToastService.getInstance().success(i18n.global.tc('verifiedSuccessful'))
                WindowLoading.value = false;
            }
        })
    }


    editDetails(e) {
        this.list[e.index].title = e.title;
        this.list[e.index].number = e.number;
        this.postDataUpper.phones = this.list;
    }

    deletePhone(e) {
        this.deleteId = e;
        this.list.splice(e, 1);
        this.postDataUpper.phones = this.list;
    }

    pushPhone() {

        if (this.newPhone.title !== '' && this.newPhone.phone !== '') {
            this.list.push({title: this.newPhone.title, number: this.newPhone.phone});
            this.newPhone.title = '';
            this.newPhone.phone = '';
            this.postDataUpper.phones = this.list;
            this.callBack(true)
        } else {
            ToastService.getInstance().error(i18n.global.tc('can_not_be_empty'))
        }
    }

    pushData(data) {
        if (data !== null) {
            this.postDataUpper.areaId = data.areaId;
            this.postDataUpper.cityId = data.cityId;
            this.postDataUpper.countryId = data.countryId;
            this.postDataUpper.latitude = data.latitude;
            this.postDataUpper.longitude = data.longitude;
            this.postDataUpper.phones = data.phones;
            this.list = data.phones;
            this.postDataUpper.provinceId = data.provinceId;
            this.postDataUpper.textAddress = data.textAddress;
        }
    }

}
