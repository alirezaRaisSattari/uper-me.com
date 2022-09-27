import {PageCommentRepository} from "@/core/repository/pageComment.repository"
import {getSelectedPageId} from "@/core/service/utils.service"
import {UserRepository} from "@/core/repository/user.repository";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import { EnumKeys } from "@/core/constant/constant";
import { LocalStorageService } from "@/core/service/localStorage.service";

export class ReplyCommentState {
    commentId = null    //
    targetPageId = null    //
    myPageId = getSelectedPageId()   //
    userName = null //
    fullPage = null
    mainComment = null
    allReplies = []
    yourReply = ''
    first = true
    createLoading = false
    newReply = null
    mainCommentLoading = true
    allRepliesLoading = false
    repliesFinished = false;
    allReplyArrayEmpty = false
    skip = 0
    take = 10
    isNull: Boolean
    fullPageLoading = false


    getFullPage() {

        UserRepository.getInstance().getFullPage({
            body: {
                myPageId: getSelectedPageId(),
                username: this.userName
            },
            onLoadChange: (loadStatus) => {
                this.fullPageLoading = loadStatus
            },
            onReceive: (res) => {
                // LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(res))
                this.fullPage = res

                this.targetPageId = Math.abs(this.fullPage.id)
                this.GetOneComment();
                this.GetAllReplies()
            }
        })
    }

    GetOneComment() {
        PageCommentRepository.getInstance().GetOne({
            body: {
                commentId: this.commentId,
                targetPageId: this.targetPageId,
                myPageId: this.myPageId
            },
            onLoadChange: (loadStatus) => {
                this.mainCommentLoading = loadStatus
            },
            onReceive: (res) => {
                if (res != null) {
                    this.mainComment = res[0]
                    //  this.GetAllReplies()
                }

            }

        })
    }


    GetNewReply(commentId) {
        PageCommentRepository.getInstance().GetOne({
            body: {
                commentId: commentId,
                targetPageId: this.targetPageId,
                myPageId: this.myPageId
            },
            onReceive: (res) => {
                if (res != null) {
                    this.newReply = res[0]

                    this.allReplies.unshift(this.newReply)


                }

            }

        })
    }


    GetAllReplies() {

        this.first = false

        if (this.allRepliesLoading || this.repliesFinished || this.fullPageLoading) {

            return;
        }
        this.allRepliesLoading = true

        PageCommentRepository.getInstance().GetAllReplies({
            body: {
                skip: this.skip,
                take: this.take,
                targetPageId: this.fullPage.id,
                parentId: this.commentId,
                myPageId: this.myPageId,
                filterType: 1,
                requestTime: new Date()
            },

            onReceive: (res) => {
                //  this.allComments = []
                if (res == null) {
                    this.isNull = true
                    this.allRepliesLoading = false
                    if (this.allReplies.length == 0) this.allReplyArrayEmpty = true
                    if (this.allReplies.length != 0) this.allReplyArrayEmpty = false
                } else this.isNull = false
                if (Array.isArray(res)) {
                    {

                        this.allReplies.push(...res);

                        this.allReplyArrayEmpty = false
                    }
                    if (this.take > res.length) {

                        this.repliesFinished = true;
                    }
                    if (res.length == this.take) {

                        this.skip += this.take;
                    }
                    this.allRepliesLoading = false
                    if (this.allReplies.length == 0) this.allReplyArrayEmpty = true
                    if (this.allReplies.length != 0) this.allReplyArrayEmpty = false
                }
            }
        })
    }


    // GetAllReplies() {
    //
    //     if (this.allRepliesLoading || this.repliesFinished) {
    //
    //         return;
    //     }
    //     this.allRepliesLoading = true
    //
    //     PageCommentRepository.getInstance().GetAllReplies({
    //         body: {
    //             skip: this.skip,
    //             take: this.take,
    //             targetPageId: this.targetPageId,
    //             parentId: this.commentId,
    //             myPageId: this.myPageId,
    //             filterType: 0,
    //             requestTime: new Date()
    //         },
    //
    //         onReceive: (res) => {
    //             //  this.allComments = []
    //             if (res == null)
    //                 this.isNull = true
    //             else this.isNull = false
    //             if (Array.isArray(res)) {
    //                 {
    //                     this.allReplies.push(...res);
    //                     this.allReplyArrayEmpty=false
    //                 }
    //                 if (this.take > res.length) {
    //
    //                     this.repliesFinished = true;
    //                 }
    //                 if (res.length == this.take) {
    //
    //                     this.skip += this.take;
    //                 }
    //                 this.allRepliesLoading = false
    //             }
    //
    //
    //
    //             if(this.allReplies.length==0)  this.allRepliesLoading = true
    //
    //         }
    //     })
    // }


    createReply(item) {
        if (item.length == 0) return

        PageCommentRepository.getInstance().createComment({
            body: {
                parentId: this.commentId,
                sourcePageId: this.myPageId,
                targetPageId: this.targetPageId,
                scoreItem: {
                    scoreItem1: 2.5,
                    scoreItem2: 2.5,
                    scoreItem3: 2.5,
                    scoreItem4: 2.5,
                    scoreItem5: 2.5
                },
                text: this.yourReply,
                faceScore: 1,
                positivePoints: null,
                negativePoints: null,

            },
            onLoadChange: (loadStatus) => {
                this.createLoading = loadStatus
            },
            onReceive: (res) => { /// returns comment id

                if (res != null) {

                    ToastService.getInstance().success(i18n.global.tc('missionAccomplished'))
                    this.GetNewReply(res.id)
                    //router.push(`/page/workPageComment/${this.fullPageUserName}`)
                }
            }
        })
    }


}
