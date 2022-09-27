import { ProductRepository } from "@/core/repository/product.repository";
import { PageStore } from "@/core/store/page.store";
import { ToastService } from "@/core/service/toast.service";

export class StateBookmarkProduct {

    folderBookmarks: Array<any> = [];
    showDialogCreateUpdate = false;
    isSelected: number = null;

    getFolderBookmark() {
        ProductRepository.getInstance().getFolderBookmark({
            urlContent: `${PageStore().selectedPageId}/${0}/${1000}`,
            onReceive: res => {
                this.folderBookmarks = res;
            }
        })
    }

    createFolderBookmark(name: string) {
        if (name == '') {
            ToastService.getInstance().error("ابتدا نام را وارد کنید");
            return;
        }
        ProductRepository.getInstance().createFolderBookmark({
            body: {
                "pageId": PageStore().selectedPageId,
                "name": name
            },
            onReceive: (res) => {
                this.showDialogCreateUpdate = false;
                ToastService.getInstance().success('با موفقیت ایجاد شد')
                this.folderBookmarks.push({ name: name, folderId: res.id, products: [] });
            }
        })
    }


    bookmarkProduct(productId: number) {
        ProductRepository.getInstance().bookmarkProduct({
            body: {
                "pageId": PageStore().selectedPageId,
                "productId": productId,
                "folderId": this.isSelected
            },
            onReceive: res => {
                ToastService.getInstance().success('با موفقیت ذخیره شد')
            }
        })
    }

}
