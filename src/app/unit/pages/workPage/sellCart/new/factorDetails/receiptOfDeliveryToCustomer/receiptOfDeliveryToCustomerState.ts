import { FactorRepository } from "@/core/repository/factor.repository";
import { convertFileTOBase64, getSelectedPageId } from "@/core/service/utils.service";
import { useRoute } from "vue-router";
import {factorDetailsModel} from "@/data/city/mainpage/factor.modal" 
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import router from "@/core/router/router";
import { FileUploaderService, ImageUploaderKeys } from "@/core/service/fileUploader.service";

export class receiptOfDeliveryToCustomerState {
 loading = false;
 route = useRoute();
 factor = <factorDetailsModel>null;
 postData = {
    productType: 1,
    factorId: 0,
    receipterPageId: 0,
    isChecked: false,
    checkDescription: '',
    otherPersonDescription: '',
    signatureImageUrl: '',
    imageUrls: [],
    isSellerSend: true
 }

 oderImages = [];
 penting = {
  show:false,
  img:null
 }


 getData() {
		FactorRepository.getInstance().FactorGetFactorById({
			body:{
				myPageId: getSelectedPageId(),
				factorId: this.route.params.factorId
			},onReceive:(res:factorDetailsModel)=>{
				this.factor = res;
                const factor = this.factor.factor;
                this.postData.productType = factor.productType;
                this.postData.factorId = factor.factorId;
                this.postData.receipterPageId = Math.abs(getSelectedPageId());
                this.postData.isSellerSend = factor.sellerAddressType == 4 ? true : false;
			},onError:(err)=>{
				console.log(err);
			}
		})
	}

 onSend() {
  const pd = this.postData;
  if (!pd.signatureImageUrl || (pd.isChecked && !pd.checkDescription)) return ToastService.getInstance().error(i18n.global.tc('signatureAndDescriptionRequired'))

  FactorRepository.getInstance().SellerSendAndBuyerReceiveReceipt({
   body:this.postData,
   onReceive:(res)=>{
   },onError:(err)=>{
    console.log(err);
   }
  })
 }


 initPenting(event){
    this.penting.img = event;
    this.penting.show = false;
 }

 onSelect(event) {
    const imagesLen = this.oderImages.length;
    const newImagesLen = event.target.files.length;
    if (newImagesLen === 0) return;
    if (newImagesLen + imagesLen >= 12) return ToastService.getInstance().error(i18n.global.tc("max",{index:12}));

    for (let i = 0; i < newImagesLen; i++) {
      if (imagesLen + i == 12) break;
      convertFileTOBase64(event.target.files[i], (base64) => {
        this.oderImages.push({base64});
      });
    }
 }

 selectImages() {
    document.getElementById("other-images")?.click();
 }

 async onUploadImages(callBack:Function) {
        let uploaderdPen = false;
        
        FileUploaderService.getInstance().uploadImage({
            file: this.penting.img,
        onReceive: (res) => {
            this.postData.signatureImageUrl = res;
            uploaderdPen = true;
        },
    }, ImageUploaderKeys.RECEPT)

    this.postData.imageUrls = [];
    for (let i = 0; i < this.oderImages.length; i++) {
        const item = this.oderImages[i];
        
        FileUploaderService.getInstance().uploadImage({
            file: item.base64,
            onReceive: (res) => {
                this.postData.imageUrls.push(res);
    
                if ((this.postData.imageUrls.length === this.oderImages.length) && uploaderdPen) {
                    callBack();
                }
              },
            }, ImageUploaderKeys.RECEPT)
 
    }
    
 }

 onSubmit() {
     
    if (this.postData.isChecked && !this.postData.checkDescription) return ToastService.getInstance().warning(i18n.global.tc('pleaseCompliteValues'));
    if (this.penting.img == '') return ToastService.getInstance().warning(i18n.global.tc('youMustSign'));
    if (this.oderImages.length === 0) return ToastService.getInstance().warning(i18n.global.tc('chooseAtLeastOnePhoto'));
    this.loading = true;
    this.onUploadImages(()=>{
        FactorRepository.getInstance().SellerSendAndBuyerReceiveReceipt({
            body:this.postData,
            onLoadChange:(load)=> this.loading = load,
            onReceive:(res)=> router.push('/acceptedSellCarts'),
            onError:(err)=> console.log(err)
        })
    })
 }
}
