import { BASE_TAKE } from "@/core/constant/constant";
import { UserRepository } from "@/core/repository/user.repository";
import { getSelectedPageData } from "@/core/service/utils.service";

export class searchInMapState {
    showMap = true
    loading = false;
    skip = 0;
    longitude = 0;
    latitude = 0;
    markers = [];
    categories = []

    addCat(Id, Title) {
        this.categories.push({ id: Id, title: Title })
    }

    test(Id) {
    }

    search(latLng) {
        UserRepository.getInstance().FilterWorkPages({
            body: {
                skip: this.skip,
                take: BASE_TAKE,
                dayOfWeek: 0,
                creditLevels: null,
                sellTypes: null,
                pageTypes: null,
                cityIds: null,
                username: null,
                categoryIds: this.categories.length ? this.categories.map(e => e.id) : null,
                point: {
                    latitude: latLng.lat,
                    longitude: latLng.lng,
                    radius: 1000
                }
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                if (Array.isArray(res) && res.length != 0) {
                    this.markers = res
                }
            }
        });
    }


}
