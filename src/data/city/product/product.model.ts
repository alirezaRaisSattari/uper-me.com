import {BASE_TAKE} from "@/core/constant/constant";

export class GetAllProduct {
    skip?: number;
    take?: number;
    workPageId?: number;
    myPageId?: number;
    productType?: number;
    name?: string;
    folderId?: number;
    requestTime?: Date;
}

export interface GetProductByIdModel {
    productId: number;
    workPageId: number;
    myPageId: number;
}

export interface Answer {
    name: string;
    objectNameId?: number;
}

export interface Feature {
    name: string;
    objectNameId: number;
    answers: Answer[];
}

export interface Parentcategory {
    id5: number;
    title5: string;
    objectNameId5: number;
    id4: number;
    title4: string;
    objectNameId4: number;
    id3: number;
    title3: string;
    objectNameId3: number;
    id2: number;
    title2: string;
    objectNameId2: number;
    id1: number;
    title1: string;
    objectNameId1: number;
}

export interface Result {
    level: number;
    productStatus: number;
    folderId: number;
    isOriginal: boolean;
    productType: number;
    usedType: number;
    privateBarcode: string;
    countryId: number;
    cityId: number;
    areaId: number;
    movieUrl?: any;
    isShow: boolean;
    sellType: number;
    creditLevel: number;
    numberOfLikes: number;
    numberOfViews: number;
    numberOfMinedLikes: number;
    numberOfMinedViews: number;
    immediatePlanId?: any;
    immediateExpireDate?: any;
    activityOffCodePercent?: any;
    activityOffCodeExpiredAt?: any;
    ladderedAt: Date;
    modifiedAt: Date;
    detailId: number;
    generalStatus: number;
    name: string;
    latinName: string;
    categoryId: number;
    mainImageUrl: string;
    otherImages: string[];
    description: string;
    publicBarcode?: any;
    cargoType: number;
    productConsult?: any;
    creatorOperatorId?: any;
    title: string;
    liked?: any;
    bookMarked: boolean;
    features: Feature[];
    parentcategories: Parentcategory[];
    workPageId: number
}

export interface ScoreItem {
    id: number;
    average: number;
    vote: number;
}

export interface ProductArea {
    areaId: number;
    areaName: string;
    cityName: string;
    provinceName: string;
    countryName: string;
}

export interface GetProductModel {
    result: Result;
    scoreItem: ScoreItem;
    productArea: ProductArea;
}

export interface getProductFolderModel {
    skip: number;
    take: number;
    workPageId: number;
}

export interface createProductFolderModel {
    name: string;
    workPageId: number;
}

export interface moveToFolderModel {
    productIds: number[];
    destinationFolderId: number;
    workPageId: number;
}

export interface getproductModel {
    productId: number;
    workPageId: number;
    myPageId: number;
}

export interface updateProductModel {
    id: number;
    countryId: number;
    cityId: number;
    areaId: number;
    sellType: number;
    folderId: number;
    usedType: number;
    privateBarcode: string;
    isShow: boolean;
    workPageId: number;
}

export interface AddImmediateTagToProductModel {
    productId: number;
    immediatePlanId: number;
    depositorPageId: number;
    cityId: number;
    depositorAccountNumber: number;
    password: string;
}

export interface addEmployeeModel {
    mainPageId: number;
    workPageId: number;
    roleName: string;
    imageUrl: string;
    personalCode: number;
}

export interface deleteEmployeeAccessModel {
    mainPageId: number;
    workPageId: number;
    permissionIds: number[];
}

export interface getAllProductFoldersModel {
    skip: number;
    take: number;
    workPageId: number;
}

export interface getFoldersProductModel {
    skip: number;
    take: number;
    workPageId: number;
    myPageId: number;
    productType: number;
    name: string;
    folderId: number;
    requestTime: Date;
}

export interface updateFolderNAmeModel {
    folderId: number;
    name: string;
    workPageId: number;
}

export interface moveToOtherFolderModel {
    folderId: number;
    name: string;
    workPageId: number;
}

export interface GetProductPropsModel {
    skip: number;
    take: number;
    myPageId: number;
    workpageId: number;
    productId: number;
    productType: number;
    requestTime: Date;
}

export interface createPageAmazingPropModel {
    depositorPageId: number;
    depositorAccountNumber: number;
    password: string;
    productType: number;
    productId: number;
    propId: number;
    endAmazingTime: Date;
    startShowTime: Date;
    planId: number;
}

