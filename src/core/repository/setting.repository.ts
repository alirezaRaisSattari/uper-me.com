import {Constant} from '../constant/constant';
import {Repository, ReturnResponse} from './repository';

export class SettingRepository extends Repository {
    private static instance: SettingRepository
    public baseUrl = Constant.ApiPrefix_Setting

    public static getInstance(): SettingRepository {
        if (!SettingRepository.instance) SettingRepository.instance = new SettingRepository()
        return SettingRepository.instance
    }

    public getAllBanners(data: ReturnResponse) {
        data.url = `${this.baseUrl}Banners/GetAllBanners`;
        this.post(data)
    }

    public getAllCountries(data: ReturnResponse) {
        data.url = `${this.baseUrl}Country/GetAll/${data.urlContent}`;
        this.get(data)
    }

    public GetAreaWithPoint(data: ReturnResponse) {
        data.url = `${this.baseUrl}Area/GetWithPoint`;
        this.post(data)
    }

    //region need to check
    // public SearchOnProductKeywords(data: ReturnResponse) {
    //     data.url = `${this.baseUrl}Category/SearchOnProductKeyWords/`;
    //     this.post(data)
    // }

    public getProductsByLevel(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductsCategories/GetCategoryByLevel`;
        this.post(data)
    }


    public getListAndProductsParents(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductsCategories/GetCategoryParents`;
        this.post(data)
    }

    public mobilePrefix(data: ReturnResponse) {
        data.url = `${this.baseUrl}MobilePrefix/GetAll`;
        this.get(data)
    }

    public getAreaById(data: ReturnResponse) {
        data.url = `${this.baseUrl}Area/GetLayerOfCity/${data.urlContent}`;
        this.get(data);
    }

    public GetAllLayersOfCity(data: ReturnResponse) {
        data.url = `${this.baseUrl}Area/GetAllLayersOfCity`;
        this.post(data);
    }


    public getAllCurrency(data: ReturnResponse) {
        data.url = `${this.baseUrl}Currency/GetAll`;
        this.post(data);
    }

}
