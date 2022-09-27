import { BASE_TAKE } from "@/core/constant/constant";
import { PostRepository } from "@/core/repository/post.repository";
import { ProductRepository } from "@/core/repository/product.repository";
import { getSelectedPageId } from "@/core/service/utils.service";

export class pageBookMarkes {
    loadingFolders = false
    foldersIsFinished = false
    skipNum = 0
    allFolders = []
    ProductFoldersIsFinished = false
    productsSkipNum = 0
    allProductFolders = []
    loadingProductsFolders = false

    GetBookMarkFolder(body) {
        if (this.foldersIsFinished) return;
        body.skip = this.skipNum
        PostRepository.getInstance().GetBookMarkFolder({
            body: body,
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    this.allFolders.push(...res)
                    if (BASE_TAKE > res.length)
                        this.foldersIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                } else {
                    this.foldersIsFinished = true

                }
            },
            onLoadChange: (load) => {
                this.loadingFolders = load
            }
        })
    }

    GetProductsFolder(body) {
        if (this.ProductFoldersIsFinished) return;
        body.skip = this.productsSkipNum
        ProductRepository.getInstance().getFolderBookmark({
            urlContent: `${getSelectedPageId()}/${this.productsSkipNum}/${BASE_TAKE}`,
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    this.allProductFolders.push(...res)
                    if (BASE_TAKE > res.length)
                        this.ProductFoldersIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.productsSkipNum += BASE_TAKE;
                    }
                } else {
                    this.ProductFoldersIsFinished = true

                }
            },
            onLoadChange: (load) => {
                this.loadingProductsFolders = load
            }
        })
    }

}
