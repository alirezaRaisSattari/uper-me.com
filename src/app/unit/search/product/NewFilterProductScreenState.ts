import {CacheService} from "@/core/service/cache.service";
import {SettingRepository} from "@/core/repository/setting.repository";

export class NewFilterProductScreenState {
    cities = [];
    areas = [];
    loadingArea = false;

    getCities() {
        if (this.cities.length == 0) this.cities = CacheService.getInstance().getCities();
    }

    getAreas(id) {
        this.areas = [];
        SettingRepository.getInstance().GetAllLayersOfCity({
            body: {
                skip: 0, take: 1000,
                id, changeIndex: 0
            },
            onReceive: (res) => {
                res = res ?? {};
                if (Array.isArray(res.areas)) {
                    this.areas = res.areas;
                }
            },
            onLoadChange: (val) => this.loadingArea = val,
        })
    }
}
