import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class StoryRepository extends Repository {
    private static instance: StoryRepository
    public baseUrl = Constant.ApiPrefix_Story


    public static getInstance(): StoryRepository {
        if (!StoryRepository.instance) StoryRepository.instance = new StoryRepository()
        return StoryRepository.instance
    }

    public getRecentStory(data: ReturnResponse) {
        data.url = `${this.baseUrl}Story/GetRecentStory`;
        this.post(data)
    }

    public getAllUpgradeStoryByType(data: ReturnResponse) {
        data.url = `${this.baseUrl}UpgradePlans/GetAllUpgradeStoryByType`;
        this.post(data)
    }

    public getUpgradePageStoriesForBuyer(data: ReturnResponse) {
        data.url = `${this.baseUrl}UpgradePlans/GetUpgradePageStoriesForBuyer`;
        this.post(data)
    }


    public DeleteStory(data: ReturnResponse) {
        data.url = `${this.baseUrl}Story/Delete/${data.urlContent}`;
        this.delete(data)
    }

    public UpdateCaption(data: ReturnResponse) {
        data.url = `${this.baseUrl}Story/UpdateCaption`;
        this.put(data)
    }

    public UpdateExpiredTime(data: ReturnResponse) {
        data.url = `${this.baseUrl}Story/UpdateExpiredTime`;
        this.put(data)
    }

    public GetActiveStories(data: ReturnResponse) {
        data.url = `${this.baseUrl}Story/GetActiveStories`;
        this.post(data)
    }

    public getAllUpgradeStoryPlans(data: ReturnResponse) {
        data.url = `${this.baseUrl}UpgradePagePlans/GetAll`;
        this.post(data)
    }

    public getMyExpiredStories(data: ReturnResponse) {
        data.url = `${this.baseUrl}Story/GetMyExpiredStories/${data.urlContent}`;
        this.get(data)
    }
}
