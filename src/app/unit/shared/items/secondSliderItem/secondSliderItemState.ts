import {AccountingRepository} from "@/core/repository/accountingRepository"

export class secondSliderItemState {


    calculateWage(body, calculated: Function) {
        AccountingRepository.getInstance().CalculateWageBonus({
            body: body,
            onReceive: (res) => {
                calculated(res.value)
            }
        })
    }


}
