import { FactorRepository } from "@/core/repository/factor.repository";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { DateService } from "@/core/service/date.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { ReturnedFactorModel } from "@/data/city/mainpage/factor.modal";
import { i18n } from "@/main";
import { useRoute } from "vue-router";

export class factorDetailsPageState {

	factor = null;
	route = useRoute();
	dataList = [];
	timer = null;
	qrShowDialog = false;
	retrunedData = <ReturnedFactorModel>null;
	loading = false;
	count = 0;
	getData() {
		

		FactorRepository.getInstance().FactorGetFactorById({
			body: {
				myPageId: getSelectedPageId(),
				factorId: this.route.params.factorId
			}, onReceive: (res) => {
				this.factor = res;
				
				if (this.factor.factor.factorStatus !== 9) {
					this.dataList = [
						{ label: i18n.global.tc('factorDate'), value: DateService.getInstance().convertToJalali(res.factor.buyerWillReceiveFactor) },
						{ label: i18n.global.tc('factorNumber'), value: `UF_${res.factor.factorId}` },
						{ label: i18n.global.tc('uperScore'), value: 0.1 },
						{ label: i18n.global.tc('payType'), value: res.factor.paymentType === 1 ? i18n.global.tc('debit') : i18n.global.tc('inPlace') },
						{ label: i18n.global.tc('count'), value: res.details.length },
						{ label: i18n.global.tc('totalPrice'), value: res.factor.finalPrice},
					]
				} else {
					this.getReturnedFactor(res.factor.factorId,Math.abs(getSelectedPageId()))
				}
				this.getCalculateEarningUper()
			}
		})
	}

	
	getReturnedFactor(fid,pageId) {
		
		if (this.route.query.isSeller == 'true') {
			FactorRepository.getInstance().ReturnedFactorGetByIdForSeller({
				urlContent:`${fid}/${pageId}`,
				onReceive: (res:ReturnedFactorModel) => {
					this.retrunedData = res;
					this.count = res.items.length;
					
					   this.dataList = [
						   { label: i18n.global.tc('factorDate'), value: DateService.getInstance().convertToJalali(String(res.output.modifiedAt)) },
						   { label: i18n.global.tc('factorNumber'), value: `UF_${res.output.factorId}` },
						   { label: i18n.global.tc('count'), value: 1 },
						   { label: `${i18n.global.tc('totalPrice')} ${i18n.global.tc('returned')}`, value: res.output.finalPrice },
					   ]
					   this.dataList[2].value = 2
					   
				   this.getCalculateEarningUper()
			   },onLoadChange:(load) =>{
				   this.loading = load;
			   }
			})
			return ;
		} else {
			
			FactorRepository.getInstance().FactorGetById({
				body:{
					myPageId: getSelectedPageId(),
					factorId: Number(this.route.params.factorId)
				}
				, onReceive: (res) => {
					this.retrunedData = res;
					this.dataList = [
						{ label: i18n.global.tc('factorDate'), value: DateService.getInstance().convertToJalali(res.factor.buyerWillReceiveFactor) },
						{ label: i18n.global.tc('factorNumber'), value: `UF_${res.factor.factorId}` },
						{ label: i18n.global.tc('uperScore'), value: 0.1 },
						{ label: i18n.global.tc('payType'), value: res.factor.paymentType === 1 ? i18n.global.tc('debit') : i18n.global.tc('inPlace') },
						{ label: i18n.global.tc('count'), value: res.details.length },
						{ label: i18n.global.tc('totalPrice'), value: res.factor.finalPrice},
					]
					this.getCalculateEarningUper()
				},onLoadChange:(load) =>{
					this.loading = load;
				}
			})
		}
	}
	

	getCalculateEarningUper() {
		FactorRepository.getInstance().CalculateEarningUper({
			body: {
				factorId: this.route.params.factorId,
				isBuyer: false,
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

	getTimeColdDown(time) {

		DateService.getInstance().homeScreenCountDown(
			time,
			(_time) => {
				return _time.timer;
			}, () => {
			}
		);
	}

	checkExpire(date) {
		return DataFormatterService.getInstance().expireDate(date) !== null ? true : false;
	}
}
