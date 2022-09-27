import { EnumKeys } from "@/core/constant/constant";
import { UserRepository } from "@/core/repository/user.repository";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { ToastService } from "@/core/service/toast.service";
import { userStatusType } from "@/core/service/type.service";
import { getSelectedPageData, getSelectedPageId } from "@/core/service/utils.service";
import { PageStore } from "@/core/store/page.store";
import { i18n } from "@/main";
import { trim } from "lodash";

export class editWorkPageDetailsState {
    bioTxt = getSelectedPageData().bio
    pageType = getSelectedPageData().isPublic
    showFollower = getSelectedPageData().showFollower
    showFollowing = getSelectedPageData().showFollowing
    loading = false

    UpdateBio() {
        UserRepository.getInstance().UpdateBio({
            body: {
                bio: trim(this.bioTxt),
                workPageId: Math.abs(getSelectedPageId())
            },
            onReceive: () => {
                ToastService.getInstance().success(i18n.global.tc('success'))
                let workPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
                let index = workPage.findIndex(e => e.pageId == PageStore().selectedPageId);
                workPage[index].bio = trim(this.bioTxt)
                LocalStorageService.getInstance().setItem(EnumKeys.KeyWorkPages, JSON.stringify(workPage))
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
            },
            onError: (err) => { },
            onLoadChange: (load) => { this.loading = load }
        })
    }

    UpdateFollowInfo() {
        UserRepository.getInstance().UpdateFollowInfo({
            body: {
                isPublic: this.pageType !== getSelectedPageData().isPublic ? this.pageType : null,
                followInfo: this.pageType !== getSelectedPageData().isPublic ? null : {
                    showFollowers: this.showFollower,
                    showFollowings: this.showFollowing
                },
                workPageId: Math.abs(getSelectedPageId())
            },
            onReceive: () => {
                ToastService.getInstance().success(i18n.global.tc('success'))
                let workPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
                let index = workPage.findIndex(e => e.pageId == PageStore().selectedPageId);
                workPage[index].isPublic = this.pageType
                workPage[index].showFollowing = this.pageType ? this.showFollowing : workPage.showFollowing
                workPage[index].showFollower = this.pageType ? this.showFollower : workPage.showFollowing
                LocalStorageService.getInstance().setItem(EnumKeys.KeyWorkPages, JSON.stringify(workPage))
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
            },
            onError: (err) => { },
            onLoadChange: (load) => { this.loading = load }
        })
    }
}
