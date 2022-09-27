import {BASE_TAKE} from "@/core/constant/constant";
import {ProductRepository} from "@/core/repository/product.repository";
import router from "@/core/router/router";
import {
    getAllProductFoldersModel,
    getFoldersProductModel,
    updateFolderNAmeModel
} from "@/data/city/product/product.model";

export class FoldersProduct {
    skipNum = 0;
    loadingProducts = false
    ProductsIsFinished = false
    isNull: Boolean
    allProducts = []
    loadingFolders = false
    allFolders = []
    FoldersIsFinished = false

    getproducts(body) {
        if (this.loadingProducts || this.ProductsIsFinished) return;
        this.loadingProducts = true
        body.skip = this.skipNum
        ProductRepository.getInstance().getAllProducts({
            body: <getFoldersProductModel>{...body},
            onReceive: (res) => {
                this.allProducts = []
                if (res == null)
                    this.isNull = true
                else this.isNull = false
                if (Array.isArray(res)) {
                    res.forEach(element => {
                        element['isSelected'] = false,
                            this.allProducts.push(element)
                    });
                    // this.allProducts = res;
                    if (BASE_TAKE > res.length)
                        this.ProductsIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.loadingProducts = false

                }
            }
        })
    }

    deleteProductFolder(folderId, workpageId) {
        ProductRepository.getInstance().DeleteProductFolder({
            urlContent: `${folderId}/${workpageId}`,
            onReceive: (res) => {
                router.back()
            }
        })
    }

    updateProductFolderName(body, changed: Function) {
        ProductRepository.getInstance().updateFolder({
            body: <updateFolderNAmeModel>{...body},
            onReceive: (res) => {

                router.back()
            }
        })
    }

    getAllFolders(body) {
        if (this.loadingFolders || this.FoldersIsFinished) return;
        this.loadingFolders = true
        body.skip = this.skipNum
        ProductRepository.getInstance().GetAllProductFolder({
            body: <getAllProductFoldersModel>{...body},
            onReceive: (res) => {
                this.allFolders = null
                if (Array.isArray(res)) {
                    this.allFolders = res;
                    if (BASE_TAKE > res.length)
                        this.FoldersIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.loadingFolders = false
                }
            }
        })
    }

    moveToFolder(body, moved: Function) {
        ProductRepository.getInstance().MoveProductsToFolder({
            body: body,
            onReceive: (res) => {
                moved()
            }
        })
    }
}