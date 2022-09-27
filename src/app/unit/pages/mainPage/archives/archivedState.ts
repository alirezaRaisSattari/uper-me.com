import {BASE_TAKE} from "@/core/constant/constant";
import {PostRepository} from "@/core/repository/post.repository";
import {deletedPostsModel} from "@/data/city/mainpage/post.model";

export class getArchived {
    skipNum = 0;
    postsList = []
    loadingPosts = false
    postsIsFinished = false
    isNull: Boolean

    deletedPosts(body) {
        if (this.loadingPosts || this.postsIsFinished) return;
        this.loadingPosts = true
        body.skip = this.skipNum;
        PostRepository.getInstance().GetDeletedPosts({
            body: <deletedPostsModel>{...body},
            onReceive: (res) => {
                this.postsList = null
                if (res == null)
                    this.isNull = true
                else this.isNull = false
                if (Array.isArray(res)) {
                    this.postsList = res;
                    if (BASE_TAKE > res.length)
                        this.postsIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.loadingPosts = false


                }
            }
        })
    }

}