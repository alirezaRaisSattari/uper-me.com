import {CreateWorkPageOtherImageList} from "@/app/unit/pages/newCreateWorkPage/CreateWorkPage.model";
import {StationRepository} from "@/core/repository/station.repository";
import router from "@/core/router/router";
import {FileUploaderService, ImageUploaderKeys} from "@/core/service/fileUploader.service";
import {ToastService} from "@/core/service/toast.service";
import {getSelectedPageId, WindowLoading} from "@/core/service/utils.service";
import {CreateStationModel, Document} from "@/data/city/workpage/stations.model";
import {i18n} from "@/main";

export class createStationPageState {

    postData = <CreateStationModel>{
        type: 1,
        description: '',
        documents: <Document[]>[],
        mainImageUrl: null,
        otherImageUrls: null,
        plateNumber: '',
        title: '',
        workPageId: 0
    }
    inProgress = false;

    station = {
        type: false,
        show: false,
        images: <CreateWorkPageOtherImageList[]>[],
        docImages: []
    }
    validation = true;
    vehicles = [
        {
            name: i18n.global.tc('car'),
            value: 5
        },
        {
            name: i18n.global.tc('motor'),
            value: 4
        }
    ]

    maskList1 = [
        {id: "0", label: "", option: 9, value: null},
        {id: "1", label: "", option: 9, value: null},
        {id: "2", label: "", option: 'a', value: null},
        {id: "3", label: "", option: 9, value: null},
        {id: "4", label: "", option: 9, value: null},
        {id: "5", label: "", option: 9, value: null},
    ]
    maskList2 = [
        {id: "0", label: "IR", option: 9, value: null},
        {id: "1", label: "iran", option: 9, value: null},
    ]

    maskMotor = [
        {id: "0", label: "", option: 9, value: null},
        {id: "1", label: "", option: 9, value: null},
        {id: "2", label: "", option: 9, value: null},
        {id: "3", label: "", option: 9, value: null},
        {id: "4", label: "", option: 9, value: null},
        {id: "5", label: "", option: 9, value: null},
        {id: "6", label: "", option: 9, value: null},
        {id: "7", label: "", option: 9, value: null},
    ]

    maskMotor2 = [
        {id: null, label: "IR", option: 9, value: null},
        {id: null, label: "iran", option: 9, value: null},
    ]

    plateNumber = {
        half1: '',
        half2: '',
    }

    vehicleType = this.vehicles[0];

    pushData(data: any) {
        this.station = data
    }

    changeVehicle() {
        this.postData.type = this.vehicleType.value;
    }

    callBackMask(data, index) {
        let plateNumber = '';
        data.forEach(item => {
            if (item.value !== null) {
                plateNumber = plateNumber + item.value;
            }
        });

        if (index === 1) {
            this.plateNumber.half1 = plateNumber;
        } else {
            this.plateNumber.half2 = plateNumber;
        }


        if (this.plateNumber.half1.length === 6 && this.plateNumber.half2.length === 2) {
            this.postData.plateNumber = this.plateNumber.half1 + this.plateNumber.half2;
        } else if (this.plateNumber.half1.length === 8) {
            this.postData.plateNumber = this.plateNumber.half1;
        }

    }

    async uploadImages() {
        WindowLoading.value = true;
        for (let i = 0; i < this.station.images.length; i++) {
            FileUploaderService.getInstance().uploadImage({
                file: this.station.images[i].base64,
                onProgressChange: (progress) => {
                    this.station.images[i].progress = progress;
                },
                onError: (msg) => {
                    ToastService.getInstance().error(i18n.global.tc('uploadError'));
                },
                onReceive: (link) => {
                    this.station.images[i].link = link;
                    this.uploadChecker();
                },
            }, ImageUploaderKeys.WORKPAGE);
        }

        for (let i = 0; i < this.station.docImages.length; i++) {
            FileUploaderService.getInstance().uploadImage({
                file: this.station.docImages[i].base64,
                onProgressChange: (progress) => {
                    this.station.docImages[i].progress = progress;
                },
                onError: (msg) => {
                    ToastService.getInstance().error(i18n.global.tc('uploadError'));
                },
                onReceive: (link) => {
                    this.station.docImages[i].imgUrl = link;
                    this.uploadChecker();
                },
            }, ImageUploaderKeys.WORKPAGE);
        }
    }

    uploadChecker() {
        let isOk = false;
        if (this.postData.type === 4 || this.postData.type === 5) {
            for (let i = 0; i < this.station.docImages.length; i++) {
                if (this.station.docImages[i].imgUrl === "" || this.station.docImages[i].docName === "") {
                    isOk = false;
                    if (this.station.docImages[i].docName === "") {
                        ToastService.getInstance().error(i18n.global.tc('docNameError'));
                    }
                    break;
                } else {
                    isOk = true;
                    break;
                }
            }
            for (let i = 0; i < this.station.images.length; i++) {
                if (this.station.images[i].link === "") {
                    isOk = false;
                    break;
                } else {
                    isOk = true;
                    break;
                }
            }

            if (isOk) {
                this.onCreateStation();
            }
        } else {
            for (let i = 0; i < this.station.images.length; i++) {
                if (this.station.images[i].link === "") {
                    isOk = false;
                    break;
                } else {
                    isOk = true;
                    break;
                }
            }
            if (isOk) {
                this.onCreateStation();
            }
        }
    }

