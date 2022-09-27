import { FactorRepository } from "@/core/repository/factor.repository"
import router from "@/core/router/router";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { FileUploaderService, VideoUploaderKeys } from "@/core/service/fileUploader.service";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import {factorDetailsModel} from "@/data/city/mainpage/factor.modal" 
import { i18n } from "@/main";
export class fotterFactorDetailsForterSellCart {
	data = <factorDetailsModel>null;
	showDialog = false;
	progress = 0;
	detailsType = 1;
	loading = false;
	isExpired = false;
	showClearingDialog = false;
	clearingDate = null;
	videoLoading = false;
	postDataDelete = {
		factorId:  0,
		pageId: getSelectedPageId(),
		isBuyer: false,
		description: '',
		factorCancellationType: 1
	}

	postDatasellerPrepare = {
		workPageId: Math.abs(getSelectedPageId()),
		factorId: null,
		videoUrl: null
	}

	factorBody = {
		factorId:null,
		workPageId: Math.abs(getSelectedPageId())
	}
	
	init(data) {
		this.data = data;
		this.postDataDelete = {
			factorId:  this.data.factor.factorId,
			pageId: Math.abs(getSelectedPageId()),
			isBuyer: this.data.factor.buyerPageId === getSelectedPageId() ? true : false,
			description: '',
			factorCancellationType: this.checkFactorCancel()
		}
		this.factorBody.factorId = this.data.factor.factorId;

		this.postDatasellerPrepare.factorId = this.data.factor.factorId;
		this.checkExpired();
	}

	checkFactorCancel() {
		switch (this.data.factor.factorStatus) {
			case 1:
				return 3;
			case 2:
				return 1;
			case 3:
				return 2;
		}
	}

	cancelAccsept() {
		if (this.postDataDelete.description.length < 5) return ToastService.getInstance().error(i18n.global.tc('characterLimit'));
		switch (this.data.factor.factorStatus) {
			case 2:
				this.postDataDelete.factorCancellationType = 1;
				break;
			case 3:
				this.postDataDelete.factorCancellationType = 2;
				break;
			case 4:
				this.postDataDelete.factorCancellationType = 3;
				break;
		}

		FactorRepository.getInstance().factorCancel({
			body:this.postDataDelete,
			onReceive:(res)=>{
				this.showDialog = false;
			},onError:(err:any)=>{
				console.log(err);
				ToastService.getInstance().error(err.message)
				this.showDialog = false;
			},onLoadChange:(load) =>{
				this.loading = load;
			}
		})
	}

	sendTheShipment() {
		
		FactorRepository.getInstance().SendingForSellerSend({
			body:this.factorBody,
			onLoadChange:(load)=>{this.loading = load},
			onReceive:(res)=>{
				router.back()
			},
			onError:(err)=>console.log(err)
		})
	}

	sellerPrepare() {
		

		if (this.data.factor.sellerAddressType == 4) {
			
			FactorRepository.getInstance().SellerPrepare({
				body: {
					factorId:  this.data.factor.factorId,
					workPageId:this.data.factor.sellerAddressObject.workPageId ?? this.data.logs[0].workPageId
				},
				onReceive:(res)=>{
					this.showDialog = false;
					router.back();
				},onError:(err)=>{
					console.log(err);
					this.showDialog = false;
				},onLoadChange:(load) =>{
					this.loading = load;
				}
			})
		} else {
			FactorRepository.getInstance().SellerPrepare({
				body:this.postDataDelete,
				onReceive:(res)=>{
					this.showDialog = false;
					router.back();
				},onError:(err)=>{
					console.log(err);
					this.showDialog = false;
				},onLoadChange:(load) =>{
					this.loading = load;
				}
			})
		}
	}

	myUploader(event) {
		this.videoLoading = true;
		DataFormatterService.getInstance().getVideoData(event.files[0] , (data:any) => {
			if (Number(data.duration) <= 60) {
					FileUploaderService.getInstance().uploadVideo({
						file:event.files[0],
						onReceive: (res) => {
							this.postDatasellerPrepare.videoUrl = res;
							this.preparingVideo();
						},
				}, VideoUploaderKeys.factor_prepare)
			} else ToastService.getInstance().error(i18n.global.tc('selectedVideoWithLongDurationNotAccepted'));
		})
	}
	
	preparingVideo() {
		this.loading = true;
		FactorRepository.getInstance().SellerPrepare({
			body:this.postDatasellerPrepare
			,onReceive:(res)=>{
				ToastService.getInstance().success(i18n.global.tc('successMassage'));
				setTimeout(() => {
					this.videoLoading = false;
					router.back();
					this.loading = false;
				},1000)
			},onError:(err)=>{
				this.loading = false;
				this.videoLoading = false;
			},onLoadChange:(load) =>{
				this.loading = load;
			}
		})
	}
	preparing() {
		this.loading = true;
		FactorRepository.getInstance().SendingForSellerSend({
		body:{
			workPageId: Math.abs(getSelectedPageId()),
  			factorId: this.data.factor.factorId,
			},onReceive:(res)=>{
				ToastService.getInstance().success(i18n.global.tc('successMassage'));
				setTimeout(() => {
					router.back();
					this.loading = false;
				})
			},onError:(err)=>{
				this.loading = false;
			},onLoadChange:(load) =>{
				this.loading = load;
			}
		})
	}

	initDialog(key) {
		if (key === 3) {
			router.push(`/receiptOfDeliveryToCustomer/${this.data.factor.factorId}`);
		} 
		if (this.data.factor.sellerAddressType == 2) {
			this.detailsType = key;
			this.showDialog = true;
		} else {
			this.submitFactor(); //need check
		}
	
	}

	submitFactor() {
		this.loading = true;
		FactorRepository.getInstance().SellerAccept({
			body:this.factorBody,
			onLoadChange:(load)=>{this.loading = load},
			onReceive:(res)=>router.back(),
			onError:(err)=>console.log(err),
		})
	}

	clearing() {
		this.loading = true;
		FactorRepository.getInstance().SellerFinalStep({
			body:{
				pageId: Math.abs(getSelectedPageId()) ,
				factorId: this.data.factor.factorId,
				productType: this.data.factor.productType
			},onReceive:(res)=>{
				
				this.showClearingDialog = true;
				this.loading = false;
				this.clearingDate = res;
			},onError:(err)=>{
				this.loading = false;
				console.log(err);
				ToastService.getInstance().error(err.toString());
			},onLoadChange:(load) =>{
				this.loading = load;
			}
		})
	}


	checkExpired() {
		this.isExpired = false;
		this.isExpired = DataFormatterService.getInstance().expireDate(this.data.factor.expireDate) !== null ? true : false;
		for (let i = 0; i < this.data.details.length; i++) {
			const item = this.data.details[i];
			 if (item.hashToken == 'expired') {
			   this.isExpired = true;
			   break;
			}
		}
	}


	
}