export interface deletePageAmazingPropModel {
    pageId: number;
    productType: number;
    productId: number;
    propId: number;
    amazingId: number;
}

export interface Answer {
    name: string;
}

export interface createFeatureWithAnswerModel {
    categoryId: number;
    name: string;
    answers: Answer[];
}

export interface getProductLikers {
    skip: number;
    take: number;
    workPageId: number;
    productId: number;
    requestTime: Date;
}

export interface ladderProductModel {
    planId: number;
    countryId: number;
    categoryId: number;
    depositorPageId: number;
    productId: number;
    currencyId: number;
    depositorAccountNumber: number;
    password: string;
}

export interface getLadderPlanModel {
    skip: number;
    take: number;
    categoryId: number;
    countryId: number;
    currencyId: number;
}

export class FilterProductModel {
    skip: number;
    take: number = BASE_TAKE;
    name: string;
    requestTime: Date;
    cityIds: number[];
    areaIds: number[];
    usedType: number;
    productType: number;
    categoryIds: number[];
    creditLevels: number[];
    isImmediate = false;
}

export interface MainEventProductModel {
    eventPageId: number;
    planId: number;
    name: string;
    profileImageUrl: string;
    creatorOperatorId: number;
    createDate: Date;
    expireDate: Date;
}

export interface eventPagePlanItemModel {
    itemId: number;
    planId: number;
    place: number;
    currencyId: number;
    cost: number;
}


export interface ShoppingCartUpdateItemsModel {
    sellerWorkPageId: number;
    buyerPageId: number;
    propId: number;
    numbers: number;
    currencyId: number;
}


export interface hyperControllerModel {
    productId: number;
    productStatus: number;
    folderId: number;
    isOriginal: boolean;
    productType: number;
    creditLevel: number;
    immediateExpireDate?: any;
    name: string;
    mainImageUrl: string;
    cargoType: number;
    propId: number;
    currencyId: number;
    defaultPrice: number;
    uperPrice?: any;
    offPercent: number;
    shopingCartItemsNumber: number;
    quantity: number;
    volumePerFactor: number;
    selledNumbers: number;
    average: number;
    vote: number;
}

export interface hyperProductModel {
    productId: number;
    productStatus: number;
    folderId: number;
    isOriginal: boolean;
    productType: number;
    creditLevel: number;
    immediateExpireDate?: any;
    name: string;
    mainImageUrl: string;
    cargoType: number;
    propId: number;
    currencyId: number;
    defaultPrice: number;
    uperPrice?: any;
    offPercent: number;
    shopingCartItemsNumber: number;
    quantity: number;
    volumePerFactor: number;
    selledNumbers: number;
    average: number;
    vote: number;
}

export interface CustomProduct {
    workPageId: number
    buyerPageId: number
    buyerCreator: boolean
    productType: number
    prepareTime: number
    currencyId: number
    price: number
    name: string
    categoryId: number
    mainImageUrl: string
    otherImages: string[]
    description: string
    cargoType: number
    isOriginal: boolean
    usedType: number
    returnedPercent: number
    giftProductImageUrl: string
    giftProductName: string
    giftProductCurrencyId: number
    giftProductCost: number
    giftCardCurrencyId: number
    giftCardCost: number
    giftCardExpiredDays: number
    weight: number
    fileLink: string
    number: number
    startReserveTime: string
    endReserveTime: string
    financialValue: number
  }
  
  export interface PropGetModel {
    propId: number
    productId: number
    productType: number
    prepareTime: any
    description: string
    currencyId: number
    defaultPrice: number
    uperPrice: number
    defaultWagePlanId: number
    uperWagePlanId: number
    offPercent: number
    prePaymentPercent: any
    returnedPercent: number
    giftProductImageUrl: string
    giftProductName: string
    giftProductCurrencyId: number
    giftProductCost: number
    giftCardCurrencyId: number
    giftCardCost: number
    giftCardExpiredDays: number
    inventoryId: any
    quantity: number
    selledNumbers: number
    volumePerFactor: number
    numberOfShelf: any
    weight: any
    fileLink: any
    amazingId: any
    maxBuySpecialPerDay: any
    specialExpiredTime: any
    specialCategories: any
    startReserveTime: string
    endReserveTime: string
    financialValue: number
    createdAt: string
    modifiedAt: string
  }
  