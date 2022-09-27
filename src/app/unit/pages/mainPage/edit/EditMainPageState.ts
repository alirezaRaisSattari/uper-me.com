import { UserRepository } from "@/core/repository/user.repository";
import {
    NewMobileNumber,
    newMobileNumber,
    UpdateMainPageBioModel,
    UpdateMainPageUsernameModel,
    verifyNewPhonNumber
} from "@/data/city/mainpage/mainPage.model";
import { ToastService } from "@/core/service/toast.service";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { EnumKeys } from "@/core/constant/constant";
import router from "@/core/router/router";
import { i18n } from "@/main";
import { FileUploaderService, ProfileUploaderKeys } from "@/core/service/fileUploader.service";
import {getSelectedPageData, toEnglishDigits} from "@/core/service/utils.service";

export class EditMainPageState {
    loading = false
    profileUrl
    securityQuestionText = ''

    uploadImages(file, onUpload: Function) {
        FileUploaderService.getInstance().uploadProfile({
            file,
            onProgressChange: (progress) => {
            },
            onError: (msg) => {
            },
            onReceive: (res) => {
                onUpload(res)
            },


        }, ProfileUploaderKeys.USER);
    }


    updateMainPageDetails(user) {
        UserRepository.getInstance().updateMainPageDetails({
            body: {
                profileImageUrl: user.profileImageUrl,
                name: user.name,
                username: user.username
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                ToastService.getInstance().success(i18n.global.tc('success'))
                let mainPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
                mainPage.profileImageUrl = user.profileImageUrl
                mainPage.name = user.name
                mainPage.username = user.username
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(mainPage))
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
                location.reload()
            }
        })
    }

    updateUsername(username) {
        UserRepository.getInstance().updateUsername({
            body: <UpdateMainPageUsernameModel>{
                username
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                let mainPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
                mainPage.username = username
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(mainPage))
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
            }
        })
    }

    newMobileNumber(mobile) {
        UserRepository.getInstance().newMobileNumber({
            body: <NewMobileNumber>{
                mobileNumber: mobile
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                let mainPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
                mainPage.mobileNumber = mobile
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(mainPage))
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
            }
        })
    }

    newPhoneNumber(mobile, callBack) {
        UserRepository.getInstance().updatePagePhoneNumber({
            body: <newMobileNumber>{
                prefixMobileNumber: mobile.prefixMobileNumber,
                newMobileNumber: mobile.newMobileNumber,
                password: mobile.password
            },
            onReceive: (res) => {
                this.securityQuestionText = res.securityQuestion ?? ''
                callBack(res)
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
            },
            onLoadChange: (load) => this.loading = load,
        })
    }

    verifyNewPhoneNumber(body) {
        UserRepository.getInstance().ValidateNewMobileNumber({
            body: <verifyNewPhonNumber>{
                newMobileNumber: body.newMobileNumber,
                answer: body.answer,
                otpCode: body.otpCode
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                let mainPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
                mainPage.mobileNumber = body.newMobileNumber
                mainPage.mobilePrefix = body.prefix
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(mainPage))
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
            }
        })
    }

    updateUserBio(bio) {
        UserRepository.getInstance().UpdateMainPageBio({
            body: <UpdateMainPageBioModel>{
                bio: bio
            },
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                let mainPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
                mainPage.bio = bio
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(mainPage))
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
            }
        })
    }

    updateMembersStatus(model) {
        UserRepository.getInstance().updatePageStatus({
            body: model,
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                let mainPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
                mainPage.isPublic = model.isPublic ?? mainPage.isPublic
                mainPage.showFollowers = model.followInfo.showFollowers ?? mainPage.showFollowers
                mainPage.showFollowing = model.followInfo.showFollowing ?? mainPage.showFollowing
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(mainPage))
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
            }
        })
    }

    updatePageStatus(model) {
        UserRepository.getInstance().updatePageStatus({
            body: model,
            onLoadChange: (load) => this.loading = load,
            onReceive: (res) => {
                let mainPage = JSON.parse(LocalStorageService.getInstance().getItem(EnumKeys.KeyMainPage))
                mainPage.isPublic = model.isPublic ?? mainPage.isPublic
                LocalStorageService.getInstance().setItem(EnumKeys.KeyMainPage, JSON.stringify(mainPage))
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
            }
        })
    }

}
