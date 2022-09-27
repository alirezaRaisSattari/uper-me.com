export interface Data {
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
    createDate: Date;
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

export interface RootObject {
    isBlock: boolean;
    data: Data;
}

