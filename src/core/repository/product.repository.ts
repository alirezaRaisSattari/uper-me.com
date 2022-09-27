import { Constant } from "../constant/constant";
import { Repository, ReturnResponse } from "./repository";

export class ProductRepository extends Repository {
    private static instance: ProductRepository;
    public baseUrl = Constant.ApiPrefix_Product;

    public static getInstance(): ProductRepository {
        if (!ProductRepository.instance)
            ProductRepository.instance = new ProductRepository();
        return ProductRepository.instance;
    }

    public getProductFolderByPageId(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductFolder/GetAll`;
        this.post(data);
    }

    public getRecentProducts(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetRecentProducts`;
        this.post(data);
    }


    public getCategoryByLevel(data: ReturnResponse) {
        data.url = `${this.baseUrl}Category/GetCategoryByLevel`;
        this.post(data);
    }

    public getProductById(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetProductById`;
        this.post(data);
    }

    public getAllProducts(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetWorkPageProducts`;
        this.post(data);
    }

    public productFilter(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/Filter`;
        this.post(data);
    }


    public getFeatureByCategoryId(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductCategoryFeature/GetFeatureByCategoryId`;
        this.post(data);
    }

    public createFeatureWithAnswer(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductCategoryFeature/CreateFeatureWithAnswers`;
        this.post(data);
    }

    public getSubCategoryByLevel(data: ReturnResponse) {
        data.url = `${this.baseUrl}Category/GetCategoryByLevel`;
        this.post(data);
    }

    public createFeatureAnswerMulti(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductCategoryFeature/CreateFeatureAnswereMulti`;
        this.post(data);
    }

    public createProductFull(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/create`;
        this.post(data);
    }

    public GetAllEventPages(data: ReturnResponse) {
        data.url = `${this.baseUrl}Event/GetAllEventPages/0/1000`;
        this.get(data);
    }

    public GetEventPageById(data: ReturnResponse) {
        data.url = `${this.baseUrl}Event/GetEventPageByIds`;
        this.post(data);
    }

    public GetEventPagePlanItems(data: ReturnResponse) {
        data.url = `${this.baseUrl}Event/GetEventPagePlanItems/${data.urlContent}`;
        this.get(data);
    }

    public CreateEventProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}Event/CreateEventProduct`;
        this.post(data);
    }

    public getForBuyer(data: ReturnResponse) {
        data.url = `${this.baseUrl}Event/GetForBuyer`;
        this.post(data);
    }

    public generalProductGetAll(data: ReturnResponse) {
        data.url = `${this.baseUrl}GeneralProducts/GetAll`;
        this.post(data);
    }

    public GetAllFolders(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductFolder/GetAll`;
        this.post(data);
    }

    public CreateNewFolders(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductFolder/Create`;
        this.post(data);
    }

