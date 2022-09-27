export class Constant {
    public static readonly ApiPrefix_Setting = 'http://api.setting.uper-me.com/api/v1/setting/'
    public static readonly ApiPrefix_User = 'http://api.user.uper-me.com/api/v1/user/'
    public static readonly ApiPrefix_Report = 'http://api.report.uper-me.com/api/v1/report/'
    public static readonly ApiPrefix_Product = 'http://api.product.uper-me.com/api/v1/product/'
    public static readonly ApiPrefix_Factor = 'http://api.factor.uper-me.com/api/v1/factor/'
    public static readonly ApiPrefix_Follow = 'http://api.follow.uper-me.com/api/v1/follow/'
    public static readonly ApiPrefix_Story = 'http://api.story.uper-me.com/api/v1/story/'
    public static readonly ApiPrefix_Accounting = 'http://api.accounting.uper-me.com/api/v1/accounting/'
    public static readonly ApiPrefix_Post = 'http://api.posts.uper-me.com/api/v1/post/'
    public static readonly ApiPrefix_PageComment = 'http://api.postcomment.uper-me.com/api/v1/postComment/'
    public static readonly ApiPrefix_WorkPageComment = 'http://api.pagecomment.uper-me.com/api/v1/pagecomment/'
    public static readonly ApiPrefix_ProductComment = 'http://api.productcomment.uper-me.com/api/v1/productcomment/'
    public static readonly ApiPrefix_Explorer = 'http://api.explore.uper-me.com/api/v1/Explorer/'
    public static readonly ApiPrefix_ML = 'http://api.ml.uper-me.com/api/v1/ML/'
    
    public static readonly UrlUpload_File = 'http://upstatics.uper-me.com/v2/file/';
    public static readonly UrlUpload_Picture = 'http://upstatics.uper-me.com/v2/image/';
    public static readonly UrlUpload_Profile = 'http://upstatics.uper-me.com/v2/profile/';
    public static readonly UrlUpload_Voice = 'http://upstatics.uper-me.com/v2/voice/';
    public static readonly UrlUpload_Video = 'http://upstatics.uper-me.com/v2/video/';

    public static readonly ApiCheckRefreshToken = 'http://api.user.uper-me.com/api/v1/user/MainPage/CheckRefreshToken';

    public static readonly IsExistStatusCode = 409;
    public static readonly TAKE_20 = 20;
    public static readonly VERSION_OF_BUILT_PRODUCTION = "1.0.0 (7)";
}

export enum EnumKeys {
    KeyIsSupporter = 'isSupporter',
    KeyToken = 'hashToken',
    KeyRefreshToken = 'refreshToken',
    KeyWorkPages = 'workPages',
    KeyMainPage = 'mainPage',
    KeyLanguage = 'language',
    KeySelectedPageId = 'selectedPageId',
    KeyChangeIndexes = 'changeIndexes',
    KeyCountries = 'countries',
    KeyProvinces = 'provinces',
    KeyCities = 'cities',
    KeyCurrencies = 'currencies',
    KeySearchPageCache = 'sc_page',
    KeySearchProductCache = 'sc_product',
    KeySearchTagCache = 'sc_tag',
}

export const BASE_TAKE = 10;
export const BASE_TAKE_15 = 15;
export const BASE_TAKE_18 = 18;
