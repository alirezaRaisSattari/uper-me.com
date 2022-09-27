import {defineStore} from "pinia"
import {isLoggedIn} from "../service/utils.service"

export const AuthStore = defineStore({
    id: 'AuthStore',
    state: () => ({
        isLoggedIn: isLoggedIn(),
    }),
})
