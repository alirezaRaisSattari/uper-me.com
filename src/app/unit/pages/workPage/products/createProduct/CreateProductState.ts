import { ProductRepository } from "@/core/repository/product.repository";
import router from "@/core/router/router";
import { FileUploaderService, ImageUploaderKeys, ProfileUploaderKeys } from "@/core/service/fileUploader.service";
import { getSelectedPageData, getSelectedPageId } from "@/core/service/utils.service";
import { CreateProductModel, ProductImages } from "@/data/city/product/createProduct.model";
import { i18n } from "@/main";

enum CreatingProductState {
    uploadingImages = 1,
    creatingFeatures,
    creatingProduct,
}

export class CreateProductState {
    createModel = new CreateProductModel();
    preImage = new ProductImages();
    step = 1
    stepProgress = 1
    creatingState: CreatingProductState = null
    averageUploadImagPercent: number = 0;
    showModalCreating = false

    createProduct(cb: { success: () => void, error: (txt: string) => void }) {
        this.creatingState = CreatingProductState.uploadingImages;
        this.uploadImages({
            error: () => cb.error(i18n.global.tc('uploadError')),
            success: () => {
                this.callApi();
            }
        });
    }

    private uploadImages(cb: { success: () => void, error: () => void }) {
        FileUploaderService.getInstance().uploadProfile({
            file: this.preImage.mainImage.base64,
            onProgressChange: (progress) => {
                this.preImage.mainImage.progress = progress;
                this.updatedProgress();
            },
            onError: (msg) => cb.error(),
            onReceive: (link) => {
                this.preImage.mainImage.link = link;
                this.uploadedImage(() => cb.success());
            },
        }, ProfileUploaderKeys.USER);
        for (let i = 0; i < this.preImage.otherImages.length; i++) {
            FileUploaderService.getInstance().uploadImage({
                file: this.preImage.otherImages[i].base64,
                onProgressChange: (progress) => {
                    this.preImage.otherImages[i].progress = progress;
                    this.updatedProgress();
                },
                onError: (msg) => cb.error(),
                onReceive: (link) => {
                    this.preImage.otherImages[i].link = link;
                    this.uploadedImage(() => cb.success());
                },
            }, ImageUploaderKeys.WORKPAGE);
        }
    }

    private updatedProgress() {
        let imagesPercents = 0;
        imagesPercents += this.preImage.mainImage.progress ?? 0;
        for (let i = 0; i < this.preImage.otherImages.length; i++) {
            imagesPercents += this.preImage.otherImages[i].progress ?? 0;
        }
        this.averageUploadImagPercent = Math.round(imagesPercents / (this.preImage.otherImages.length + 1));
    }

    private uploadedImage(callBack: () => void) {
        let existNotUploaded = this.preImage.otherImages.find(m => typeof m.link != 'string');
        if (!existNotUploaded && typeof this.preImage.mainImage.link == 'string') {
            callBack();
        }
    }

    private callApi() {
        this.creatingState = CreatingProductState.creatingFeatures;
        const finalModel = { ...this.createModel };
        finalModel.workPageId = Math.abs(getSelectedPageId())
        finalModel.productDetails.mainImageUrl = this.preImage.mainImage.link;
        finalModel.productDetails.otherImages = this.preImage.otherImages.map(m => m.link);
        if (finalModel.detailId != null) finalModel.productDetails = null;
        ProductRepository.getInstance().createProductFull({
            body: finalModel,
            onLoadChange: (load) => {
                this.creatingState = CreatingProductState.creatingProduct;
            },
            onReceive: () => {
                router.push('/page/' + getSelectedPageData().username)
                this.showModalCreating = false
            }
        })
    }
}
