export interface ReservePropItem {
    startReserveTime: string;
    endReserveTime: string;
    description: string;
    currencyId: number;
    defaultPrice: number;
    uperPrice: number;//last dp
    defaultWagePlanId: number; //کارمزد اولیه
    uperWagePlanId: number;
    offPercent: number;
    returnedPercent: number;
    giftProductImageUrl: string;
    giftProductName: string;
    giftProductCurrencyId: number;
    giftProductCost: number; // price top
    giftCardCurrencyId: number;//1
    giftCardCost: number; // price b
    giftCardExpiredDays: number; //day
    quantity: number; // max day web
    volumePerFactor: number; //tedad f factor
    weight: number;
    financialValue: number;
}

export interface createReservePropFolderModel {
    folderId: number;
    workPageId: number;
    reservePropItems: ReservePropItem[];
}


