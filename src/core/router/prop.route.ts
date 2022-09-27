import {RouteRecordRaw} from "vue-router";
import {canActivatedGuard} from "@/core/router/router";

const createReserveProp = () => import('@/app/unit/pages/workPage/products/show/props/createProps/createReserveProp/createReservePropPageScreen.vue')
const PropsFolders = () => import('@/app/unit/pages/workPage/products/show/props/folders/propFoldersPageScreen.vue')
const PropFolder = () => import("@/app/unit/pages/workPage/products/show/props/subFolders/subFoldersPageScreen.vue")
const CreatePropFolder = () => import("@/app/unit/pages/workPage/products/show/props/subFolders/create/createSubFoldersPageScreen.vue")
const AmazingProps = () => import("@/app/unit/pages/workPage/products/amazingProps/productAmazingPropsPageScreen.vue")
const editProductId = () => import("@/app/unit/pages/workPage/products/editProduct/editPoductId.vue")
export const propRoutes: Array<RouteRecordRaw> = [
    {path: '/product/createReserveProp/:productId/', component: createReserveProp},
    {path: '/product/propsFolders/:pId', component: PropsFolders},
    {path: '/product/propFolder/:pId', component: PropFolder},
    {path: '/product/createSubFolder/:pId', component: CreatePropFolder},
    {path: '/product/amazingProps', component: AmazingProps},
    {path: '/product/editproduct', component:editProductId}

]
