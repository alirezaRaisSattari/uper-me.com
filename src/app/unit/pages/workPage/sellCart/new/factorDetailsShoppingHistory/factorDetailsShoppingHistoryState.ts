import { FactorRepository } from "@/core/repository/factor.repository";
import { UserRepository } from "@/core/repository/user.repository";
import router from "@/core/router/router";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { DateService } from "@/core/service/date.service";
import { ToastService } from "@/core/service/toast.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { ReturnedFactorModel } from "@/data/city/mainpage/factor.modal";
import { ReturnedFactorReturnModel } from "@/data/city/product/returnFactor.model";
import { i18n } from "@/main";
import axios from "axios";
import { useRoute } from "vue-router";

export class factorDetailsPageState {

	factor = null;
	route = useRoute();
	dataList = [];
	timer = null;
	qrShowDialog = false;
	showDialog = false;
	retrunedData = <ReturnedFactorModel>null;
	loading = false;
	count = 0;
	userData = null;
	showSelectAReference = false;
	showAddAReference = false;
	
	postDataReturnedFactor = <ReturnedFactorReturnModel>{};
	postDataAddItem = <ReturnedFactorReturnModel>{};
	postDataDelete = {
		factorId:  0,
		pageId: getSelectedPageId(),
		isBuyer: false,
		description: '',
		factorCancellationType: 3
	}

	subjectReturnFactorList = [
		{'key': 1, 'value': i18n.global.tc("notLikeBeforeOpen")},
		{'key': 2, 'value': i18n.global.tc("notLikeAfterOpen")},
		{'key': 3, 'value': i18n.global.tc("notMatchWithPicturesAndDetails")},
		{'key': 4, 'value': i18n.global.tc("notMatchWithColor")},
		{'key': 5, 'value': i18n.global.tc("technicalProblems")},
		{'key': 6, 'value': i18n.global.tc("usedProduct")},
		{'key': 7, 'value': i18n.global.tc("fakeProduct")},
		{'key': 8, 'value': i18n.global.tc("physicalDamage")},
		{'key': 9, 'value': i18n.global.tc("guaranteeTimeProblem")},
		{'key': 10, 'value': i18n.global.tc("guaranteeCardProblem")},
		{'key': 11, 'value': i18n.global.tc("guaranteeCardNotExist")},
		{'key': 12, 'value': i18n.global.tc("lockedOrNotRegisteredMobile")},
		{'key': 13, 'value': i18n.global.tc("greaterPrice")},
		{'key': 14, 'value': i18n.global.tc("lostGifts")},
		{'key': 15, 'value': i18n.global.tc("visibleDamageOnProduct")},
		{'key': 16, 'value': i18n.global.tc("emptyBoxWithSellerFault")},
		{'key': 17, 'value': i18n.global.tc("smugglingProduct")},
	];

	postDataSelected = {
		product:null,
		description:'',
		count:0,
		cause:null,
		imgLink:'',
		videoLink:''
	};

