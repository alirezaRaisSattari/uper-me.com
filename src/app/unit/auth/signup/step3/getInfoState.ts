import { CheckUserNameStatus } from "@/app/unit/pages/newCreateWorkPage/step1/MainInfoOfWorkPageState";
import { Constant, EnumKeys } from "@/core/constant/constant";
import { UserRepository } from "@/core/repository/user.repository";
import router from "@/core/router/router";
import { FileUploaderService, ProfileUploaderKeys } from "@/core/service/fileUploader.service";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";

export class getInfoState {
    checkUsernameStatus: CheckUserNameStatus = null;
    dataModel = {
        isPublic: true,
        name: "",
        introduceCode: "",
        username: "",
        password: "",
        rePassword: "",
    }
    clearLocalStorage = false
    disableSubmit = false
    username = ""
    loading = false
    lockBtnSignUpForApi = false

    checkUsername(username) {

        if (username.includes(" ")) {
            this.checkUsernameStatus = CheckUserNameStatus.hasError;
            return
        }
        if (username.trim().length < 4 || username.trim().length > 40) {
            this.checkUsernameStatus = CheckUserNameStatus.invaidCharacterLength;
            return;
        }
        this.checkUsernameStatus = CheckUserNameStatus.checking;
        UserRepository.getInstance().checkUsernames({
            body: { username },
            onReceive: () => {
                this.checkUsernameStatus = CheckUserNameStatus.ok;
            },
            onError: (er: any) => {
                if (er.statusCode == Constant.IsExistStatusCode) {
                    this.checkUsernameStatus = CheckUserNameStatus.isExist;
                } else {
                    this.checkUsernameStatus = CheckUserNameStatus.hasError;
                }
            }
        })
    }

    uploadProf(file) {
        FileUploaderService.getInstance().uploadProfile({
            file,
            onReceive: (res) => {
                this.updatePage(res)
            },
        }, ProfileUploaderKeys.USER);
    }

    updatePage(file) {
        this.lockBtnSignUpForApi = true;
        UserRepository.getInstance().updateMainPageAfterSignup({
            body: {
                profileImageUrl: file,
                isPublic: true,
                name: this.dataModel.name,
                username: this.dataModel.username.toLowerCase(),
                password: this.dataModel.password,
            },
            onReceive: () => {
                const username = JSON.stringify({ username: this.dataModel.username.toLowerCase() })
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, username)
                this.clearLocalStorage = true
                if (this.checkUsernameStatus != CheckUserNameStatus.ok) {
                    ToastService.getInstance().warning(i18n.global.tc('invalidUserName'));
                    return;
                }
                ToastService.getInstance().success(i18n.global.tc("success"));
                this.lockBtnSignUpForApi = false;
                router.push("/login");
            },
            onLoadChange: (load) => {
                this.disableSubmit = load
            }
        })
    }
}
