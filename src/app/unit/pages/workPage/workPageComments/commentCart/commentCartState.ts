import {PageCommentRepository} from "@/core/repository/pageComment.repository"
import {getSelectedPageId} from "@/core/service/utils.service"

export class commentCartState {
    targetPageId = null
    sourcePageId = getSelectedPageId()
    commentId = null
    comment = null
    isLike = false
    liked = false
    disliked = false
    countOfReplies = null

    deleteComment() {
        PageCommentRepository.getInstance().deleteComment({
            body: {
                commentId: this.commentId,
                targetPageId: this.targetPageId,
                sourcePageId: this.sourcePageId
            },
            onReceive: (res) => {

            }
        })
    }

    LikeOrDisLike() {
        PageCommentRepository.getInstance().LikeOrDisLike({
            body: {
                commentId: this.commentId,
                pageId: getSelectedPageId(),
                targetPageId: this.targetPageId,
                isLike: this.isLike
            }
        })

    }

    RemoveLikeOrDisLike() {
        PageCommentRepository.getInstance().RemoveLikeOrDisLike({
            body: {
                commentId: this.commentId,
                pageId: getSelectedPageId(),
                targetPageId: this.targetPageId,
                isLike: this.isLike
            }
        })

    }

    getCountOfReplies() {
        PageCommentRepository.getInstance().getCountOfReplies({
            body: [
                {targetPageId: this.targetPageId}
            ],
            onReceive: (res) => {
                this.countOfReplies = res[0].count
            }
        })
    }


}
