export interface Phone {
    title: string;
    number: string;
}

export interface WorkPageAddress {
    addressTitle: string;
    provinceId: number;
    cityId: number;
    areaId: number;
    textAddress: string;
    no: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    uperTellNumber: number;
    phone: Phone[];
}

export interface WorkPageTime {
    dayOfWeek: number;
    workTimeStatusType: number;
    startTimes: string[];
    endTimes: string[];
    description: string;
}

export interface Public {
    cityId: number;
    isPublic: boolean;
    locationType: number;
    sellType: number;
    username: string;
    bio: string;
    profileImageUrl: string;
    imageUrls: string[];
    isAddressShow: boolean;
    areaId: number;
    pageTypeId: number;
    introducePageId: number;
    name: string;
    statusTypeId: number;
    websiteUrl: string;
    showFollowers: boolean;
    showFollowing: boolean;
    workPageAddress: WorkPageAddress[];
    workPageTimes: WorkPageTime[];
    countryId: number;
}
