import { SettingRepository } from '@/core/repository/setting.repository'
import { PublicBannerStore } from "@/core/store/publicBanner.store";
import { BannerModel, GetAllBannersModel } from "@/data/setting/publicBanner.model";

export class HomeScreenState {
    loading = false
    banners: BannerModel[]

    constructor() {
        this.banners = PublicBannerStore().banners;
    }

    getPublicBanners(data: GetAllBannersModel) {
        if (PublicBannerStore().isLoadedBanners) return
        SettingRepository.getInstance().getAllBanners({
            body: data,
            onLoadChange: (val) => this.loading = val,
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    console.log(res);
                    this.banners = res;
                    PublicBannerStore().banners = this.banners
                    PublicBannerStore().isLoadedBanners = true
                }
            }
        })
    }
}
