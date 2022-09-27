import {Constant} from "@/core/constant/constant";
import {UserRepository} from "@/core/repository/user.repository"
import {toLower} from "lodash";

export enum CheckUserNameStatus {
    checking = 1,
    isExist,
    hasError,
    ok,
    invaidCharacterLength,
}

export class MainInfoOfWorkPageState {

    checkUsernameStatus: CheckUserNameStatus = null;


    checkUsernames(username) {
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
            body: {username},
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
}

