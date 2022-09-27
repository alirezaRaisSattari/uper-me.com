export interface PageSearchRequestModel {
    dayOfWeek: number;
    name: string;
    skip: number;
    take: number;
}

export interface Point {
    latitude: number;
    longitude: number;
    radius: number;
}

export interface FilterWorkPages_SearchMap {
    skip: number;
    take: number;
    dayOfWeek: number;
    creditLevels: number[];
    sellTypes: number[];
    pageTypes: number[];
    cityIds: number[];
    username: string;
    categoryIds: number[];
    point: Point;
}


