import {ToastService} from "@/core/service/toast.service";
import {i18n} from '@/main';
import {SettingRepository} from '@/core/repository/setting.repository'
import {WindowLoading} from "@/core/service/utils.service";

export class uperSendState {
    loading = [false, false]
    isEdit = false;
    list = [];

    postDataUpper = {
        moneyType: 1,
        provinceId: 0,
        cityId: 0,
        areaId: 0,
        textAddress: '',
        latitude: 0,
        longitude: 0,
        ReceiveTime: 0,
        phones: [],
        countryId: 0,
        selectedLaterReceive: null
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
    laterReceive = false

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


}
