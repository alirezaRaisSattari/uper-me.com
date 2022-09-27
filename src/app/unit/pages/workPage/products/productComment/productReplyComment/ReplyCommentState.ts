import { getSelectedPageId } from "@/core/service/utils.service"
import { ToastService } from "@/core/service/toast.service";
import { ProductRepository } from "@/core/repository/product.repository"
import { ProductCommentRepository } from "@/core/repository/productComment.repository"
import { i18n } from "@/main";

export class ReplyCommentState {
    commentId = null    //
    targetPageId = null    //
    TPageId = 0
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
    productId = null
    workPageId = null
    isNull: Boolean
    fullPageLoading = false
    fullProduct = null;
    productConsult = null;


    getProductById() {
        ProductRepository.getInstance().getProductById({
            body: {
                productId: this.productId,
                workPageId: this.workPageId,
                myPageId: getSelectedPageId(),
            },
            onLoadChange: (loadStatus) => {
                this.fullPageLoading = loadStatus
            },
            onReceive: (res) => {
                this.fullProduct = res
                this.productConsult = this.fullProduct.result.productConsult
                this.GetOneComment();
                this.GetAllReplies()

            }
        })
    }

    GetOneComment() {
        ProductCommentRepository.getInstance().GetOne({
            body: {
                commentId: this.commentId,
                productId: Number(this.productId),
                myPageId: this.myPageId
            },
            onLoadChange: (loadStatus) => {
                this.mainCommentLoading = loadStatus
            },
            onReceive: (res) => {
                if (res != null) {
                    this.mainComment = res[0]

                }

            }

        })
    }


    GetNewReply(commentId) {
        ProductCommentRepository.getInstance().GetOne({
            body: {
                commentId: commentId,
                productId: Number(this.productId),
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

        ProductCommentRepository.getInstance().GetAllReplies({
            body: {
                skip: this.skip,
                take: this.take,
                productId: Number(this.productId),
                consultProductId: Number(this.productId),
                parentId: Number(this.commentId),
                myPageId: this.myPageId,
                filterType: 2,
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


    createReply(item) {
        if (item.length == 0) return

        ProductCommentRepository.getInstance().createComment({
            body: {
                parentId: this.commentId,
                sourcePageId: this.myPageId,
                targetPageId: this.TPageId,
                productId: Number(this.productId),
                consultProductId: Number(this.productId),
                scoreItem: {
                    scoreItem1: 2.5,
                    scoreItem2: 2.5,
                    scoreItem3: 2.5,
                    scoreItem4: 2.5,
                    scoreItem5: 2.5
                },
                text: this.yourReply,
                faceScore: 1,
                positivePoints: [],
                negativePoints: [],

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
