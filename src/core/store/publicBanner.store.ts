import { defineStore } from "pinia"
import { BannerModel } from "@/data/setting/publicBanner.model";

export const PublicBannerStore = defineStore({
    id: 'PublicBannerStore',
    state: () => ({
        isLoadedBanners: false,
        banners: []
    }),
})
