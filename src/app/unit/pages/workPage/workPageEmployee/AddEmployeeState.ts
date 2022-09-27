import {BASE_TAKE} from "@/core/constant/constant";
import {FollowRepository} from "@/core/repository/follow.repository";
import {UserRepository} from "@/core/repository/user.repository";
import router from "@/core/router/router";
import {FileUploaderService, ProfileUploaderKeys} from "@/core/service/fileUploader.service";
import {ToastService} from "@/core/service/toast.service";
import {GetFollowersForEmployeesModel} from "@/data/city/mainpage/follow.model";
import {addEmployeeModel} from "@/data/city/product/product.model";
import {i18n} from "@/main";

export class AddEmployeeState {
    personal_code
    AddEmployee = false
    disableButton = false
    skipNum = 0;
    loadingFollowers = false
    FollowersIsFinished = false
    isNull: Boolean
    allFollowers = null
    addEmployeeLoading = false
    loading = false

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

    getFollowers(body) {
        if (this.loadingFollowers || this.FollowersIsFinished) return;
        this.loadingFollowers = true
        body.skip = this.skipNum
        FollowRepository.getInstance().GetFollowersForEmployees({
            body: <GetFollowersForEmployeesModel>{...body},
            onReceive: (res) => {
                this.allFollowers = null
                if (res == null)
                    this.isNull = true
                else this.isNull = false
                if (Array.isArray(res)) {
                    this.allFollowers = res;
                    if (BASE_TAKE > res.length)
                        this.FollowersIsFinished = true
                    if (res.length == BASE_TAKE) {
                        this.skipNum += BASE_TAKE;
                    }
                    this.loadingFollowers = false
                }
            },
            onLoadChange: (load) => {
                this.loading = load
            }
        })
    }

    addEmployee(body) {
        UserRepository.getInstance().AddEmployee({
            body: <addEmployeeModel>{...body},
            onLoadChange: (load) => {
                this.addEmployeeLoading = load
            },
            onReceive: (res) => {
                ToastService.getInstance().success(i18n.global.tc('added'));
                router.back()
            },
            onError: () => {
                this.disableButton = false
                this.AddEmployee = false;
            }
        })
    }
}
