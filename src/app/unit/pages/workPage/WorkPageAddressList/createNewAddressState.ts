import {SettingRepository} from "@/core/repository/setting.repository";
import {UserRepository} from "@/core/repository/user.repository";
import {CacheService} from "@/core/service/cache.service";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";

export class newAddressState {
    cityId
    areaId
    cityName
    areaName
    mapLoading = false
    createLoading = false

    getLocationByLatLon(data, area: Function) {
        SettingRepository.getInstance().GetAreaWithPoint({
            body: {
                latitude: data.lng,
                longitude: data.lat,
            },
            onReceive: (res) => {
                this.areaId = res.areaId;
                this.cityName = CacheService.getInstance().getCityById(res.cityId).cityName;
                this.areaName = res.areaName
                this.cityId = res.cityId;
                ToastService.getInstance().success(
                    i18n.global.tc("verifiedSuccessful")
                );
                area(res.cityId, res.areaId)

            },
            onLoadChange: (load) => {
                this.mapLoading = load;
            },
        });
    }

    createAddressFavorite(body, created: Function) {
        UserRepository.getInstance().createAddressFavorite({
            body: body,

            onLoadChange: (load) => {
                this.createLoading = load
            },
            onReceive: (res) => {
                created()

            }
        })
    }
}
