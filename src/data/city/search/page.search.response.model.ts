export interface PageSearchResponseModel {
    id: number;
    name: string;
    pageTypeId: number;
    profileImageUrl: string;
    creditLevel: number;
    activityLevel: number;
    username: string;
    cityId: number;
    areaId: number;
    areaName: string;
    isOpen?: any;
    scoreItem?: any;
    categories?: any;
    sellType?: any;
}
