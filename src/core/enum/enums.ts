export enum ProductType {
  Sell = 1,
  Reserve,
  Fare,
  Service,
  BuyAd,
  ReserveAd,
  FareAd,
  ServiceAd,
  VirtualProduct = 12,
  CurrencyProduct,
  ConsultProduct,
}

export enum reportType {
  Page = 1,
  Post,
  Product,
  Story,
  PageComment,
  PostComment,
  ProductComment,
  Prop,
}
export enum PostStatus {
  Accepted = 1,
  NotAccepted,
  Deleted,
  Reported,
}
export enum ProductStatus {
  Accepted = 1,
  NotAccepted,
  Deleted,
  Reported,
}
export enum StoryStatus {
  Accepted = 1,
  NotAccepted,
  Deleted,
  Reported,
  Archive,
}

export enum bannerType {
  public = 1,
  city = 2,
  consult = 3,
}

export enum commentFilterType {
  likeDescending = 1,
  dislikeDescending = 2,
}

export enum bannerReferenceType {
  product = 1,
  page = 2,
  webUrl = 3,
}

export enum ApiAnswers {
  success = "Success",
  product = "product",
  post = "post",
  map = "map",
}

export enum SearchUnitType {
  page = "page",
  product = "product",
  post = "post",
  map = "map",
}

export enum LanguageType {
  en = "en",
  fa = "fa",
}

export enum ObjectNameType {
  word = 1,
  error = 2,
  pageCategory = 3,
  productCategory = 4,
  pageCategoriesFeatures = 5,
  pageCategoriesFeaturesanswers = 6,
  productCategoriesFeatures = 7,
  productCategoriesFeaturesanswers = 8,
  pageScoreItems = 9,
  productScoreItems = 10,
  weight = 11,
}

export enum Status {
  NotCheckedNotAccepted = 1,
  CheckedNotAccepted,
  CheckedAccepted,
  NotCheckedAccepted,
  Deleted,
  DontReported,
  Archive,
  Reported,
}

export enum ShowStatusProduct {
  ShowProduct = 1,
  NotShowProduct,
}

export enum MaintenanceType {
  Normal = 1,
  Glacier1,
  Glacier2,
  Glacier3,
  Glacier4,
  Glacier5,
  Glacier6,
  Glacier7,
  Glacier8,
  Glacier9,
  Glacier10,
  Sensitive,
}

export enum MaintenanceTypeProduct {
  Normal = 1,
  Glacier,
  Sensitive,
  ExpressDelivery,
  HotFood,
}

export enum UsedType {
  NewProduct = 1,
  StockProduct,
  FastSendProduct,
  HotFoodProduct,
}

export enum OriginalProduct {
  YesProduct = 1,
  NoProduct,
}

export enum TypeProduct {
  OfferProduct = 1,
  RequestProduct,
}

export enum WageStatus {
  Active = 1,
  Deactivated,
}

export enum SupporterStatus {
  Active = 1,
  Deactivated,
}

export enum PaymentGateWayAccountStatus {
  Active = 1,
  Deactivated,
}

export enum UseCaseAccountStatus {
  Active = 1,
  Deactivated,
}

export enum AccountStatus {
  Active = 1,
  Deactivated,
}

export enum AccountType {
  Main = 1,
  System,
  Rental,
  PayInPlace,
  Supporter,
}

export enum caseType {
  DepositChargeAccount = 1,
  ReceiveChargeAccount = 2,
  ReceiveAmazingPlan = 3,
  ReceiveCategoryPlan = 4,
  ReceiveImmediatePlan = 5,
}

export enum UseCaseType {
  ChargeAccount = 1,
  CategoryCost,
  RaisingProduct,
}

export enum PaymentGateWayAccountType {
  Zarinpal = 1,
  Mellat,
}

export enum UnitOfMeasurement {
  Kg = 1,
  Meter,
}

export enum OperatorCheckStatus {
  NotChecked_NotAccepted = 1,
  Checked_NotAccepted,
  Checked_Accepted,
  NotChecked_Accepted,
  Deleted,
}

export enum CommentsStatus {
  NotChecked_NotAccepted = 1,
  Checked_NotAccepted,
  Checked_Accepted,
  NotChecked_Accepted,
  Deleted,
  DontReport,
  Report,
}

export enum UserStatus {
  Accepted = 1,
  NotAccepted,
  Deleted,
  Reported,
}

export enum OperatorStatus {
  Free = 1,
  Watching,
}

