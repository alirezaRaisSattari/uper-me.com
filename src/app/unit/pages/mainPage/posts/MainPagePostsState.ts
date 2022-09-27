import { PostRepository } from "@/core/repository/post.repository";
import { GetMainPagePostModel, } from "@/data/city/mainpage/post.model";
import { BASE_TAKE_18 } from "@/core/constant/constant";
import { PageStore } from "@/core/store/page.store";

export class MainPagePostsState {
    loading = false
    likeLoading = false
    commentLoading = false
    posts = []
    listComment: []
    skipNum = 0;
    PostIsFinished = false;

    getRecentMainPagePost(pageId) {
        if (this.loading || this.PostIsFinished) return
        this.skipNum = this.posts.length
        PostRepository.getInstance().getPostByPageId({
            body: <GetMainPagePostModel>{
                pageId: pageId,
                myPageId: PageStore().selectedPageId,
                skip: this.posts.length,
                take: BASE_TAKE_18,
                requestTime: new Date()
            },
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (res.length < BASE_TAKE_18) this.PostIsFinished = true
                    this.posts.push(...res)
                } else {
                    this.PostIsFinished = true;
                }
            },
            onLoadChange: (load) => this.loading = load
        }
        )
    }

}

