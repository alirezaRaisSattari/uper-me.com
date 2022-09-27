export class ProductImages {
    mainImage: CreateProductOtherImageList = {};
    otherImages: CreateProductOtherImageList[] = [];
}

export class CreateProductOtherImageList {
    base64?: string;
    progress?: number;
    link?: string
}

export class CreateProductDetails {
    name: string = '';
    latinName: string = '';
    categoryId: number = 0;
    mainImageUrl: string = '';
    otherImages = [];
    description: string = '';
    publicBarcode: string = '';
    cargoType: number = null;
}

export class CreateProductFeatures {
    featureId: number;
    answerId: number;
    isShowOuted: boolean;
}

export class CreateProductModel {
    workPageId: number = null;
    detailId: number = null;
    productDetails: CreateProductDetails = new CreateProductDetails();
    folderId: number = null;
    productType: number = null;
    usedType: number = null;
    privateBarcode: string = '';
    isOriginal: boolean = true;
    isShow: boolean = true;
    cityId: number = null;
    areaId: number = null;
    countryId: number = null;
    sellType: number = null;
    productFeatures: CreateProductFeatures[] = [];
}
