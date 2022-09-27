import {FollowRepository} from "@/core/repository/follow.repository";
import {PageStore} from "@/core/store/page.store";
import {BASE_TAKE} from "@/core/constant/constant";

export class MainPageBlockListState {
    loading = false
    users = [];
    loadinUnBlock = false;
    selectedPageId = '';

    getBlockList() {
        FollowRepository.getInstance().getMyBlockList({
            body: {
                skip: 0,
                take: BASE_TAKE,
                pageId: PageStore().selectedPageId
            },
            onReceive: (res) => {
                if (Array.isArray(res)) this.users = res
            },
            onLoadChange: (load) => this.loading = load,
        })
    }


    unblockUser(index, pageId) {
        this.selectedPageId = pageId
        FollowRepository.getInstance().unBlockMyUser({
            onLoadChange: (load) => this.loadinUnBlock = load,
            onReceive: (res) => {
                this.users.splice(index, 1)
            },
            body: {
                sourcePageId: PageStore().selectedPageId,
                targetPageId: pageId
            }
        })
    }
}
