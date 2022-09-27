export interface FileUrl {
    fileType: number;
    url: string;
}

export interface Item {
    itemId: number;
    number: number;
    subject: number;
    description: string;
    fileUrls: FileUrl[];
}

export interface ReturnedFactorReturnModel {
    factorId: number;
    myPageId: number;
    items: Item[];
}
