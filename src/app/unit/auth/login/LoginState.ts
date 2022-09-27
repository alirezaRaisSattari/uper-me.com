import { UserRepository } from "@/core/repository/user.repository";
import { EnumKeys } from "@/core/constant/constant";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { AuthStore } from "@/core/store/auth.store";
import { getMainPageId, getSelectedPageData } from "@/core/service/utils.service";
import router from "@/core/router/router";
import { PageStore } from "@/core/store/page.store";
import { GetFullPageModel } from "@/data/city/mainpage/getFullPage.model";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export class LoginState {
    loading = false
    receivedApis = 0
    showSessionDialog = false;
    fpPromise = FingerprintJS.load()
    visitorId
    sessionList = [];
    userData = null;
    constructor() {
        ; (async () => {
            const fp = await this.fpPromise
            const result = await fp.get()
            this.visitorId = result.visitorId
        })()
    }


    login(user) {
        user.session.fireBaseToken = this.visitorId;
        user.session.serialNumber = this.visitorId;
        this.userData = user
        UserRepository.getInstance().login({
            body: user,
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                if (res.hashToken) {
                    AuthStore().isLoggedIn = false
                    let token = `Bearer ${res.hashToken}`
                    let refreshToken = res.refreshToken
                    LocalStorageService.getInstance().setItem(EnumKeys.KeyToken, token)
                    LocalStorageService.getInstance().setItem(EnumKeys.KeyRefreshToken, refreshToken)
                    this.getMainPage()
                } else {
                    this.showSessionDialog = true;
                    this.sessionList = res;
                }

            },onError:(err)=>{
            }
        })
    }

    getMainPage() {
        UserRepository.getInstance().getFullPage({
            body: <GetFullPageModel>{
                myPageId: getMainPageId(),
                targetPageId: getMainPageId(),
                username: null,
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(res))
                // AuthStore().isLoggedIn = true
                this.getWorkPages()
                this.navigate()
            }
        })
    }

    getWorkPages() {
        UserRepository.getInstance().getWorkPages({
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                if (res === null) return;
                LocalStorageService.getInstance().setItem(EnumKeys.KeyWorkPages, JSON.stringify(res))
                let mainPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))

                res.find(e => {
                    if (e.pageId > 0) {
                        mainPage.mobileNumber = e.mobileNumber
                        mainPage.mobilePrefix = e.mobilePrefix
                        mainPage.introduceCode = e.introduceCode
                        mainPage.isSupporter = e.isSupporter
                    }
                })
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(mainPage))
                AuthStore().isLoggedIn = true
                this.navigate()
            }
        })
    }

    navigate() {
        this.receivedApis++;
        if (this.receivedApis == 2) {
            LocalStorageService.getInstance().setItem(EnumKeys.KeySelectedPageId, getMainPageId())
            AuthStore().isLoggedIn = true
            PageStore().selectedPageId = getMainPageId()
            router.push({ path: `/page/${getSelectedPageData().username}` }).then(r => r)
        } else {
            this.loading = true
        }
    }

    deleteSession(session){
        UserRepository.getInstance().MainPageLoginWithDeleteSession({
           body:{
            session: {
              serialNumber: this.userData.session.serialNumber,
              deviceType:  this.userData.session.deviceType,
              deviceName: this.userData.session.deviceName,
              fireBaseToken: this.userData.session.fireBaseToken
            },
            mobileNumber: this.userData.mobileNumber,
            username: this.userData.username,
            password: this.userData.password,
            sessionId: session.id
          },onReceive:(res)=>{
              AuthStore().isLoggedIn = false
              let token = `Bearer ${res.hashToken}`
              let refreshToken = res.refreshToken
              LocalStorageService.getInstance().setItem(EnumKeys.KeyToken, token)
              LocalStorageService.getInstance().setItem(EnumKeys.KeyRefreshToken, refreshToken)
              this.getMainPage();
          }
        })
    }
}
