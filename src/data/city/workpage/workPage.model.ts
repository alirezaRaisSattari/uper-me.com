export interface Image {
    imageUrl: string;
}

export interface Phone {
    title: string;
    number: string;
}

export interface Address {
    title: string;
    address: string;
    postalCode: string;
    cityId: number;
    areaId: number;
    latitude: number;
    longitude: number;
    startTime: Date;
    endTime: Date;
    phones: Phone[];
    addressStatus: number;
}

export interface Time2 {
    startTime: string;
    endTime: string;
}

export interface Time {
    dayOfWeek: number;
    statusType: number;
    description: string;
    times: Time2[];
}

export interface Category {
    categoryId: number;
}

export interface Feature {
    categoryId: number;
    featureId: number;
    answerId: number;
    isShowOuted: boolean;
}

export interface CreateWorkPageModel {
    supporterId: number;
    statusType: number;
    locationType: number;
    sellType: number;
    isPublic: boolean;
    username: string;
    uperTellNumber: string;
    bio: string;
    websiteUrl: string;
    profileImageUrl: string;
    isAddressShow: boolean;
    movieUrl: string;
    countryId: number;
    cityId: number;
    areaId: number;
    name: string;
    showFollowers: boolean;
    showFollowings: boolean;
    intrduceCode: string;
    images: Image[];
    addresses: Address[];
    times: Time[];
    categories: Category[];
    features: Feature[];
}

export interface Image {
    imageUrl: string;
    id: number;
    actionType: number;
}

export interface Phone {
    title: string;
    number: string;
}

export interface Address {
    title: string;
    address: string;
    postalCode: string;
    cityId: number;
    areaId: number;
    latitude: number;
    longitude: number;
    startTime: Date;
    endTime: Date;
    phones: Phone[];
    addressStatus: number;
    id: number;
    actionType: number;
}

export interface Time2 {
    startTime: string;
    endTime: string;
}

export interface Time {
    dayOfWeek: number;
    statusType: number;
    description: string;
    times: Time2[];
}

export interface Category {
    categoryId: number;
    actionType: number;
}

export interface Feature {
    categoryId: number;
    featureId: number;
    answerId: number;
    isShowOuted: boolean;
    actionType: number;
}

export class UpdateWorkPageModel {
    supporterId: number;
    statusType: number;
    locationType: number;
    sellType: number;
    isPublic: boolean;
    username: string;
    uperTellNumber: string;
    bio: string;
    websiteUrl: string;
    profileImageUrl: string;
    isAddressShow: boolean;
    movieUrl: string;
    countryId: number;
    cityId: number;
    areaId: number;
    name: string;
    showFollowers: boolean;
    showFollowings: boolean;
    allowAddProduct: boolean;
    canReport: boolean;
    images: Image[];
    addresses: Address[];
    times: Time[];
    categories: Category[];
    features: Feature[];
}

export class CreateWorkPageImage {
    imageUrl: string;
}


export class FilterWorkpageModel {
    skip: number;
    take: number;
    dayOfWeek: number;
    creditLevels: number[];
    sellTypes: number[];
    pageTypes: number[];
    cityIds: number[];
    username: string;
    categoryIds: number[];
    point: {
        latitude: 0;
        longitude: 0;
        radius: 0
    } = null;
}

export interface Phones {
    title: string;
    number: string;
}

export interface delivery {
    pageId?: number;
    location?: string;
    cityId?: number;
    areaId?: number;
    description?: string;
    phones?: Phones[];
    uperTellNumber?: number;
    areaName?: string;
}

export interface Phone {
    title: string;
    number: string;
}

export interface SellerSendAddress {
    workPageId: number;
    isFree: boolean;
    sellerSendFreeMeters: number;
    location: string;
    cityId: number;
    areaId: number;
    currencyId: number;
    pricePerHunderedMeter: number;
    description: string;
    phones: Phone[];
    uperTellNumber?: any;
    areaName: string;
}

export interface Phone2 {
    title: string;
    number: string;
}

export interface BuyerReceiveAddres {
    workPageId: number;
    maxReceiveDuration: number;
    location: string;
    cityId: number;
    areaId: number;
    description: string;
    phones: Phone2[];
    uperTellNumber?: any;
    areaName: string;
}

export interface Phone3 {
    title: string;
    number: string;
}

export interface UperSendAddress {
    workPageId: number;
    location: string;
    cityId: number;
    areaId: number;
    description: string;
    phones: Phone3[];
    uperTellNumber?: any;
    areaName: string;
}

export interface sellerAddress {
    sellerSendAddress: SellerSendAddress[];
    buyerReceiveAddres: BuyerReceiveAddres;
    uperSendAddress: UperSendAddress;
}