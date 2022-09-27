import {CreateWorkPageOtherImageList} from "@/app/unit/pages/newCreateWorkPage/CreateWorkPage.model";
import {StationRepository} from "@/core/repository/station.repository";
import router from "@/core/router/router";
import {FileUploaderService, ImageUploaderKeys} from "@/core/service/fileUploader.service";
import {ToastService} from "@/core/service/toast.service";
import {getSelectedPageData, getSelectedPageId, WindowLoading} from "@/core/service/utils.service";
import {stationGetByIdModel, UpdateStationModel} from "@/data/city/workpage/stations.model";
import {i18n} from "@/main";
import {useRoute} from "vue-router";

export class updateStationPageState {

    route = useRoute();
    postData = <UpdateStationModel>{
        type: 1,
        description: '',
        mainImageUrl: null,
        otherImageUrls: null,
        plateNumber: '',
        title: '',
        workPageId: 0,
        stationId: Number(this.route.params.id)
    }
    imageData = {
        otherPhotos: [],
        mainPhoto: ""
    }
    station = {
        type: true,
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
    userData = getSelectedPageData();
    data = <stationGetByIdModel>null;
    vehicleType = this.vehicles[0];

    constructor(private callBack: any) {
    }

    getDetails() {

        if (this.route.params.id) {
            StationRepository.getInstance().getByIdStation({
                urlContent: {
                    id: this.route.params.id
                }, onReceive: (res => {
                    this.postData = res;
                    let listOther = [];

                    this.postData.otherImageUrls.forEach(image => {
                        const item = {
                            link: image
                        }
                        listOther.push(item);
                    });

                    this.imageData = {
                        mainPhoto: this.postData.mainImageUrl,
                        otherPhotos: listOther
                    }


                    if (this.postData.type === 5) {
                        this.vehicleType = this.vehicles[0];
                        let plate = '';
                        for (let i = 0; i < 6; i++) {
                            plate = plate + this.postData.plateNumber[i];
                        }

                        this.plateNumber.half1 = this.postData.plateNumber.charAt(6) + this.postData.plateNumber.charAt(7);
                        this.plateNumber.half2 = plate;

                        for (let i = 0; i < 6; i++) {
                            this.maskList1[i].value = this.plateNumber.half2.charAt(i);
                        }

                        for (let i = 0; i < 2; i++) {
                            this.maskList2[i].value = this.plateNumber.half1.charAt(i);
                        }

                    } else if (this.postData.type === 4) {
                        this.vehicleType = this.vehicles[1];
                        let plate = '';
                        for (let i = 0; i < 8; i++) {
                            plate = plate + this.postData.plateNumber[i];
                        }
                        this.plateNumber.half2 = plate;
                        this.postData.plateNumber = plate;
                        for (let i = 0; i < 8; i++) {
                            this.maskMotor[i].value = this.plateNumber.half2.charAt(i);
                        }
                    }

                })
            })
        }
    }

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

            if (this.station.images[i].link === "") {
                FileUploaderService.getInstance().uploadImage({
                    file: this.station.images[i].base64,
                    onProgressChange: (progress) => {
                        this.station.images[i].progress = progress;
                    },
                    onError: (msg) => {
                        ToastService.getInstance().error(i18n.global.tc('uploadError'));
                        WindowLoading.value = false;
                    },
                    onReceive: (link) => {
                        this.station.images[i].link = link;
                        this.uploadChecker();
                    },
                }, ImageUploaderKeys.WORKPAGE);
            } else {
                this.uploadChecker();
            }
        }

    }

    uploadChecker() {
        let isOk = false;
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
            this.onUpdateStation()
        }
    }

    beforeCreateStation() {

        if (this.station.images[0].base64 !== undefined && this.station.images && this.station.images.length > 0) {
            if (this.postData.title === '' || this.postData.plateNumber === '') {
                ToastService.getInstance().error(i18n.global.tc('invalidInfo'));
                this.validation = false;

                WindowLoading.value = false;
                return;
            }

            if ((this.postData.type == 4 || this.postData.type == 5)) {

                if (this.postData.plateNumber.length !== 8 && this.postData.type === 5) {
                    ToastService.getInstance().error(i18n.global.tc('invalidPlaque'));
                    this.validation = false;

                    WindowLoading.value = false;
                    return;
                } else if (this.postData.plateNumber.length !== 8 && this.postData.type === 4) {
                    ToastService.getInstance().error(i18n.global.tc('invalidPlaque'));
                    this.validation = false;
                    WindowLoading.value = false;
                    return;
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

    onUpdateStation() {

        let listOder = [];
        for (let i = 1; i < this.station.images.length; i++) {
            listOder.push(this.station.images[i].link);
        }

        if ((this.postData.type == 4 || this.postData.type == 5)) {

            if (this.postData.plateNumber.length !== 8 && this.postData.type === 5) {
                ToastService.getInstance().error(i18n.global.tc('invalidPlaque'));
                this.validation = false;
                WindowLoading.value = false;
                return;
            } else if (this.postData.plateNumber.length !== 8 && this.postData.type === 4) {
                ToastService.getInstance().error(i18n.global.tc('invalidPlaque'));
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

        StationRepository.getInstance().updateStation({
            body: <UpdateStationModel>{
                description: this.postData.description,
                mainImageUrl: this.station.images[0].link,
                otherImageUrls: listOder,
                plateNumber: this.postData.plateNumber,
                title: this.postData.title,
                type: this.postData.type,
                stationId: Number(this.route.params.id),
                workPageId: Math.abs(getSelectedPageId())
            }, onReceive: (res => {
                ToastService.getInstance().success(i18n.global.tc('updatePropSuccessful'));
                WindowLoading.value = false;
                setTimeout(() => {
                    router.back();
                }, 1000);
            }), onError: (err => {
                WindowLoading.value = false;
                ToastService.getInstance().error(i18n.global.tc('serverError'));
            })
        })
    }

}
