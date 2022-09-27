import {BASE_TAKE} from "@/core/constant/constant";
import {uniqueString} from "@/core/service/stringUtils.service";
import {StoryRepository} from "@/core/repository/story.repository";
import {GetAllUpgradeStoryByTypeModel} from "@/data/city/mainpage/story.model";
import {PostRepository} from "@/core/repository/post.repository";

export class NewPostSearchState {

    loading = false;

    hashTags = [];
    tagsReachedMax = false;
    getStoryModel: GetAllUpgradeStoryByTypeModel = new GetAllUpgradeStoryByTypeModel();
    storiesReachedMax = false;
    reservedStories = [];


    search(name, isScroll: boolean) {
        if (!isScroll) {
            this.hashTags = [];
        }
        this.searchTags(name, isScroll);
    }


    searchTags(name, isScroll: boolean) {
        if (this.loading) return;

        if (!isScroll && this.tagsReachedMax) {
            this.tagsReachedMax = false;
        }

        if (this.tagsReachedMax) return;

        if (!isScroll) {
            this.hashTags = [];
        }

        PostRepository.getInstance().searchByName({
            body: {
                "skip": 0,
                "take": 1000,
                "name": uniqueString(name)
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                if (Array.isArray(res) && res.length != 0) {
                    if (res.length < BASE_TAKE) {
                        this.tagsReachedMax = true;
                    }
                    this.hashTags = this.hashTags.concat(res);
                } else {
                    this.tagsReachedMax = true;
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
                res.unshift(...this.reservedStories);
                this.reservedStories = [];
                this.afterReceivedStories(res);
            }
        })
    }

    getUpgradedStoriesLength() {
        let x = this.hashTags.filter(m => m.isStoryPack);
        let count = 0;
        for (let i = 0; i < x.length; i++) {
            count += (x[i].stories ?? []).length;
        }
        count += this.reservedStories.length;
        return count;
    }

    afterReceivedStories(res) {
        for (let i = 0; i < res.length; i++) {
            let storyIndex = this.hashTags.findIndex(m => m.isStoryPack && (m.stories ?? []).length < 4);
            if (storyIndex == -1) {
                let storiesPackCount = this.hashTags.filter(m => m.isStoryPack);
                if (storiesPackCount.length == 0) {
                    this.hashTags.unshift({isStoryPack: true, stories: [res[i]]});
                } else {
                    if (storiesPackCount.length * 10 > this.hashTags.length) {
                        this.reservedStories.push(res[i]);
                    } else {
                        this.hashTags.splice((storiesPackCount.length * 11), 0, {
                            isStoryPack: true,
                            stories: [res[i]]
                        });
                    }
                }
            } else {
                this.hashTags[storyIndex].stories.push(res[i]);
            }
        }

    }

}
