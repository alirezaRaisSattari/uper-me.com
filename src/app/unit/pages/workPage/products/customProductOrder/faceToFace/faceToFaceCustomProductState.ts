import { AccountingRepository } from "@/core/repository/accountingRepository";
import { FactorRepository } from "@/core/repository/factor.repository";
import { useRoute } from "vue-router";
import {getSelectedPageId} from "@/core/service/utils.service";
import {ref} from "vue";
import {i18n} from "@/main";
import theSelectAReferenceItemScreen
    from "@/app/unit/pages/workPage/sellCart/new/factorDetailsShoppingHistory/selectAReferenceItem/theSelectAReferenceItemScreen.vue";

export class FaceToFaceCustomProductState {
    route = useRoute();
    postData = {
        buyerPageId: 0,
        sellerPageId: Number(this.route.params.id),
        price: 0,
        currencyId: 0,
        description: 'string',
        accountNumber: 0,
        password: "string"
    }
    list = [];
    selectCost = null;
    Costs = [
        {name: i18n.global.tc('toman'), value: 0},
        {name: i18n.global.tc('uper'), value: 1},
    ]
    getAllAccount() {
        // tamam
        // if()
        AccountingRepository.getInstance().GetWalletByIdAndType({
            body:{
                 pageId: getSelectedPageId(),
                 accountType: 1,
                 currencyId: this.selectCost
            },onReceive:(res)=>{
                if (this.list!==null)
                this.list.push(...res);
            }
        })
    }
    onSubmit() {
        //in api call mishe tahesh
        FactorRepository.getInstance().SpecialFactorCreateByBuyer({
            body:{
                 buyerPageId: getSelectedPageId(),
                sellerPageId: this.route.params.id,
                 price: this,
                // currencyId: 0,
                // description: string,
                // accountNumber: 0,
                // password: string
            },onReceive:(res)=>{

            }
        })
    }
}