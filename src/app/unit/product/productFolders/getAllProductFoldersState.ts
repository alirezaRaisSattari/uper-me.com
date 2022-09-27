import {BASE_TAKE} from "@/core/constant/constant";
import {ProductRepository} from "@/core/repository/product.repository";
import {createProductFolderModel, getAllProductFoldersModel} from "@/data/city/product/product.model";

export class GetFolders {
    skipNum = 0;
    loadingFolders = false
    FoldersIsFinished = false
    isNull: Boolean
    allFolders = []

    getAllFolders(body) {
        if (this.loadingFolders || this.FoldersIsFinished) return;
        this.loadingFolders = true
        body.skip = this.skipNum
        ProductRepository.getInstance().GetAllProductFolder({
            body: <getAllProductFoldersModel>{...body},
            onReceive: (res) => {
                this.isNull = res == null;
                if (Array.isArray(res)) {
                    this.allFolders.push(...res);
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

    createNewProductFolder(body, created: Function) {
        ProductRepository.getInstance().CreateNewFolders({
            body: <createProductFolderModel>{...body},
            onReceive: (res) => {
                created()
            }
        })
    }
}
