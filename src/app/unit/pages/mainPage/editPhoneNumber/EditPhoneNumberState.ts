import {UserRepository} from "@/core/repository/user.repository";
import {NewMobileNumber, ValidateNewMobileMobile} from "@/data/city/mainpage/mainPage.model";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import {LocalStorageService} from "@/core/service/localStorage.service";
import {EnumKeys} from "@/core/constant/constant";
import router from "@/core/router/router";

export class EditPhoneNumberState {
    loading = false
    validationEnable = false
    isSecurityQuestionExist = false
    securityQuestionText = false

    changeMobileNumber(mobile) {
        UserRepository.getInstance().newMobileNumber({
            body: <NewMobileNumber>{
                mobileNumber: mobile
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                this.validationEnable = true
                this.isSecurityQuestionExist = res.securityQuestion != null;
                if (this.isSecurityQuestionExist) {
                    this.securityQuestionText = res.securityQuestion;
                }
            }
        })
    }

    validateNewMobileNumber(mobileNumber,
                            answer,
                            otpCode,
                            password) {
        UserRepository.getInstance().validateNewMobileNumber({
            body: <ValidateNewMobileMobile>{
                mobileNumber,
                answer,
                otpCode,
                password
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                ToastService.getInstance().success(res ?? i18n.global.tc('success'))
                let mainPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
                mainPage.mobileNumber = mobileNumber
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(mainPage))
                router.back()
            }
        })
    }

}
