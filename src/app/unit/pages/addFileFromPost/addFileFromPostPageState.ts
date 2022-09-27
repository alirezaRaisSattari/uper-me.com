import { ToastService } from "@/core/service/toast.service";
import { convertFileTOBase64 } from "@/core/service/utils.service";
import { i18n } from "@/main";

export class addFileFromPostPageState {

    mainData = null;
    // onFileChange(e) {
    //     if (e.target.files.length === 0) return;
    //     if (e.target.files.length + postImgsForUI.value.length >= 10) {
    //       ToastService.getInstance().error(i18n.global.tc("extra-number"));
    //       return;
    //     }
    //     for (let i = 0; i < e.target.files.length; i++) {
    //       if ((e.target.files[i].size / 1024 / 1024).toFixed(4) >= 40) return;
  
    //       let format = e.target.files[i].name.split(".");
    //       format = format[format.length - 1];
    //       let isImage = false;
    //       switch (format) {
    //         case "jpg":
    //         case "webp":
    //         case "png":
    //         case "jpeg":
    //         case "tiff":
    //         case "bmp":
    //           isImage = true;
    //           break;
    //         case "mp4":
    //         case "mov":
    //         case "wmv":
    //         case "avi":
    //         case "flv":
    //           isImage = false;
    //           break;
    //         default:
    //           isImage = null;
    //           ToastService.getInstance().error(i18n.global.tc("invalid"));
    //           return;
    //       }
    //       if (isImage === true) {
    //         convertFileTOBase64(e.target.files[i], (base64) => {
    //           postImgsForUI.value.push({ base64, isImage, isHover: false });
    //           state.value.postImgsForUpload.push({
    //             base64,
    //             isImage,
    //             link: null,
    //             progress: 0,
    //           });
    //         });
    //       } else if (isImage === false) {
    //         let base64 = URL.createObjectURL(e.target.files[i]);
    //         postImgsForUI.value.push({ base64, isImage, isHover: false });
    //         postImgsForUpload.push({
    //           base64: e.target.files[i],
    //           isImage,
    //           link: null,
    //           progress: 0,
    //         });
    //       }
    //     }
    //     setTimeout(() => {
    //     //   videoLength.value = [];
    //     //   for (let i = 0; i < state.value.postImgsForUpload.length; i++) {
    //     //     if (state.value.postImgsForUpload[i].isImage)
    //     //       videoLength.value.push(-1);
    //     //     else {
    //     //       videoLength.value.push(
    //     //         new Date(document.getElementById(`video${i}`).duration * 1000)
    //     //           .toISOString()
    //     //           .substr(11, 8)
    //     //       );
    //     //     }
    //       }
    //     }, 100);
    //   }
}