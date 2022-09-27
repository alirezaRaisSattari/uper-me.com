import { AccountingRepository } from "@/core/repository/accountingRepository";
import { ProductRepository } from "@/core/repository/product.repository";
import router from "@/core/router/router";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { CustomProductModel, ProductModel } from "@/data/city/workpage/sellCart.model";
import { i18n } from "@/main";
import { useRoute } from "vue-router";

export class ShoppingCartListState {
    route = useRoute();
    list = [];
    listCustom = <CustomProductModel[]>[];
    mainData = null;
    totalPrice = 0;
    selectedData = null;
    

    categories = [
        { name: i18n.global.tc('sell'), value: 1 },
        { name: i18n.global.tc('virtual'), value: 2 },
    ]

    selectedCategory = 1;
    propBuyWithActivity = [];
   
    getList() {
        
        this.selectedData = JSON.parse(LocalStorageService.getInstance().getItem("selectedData")) ?? router.back();
        if (!this.selectedData) return router.back();
        ProductRepository.getInstance().ShoppingCartGetShoppingCartItems({
            body:{
                shoppingCartId: this.selectedData.id ?? router.back(),
                myPageId: getSelectedPageId()
            },onReceive:(res)=>{
                if(!res) return router.back();
                if (res[0].customs) {
                    this.selectedCategory = 2;
                } else {
                    this.selectedCategory = 1;
                }
                this.selectedData.productLists = res[0].products;
                this.selectedData.customProducts = res[0].customs;
                LocalStorageService.getInstance().setItem("selectedData", JSON.stringify(this.selectedData))
                this.mainData = res[0];
                
                this.list = res[0].products ?? [];
                this.listCustom = res[0].customs ?? [];
                this.calcAllCurrency();
            },onError:(err)=>console.log(err)
        })
    }

    calcAllCurrency () {
        let sum = 0;
        this.list.forEach(item => {
            if (item.fPrice && item.fPrice > 0) {
                sum += item.fPrice;
            } else {
                if (item.offPercent > 0) {
                    sum += item.numbers * (item.price - (item.price * item.offPercent) / 100);
                } else {
                    sum += (item.numbers * item.price);
                }
            }
           
        });

        this.listCustom.forEach(item => {
            sum += item.number * item.price;
        });

        this.totalPrice = sum;
        this.selectedData.productLists = this.list;
        LocalStorageService.getInstance().setItem("selectedData", JSON.stringify(this.selectedData))
    }

    changeItems(data) {
        const index = this.list.findIndex(item => item.productId == data.productId)
        this.list[index].numbers = data.number ;
        if (data.number == 0) return this.getList();
        this.calcAllCurrency();
    }

    pushActivityLevelCode(code ,finalPrice) {
        
        const index = this.list.findIndex(item => item.propId == code);
        this.list[index].fPrice = finalPrice;
        if (!(this.propBuyWithActivity.find(item => item == code))) {
            this.propBuyWithActivity.push(code);
            this.selectedData.propBuyWithActivity = this.propBuyWithActivity;
            LocalStorageService.getInstance().setItem("selectedData", JSON.stringify(this.selectedData))
        }
        this.calcAllCurrency();
    }

    deleteActivityLevelCode(code , fPrice) {
        const propIndex = this.propBuyWithActivity.findIndex(item => item == code);
        const listIndex = this.list.findIndex(item => item.propId == code);
        this.list[listIndex].fPrice = fPrice;
        if (propIndex) {
            this.propBuyWithActivity.splice(propIndex,1);
            this.selectedData.propBuyWithActivity = this.propBuyWithActivity;
            LocalStorageService.getInstance().setItem("selectedData", JSON.stringify(this.selectedData))
        }
        this.calcAllCurrency();
    }
}
