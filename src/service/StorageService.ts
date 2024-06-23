class StorageService {
    static saveData<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static loadData<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
}

export default StorageService;