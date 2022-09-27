import { ProductRepository } from "@/core/repository/product.repository";
import { ToastService } from "@/core/service/toast.service";
import { WindowLoading } from "@/core/service/utils.service";
import { PageStore } from "@/core/store/page.store";
import { i18n } from "@/main";

export class propFolderPageState {
    listFolder: Array<any> = [];
    postData = {
        type: true,
        workPageId: 0,
        title: "",
        folderId: 0,
        showDialog: false
    }

    constructor() {

    }

    getFolders() {
        this.listFolder = [];
        WindowLoading.value = true;
        ProductRepository.getInstance().getAllFolderReserve({
            urlContent: `${PageStore().selectedPageId * -1}`,
            onReceive: res => {
                WindowLoading.value = false;
                if (res !== null) {
                    this.listFolder = res;
                }

            }
        })
    }

    create() {
        WindowLoading.value = true;
        ProductRepository.getInstance().createFolderReserve({
            body: {
                workPageId: this.postData.workPageId,
                title: this.postData.title
            }, onReceive: ((res => {
                WindowLoading.value = false;
                ToastService.getInstance().success(i18n.global.tc('folder_created'));
                this.postData.showDialog = false;
                this.getFolders();
            })), onError: (err => {
                WindowLoading.value = false;
            })


        })
    }

    update() {
        WindowLoading.value = true;
        ProductRepository.getInstance().updateFolderReserve({
            body: {
                folderId: this.postData.folderId,
                workPageId: PageStore().selectedPageId * -1,
                title: this.postData.title
            },
            onReceive: res => {
                if (this.listFolder.length !== 0) {
                    this.listFolder.find(i => i.id === this.postData.folderId).title = this.postData.title;
                }
                WindowLoading.value = false;
                ToastService.getInstance().success(i18n.global.tc("updatePropSuccessful"));
                this.postData.showDialog = false;
            }, onError: (err => {
                WindowLoading.value = false;
            })
        })
    }


}