    beforeCreateStation() {
        if (this.station.images[0].base64 !== undefined && this.station.images && this.station.images.length > 0) {
            if (this.postData.title === '') {
                ToastService.getInstance().error(i18n.global.tc('invalidInfo'));
                this.validation = false;
                WindowLoading.value = false;
                return;
            }

            if ((this.postData.type == 4 || this.postData.type == 5)) {

                if (this.postData.plateNumber.length !== 8 && this.postData.type === 5) {
                    ToastService.getInstance().error(i18n.global.tc('invalidNo'));
                    this.validation = false;
                    WindowLoading.value = false;
                    return;
                } else if (this.postData.plateNumber.length !== 8 && this.postData.type === 4) {
                    ToastService.getInstance().error(i18n.global.tc('invalidNo'));
                    this.validation = false;
                    WindowLoading.value = false;
                    return;
                } else if (this.postData.type === 5 && this.station.docImages.length === 0) {
                    ToastService.getInstance().error(i18n.global.tc('docIsNull'));
                    this.validation = false;
                    WindowLoading.value = false;
                    return;
                } else if (this.postData.type === 5 && this.station.docImages.length > 0) {
                    for (let i = 0; i < this.station.docImages.length; i++) {
                        const docName = this.station.docImages[i].docName;
                        if (!docName || docName == "") {
                            ToastService.getInstance().error(i18n.global.tc('docIsNull'));
                            this.validation = false;
                            WindowLoading.value = false;
                            return;
                        }
                    }
                }
            }

            this.uploadImages();
        } else {
            if (this.station.images[0].base64 === undefined) {
                ToastService.getInstance().error(i18n.global.tc('uploadMainImages'))
            } else {
                ToastService.getInstance().error(i18n.global.tc('noImages'))
            }
        }
    }

    onCreateStation() {

        if (!this.inProgress) {
            this.inProgress = true;
            let listOder = [];
            for (let i = 1; i < this.station.images.length; i++) {
                listOder.push(this.station.images[i].link);
            }
            this.postData.documents = [];

            for (let i = 0; i < this.station.docImages.length; i++) {

                const doc = <Document>{
                    imageUrl: this.station.docImages[i].imgUrl,
                    title: this.station.docImages[i].docName
                }
                this.postData.documents.push(doc);
            }


            if ((this.postData.type == 4 || this.postData.type == 5) && this.postData.documents.length === 0) {
                ToastService.getInstance().error(i18n.global.tc('docIsNull'));
                this.validation = false;

                WindowLoading.value = false;
                return;
            } else if ((this.postData.type == 4 || this.postData.type == 5) && this.postData.documents.length > 0) {

                if (this.postData.plateNumber.length !== 8 && this.postData.type === 5) {
                    ToastService.getInstance().error(i18n.global.tc('invalidNo'));
                    this.validation = false;
                    WindowLoading.value = false;
                    return;
                } else if (this.postData.plateNumber.length !== 8 && this.postData.type === 4) {
                    ToastService.getInstance().error(i18n.global.tc('invalidNo'));
                    this.validation = false;
                    WindowLoading.value = false;
                    return;
                }
            }

            if (this.station.images[0].link === "") {
                ToastService.getInstance().error(i18n.global.tc('mainPhotoNotSelected'));
                this.validation = false;
                WindowLoading.value = false;
                return;
            }

            if (this.postData.title === '' || this.postData.plateNumber === '') {
                ToastService.getInstance().error(i18n.global.tc('invalidInfo'));
                this.validation = false;

                WindowLoading.value = false;
                return;
            }


            StationRepository.getInstance().CreateStation({
                body: <CreateStationModel>{
                    description: this.postData.description,
                    documents: this.postData.documents,
                    mainImageUrl: this.station.images[0].link,
                    otherImageUrls: listOder,
                    plateNumber: this.postData.plateNumber,
                    title: this.postData.title,
                    type: this.postData.type,
                    workPageId: Math.abs(getSelectedPageId())
                }, onReceive: (res => {
                    ToastService.getInstance().success(i18n.global.tc('createSuccessfully'));
                    WindowLoading.value = false;

                    setTimeout(() => {
                        router.back();
                    }, 1000);

                }), onError: (err => {
                    WindowLoading.value = false;
                    this.inProgress = false;
                    ToastService.getInstance().success(i18n.global.tc('createSuccessfully'))
                })
            })

        }
    }

}
