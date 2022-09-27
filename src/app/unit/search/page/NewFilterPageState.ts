import {CacheService} from "@/core/service/cache.service";

export class NewFilterPageState {
    cities = [];

    getCities() {
        if (this.cities.length == 0) this.cities = CacheService.getInstance().getCities();
    }

}
