import { PageCommentRepository } from "@/core/repository/pageComment.repository";
import { ProductRepository } from "@/core/repository/product.repository";
import router from "@/core/router/router";
import {DateService} from "@/core/service/date.service";
import {ToastService} from "@/core/service/toast.service";
import {getSelectedPageId, WindowLoading} from "@/core/service/utils.service";
import {getAllPostMiningModel, MyProductMiningModel} from "@/data/city/mainpage/post.model";
import {i18n} from "@/main";
import moment from "moment";

export class pageCommentMiningState {
    loading = false;
    PostIsFinished = false;
    posts = [];
    dialog = false;
    miningDetails =null;
    onFinish = false;
    time = null;
    selectedItem = null;
    finalDialog = false
    reservedPrice = 0;

    getAllPostMining() {
        if (this.loading || this.PostIsFinished) return
        this.loading = true;
        
        PageCommentRepository.getInstance().MiningGetAll({
            body: {
                skip: this.posts.length,
                take: 10,
                pageId: Math.abs(getSelectedPageId())
            }
            , onReceive: (res: getAllPostMiningModel[]) => {
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
        PageCommentRepository.getInstance().getActiveMine({
            urlContent: getSelectedPageId()
            , onReceive: (res) => {
                this.dialog = false;
                this.miningDetails = res;
                if (res) {
                    this.getColdDown();
                }
            },
        })
    }

    createMining(commentId) {
        PageCommentRepository.getInstance().pageCommentMine({
            body: {
                pageId: Math.abs(getSelectedPageId()),
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
 
    mineTransaction() {
        this.finalDialog = true;
        PageCommentRepository.getInstance().pageCommentMineTransaction({
            body: {
                pageId: Math.abs(getSelectedPageId()),
                commentId: this.miningDetails.commentId
            }, onReceive: (res) => {
                WindowLoading.value = false;
                this.posts = this.posts.filter(item => item.commentId != this.miningDetails.commentId);
                ToastService.getInstance().success(i18n.global.tc('successMassage'));
                this.miningDetails = null;
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

    initDialog(item) {
        
        this.dialog = true; 
        this.selectedItem = item
    }

}
