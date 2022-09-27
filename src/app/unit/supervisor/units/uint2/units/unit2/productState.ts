import {Constant} from "@/core/constant/constant";
import {UserRepository} from "@/core/repository/user.repository";
import {DateService} from "@/core/service/date.service";
import {getSelectedPageId} from "@/core/service/utils.service";

export class productState {
    skipNum = 0;
    productIsFinished = false;
    loading = false
    supporterPageId: Number
    posts = []

    getPosts() {
        if (this.loading || this.productIsFinished) return
        UserRepository.getInstance().GetProducts({
            body: {
                skip: this.skipNum,
                take: Constant.TAKE_20,
                supporterPageId: Number(this.supporterPageId),
                agencyPageId: getSelectedPageId() < 0 ? Math.abs(getSelectedPageId()) : null
            },
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    if (Constant.TAKE_20 > res.length)
                        this.productIsFinished = true
                    if (res.length == Constant.TAKE_20) {
                        this.skipNum += Constant.TAKE_20;
                    }
                    res.forEach(e => {
                        e.time = DateService.getInstance().getJalaliTime(e.createDate);
                        e.createDate = DateService.getInstance().convertToJalali(e.createDate)
                    });
                    this.posts.push(...res)
                } else this.productIsFinished = true
            },
            onLoadChange: (load) => {
                this.loading = load
            }
        })
    }
}
