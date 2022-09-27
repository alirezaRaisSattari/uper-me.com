import {RouteRecordRaw} from "vue-router";

const Mining = () => import("@/app/unit/mining/mainController/mainControllerPageScreen.vue");
const MyPosts = () => import("@/app/unit/mining/myPosts/myPostsPageScreen.vue");
const MyProductsMining = () => import("@/app/unit/mining/myProducts/myProductsMiningPageScreen.vue");
const PostCommentMining = () => import("@/app/unit/mining/pageCommentMining/pageCommentMiningPageScreen.vue");
const PageCommentMining = () => import("@/app/unit/mining/postCommentMining/pageCommentMiningPageScreen.vue");
const FavoriteForProductComment = () => import("@/app/unit/mining/favoriteForProductComment/favoriteForProductCommentPageScreen.vue");
const ReportMining = () => import("@/app/unit/mining/reportMining/reportMiningPageScreen.vue");

export const MiningRouter: Array<RouteRecordRaw> = [
    {
        path: "/mining", redirect: '/myPost', component: Mining, children: [
            {path: "/myPost", component: MyPosts},
            {path: "/myProductsMining", component: MyProductsMining},
            {path: "/pageCommentMining", component: PageCommentMining},
            {path: "/postCommentMining", component: PostCommentMining},
            {path: "/reportMining", component: ReportMining},
            {path: "/favoriteForProductComment", component: FavoriteForProductComment},
        ]
    },
];
