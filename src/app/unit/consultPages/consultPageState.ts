import { SettingRepository } from "@/core/repository/setting.repository";
import { StoryRepository } from "@/core/repository/story.repository";
import { UserRepository } from "@/core/repository/user.repository";
import { BannerModel } from "@/data/setting/publicBanner.model";
import { GetAllUpgradeStoryByTypeModel } from "@/data/city/mainpage/story.model";


export class consultPageState {
    bannerLoading = true
    storyLoading = true
    postsLoading = true
    ConsultPostsEmpty = false
    EndStory = false
    receiveStory = false
    noStory = false
    loading = false
    banners = Array<BannerModel>()
    stories = []
    ConsultPosts = []
    categoryList = []

    getBanners(data) {
        SettingRepository.getInstance().getAllBanners({
            body: data,
            onReceive: (res) => {
                this.banners = res
                this.bannerLoading = false
            },
        })
    };

    getStories(data) {
        StoryRepository.getInstance().getAllUpgradeStoryByType({
            body: data,
            onLoadChange: loadStatus => this.storyLoading = loadStatus,
            onReceive: (res: any) => {
                if (this.receiveStory === true && res == null) {
                    this.EndStory = true;
                    return;
                } else if (res == null) {
                    this.noStory = true;
                    return;
                } else this.receiveStory = true;
                this.stories.push(...res)
            }

        })
    }

    getConsultPosts(skip: Number = 0) {
        UserRepository.getInstance().getConsultPages({
            body: {
                type: 1,
                skip: skip,
                take: 20
            },
            onLoadChange: loadStatus => this.postsLoading = loadStatus,
            onReceive: (res: any) => {
                if (res != null) {
                    if (res.length === 0)
                        this.ConsultPostsEmpty = true
                    this.ConsultPosts.push(...res);
                }
            }
        })
    }

    handleGetNewStories(newStorySkipVal: Number) {
        if (!this.receiveStory) return;
        if (!this.EndStory) this.getStories(<GetAllUpgradeStoryByTypeModel>{
            requestTime: new Date(),
            type: 1,
            skip: newStorySkipVal,
            take: 2
        });
    };

}
