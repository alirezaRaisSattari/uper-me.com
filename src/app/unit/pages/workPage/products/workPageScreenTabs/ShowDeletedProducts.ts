import { BASE_TAKE } from "@/core/constant/constant";
import { ProductStatus } from "@/core/enum/enums";
import { ProductRepository } from "@/core/repository/product.repository";

export class ShowDeletedProductsState {

    loadingProductFolders = false;
    listProductsIsEmpty = false;
    showProductsHeader = true;
    loadingProducts = false;
    searchSelect = null;
    workPageId = null;
    searchInput = '';
    model = null;
    skipNum = 0;
    take = 10;

    productFolders = [];
    products = [];

    loadProducts(workPageId: number, isScroll: boolean) {
        if (this.loadingProducts) {
            return;
        }
        if (this.listProductsIsEmpty && isScroll) {
            return;
        }
        if (!isScroll) {

            this.skipNum = 0
            this.products = []
            this.listProductsIsEmpty = false
        }
        this.getAllProducts(workPageId);
    }

    getAllProducts(pageId) {
        ProductRepository.getInstance().GetReportedOrDeletedProduct(
            {
                body: {
                    skip: this.skipNum,
                    take: BASE_TAKE,
                    workPageId: Math.abs(pageId),
                    productStatus: ProductStatus.Deleted,
                },
                onReceive: (res) => this.afterReceivedProducts(res),
                onLoadChange: (load) => this.loadingProducts = load
            }
        )
    }

    afterReceivedProducts(res: any) {
        if (!Array.isArray(res) || res.length === 0) {
            this.listProductsIsEmpty = true
            res = []
        }
        this.products = this.products.concat(res.filter(e => e.productStatus !== 3 || e.productStatus !== 4))
        this.skipNum = this.products.length
    }

}
