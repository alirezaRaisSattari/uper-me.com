import {ReportRepository} from "@/core/repository/Report.repository";
import {FileUploaderService, ProfileUploaderKeys} from "@/core/service/fileUploader.service";

export class ReportSate {
    createReportLoading = false

    CreateReport(body, reported: Function) {
        ReportRepository.getInstance().CreateReport({
            body: body,
            onLoadChange: (load) => {
                this.createReportLoading = load
            },
            onReceive: () => {
                reported();
            },
        })
    }

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
}
