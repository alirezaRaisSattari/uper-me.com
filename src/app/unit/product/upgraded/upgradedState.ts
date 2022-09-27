import { ProductRepository } from "@/core/repository/product.repository";
import { StoryRepository } from "@/core/repository/story.repository";
import {getMainPageId, getSelectedPageId} from "@/core/service/utils.service"
import {BASE_TAKE_18} from "@/core/constant/constant";

enum UpgradePagePlanType {
    consultHome = 1,
    cityHome,
    productSearch,
    pageSearch,
    hashtagSearch,
};

export class UpgradedState {
    loading = false
    filter: UpgradePagePlanType = null
    skipProduct = 0
    takeProduct = 100
    skipStory = 0
    takeStory = 100
    allProducts = []
    allStories = []
    storyType = null
    productLoading = false
    storyLoading = false
    endlist = false
    skipNum : Number

    getForBuyer(isScroll: Boolean) {// isScroll==false --> first time
        ProductRepository.getInstance().getForBuyer({
            body: {
                skip: this.skipProduct,
                take: this.takeProduct,
                pageId: Math.abs(getSelectedPageId())
            },
            onReceive: (res) => {// isScroll==false --> first time
                if (res) {
                    if (isScroll == false) {
                        this.allProducts = []
                        this.allProducts.push(...res)
                    }
                }
            },
            onLoadChange: (load) => { this.loading = load }
        })
    }

    getUpgradePageStoriesForBuyer() {
        if (this.storyLoading || this.endlist) return
        this.skipStory = this.allStories.length
        StoryRepository.getInstance().getUpgradePageStoriesForBuyer({
            body: {
                myPageId: Math.abs(getSelectedPageId()),
                skip: this.skipStory,
                take: BASE_TAKE_18
            },
            onReceive: (res) => {
                // this.allStories = []
                // if (res) {
                //     this.allStories.push(...res)
                // }
                if (Array.isArray(res)) {
                    this.allStories.push(...res)
                    if (res.length < BASE_TAKE_18) this.endlist = true
                } else {
                    this.endlist = true;
                }
            }, onLoadChange: (load) => { this.storyLoading = load }
        })
    }
}
