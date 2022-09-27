import {PostRepository} from "@/core/repository/post.repository"
import {likeAndUnlikePosts, postMainPageCommentModel} from "@/data/city/mainpage/post.model"

export class postItemsState {
    commentLoading = false
    unlikeLoading = false
    likeLoading = false

    postComment(body) {
        PostRepository.getInstance().createComment({
            body: <postMainPageCommentModel>{...body},
            onLoadChange: (load) => this.commentLoading = load
        })
    }

    likePost(body, liked: Function) {
        PostRepository.getInstance().likePost({
            body: <likeAndUnlikePosts>{...body},
            onLoadChange: (load) => {
                this.likeLoading = load
            },
            onReceive: (res) => {
                liked()
            }
        })
    }

    unlikePost(body, unLiked: Function) {
        PostRepository.getInstance().unlikePost({
            body: <likeAndUnlikePosts>{...body},
            onReceive: (res) => {
                unLiked()
            },
            onLoadChange: (load) => {
                this.unlikeLoading = load
            }
        })
    }
}
