import { UserRepository } from "@/core/repository/user.repository";
import { ToastService } from "@/core/service/toast.service";
import { getDecodedToken, getMainPageId } from "@/core/service/utils.service";
import { sessionModel } from "@/data/setting/security.model";
import { i18n } from "@/main";

export class sessionPageState {
    activeSession = <sessionModel>null;
    sessionList = <sessionModel[]>[];
    loading = false;
    getSession() {
        this.loading = true;
        UserRepository.getInstance().GetSessionByMainPage({
            onReceive:(res:sessionModel[])=>{
                this.loading = false;
                const sessionId = Object(getDecodedToken()).SessionId;
                this.activeSession = res.find(item => item.sessionId == sessionId)
                this.sessionList = res.filter(item => item.sessionId !== sessionId);
            },onError:(err)=>{
                this.loading = false;
                console.log(err);
            }
        })
    }

    deleteSession(sid){
        this.loading = true;
        UserRepository.getInstance().DeleteSession({
            urlContent:`${sid}/${getMainPageId()}`,
            onReceive:(res)=>{
                this.loading = false;
                ToastService.getInstance().success(i18n.global.tc('successMassage'));
                this.sessionList = this.sessionList.filter(item => item.sessionId != sid);
            },onError:(err)=> {
                console.log(err);
                this.loading = false;
            }
        })
    }
}
