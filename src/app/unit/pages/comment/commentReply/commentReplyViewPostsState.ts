import { PostRepository } from "@/core/repository/post.repository";
import {
    deleteCommentOrReply,
    GetMainPageCommentModel,
    getOneComment,
    likeCommentOrReply,
    postMainPageCommentModel
} from "@/data/city/mainpage/post.model";
import { getSelectedPageData } from "@/core/service/utils.service";
import { BASE_TAKE } from "@/core/constant/constant";

export class commentReplyState {
    mainComment = ""
    loading = true
    replyLoading = false
    LikeAndDislikeLoading = false
    replies = []
    loadingReply = false;
    skipNum = 0;
    repliesIsFinished = false;

    getCommentReply(body) {
        if (this.loadingReply || this.repliesIsFinished) return;
        body.skip = this.skipNum
        PostRepository.getInstance().getComment({
            body: <GetMainPageCommentModel>{ ...body },

            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (BASE_TAKE > res.length)
                        this.repliesIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }

                    this.replies = this.replies.concat(res)
                } else this.repliesIsFinished = true
                this.loading = false
            },
            onLoadChange: (load) => {
                this.loadingReply = load
            }
        })
    }

    postReply(body) {
        PostRepository.getInstance().createComment({ // CREATE NEW COMMENT WITH DETAIL
            body: <postMainPageCommentModel>{ ...body },
            onReceive: (res) => {
                this.replies.unshift({
                    ...body,
                    commentId: res.id,
                    numberOfDislikes: 0,
                    numberOfLikes: 0,
                    createDate: new Date().toISOString().replace('Z', ''),
                    pageDetail: {
                        creditLevel: getSelectedPageData().creditLevel,
                        name: getSelectedPageData().name,
                        pageId: getSelectedPageData().id,
                        profileImageUrl: getSelectedPageData().profileUrl,
                        username: getSelectedPageData().username,
                    }
                })
            }
        })
    }

    deleteReply(body) {
        PostRepository.getInstance().deleteComment({
            body: <deleteCommentOrReply>{ ...body },
        })
    }

    likeAndDislike(body) {
        PostRepository.getInstance().likeOrDislikeComment({
            body: <likeCommentOrReply>{ ...body },
            onLoadChange: (load) => {
                this.LikeAndDislikeLoading = load
            }
        })
    }

    removeLikeOrDislike(body) {
        PostRepository.getInstance().removeLikeOrDislikeComment({
            body: <likeCommentOrReply>{ ...body },
            onLoadChange: (load) => {
                this.LikeAndDislikeLoading = load
            }
        })
    }

    getMainComment(body) {
        PostRepository.getInstance().getMainComment({
            body: <getOneComment>{ ...body },
            onReceive: (res) => {
                this.mainComment = res
            }
        })
    }

}
