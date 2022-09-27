export interface PageUtils {
	pageId: number;
	name: string;
	username: string;
	profileImageUrl: string;
	creditLevel: number;
}

export interface customMadeModel {
	buyerPageId: number;
	count: number;
	images: string[];
	pageUtils: PageUtils;
}

export interface GetForSellerModel {
	specialFactorId: number;
	specialFactorStatus: number;
	buyerPageId: number;
	sellerPageId: number;
	price: number;
	currencyId: number;
	wagePlanId: number;
	requestReturnPrice?: any;
	description: string;
	createdAt: Date;
	modifiedAt: Date;
	name: string;
	username: string;
	creditLevel: number;
	profileImageUrl: string;
}

export interface newSellCartModel {
	factorId: number;
	factorStaus: number;
	productType: number;
	currencyId: number;
	sellerAddressType: number;
	originalPrice: number;
	finalPrice: number;
	imageUrls: string[];
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
}

export interface ProductModel {
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
	giftCardCost?: number;
	giftCardCurrencyId?: number;
	giftCardExpiredDays?: number;
	price: number;
	quantity: number;
	selledNumbers: number;
	volumePerFactor: number;
	defaultWagePlanId: number;
	numbers: number;
	productId: number;
	activityOffCodePercent?: any;
	activityOffCodeExpiredAt?: any;
	startReserveTime?: any;
	endReserveTime?: any;
}

export interface CustomProductModel {
	customId: number;
	workPageId: number;
	buyerPageId: number;
	buyerCreator: boolean;
	customStatus: number;
	productType: number;
	prepareTime: number;
	currencyId: number;
	price: number;
	name: string;
	categoryId: number;
	mainImageUrl: string;
	otherImages: string[];
	description: string;
	cargoType: number;
	isOriginal: boolean;
	usedType: number;
	defaultWagePlanId: number;
	returnedPercent: number;
	giftProductImageUrl?: any;
	giftProductName?: any;
	giftProductCurrencyId?: any;
	giftProductCost?: any;
	giftCardCurrencyId?: any;
	giftCardCost?: any;
	giftCardExpiredDays?: any;
	weight: number;
	fileLink?: any;
	number: number;
	startReserveTime?: any;
	endReserveTime?: any;
	financialValue?: any;
	createdAt: Date;
	modifiedAt: Date;
}

export interface ShoppingCartListModel {
	id: number;
	currencyId: number;
	productType: number;
	sellerPageId: number;
	modifiedAt: Date;
	expireAt: Date;
	products: ProductModel[];
	customs?: any;
}

export interface SendMethodModel {
	hasUperSending: boolean;
	hasGetByBuyyer: boolean;
	hasGetByBuyyerWithDelay: boolean;
	hasSendByBuyyer: boolean;
	hasSendByBuyyerFreeAll: boolean;
	currencyIdSellerSend: number;
	sellerSendFreePerMeter: number;
	pricePerHunderedMeter: number;
}

export interface shoppingHistoryModel {
	factorId: number;
	factorStaus: number;
	productType: number;
	currencyId: number;
	sellerAddressType: number;
	originalPrice: number;
	finalPrice: number;
	imageUrls: string[];
	createdAt: Date;
	modifiedAt: Date;
	cargoType: number;
	paymentType: number;
	sellerPageId: number;
	buyerPageId: number;
	cancelDescription: string;
	name: string;
	username: string;
	creditLevel: number;
	profileImageUrl: string;
}
