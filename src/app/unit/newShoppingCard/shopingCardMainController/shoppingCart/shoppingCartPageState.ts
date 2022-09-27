import { ProductRepository } from "@/core/repository/product.repository";
import router from "@/core/router/router";
import { LocalStorageService } from "@/core/service/localStorage.service";
import { getSelectedPageId } from "@/core/service/utils.service";
import { ShoppingCartModel } from "@/data/city/product/shoppingCard.model";
import { i18n } from "@/main";

export class shoppingCartPageState {

    categories = [
        { name: i18n.global.tc('all'), value: null },
        { name: i18n.global.tc('sell'), value: 1 },
        { name: i18n.global.tc('reserve'), value: 2 },
        { name: i18n.global.tc('fare'), value: 3 },
        { name: i18n.global.tc('service'), value: 4 },
        { name: i18n.global.tc('virtual'), value: 5 },
    ]

    currencyTypes = [
        { name: i18n.global.tc('all'), value: null },
        { name: i18n.global.tc('uper_cost'), value: 0 },
        { name: i18n.global.tc('toman'), value: 1 },
    ]
    
    currency = null;
    category = null;
    shoppingCarts = <ShoppingCartModel[]>[];
    loading = false;
    endList = false;

    currencyId = null

    getData() {
        this.loading = true;
        
        ProductRepository.getInstance().GetAllShoppingCart({
            body:{
                skip: this.shoppingCarts.length,
                take: 10,
                myPageId: getSelectedPageId(),
                productType:this.category,
                currencyId:this.currencyId
            },onReceive:(res:ShoppingCartModel[])=>{
                this.loading = false;
                if (res) {
                    this.shoppingCarts.push(...res);
                    if (res.length < 10) {
                        this.endList = true;
                    }
                } else this.shoppingCarts = [];
            },onError:(err)=>{
                this.loading = false;
            }
        })
    }

    changeCategory(data) {
        this.shoppingCarts = [];
        this.currencyId = data.value ;
        this.getData();
    }


    getProductType(key) {
        switch (key) {
            case 1:
                return i18n.global.tc("sell")
            case 2:
                return i18n.global.tc("reserve")
            case 3:
                return i18n.global.tc("fare")
            case 4:
                return i18n.global.tc("service")
            case 12:
                return i18n.global.tc("virtual")
            }
    }

    initBeforeSend(data) {
        LocalStorageService.getInstance().setItem('selectedData', JSON.stringify(data));
        router.push(`/shoppingCart/${data.id}`)
    }
}
