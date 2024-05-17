import { userRoleAmplifyStorage } from '@/store/amplifyStorage';
import createSharedSlice, { Shared } from '@/store/shared';
import { UserRole } from '@/store/types';
import zustandStorage from '@/store/zustandStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import authSlice, { Authentication } from './authentication';
import createUserSlice, { User } from './user';

export type LawyerStore = User & Authentication & Shared & { reset: () => void; handleSignOut: () => Promise<void> };

const useLawyerStore = create<LawyerStore>()(
    persist(
        (set, ...a) => {
            const initialState = {
                ...createUserSlice(set, ...a),
                ...authSlice(set, ...a),
                ...createSharedSlice(set, ...a),
            };
            return {
                ...initialState,
                handleSignOut: async () => {
                    userRoleAmplifyStorage[UserRole.lawyer]?.clearAll();
                    a[0]().reset();
                },
                reset: () => {
                    set(initialState);
                },
            };
        },
        {
            name: 'lawyerStore',
            storage: createJSONStorage(() => zustandStorage),
            onRehydrateStorage: () => (state) => {
                state!.setHasHydrated(true);
            },
        },
    ),
);

export default useLawyerStore;
