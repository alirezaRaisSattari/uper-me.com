export interface shoppingHistoryModel {
    factorId: number;
    factorStaus: number;
    productType: number;
    currencyId: number;
    sellerAddressType: number;
    originalPrice: number;
    finalPrice: number;
    imageUrls: string[];
    itemsImages:string[];
    createdAt: Date;
    modifiedAt: Date;
    cargoType: number;
    paymentType: number;
    sellerPageId: number;
    buyerPageId: number;
    cancelDescription?: any;
    name: string;
    username: string;
    creditLevel: number;
    profileImageUrl: string;
    sellerProfileImageUrl:string;
    sellerUserName:string;
    sellerName:string;
}