import { ProductRepository } from "@/core/repository/product.repository";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";

export class WorkPageProductItem {
    dialog = false;

    deleteProduct(productId, workPageId, callBack: Function) {
        ProductRepository.getInstance().DeleteProduct({
            urlContent: `${workPageId}/${productId}`,
            onReceive: (res) => {
                ToastService.getInstance().success(i18n.global.tc("deleteProductSuccessful"));
                this.dialog = false;
            }, onError: (err) => {
                console.log(err);
                this.dialog = false;
            }
        });
    }


    restore(productId, workPageId, callBack: Function) {
        ProductRepository.getInstance().RestoreProduct({
            body: {
                productId: productId,
                workPageId: workPageId
            }, onReceive: (res) => {
                this.dialog = false;
                ToastService.getInstance().success(i18n.global.tc("successMassage"));
                callBack();
            }, onError: (err) => {
                this.dialog = false;
                console.log(err);
                callBack();
            }
        })
    }

}
