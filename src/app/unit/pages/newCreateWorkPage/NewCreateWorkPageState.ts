import { FileUploaderService, ImageUploaderKeys, ProfileUploaderKeys } from '@/core/service/fileUploader.service';
import { i18n } from '@/main';
import { CreateWorkPageImage, NewCreateWorkPageModel, WorkPageImages } from './CreateWorkPage.model';
import { DateService } from "@/core/service/date.service";
import { copyToClipboard } from "@/core/service/utils.service";
import { UserRepository } from "@/core/repository/user.repository";

enum CreatingWorkPageState {
    uploadingImages = 1,
    creatingFeatures,
    creatingWorkPage,
}

export class NewCreateWorkPageState {

    model = new NewCreateWorkPageModel();
    preImages = new WorkPageImages();
    step = 1;
    categories = [];
    creatingState: CreatingWorkPageState = null;
    progressStep = 1;
    averageUploadImagPercent: number = 0;

    createWorkPage(cb: { success: () => void, error: (txt: string) => void }) {
        this.creatingState = CreatingWorkPageState.uploadingImages;
        this.uploadImages({
            error: () => cb.error(i18n.global.tc('uploadError')),
            success: () => {
                cb.success();
                this.callApi();
            }
        });
    }

    getUtcTime(time: string) {
        let date = new Date();
        date.setHours(Number(time.split(':')[0]));
        date.setMinutes(Number(time.split(':')[1]));
        let h2 = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
        let m2 = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();
        return h2 + ':' + m2;
    }

    private uploadImages(cb: { success: () => void, error: () => void }) {
        FileUploaderService.getInstance().uploadProfile({
            file: this.preImages.mainImage.base64,
            onProgressChange: (progress) => {
                this.preImages.mainImage.progress = progress;
                this.updatedProgress();
            },
            onError: (msg) => cb.error(),
            onReceive: (link) => {
                this.preImages.mainImage.link = link;
                this.uploadedImage(() => cb.success());
            },
        }, ProfileUploaderKeys.USER);
        for (let i = 0; i < this.preImages.otherImages.length; i++) {
            FileUploaderService.getInstance().uploadImage({
                file: this.preImages.otherImages[i].base64,
                onProgressChange: (progress) => {
                    this.preImages.otherImages[i].progress = progress;
                    this.updatedProgress();
                },
                onError: (msg) => cb.error(),
                onReceive: (link) => {
                    this.preImages.otherImages[i].link = link;
                    this.uploadedImage(() => cb.success());
                },
            }, ImageUploaderKeys.WORKPAGE);
        }
    }

    private updatedProgress() {
        let imagesPercents = 0;
        imagesPercents += this.preImages.mainImage.progress ?? 0;
        for (let i = 0; i < this.preImages.otherImages.length; i++) {
            imagesPercents += this.preImages.otherImages[i].progress ?? 0;
        }
        this.averageUploadImagPercent = Math.round(imagesPercents / (this.preImages.otherImages.length + 1));
    }

    private uploadedImage(callBack: () => void) {
        let existNotUploaded = this.preImages.otherImages.find(m => typeof m.link != 'string');
        if (!existNotUploaded && typeof this.preImages.mainImage.link == 'string') {
            callBack();
        }
    }

    private callApi() {
        const finalModel = { ...this.model };
        finalModel.profileImageUrl = this.preImages.mainImage.link;
        finalModel.images = this.preImages.otherImages.map(m => <CreateWorkPageImage>{ imageUrl: m.link });
        finalModel.showFollowers = true;
        finalModel.showFollowings = true;
        finalModel.cityId = finalModel.addresses[0].cityId;
        finalModel.areaId = finalModel.addresses[0].areaId;
        finalModel.countryId = finalModel.addresses[0].countryId;

        for (let i = 0; i < finalModel.addresses.length; i++) {
            delete finalModel.addresses[i].cityName;
            delete finalModel.addresses[i].areaName;
        }

        for (let i = 0; i < finalModel.times.length; i++) {
            delete finalModel.times[i].titleDayOfWeek;
            if (finalModel.times[i].statusType == 1) {
                finalModel.times[i].statusType = 2;
            } else if (finalModel.times[i].statusType == 2) {
                if (DateService.getInstance().getCurrentJalaliMonth() > 6) {
                    finalModel.times[i].times.push({ startTime: '00:00', endTime: '23:59' });
                } else {
                    finalModel.times[i].times.push({ startTime: '00:00', endTime: '23:59' });
                }
                finalModel.times[i].statusType = 1;
            } else if (finalModel.times[i].statusType == 4) {
                for (let j = 0; j < finalModel.times[i].times.length; j++) {
                    const element = finalModel.times[i].times[j];
                    finalModel.times[i].times[j] = {
                        startTime: this.getUtcTime(element.startTime),
                        endTime: this.getUtcTime(element.endTime)
                    };
                }
                finalModel.times[i].statusType = 1;
            }
        }

        for (let c = 0; c < this.categories.length; c++) {
            for (let f = 0; f < this.categories[c].features.length; f++) {
                for (let a = 0; a < this.categories[c].features[f].answers.length; a++) {
                    if (this.categories[c].features[f].answers[a].isSelected) finalModel.features.push({
                        categoryId: this.categories[c].catId,
                        featureId: this.categories[c].features[f].featureId,
                        answerId: this.categories[c].features[f].answers[a].id,
                        isShowOuted: this.categories[c].features[f].answers[a].isShowOuted
                    });
                }
            }
        }

        copyToClipboard(JSON.stringify(finalModel));
        UserRepository.getInstance().createWorkPage({
            body: finalModel,
        })
    }

}
