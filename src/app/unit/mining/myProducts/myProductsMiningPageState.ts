import { ProductRepository } from "@/core/repository/product.repository";
import router from "@/core/router/router";
import {DateService} from "@/core/service/date.service";
import {ToastService} from "@/core/service/toast.service";
import {getSelectedPageId, WindowLoading} from "@/core/service/utils.service";
import {getAllPostMiningModel, MyProductMiningModel} from "@/data/city/mainpage/post.model";
import {i18n} from "@/main";
import moment from "moment";

export class myProductsMiningState {
    loading = false;
    PostIsFinished = false;
    posts = [];
    dialog = false;
    miningDetails = <MyProductMiningModel>{};
    onFinish = false;
    time = null;
    selectedItem = null;
    finalDialog = false
    reservedPrice = 0;

    getAllPostMining() {
        if (this.loading || this.PostIsFinished) return
        this.loading = true;
        
        ProductRepository.getInstance().MiningGetAll({
            urlContent: `${Math.abs(getSelectedPageId())}/${this.posts.length}/10`
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
        ProductRepository.getInstance().MiningGetPageMiningTime({
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

    createMining(productId) {
        ProductRepository.getInstance().MiningMine({
            body: {
                pageId: Math.abs(getSelectedPageId()),
                productId: productId
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
        ProductRepository.getInstance().MiningMineTransaction({
            body: {
                pageId: Math.abs(getSelectedPageId()),
                productId: this.miningDetails.productId
            }, onReceive: (res) => {
                WindowLoading.value = false;
                this.posts = this.posts.filter(item => item.productId != this.miningDetails.productId);
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
