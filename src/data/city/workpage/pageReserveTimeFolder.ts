export interface ReserveTimeFolderModel {
    id: number;
    folderId: number;
    description: string;
    currencyId: number;
    defaultPrice: number;
    uperPrice?: any;
    defaultWagePlanId: number;
    uperWagePlanId?: any;
    offPercent: number;
    prePaymentPercent?: any;
    returnedPercent?: any;
    giftProductImageUrl?: any;
    giftProductName?: any;
    giftProductCurrencyId?: any;
    giftProductCost?: any;
    giftCardCurrencyId?: any;
    giftCardCost?: any;
    giftCardExpiredDays?: any;
    quantity: number;
    volumePerFactor: number;
    weight?: any;
    startTime: Date;
    endTime: Date;
    financialValue?: any;
    modifiedAt: Date;
}