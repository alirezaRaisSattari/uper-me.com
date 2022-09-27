import { ProductRepository } from "@/core/repository/product.repository";
import { ToastService } from "@/core/service/toast.service";

export class ProductMainInformationState {
    productType = 2
    showDialog = false
    generalProductModel = []
    selectedProduct = null
    disable = false
    loading = false;

    generalProductGetAll(categoryId: number) {
        ProductRepository.getInstance().generalProductGetAll({
            body: {
                skip: 0,
                take: 1000,
                categoryId: categoryId,
            },
            onLoadChange: (loadStatus) => this.loading = loadStatus,
            onReceive: res => {
                if (res != null) {

                    this.generalProductModel = [];
                    res.forEach((generalProduct) => {
                        this.generalProductModel.push({
                            detailId: generalProduct.detailId,
                            name: generalProduct.name,
                            latinName: generalProduct.latinName,
                            mainImageUrl: generalProduct.mainImageUrl,
                            description: generalProduct.description,
                            otherImages: generalProduct.otherImages,
                            cargoType: generalProduct.cargoType,
                            categoryId: generalProduct.categoryId,
                            creatorOperatorId: generalProduct.creatorOperatorId,
                            generalStatus: generalProduct.generalStatus,
                            productConsult: generalProduct.productConsult,
                            publicBarcode: generalProduct.publicBarcode,
                        })
                        ToastService.getInstance().success("اطلاعات با موفقیت دریافت شد");
                    })

                } else {
                    ToastService.getInstance().error("محصولی برای نمایش وجود ندارد");
                }
            }
        })
    }


}
