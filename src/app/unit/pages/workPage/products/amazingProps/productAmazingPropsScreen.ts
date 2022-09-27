import {ProductRepository} from "@/core/repository/product.repository";
import {BASE_TAKE_18} from "@/core/constant/constant";
import LoginScreen from "@/app/unit/auth/login/LoginScreen.vue";

export class ProductAmazingPropsScreen {
    list
    amzingplanid
    currencyId
    AmazingPops() {
        ProductRepository.getInstance().getAmazingPlan({
            body:{
                skip: 0,
                take: 10,
                currencyId: null
            },
            onReceive: (res) =>{
                this.list = res
                this.amzingplanid = this.list.map((e)=>e.amazingPlanId)
                this.currencyId = this.list.map((e)=>e.currencyId)
            },
            onLoadChange: () =>{


            }

        })
    }
}
