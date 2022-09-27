import { PostRepository } from "@/core/repository/post.repository";
import { likeAndUnlikePosts, postMainPageCommentModel, PostModel, posts } from "@/data/city/mainpage/post.model";
import { PageStore } from "@/core/store/page.store";
import router from "@/core/router/router";
import { UserRepository } from "@/core/repository/user.repository";
import { getSelectedPageId } from "@/core/service/utils.service";
import { EnumKeys } from "@/core/constant/constant";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";

export class displayPostsState {
    loading = false
    likeLoading = false
    commentLoading = false
    posts: PostModel[] = []
    listComment: []
    skipNum = 0
    PostIsFinished = false
    postInfo: posts = <posts>{}
    disableBookmark = false
    isBookmark = false
    name = ""
    username = ""
    imgUrl = ""

    getRecentMainPagePost(pageId, postId) {
        PostRepository.getInstance().GetPostByPostId({
            body: {
                myPageId: PageStore().selectedPageId,
                targetPageId: pageId,
                postId: postId
            },
            onReceive: (res) => {
                this.postInfo = res
            }
        })
    }

    likePost(body) {
        PostRepository.getInstance().likePost({
            body: <likeAndUnlikePosts>{ ...body },
            onLoadChange: (load) => {
                this.likeLoading = load
            }
        })
    }

    unlikePost(body) {
        PostRepository.getInstance().unlikePost({
            body: <likeAndUnlikePosts>{ ...body },
        })
    }

    bookmarkOrUnBookmark(body) {
        PostRepository.getInstance().bookmarkOrUnBookmark({
            body: body,
            onReceive: (res) => {
                if (res) {
                    return true
                }
            },
        })
    }

    UnBookMarkFunc(body, cb: Function) {
        this.disableBookmark = true
        PostRepository.getInstance().UnBookMark({
            body: body,
            onReceive: () => {
                this.disableBookmark = false
                cb()
            },
        })
    }

    postComment(body) {
        PostRepository.getInstance().createComment({
            body: <postMainPageCommentModel>{ ...body },
            onLoadChange: (load) => this.commentLoading = load
        })
    }

    deletePost(body) {
        PostRepository.getInstance().deletePost({
            body: { ...body },
            onReceive: () => {
                ToastService.getInstance().success(
                    i18n.global.tc("deletePostSuccessful")
                );
                router.back()
            }
        })
    }

    updatePostCaption(body) {
        PostRepository.getInstance().UpdatePostCaption({
            body: { ...body },
            onReceive: (res) => {
            }
        })
    }

    updateCommentStatus(body) {
        PostRepository.getInstance().UpdatePostTurnOffCommenting({
            body: { ...body },
            onReceive: (res) => {
            }
        })
    }
    getProfileImage(pageId, username) {
        UserRepository.getInstance().getFullPage({
            body: {
                myPageId: getSelectedPageId(),
                targetPageId: pageId,
                username: username
            },
            onReceive: (res) => {
                // LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(res))
                this.imgUrl = res.profileImageUrl
                this.username = res.username
                this.name = res.name
            }
        })
    }
}

