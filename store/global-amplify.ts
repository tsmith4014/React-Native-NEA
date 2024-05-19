import { UserRoleSlice } from '@/store/user-role';
import { AuthUser as AmplifyAuthUser, getCurrentUser } from 'aws-amplify/auth';
import { router } from 'expo-router';
import { StateCreator } from 'zustand';

export type AuthUser = AmplifyAuthUser & { userAttributes: Record<string, string> };

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
            const user = await getCurrentUser();
            const userAttributes = get().currentUserStore?.getState()?.userAttributes || {};
            return {
                ...user,
                userAttributes,
            };
        } catch (e) {
            console.error(e);
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
