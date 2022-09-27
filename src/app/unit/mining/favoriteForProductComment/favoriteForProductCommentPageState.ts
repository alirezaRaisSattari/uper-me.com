import {PostRepository} from "@/core/repository/post.repository";
import { ProductCommentRepository } from "@/core/repository/productComment.repository";
import router from "@/core/router/router";
import {DateService} from "@/core/service/date.service";
import {ToastService} from "@/core/service/toast.service";
import {getSelectedPageId, WindowLoading} from "@/core/service/utils.service";
import {GetActiveItemModel, getAllPostMiningModel} from "@/data/city/mainpage/post.model";
import {i18n} from "@/main";
import moment from "moment";

export class favoriteForProductCommentState {
    loading = false;
    PostIsFinished = false;
    posts = [];
    dialog = false;
    miningDetails = null;
    onFinish = false;
    time = null;
    selectedItem = null;
    finalDialog = false
    reservedPrice = 0;

    getAllPostMining() {
        if (this.loading || this.PostIsFinished) return
        this.loading = true;
        ProductCommentRepository.getInstance().MiningGetAll({
            body: {
                skip: this.posts.length,
                take: 10,
                pageId: getSelectedPageId()
            }, onReceive: (res: getAllPostMiningModel[]) => {
                this.loading = false;
                if (res === null) {
                    this.PostIsFinished = true;
                } else {
                    if (res.length < 10) this.PostIsFinished = true;
                    this.posts.push(...res);
                }
            },
            onLoadChange: (load) => this.loading = load,
            onError:(err)=>{
                ToastService.getInstance().error(err.toString());
                router.push('/')
            }
        })
    }

    getPageMiningTime() {
        ProductCommentRepository.getInstance().MiningGetActive({
            urlContent: getSelectedPageId()
            , onReceive: (res) => {
                this.dialog = false;
                if (res) {
                    this.miningDetails = res;
                    
                    this.getColdDown();
                }
            },
        })
    }

    createMining(commentId) {
        ProductCommentRepository.getInstance().MiningMine({
            body: {
                pageId: getSelectedPageId(),
                commentId: commentId
            }, onReceive: (res) => {
                this.dialog = false;
                this.posts = [];
                this.miningDetails = null;
                this.PostIsFinished = false;
                this.loading = false;
                this.getAllPostMining();
                this.getPageMiningTime();
            }
        })
    }

    mineTransaction(itemId: Number) {
        this.finalDialog = true;

        ProductCommentRepository.getInstance().MiningMineTransaction({
            body: {
                pageId: getSelectedPageId(),
                itemId: itemId
            }, onReceive: (res) => {
                WindowLoading.value = false;
                this.miningDetails = null;
                this.posts = this.posts.filter(item => item.commentId != itemId);
                ToastService.getInstance().success(i18n.global.tc('successMassage'));
                this.dialog = false;
                this.time = null;
                this.onFinish = false;
                this.reservedPrice = res.price;
            }, onError: () => {
                WindowLoading.value = false;
                ToastService.getInstance().error(i18n.global.tc('anErrorAccrue'));
            }
        })
    }

    getColdDown() {
        let date = moment(this.miningDetails.mineTime)    
        date.add({hour:3.5})    
        DateService.getInstance().countDown(
            date,
            (time) => {
                this.time = time;
            }, () => {
                this.time = null;
                this.onFinish = true;
            }
        );
    }

    getLinkMining() {
        const comment = this.posts.find(item => item.commentId == this.miningDetails.commentId);
        return comment.mainImageUrl + '_sm.webp';
    }
}
