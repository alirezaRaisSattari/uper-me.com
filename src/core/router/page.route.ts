import {RouteRecordRaw} from "vue-router";
import {canActivatedGuard} from "@/core/router/router";

const EditMainScreen = () => import('@/app/unit/pages/mainPage/edit/EditMainPageScreen.vue');
const PageRouteScreen = () => import('@/app/unit/pages/pageRoute/PageRouteScreen.vue');
const ChangeMobileNumberScreen = () => import('@/app/unit/pages/mainPage/editPhoneNumber/EditPhoneNumberScreen.vue');
const CreateWorkPage = () => import('@/app/unit/pages/newCreateWorkPage/NewCreateWorkPage.vue');
const MainPageBlockUser = () => import('@/app/unit/pages/mainPage/blockList/MainPageBlockList.vue')
const temp = () => import('@/app/public/shared/multiImageViewer/temp.vue')
const myArchives = () => import('@/app/unit/pages/mainPage/archives/myArchives.vue')
const PagesCategories = () => import('@/app/unit/shared/pageCategories/PagesCategoriesScreen.vue');
const AddressMainPageScreen = () => import('@/app/unit/pages/mainPage/address/AddressMainPageScreen.vue')
const getHomeScreenActiveItems = () => import('@/app/unit/pages/getHomeScreenActiveItems/getHomeScreenActiveItems.vue')
const UpdateProduct = () => import('@/app/unit/pages/workPage/products/productOption/updateProductPageScreen.vue');
const ImmediateProduct = () => import('@/app/unit/pages/workPage/products/productOption/ImmediateProduct.vue');
const PostsComment = () => import('@/app/unit/pages/comment/comment/commentViewPosts.vue');
const PostsCommentReply = () => import('@/app/unit/pages/comment/commentReply/commentReplyViewPosts.vue');
const PageComment = () => import('@/app/unit/pages/workPage/pageComment/PageComment.vue')
const workPageComment = () => import('@/app/unit/pages/workPage/workPageComments/workPageComment.vue')
const workPageSubmitComment = () => import('@/app/unit/pages/workPage/workPageComments/submitComment/submitComment.vue')
const workPageReplyComment = () => import('@/app/unit/pages/workPage/workPageComments/replyComment/replyComment.vue')
const productSubmitComment = () => import('@/app/unit/pages/workPage/products/productComment/productSubmitComment/submitComment.vue')
const productReplyComment = () => import('@/app/unit/pages/workPage/products/productComment/productReplyComment/replyComment.vue')
const upgradedItems = () => import('@/app/unit/product/upgraded/upgraded.vue')
const bookMarks = () => import('@/app/unit/pages/bookmark/GetMainPageBookMarks.vue')
const folderItem = () => import('@/app/unit/pages/bookmark/getPostFolderItem.vue')
const googleMap = () => import('@/app/public/shared/googleMap/googleMap.vue')
const updatePropPrice = () => import("@/app/unit/pages/update prop price/updatePropPrice.vue")

export const pageRoutes: Array<RouteRecordRaw> = [
    {path: '/my-archives', component: myArchives, beforeEnter: [canActivatedGuard]},
    {path: '/temp', component: temp},
    {path: '/upgradedItems/', component: upgradedItems},
    {path: '/page/edit/:username', component: EditMainScreen, beforeEnter: [canActivatedGuard]},
    {path: '/page/edit/change-mobile-number', component: ChangeMobileNumberScreen, beforeEnter: [canActivatedGuard]},
    {path: '/edit-product/:productId', component: UpdateProduct},
    {path: '/immediate/:categoryId/:productId', component: ImmediateProduct},
    {path: '/page/workPageComment/:userName', component: workPageComment},
    {path: '/page/workPageSubmitComment/:userName', component: workPageSubmitComment},
    {path: '/page/workPageReplyComment/:userName/:commentId', component: workPageReplyComment},
    {path: '/page/productSubmitComment/:productId/:workPageId', component: productSubmitComment},
    {path: '/page/productReplyComment/:productId/:workPageId/:commentId', component: productReplyComment},
    {path: '/page/:username', component: PageRouteScreen},
    {path: '/page/comment/:username/:pageId/:postId', component: PostsComment, beforeEnter: [canActivatedGuard]},
    {path: '/page/work-page-block-list', component: MainPageBlockUser, beforeEnter: [canActivatedGuard]},
    {path: '/page/main-page-block-list', component: MainPageBlockUser, beforeEnter: [canActivatedGuard]},
    {path: '/page/page-comment', component: PageComment},
    {
        path: '/page/comment/reply/:username/:pageId/:postId/:commentId',
        component: PostsCommentReply,
        name: 'commentReply'
    },
    {
        path: '/page/create-work-page',
        component: CreateWorkPage,
        beforeEnter: [canActivatedGuard],
        name: 'CreateWorkPage'
    },
    {path: '/page-categories', component: PagesCategories},
    {path: '/page/address/:username', component: AddressMainPageScreen,},
    {path: '/homescreen', component: getHomeScreenActiveItems, beforeEnter: [canActivatedGuard]},
    {path: '/my-bookmarks', component: bookMarks, beforeEnter: [canActivatedGuard]},
    {path: '/folder-items/:folderId/:folderName', component: folderItem, beforeEnter: [canActivatedGuard]},
    {path: '/google-map', component: googleMap, beforeEnter: [canActivatedGuard]},
    {path: '/updatePropPrice', component: updatePropPrice}

]
