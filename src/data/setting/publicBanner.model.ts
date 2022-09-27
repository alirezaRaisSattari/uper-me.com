export interface BannerModel {
    bannerId: number;
    cityId: number;
    viewId: number;
    bannerType: number;
    bannerRefrenceType: number;
    referenceId?: any;
    pageId?: any;
    mobileImageUrl: string;
    webImageUrl: string;
    title: string;
    webUrl: string;
    createAt: Date;
    startShowTime: Date;
    expireTime: Date;
}

export interface GetAllBannersModel {
    bannerType: number;
    cityId: number;
}