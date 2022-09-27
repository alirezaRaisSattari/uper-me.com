import { GetFullPageModel, PageResponseModel } from "@/data/city/mainpage/getFullPage.model";
import { UserRepository } from "@/core/repository/user.repository";
import {getMainPageId, getSelectedPageId} from "@/core/service/utils.service";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { EnumKeys } from "@/core/constant/constant";
import { leftWidgetState } from "../../shared/leftwidget/leftWidgetState";

export class PageRouteState {

    loading = false
    userPageData: PageResponseModel = null

    getFullPage(username) {
        UserRepository.getInstance().getFullPage({
            body: <GetFullPageModel>{
                myPageId: getSelectedPageId(),
                username: String(username),
                targetPageId: null
            },
            onReceive: (res) => {
                if (getSelectedPageId() > 0 && getSelectedPageId() === res.pageId) {
                    LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(res))
                }
                leftWidgetState.getInstance().setPages()
                this.userPageData = res;
            },
            onLoadChange: (load) => {
                this.loading = load
            }
        });
    }

}
