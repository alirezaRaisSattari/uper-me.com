export interface Phone {
    title: string;
    number: string;
}

export interface SellerSendAddress {
    workPageId: number;
    isFree: boolean;
    sellerSendFreeMeters: number;
    location: string;
    cityId: number;
    areaId: number;
    currencyId: number;
    pricePerHunderedMeter: number;
    description: string;
    phones: Phone[];
    uperTellNumber?: any;
    areaName: string;
}

export interface Phone2 {
    title: string;
    number: string;
}

export interface BuyerReceiveAddres {
    workPageId: number;
    maxReceiveDuration: number;
    location: string;
    cityId: number;
    areaId: number;
    description: string;
    phones: Phone2[];
    uperTellNumber?: any;
    areaName: string;
}

export interface Phone3 {
    title: string;
    number: string;
}

export interface UperSendAddress {
    workPageId: number;
    location: string;
    cityId: number;
    areaId: number;
    description: string;
    phones: Phone3[];
    uperTellNumber?: any;
    areaName: string;
}

export interface sellerAddress {
    sellerSendAddress: SellerSendAddress[];
    buyerReceiveAddres: BuyerReceiveAddres;
    uperSendAddress: UperSendAddress;
}

export interface Phone {
    title: string;
    number: string;
}

export interface seller {
    pageId?: number;
    currencyId?: number;
    isFree?: boolean;
    sellerSendFreePerMeter?: number;
    pricePerHunderedMeter?: number;
    location?: string;
    cityId?: number;
    areaId?: number;
    description?: string;
    phones?: Phone[];
    uperTellNumber?: any;
    areaName?: string;
}

export interface Phone {
    title: string;
    number: string;
}

export interface buyer {
    pageId?: number;
    currencyId?: number;
    isFree?: boolean;
    sellerSendFreePerMeter?: number;
    pricePerHunderedMeter?: number;
    location?: string;
    cityId?: number;
    areaId?: number;
    description?: string;
    phones: Phone[];
    uperTellNumber?: any;
    areaName?: string;
}