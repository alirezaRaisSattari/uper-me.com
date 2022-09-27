import { StoryRepository } from "@/core/repository/story.repository";
import { StoryModel, updateCaptionModel, updateStoryTimeModel } from "@/data/city/mainpage/story.model";

export class MainPageStoriesState {
    loading = false
    stories: StoryModel[] = []

    getRecentMainPageStory(data) {
        StoryRepository.getInstance().getRecentStory(
            {
                body: data,
                onReceive: (res) => {
                    if (Array.isArray(res)) {
                        this.stories = res

                    }
                },
                onLoadChange: (load) => this.loading = load
            }
        )
    }

    deleteStory(storyId, pageId) {
        StoryRepository.getInstance().DeleteStory({
            urlContent: `${storyId}/${pageId}`,
            onReceive: () => { location.reload() }
        })
    }

    updateCaption(body) {
        StoryRepository.getInstance().UpdateCaption({
            body: <updateCaptionModel>{ ...body },
            onReceive: (res) => {

            }
        })
    }

    updateTime(body) {
        StoryRepository.getInstance().UpdateExpiredTime({
            body: <updateStoryTimeModel>{ ...body },
            onReceive: (res) => {

            }
        })
    }
}
