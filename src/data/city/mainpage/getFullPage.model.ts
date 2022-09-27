export interface GetFullPageModel {
    myPageId?: number;
    targetPageId?: number;
    username?: string;
}

export interface GetFullPageDataModel {
    mainPageId: number;
    username: string;
    profileImageUrl: string;
    isPublic: boolean;
    bio?: any;
    creditLevel: number;
    pageStatus: number;
    name: string;
    showFollowers: boolean;
    showFollowing: boolean;
    isIFollowHim: boolean;
    isHeFollowMe: boolean;
    isIBlockHim: boolean;
    isHeBlocksMe: boolean;
    isRequested: boolean;
    followerCount: number;
    followingCount: number;
    postCount: number;
}


export interface PageResponseModel {
    isBlock: boolean;
    data: any;
}

export interface WorkPageInfoResponseModel {
    id: number;
    managerId: number;
    changeIndex: number;
    activityLevel: number;
    allowAddProduct: boolean;
    areaId: number;
    userStatus: number;
    coutryId: number;
    bio: string;
    cityId: number;
    createDate: Date;
    creditLevel: number;
    dontReport: boolean;
    introduceCode: string;
    isPublic: boolean;
    operatorStatus: number;
    isAddressShow: boolean;
    isSuggesterMainPage: boolean;
    locationType: number;
    statusTypeId: number;
    pageTypeId: number;
    modifyDate: string;
    movieUrl: string;
    name: string;
    profileImageUrl: string;
    sellType: number;
    suggersterPageId?: any;
    uperTellNumber?: any;
    username: string;
    websiteUrl: string;
    showFollowers: boolean;
    showFollowing: boolean;
    supporterId?: any;
    images: WorkPageImages[];
    followInfo: FollowInfo[];
    postCount: number;
}

export interface MainPageInfoResponseModel {
    mainPageId: number;
    mobileNumber: number;
    username: string;
    profileImageUrl: string;
    isPublic: boolean;
    bio: string;
    creditLevel: number;
    changeIndex: number;
    name: string;
    introduceCode: string;
    createDate: string;
    showFollowers: boolean;
    showFollowing: boolean;
    followInfo: FollowInfo[];
    postCount: number;
}

export interface FollowInfo {
    isIFollowHim: boolean;
    isHeFollowMe: boolean;
    isIBlockHim: boolean;
    isHeBlocksMe: boolean;
    isRequested: boolean;
    followerCount: number;
    followingCount: number;
    followRequest: number;
}

export interface WorkPageImages {
    id: number;
    imageUrl: string;
}