export enum PageTypeId {
  Work = 1,
  Hyper,
  Consult,
  Inventory,
  Agency,
  CargoTransportation,
  PersonalHumanTransportation,
  TaxiTransportation,
}

export enum AgencyStatus {
  Active = 1,
  Deactive,
}

export enum TransportAreaPricePlanEnum {
  ZeroZero_ZeroHalf = 1,
  ZeroHalf_OneZero,
  OneZero_OneHalf,
  OneHalf_TwoZero,
  TwoZero_TwoHalf,
  TwoHalf_ThreeZero,
  ThreeZero_ThreeHalf,
  ThreeHalf_FourZero,
  FourZero_FourHalf,
  FourHalf_FiveZero,
  FiveZero_FiveHalf,
  FiveHalf_SixZero,
  SixZero_SixHalf,
  SixHalf_SevenZero,
  SevenZero_SevenHalf,
  SevenHalf_EightZero,
  EightZero_EightHalf,
  EightHalf_NineZero,
  NineZero_NineHalf,
  NineHalf_TenZero,
  TenZero_TenHalf,
  TenHalf_ElevenZero,
  ElevenZero_ElevenHalf,
  ElevenHalf_TwelveZero,
  TwelveZero_TwelveHalf,
  TwelveHalf_ThirteenZero,
  ThirteenZero_ThirteenHalf,
  ThirteenHalf_FourteenZero,
  FourteenZero_FourteenHalf,
  FourteenHalf_FifteenZero,
  FifteenZero_FifteenHalf,
  FifteenHalf_SixteenZero,
  SixteenZero_SixteenHalf,
  SixteenHalf_SeventeenZero,
  SeventeenZero_SeventeenHalf,
  SeventeenHalf_EighteenZero,
  EighteenZero_EighteenHalf,
  EighteenHalf_NineteenZero,
  NineteenZero_NineteenHalf,
  NineteenHalf_TwentyZero,
  TwentyZero_TwentyHalf,
  TwentyHalf_TwentyoneZero,
  TwentyoneZero_TwentyoneHalf,
  TwentyoneHalf_TwentytwoZero,
  TwentytwoZero_TwentytwoHalf,
  TwentytwoHalf_TwentythreeZero,
  TwentythreeZero_TwentythreeHalf,
  TwentythreeHalf_TwentyfourZero,
}

export enum TransportWaitingTimeEnum {
  LessThan5min = 1,
  LessThan10min,
  LessThan20min,
  LessThan30min,
  LessThan45min,
  LessThan60min,
  LessThan120min,
  LessThan180min,
}

export enum VehicleType {
  FourSeatCar = 1,
  NineSeatCar,
  ElevenSeatCar,
  TwentySeatCar,
  FortySeatCar,
  OneSeatCycle,
  TwoSeatCycle,
}

export enum TransportFeaturePlanEnum {
  Bar = 1,
  Kooler,
  Chamedan,
  Malool,
  Hurry,
  DontSpeak,
  Music,
  Pet,
  Cigerette,
}

export enum Traveltype {
  Internal,
  External,
}

export enum ReportItemType {
  page = 1,
  post,
  product,
  story,
  pageComment,
  postComment,
  productComment,
}

export enum AcceptationStatus {
  Accepted = 1,
  Checking,
  NeedToEdit,
}

export enum FactorStatus {
  Paying = 1,
  SellerChecker,
  SellerAccepted,
  SellerPrepared,
  WaitingForDelivery, // آماده ارسال
  DeliveryAccepted, // تایید شده توسط پیک
  Sending, // مرسولات
  BuyerReceived,
  SellBack,
  SellerCanceled,
  BuyerCanceled,
  Final,
  FinalExpired,
  OperatorSellerPreparePermit,
}
export enum ReturnedFactorStatus {
  UnChecked = 1,
  Rejected,
  Accepted,
  WaitingForDelivery,
  DeliveryAccepted,
  Sending,
  SellerReceived,
}

export enum DeliveryAddressType {
  HasNotDelivery = 1,
  UperSend,
  BuyerReceive,
  SellerSend,
}
// export enum CargoType {
//   Normal = 1,
//   Sensitive,
//   Glacier,
//   Express,
//   HotFood
// }

export enum CargoType {
  Normal = 1,
  Special,
  Airmail,
}

export enum RecieveTimeType {
  SixAmToNineAm = 1,
  NineAmToTwelvePm,
  TwelvePmToFifteenPm,
  FifteenPmToEighteenPm,
  EighteenPmToTwentyOnePm,
  TwentyOnePmToTwelveAm,
}

