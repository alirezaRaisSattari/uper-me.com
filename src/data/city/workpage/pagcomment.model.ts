export interface ScoreItemDetails {
    workPageId: number;
    scoreItemId1: number;
    title1: string;
    scoreItemId2: number;
    title2: string;
    scoreItemId3: number;
    title3: string;
    scoreItemId4: number;
    title4: string;
    scoreItemId5: number;
    title5: string;
    scoreItem1: number;
    scoreItem2: number;
    scoreItem3: number;
    scoreItem4: number;
    scoreItem5: number;
    numberofVoters: number;
}

export class PageScoreItem {
    id: number;
    average: number;
    vote: number;
}

export class ImageModel {
    id: number;
    imageUrl: string;
}
