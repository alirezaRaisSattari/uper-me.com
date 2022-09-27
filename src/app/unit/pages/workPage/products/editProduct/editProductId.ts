import {AccountingRepository} from "@/core/repository/accountingRepository";
import {BASE_TAKE} from "@/core/constant/constant";

export class editProductIdState {
        list

    editproductId(){
        AccountingRepository.getInstance().FilterWage({
          body:{
              skip: 0,
              take: 10,
              categoryId:-585,
              currencyId: 0

          },
          onReceive:(res) =>{
              this.list = res
        },
            onLoadChange : (load) =>{

            }
        })
    }
}
