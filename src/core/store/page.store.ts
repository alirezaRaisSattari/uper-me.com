import { defineStore } from "pinia"
import { getSelectedPageId } from "../service/utils.service"

export const PageStore = defineStore({
    id: 'PageStore',
    state: () => ({
        selectedPageId: getSelectedPageId(),
        loadingRoute: false,
        routeChanging: ''
    }),

})
