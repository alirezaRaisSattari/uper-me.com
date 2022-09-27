import { Constant } from '../constant/constant';
import { Repository, ReturnResponse } from './repository';

export class UserRepository extends Repository {

    private static instance: UserRepository
    public baseUrl = Constant.ApiPrefix_User

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) UserRepository.instance = new UserRepository()
        return UserRepository.instance
    }

    public login(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/Login`;
        this.post(data)
    }

    public checkIsSupporter(data: ReturnResponse) {
        data.url = `${this.baseUrl}SupporterUtils/Check`;
        this.post(data)
    }

    public getFullPage(data: ReturnResponse) {
        data.url = `${this.baseUrl}Utils/GetFullPage`;
        this.post(data)
    }

    public getWorkPages(data: ReturnResponse) {
        data.url = `${this.baseUrl}Employee/GetWhereIEmployed`;
        this.get(data)
    }

    public logout(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/Logout`;
        this.post(data)
    }

    public searchPageByName(data: ReturnResponse) {
        data.url = `${this.baseUrl}Utils/SearchPageByName`;
        this.post(data)
    }

    public updateMainPageDetails(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/UpdateUserInfo`;
        this.put(data)
    }

    public updateUsername(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/UpdateUsername`;
        this.put(data)
    }

    public newMobileNumber(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/NewMobileNumber`;
        this.post(data)
    }

    public updateMainPageForSecurityQuestion(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/UpdateSecurityInfo`;
        this.put(data)
    }

    public internalResetPassword(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/InternalResetPassword`;
        this.post(data)
    }

    public validateNewMobileNumber(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/ValidateNewMobileNumber`;
        this.post(data)
    }

    public getAddressByPageId(data: ReturnResponse) {
        data.url = `${this.baseUrl}FavoriteAddress/GetByPageId`;
        this.post(data)
    }

    public createAddressFavorite(data: ReturnResponse) {
        data.url = `${this.baseUrl}FavoriteAddress/Create`
        this.post(data);
    }


    public editAddress(data: ReturnResponse) {
        data.url = `${this.baseUrl}FavoriteAddress/Update`;
        this.post(data)
    }

    public FilterWorkPages(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPage/FilterWorkPages`;
        this.post(data)
    }


    public createWorkPage(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPage/Create`;
        this.post(data)
    }

    public getConsultPages(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPage/GetConsultPages`;
        this.post(data)
    }

    public signup(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/SendSmsForSignUp`;
        this.post(data)
    }

    public verifyCode(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/SignUp`;
        this.post(data)
    }

    public forgetPassword(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/ForgotPassword`;
        this.post(data)
    }

    public otpCodeConfirmation(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/ForgotPasswordValidate`;
        this.post(data)
    }

    public UpdateMainPageBio(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/UpdateBio`;
        this.put(data)
    }

    public updatePageStatus(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/UpdateFollowInfo`;
        this.put(data)
    }

    public getCategoryByLevel(data: ReturnResponse) {
        data.url = `${this.baseUrl}Category/GetCategoryByLevel`;
        this.post(data)
    }

    public SearchCategories4And5ByName(data: ReturnResponse) {
        data.url = `${this.baseUrl}Category/SearchCategories4And5ByName`;
        this.post(data)
    }

    public getListAndCategoryParents(data: ReturnResponse) {
        data.url = `${this.baseUrl}Category/GetCategoryParents`;
        this.post(data)
    }

    public createMyTicket(data: ReturnResponse) {
        data.url = `${this.baseUrl}Ticket/CreateTicket`;
        this.post(data)
    }

    public updatePagePhoneNumber(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/NewMobileNumber`;
        this.post(data)
    }

    public updateMainPageAfterSignup(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/UpdateMainPageAfterSignup`
        this.put(data)
    }

    public ValidateNewMobileNumber(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/ValidateNewMobileNumber`
        this.post(data)
    }

    public GetAllTickets(data: ReturnResponse) {
        data.url = `${this.baseUrl}Ticket/GetAllTickets`
        this.post(data)
    }

    public GetMessages(data: ReturnResponse) {
        data.url = `${this.baseUrl}Ticket/GetMessages`
        this.post(data)
    }

    public AddMessage(data: ReturnResponse) {
        data.url = `${this.baseUrl}Ticket/AddMessage`
        this.post(data)
    }

    public CloseTicket(data: ReturnResponse) {
        data.url = `${this.baseUrl}Ticket/CloseTicket/${data.urlContent}`
        this.put(data)
    }

    public CreateFeatureWithAnswers(data: ReturnResponse) {
        data.url = `${this.baseUrl}CategoryFeatures/CreateFeatureWithAnswers`;
        this.post(data);
    }

    public CreateFeatureAnswerMulti(data: ReturnResponse) {
        data.url = `${this.baseUrl}CategoryFeatures/CreateFeatureAnswereMulti`;
        this.post(data);
    }

    public GetFeatureByCategoryId(data: ReturnResponse) {
        data.url = `${this.baseUrl}CategoryFeatures/GetFeatureByCategoryId`;
        this.post(data);
    }

    public checkUsernames(data: ReturnResponse) {
        data.body.username = data.body.username.toLowerCase();
        data.url = `${this.baseUrl}MainPage/CheckUsername`;
        this.post(data);
    }

    public getWorkPageAddressByWorkPageId(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPageAddress/GetWorkPageAddressByWorkPageId`;
        this.post(data);
    }

    public getEmployee(data: ReturnResponse) {
        data.url = `${this.baseUrl}Employee/GetStaffs/${data.urlContent}`;
        this.get(data);
    }

    public AddEmployee(data: ReturnResponse) {
        data.url = `${this.baseUrl}Employee/Add`;
        this.post(data);
    }

    public EmployeePermission(data: ReturnResponse) {
        data.url = `${this.baseUrl}EmployeePermission/Get/${data.urlContent}`;
        this.get(data);
    }

    public deleteEmployeePermission(data: ReturnResponse) {
        data.url = `${this.baseUrl}EmployeePermission/Delete`;
        this.post(data);
    }

    public addEmployeePermission(data: ReturnResponse) {
        data.url = `${this.baseUrl}EmployeePermission/Add`;
        this.post(data);
    }

    public updateEmployee(data: ReturnResponse) {
        data.url = `${this.baseUrl}Employee/Update`;
        this.put(data);
    }

    public deleteEmployee(data: ReturnResponse) {
        data.url = `${this.baseUrl}Employee/Delete/${data.urlContent}`;
        this.delete(data);
    }

    public GetFullTime(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPageTime/GetFullTime/${data.urlContent}`;
        this.get(data);
    }

    public GetAllFeatureByWorkPageIdInDetails(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPage/GetAllFeatureByWorkPageIdInDetails/${data.urlContent}`;
        this.get(data);
    }

    public UpdateWorkPageTime(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPageTime/Update`;
        this.put(data);
    }

    public GetWorkPageAddressByWorkPageId(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPageAddress/GetWorkPageAddressByWorkPageId`;
        this.post(data);
    }

    public getWorkPagesCategories(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPagesCategories/GetAllWorkPageCategoryByWorkPageId/${data.urlContent}`;
        this.get(data);
    }

    public deleteAddressFavorite(data: ReturnResponse) {
        data.url = `${this.baseUrl}FavoriteAddress/Delete/${data.urlContent}`
        this.delete(data)
    }

    public updateAddressFavorite(data: ReturnResponse) {
        data.url = `${this.baseUrl}FavoriteAddress/Update`;
        this.post(data);
    }

    public GetTicketById(data: ReturnResponse) {
        data.url = `${this.baseUrl}Ticket/GetTicketById`;
        this.post(data);
    }

    public GetHomeScreenActiveItems(data: ReturnResponse) {
        data.url = `${this.baseUrl}Utils/GetHomeScreenActiveItems`;
        this.post(data);
    }

    public updateWorkPage(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPage/Update/${data.urlContent}`;
        this.put(data);
    }

    public GetSupporterMembers(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetSupporterMembersWithDetails`;
        this.post(data);
    }

    public GetSupporterForAgency(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetSupporterForAgency`;
        this.post(data);
    }

    public SupervisorScore(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetScore`;
        this.post(data);
    }

    public GetFactorsOfSellerWorkPages(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetFactorsOfSellerWorkPages`;
        this.post(data);
    }

    public GetFactorsOfBuyerWorkPages(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetFactorsOfBuyerWorkPages`;
        this.post(data);
    }

    public GetPosts(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetPosts`;
        this.post(data);
    }

    public GetStory(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetStory`;
        this.post(data);
    }

    public GetProducts(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetProducts`;
        this.post(data);
    }

    public GetProps(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetProps`;
        this.post(data);
    }

    public GetSupporterMediaAward(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetSupporterMediaAward`;
        this.post(data);
    }

    public GetSupporterFactorAward(data: ReturnResponse) {
        data.url = `${this.baseUrl}Supervisor/GetSupporterFactorAward`;
        this.post(data);
    }

    public CheckIntroduceCode(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/CheckIntroduceCode/${data.urlContent.introduceCode}`;
        this.post(data);
    }

    public WorkPagesCategoriesGetCategoriesOfWorkPages(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPagesCategories/GetCategoriesOfWorkPages`;
        this.post(data);
    }

    public UpdateBio(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPage/UpdateBio`;
        this.put(data);
    }

    public UpdateFollowInfo(data: ReturnResponse) {
        data.url = `${this.baseUrl}WorkPage/UpdateFollowInfo`;
        this.put(data);
    }
    public GetSessionByMainPage(data: ReturnResponse) {
        data.url = `${this.baseUrl}Session/GetSessionByMainPage`;
        this.get(data);
    }
    public DeleteSession(data: ReturnResponse) {
        data.url = `${this.baseUrl}Session/DeleteSession/${data.urlContent}`;
        this.delete(data);
    }
    public MainPageLoginWithDeleteSession(data: ReturnResponse) {
        data.url = `${this.baseUrl}MainPage/LoginWithDeleteSession`;
        this.post(data);
    }
}
