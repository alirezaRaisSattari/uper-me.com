import {SettingRepository} from "@/core/repository/setting.repository";
import {CacheService} from "@/core/service/cache.service";
import {UserRepository} from "@/core/repository/user.repository";
import {PageStore} from "@/core/store/page.store";

export class AddressProductModel {
    static areaId: number
    displaySelectedMap: boolean;
    informationMap: { areaName?: string, cityName?: string, provinceName?: string, countryName?: string, areaId?: number, cityId?: number, provinceId?: number, countryId?: number, isSelected?: boolean };
    lengthInformation: number
    onData?: (res) => void;

    constructor() {
        this.displaySelectedMap = false;
        this.informationMap = {};
        this.lengthInformation = 0;
    }

    getInfoMap(lat, lng, callback: (item) => void) {
        SettingRepository.getInstance().GetAreaWithPoint({
            body: {
                latitude: lat,
                longitude: lng
            },
            onReceive: (res) => {
                callback(res)
            }
        })
    }

    getAreaById() {
        UserRepository.getInstance().getWorkPageAddressByWorkPageId({
            body: {
                skip: 0,
                take: 1000,
                workPageId: PageStore().selectedPageId * -1,
            },
            onReceive: (res) => {
            }
        })
    }

    getLocation(areaName: string, areaId: number, cityId: number, provinceId: number, countryId: number) {
        this.informationMap = {};
        this.informationMap = {
            areaName: areaName,
            cityName: CacheService.getInstance().getCityById(cityId).cityName,
            provinceName: CacheService.getInstance().getProvinceById(provinceId).provinceName,
            countryName: CacheService.getInstance().getCountryById(countryId).countryName,
            areaId: areaId,
            cityId: cityId,
            provinceId: provinceId,
            countryId: countryId,
            isSelected: true,
        }
        this.lengthInformation = Object.keys(this.informationMap).length;
    }
}