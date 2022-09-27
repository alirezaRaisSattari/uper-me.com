import { BASE_TAKE, Constant } from "@/core/constant/constant";
import { StoryRepository } from "@/core/repository/story.repository";

export class archiveStoriesState {
    skipNum = 0;
    storiesList = []
    loadingStories = false
    storiesIsFinished = false
    isNull: Boolean
    deleteLoading = false

    deletedStories(body) {
        if (this.loadingStories || this.storiesIsFinished) return;

        body.skip = this.skipNum;
        StoryRepository.getInstance().getMyExpiredStories({
            urlContent: `${body.skip}/${body.take}/${body.pageId}`,
            onReceive: (res) => {
                if (Array.isArray(res)) {
                    this.storiesList.push(...res);
                    if (Constant.TAKE_20 > res.length)
                        this.storiesIsFinished = true
                    if (res.length == Constant.TAKE_20) {
                        this.skipNum += Constant.TAKE_20;
                    }
                }
            },
            onLoadChange: (load) => {
                this.loadingStories = load
            }
        })
    }

    deleteStory(storyId, pageId, afterLoad) {
        StoryRepository.getInstance().DeleteStory({
            urlContent: `${storyId}/${pageId}`,
            onReceive: () => { afterLoad() },
            onLoadChange: (load) => { this.deleteLoading = load }
        })
    }

}
