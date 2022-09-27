import {ProductRepository} from "@/core/repository/product.repository";
import {PageStore} from "@/core/store/page.store";
import {ToastService} from "@/core/service/toast.service";
import {getSelectedPageId} from "@/core/service/utils.service";

export class StatusProductModel {

    getAllFolderProduct(callback: (item) => void) {
        ProductRepository.getInstance().getAllFolder({
            body: {
                skip: 0,
                take: 1000,
                workPageId: Math.abs(getSelectedPageId())
            },
            onReceive: res => {
                callback(res);
            }
        })
    }

    createFolderProduct(name: string, callback: (id) => void) {
        ProductRepository.getInstance().CreateNewFolders({
            body: {
                name: name,
                workPageId: Math.abs(getSelectedPageId())
            },
            onReceive: (res) => {
                callback(res.id);
            }
        })
    }

    updateFolderProduct(folderId: number, name: string) {
        ProductRepository.getInstance().updateFolder({
            body: {
                folderId: folderId,
                name: name,
                workPageId: Math.abs(getSelectedPageId())
            },
            onReceive: res => {
            }
        })
    }

    deleteFolderProduct(folderId: number) {
        ProductRepository.getInstance().deleteFolder({
            urlContent: `${folderId}/${Math.abs(getSelectedPageId())}`,
            onReceive: res => {
                ToastService.getInstance().success("پوشه با موفقیت حذف شد");
            }
        })
    }
}
