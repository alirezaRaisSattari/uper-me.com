import { BASE_TAKE } from "@/core/constant/constant";
import { ProductRepository } from "@/core/repository/product.repository";
import { GetProductPropsModel } from "@/data/city/product/product.model";
import { AccountingRepository } from "@/core/repository/accountingRepository";
import { PropRepository } from "@/core/repository/prop.repository";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";

export class propsState {
    skipNum = 0;
    loadingProps = false
    propsIsFinished = false
    isNull: Boolean
    allProps = null

    GetProductProps(body) {
        if (this.loadingProps || this.propsIsFinished) return;
        this.loadingProps = true
        body.skip = this.skipNum
        ProductRepository.getInstance().GetProductProps({
            body: <GetProductPropsModel>{ ...body },
            onReceive: (response) => {
                if (Array.isArray(response.res)) {
                    this.loadingProps = false;
                    this.allProps = response;
                    if (BASE_TAKE > (response.res as Array<any>).length)
                        this.propsIsFinished = true
                    else
                        this.skipNum += BASE_TAKE;
                } else {
                    this.isNull = true;
                }
            }
        })
    }

    calculateWage(wageId: number, value: number, calculated: Function) {
        AccountingRepository.getInstance().CalculateWageBonus({
            body: {
                wageId: wageId,
                value: value,
                type: 1,
                isBuyer: true
            },
            onReceive: (res) => {
                calculated(res.value)
            }
        })
    }

    deleteProp(workPageId, propId, callBack: Function) {

        PropRepository.getInstance().deleteProp({
            urlContent: {
                workPageId: Math.abs(workPageId),
                propId: propId
            }, onReceive: (res => {
                ToastService.getInstance().success(i18n.global.tc('deleted'));
                callBack();
            }), onError: (err => {
                return false;
            }),
        })
    }

}
