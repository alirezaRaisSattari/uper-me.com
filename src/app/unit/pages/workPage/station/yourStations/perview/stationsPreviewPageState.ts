import {StationRepository} from "@/core/repository/station.repository";
import router from "@/core/router/router";
import {FileUploaderService, ImageUploaderKeys} from "@/core/service/fileUploader.service";
import {ToastService} from "@/core/service/toast.service";
import {getSelectedPageData, getSelectedPageId, WindowLoading} from "@/core/service/utils.service";
import {stationGetByIdModel} from "@/data/city/workpage/stations.model";
import {i18n} from "@/main";
import {useRoute} from "vue-router";

export class stationsPreview {
    route = useRoute();
    userData = getSelectedPageData();
    data = <stationGetByIdModel>null;
    changeDoc = false;
    plateNumber = {
        hr: '',
        hl: ''
    }

    getDetails() {
        WindowLoading.value = true;
        if (this.route.params.id) {
            StationRepository.getInstance().getByIdStation({
                urlContent: {
                    id: this.route.params.id
                }, onReceive: (res => {
                    this.data = res;
                    if (this.data.type === 5) {
                        let plate = '';
                        for (let i = 0; i < 6; i++) {
                            plate = plate + this.data.plateNumber[i];
                        }

                        this.plateNumber.hl = this.data.plateNumber.charAt(6) + this.data.plateNumber.charAt(7);
                        this.plateNumber.hr = plate;
                    } else if (this.data.type === 4) {
                        let plate = '';
                        for (let i = 0; i < 9; i++) {
                            plate = plate + this.data.plateNumber[i];
                        }
                        this.plateNumber.hr = plate;

                    }
                    WindowLoading.value = false;

                }), onError: (err => {
                    WindowLoading.value = false;
                })
            })
        }
    }

    typeChecker() {

        switch (this.data.type) {
            case 1:
                return i18n.global.tc('place');
            case 2:
                return i18n.global.tc('desk');
            case 3:
                return i18n.global.tc('chair');
            default:
                return i18n.global.tc('vehicle');
        }
    }


    deleteStation() {
        WindowLoading.value = true;

        StationRepository.getInstance().deleteStation({
            urlContent: {
                stationId: this.data.id,
                workPageId: Math.abs(getSelectedPageId())
            }, onReceive: (res => {
                ToastService.getInstance().success(i18n.global.tc('deleted'));
                setTimeout(() => {
                    WindowLoading.value = false;
                    router.back();
                }, 1000);
            }), onError: (err => {
                ToastService.getInstance().error(i18n.global.tc('Unsuccessful'));
            })
        })
    }

    goToUpdate() {
        router.push(`/updateStation/${this.data.id}`)
    }


    uploadImages(index) {
        WindowLoading.value = true;

        FileUploaderService.getInstance().uploadImage({
            file: this.data.documents[index].imageUrl,
            onError: (msg) => {
                ToastService.getInstance().error(i18n.global.tc('uploadError'));
                WindowLoading.value = false;
            },
            onReceive: (link) => {
                this.data.documents[index].imageUrl = link;
                StationRepository.getInstance().updateDoc({
                    body: {
                        stationId: Number(this.route.params.id),
                        title: this.data.documents[index].title,
                        imageUrl: link
                    },
                    onReceive: (res => {
                        ToastService.getInstance().success(i18n.global.tc('updatePropSuccessful'));
                        WindowLoading.value = false;
                        this.changeDoc = false;
                    }), onError: (err => {
                        WindowLoading.value = false;
                        ToastService.getInstance().error(i18n.global.tc('errorInLoadInfo'))
                        this.changeDoc = false;
                    })
                })
            },
        }, ImageUploaderKeys.WORKPAGE);
    }

    deleteDoc(index) {
        WindowLoading.value = true;
        this.changeDoc = true;
        StationRepository.getInstance().deleteDoc({
            body: {
                stationId: Number(this.route.params.id),
                titles: [
                    this.data.documents[index].title
                ]
            }, onReceive: (res => {
                ToastService.getInstance().success(i18n.global.tc('deleted'));
                let list = [];
                for (let i = 0; i < this.data.documents.length; i++) {
                    const item = this.data.documents[i];
                    if (i !== index) {
                        list.push(item);
                    }
                }
                this.data.documents = [];
                this.data.documents = list;
                setTimeout(() => {
                    WindowLoading.value = false;
                    this.changeDoc = false;
                }, 1000);

            }), onError: (err => {
                ToastService.getInstance().error(i18n.global.tc('Unsuccessful'));
            })
        })
    }

    addDoc(index) {
        WindowLoading.value = true;

        FileUploaderService.getInstance().uploadImage({
            file: this.data.documents[index].imageUrl,
            onError: (msg) => {
                ToastService.getInstance().error(i18n.global.tc('uploadError'));
                WindowLoading.value = false;
            },
            onReceive: (link) => {
                this.data.documents[index].imageUrl = link;
                StationRepository.getInstance().AddListOfDocumentsToStation({
                    body: {
                        stationId: this.route.params.id,
                        documents: [
                            {
                                imageUrl: this.data.documents[index].imageUrl,
                                title: this.data.documents[index].title
                            }
                        ]
                    }, onReceive: (res => {
                        ToastService.getInstance().success(i18n.global.tc('createSuccessfully'));
                        this.data.documents[index].isNew = false;
                        WindowLoading.value = false;
                    }), onError: (err => {
                        ToastService.getInstance().error(i18n.global.tc('anErrorAccrue'));
                        WindowLoading.value = false;
                    })
                })
            },
        }, ImageUploaderKeys.WORKPAGE);
    }

}
