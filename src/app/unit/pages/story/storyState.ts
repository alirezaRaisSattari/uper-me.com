import {StoryRepository} from "@/core/repository/story.repository";
import {updateCaptionModel, updateStoryTimeModel} from "@/data/city/mainpage/story.model";

export class storyState {
    stories = []
    storyLoading

    deleteStory(storyId, pageId, deleted: Function) {
        StoryRepository.getInstance().DeleteStory({
            urlContent: `${storyId}/${pageId}`,
            onReceive: (res) => {
                deleted()
            }
        })
    }

    updateCaption(body, updated: Function) {
        StoryRepository.getInstance().UpdateCaption({
            body: <updateCaptionModel>{...body},
            onReceive: (res) => {
                updated()
            }
        })
    }

    updateTime(body, updated: Function) {
        StoryRepository.getInstance().UpdateExpiredTime({
            body: <updateStoryTimeModel>{...body},
            onReceive: (res) => {
                updated()
            }
        })
    }

    getRecentMainPageStory(data) {
        StoryRepository.getInstance().getRecentStory(
            {
                body: data,
                onReceive: (res) => {
                    if (Array.isArray(res)) {
                        this.stories = res
                    }
                },
                onLoadChange: (load) => this.storyLoading = load
            }
        )
    }
}
