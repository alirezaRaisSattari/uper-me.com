import { FactorRepository } from "@/core/repository/factor.repository";
import { DataFormatterService } from "@/core/service/dataFormater.service";
import { DateService } from "@/core/service/date.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { ReturnedFactorModel } from "@/data/city/mainpage/factor.modal";
import { i18n } from "@/main";
import { useRoute } from "vue-router";

export class factorDetailsPageState {

	route = useRoute();
	dataList = [];
	timer = null;
	retrunedData = <ReturnedFactorModel>null;
	loading = false;
	count = 0;
	getData() {

		FactorRepository.getInstance().ReturnedFactorGetByIdForSeller({
			urlContent:`${this.route.params.factorId}/${Math.abs(getSelectedPageId())}`
			, onReceive: (res:ReturnedFactorModel) => {
				this.retrunedData = res;
				this.dataList = [
					{ label: i18n.global.tc('factorDate'), currency:null , value: DateService.getInstance().convertToJalali(res.output.createdAt.toString() , true) },
					{ label: i18n.global.tc('factorNumber'), currency:null , value: `UF_${this.route.params.factorId}` },
					{ label: i18n.global.tc('count'), currency:null , value: res.items.length },
					{ label: i18n.global.tc('returnedAllCost'), currency:res.output.currencyId , value: this.calcReturned()},
				]
			}
		})
	}

	checkExpire(date) {
		return DataFormatterService.getInstance().expireDate(date) !== null ? true : false;
	}

	calcReturned() {
		let sum = 0;
		this.retrunedData.items.forEach(item => {
			sum += item.currencyId == 0 ? (item.uperPrice * item.defaultPrice) - (((item.uperPrice * item.defaultPrice) / 100) * (item.offPercent ?? 0))  :  (((item.defaultPrice * item.number) - (((item.defaultPrice * item.number ) / 100) * (item.offPercent ?? 0))));
		});

		return sum;
	}
}
