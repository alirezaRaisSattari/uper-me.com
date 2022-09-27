import {EnumKeys} from "@/core/constant/constant";
import {LocalStorageService} from "@/core/service/localStorage.service";
import {PageStore} from "@/core/store/page.store";

export class leftWidgetState {
    private static instance: leftWidgetState

    public static getInstance(): leftWidgetState {
        if (!leftWidgetState.instance) {
            leftWidgetState.instance = new leftWidgetState()
        }
        return leftWidgetState.instance
    }

    selectedPage = 0
    pages = []
    _pages = []
    mainPageData
    workPagesData
    buffer = 0

    setPages() {
        this.buffer++
        this.selectedPage = Number(PageStore().selectedPageId);
        this.mainPageData = JSON.parse(
            String(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
        );
        this.workPagesData = JSON.parse(
            String(LocalStorageService.getInstance().getItem(EnumKeys.KeyWorkPages))
        );
        this.pages = []
        this._pages = []
        if (this.mainPageData != null && typeof this.mainPageData === "object") {
            this.pages.push({
                profileUrl: this.mainPageData.profileImageUrl,
                name: this.mainPageData.name,
                username: this.mainPageData.username,
                creditLevel: this.mainPageData.creditLevel,
                id: Math.abs(this.mainPageData.mainPageId),
                userStatus: null,
            });
            this._pages.push({
                profileUrl: this.mainPageData.profileImageUrl,
                name: this.mainPageData.name,
                username: this.mainPageData.username,
                creditLevel: this.mainPageData.creditLevel,
                id: Math.abs(this.mainPageData.mainPageId),
                userStatus: null,
            });
        }

        if (this.workPagesData != null && Array.isArray(this.workPagesData)) {
            this.workPagesData.forEach((e) => {
                if (e.pageId < 0) {
                    this.pages.push({
                        profileUrl: e.profileImageUrl,
                        name: e.name,
                        username: e.username,
                        creditLevel: e.creditLevel,
                        id: -Math.abs(e.pageId),
                        userStatus: e.userStatus,
                    });
                    this._pages.push({
                        profileUrl: e.profileImageUrl,
                        name: e.name,
                        username: e.username,
                        creditLevel: e.creditLevel,
                        id: -Math.abs(e.pageId),
                        userStatus: e.userStatus,
                    });
                }
            });
        }
    }
}
