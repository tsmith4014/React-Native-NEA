import { UserRole } from '@/store/types';
import { KeyValueStorageInterface } from 'aws-amplify/utils';
import { MMKV } from 'react-native-mmkv';

export const userRoleAmplifyStorage: Record<UserRole, MMKV> = {} as Record<UserRole, MMKV>;

class AmplifyStorage implements KeyValueStorageInterface {
    storage: MMKV;
    constructor(role: UserRole) {
        this.storage = new MMKV({ id: `amplify.storage.${role}` });
        userRoleAmplifyStorage[role] = this.storage;
    }

    async setItem(key: string, value: string): Promise<void> {
        this.storage.set(key, value);
    }
    async getItem(key: string): Promise<string | null> {
        const value = this.storage.getString(key);
        return value ?? null;
    }
    async removeItem(key: string): Promise<void> {
        return this.storage.delete(key);
    }
    async clear(): Promise<void> {
        this.storage.clearAll();
    }
}

export default AmplifyStorage;
