import {PostRepository} from "@/core/repository/post.repository";
import router from "@/core/router/router";
import {DateService} from "@/core/service/date.service";
import {ToastService} from "@/core/service/toast.service";
import {getSelectedPageId, WindowLoading} from "@/core/service/utils.service";
import {GetActiveItemModel, getAllPostMiningModel} from "@/data/city/mainpage/post.model";
import {i18n} from "@/main";
import moment from "moment";

export class myPostsPageState {
    loading = false;
    PostIsFinished = false;
    posts = <getAllPostMiningModel[]>[];
    dialog = false;
    miningDetails: GetActiveItemModel = <GetActiveItemModel>{};
    onFinish = false;
    time = null;
    selectedItem = null;
    finalDialog = false
    reservedPrice = 0;

    getAllPostMining() {
        if (this.loading || this.PostIsFinished) return
        this.loading = true;
        PostRepository.getInstance().getAllPostMining({
            urlContent: `${getSelectedPageId()}/${this.posts.length}/10`
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
        PostRepository.getInstance().getActiveItem({
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

    createMining(postId) {
        PostRepository.getInstance().minePost({
            body: {
                pageId: getSelectedPageId(),
                postId: postId
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

    mineTransaction(productId: Number) {
        this.finalDialog = true;

        PostRepository.getInstance().mineTransaction({
            body: {
                pageId: getSelectedPageId(),
                postId: productId
            }, onReceive: (res) => {
                WindowLoading.value = false;
                this.posts = this.posts.filter(item => item.postId != productId);
                ToastService.getInstance().success(i18n.global.tc('successMassage'));
                this.miningDetails = <GetActiveItemModel>{};
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
}
