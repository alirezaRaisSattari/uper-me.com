export interface Item {
    productId?: number;
    customId?: number;
    mainImageUrl: string;
}

export interface ShoppingCartModel {
    id: number;
    modifiedAt: Date;
    expiredAt: Date;
    currencyId: number;
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
}
