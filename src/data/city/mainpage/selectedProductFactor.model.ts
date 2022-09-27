export interface Item {
    productId: number;
    customId?: any;
    mainImageUrl: string;
}

export interface ProductList {
    name: string;
    description: string;
    mainImageUrl: string;
    cargoType: number;
    propId: number;
    prepareTime: number;
    returnedPercent: number;
    offPercent: number;
    giftProductName?: any;
    giftProductCost?: any;
    giftProductImageUrl?: any;
    giftProductCurrencyId?: any;
    giftCardCost?: any;
    giftCardCurrencyId?: any;
    giftCardExpiredDays?: any;
    price: number;
    quantity: number;
    selledNumbers: number;
    volumePerFactor: number;
    defaultWagePlanId: number;
    numbers: number;
    productId: number;
    activityOffCodePercent: number;
    activityOffCodeExpiredAt: Date;
    startReserveTime?: any;
    endReserveTime?: any;
}

export interface Phone {
    title: string;
    number: string;
}

export interface BuyerAddressObject {
    addressTitle: string;
    areaId: number;
    cityId: number;
    latitude: string;
    longitude: string;
    phones: Phone[];
    postalCode: string;
    textAddress: string;
}

export interface AddressData {
    buyerAddressObject: BuyerAddressObject;
    giftCardId: number;
    factorOffCode: string;
    sellerAddressType: number;
}

export interface SelectedDataPaymentModel {
    id: number;
    modifiedAt: Date;
    expiredAt: Date;
    currencyId: number;
    stationId: number;
    productType: number;
    sellerWorkPageId: number;
    totalPrice: number;
    itemsCount: number;
    cargoType: number;
    items: Item[];
    sellerAverage: number;
    sellerName: string;
    sellerUsername: string;
    sellerProfileImageUrl: string;
    sellerCreditLevel: number;
    productLists: ProductList[];
    propBuyWithActivity: number[];
    customProducts?: any;
    sellerAddressType: number;
    uperScore: number;
    addressData: AddressData;
    percentFromCode: number;
}