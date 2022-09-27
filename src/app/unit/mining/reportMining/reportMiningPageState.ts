import { ReportRepository } from "@/core/repository/Report.repository";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId, WindowLoading } from "@/core/service/utils.service";
import { ReportMiningModel } from "@/data/city/mainpage/mining.model";
import { i18n } from "@/main";

export class reportMiningPageState {
    loading = false;
    PostIsFinished = false;
    posts = <ReportMiningModel[]>[];
    dialog = false;
    miningDetails: ReportMiningModel = <ReportMiningModel>{};
    onFinish = false;
    time = null;
    finalDialog = false;
    reservedPrice = 0;
    selectedItem = null

    getAllPostMining() {
        if (this.loading || this.PostIsFinished) return

        ReportRepository.getInstance().reportMineGet({
            body: {
                skip: this.posts.length,
                take: 10,
                pageId: getSelectedPageId()
            }
            , onReceive: (res: ReportMiningModel[]) => {
                if (res === null) {
                    this.PostIsFinished = true;
                } else {
                    if (res.length < 10) this.PostIsFinished = true
                    this.posts.push(...res);

                }
            },
            onLoadChange: (load) => this.loading = load
        })
    }

    mineTransaction(reportId: Number) {
        this.finalDialog = true;
        ReportRepository.getInstance().reportMineDo({
            body: {
                pageId: getSelectedPageId(),
                reportId: reportId
            }, onReceive: (res) => {
                WindowLoading.value = false;
                this.getAllPostMining();
                this.dialog = false;
                this.time = null;
                this.onFinish = false;
                this.reservedPrice = res.price;
            }, onError: (err) => {
                WindowLoading.value = false;
                ToastService.getInstance().error(i18n.global.tc('anErrorAccrue'));
            }
        })
    }

    findSubjectText(itemId) {
        switch (itemId) {
            case 1:
                return i18n.global.tc('mainPages');
            case 2:
                return i18n.global.tc('post');
            case 3:
                return i18n.global.tc('product');
            case 4:
                return i18n.global.tc('story');
            case 5:
                return i18n.global.tc('pageComment');
            case 6:
                return i18n.global.tc('postComment');
            case 7:
                return i18n.global.tc('productComment');
            case 8:
                return i18n.global.tc('productProp');
        }
    }

}
