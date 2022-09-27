export class LocalStorageService {
    private static instance: LocalStorageService

    public static getInstance(): LocalStorageService {
        if (!LocalStorageService.instance) LocalStorageService.instance = new LocalStorageService()
        return LocalStorageService.instance
    }

    setItem(key: any, value: any): void {
        localStorage.setItem(key, value)
    }

    getItem(key: any) {
        return localStorage.getItem(key)
    }

    clear(): void {
        localStorage.clear()
    }

    getKey(index: number) {
        localStorage.key(index)
    }

    removeItem(key: any): void {
        localStorage.removeItem(key)
    }

    getLength() {
        return localStorage.length
    }

}
