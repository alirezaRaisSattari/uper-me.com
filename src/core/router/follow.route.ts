import {RouteRecordRaw} from "vue-router";
import {canActivatedGuard} from "@/core/router/router";

const PageRequestScreen = () => import('@/app/unit/pages/mainPage/pageRequest/PageRequestScreen.vue');
const myFollow = () => import('@/app/unit/pages/follow/follow.vue')
const otherFollow = () => import('@/app/unit/pages/otherPageFollow/follow.vue')
const FollowingFolder = () => import('@/app/unit/pages/follow/followingPages/followingFolder/followingFolder.vue')
const FollowerFolder = () => import('@/app/unit/pages/follow/followerPages/followerFolder/followerFolder.vue')

export const followRoutes: Array<RouteRecordRaw> = [
    {
        path: '/myFollow/:username/:followerOrFollowing/:pageId',
        component: myFollow,
        name: 'myFollow',
        beforeEnter: [canActivatedGuard]
    },
    {
        path: '/otherFollow/:username/:followerOrFollowing/:pageId',
        component: otherFollow,
        name: 'otherFollow',
        beforeEnter: [canActivatedGuard]
    },
    {
        path: '/follow/following/folder/:folderName/:folderId',
        component: FollowingFolder,
        name: 'followingFolder',
        beforeEnter: [canActivatedGuard]
    },
    {
        path: '/follow/follower/folder/:folderName/:folderId',
        component: FollowerFolder,
        name: 'followerFolder',
        beforeEnter: [canActivatedGuard]
    },
    {path: '/page-request/:username', component: PageRequestScreen, beforeEnter: [canActivatedGuard]},
]