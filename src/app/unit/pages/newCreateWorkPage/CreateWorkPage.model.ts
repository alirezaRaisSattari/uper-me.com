import {ListsConstants} from "@/core/constant/listConstant";

export class CreateWorkPageImage {
    imageUrl: string;
}

export class WorkPageImages {
    mainImage: CreateWorkPageOtherImageList = {};
    otherImages: CreateWorkPageOtherImageList[] = [];
}

export class CreateWorkPageOtherImageList {
    base64?: string;
    progress?: number;
    link?: string
}

export class CreateWorkPagePhone {
    title: string;
    number: string;
}

export class CreateWorkPageAddress {
    title: string;
    address: string;
    postalCode: string;

    cityName: string = '';
    areaName: string = '';
    cityId: number;
    areaId: number;
    countryId: number;

    latitude: number = null;
    longitude: number = null;
    startTime: string;
    endTime: string;
    phones: CreateWorkPagePhone[] = [];
    addressStatus: number;
}

export class CreateWorkPageDatesTime {
    startTime: string = "";
    endTime: string = "";
}

export class CreateWorkPageTime {
    dayOfWeek: number;
    statusType: number;
    description: string;
    titleDayOfWeek: string;
    times: CreateWorkPageDatesTime[] = [];

    constructor(titleDayOfWeek, day) {
        this.dayOfWeek = day;
        this.titleDayOfWeek = titleDayOfWeek;
        this.statusType = 4;
    }
}

export class CreateWorkPageCategory {
    categoryId: number;
}

export class CreateWorkPageFeature {
    categoryId: number;
    featureId: number;
    answerId: number;
    isShowOuted: boolean;
}

export class NewCreateWorkPageModel {
    supporterId: number;
    statusType: number = 1;
    locationType: number = 1;
    sellType: number = 1;
    isPublic: boolean = true;
    username: string;
    uperTellNumber: string;
    bio: string;
    websiteUrl: string;
    profileImageUrl: string;
    isAddressShow: boolean = true;
    movieUrl: string;
    countryId: number;
    cityId: number;
    areaId: number;
    name: string;
    showFollowers: boolean;
    showFollowings: boolean;
    intrduceCode: string;
    images: CreateWorkPageImage[] = [];
    addresses: CreateWorkPageAddress[] = [];
    categories: CreateWorkPageCategory[] = [];
    features: CreateWorkPageFeature[] = [];

    times: CreateWorkPageTime[] = new ListsConstants().daysOfWeek.map(
        (m) => new CreateWorkPageTime(m.title, m.value)
    );
}



export interface PhoneModel {
    title: string;
    number: string;
}

export interface CrateAddressModel {
    pageId: number;
    title: string;
    address: string;
    postalCode: string;
    cityId: number;
    areaId: number;
    latitude: number;
    longitude: number;
    phones: PhoneModel[];
}