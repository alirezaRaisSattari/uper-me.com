import { RouteRecordRaw } from "vue-router";
import { canActivatedGuard } from "./router";
import viewProductProps from "@/app/unit/pages/workPage/products/show/peoductProps/viewProductProps.vue";

const createNewPost = () => import('@/app/unit/pages/post/create/createNewPost.vue')
const PostsComment = () => import('@/app/unit/pages/comment/comment/commentViewPosts.vue');
const PostsCommentReply = () => import('@/app/unit/pages/comment/commentReply/commentReplyViewPosts.vue');
const mainPagePosts = () => import('@/app/unit/pages/mainPage/posts/displayPosts/displayPost.vue');
const workPagePosts = () => import('@/app/unit/pages/workPage/posts/displayPosts/displayPost.vue');
const viewNumberOfLikes = () => import('@/app/unit/pages/mainPage/posts/viewlLike/viewLike.vue');


export const postsRoute: Array<RouteRecordRaw> = [
    {
        path: '/post/mp/:pageId/:postId/:username',
        component: mainPagePosts,
        name: 'mainPagePosts',
        beforeEnter: [canActivatedGuard]
    },
    {
    path:`/viewlikes/:id`,
        component:viewNumberOfLikes,
        name:'numberoflikes',
        beforeEnter: [canActivatedGuard]
    },
    {
        path: '/post/wp/:pageId/:postId/:username',
        component: workPagePosts,
        name: 'workPagePosts',
        beforeEnter: [canActivatedGuard]
    },
    { path: '/createNewPost', component: createNewPost, name: 'createNewPost', beforeEnter: [canActivatedGuard] },
    { path: '/page/comment/:username/:pageId/:postId', component: PostsComment, beforeEnter: [canActivatedGuard] },
    {
        path: '/page/comment/reply/:username/:pageId/:postId/:commentId',
        component: PostsCommentReply,
        name: 'commentReply'
    },
]
