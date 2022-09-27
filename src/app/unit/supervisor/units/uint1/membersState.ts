import {UserRepository} from "@/core/repository/user.repository";
import {DateService} from "@/core/service/date.service";
import {getSelectedPageId} from "@/core/service/utils.service";
import {supervisorMember} from "@/data/city/supervisor/supervisor.model";

export class membersState {
    supporterPageId = 0
    membersDetails: supervisorMember
    loading = false

    getMembers() {
        UserRepository.getInstance().GetSupporterMembers({
            body: {
                agencyPageId: getSelectedPageId() < 0 ? Math.abs(getSelectedPageId()) : null,
                supporterPageId: Number(this.supporterPageId)
            },
            onReceive: (res: supervisorMember) => {
                res.factors.forEach(e => {
                    e.createDate = DateService.getInstance().dayTimeDifference(e.createDate)
                });
                res.posts.forEach(e => {
                    e.createDate = DateService.getInstance().dayTimeDifference(e.createDate)
                });
                res.products.forEach(e => {
                    e.createDate = DateService.getInstance().dayTimeDifference(e.createDate)
                });
                this.membersDetails = res
            },
            onLoadChange: (load) => {
                this.loading = load
            }
        })
    }

    getPost_day(pageId, day) {
        const result = this.membersDetails.posts.filter(e => pageId == e.pageId && day - 1 == e.createDate)
        if (result.length) return result[0].number
        else return 0
    }

    getProduct_day(pageId, day) {
        const result = this.membersDetails.products.filter(e => pageId == e.pageId && day - 1 == e.createDate)
        if (result.length) return result[0].number
        else return 0
    }

    getSell_day(pageId, day) {
        const result = this.membersDetails.factors.filter(e => pageId == e.pageId && day - 1 == e.createDate && e.isSell)
        if (result.length) return result[0].number
        else return 0
    }

    getBuy_day(pageId, day) {
        const result = this.membersDetails.factors.filter(e => pageId == e.pageId && day - 1 == e.createDate && !e.isSell)
        if (result.length) return result[0].number
        else return 0
    }

}
