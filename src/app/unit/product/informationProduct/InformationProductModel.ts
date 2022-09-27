import {ProductRepository} from "@/core/repository/product.repository";
import {ToastService} from "@/core/service/toast.service";

export class InformationProductModel {
    informationProduct: {
        detailId: number
        categoryId: number,
        productType: number,
        usedType: number,
        productOriginal: number,
        name: string,
        latinName: string,
        description: string,
        barcodePublic: string,
        barcodePrivate: string,
    };
    generalProductModel: { detailId?: number, name?: string, latinName?: string, mainImageUrl?: string, description?: string, vmodel?: null, otherImage: [] }[]
    displayGeneralProduct: boolean;

    constructor() {
        this.displayGeneralProduct = false;
    }

    generalProductGetAll(categoryId: number) {
        ProductRepository.getInstance().generalProductGetAll({
            body: {
                skip: 0,
                take: 1000,
                categoryId: categoryId,
            },
            onReceive: res => {
                if (res !== null) {
                    this.displayGeneralProduct = true;
                    this.generalProductModel = [];
                    res.forEach((generalProduct) => {
                        this.generalProductModel.push({
                            detailId: generalProduct.detailId,
                            name: generalProduct.name,
                            latinName: generalProduct.latinName,
                            mainImageUrl: generalProduct.mainImageUrl,
                            description: generalProduct.description,
                            vmodel: null,
                            otherImage: generalProduct.otherImages
                        })
                        ToastService.getInstance().success("اطلاعات با موفقیت دریافت شد");
                    })

                } else {
                    this.displayGeneralProduct = true;
                    this.generalProductModel = null;
                    ToastService.getInstance().error("محصولی برای نمایش وجود ندارد");
                }
            }
        })
    }

}