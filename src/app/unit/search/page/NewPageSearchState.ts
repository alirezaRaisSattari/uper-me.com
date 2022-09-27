import {BASE_TAKE} from "@/core/constant/constant";
import {uniqueString} from "@/core/service/stringUtils.service";
import {FilterWorkpageModel} from "@/data/city/workpage/workPage.model";
import {UserRepository} from "@/core/repository/user.repository";
import {GetAllUpgradeStoryByTypeModel} from "@/data/city/mainpage/story.model";
import {StoryRepository} from "@/core/repository/story.repository";

export class NewProductSearchState {

    loading = false;
    isFilter = false;

    pages = [];
    pagesReachedMax = false;
    filterModel: FilterWorkpageModel = new FilterWorkpageModel();
    getStoryModel: GetAllUpgradeStoryByTypeModel = new GetAllUpgradeStoryByTypeModel();
    storiesReachedMax = false;
    reservedStories = [];

    search(name, isScroll: boolean) {
        if (!isScroll) {
            this.pages = [];
        }
        if (this.isFilter) {
            this.workPageFilter(name, isScroll);
        } else {
            if (name.length > 2) {
                this.searchPages(name, isScroll);
            }
        }

    }

    searchPages(name, isScroll: boolean) {
        if (this.loading) return;

        if (!isScroll && this.pagesReachedMax) {
            this.pagesReachedMax = false;
        }

        if (this.pagesReachedMax) return;

        let body = {
            skip: this.pages.length,
            take: BASE_TAKE,
            dayOfWeek: new Date().getDay(),
            name: uniqueString(name)
        }

        if (!isScroll) {
            this.pages = [];
        }

        UserRepository.getInstance().searchPageByName({
            body,
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                if (Array.isArray(res) && res.length != 0) {
                    if (res.length < BASE_TAKE) {
                        this.pagesReachedMax = true;
                    }
                    this.pages = this.pages.concat(res);
                } else {
                    this.pagesReachedMax = true;
                }
                this.getUpgradedStories(isScroll);
            }
        });

    }

    workPageFilter(name, isScroll: boolean) {
        if (this.loading) return;

        if (!isScroll && this.pagesReachedMax) {
            this.pagesReachedMax = false;
        }

        if (this.pagesReachedMax) return;

        if (!isScroll) {
            this.pages = [];
            this.filterModel.username = uniqueString(name);
        }

        this.filterModel.skip = this.pages.length;

        this.filterModel.username = this.filterModel.username == '' ? null : this.filterModel.username;

        if (Array.isArray(this.filterModel.cityIds) && this.filterModel.cityIds.length == 0) {
            this.filterModel.cityIds = null;
        }

        if (Array.isArray(this.filterModel.categoryIds) && this.filterModel.categoryIds.length == 0) {
            this.filterModel.categoryIds = null;
        }

        if (Array.isArray(this.filterModel.creditLevels) && this.filterModel.creditLevels.length == 0) {
            this.filterModel.creditLevels = null;
        }

        if (Array.isArray(this.filterModel.sellTypes) && this.filterModel.sellTypes.length == 0) {
            this.filterModel.sellTypes = null;
        }

        this.filterModel.take = BASE_TAKE;

        UserRepository.getInstance().FilterWorkPages({
            body: this.filterModel,
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                if (Array.isArray(res) && res.length != 0) {
                    if (res.length < BASE_TAKE) {
                        this.pagesReachedMax = true;
                    }
                    this.pages = this.pages.concat(res);
                } else {
                    this.pagesReachedMax = true;
                }
                this.getUpgradedStories(isScroll);
            }
        });

    }

    getUpgradedStories(isScroll: boolean) {

        if (isScroll && this.reservedStories.length != 0) {
            const x = this.reservedStories.slice();
            this.reservedStories = [];
            this.afterReceivedStories(x);
        }
        if (!isScroll && this.storiesReachedMax) this.storiesReachedMax = false;

        if (this.storiesReachedMax) return;

        if (!isScroll) {
            this.getStoryModel.skip = 0;
            this.getStoryModel.take = BASE_TAKE;
            this.getStoryModel.type = 4;
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
                // res = res.conca
                res.unshift(...this.reservedStories);
                // }
                this.reservedStories = [];
                // debugger;
                this.afterReceivedStories(res);
            }
        })
    }

    getUpgradedStoriesLength() {
        let x = this.pages.filter(m => m.isStoryPack);
        let count = 0;
        for (let i = 0; i < x.length; i++) {
            count += (x[i].stories ?? []).length;
        }
        count += this.reservedStories.length;
        return count;
    }

    afterReceivedStories(res) {
        // debugger;
        for (let i = 0; i < res.length; i++) {
            let storyIndex = this.pages.findIndex(m => m.isStoryPack && (m.stories ?? []).length < 4);
            if (storyIndex == -1) {
                let storiesPackCount = this.pages.filter(m => m.isStoryPack);
                if (storiesPackCount.length == 0) {
                    this.pages.unshift({isStoryPack: true, stories: [res[i]]});
                } else {
                    if (this.pages[this.pages.length - 1].isStoryPack && this.pages[this.pages.length - 1].stories.length == 4) {
                        // if (storiesPackCount.length * 10 > this.pages.length) {
                        if (!this.reservedStories.find(m => m.storyId == res[i])) this.reservedStories.push(res[i]);
                    } else {
                        this.pages.splice((storiesPackCount.length * 11), 0, {
                            isStoryPack: true,
                            stories: [res[i]]
                        });
                    }
                }
            } else {
                this.pages[storyIndex].stories.push(res[i]);
            }
        }

    }

}
