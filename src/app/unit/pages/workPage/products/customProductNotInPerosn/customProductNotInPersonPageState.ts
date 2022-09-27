import { ProductRepository } from "@/core/repository/product.repository";
import { UserRepository } from "@/core/repository/user.repository";
import router from "@/core/router/router";
import { FileUploaderService, ImageUploaderKeys } from "@/core/service/fileUploader.service";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { ToastService } from "@/core/service/toast.service";
import { convertFileTOBase64 } from "@/core/service/utils.service";
import { CreateCustomProductModel, CustomProductImageModel, customShopMadeModel } from "@/data/city/mainpage/factor.modal";
import { i18n } from "@/main";

export class customProductNotInPersonState {
    productData:customShopMadeModel = JSON.parse(LocalStorageService.getInstance().getItem('productData')) ?? router.back();
    workPageDetails = [];
    options = {
        orginalType: [
             {name: i18n.global.tc('yes'), value: true },
             {name: i18n.global.tc('no'),value: false},
            ],
        usedType: [
            {name: i18n.global.tc('new'), value: 1 },
            {name: i18n.global.tc('stock'),value: 2},
        ]
    }
    imageList = <CustomProductImageModel[]>[];
    continue = false;
    listPreparationTime = [
        {label:i18n.global.tc('hour',{index:1}) , value : 60},
        {label:i18n.global.tc('hour',{index:2}) , value : 120},
        {label:i18n.global.tc('hour',{index:3}) , value : 180},
        {label:i18n.global.tc('hour',{index:4}) , value : 240},
        {label:i18n.global.tc('day',{index:1}) , value : (60*24)},
        {label:i18n.global.tc('day',{index:2}) , value : (60*24*2)},
        {label:i18n.global.tc('day',{index:3}) , value : (60*24*3)},
        {label:i18n.global.tc('day',{index:4}) , value : (60*24*4)},
    ];
    loading = false;
    usedTypeList = [
        {label:i18n.global.tc('normal'), value:1},
        {label:i18n.global.tc('sensitive'), value:2},
        {label:i18n.global.tc('glacier'), value:3},
        {label:i18n.global.tc('hotFood'), value:4},
    ]
    showDialog = false;
    currencyTypes = [{label:i18n.global.tc('toman') , value:1}]
    selectedCurrency = 1;
    selectedPreparationTime = this.productData.prepareTime;

    getData() {
        UserRepository.getInstance().WorkPagesCategoriesGetCategoriesOfWorkPages({
            body:[this.productData.workPageId],
            onReceive:(res)=>{
                
                this.workPageDetails = res;
                this.productData.otherImage.forEach(item => {
                    const img = {
                        base64:null,
                        link:item
                    };
                    this.imageList.push(img)
                });
            },onError:(err)=>console.log(err)
        })
    }

    removeFromList(key) {
        this.productData.otherImage.splice(key,1);
    }

    onSelect(e){
        if (e.target.files.length === 0) return;
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            
            convertFileTOBase64(file , (base64) => {
                const item = {
                    base64:base64,
                    link:null
                };
                this.imageList.push(item)
            });
        }
    }

    uploadImage(cb: { success: () => void, error: () => void }) {
        let uploaded = this.imageList.filter(item => item.base64 && !item.link).length;

        for (let i = 0; i < this.imageList.length; i++) {
            const item = this.imageList[i];
            if (item.base64 && !item.link) {
                FileUploaderService.getInstance().uploadImage({
                    file: item.base64,
                    onError: (msg) => cb.error(),
                    onReceive: (link) => {
                        uploaded += 1;
                        this.imageList[i].link = link;
                        if (this.imageList.length === uploaded) {
                            cb.success()
                        }
                    },
                }, ImageUploaderKeys.CUSTOM_PRODUCT);
            }
        }
    }

    onSend() {
        let body:CreateCustomProductModel = Object(this.productData);
        this.loading = true;
        if (this.imageList.find(item => item.base64 && !item.link)) {
            this.uploadImage({
                error: () => ToastService.getInstance().error(i18n.global.tc('errorUploadingPhotos')),
                success: () => {
                    this.onSend();
                    }
                }
            );
            return
        } 
        body.otherImages = [];
        this.imageList.forEach(item => {
            body.otherImages.push(String(item.link)) 
        });

        ProductRepository.getInstance().CustomProductCreate({
            body:body,
            onReceive:(res)=>{
                ToastService.getInstance().success(i18n.global.tc('successMassage'));
                setTimeout(() => {
                    this.loading = false;
                    router.back();
                }, 1000);
            },onError:(err)=> this.loading = false
        })
    }

}
