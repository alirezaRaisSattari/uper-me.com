import {BASE_TAKE} from "@/core/constant/constant";
import {PostRepository} from "@/core/repository/post.repository";

export class bookmarkState {
    skipNum = 0;
    loadingFolders = false
    foldersIsFinished = false
    isNull: Boolean
    allFolders = []
    postsLoading = false;

    GetBookMarkFolder(body) {
        if (this.loadingFolders || this.foldersIsFinished) return;
        this.loadingFolders = true
        body.skip = this.skipNum
        PostRepository.getInstance().GetBookMarkFolder({
            body: body,
            onReceive: (res) => {
                if (res == null)
                    this.isNull = true
                else this.isNull = false
                if (Array.isArray(res)) {
                    if (BASE_TAKE > res.length)
                        this.foldersIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.allFolders = this.allFolders.concat(res)
                    this.loadingFolders = false
                }
            }
        })
    }

    CreateBookMarkFolder(body) {
        PostRepository.getInstance().CreateBookMarkFolder({
            body: body,
            onReceive: (res) => {
                this.allFolders.push({folderId: res.id, posts: [], name: body.name})
            }
        })
    }

    bookmarkPost(body, moved: Function) {
        PostRepository.getInstance().bookmarkOrUnBookmark({
            body: body,
            onReceive: () => {
                moved()
            }
        })
    }
}

