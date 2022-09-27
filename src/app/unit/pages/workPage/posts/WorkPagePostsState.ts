import {PostRepository} from "@/core/repository/post.repository";
import {GetMainPagePostModel, PostModel,} from "@/data/city/mainpage/post.model";
import {BASE_TAKE} from "@/core/constant/constant";
import {PageStore} from "@/core/store/page.store";

export class WorkPagePostsState {
    loading = false
    posts: PostModel[] = []
    skipNum = 0;
    PostIsFinished = false;

    getRecentMainPagePost(pageId) {
        if (this.loading || this.PostIsFinished) return
        this.skipNum = this.posts.length;
        PostRepository.getInstance().getPostByPageId({
                body: <GetMainPagePostModel>{
                    myPageId: PageStore().selectedPageId,
                    pageId: pageId,
                    skip: this.posts.length,
                    take: BASE_TAKE,
                    requestTime: new Date()
                },
                onReceive: (res) => {
                    if (Array.isArray(res)) {
                        if (BASE_TAKE > res.length) this.PostIsFinished = true;
                        this.posts.push(...res)
                    } else this.PostIsFinished = true
                },
                onLoadChange: (load) => this.loading = load
            }
        )
    }

}

