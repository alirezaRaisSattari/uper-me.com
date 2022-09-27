import {ProductRepository} from "@/core/repository/product.repository";

export class ProductStatusesState {
    loadingFolders = false
    isNull: Boolean
    allFolders = null

    getFolders(body) {
        ProductRepository.getInstance().getProductFolderByPageId({
            body: body,
            onReceive: (res) => {
                this.isNull = res == null;
                if (Array.isArray(res))
                    this.allFolders = res;
            }
        })
    }

    CreateProductFolder(body, created: Function) {
        ProductRepository.getInstance().CreateNewFolders({
            body: body,
            onReceive: (res) => {
                created()
            }
        })
    }
}
