import { BASE_TAKE } from "@/core/constant/constant";
import { ProductRepository } from "@/core/repository/product.repository";
import { getSelectedPageId } from "@/core/service/utils.service";
export class productItemsState {
    allItems = []
    loading = false
    productsSkipNum = 0
    ProductFoldersIsFinished = false
    allFolders = []
    loadingFolders = false
    getItems(pageId, foldeId) {
        ProductRepository.getInstance().GetFolderItems({
            urlContent: `${pageId}/${foldeId}`,
            onLoadChange: (load) => {
                this.loading = load
            },
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    res.forEach((e) => {
                        e['selectPost'] = false;
                        this.allItems.push(e)
                    })
                }
            }
        })
    }
    updateFolderName(body, updated: Function) {
        ProductRepository.getInstance().editFolderBookmark({
            body: body,
            onReceive: (res) => {
                updated()
            }
        })
    }
    deleteBookmarkFolder(folderId, deleted: Function) {
        ProductRepository.getInstance().deleteFolderBookmark({
            urlContent: `${folderId}/${getSelectedPageId()}`,
            onReceive: (res) => {
                deleted()
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
                    this.allFolders.push(...res)
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
                this.loadingFolders = load
            }
        })
    }
    MovePostBetweenFolders(body, moved: Function) {
        ProductRepository.getInstance().MoveProductBetweenFolders({
            body: body,
            onReceive: (res) => {
                moved()
            },
            onLoadChange: (load) => {
            }
        })
    }
    unBookmarkProduct(body, unbookmarked) {
        ProductRepository.getInstance().unBookmarkProduct({
            body: body,
            onReceive: (res) => {
                unbookmarked()
            }
        })
    }
}