import { string } from "yup";

export interface Locations {
    latitude: number;
    longitude: number;
}

export interface Phone {
    title: string;
    number: string;
}

export interface BuyerReceiveAddress {
    pageId: number;
    hasLaterReceive: boolean;
    duration: number;
    locations: Locations;
    cityId: number;
    areaId: number;
    description: string;
    phones: Phone[];
    uperTelNumber: number;
}

export interface UperSendAddress {
    pageId: number;
    locations: Locations;
    cityId: number;
    areaId: number;
    description: string;
    uperTellNumber: number;
    phones: Phone[];
}

export interface SellerSendAddress {
    pageId: number;
    currencyId: number;
    isFree: boolean;
    sellerSendFreePerMeter: number;
    pricePerHundredMeter: number;
    locations: Locations;
    cityId: number;
    areaId: number;
    description: string;
    uperTellNumber: number;
    phones: Phone[];
}

    export interface Location {
        long: number;
        lat: number;
    }

    export interface Phone {
        title: string;
        number: string;
    }

    export interface SellerAddressObject {
        workPageId: number;
        currencyId: number;
        isFree: boolean;
        sellerSendFreeMeters: number;
        pricePerHundredMeter: number;
        location: Location;
        cityId: number;
        areaId: number;
        description: string;
        uperTellNumber?: any;
        phones: Phone[];
    }

    export interface Phone2 {
        title: string;
        number: string;
    }

    export interface BuyerAddressObject {
        addressTitle: string;
        cityId: number;
        areaId: number;
        textAddress: string;
        postalCode: string;
        latitude: number;
        longitude: number;
        phones: Phone2[];
    }

    export interface Factor {
        factorId: number;
        factorStatus: number;
        productType: number;
        currencyId: number;
        buyerPageId: number;
        sellerPageId: number;
        paymentType: number;
        deliveryHashCode?: any;
        sellerAddressType: number;
        sellerAreaId: number;
        sellerAddressObject: SellerAddressObject;
        cargoType: number;
        originalPrice: number;
        finalPrice: number;
        factorOffCode?: any;
        factorOffCodeValue?: any;
        giftCardValue?: any;
        giftCardToken: string;
        buyerAddressObject: BuyerAddressObject;
        maxPrepareTime: number;
        stationId?: any;
        buyerDescription: string;
        buyerWillReceiveFactor: Date;
        receiveTime?: any;
        buyerReceivedAt?: any;
        cancellationDescription?: any;
        imageUrls: string[];
        totalWeight: number;
        totalDeliveryCost: number;
        createDate: Date;
        expireDate: Date;
        productReviewVideos?: any;
    }

    export interface Detail {
        itemId: number;
        changeId: number;
        sellBackStatus: number;
        numbers: number;
        finalPriceDetail: number;
        activityOffCodeValue?: any;
        hashToken?: any;
        customObject?: any;
        propId: number;
        productId: number;
        productTypeProp: number;
        name: string;
        mainImageUrl: string;
        currencyIdProp: number;
        defaultPrice: number;
        uperPrice: number;
        defaultWagePlanId: number;
        uperWagePlanId: number;
        offPercent: number;
        prePaymentPercent?: any;
        returnedPercent?: any;
        giftProductImageUrl?: any;
        giftProductName?: any;
        giftProductCurrencyId?: any;
        giftProductCost?: any;
        weight?: any;
        fileLink?: any;
        startReserveTime: Date;
        endReserveTime: Date;
        financialValue: number;
        createdAt: Date;
    }

    export interface Log {
        finalStatus: number;
        employeePageId: number;
        createdAt: Date;
        employeeId: number;
        workPageId: number;
        roleName: string;
        imageUrl?: any;
        personalCode: number;
        name: string;
        userName: string;
        creditLevel: number;
        profileImageUrl: string;
    }

    export interface BuyerDetails {
        pageId: number;
        pageType: number;
        name: string;
        profileImageUrl: string;
        creditLevel: number;
        username: string;
        isPublic: boolean;
        cityId: number;
        areaId: number;
        pageStatus: number;
        sellType: number;
    }

    export interface factorDetailsModel {
        factor: Factor;
        details: Detail[];
        logs: Log[];
        buyerDetails: BuyerDetails;
    }


    export interface sendingSellCartsModel {
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

    export interface Output {
        factorId: number;
        returnFactorStatus: number;
        cityId: number;
        operatorId?: any;
        createdAt: Date;
        modifiedAt: Date;
        buyerPageId: number;
        sellerPageId: number;
        deliveryBarcode?: any;
        currencyId: number;
        finalPrice: number;
    }

    export interface Item {
        itemId: number;
        subjectId?: number;
        number?: number;
        factorNumbers: number;
        fileUrls: string;
        description: string;
        operatorStatus?: number;
        operatorDescription?: any;
        modifiedAt?: Date;
        name: string;
        mainImageUrl: string;
        finalPrice: number;
        currencyId: number;
        offPercent: number;
        defaultPrice: number;
        uperPrice?: number;
    }

    export interface UtilsSeller {
        username: string;
        creditLevel: number;
        name: string;
        profileImageUrl: string;
    }

    export interface ReturnedFactorModel {
        output: Output;
        items: Item[];
        utilsSeller: UtilsSeller;
    }

    export interface customShopMadeModel {
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
        otherImage: string[];
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

    export interface CreateCustomProductModel {
        workPageId: number;
        buyerPageId: number;
        buyerCreator: boolean;
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
        returnedPercent: number;
        weight: number;
        number: number;
    }

    export interface CustomProductImageModel {
        base64: String;
        link:String;
    }

    export interface LocationsModel {
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

    export interface GiftCardGetMyGiftCardOfSellerModel {
        giftId: number;
        factorId: number;
        token: string;
        buyerPageId: number;
        sellerPageId: number;
        currencyId: number;
        cost: number;
        used: number;
        expiredAt: Date;
        factorModifiedAt: Date;
        factorStatus: number;
        factorProductType: number;
    }

    export interface Phone {
        title: string;
        number: string;
    }

    export interface BuyerAddressModel {
        addressTitle: string;
        cityId: number;
        areaId: number;
        textAddress: string;
        postalCode: string;
        latitude: number;
        longitude: number;
        phones: Phone[];
    }

    export interface CreateFactorModel {
        shoppingCartId: number;
        buyerPageId: number;
        paymentType: number;
        sendType: number;
        stationId: number;
        buyerReceivedId: number;
        buyerDescription: string;
        buyerWillReceiveFactor: string;
        buyerAddressObject: object;
        giftCardId: number;
        factorOffCode: string;
        sellerAddressType: number;
        propBuyWithActivity: number[];
        accountNumber: number;
        password: string;
    }

    
