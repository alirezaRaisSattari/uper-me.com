export interface getFollowingInFolder {
    pageId: number;
    skip: number;
    take: number;
    folderId: number;
}

export interface GetFollowersForEmployeesModel {
    requestTime: Date;
    workPageId: number;
    skip: number;
    take: number;
}
