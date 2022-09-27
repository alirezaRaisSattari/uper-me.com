import {PageCommentRepository} from "@/core/repository/pageComment.repository"
import {getSelectedPageId} from "@/core/service/utils.service"
import {ProductCommentRepository} from "@/core/repository/productComment.repository"

export class commentCartState {
    targetPageId = null
    sourcePageId = getSelectedPageId()
    commentId = null
    comment = null
    isLike = false
    liked = false
    disliked = false
    productId = null
    workPageId = null

    deleteComment() {
        PageCommentRepository.getInstance().deleteComment({
            body: {
                commentId: this.commentId,
                // targetPageId: this.targetPageId,
                sourcePageId: this.sourcePageId
            },
            onReceive: (res) => {

            }
        })
    }

    LikeOrDisLike() {
        ProductCommentRepository.getInstance().LikeOrDisLike({
            body: {
                commentId: this.commentId,
                pageId: getSelectedPageId(),
                productId: this.productId,
                isLike: this.isLike
            }
        })

    }

    RemoveLikeOrDisLike() {
        ProductCommentRepository.getInstance().RemoveLikeOrDisLike({
            body: {
                commentId: this.commentId,
                pageId: getSelectedPageId(),
                productId: this.productId,
                isLike: this.isLike
            }
        })

    }


}
