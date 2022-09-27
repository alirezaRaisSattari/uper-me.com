import {ProductRepository} from "@/core/repository/product.repository"
import {likeAndUnlikePosts} from "@/data/city/mainpage/post.model"

export class HomeScreenProductSliderState {
    commentLoading = false
    unlikeLoading = false
    likeLoading = false

    postComment(body) {
        // ProductRepository.getInstance().createComment({
        //     body: <postMainPageCommentModel>{ ...body },
        //     onLoadChange: (load) => this.commentLoading = load
        // })
    }

    likePost(body, liked: Function) {
        ProductRepository.getInstance().likeProduct({
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
        ProductRepository.getInstance().unLikeProduct({
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
