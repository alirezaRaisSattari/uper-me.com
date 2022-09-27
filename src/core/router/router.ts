import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { isLoggedIn } from "../service/utils.service";
import NProgress from "@/assets/js/nprogress";
import { authRoutes } from "@/core/router/auth.route";
import { workPageRoutes } from "@/core/router/workpage.route";
import { pageRoutes } from "@/core/router/page.route";
import { followRoutes } from "@/core/router/follow.route";
//
import { propRoutes } from "@/core/router/prop.route";
import { ticketRoutes } from "@/core/router/ticket.route";
import { settingRoutes } from "@/core/router/setting.route";
import { supporterRoutes } from "@/core/router/supporter.route";
import { otherRoutes } from "@/core/router/other.route";
import { productRoutes } from "@/core/router/product.route";
import { mlRoutes } from "@/core/router/ml.route";
import { chatRoutes } from "@/core/router/chat.route";
import { MiningRouter } from "./mining.router";
import { salesBasketsRouter } from "./salesBaskets.route";
import { postsRoute } from "./posts.route"
import { PageStore } from "../store/page.store";

const HomeScreen = () => import("@/app/unit/shared/homescreen/HomeScreen.vue");
const ComingSoon = () => import("@/app/unit/shared/comingSoon/ComingSoon.vue");

const routes: Array<RouteRecordRaw> = [
    { path: "", component: HomeScreen },
    ...authRoutes,
    ...workPageRoutes,
    ...pageRoutes,
    ...followRoutes,
    ...propRoutes,
    ...ticketRoutes,
    ...settingRoutes,
    ...supporterRoutes,
    ...otherRoutes,
    ...productRoutes,
    ...MiningRouter,
    ...salesBasketsRouter,
    ...mlRoutes,
    ...chatRoutes,
    ...postsRoute,
    {
        path: "/:catchAll(.*)",
        component: ComingSoon,
        beforeEnter: [canActivatedGuard],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    isLoggedIn();
    window.scrollTo(0, 0);
    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export function canActivatedGuard(to, from, next) {
    PageStore().routeChanging = to
    if (isLoggedIn()) {
        next();
    } else {
        next({ name: "Login" });
    }
}

export default router;
