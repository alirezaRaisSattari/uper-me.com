import { ReportRepository } from "@/core/repository/Report.repository";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";

export class reportMainPageState {
    loading = false
    swiperData = [
      { label: i18n.global.tc("inappropriatePhoto"), val: 1 },
      { label: i18n.global.tc("inappropriateContent"), val: 2 },
    ];

    reportMainPage(model,rescall) {
       
        ReportRepository.getInstance().CreateReport({
            body: model,
            onReceive: (res) => { 
                ToastService.getInstance().success(i18n.global.tc('reported succesfully'))
                rescall()
            },
            onLoadChange: (load) =>{this.loading = load},
            onError: (Error)=>{
                rescall()
            }
        })
    }
}