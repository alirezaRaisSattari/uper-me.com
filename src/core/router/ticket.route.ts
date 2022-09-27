import {RouteRecordRaw} from "vue-router";
import {canActivatedGuard} from "@/core/router/router";

const Ticket = () => import('@/app/unit/ticket/ticketScreen.vue');
const CreateTicket = () => import('@/app/unit/ticket/createTicketScreen.vue');
const TicketMessages = () => import('@/app/unit/ticket/ticketMessagesScreen.vue');
const TicketAddMessage = () => import('@/app/unit/ticket/ticketAddMessageScreen.vue');

export const ticketRoutes: Array<RouteRecordRaw> = [
    {
        path: '/ticket',
        component: Ticket,
        beforeEnter: [canActivatedGuard]
    },
    {path: '/ticket/create', component: CreateTicket, beforeEnter: [canActivatedGuard]},
    {path: '/ticket/messages/:ticketId', component: TicketMessages, beforeEnter: [canActivatedGuard]},
    {path: '/ticket/addmessages/:ticketId', component: TicketAddMessage, beforeEnter: [canActivatedGuard]},
]
