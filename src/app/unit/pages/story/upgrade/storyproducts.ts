import {BASE_TAKE_18} from "@/core/constant/constant";
import { ProductRepository } from "@/core/repository/product.repository";
import {getSelectedPageId} from "@/core/service/utils.service";
enum UpgradePagePlanType {
    consultHome = 1,
    cityHome,
    productSearch,
    pageSearch,
    hashtagSearch,
};
export class storyproducts {
    loading = false
    allProducts = []
    skipProduct = 0
    takeProduct = 100
    endlist = false
    skipNum : Number

    getForBuyer(isScroll: Boolean) {// isScroll==false --> first time
        ProductRepository.getInstance().getForBuyer({
            body: {
                skip: this.skipProduct,
                take:BASE_TAKE_18 ,
                pageId: Math.abs(getSelectedPageId())
            },
            onReceive: (res) => {// isScroll==false --> first time
                if (res) {
                    if (isScroll == false) {
                        this.allProducts = []
                        this.allProducts.push(...res)
                    }
                }
            },
            onLoadChange: (load) => { this.loading = load }
        })
    }



}