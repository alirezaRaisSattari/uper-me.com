import {BASE_TAKE} from "@/core/constant/constant";
import {ProductRepository} from "@/core/repository/product.repository";
import {getSelectedPageId} from "@/core/service/utils.service";

export class BookmarkProductState {
    skipNum = 0;
    loadingFolders = false
    foldersIsFinished = false
    isNull: Boolean
    allFolders = null
    postsLoading = false;

    GetBookMarkFolder(body) {
        if (this.loadingFolders || this.foldersIsFinished) return;
        this.loadingFolders = true
        body.skip = this.skipNum
        ProductRepository.getInstance().getFolderBookmark({
            urlContent: `${getSelectedPageId()}/${this.skipNum}/${BASE_TAKE}`,
            onReceive: (res) => {
                if (res == null)
                    this.isNull = true
                else this.isNull = false
                if (Array.isArray(res)) {
                    this.allFolders = res
                    // res.forEach(folder => {
                    //     ProductRepository.getInstance().GetFolderItems({
                    //         urlContent: `${getSelectedPageId()}/${this.skipNum}/${BASE_TAKE}` ,
                    //         onLoadChange: (load) => {
                    //         },
                    //         onReceive: (res) => {
                    //             this.postsLoading = true

                    //             folder['posts'] = []
                    //             if (res != null) {
                    //                 folder['posts'] = res
                    //             }

                    //             this.allFolders.push(folder)
                    //         }
                    //     })
                    // });
                    if (BASE_TAKE > res.length)
                        this.foldersIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.loadingFolders = false
                }
            }
        })
    }

    CreateBookMarkFolder(body, created: Function) {
        ProductRepository.getInstance().createFolderBookmark({
            body: body,
            onReceive: (res) => {
                created()
            }
        })
    }

    bookmarkPost(body, moved: Function) {
        ProductRepository.getInstance().BookMarkProduct({
            body: body,
            onReceive: (res) => {
                moved()
            }
        })
    }
}
