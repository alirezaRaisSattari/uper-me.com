export interface PageDetails {
    pageId: number;
    name?: any;
    username?: any;
    profileImageUrl?: any;
}

export interface StoryModel {
    storyId: number;
    canReport: boolean;
    pageId: number;
    caption: string;
    webUrl: string;
    listObjects: string;
    fileUrl: string;
    fileIsImage: boolean;
    numberOfSeen: number;
    createDate: Date;
    seen: boolean;
    pageDetails: PageDetails;
}


export interface GetRecentStoryModel {
    requestTime: Date;
    observerId: number;
    pageId: number;
    skip: number;
    take: number;
}

export class GetAllUpgradeStoryByTypeModel {
    requestTime: Date;
    type: number;
    skip: number;
    take: number;
}

export interface updateCaptionModel {
    storyId: number;
    caption: string;
    pageId: number;
}

export interface updateStoryTimeModel {
    storyId: number;
    time: Date;
    pageId: number;
}

