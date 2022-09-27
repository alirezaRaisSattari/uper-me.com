export interface CategoryModel {
    id: number;
    isLevel4: boolean;
}

export interface FilterWorkPagesWithPointRequestModel {
    skip: number;
    take: number;
    dayOfWeek: number;
    creditLevel1: number;
    creditLevel2: number;
    creditLevel3: number;
    sellType1: number;
    sellType2: number;
    sellType3: number;
    pageType1: number;
    pageType2: number;
    pageType3: number;
    cityId1: number;
    cityId2: number;
    cityId3: number;
    username: string;
    categories: CategoryModel[];
    latitude: number;
    longitude: number;
    radius: number;
}

export interface Category {
    id: Number,
    title: String
}
