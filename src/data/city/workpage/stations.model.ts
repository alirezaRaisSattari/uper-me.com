export interface getStationModel {
    id: number;
    workPageId: number;
    stationStatus: number;
    type: number;
    title: string;
    description: string;
    mainImageUrl: string;
    otherImageUrls: string[];
    plateNumber: string;
}


export interface Document {
    imageUrl: string;
    title: string;
}

export interface DocumentForPreview {
    imageUrl: string;
    title: string;
    isNew: boolean | false;
}

export interface imageCallBackModel {
    otherPhotos: Array<object>;
    mainPhoto: String
}

export interface CreateStationModel {
    workPageId: number;
    type: number;
    title: string;
    description: string;
    mainImageUrl: string;
    otherImageUrls: string[];
    plateNumber: string;
    documents: Document[];
}

export interface stationGetByIdModel {
    id: number;
    workPageId: number;
    stationStatus: number;
    type: number;
    title: string;
    description: string;
    mainImageUrl: string;
    otherImageUrls: string[];
    plateNumber: string;
    documents: DocumentForPreview[];
}


export interface UpdateStationModel {
    stationId: number;
    type: number;
    title: string;
    description: string;
    mainImageUrl: string;
    otherImageUrls: string[];
    plateNumber: string;
}
