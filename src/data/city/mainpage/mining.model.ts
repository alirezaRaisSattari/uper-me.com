export interface ReportMiningModel {
    reportId: number;
    itemType: number;
    itemId: number;
    reporterPageId: number;
    isMined: boolean;
    status: number;
    answerText: string;
    title: string;
    description: string;
    imageUrl: string;
    createDate: Date;
}