	getData() {
		if (this.route.query.uId) {
			UserRepository.getInstance().getFullPage({
				body:{
					myPageId: getSelectedPageId(),
					username: this.route.query.uId
				},onReceive:(res)=> {
					this.userData = res;
				}
			})
		}

		FactorRepository.getInstance().FactorGetFactorById({
			body: {
				myPageId: getSelectedPageId(),
				factorId: this.route.params.factorId
			}, onReceive: (res) => {
				this.factor = res;
				this.postDataDelete = {
					factorId:  res.factor.factorId,
					pageId: Math.abs(getSelectedPageId()),
					isBuyer: res.factor.buyerPageId === getSelectedPageId() ? true : false,
					description: '',
					factorCancellationType: this.factor.factor.factorStatus == 2 ? 1 : this.factor.factor.factorStatus == 3 ? 2 : 3
				}
				 
				this.getReturnedFactor(res.factor.factorId,Math.abs(getSelectedPageId()))
				this.getCalculateEarningUper();
			}
		})
	}

	
	getReturnedFactor(fid,pageId) {
		
		FactorRepository.getInstance().FactorGetById({
			body:{
				myPageId: getSelectedPageId(),
				factorId: Number(this.route.params.factorId)
			}
			, onReceive: (res) => {
				const isReturn = res.details.findIndex(item => item.returnedNumber !== null) != -1;
				this.retrunedData = res;
				
				this.dataList = [
					{ label: i18n.global.tc('factorDate'), value: DateService.getInstance().convertToJalali(res.factor.createDate , true) },
					{ label: i18n.global.tc('factorNumber'), value: `UF_${res.factor.factorId}`  , currency: null},
					{ label: isReturn  ? i18n.global.tc('scorePointsForNon-returnedItems'):i18n.global.tc('uperScore'), value: 0.1  , currency: 0},
					{ label: i18n.global.tc('payType'), value: res.factor.paymentType === 1 ? i18n.global.tc('debit') : i18n.global.tc('inPlace')  , currency: null},
					{ label: i18n.global.tc('freeVoucher'), value: res.factor.giftCardValue  , currency: res.factor.currencyId},
					{ label: i18n.global.tc('numberOfItems'), value: res.details.length  , currency: null},
					{ label: i18n.global.tc('sendPrice'), value: res.factor.totalDeliveryCost  , currency: res.factor.currencyId},
					{ label: i18n.global.tc('totalPrice'), value: res.factor.finalPrice , currency: res.factor.currencyId},
				]
				this.getCalculateEarningUper()
			},onLoadChange:(load) =>{
				this.loading = load;
			}
		})
	}

	getCalculateEarningUper() {
		FactorRepository.getInstance().CalculateEarningUper({
			body: {
				factorId: this.route.params.factorId,
				isBuyer: true,
				sellerAddressType: this.factor.factor.sellerAddressType
			}, onReceive: (res) => {
				if (this.dataList[2] && this.dataList[2].value) {
					this.dataList[2].value = res.earningUper;
				}
			},onLoadChange:(load) =>{
				this.loading = load;
			}
		})
	}

	checkExpire() {
		const day = DateService.getInstance().calculateNumberOfDaysJs(this.factor.factor.expireDate);
		if (day > 7) return false;
		return true;
	}

	cancelAccsept() {
		if (this.postDataDelete.description == '') return ToastService.getInstance().error(`${i18n.global.tc('description')} ${i18n.global.tc('isEmpty')}`)
		FactorRepository.getInstance().factorCancel({
			body:this.postDataDelete,
			onReceive:(res)=>{
				this.showDialog = false;
				ToastService.getInstance().success(i18n.global.tc('successMassage'))
				setTimeout(() => {
					router.back();
				}, 1000);
			},onError:(err:any)=>{
				console.log(err);
				this.showDialog = false;
			},onLoadChange:(load) =>{
				this.loading = load;
			}
		})
	}

	refer() {
		if (this.factor.factor.sellerAddressType == 1 || this.factor.factor.sellerAddressType == 3)  return ToastService.getInstance().error(i18n.global.tc('on-site-reference'));
		this.showSelectAReference = true;
	}

	initAddItem (data) {
		console.log(data);
		this.postDataAddItem.factorId = data.itemId;
		this.postDataAddItem.myPageId = getSelectedPageId();
		this.postDataAddItem.items.push({
			description:'',
			fileUrls: [],
			itemId:data.itemId,
			number:0,
			subject:0
		})
	}

	downloadFile( url, label) {
		axios.get(url, { responseType: 'blob' })
		.then(response => {
			const blob = new Blob([response.data])
			const link = document.createElement('a')
			link.href = URL.createObjectURL(blob)
			link.download = label
			link.click()
			URL.revokeObjectURL(link.href)
		}).catch(()=> {
			ToastService.getInstance().error(i18n.global.tc('downloadError'))
		})
	}
	
}
