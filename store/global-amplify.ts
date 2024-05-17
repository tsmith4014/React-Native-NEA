import { UserRoleSlice } from '@/store/user-role';
import { AuthUser, getCurrentUser } from 'aws-amplify/auth';
import { router } from 'expo-router';
import { StateCreator } from 'zustand';

export interface GlobalAmplifySlice {
    getCurrentUser: () => Promise<boolean | AuthUser>;
    redirectIfSignedIn: () => Promise<void>;
}

const globalAmplifySlice: StateCreator<GlobalAmplifySlice & UserRoleSlice, [], [], GlobalAmplifySlice> = (
    _set,
    get,
) => ({
    getCurrentUser: async () => {
        try {
            return await getCurrentUser();
        } catch {
            return false;
        }
    },
    redirectIfSignedIn: async () => {
        const state = get();
        const user = await state.getCurrentUser();
        if (user) {
            router.navigate(`/${state.selectedRole}/home`);
        }
    },
});

export default globalAmplifySlice;
