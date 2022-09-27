import { ProductRepository } from "@/core/repository/product.repository";
import { useRoute } from "vue-router";

export class theEventPageScreen {
    route = useRoute();
    list = [];
    loading = false;
    eventData = null;
    endList = false;

    getEvent() {
        ProductRepository.getInstance().EventGetEventPageByIds({
            body:[
                Number(this.route.query.id)
            ],onReceive:(res)=> {
                this.eventData = res;
                this.getProducts()
            }
        })
    }

    getProducts() {
        if (this.loading || this.endList) return
        this.loading = true;
        ProductRepository.getInstance().EventGetEventsProductByEventPage({
            body:{
                skip:this.list.length,
                take:10,
                eventPageId: Number(this.route.query.id)
            },onReceive:(res)=>{
                
                this.loading = false;
                if (res.length < 10) this.endList = true
                this.list.push(...res);
            }
        })
    }
}