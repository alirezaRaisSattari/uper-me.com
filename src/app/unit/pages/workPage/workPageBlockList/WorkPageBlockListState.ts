import {FollowRepository} from "@/core/repository/follow.repository";
import {PageStore} from "@/core/store/page.store";

export class workPageBlockListState {
    loading = false
    users = [];
    loadinUnBlock = false;
    selectedPageId = '';

    getBlockList() {
        FollowRepository.getInstance().getMyBlockList({
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                if (Array.isArray(res)) this.users = res
            },
            urlContent: PageStore().selectedPageId
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
