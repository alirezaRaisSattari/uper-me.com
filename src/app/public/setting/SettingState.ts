import {UserRepository} from "@/core/repository/user.repository";
import {LocalStorageService} from "@/core/service/localStorage.service";
import {AuthStore} from "@/core/store/auth.store";
import router from "@/core/router/router";
import {PageStore} from "@/core/store/page.store";

export class SettingState {
    logouting = false;

    logout(logedOut: Function) {
        UserRepository.getInstance().logout({
            onReceive: () => {
                logedOut()
                this.clear()
            },
            onLoadChange: (val) => this.logouting = val,
            onError: (msg) => {
                this.clear()
            },
        });
    }

    clear() {
        LocalStorageService.getInstance().clear()
        AuthStore().isLoggedIn = false
        PageStore().selectedPageId = null
        router.push('/')
    }
}
