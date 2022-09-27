
import axios from "axios";
import { Constant, EnumKeys } from "../constant/constant";
import { LocalStorageService } from "./localStorage.service";
import { ToastService } from "@/core/service/toast.service";
import { i18n } from "@/main";
import FormData from 'form-data'

export class FileUploaderService {
    private static instance: FileUploaderService

    public static getInstance(): FileUploaderService {
        if (!FileUploaderService.instance) FileUploaderService.instance = new FileUploaderService()
        return FileUploaderService.instance
    }

    private static base64ToBLob(dataURI) {

        if (dataURI != null && dataURI != '') {
            let byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0) {
                byteString = atob(dataURI.split(',')[1]);
            } else {
                byteString = unescape(dataURI.split(',')[1]);
            }
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ia = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
        } else {
            ToastService.getInstance().warning(i18n.global.tc('image_is_required'))
        }

    }

    uploadFile(data: FileUploaderReturnResponse, fileKey: string) {
        this.upload(data, Constant.UrlUpload_File, fileKey)
    }

    uploadImage(data: FileUploaderReturnResponse, fileKey: string) {
        if (data.file != null && data.file !== '') {
            data.file = FileUploaderService.base64ToBLob(data.file)
            data.file = new File([data.file], 'dddddddddd.webp', { type: 'image/webp' })
            this.upload(data, Constant.UrlUpload_Picture, fileKey)
        } else {
            ToastService.getInstance().warning(i18n.global.tc('image_is_required'))
        }
    }

    uploadProfile(data: FileUploaderReturnResponse, fileKey: string) {
        if (data.file != null && data.file !== '') {
            data.file = FileUploaderService.base64ToBLob(data.file)
            data.file = new File([data.file], 'profile.webp', { type: 'image/webp' })
            // data.file = FileUploaderService.base64ToBLob(data.file)
            this.upload(data, Constant.UrlUpload_Profile, fileKey)
        } else {
            ToastService.getInstance().warning(i18n.global.tc('image_is_required'))
        }
    }

    uploadVoice(data: FileUploaderReturnResponse, fileKey: string) {
        this.upload(data, Constant.UrlUpload_Voice, fileKey)
    }

    uploadVideo(data: FileUploaderReturnResponse, fileKey: string) {
        this.upload(data, Constant.UrlUpload_Video, fileKey)
    }

    private upload(data: FileUploaderReturnResponse, url: string, fileKey: string) {
        let formData = new FormData();
        formData.append(fileKey, data.file);
        try {
            axios({
                url: url,
                method: "POST",
                data: formData,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    'Authorization': LocalStorageService.getInstance().getItem(EnumKeys.KeyToken) ?? "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYWluUGFnZUlkIjoiNCIsIlNlc3Npb25JZCI6IjI1NjYiLCJGb2xsb3dBbmRSZXF1ZXN0TGltaXRhdGlvbiI6IjcvMjUvMjAyMiA3OjMwOjAwIFBNIiwiQ29tbWVudENyZWF0aW9uTGltaXRhdGlvbiI6IjMvMTYvMjAyMiAzOjI5OjM3IFBNIiwiZXhwIjoxNjQxMDk4NTM4LCJpc3MiOiJVcGVyIiwiYXVkIjoiVXBlciJ9.h_Egxll_r2PO4P-CtyZGdyxAcAY6re2-VyI-L1nGrpc",
                },
                onUploadProgress: (progressEvent) => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    data.onProgressChange?.call(null, percentCompleted);
                },
            }).then(d => {
                return d;
            }).then((response) => {
                if (response.data.url) {
                    data.onReceive?.call(null, response.data.url);
                } else {
                    data.onError?.call(null, 'error');
                }
            });
        } catch (err: any) {
            data.onError?.call(null, err);
        }
    }
}

export class FileUploaderReturnResponse {
    file?: any
    onProgressChange?: (progress: number) => void
    onError?: (message: String) => void
    onReceive?: (res: any) => void
}

export enum ImageUploaderKeys {
    WORKPAGE = "workpage",
    PRODUCT = "product",
    GIFT_PRODUCT = "gift-product",
    POST_COVER = "post-cover",
    POST_IMAGE = "post-image",
    PAGE_INFO = "page-info",
    TICKET = "ticket",
    STORY = "story",
    WEB_BANNER = "web-banner",
    MOBILE_BANNER = "mobile-banner",
    REPORT = "report",
    EVENT_PAGE = "event-page",
    AGENCY = "agency",
    CHAT = "chat",
    STATION_FOLDER = "station-folder",
    CUSTOM_PRODUCT = "custom-product",
    RECEPT = "receipt",
}

export enum VoiceUploaderKeys {
    CHAT_VOICE = "chat-voice",
}

export enum VideoUploaderKeys {
    POST = "post",
    WORKPAGE_MOVIE_URL = "workpage-movie-url",
    PRODUCT_MOVIE_URL = "product-movie-url",
    STORY = "story",
    factor_prepare = "factor-prepare"
}

export enum ProfileUploaderKeys {
    PRODUCT = "product",
    USER = "user",
}

export enum VideoUploaderKeys {
    CHAT = "chat",
    VIRTUAL_PROP = "virtual-prop",
    POST_EXTRA = "post-extra",
    OTHER = "other",
}

export enum FileUploaderKeys {
    virtualProp = 'virtual-prop',
    postExtra = 'post-extra',
    chat = 'chat',
    other = 'other'
}