    public MoveProductsToFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductFolder/MoveProductsToFolder`;
        this.put(data);
    }

    public GetProductById(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetProductById`;
        this.post(data);
    }

    public UpdateProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/UpdateProduct`;
        this.put(data);
    }

    public DeleteProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/Delete/${data.urlContent}`;
        this.delete(data);
    }

    public updateFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductFolder/Update`;
        this.put(data);
    }

    public deleteFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductFolder/Delete/${data.urlContent}`;
        this.delete(data);
    }

    public getAllFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductFolder/GetAll`;
        this.post(data);
    }

    public GetAllImmediatePlans(data: ReturnResponse) {
        data.url = `${this.baseUrl}Immediate/GetAllPlans`;
        this.post(data);
    }

    public AddImmediateTagToProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}Immediate/AddImmediateTagToProduct`;
        this.post(data);
    }

    public createReserveProp(data: ReturnResponse) {
        data.url = `${this.baseUrl}Prop/CreateReserveProp`;
        this.post(data);
    }

    public GetAllProductFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductFolder/GetAll`;
        this.post(data);
    }

    public DeleteProductFolder(data: ReturnResponse) {
        data.url = `${this.baseUrl}ProductFolder/Delete/${data.urlContent}`;
        this.delete(data);
    }

    public createFolderReserve(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageReserveTimeFolder/Create`;
        this.post(data);
    }

    public getAllFolderReserve(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageReserveTimeFolder/Get/${data.urlContent}`;
        this.get(data);
    }

    public updateFolderReserve(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageReserveTimeFolder/UpdateTitle`;
        this.put(data);
    }

    public deleteFolderReserve(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageReserveTimeFolder/Delete`;
        this.post(data);
    }


    public GetProductProps(data: ReturnResponse) {
        data.url = `${this.baseUrl}Prop/GetProductProps`;
        this.post(data);
    }


    public getAmazingPlan(data: ReturnResponse) {
        data.url = `${this.baseUrl}AmazingPlan/Get`;
        this.post(data);
    }

    public createPageAmazingProp(data: ReturnResponse) {
        data.url = `${this.baseUrl}PageAmazingProp/Create`;
        this.post(data);
    }


    public likeProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/Like`;
        this.post(data);
    }

    public unLikeProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/UnLike`;
        this.post(data);
    }

    public GetLikers(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetLikers`;
        this.post(data);
    }

    public createProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}CustomProduct/Create`;
        this.post(data);
    }

    public getFolderBookmark(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/GetBookMarkFolder/${data.urlContent}`;
        this.get(data);
    }

    public GetFolderItems(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/GetFolderItems/${data.urlContent}`;
        this.get(data);
    }

    public BookMarkProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/BookMarkProduct
    `;
        this.post(data);
    }

    public createFolderBookmark(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/CreateBookMarkFolder`;
        this.post(data);
    }

    public editFolderBookmark(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/UpdateBookMarkFolder`;
        this.put(data);
    }

    public deleteFolderBookmark(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/DeleteBookMarkFolder/${data.urlContent}`;
        this.delete(data);
    }

    public MoveProductBetweenFolders(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/MoveProductBetweenFolders`;
        this.put(data);
    }

    public bookmarkProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/BookMarkProduct`;
        this.post(data);
    }

    public unBookmarkProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}BookMark/UnBookMarkProduct`;
        this.post(data);
    }


    public GetAllLadderPlans(data: ReturnResponse) {
        data.url = `${this.baseUrl}Ladder/GetAllPlans`;
        this.post(data)
    }

    public LadderProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}Ladder/LadderProduct`;
        this.post(data)
    }

    public SearchOnProductKeywords(data: ReturnResponse) {
        data.url = `${this.baseUrl}Category/SearchOnProductKeyWords`;
        this.post(data)
    }

    public GetAmazingProductByCity(data: ReturnResponse) {
        data.url = `${this.baseUrl}AmazingProduct/GetAmazingProductByCity`;
        this.post(data)
    }


    public getHyperProducts(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetHyperProducts`;
        this.post(data);
    }


    public GetBestSellerProducts(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetBestSellerProducts`;
        this.post(data)
    }

    public GetPopularProducts(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetPopularProducts`;
        this.post(data)
    }

    public GetNewProducts(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetNewProducts`;
        this.post(data)
    }

    public GetSuggestionProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetSuggestionProductInShoppingCard`;
        this.post(data)
    }

    public RestoreProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/ReStore`;
        this.put(data)
    }

    public ShoppingCartUpdateItems(data: ReturnResponse) {
        data.url = `${this.baseUrl}ShoppingCart/UpdateItems`;
        this.put(data)
    }

    public GetAllShoppingCart(data: ReturnResponse) {
        data.url = `${this.baseUrl}ShoppingCart/GetAll`;
        this.post(data)
    }

    public GetForSeller(data: ReturnResponse) {
        data.url = `${this.baseUrl}CustomProduct/GetForSeller`;
        this.post(data)
    }

    public GetForBuyer(data: ReturnResponse) {
        data.url = `${this.baseUrl}CustomProduct/GetForBuyer`;
        this.post(data)
    }

    public GetCustomsForSeller(data: ReturnResponse) {
        data.url = `${this.baseUrl}CustomProduct/GetCustomsForSeller`;
        this.post(data)
    }

    public GetCustomsForBuyer(data: ReturnResponse) {
        data.url = `${this.baseUrl}CustomProduct/GetCustomsForBuyer`;
        this.post(data)
    }

    public GetByIdCustomProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}CustomProduct/GetById`;
        this.post(data)
    }

    public CustomProductAccept(data: ReturnResponse) {
        data.url = `${this.baseUrl}CustomProduct/Accept`;
        this.put(data)
    }


    public UpdateMultiDefaultPrice(data: ReturnResponse) {
        data.url = `${this.baseUrl}Prop/UpdateMultiDefaultPrice`;
        this.put(data)
    }
    public UpdateMultiUperPrice(data: ReturnResponse) {
        data.url = `${this.baseUrl}Prop/UpdateMultiUperPrice`;
        this.put(data)
    }

    public CustomProductReject(data: ReturnResponse) {
        data.url = `${this.baseUrl}CustomProduct/Reject`;
        this.put(data)
    }

    public AddCustomToShoppingCart(data: ReturnResponse) {
        data.url = `${this.baseUrl}ShoppingCart/AddCustomToShoppingCart`;
        this.post(data)
    }

    public CustomProductDelete(data: ReturnResponse) {
        data.url = `${this.baseUrl}CustomProduct/Delete`;
        this.delete(data)
    }

    public CustomProductCreate(data: ReturnResponse) {
        data.url = `${this.baseUrl}CustomProduct/Create`;
        this.post(data)
    }

    public Like(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/Like`;
        this.post(data)
    }

    public UnLike(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/UnLike`;
        this.post(data)
    }

    public ShoppingCartGetShoppingCartItems(data: ReturnResponse) {
        data.url = `${this.baseUrl}ShoppingCart/GetShoppingCartItems`;
        this.post(data)
    }

    public ShoppingCartDeleteCustomFromShoppingCart(data: ReturnResponse) {
        data.url = `${this.baseUrl}ShoppingCart/DeleteCustomFromShoppingCart`;
        this.delete(data)
    }

    public GetReportedOrDeletedProduct(data: ReturnResponse) {
        data.url = `${this.baseUrl}Product/GetReportedOrDeletedProduct`;
        this.post(data);
    }
    public MiningGetAll(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/GetAll/${data.urlContent}`;
        this.get(data);
    }

    public MiningGetPageMiningTime(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/GetPageMiningTime/${data.urlContent}`;
        this.get(data)
    }
    public MiningMine(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/Mine`;
        this.post(data)
    }
    public MiningMineTransaction(data: ReturnResponse) {
        data.url = `${this.baseUrl}Mining/MineTransaction`;
        this.post(data)
    }
    public EventGetEventPageByIds(data: ReturnResponse) {
        data.url = `${this.baseUrl}Event/GetEventPageByIds`;
        this.post(data)
    }
    public EventGetEventsProductByEventPage(data: ReturnResponse) {
        data.url = `${this.baseUrl}Event/GetEventsProductByEventPage`;
        this.post(data)
    }


    public SearchProducts4And5ByName(data: ReturnResponse) {
        data.url = `${this.baseUrl}Category/SearchCategories4And5ByName`;
        this.post(data)
    }
    public PropGetPropById(data: ReturnResponse) {
        data.url = `${this.baseUrl}Prop/GetPropById`;
        this.post(data)
    }
}
