import { RouteRecordRaw } from "vue-router";
import { canActivatedGuard } from "./router";


const EventProductPageScreen = () => import('@/app/unit/product/eventPlan/eventProduct/eventProductPageScreen.vue')
const EventPagePlanItem = () => import('@/app/unit/product/eventPlan/eventProduct/productEventItem/productEventProductPageScreen.vue')
const upgradeProduct = () => import('@/app/unit/product/eventPlan/upgradeProduct/upgradeProduct.vue')
const productFolders = () => import('@/app/unit/product/productFolders/ProductFolders.vue')
const foldersProduct = () => import('@/app/unit/product/productFolders/GetFoldersProduct.vue')
const mainPageRecentProducts = () => import('@/app/unit/recentProducts/mainPageRecentProducts/mainPageRecentproducts.vue')
const productComment = () => import('@/app/unit/pages/workPage/products/productComment/productComments.vue')
const productSubmitComment = () => import('@/app/unit/pages/workPage/products/productComment/productSubmitComment/submitComment.vue')
const productReplyComment = () => import('@/app/unit/pages/workPage/products/productComment/productReplyComment/replyComment.vue')
const CreateProductScreen = () => import('@/app/unit/pages/workPage/products/createProduct/CreateProduct.vue')
const viewProductProps = () => import('@/app/unit/pages/workPage/products/show/peoductProps/viewProductProps.vue')
const propAmazingPlans = () => import('@/app/unit/pages/workPage/products/show/peoductProps/propAmazingPlans.vue')
const productLikers = () => import('@/app/unit/pages/workPage/products/show/productLikers.vue')
const laderProduct = () => import('@/app/unit/pages/workPage/products/show/ladderProduct/ladderProductPageScreen.vue')
const showProductPage = () => import('@/app/unit/pages/workPage/products/show/showProductScreen.vue');
const customProductNotInPersonState = () => import('@/app/unit/pages/workPage/products/customProductNotInPerosn/customProductNotInPersonPageScreen.vue');
const reportProduct = () => import('@/app/public/shared/report/report.vue');
const UpdateProduct = () => import('@/app/unit/pages/workPage/products/productOption/updateProductPageScreen.vue');
const ImmediateProduct = () => import('@/app/unit/pages/workPage/products/productOption/ImmediateProduct.vue');
const Hyper = () => import('@/app/unit/pages/workPage/products/hyperControllerPageScreen/hyperControllerPageScreen.vue');
const folderItems = () => import('@/app/unit/pages/bookmark/productFolderItems.vue');
const FaceToFaceCustomProduct = () => import('@/app/unit/pages/workPage/products/customProductOrder/faceToFace/faceToFaceCustomProductScreen.vue');
const InPersonCustomProduct = () => import('@/app/unit/pages/workPage/products/customProductOrder/InPerson/InPersonCustomProductScreen.vue');

export const productRoutes: Array<RouteRecordRaw> = [
    {path:'/reportProduct/:report',component:reportProduct},
    { path: '/upgradeProduct/:productId', component: EventProductPageScreen },
    { path: '/eventPagePlanItem/:eventPageId', component: EventPagePlanItem },
    { path: '/upgradeProductItem/:eventPageId/:productId', component: upgradeProduct },
    { path: '/product-folders', component: productFolders },
    { path: '/folders-product/:folderId/:folderName', component: foldersProduct },
    { path: '/new', component: mainPageRecentProducts },
    { path: '/page/productComment/:productId/:workPageId', component: productComment },
    { path: '/page/productSubmitComment/:productId/:workPageId', component: productSubmitComment },
    { path: '/page/productReplyComment/:productId/:workPageId/:commentId', component: productReplyComment },
    { path: '/createProduct', component: CreateProductScreen },
    { path: '/product-props/:workpageId/:productId/:productType', component: viewProductProps },
    { path: '/amazing-plans/:propId/:productId/:productType', component: propAmazingPlans },
    { path: '/likers/:workPageId/:productId', component: productLikers },
    { path: '/product/ladderProduct', component: laderProduct },
    { path: '/edit-product/:productId', component: UpdateProduct },
    { path: '/immediate/:categoryId/:productId', component: ImmediateProduct },
    { path: '/hyper/:wpid', component: Hyper },
    { path: '/product/:productId/:workPageId?/:title?', name: 'product', component: showProductPage },
    { path: '/product-folder-items/:folderId/:name', component: folderItems, beforeEnter: [canActivatedGuard] },
    { path: '/customProductNotInPerson/:id', component: customProductNotInPersonState, beforeEnter: [canActivatedGuard] },
    { path: '/faceToFaceCustomProduct/:id', component: FaceToFaceCustomProduct, beforeEnter: [canActivatedGuard] },
    { path: '/inPersonCustomProduct', component: InPersonCustomProduct, beforeEnter: [canActivatedGuard] },


]
