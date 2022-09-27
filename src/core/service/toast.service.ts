import iziToast from "izitoast";
import {isMobile} from "@/core/service/utils.service";

export class ToastService {
    private static instance: ToastService
    private messages: string[] = []

    public static getInstance(): ToastService {
        if (!ToastService.instance) ToastService.instance = new ToastService()
        return ToastService.instance
    }

    success(message: string) {
        if (this.messages.includes(message)) {
            return
        } else {
            this.messages.push(message)
        }
        setTimeout(() => {
            this.messages = []
        }, 1000)
        iziToast.show({
            message: message,
            color: 'green', timeout: 1000,
            position: isMobile.any() ? "topCenter" : "bottomRight",
        });
    }

    warning(message: string) {
        if (this.messages.includes(message)) {
            return
        } else {
            this.messages.push(message)
        }
        setTimeout(() => {
            this.messages = []
        }, 1000)
        iziToast.show({
            message: message,
            color: 'yellow', timeout: 1000,
            position: isMobile.any() ? "topCenter" : "bottomRight",
        });
    }

    error(message: string) {
        if (this.messages.includes(message)) {
            return
        } else {
            this.messages.push(message)
        }
        setTimeout(() => {
            this.messages = []
        }, 1000)
        iziToast.show({
            message: message,
            color: 'red',
            timeout: 1000,
            position: isMobile.any() ? "topCenter" : "bottomRight",
        });
    }

    info(message: string) {
        if (this.messages.includes(message)) {
            return
        } else {
            this.messages.push(message)
        }
        setTimeout(() => {
            this.messages = []
        }, 1000)
        iziToast.show({
            message: message,
            color: 'blue',
            timeout: 1000,
            position: isMobile.any() ? "topCenter" : "bottomRight",
        });
    }

}
