import {ProductRepository} from "@/core/repository/product.repository";
import {BASE_TAKE} from "@/core/constant/constant";
import {FilterProductModel} from "@/data/city/product/product.model";
import {uniqueString} from "@/core/service/stringUtils.service";
import {StoryRepository} from "@/core/repository/story.repository";
import {GetAllUpgradeStoryByTypeModel} from "@/data/city/mainpage/story.model";

export class NewProductSearchState {

    loading = false;
    resKeywords = [];
    KeywordsShowMore = false;
    selectedKeyword = null;

    products = [];
    productsReachedMax = false;

    filterProductModel: FilterProductModel = new FilterProductModel();

    getStoryModel: GetAllUpgradeStoryByTypeModel = new GetAllUpgradeStoryByTypeModel();
    storiesReachedMax = false;
    reservedStories = [];

    clearKeywordForApi() {
        this.resKeywords = [];
        this.products = [];
        this.KeywordsShowMore = false;
    }

    searchProductKeyword(name, isScroll: boolean) {
        if (this.loading) return;
        if (!isScroll) {
            this.clearKeywordForApi();
        }
        let body = {name, skip: this.resKeywords.length, take: BASE_TAKE}
        this.KeywordsShowMore = false;
        ProductRepository.getInstance().SearchOnProductKeywords({
            body,
            onReceive: (res) => {
                if (Array.isArray(res) && res.length != 0) {
                    if (res.length >= BASE_TAKE) {
                        this.KeywordsShowMore = true;
                    }
                    this.resKeywords = this.resKeywords.concat(res);
                } else {
                    this.KeywordsShowMore = false;
                    this.filterProductModel.categoryIds = null;
                    this.productFilter(name, false);
                }
            },
            onLoadChange: (load) => this.loading = load
        })
    }

    productFilter(name, isScroll: boolean) {
        if (this.loading || this.resKeywords.length != 0) return;
        if (!isScroll && this.productsReachedMax) {
            this.productsReachedMax = false;
        }

        if (this.productsReachedMax) return;

        if (!isScroll) {
            this.products = [];
            this.filterProductModel.requestTime = new Date();
            this.filterProductModel.name = uniqueString(name);
        }
        this.filterProductModel.skip = this.products.length;
        if (this.selectedKeyword != null) {
            this.filterProductModel.categoryIds = this.filterProductModel.categoryIds ?? [];
            this.filterProductModel.categoryIds.push(this.selectedKeyword.catId);
        }

        this.filterProductModel.name = this.filterProductModel.name == '' ? null : this.filterProductModel.name;

        if (Array.isArray(this.filterProductModel.areaIds) && this.filterProductModel.areaIds.length == 0) {
            this.filterProductModel.areaIds = null;
        }

        if (Array.isArray(this.filterProductModel.areaIds) && this.filterProductModel.areaIds.length != 0) {
            this.filterProductModel.cityIds = null;
        }

        if (Array.isArray(this.filterProductModel.cityIds) && this.filterProductModel.cityIds.length == 0) {
            this.filterProductModel.cityIds = null;
        }

        if (Array.isArray(this.filterProductModel.categoryIds) && this.filterProductModel.categoryIds.length == 0) {
            this.filterProductModel.categoryIds = null;
        }

        if (Array.isArray(this.filterProductModel.creditLevels) && this.filterProductModel.creditLevels.length == 0) {
            this.filterProductModel.creditLevels = null;
        }

        ProductRepository.getInstance().productFilter({
            body: this.filterProductModel,
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                if (Array.isArray(res) && res.length != 0) {
                    if (res.length < BASE_TAKE) {
                        this.productsReachedMax = true;
                    }
                    this.products = this.products.concat(res);
                } else {
                    this.productsReachedMax = true;
                }
                this.getUpgradedStories(isScroll);
            }
        });
    }


    getUpgradedStories(isScroll: boolean) {
        if (isScroll && this.reservedStories.length != 0) {
            this.afterReceivedStories(this.reservedStories);
            this.reservedStories = [];
        }
        if (!isScroll && this.storiesReachedMax) this.storiesReachedMax = false;

        if (this.storiesReachedMax) return;

        if (!isScroll) {
            this.getStoryModel.skip = 0;
            this.getStoryModel.take = BASE_TAKE;
            this.getStoryModel.type = 3;
            this.getStoryModel.requestTime = new Date();
            this.reservedStories = [];
        } else {
            this.getStoryModel.skip = this.getUpgradedStoriesLength();
        }
        StoryRepository.getInstance().getAllUpgradeStoryByType({
            body: this.getStoryModel,
            onReceive: (res) => {
                if (!(Array.isArray(res) && res.length != 0)) {
                    res = [];
                    this.storiesReachedMax = true;
                } else {
                    if (res.length < BASE_TAKE) {
                        this.storiesReachedMax = true;
                    }
                }
                res.unshift(...this.reservedStories);
                this.reservedStories = [];
                this.afterReceivedStories(res);
            }
        })
    }

    getUpgradedStoriesLength() {
        let x = this.products.filter(m => m.isStoryPack);
        let count = 0;
        for (let i = 0; i < x.length; i++) {
            count += (x[i].stories ?? []).length;
        }
        count += this.reservedStories.length;
        return count;
    }

    afterReceivedStories(res) {
        // let lastIndex = 0;
        // debugger;
        for (let i = 0; i < res.length; i++) {
            let storyIndex = this.products.findIndex(m => m.isStoryPack && (m.stories ?? []).length < 4);
            if (storyIndex == -1) {
                let storiesPackCount = this.products.filter(m => m.isStoryPack);
                if (storiesPackCount.length == 0) {
                    this.products.unshift({isStoryPack: true, stories: [res[i]]});
                } else {
                    if (storiesPackCount.length * 10 > this.products.length) {
                        this.reservedStories.push(res[i]);
                    } else {
                        this.products.splice((storiesPackCount.length * 11), 0, {
                            isStoryPack: true,
                            stories: [res[i]]
                        });
                    }
                }
            } else {
                this.products[storyIndex].stories.push(res[i]);
            }
        }

    }

}
