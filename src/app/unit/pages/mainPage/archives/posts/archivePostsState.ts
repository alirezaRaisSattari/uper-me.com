import { BASE_TAKE, Constant } from "@/core/constant/constant";
import { PostRepository } from "@/core/repository/post.repository";
import { deletedPostsModel } from "@/data/city/mainpage/post.model";

export class archivePostsState {
    skipNum = 0;
    postsList = []
    loadingPosts = false
    postsIsFinished = false
    isNull: Boolean

    deletedPosts(body) {
        if (this.loadingPosts || this.postsIsFinished) return;
        body.skip = this.skipNum;
        PostRepository.getInstance().GetDeletedOrReported({
            body: <deletedPostsModel>{ ...body },
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    this.postsList.push(...res);
                    if (Constant.TAKE_20 > res.length)
                        this.postsIsFinished = true
                    if (res.length == Constant.TAKE_20) {
                        this.skipNum += Constant.TAKE_20;
                    }
                }
            },
            onLoadChange: (load) => {
                this.loadingPosts = load
            }
        })
    }

}
