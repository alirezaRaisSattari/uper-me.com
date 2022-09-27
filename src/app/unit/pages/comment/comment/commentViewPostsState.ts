import { PostRepository } from "@/core/repository/post.repository";
import {
    GetMainPageCommentModel,
    likeCommentOrReply,
    postMainPageCommentModel
} from "@/data/city/mainpage/post.model";
import { getSelectedPageData } from "@/core/service/utils.service";
import { BASE_TAKE } from "@/core/constant/constant";

export class commentViewPostsState {
    listComment = []
    commentLoading = false
    infoCommentLoading = false
    LikeAndDislikeLoading = false
    loadingReply = false;
    skipNum = 0;
    repliesIsFinished = false;

    getComment(body) {
        if (this.loadingReply || this.repliesIsFinished) return
        this.loadingReply = true;
        body.skip = this.skipNum
        PostRepository.getInstance().getComment({
            body: <GetMainPageCommentModel>{ ...body },

            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (BASE_TAKE > res.length)
                        this.repliesIsFinished = true
                    if (res.length === BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.listComment.push(...res)
                    this.loadingReply = false
                }
            },
            onLoadChange: (load) => { this.infoCommentLoading = load }
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

    deleteComment(body) {
        PostRepository.getInstance().deleteComment({
            body: { ...body },
        })
    }

    //CREAT NEW COMMENT
    postComment(body) {
        PostRepository.getInstance().createComment({
            body: <postMainPageCommentModel>{ ...body },
            onReceive: (res) => {
                this.listComment.unshift({ // ADD COMMENT WITH DETAIL
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
}
