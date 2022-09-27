import { UserRepository } from "@/core/repository/user.repository";
import {GetFullPageModel, PageResponseModel} from "@/data/city/mainpage/getFullPage.model";
import {getSelectedPageId} from "@/core/service/utils.service";
import {LocalStorageService} from "@/core/service/localStorage.service";
import {EnumKeys} from "@/core/constant/constant";
import {leftWidgetState} from "@/app/unit/shared/leftwidget/leftWidgetState";

export class workPageDetailsState {
    workTimeList = []
    Address = []
    addressLoading = false
    categories = []
    features = []
    catLoading = false
    timeLoading = false
    featuresLoading = false
    userPageData
    loading = false



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

    getAllFeatureByWorkPageIdInDetails(workpageId) {
        UserRepository.getInstance().GetAllFeatureByWorkPageIdInDetails({
            urlContent: `${workpageId}`,
            onReceive: (res) => {
                this.features = res
            },
            onLoadChange: (load) => {
            this.featuresLoading = load
        }
        })
    }

    getWorkTime(workpageId) {
        UserRepository.getInstance().GetFullTime({
            urlContent: `${workpageId}`,
            onLoadChange: (load) => {
                this.timeLoading = load
            },
            onReceive: (res) => {
                this.workTimeList = res
            }
        })
    }

    pageAddress(body) {
        UserRepository.getInstance().GetWorkPageAddressByWorkPageId({
            body: body,
            onLoadChange: (load) => {
                this.addressLoading = load
            },
            onReceive: (res) => {
                this.Address = res
            }
        })
    }

    getCategories(workpageId) {
        UserRepository.getInstance().getWorkPagesCategories({
            urlContent: `${workpageId}`,
            onLoadChange: (load) => {
                this.catLoading = load
            },
            onReceive: (res) => {
                this.categories = res
            }
        })
    }
}