export enum InternalPayType {
  UserChargeAccount = 1,
  OperatorChargeAccount,
  TransferMoney,
  PurchasePageCategoryCost,
  PurchasePostExtraFile,
  PurchaseImmediatePlan,
  PurchaseSpecialDiscountPlan,
  PurchaseAmazingPropPlan,
  PayIntroductionAward,
  PayPostLikeMiningAward,
  PayPostViewMiningAward,
  PayProductLikeMiningAward,
  PayProductViewMiningAward,
  PayProductCommentLikeMiningAward,
  PayPageCommentLikeMiningAward,
  PayPostCommentLikeMiningAward,
  PayProductCommentReplyLikeMiningAward,
  PayReportMiningAward,
  PayPostCreationSupporterAward,
  PayProductCreationSupporterAward,
  PayProductPropCreationSupporterAward,
  PayStoryCreationSupporterAward,
  PayFactor,
  PayFactorDepositorAward,
  PayFactorReceiverAward,
  PayUpgradeStoryConsultHomePlan,
  PayUpgradeStoryCityHomePlan,
  PayUpgradeStoryProductSearchPlan,
  PayUpgradeStoryPageSearchPlan,
  PayUpgradeStoryHashtagSearchPlan,
  PayUpgradePageStoryConsultPagePlan,
  PayUpgradePageStoryConsultProductPlan,
  PayUpgradePageStoryConsultProductCommentPlan,
  PayUpgradePageStoryConsultPageCommentPlan,
  PurchaseEventProduct,
  PurchaseLadderProduct,
  PurchaseVirtualPropPlan,
  PrepareWithDelayPenalty,
  CancelBeforePrepare,
  CancelAfterPrepare,
  FactorBuyerSupervisorAward,
  FactorSellerSupervisorAward,
  FactorSellerSupporterAward,
  FactorBuyerSupporterAward,
  CancelBeforeAccept,
}

export enum UseCase {
  PurchasePageCategoryCost = 1,
  PurchasePostExtraFile,
  PurchaseImmediatePlan,
  PurchaseSpecialDiscountPlan,
  PurchaseAmazingPropPlan,
  PayIntroductionAward,
  PayPostLikeMiningAward,
  PayPostViewMiningAward,
  PayProductLikeMiningAward,
  PayProductViewMiningAward,
  PayProductCommentLikeMiningAward,
  PayPageCommentLikeMiningAward,
  PayPostCommentLikeMiningAward,
  PayProductCommentReplyLikeMiningAward,
  PayReportMiningAward,
  PaySupporterAward,
  PayFactor,
  PayFactorAward,
  PayUpgradeStoryConsultHomePlan,
  PayUpgradeStoryCityHomePlan,
  PayUpgradeStoryProductSearchPlan,
  PayUpgradeStoryPageSearchPlan,
  PayUpgradeStoryHashtagSearchPlan,
  PurchaseEventProduct,
  PurchaseLadderProduct,
  PurchaseVirtualPropPlan,
  PaySupsWage,
  PayDefaultWage,
  PayDelivey,
}

export enum UpgradePlanType {
  ConsultHome = 1,
  CityHome,
  ProductSearch,
  PageSearch,
  HashtagSearch,
}

export enum CreditLevel {
  Gold = 1,
  Silver,
  Bronze,
}

export enum SellType {
  Virtual = 1,
  Actual,
  Both,
}

export enum LocationType {
  Fixed = 1,
  Mobile,
}

export enum StatusTypeId {
  Open = 1,
  Close,
  UnderConstruction,
}

export enum ScoreType {
  Post = 1,
  Product,
  SellProp,
  ReserveProp,
  VirtualProp,
  Story,
  AllProps,
}

export enum BannerType {
  SellProduct = 1,
  Page,
  Web,
  EventPage,
  ReserveProduct,
  VirtualProduct,
  ConsultProduct,
  ServiceProduct,
  FareProduct,
}

export enum ticketsPriority {
  High = 1,
  Middle = 2,
  Low = 3,
}

export enum FactorCancellationEnum {
  BeforeAccept = 1,
  AfterAccept,
  AfterPrepared,
}

export enum SellerAddressType {
  HasNotDelivery = 1,
  UperSend,
  BuyerReceive,
  SellerSend,
}


export enum tationTypeEnum
{
    Place = 1,
    Desk,
    Chair,
    Motorcycle,
    Car,
    ETC
}

export enum StationStatusEnum
{
    NotChecked = 1,
    Accepted,
    NotAccepted,
    Deleted
}