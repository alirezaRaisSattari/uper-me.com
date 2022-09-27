import { BASE_TAKE } from "@/core/constant/constant";
import { PostRepository } from "@/core/repository/post.repository";
import { getSelectedPageId } from "@/core/service/utils.service";

export class folderItemState {
    loading = false
    allItems = []
    itemsIsFinished = false
    skipNum = 0
    foldersIsFinished = false
    allFolders = []
    loadingFolders = false

    getItems(body) {
        if (this.itemsIsFinished) return;
        body.skip = this.skipNum;
        PostRepository.getInstance().GetFolderItems({
            body: body,
            onLoadChange: (load) => {
                this.loading = load
            },
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    res.forEach((e) => {
                        e['selectPost'] = false;
                        this.allItems.push(e)
                    })
                    if (BASE_TAKE > res.length)
                        this.itemsIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                } else {
                    this.itemsIsFinished = true
                }
            }
        })
    }

    deleteBookmarkFolder(folderId, deleted: Function) {
        PostRepository.getInstance().deleteBookmarkFolder({
            urlContent: `${folderId}/${getSelectedPageId()}`,
            onReceive: (res) => {
                deleted()
            }
        })
    }

    updateFolderName(body, updated: Function) {
        PostRepository.getInstance().updateBookmarkFolder({
            body: body,
            onReceive: (res) => {
                updated()
            }
        })
    }

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

    MovePostBetweenFolders(body, moved: Function) {
        PostRepository.getInstance().MovePostBetweenFolders({
            body: body,
            onReceive: (res) => {
                moved()
            },
            onLoadChange: (load) => {
            }
        })
    }
}
