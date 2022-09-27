import { EnumKeys } from "@/core/constant/constant";
import {SettingRepository} from "@/core/repository/setting.repository";
import {UserRepository} from "@/core/repository/user.repository";
import {CacheService} from "@/core/service/cache.service";
import { LocalStorageService } from "@/core/service/localStorage.service";

export class LocationState {
    cityName
    mapLoading = false
    pageInfo = null

    getFullPage(body) {
        UserRepository.getInstance().getFullPage({
            body: body,
            onReceive: (res) => {
                // LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(res))
                this.pageInfo = res

            }
        })
    }

    getLocationByLatLon(data, area: Function) {
        SettingRepository.getInstance().GetAreaWithPoint({
            body: {
                latitude: data.lng,
                longitude: data.lat,
            },
            onReceive: (res) => {
                this.cityName = CacheService.getInstance().getCityById(res.cityId).cityName;
                area(res, this.cityName)

            },
            onLoadChange: (load) => {
                this.mapLoading = load;
            },
        });
    }
}
