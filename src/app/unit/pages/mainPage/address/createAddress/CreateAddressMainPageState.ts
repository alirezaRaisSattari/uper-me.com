import { ToastService } from "@/core/service/toast.service";
import { UserRepository } from "@/core/repository/user.repository";
import { SettingRepository } from "@/core/repository/setting.repository";
import { CacheService } from "@/core/service/cache.service";
import { getSelectedPageId } from "@/core/service/utils.service";
interface InfoPhone {
    title : string,
    number : string

}
export class CreateAddressMainPageState {

    listPhones: Array<InfoPhone>;
    infoMap: {

        areaName?: string,
        cityName?: string,
        areaId?: number,
        cityId?: number,
        lat?: number, lng?: number,
        item?: {
            name: string
        }
    } = {}

    productAddressId: number = 0;


    constructor() {
        this.listPhones = [];
        this.infoMap.areaName = '';
        this.infoMap.cityName = '';
    }

    addPhone() {
        if (this.listPhones.length > 1) {
            if (this.listPhones[this.listPhones.length - 1].number === '' || this.listPhones[this.listPhones.length - 1].title === '') {
                ToastService.getInstance().warning("ابتدا بقیه ی فیلد ها را پر کنید");
                return;
            }
        }
        if (this.listPhones.push({
            title: '',
            number: '',
        })){
            ToastService.getInstance().success("با موفقیت ایجاد شد");

        }

    }

    recordPhone() {
        ToastService.getInstance().success("با موفقیت ایجاد شد");
    }

    deletePhone(id) {
        this.listPhones.splice(id, 1);
        ToastService.getInstance().success("با موفقیت حذف شد");
    }

    getInfoMap(lat, lng) {
        SettingRepository.getInstance().GetAreaWithPoint({
            body: {
                latitude: lat,
                longitude: lng
            },
            onReceive: (res) => {
                this.setInfo(res.areaId, res.cityId, lat, lng, res.areaName, CacheService.getInstance().getCityById(res.cityId).cityName)
            }
        })
    }

    createAddress(title: string, address: string, postalCode: string) {
        UserRepository.getInstance().createAddressFavorite({
            body: {
                pageId: getSelectedPageId(),
                title: title,
                address: address,
                postalCode: postalCode,
                cityId: this.infoMap.cityId,
                areaId: this.infoMap.areaId,
                latitude: this.infoMap.lat,
                longitude: this.infoMap.lng,
                phones: this.listPhones
            },
            onReceive: res => {
                this.productAddressId = res;
            }
        })
    }

    updateAddressFavorite(title, address, postalCode, addressId) {
        UserRepository.getInstance().updateAddressFavorite({
            body: {
                id: addressId,
                pageId: getSelectedPageId(),
                title: title,
                address: address,
                postalCode: postalCode,
                cityId: this.infoMap.cityId,
                areaId: this.infoMap.areaId,
                latitude: this.infoMap.lat,
                longitude: this.infoMap.lng,
                phones: this.listPhones
            },   
        })
    }

    getAreaName(areaId) {
        SettingRepository.getInstance().getAreaById({
            urlContent: `${areaId}`,
            onReceive: res => {
                this.infoMap.areaName = res.areaName;
            }
        })
    }

    setInfo(areaId, cityId, lat, lng, areaName, cityName) {
        this.infoMap = {};
        this.infoMap = {
            areaId: areaId,
            cityId: cityId,
            lat: lng,
            lng: lat,
            cityName: cityName,
            areaName: areaName
        }
    }

}