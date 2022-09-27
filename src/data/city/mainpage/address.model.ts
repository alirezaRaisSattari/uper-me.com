export interface Phone {
    title: string;
    number: string;
}

export interface Address {
    pageId: number;
    title: string;
    // provinceId: number;
    cityId: number;
    areaId: number;
    address: string;
    // no: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    phones: Phone[];
}